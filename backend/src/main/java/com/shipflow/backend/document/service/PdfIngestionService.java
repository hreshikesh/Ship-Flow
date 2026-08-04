package com.shipflow.backend.document.service;

import com.shipflow.backend.document.entity.Document;
import com.shipflow.backend.document.entity.DocumentChunk;
import com.shipflow.backend.document.repository.DocumentChunkRepository;
import com.shipflow.backend.document.repository.DocumentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class PdfIngestionService {

    private final DocumentRepository       documentRepository;
    private final DocumentChunkRepository  chunkRepository;

    @Value("${rag.chunk-size:600}")
    private int chunkSize;

    @Value("${rag.chunk-overlap:80}")
    private int chunkOverlap;

    @Value("${rag.pdf-path:knowledge/SHIPFLOW_Manual.pdf}")
    private String pdfPath;

    // ✅ Skip these page ranges (TOC, index, blank pages)
    @Value("${rag.skip-pages-start:1}")
    private int skipPagesStart;      // Skip first N pages (TOC)

    @Value("${rag.skip-pages-end:0}")
    private int skipPagesEnd;        // Skip last N pages (index)

    @Value("${rag.content-start-page:7}")
    private int contentStartPage;    // Real content starts here

    private static final int PAGE_BATCH_SIZE = 20;

    public Document ingestPdf(String fileName) throws IOException {
        log.info("Starting PDF ingestion: {}", fileName);

        if (documentRepository.existsByFileName(fileName)) {
            log.info("Already ingested: {}", fileName);
            return documentRepository
                    .findByFileName(fileName).orElseThrow();
        }

        InputStream pdfStream = getClass()
                .getClassLoader()
                .getResourceAsStream(pdfPath);

        if (pdfStream == null) {
            throw new IllegalArgumentException(
                    "PDF not found: src/main/resources/" + pdfPath);
        }

        byte[] pdfBytes = pdfStream.readAllBytes();
        pdfStream.close();

        try (PDDocument pdDocument = Loader.loadPDF(pdfBytes)) {
            pdfBytes = null;
            System.gc();

            int pageCount = pdDocument.getNumberOfPages();
            log.info("PDF loaded: {} pages | " +
                            "Skipping pages 1-{} (TOC)",
                    pageCount, contentStartPage - 1);

            Document document = saveDocumentRecord(fileName, pageCount);

            int globalChunkIndex =
                    processPages(pdDocument, document, pageCount);

            finalizeDocument(document, globalChunkIndex);

            return document;
        }
    }

    @Transactional
    protected Document saveDocumentRecord(
            String fileName, int pageCount) {

        Document document = Document.builder()
                .title("SHIPFLOW Manual")
                .fileName(fileName)
                .pageCount(pageCount)
                .status(Document.IngestionStatus.EXTRACTING)
                .build();
        return documentRepository.save(document);
    }

    // ─── Process pages, skipping TOC/index ───────────────────────
    protected int processPages(
            PDDocument pdDocument,
            Document document,
            int pageCount) throws IOException {

        PDFTextStripper stripper = new PDFTextStripper();
        int globalChunkIndex = 0;
        int skippedTocPages  = 0;
        int skippedGarbagePages = 0;

        updateStatus(document, Document.IngestionStatus.CHUNKING);

        // ✅ Start from content page, not page 1
        int startPage = Math.max(contentStartPage, skipPagesStart + 1);
        int endPage   = pageCount - skipPagesEnd;

        log.info("Processing pages {} to {}", startPage, endPage);

        for (int pageStart = startPage;
             pageStart <= endPage;
             pageStart += PAGE_BATCH_SIZE) {

            int pageEnd = Math.min(
                    pageStart + PAGE_BATCH_SIZE - 1, endPage);

            List<DocumentChunk> batchChunks = new ArrayList<>();

            for (int page = pageStart; page <= pageEnd; page++) {
                stripper.setStartPage(page);
                stripper.setEndPage(page);

                String pageText = stripper.getText(pdDocument);

                if (pageText == null || pageText.isBlank()) {
                    continue;
                }

                pageText = pageText.trim();

                // ✅ Skip if page looks like TOC/index
                if (isTableOfContents(pageText)) {
                    skippedTocPages++;
                    log.debug("Skipped TOC page: {}", page);
                    continue;
                }

                // ✅ Skip garbage pages (mostly numbers/dots)
                if (isGarbagePage(pageText)) {
                    skippedGarbagePages++;
                    log.debug("Skipped garbage page: {}", page);
                    continue;
                }

                // ✅ Clean page content before chunking
                pageText = cleanPageText(pageText);

                List<String> chunks = splitIntoChunks(pageText);
                pageText = null;

                for (String chunkContent : chunks) {
                    if (chunkContent == null
                            || chunkContent.trim().length() < 50) {
                        continue;
                    }

                    // ✅ Extra check: skip chunks that are mostly TOC-like
                    if (isTableOfContents(chunkContent)) {
                        continue;
                    }

                    batchChunks.add(DocumentChunk.builder()
                            .document(document)
                            .pageNumber(page)
                            .chunkIndex(globalChunkIndex++)
                            .content(chunkContent.trim())
                            .tokenCount(chunkContent.length() / 4)
                            .build());
                }
            }

            if (!batchChunks.isEmpty()) {
                saveBatch(batchChunks);
                batchChunks.clear();
            }

            log.info("Processed {}-{} / {} | Chunks: {} | " +
                            "Skipped TOC: {} | Garbage: {}",
                    pageStart, pageEnd, endPage,
                    globalChunkIndex,
                    skippedTocPages, skippedGarbagePages);

            System.gc();
        }

        log.info("═══ TOTAL: {} chunks | " +
                        "Skipped {} TOC + {} garbage pages ═══",
                globalChunkIndex, skippedTocPages, skippedGarbagePages);

        return globalChunkIndex;
    }

    // ─── TOC Detection ─────────────────────────────────────────
    private boolean isTableOfContents(String text) {
        if (text == null || text.length() < 50) return false;

        String lower = text.toLowerCase();

        // Explicit TOC markers
        if (lower.contains("table of contents")) return true;
        if (lower.startsWith("table of contents")) return true;

        // Count dot leaders (........) which are TOC's signature
        int dotLeaders = countMatches(text, "\\.{5,}");
        int lines = text.split("\n").length;

        // If more than 30% of lines have dot leaders → it's TOC
        if (lines > 5 && dotLeaders > (lines * 0.3)) return true;

        // Count page number references (X.Y.Z pattern with page nums)
        int tocPattern = countMatches(
                text, "\\d+\\.\\d+\\.?\\s+\\w+.*\\d{1,3}\\s*$"
        );

        if (tocPattern > 5) return true;

        // Multiple lines ending with page numbers
        int linesEndingWithNum = 0;
        for (String line : text.split("\n")) {
            if (line.trim().matches(".*\\s+\\d{1,3}\\s*$")) {
                linesEndingWithNum++;
            }
        }

        return lines > 5 && linesEndingWithNum > (lines * 0.5);
    }

    // ─── Garbage page detection ─────────────────────────────────
    private boolean isGarbagePage(String text) {
        if (text == null || text.length() < 30) return true;

        // Count actual words (3+ chars)
        long wordCount = java.util.Arrays.stream(text.split("\\s+"))
                .filter(w -> w.length() >= 3)
                .filter(w -> w.matches(".*[a-zA-Z].*"))
                .count();

        // Less than 20 real words → garbage
        return wordCount < 20;
    }

    // ─── Clean page text ────────────────────────────────────────
    private String cleanPageText(String text) {
        return text
                // Remove page numbers like "Rev. 8.0    3"
                .replaceAll("Rev\\.\\s*\\d+\\.\\d+\\s*\\d+", "")
                // Remove standalone page numbers
                .replaceAll("(?m)^\\s*\\d{1,3}\\s*$", "")
                // Remove dot leaders
                .replaceAll("\\.{4,}", " ")
                // Collapse whitespace
                .replaceAll("\\s+", " ")
                .trim();
    }

    private int countMatches(String text, String pattern) {
        java.util.regex.Matcher m =
                java.util.regex.Pattern.compile(pattern).matcher(text);
        int count = 0;
        while (m.find()) count++;
        return count;
    }

    @Transactional
    protected void saveBatch(List<DocumentChunk> chunks) {
        chunkRepository.saveAll(chunks);
    }

    @Transactional
    protected void updateStatus(
            Document document,
            Document.IngestionStatus status) {
        document.setStatus(status);
        documentRepository.save(document);
    }

    @Transactional
    protected void finalizeDocument(
            Document document, int totalChunks) {
        document.setTotalChunks(totalChunks);
        document.setStatus(Document.IngestionStatus.EMBEDDING);
        documentRepository.save(document);
        log.info("Ingestion complete: {} chunks", totalChunks);
    }

    // ─── Chunking (unchanged) ───────────────────────────────────
    private List<String> splitIntoChunks(String text) {
        List<String> chunks = new ArrayList<>();
        if (text == null || text.isEmpty()) return chunks;

        if (text.length() <= chunkSize) {
            chunks.add(text);
            return chunks;
        }

        int start = 0;
        int textLen = text.length();

        while (start < textLen) {
            int end = Math.min(start + chunkSize, textLen);

            if (end < textLen) {
                int breakPoint = findBreakPoint(text, start, end);
                if (breakPoint > start) end = breakPoint;
            }

            String chunk = text.substring(start, end).trim();
            if (!chunk.isEmpty()) chunks.add(chunk);

            start = Math.max(start + 1, end - chunkOverlap);
        }

        return chunks;
    }

    private int findBreakPoint(String text, int start, int end) {
        int lastPeriod = text.lastIndexOf(". ", end);
        if (lastPeriod > start + (chunkSize / 2))
            return lastPeriod + 2;

        int lastNewline = text.lastIndexOf('\n', end);
        if (lastNewline > start + (chunkSize / 2))
            return lastNewline + 1;

        int lastSpace = text.lastIndexOf(' ', end);
        if (lastSpace > start + (chunkSize / 2))
            return lastSpace + 1;

        return end;
    }
}
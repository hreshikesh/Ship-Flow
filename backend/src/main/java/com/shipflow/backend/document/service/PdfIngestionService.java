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

    private final DocumentRepository documentRepository;
    private final DocumentChunkRepository chunkRepository;

    @Value("${rag.chunk-size:600}")
    private int chunkSize;

    @Value("${rag.chunk-overlap:80}")
    private int chunkOverlap;

    @Value("${rag.pdf-path:knowledge/SHIPFLOW_Manual.pdf}")
    private String pdfPath;

    // Save every N pages to avoid holding everything in memory
    private static final int PAGE_BATCH_SIZE = 20;

    public Document ingestPdf(String fileName) throws IOException {
        log.info("Starting PDF ingestion: {}", fileName);

        if (documentRepository.existsByFileName(fileName)) {
            log.info("Already ingested: {}", fileName);
            return documentRepository.findByFileName(fileName).orElseThrow();
        }

        InputStream pdfStream = getClass()
                .getClassLoader()
                .getResourceAsStream(pdfPath);

        if (pdfStream == null) {
            throw new IllegalArgumentException(
                    "PDF not found at: src/main/resources/" + pdfPath);
        }

        // ✅ Read bytes then close stream immediately
        byte[] pdfBytes = pdfStream.readAllBytes();
        pdfStream.close();

        try (PDDocument pdDocument = Loader.loadPDF(pdfBytes)) {

            // ✅ Free the raw bytes immediately after loading
            pdfBytes = null;
            System.gc();

            int pageCount = pdDocument.getNumberOfPages();
            log.info("PDF loaded: {} pages", pageCount);

            // Save document record
            Document document = saveDocumentRecord(fileName, pageCount);

            // Process pages in batches
            int globalChunkIndex = processPages(pdDocument, document, pageCount);

            // Finalize
            finalizeDocument(document, globalChunkIndex);

            return document;
        }
    }

    // ─── Save document metadata ───────────────────────────────────

    @Transactional
    protected Document saveDocumentRecord(String fileName, int pageCount) {
        Document document = Document.builder()
                .title("SHIPFLOW Manual")
                .fileName(fileName)
                .pageCount(pageCount)
                .status(Document.IngestionStatus.EXTRACTING)
                .build();
        return documentRepository.save(document);
    }

    // ─── Process pages in small batches ──────────────────────────

    protected int processPages(PDDocument pdDocument,
                               Document document,
                               int pageCount) throws IOException {

        PDFTextStripper stripper = new PDFTextStripper();
        int globalChunkIndex = 0;

        updateStatus(document, Document.IngestionStatus.CHUNKING);

        for (int pageStart = 1; pageStart <= pageCount;
             pageStart += PAGE_BATCH_SIZE) {

            int pageEnd = Math.min(pageStart + PAGE_BATCH_SIZE - 1, pageCount);

            // ✅ Process small page range
            List<DocumentChunk> batchChunks = new ArrayList<>();

            for (int page = pageStart; page <= pageEnd; page++) {
                stripper.setStartPage(page);
                stripper.setEndPage(page);

                String pageText = stripper.getText(pdDocument);

                if (pageText == null || pageText.isBlank()) {
                    continue;
                }

                // ✅ Trim immediately to free memory
                pageText = pageText.trim();

                List<String> chunks = splitIntoChunks(pageText);

                // ✅ Clear pageText reference
                pageText = null;

                for (String chunkContent : chunks) {
                    if (chunkContent == null
                            || chunkContent.trim().length() < 30) {
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

            // ✅ Save batch and clear list immediately
            if (!batchChunks.isEmpty()) {
                saveBatch(batchChunks);
                batchChunks.clear();
            }

            log.info("Processed pages {}-{} / {} | Total chunks: {}",
                    pageStart, pageEnd, pageCount, globalChunkIndex);

            // ✅ Hint GC between batches
            System.gc();
        }

        return globalChunkIndex;
    }

    // ─── Save batch in its own transaction ───────────────────────

    @Transactional
    protected void saveBatch(List<DocumentChunk> chunks) {
        chunkRepository.saveAll(chunks);
    }

    @Transactional
    protected void updateStatus(Document document,
                                Document.IngestionStatus status) {
        document.setStatus(status);
        documentRepository.save(document);
    }

    @Transactional
    protected void finalizeDocument(Document document, int totalChunks) {
        document.setTotalChunks(totalChunks);
        document.setStatus(Document.IngestionStatus.EMBEDDING);
        documentRepository.save(document);
        log.info("Ingestion complete: {} chunks created", totalChunks);
    }

    // ─── Memory-efficient chunking ────────────────────────────────

    private List<String> splitIntoChunks(String text) {
        List<String> chunks = new ArrayList<>();

        if (text == null || text.isEmpty()) return chunks;

        // ✅ Use StringBuilder to avoid creating many String objects
        if (text.length() <= chunkSize) {
            chunks.add(text);
            return chunks;
        }

        int start = 0;
        int textLen = text.length();

        while (start < textLen) {
            int end = Math.min(start + chunkSize, textLen);

            // Find natural break point
            if (end < textLen) {
                int breakPoint = findBreakPoint(text, start, end);
                if (breakPoint > start) {
                    end = breakPoint;
                }
            }

            // ✅ Only create substring when needed
            String chunk = text.substring(start, end).trim();
            if (!chunk.isEmpty()) {
                chunks.add(chunk);
            }

            // Move forward with overlap
            start = Math.max(start + 1, end - chunkOverlap);
        }

        return chunks;
    }

    private int findBreakPoint(String text, int start, int end) {
        // Try period + space
        int lastPeriod = text.lastIndexOf(". ", end);
        if (lastPeriod > start + (chunkSize / 2)) {
            return lastPeriod + 2;
        }

        // Try newline
        int lastNewline = text.lastIndexOf('\n', end);
        if (lastNewline > start + (chunkSize / 2)) {
            return lastNewline + 1;
        }

        // Try space
        int lastSpace = text.lastIndexOf(' ', end);
        if (lastSpace > start + (chunkSize / 2)) {
            return lastSpace + 1;
        }

        return end;
    }
}
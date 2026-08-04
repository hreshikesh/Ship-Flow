package com.shipflow.backend.document.service;

import com.shipflow.backend.document.entity.Document;
import com.shipflow.backend.document.repository.DocumentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class DocumentService {

    private final PdfIngestionService pdfIngestionService;
    private final DocumentRepository documentRepository;

    @Async
    public void ingestAndEmbed(String fileName) {
        try {
            // ✅ Only extract + chunk. NO embedding for now.
            Document document = pdfIngestionService.ingestPdf(fileName);

            // Mark as completed (no embedding needed for keyword search)
            document.setStatus(Document.IngestionStatus.COMPLETED);
            documentRepository.save(document);

            log.info("✅ Ingestion complete: {} chunks ready for keyword search",
                    document.getTotalChunks());

        } catch (IOException e) {
            log.error("Failed to ingest: {}", fileName, e);
        }
    }

    public List<Document> getAllDocuments() {
        return documentRepository.findAll();
    }

    public Document getDocument(Long id) {
        return documentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Not found: " + id));
    }
}
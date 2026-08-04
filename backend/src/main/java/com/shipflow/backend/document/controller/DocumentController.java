package com.shipflow.backend.document.controller;

import com.shipflow.backend.document.entity.Document;
import com.shipflow.backend.document.service.DocumentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/documents")
@RequiredArgsConstructor
@Tag(name = "Documents", description = "Document management")
@CrossOrigin(origins = "http://localhost:5173")
public class DocumentController {

    private final DocumentService documentService;

    @GetMapping
    @Operation(summary = "List all documents with status")
    public ResponseEntity<List<Document>> getAll() {
        return ResponseEntity.ok(documentService.getAllDocuments());
    }

    @GetMapping("/{id}/status")
    @Operation(summary = "Get ingestion status + progress")
    public ResponseEntity<Map<String, Object>> getStatus(
            @PathVariable Long id) {
        Document doc = documentService.getDocument(id);
        return ResponseEntity.ok(Map.of(
                "id", doc.getId(),
                "fileName", doc.getFileName(),
                "status", doc.getStatus(),
                "pageCount", doc.getPageCount(),
                "totalChunks", doc.getTotalChunks() != null
                        ? doc.getTotalChunks() : 0,
                "embeddedChunks", doc.getEmbeddedChunks(),
                "progressPercent", doc.getEmbeddingProgressPercent()
        ));
    }

    @PostMapping("/ingest")
    @Operation(summary = "Trigger manual ingestion")
    public ResponseEntity<Map<String, String>> ingest(
            @RequestParam String fileName) {
        documentService.ingestAndEmbed(fileName);
        return ResponseEntity.ok(Map.of(
                "message", "Ingestion started: " + fileName
        ));
    }
}
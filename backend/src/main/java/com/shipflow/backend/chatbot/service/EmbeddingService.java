package com.shipflow.backend.chatbot.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.shipflow.backend.document.entity.Document;
import com.shipflow.backend.document.entity.DocumentChunk;
import com.shipflow.backend.document.repository.DocumentChunkRepository;
import com.shipflow.backend.document.repository.DocumentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmbeddingService {


    private final DocumentChunkRepository chunkRepository;
    private final DocumentRepository documentRepository;
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final GeminiEmbeddingService geminiEmbeddingService;

    private static final int BATCH_SIZE = 10;
    private static final long RATE_LIMIT_DELAY_MS = 1500;

    @Transactional
    public void generateEmbeddings(Long documentId) {
        log.info("═══ Starting embedding generation for document: {} ═══",
                documentId);

        List<DocumentChunk> chunks = chunkRepository
                .findByDocumentIdOrderByPageNumberAscChunkIndexAsc(documentId);

        int total = chunks.size();
        log.info("Total chunks to embed: {}", total);

        // ✅ Use AtomicInteger — works inside lambdas
        AtomicInteger successCount = new AtomicInteger(0);
        AtomicInteger failCount = new AtomicInteger(0);

        for (int i = 0; i < chunks.size(); i += BATCH_SIZE) {
            int end = Math.min(i + BATCH_SIZE, chunks.size());
            List<DocumentChunk> batch = chunks.subList(i, end);

            for (DocumentChunk chunk : batch) {
                try {
                    float[] embedding = geminiEmbeddingService
                            .embed(chunk.getContent());

                    chunk.setEmbedding(toJsonString(embedding));
                    chunkRepository.save(chunk);
                    successCount.incrementAndGet(); // ✅

                } catch (Exception e) {
                    log.error("Failed chunk {} (page {}): {}",
                            chunk.getId(),
                            chunk.getPageNumber(),
                            e.getMessage());
                    failCount.incrementAndGet(); // ✅
                }
            }

            // ✅ Update progress - AtomicInteger works in lambda
            updateProgress(documentId, successCount.get());

            // Progress log
            int percent = (int) ((end * 100.0) / total);
            log.info("Progress: {}/{} chunks ({}%) | ✅ {} | ❌ {}",
                    end, total, percent,
                    successCount.get(),
                    failCount.get());

            // Rate limit delay
            if (end < chunks.size()) {
                try {
                    Thread.sleep(RATE_LIMIT_DELAY_MS);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                    log.warn("Embedding interrupted");
                    break;
                }
            }
        }

        // ✅ Mark complete - works because AtomicInteger.get() returns int
        int finalSuccess = successCount.get();
        documentRepository.findById(documentId).ifPresent(doc -> {
            doc.setStatus(Document.IngestionStatus.COMPLETED);
            doc.setEmbeddedChunks(finalSuccess); // ✅ effectively final
            doc.setCompletedAt(LocalDateTime.now());
            documentRepository.save(doc);
        });

        log.info("═══ Embedding complete: {} success, {} failed ═══",
                successCount.get(), failCount.get());
    }

    private void updateProgress(Long documentId, int embedded) {
        documentRepository.findById(documentId).ifPresent(doc -> {
            doc.setEmbeddedChunks(embedded);
            documentRepository.save(doc);
        });
    }

    public float[] embedQuery(String query) {
        return geminiEmbeddingService.embedQuery(query);
    }

    // float[] → "[0.1,0.2,...]"
    public String toJsonString(float[] embedding) {
        return "[" + IntStream.range(0, embedding.length)
                .mapToObj(i -> String.valueOf(embedding[i]))
                .collect(Collectors.joining(",")) + "]";
    }

    // "[0.1,0.2,...]" → float[]
    public float[] fromJsonString(String json) {
        try {
            List<Double> values = objectMapper.readValue(
                    json, new TypeReference<>() {});
            float[] result = new float[values.size()];
            for (int i = 0; i < values.size(); i++) {
                result[i] = values.get(i).floatValue();
            }
            return result;
        } catch (Exception e) {
            log.error("Failed to parse embedding: {}", e.getMessage());
            return new float[768];
        }
    }
}
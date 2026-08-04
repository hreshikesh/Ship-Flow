package com.shipflow.backend.chatbot.service;

import com.shipflow.backend.document.entity.DocumentChunk;
import com.shipflow.backend.document.repository.DocumentChunkRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class VectorSearchService {

    private final DocumentChunkRepository chunkRepository;
    private final EmbeddingService embeddingService;

    @Value("${rag.top-k:5}")
    private int topK;

    @Cacheable(value = "searchResults", key = "#query.hashCode()")
    public List<DocumentChunk> findRelevantChunks(String query) {
        log.info("Vector search for: {}", query);

        float[] queryEmbedding = embeddingService.embedQuery(query);

        List<DocumentChunk> allChunks =
                chunkRepository.findAllWithEmbeddings();

        if (allChunks.isEmpty()) {
            log.warn("No embedded chunks found — still ingesting?");
            return List.of();
        }

        List<DocumentChunk> results = allChunks.stream()
                .filter(c -> c.getEmbedding() != null)
                .sorted(Comparator.comparingDouble(chunk ->
                        -cosineSimilarity(
                                queryEmbedding,
                                embeddingService.fromJsonString(
                                        chunk.getEmbedding())
                        )
                ))
                .limit(topK)
                .toList();

        log.info("Found {} relevant chunks", results.size());
        return results;
    }

    private double cosineSimilarity(float[] a, float[] b) {
        if (a.length != b.length) return 0.0;

        double dot = 0.0, normA = 0.0, normB = 0.0;

        for (int i = 0; i < a.length; i++) {
            dot   += a[i] * b[i];
            normA += a[i] * a[i];
            normB += b[i] * b[i];
        }

        double denom = Math.sqrt(normA) * Math.sqrt(normB);
        return denom == 0 ? 0.0 : dot / denom;
    }
}
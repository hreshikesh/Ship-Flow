package com.shipflow.backend.chatbot.serviceImpl;

import com.shipflow.backend.document.entity.DocumentChunk;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class HybridSearchService {

    private final KeywordSearchService keywordSearchService;
    private final VectorSearchService  vectorSearchService;

    @Value("${rag.top-k:5}")
    private int topK;

    // Weight split: vector is more semantic, keyword is precise
    private static final double KEYWORD_WEIGHT = 0.35;
    private static final double VECTOR_WEIGHT  = 0.65;

    public List<ScoredResult> search(String query) {
        log.info("Hybrid search: {}", query);

        // ── Run both searches ──────────────────────────────────
        List<DocumentChunk> keywordResults =
                keywordSearchService.search(query);
        List<DocumentChunk> vectorResults  =
                vectorSearchService.findRelevantChunks(query);

        log.info("Keyword hits: {} | Vector hits: {}",
                keywordResults.size(), vectorResults.size());

        // ── Rank-based normalization ───────────────────────────
        Map<Long, Double> keywordScores =
                rankToScores(keywordResults, KEYWORD_WEIGHT);
        Map<Long, Double> vectorScores  =
                rankToScores(vectorResults, VECTOR_WEIGHT);

        // ── Merge all unique chunks ────────────────────────────
        Map<Long, DocumentChunk> allChunks = new LinkedHashMap<>();
        keywordResults.forEach(c -> allChunks.put(c.getId(), c));
        vectorResults.forEach(c  -> allChunks.put(c.getId(), c));

        // ── Combine scores and sort ────────────────────────────
        List<ScoredResult> results = allChunks.entrySet().stream()
                .map(entry -> {
                    Long id = entry.getKey();
                    double combined =
                            keywordScores.getOrDefault(id, 0.0) +
                                    vectorScores.getOrDefault(id, 0.0);
                    return new ScoredResult(entry.getValue(), combined);
                })
                .sorted(Comparator
                        .comparingDouble(ScoredResult::score)
                        .reversed())
                .limit(topK)
                .collect(Collectors.toList());

        log.info("Hybrid results: {}", results.size());
        return results;
    }

    // ── Rank → normalized score ────────────────────────────────
    private Map<Long, Double> rankToScores(
            List<DocumentChunk> chunks,
            double weight) {

        Map<Long, Double> scores = new LinkedHashMap<>();
        int size = chunks.size();

        for (int i = 0; i < size; i++) {
            // Best rank (0) → score 1.0, worst → approaches 0
            double score = ((double)(size - i) / size) * weight;
            scores.put(chunks.get(i).getId(), score);
        }

        return scores;
    }

    // ── Result record ──────────────────────────────────────────
    public record ScoredResult(DocumentChunk chunk, double score) {}
}
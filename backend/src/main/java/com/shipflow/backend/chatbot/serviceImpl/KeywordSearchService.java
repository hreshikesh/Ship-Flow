package com.shipflow.backend.chatbot.serviceImpl;

import com.shipflow.backend.document.entity.DocumentChunk;
import com.shipflow.backend.document.repository.DocumentChunkRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class KeywordSearchService {

    private final DocumentChunkRepository chunkRepository;

    @Value("${rag.top-k:5}")
    private int topK;

    private static final Set<String> STOP_WORDS = Set.of(
            "the", "a", "an", "is", "are", "was", "were",
            "how", "what", "when", "where", "why", "who",
            "do", "does", "did", "can", "could", "should",
            "would", "will", "to", "of", "in", "on", "at",
            "for", "with", "and", "or", "but", "i", "you",
            "it", "this", "that", "these", "those",
            "my", "your", "me", "we"
    );

    public List<DocumentChunk> search(String query) {
        log.info("Smart search: {}", query);

        if (query == null || query.isBlank()) return List.of();

        Map<Long, ScoredChunk> scored = new HashMap<>();

        // ── Strategy 1: Phrase search (compound terms) ─────────
        String[] words = query.trim().split("\\s+");
        if (words.length >= 2) {
            List<DocumentChunk> phraseResults =
                    chunkRepository.phraseSearch(query, 15);
            addResults(scored, phraseResults, 100.0);
            log.debug("Phrase search: {} hits", phraseResults.size());
        }

        // ── Strategy 2: Exact word matches (acronyms) ──────────
        List<String> keywords = extractKeywords(query);
        for (String keyword : keywords) {
            try {
                List<DocumentChunk> exact =
                        chunkRepository.searchByExactWord(keyword, 15);
                addResults(scored, exact, 80.0);
            } catch (Exception ignored) {}
        }

        // ── Strategy 3: Full-text search (main workhorse) ──────
        List<DocumentChunk> ftResults =
                chunkRepository.fullTextSearch(query, 20);
        addResults(scored, ftResults, 60.0);
        log.debug("Full-text: {} hits", ftResults.size());

        // ── Strategy 4: Fuzzy search (typos) ───────────────────
        if (scored.size() < 3) {
            // Only use fuzzy if we have few results
            List<DocumentChunk> fuzzy =
                    chunkRepository.fuzzySearch(query, 15);
            addResults(scored, fuzzy, 30.0);
            log.debug("Fuzzy fallback: {} hits", fuzzy.size());
        }

        // ── Strategy 5: Individual keyword full-text ───────────
        for (String keyword : keywords) {
            List<DocumentChunk> kwResults =
                    chunkRepository.fullTextSearch(keyword, 10);
            addResults(scored, kwResults, 20.0);
        }

        if (scored.isEmpty()) {
            log.warn("No matches for: {}", query);
            return List.of();
        }

        // Sort by combined score
        List<DocumentChunk> results = scored.values().stream()
                .sorted(Comparator.comparingDouble(
                        (ScoredChunk s) -> s.score).reversed())
                .limit(topK)
                .map(s -> s.chunk)
                .collect(Collectors.toList());

        log.info("Found {} chunks | top score: {}",
                results.size(),
                scored.values().stream()
                        .mapToDouble(s -> s.score)
                        .max().orElse(0));

        return results;
    }

    private List<String> extractKeywords(String query) {
        List<String> keywords = new ArrayList<>();

        // Preserve ALL-CAPS acronyms (RHOST, XPAN, HULLTYPE)
        for (String word : query.split("\\s+")) {
            String cleaned = word.replaceAll("[^a-zA-Z0-9]", "");
            if (cleaned.length() >= 2
                    && cleaned.equals(cleaned.toUpperCase())
                    && cleaned.matches("[A-Z0-9]+")) {
                keywords.add(cleaned);
            }
        }

        // Add normalized keywords
        List<String> normalized = Arrays.stream(
                        query.toLowerCase()
                                .replaceAll("[^a-z0-9\\s]", " ")
                                .split("\\s+"))
                .filter(word -> word.length() > 2)
                .filter(word -> !STOP_WORDS.contains(word))
                .distinct()
                .collect(Collectors.toList());

        keywords.addAll(normalized);
        return keywords.stream().distinct()
                .collect(Collectors.toList());
    }

    private void addResults(
            Map<Long, ScoredChunk> results,
            List<DocumentChunk> chunks,
            double baseWeight) {

        for (int i = 0; i < chunks.size(); i++) {
            DocumentChunk chunk = chunks.get(i);
            // Higher rank = higher score, decay for lower positions
            double score = baseWeight * (1.0 - (i * 0.05));

            ScoredChunk existing = results.get(chunk.getId());
            if (existing == null) {
                results.put(chunk.getId(), new ScoredChunk(chunk, score));
            } else {
                existing.score += score;
            }
        }
    }

    private static class ScoredChunk {
        final DocumentChunk chunk;
        double score;

        ScoredChunk(DocumentChunk chunk, double score) {
            this.chunk = chunk;
            this.score = score;
        }
    }
}
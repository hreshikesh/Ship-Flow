package com.shipflow.backend.chatbot.service;

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

    // Common words to ignore
    private static final Set<String> STOP_WORDS = Set.of(
            "the", "a", "an", "is", "are", "was", "were", "how", "what",
            "when", "where", "why", "who", "do", "does", "did", "can",
            "could", "should", "would", "will", "to", "of", "in", "on",
            "at", "for", "with", "and", "or", "but", "i", "you", "it",
            "this", "that", "these", "those", "my", "your", "me", "we"
    );

    public List<DocumentChunk> search(String query) {
        log.info("Keyword search for: {}", query);

        // Extract meaningful keywords
        List<String> keywords = extractKeywords(query);

        if (keywords.isEmpty()) {
            log.warn("No keywords extracted from query");
            return List.of();
        }

        log.info("Keywords: {}", keywords);

        // Score all chunks by keyword matches
        Map<Long, ScoredChunk> scored = new HashMap<>();

        for (String keyword : keywords) {
            // Search DB for chunks containing this keyword
            List<DocumentChunk> matches =
                    chunkRepository.searchByKeyword(keyword, 100);

            for (DocumentChunk chunk : matches) {
                scored.computeIfAbsent(
                        chunk.getId(),
                        id -> new ScoredChunk(chunk)
                ).addScore(keyword);
            }
        }

        if (scored.isEmpty()) {
            log.warn("No matching chunks found");
            return List.of();
        }

        // Sort by score, return top K
        List<DocumentChunk> results = scored.values().stream()
                .sorted(Comparator.comparingDouble(
                        (ScoredChunk sc) -> sc.score).reversed())
                .limit(topK)
                .map(sc -> sc.chunk)
                .collect(Collectors.toList());

        log.info("Found {} relevant chunks", results.size());
        return results;
    }

    private List<String> extractKeywords(String query) {
        return Arrays.stream(query.toLowerCase()
                        .replaceAll("[^a-z0-9\\s]", " ")
                        .split("\\s+"))
                .filter(word -> word.length() > 2)
                .filter(word -> !STOP_WORDS.contains(word))
                .distinct()
                .collect(Collectors.toList());
    }

    // Helper class to score chunks
    private static class ScoredChunk {
        final DocumentChunk chunk;
        double score = 0;
        final Set<String> matchedKeywords = new HashSet<>();

        ScoredChunk(DocumentChunk chunk) {
            this.chunk = chunk;
        }

        void addScore(String keyword) {
            // Count occurrences of keyword in content
            String content = chunk.getContent().toLowerCase();
            int occurrences = countOccurrences(content, keyword);

            // Base score: number of unique keywords matched
            if (!matchedKeywords.contains(keyword)) {
                matchedKeywords.add(keyword);
                score += 10; // bonus for each unique keyword
            }

            // Additional score for frequency
            score += occurrences * 2;
        }

        private int countOccurrences(String text, String keyword) {
            int count = 0;
            int index = 0;
            while ((index = text.indexOf(keyword, index)) != -1) {
                count++;
                index += keyword.length();
            }
            return count;
        }
    }
}
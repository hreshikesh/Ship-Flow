package com.shipflow.backend.chatbot.service;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.regex.Pattern;

@Component
@RequiredArgsConstructor
@Slf4j
public class ClarifyingQuestionDetector {

    // Patterns that indicate vague or broad queries
    private static final List<Pattern> VAGUE_PATTERNS = List.of(
            Pattern.compile("(?i)^\\s*(help|help\\s+me)\\s*$"),
            Pattern.compile("(?i)^\\s*(how|what|why)\\s*$"),
            Pattern.compile("(?i)^\\s*(explain|describe|tell\\s+me" +
                    "\\s+about)\\s*$"),
            Pattern.compile("(?i)^\\s*(setup|configure|start)\\s*$"),
            Pattern.compile("(?i)^\\s*(more|info|details)\\s*$"),
            Pattern.compile("(?i)^\\s*(which|what\\s+is\\s+the\\s+best)" +
                    "\\s*\\??\\s*$")
    );

    // Vague keywords
    private static final Set<String> VAGUE_KEYWORDS = Set.of(
            "help", "support", "issue", "problem", "thing",
            "stuff", "this", "that"
    );

    // ── Should we ask for clarification? ────────────────────────
    public ClarificationResult shouldAskClarification(
            String userMessage,
            List<HybridSearchService.ScoredResult> searchResults) {

        if (userMessage == null || userMessage.isBlank()) {
            return ClarificationResult.NO;
        }

        String lower = userMessage.toLowerCase().trim();
        String[] words = lower.split("\\s+");

        // 1. Very short query (1-2 words)
        if (words.length <= 2 && !isSpecificKeyword(words[0])) {
            log.debug("Vague: too short [{}]", userMessage);
            return ClarificationResult.SHORT_QUERY;
        }

        // 2. Matches vague pattern
        for (Pattern p : VAGUE_PATTERNS) {
            if (p.matcher(userMessage).matches()) {
                log.debug("Vague: matched pattern [{}]", userMessage);
                return ClarificationResult.VAGUE_PATTERN;
            }
        }

        // 3. Only contains vague keywords
        if (words.length <= 4) {
            boolean allVague = Arrays.stream(words)
                    .allMatch(w ->
                            VAGUE_KEYWORDS.contains(w) ||
                                    w.length() < 4);
            if (allVague && !isSpecificKeyword(words[0])) {
                return ClarificationResult.VAGUE_KEYWORDS;
            }
        }

        // 4. Search results are weak AND query is broad
        if (!searchResults.isEmpty()) {
            double topScore = searchResults.get(0).score();
            if (topScore < 0.3 && words.length <= 5) {
                return ClarificationResult.LOW_CONFIDENCE;
            }
        }

        return ClarificationResult.NO;
    }

    // ── Is this a specific technical keyword? ───────────────────
    private boolean isSpecificKeyword(String word) {
        if (word == null) return false;
        String lower = word.toLowerCase();

        return lower.matches(".*(xflow|xmesh|xpan|xbound|xgrid|" +
                "xchap|xpost|hull|mesh|grid|solver|" +
                "rans|propeller|rudder|transom|" +
                "bulbous|convergence|actuator).*");
    }

    // ── Build the clarifying question ───────────────────────────
    public String buildClarification(
            String userMessage,
            ClarificationResult reason) {

        return switch (reason) {

            case SHORT_QUERY -> String.format("""
                    I want to make sure I help you with the right \
                    thing. Could you give me a bit more detail on \
                    "%s"?

                    For example, are you asking about:
                    - A specific **SHIPFLOW module** (XFLOW, XPAN, \
                    XCHAP, etc.)?
                    - A specific **step** in the workflow?
                    - A particular **error or issue** you're facing?
                    """, userMessage);

            case VAGUE_PATTERN -> """
                    I'd love to help! To give you the most accurate \
                    answer, could you tell me more specifically \
                    what you're looking for?

                    SHIPFLOW has several modules — here's what I \
                    can help with:
                    - **XFLOW** — geometry and commands
                    - **XMESH** / **XGRID** — mesh generation
                    - **XPAN** — potential flow solver
                    - **XBOUND** — boundary layer
                    - **XCHAP** — RANS solver, VOF, wake
                    - **XPOST** — post-processing

                    Which area would you like to explore?
                    """;

            case VAGUE_KEYWORDS -> """
                    Could you tell me a bit more about what you need?

                    For example:
                    - "How do I set up XPAN?"
                    - "What commands are in XFLOW?"
                    - "How does resistance calculation work?"
                    """;

            case LOW_CONFIDENCE -> """
                    I found some related information, but to give you \
                    the most useful answer, could you clarify:

                    Are you asking about a specific SHIPFLOW command, \
                    a workflow step, or a general concept?
                    """;

            default -> null;
        };
    }

    // ── Result enum ─────────────────────────────────────────────
    public enum ClarificationResult {
        NO,
        SHORT_QUERY,
        VAGUE_PATTERN,
        VAGUE_KEYWORDS,
        LOW_CONFIDENCE
    }
}
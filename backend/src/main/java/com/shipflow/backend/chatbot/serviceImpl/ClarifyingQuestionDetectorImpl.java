package com.shipflow.backend.chatbot.serviceImpl;

import com.shipflow.backend.chatbot.dto.ClarificationReason;
import com.shipflow.backend.chatbot.service.ClarifyingQuestionDetector;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.regex.Pattern;

@Component
@RequiredArgsConstructor
@Slf4j
public class ClarifyingQuestionDetectorImpl
        implements ClarifyingQuestionDetector {

    // ─────────────────────────────────────────────────────────────
    // Configuration constants
    // ─────────────────────────────────────────────────────────────

    private static final int SHORT_QUERY_THRESHOLD    = 2;
    private static final int VAGUE_KEYWORDS_THRESHOLD = 4;
    private static final int LOW_CONFIDENCE_THRESHOLD = 5;
    private static final double LOW_SCORE_THRESHOLD   = 0.3;

    // ─────────────────────────────────────────────────────────────
    // Vague query patterns
    // ─────────────────────────────────────────────────────────────

    private static final List<Pattern> VAGUE_PATTERNS = List.of(
            Pattern.compile("(?i)^\\s*(help|help\\s+me)\\s*$"),
            Pattern.compile("(?i)^\\s*(how|what|why)\\s*$"),
            Pattern.compile("(?i)^\\s*(explain|describe|" +
                    "tell\\s+me\\s+about)\\s*$"),
            Pattern.compile("(?i)^\\s*(setup|configure|start)\\s*$"),
            Pattern.compile("(?i)^\\s*(more|info|details)\\s*$"),
            Pattern.compile("(?i)^\\s*(which|what\\s+is\\s+the\\s+best)" +
                    "\\s*\\??\\s*$")
    );

    // ── Vague/generic keywords ──────────────────────────────────
    private static final Set<String> VAGUE_KEYWORDS = Set.of(
            "help", "support", "issue", "problem",
            "thing", "stuff", "this", "that"
    );

    // ── SHIPFLOW-specific technical keywords ────────────────────
    private static final Pattern SPECIFIC_KEYWORD_PATTERN =
            Pattern.compile(".*(xflow|xmesh|xpan|xbound|xgrid|" +
                    "xchap|xpost|hull|mesh|grid|solver|" +
                    "rans|propeller|rudder|transom|" +
                    "bulbous|convergence|actuator).*");

    // ─────────────────────────────────────────────────────────────
    // Main check method
    // ─────────────────────────────────────────────────────────────

    @Override
    public ClarificationReason shouldAskClarification(
            String userMessage,
            List<HybridSearchService.ScoredResult> searchResults) {

        // Empty/null message
        if (userMessage == null || userMessage.isBlank()) {
            return ClarificationReason.NO;
        }

        String lower = userMessage.toLowerCase().trim();
        String[] words = lower.split("\\s+");

        // 1. Very short query
        if (isShortQuery(words)) {
            log.debug("Vague: too short [{}]", userMessage);
            return ClarificationReason.SHORT_QUERY;
        }

        // 2. Matches vague pattern
        if (matchesVaguePattern(userMessage)) {
            log.debug("Vague: matched pattern [{}]", userMessage);
            return ClarificationReason.VAGUE_PATTERN;
        }

        // 3. Only contains vague keywords
        if (containsOnlyVagueKeywords(words)) {
            log.debug("Vague: only vague keywords [{}]", userMessage);
            return ClarificationReason.VAGUE_KEYWORDS;
        }

        // 4. Low search confidence
        if (hasLowConfidenceResults(searchResults, words)) {
            log.debug("Vague: low confidence [{}]", userMessage);
            return ClarificationReason.LOW_CONFIDENCE;
        }

        return ClarificationReason.NO;
    }

    // ─────────────────────────────────────────────────────────────
    // Build clarification message
    // ─────────────────────────────────────────────────────────────

    @Override
    public String buildClarification(
            String userMessage,
            ClarificationReason reason) {

        return switch (reason) {

            case SHORT_QUERY -> buildShortQueryMessage(userMessage);
            case VAGUE_PATTERN   -> buildVaguePatternMessage();
            case VAGUE_KEYWORDS  -> buildVagueKeywordsMessage();
            case LOW_CONFIDENCE  -> buildLowConfidenceMessage();
            default              -> null;
        };
    }

    // ─────────────────────────────────────────────────────────────
    // Private detection helpers
    // ─────────────────────────────────────────────────────────────

    private boolean isShortQuery(String[] words) {
        return words.length <= SHORT_QUERY_THRESHOLD
                && !isSpecificKeyword(words[0]);
    }

    private boolean matchesVaguePattern(String userMessage) {
        for (Pattern pattern : VAGUE_PATTERNS) {
            if (pattern.matcher(userMessage).matches()) return true;
        }
        return false;
    }

    private boolean containsOnlyVagueKeywords(String[] words) {
        if (words.length > VAGUE_KEYWORDS_THRESHOLD) return false;
        if (isSpecificKeyword(words[0])) return false;

        return Arrays.stream(words).allMatch(word ->
                VAGUE_KEYWORDS.contains(word) || word.length() < 4);
    }

    private boolean hasLowConfidenceResults(
            List<HybridSearchService.ScoredResult> searchResults,
            String[] words) {

        if (searchResults.isEmpty()) return false;
        if (words.length > LOW_CONFIDENCE_THRESHOLD) return false;

        double topScore = searchResults.get(0).score();
        return topScore < LOW_SCORE_THRESHOLD;
    }

    private boolean isSpecificKeyword(String word) {
        if (word == null) return false;
        return SPECIFIC_KEYWORD_PATTERN
                .matcher(word.toLowerCase())
                .matches();
    }

    // ─────────────────────────────────────────────────────────────
    // Private message builders
    // ─────────────────────────────────────────────────────────────

    private String buildShortQueryMessage(String userMessage) {
        return String.format("""
                I want to make sure I help you with the right thing. \
                Could you give me a bit more detail on "%s"?

                For example, are you asking about:
                - A specific **SHIPFLOW module** (XFLOW, XPAN, \
                XCHAP, etc.)?
                - A specific **step** in the workflow?
                - A particular **error or issue** you're facing?
                """, userMessage);
    }

    private String buildVaguePatternMessage() {
        return """
                I'd love to help! To give you the most accurate \
                answer, could you tell me more specifically what \
                you're looking for?

                SHIPFLOW has several modules — here's what I can \
                help with:
                - **XFLOW** — geometry and commands
                - **XMESH** / **XGRID** — mesh generation
                - **XPAN** — potential flow solver
                - **XBOUND** — boundary layer
                - **XCHAP** — RANS solver, VOF, wake
                - **XPOST** — post-processing

                Which area would you like to explore?
                """;
    }

    private String buildVagueKeywordsMessage() {
        return """
                Could you tell me a bit more about what you need?

                For example:
                - "How do I set up XPAN?"
                - "What commands are in XFLOW?"
                - "How does resistance calculation work?"
                """;
    }

    private String buildLowConfidenceMessage() {
        return """
                I found some related information, but to give you \
                the most useful answer, could you clarify:

                Are you asking about a specific SHIPFLOW command, \
                a workflow step, or a general concept?
                """;
    }
}
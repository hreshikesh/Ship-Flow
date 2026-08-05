package com.shipflow.backend.chatbot.serviceImpl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Component
@RequiredArgsConstructor
@Slf4j
public class QueryReformulator {

    private final ConversationMemory conversationMemory;

    // ── Pronouns and references to resolve ──────────────────────
    private static final Set<String> PRONOUN_WORDS = Set.of(
            "it", "its", "this", "that", "these", "those",
            "them", "they", "the same"
    );

    private static final Set<String> CONTINUATION_PHRASES = Set.of(
            "tell me more", "more details", "explain more",
            "go deeper", "elaborate", "continue",
            "more about", "expand on", "what else",
            "give me more", "anything else", "and",
            "also", "keep going", "more info",
            "more information", "details"
    );

    private static final Set<String> FOLLOW_UP_PHRASES = Set.of(
            "how about", "what about", "and what",
            "what if", "can it", "does it",
            "is it", "can you", "show me"
    );

    // ── Main reform method ──────────────────────────────────────
    public ReformResult reform(String query, String conversationId) {
        String original = query.trim();
        String lower = original.toLowerCase();

        // No history → nothing to reform
        if (!conversationMemory.hasHistory(conversationId)) {
            return new ReformResult(original, false, null);
        }

        // Get last discussed topic from history
        String lastTopic = extractLastTopic(conversationId);
        if (lastTopic == null || lastTopic.isBlank()) {
            return new ReformResult(original, false, null);
        }

        String reformed = original;
        boolean wasReformed = false;

        // ── Case 1: Pure continuation ("tell me more") ─────────
        if (isContinuation(lower)) {
            reformed = "Tell me more about " + lastTopic;
            wasReformed = true;
            log.info("Reformulated continuation: '{}' → '{}'",
                    original, reformed);
        }

        // ── Case 2: Pronoun resolution ("explain it") ──────────
        else if (containsPronoun(lower)) {
            reformed = resolvePronoun(original, lower, lastTopic);
            wasReformed = !reformed.equals(original);
            if (wasReformed) {
                log.info("Reformulated pronoun: '{}' → '{}'",
                        original, reformed);
            }
        }

        // ── Case 3: Follow-up ("how about X") ──────────────────
        else if (isFollowUp(lower)) {
            reformed = resolveFollowUp(original, lower, lastTopic);
            wasReformed = !reformed.equals(original);
            if (wasReformed) {
                log.info("Reformulated follow-up: '{}' → '{}'",
                        original, reformed);
            }
        }

        // ── Case 4: Very short query (1-2 words) ───────────────
        else if (lower.split("\\s+").length <= 2
                && !isStandaloneValid(lower)) {
            reformed = original + " in SHIPFLOW " + lastTopic;
            wasReformed = true;
            log.info("Reformulated short query: '{}' → '{}'",
                    original, reformed);
        }

        return new ReformResult(reformed, wasReformed, lastTopic);
    }

    // ── Extract last topic from conversation ────────────────────
    private String extractLastTopic(String conversationId) {
        // Try from recent topics first
        List<String> topics =
                conversationMemory.getRecentTopics(conversationId);
        if (!topics.isEmpty()) {
            return topics.get(topics.size() - 1);
        }

        // Fall back to last user message keywords
        String lastMsg =
                conversationMemory.getLastUserMessage(conversationId);
        if (lastMsg != null) {
            return extractKeyPhrase(lastMsg);
        }

        return null;
    }

    // ── Extract key phrase from a message ───────────────────────
    private String extractKeyPhrase(String message) {
        String lower = message.toLowerCase();

        // Check for SHIPFLOW module names
        String[] modules = {
                "xflow", "xmesh", "xpan", "xbound",
                "xgrid", "xgr8", "xchap", "xpost"
        };
        for (String mod : modules) {
            if (lower.contains(mod)) return mod.toUpperCase();
        }

        // Check for domain topics
        Map<String, String> domainKeywords = Map.ofEntries(
                Map.entry("hull",        "hull design"),
                Map.entry("resistance",  "resistance prediction"),
                Map.entry("propeller",   "propulsion"),
                Map.entry("mesh",        "mesh generation"),
                Map.entry("grid",        "grid generation"),
                Map.entry("solver",      "solvers"),
                Map.entry("boundary",    "boundary layer"),
                Map.entry("convergence", "convergence"),
                Map.entry("wake",        "wake analysis"),
                Map.entry("wave",        "wave resistance"),
                Map.entry("turbulence",  "turbulence modeling"),
                Map.entry("remote",      "remote computation"),
                Map.entry("parallel",    "parallel computing"),
                Map.entry("offset",      "offset file format")
        );

        for (var entry : domainKeywords.entrySet()) {
            if (lower.contains(entry.getKey())) {
                return entry.getValue();
            }
        }

        // Return cleaned version of original
        return message.replaceAll("[^a-zA-Z0-9\\s]", "")
                .trim();
    }

    // ── Check helpers ───────────────────────────────────────────

    private boolean isContinuation(String lower) {
        return CONTINUATION_PHRASES.stream()
                .anyMatch(lower::contains);
    }

    private boolean containsPronoun(String lower) {
        for (String pronoun : PRONOUN_WORDS) {
            Pattern p = Pattern.compile(
                    "\\b" + Pattern.quote(pronoun) + "\\b");
            if (p.matcher(lower).find()) return true;
        }
        return false;
    }

    private boolean isFollowUp(String lower) {
        return FOLLOW_UP_PHRASES.stream()
                .anyMatch(lower::startsWith);
    }

    private boolean isStandaloneValid(String lower) {
        // These short queries are valid by themselves
        Set<String> valid = Set.of(
                "xflow", "xmesh", "xpan", "xbound",
                "xgrid", "xgr8", "xchap", "xpost",
                "shipflow", "help"
        );
        return valid.stream().anyMatch(lower::contains);
    }

    // ── Pronoun resolution ──────────────────────────────────────

    private String resolvePronoun(
            String original, String lower, String topic) {

        // "explain it" → "explain XPAN"
        // "how does it work" → "how does XPAN work"
        // "what are its features" → "what are XPAN features"

        String resolved = original;

        for (String pronoun : PRONOUN_WORDS) {
            Pattern p = Pattern.compile(
                    "(?i)\\b" + Pattern.quote(pronoun) + "\\b");
            Matcher m = p.matcher(resolved);
            if (m.find()) {
                resolved = m.replaceFirst(topic);
            }
        }

        return resolved;
    }

    // ── Follow-up resolution ────────────────────────────────────

    private String resolveFollowUp(
            String original, String lower, String topic) {

        // "how about convergence" → stays as is (has specific topic)
        // "how about that" → "how about XPAN"
        if (containsPronoun(lower)) {
            return resolvePronoun(original, lower, topic);
        }

        return original;
    }

    // ── Result record ───────────────────────────────────────────

    public record ReformResult(
            String query,
            boolean wasReformed,
            String resolvedTopic
    ) {}
}
package com.shipflow.backend.chatbot.dto;

import java.util.List;


public record ClarificationResult(
        boolean needsClarification,
        String message,
        List<String> options
) {

    // ── Factory: No clarification needed ────────────────────────
    public static ClarificationResult clear() {
        return new ClarificationResult(false, null, List.of());
    }

    // ── Factory: Clarification needed ───────────────────────────
    public static ClarificationResult needsClarification(
            String message,
            List<String> options) {

        return new ClarificationResult(true, message, options);
    }
}
package com.shipflow.backend.chatbot.dto;


public enum ClarificationReason {

    /** No clarification needed — query is clear */
    NO,

    /** Query is too short (1-2 words) with no specific keywords */
    SHORT_QUERY,

    /** Query matches a known vague pattern (e.g., "help", "how?") */
    VAGUE_PATTERN,

    /** Query only contains vague/generic keywords */
    VAGUE_KEYWORDS,

    /** Search results have low confidence (weak relevance) */
    LOW_CONFIDENCE
}
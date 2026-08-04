package com.shipflow.backend.chatbot.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
public class ChatResponse {

    private String        response;
    private String        conversationId;
    private LocalDateTime timestamp;

    // ── Intelligence fields ────────────────────────────────────
    private List<String>  suggestions;   // follow-up questions
    private List<String>  sources;       // doc sources used
    private Double        confidence;    // 0.0 - 1.0
    private String        intent;        // detected intent
    private String        searchMode;    // hybrid/keyword
}
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

    // ✅ Fields your frontend already expects
    private List<String>  sources;
    private Double        confidence;
    private String        searchMode;
}
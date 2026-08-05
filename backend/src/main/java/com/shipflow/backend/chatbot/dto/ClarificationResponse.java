package com.shipflow.backend.chatbot.dto;

import java.util.List;


public record ClarificationResponse(
        String message,
        List<String> options
) {}
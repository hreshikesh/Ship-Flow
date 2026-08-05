package com.shipflow.backend.chatbot.service;

import com.shipflow.backend.chatbot.dto.ClarificationResult;

public interface ClarificationDetector {


    ClarificationResult check(String query, boolean hasHistory);
}
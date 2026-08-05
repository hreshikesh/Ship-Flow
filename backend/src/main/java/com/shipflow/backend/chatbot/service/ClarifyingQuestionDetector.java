package com.shipflow.backend.chatbot.service;

import com.shipflow.backend.chatbot.dto.ClarificationReason;
import com.shipflow.backend.chatbot.serviceImpl.HybridSearchService;

import java.util.List;

/**
 * Detects when a user query is too vague or ambiguous to answer
 * accurately, and builds helpful clarifying questions.
 */
public interface ClarifyingQuestionDetector {

    ClarificationReason shouldAskClarification(
            String userMessage,
            List<HybridSearchService.ScoredResult> searchResults);


    String buildClarification(
            String userMessage,
            ClarificationReason reason);
}
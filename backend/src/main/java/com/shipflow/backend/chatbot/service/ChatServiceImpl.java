package com.shipflow.backend.chatbot.service;

import com.shipflow.backend.chatbot.dto.ChatRequest;
import com.shipflow.backend.chatbot.dto.ChatResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class ChatServiceImpl implements ChatService {

    private final HybridSearchService hybridSearchService;
    private final GroqChatService     groqChatService;     // ← Groq now
    private final ConversationMemory  conversationMemory;

    private static final int MAX_CONTEXT_CHARS = 3000;

    @Override
    public ChatResponse chat(ChatRequest request) {
        String answer = generateAnswer(
                request.getMessage(),
                request.getConversationId()
        );

        // Save to memory
        conversationMemory.addUserMessage(
                request.getConversationId(),
                request.getMessage()
        );
        conversationMemory.addAssistantMessage(
                request.getConversationId(),
                answer
        );

        return ChatResponse.builder()
                .response(answer)
                .conversationId(request.getConversationId())
                .timestamp(LocalDateTime.now())
                .build();
    }

    @Override
    public String chat(String userMessage) {
        return generateAnswer(userMessage, null);
    }

    // ── Core pipeline ───────────────────────────────────────────
    private String generateAnswer(
            String userMessage,
            String conversationId) {

        log.info("Query: {}", userMessage);

        // 1. Hybrid search (keyword + vector)
        List<HybridSearchService.ScoredResult> results =
                hybridSearchService.search(userMessage);

        // 2. Nothing found
        if (results.isEmpty()) {
            return buildNotFoundMessage(userMessage);
        }

        // 3. Build clean context
        String context = buildContext(results);
        log.info("Context: {} chars", context.length());

        // 4. Conversation history
        List<Map<String, Object>> history =
                conversationMemory.getHistory(conversationId);

        // 5. Groq polishes the answer
        return groqChatService.generateAnswer(
                userMessage, context, history);
    }

    // ── Context builder ─────────────────────────────────────────
    private String buildContext(
            List<HybridSearchService.ScoredResult> results) {

        StringBuilder ctx = new StringBuilder();
        int totalChars = 0;

        for (HybridSearchService.ScoredResult result : results) {
            String content = cleanContent(
                    result.chunk().getContent());

            if (content.isBlank()) continue;
            if (totalChars + content.length() > MAX_CONTEXT_CHARS) break;

            ctx.append(content).append("\n\n");
            totalChars += content.length();
        }

        return ctx.toString().trim();
    }

    // ── Content cleaner ─────────────────────────────────────────
    private String cleanContent(String content) {
        if (content == null || content.isBlank()) return "";

        return content
                .replaceAll("\\s+",             " ")
                .replaceAll("(?i)page\\s*\\d+", "")
                .replaceAll("[^\\x20-\\x7E]",   " ")
                .trim();
    }

    // ── Not found ───────────────────────────────────────────────
    private String buildNotFoundMessage(String query) {
        return String.format("""
                I couldn't find specific information about "%s" \
                in the SHIPFLOW documentation.
                
                The documentation covers:
                - BASIC and RANS solvers
                - Hull design and optimization
                - Resistance and seakeeping predictions
                - CFD workflows and configurations
                
                Try rephrasing your question or asking about \
                one of the topics above.
                """, query);
    }
}
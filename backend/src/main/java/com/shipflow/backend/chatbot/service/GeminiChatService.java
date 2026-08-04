package com.shipflow.backend.chatbot.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.shipflow.backend.config.GeminiConfig;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class GeminiChatService {

    private final GeminiConfig geminiConfig;
    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper = new ObjectMapper();

    private static final String CHAT_URL =
            "https://generativelanguage.googleapis.com/v1beta/models/%s:generateContent?key=%s";

    private static final String SYSTEM_PROMPT = """
            You are SHIPFLOW AI, an expert assistant for the SHIPFLOW \
            computational fluid dynamics (CFD) software.
            
            Rules you MUST follow:
            - Answer ONLY based on the documentation context provided
            - Never make up information not present in the context
            - Be concise, clear and professional
            - Use natural language — do NOT copy-paste raw text
            - Format with line breaks for readability
            - If context is insufficient, say so honestly
            - Tone: like a senior CFD engineer helping a colleague
            """;

    // ── Main entry point ────────────────────────────────────────
    public String generateAnswer(
            String userMessage,
            String context,
            List<Map<String, Object>> history) {

        try {
            String prompt  = buildPrompt(userMessage, context);
            Map<String, Object> body = buildRequestBody(prompt, history);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            String url = String.format(
                    CHAT_URL,
                    geminiConfig.getChatModel(),
                    geminiConfig.getApiKey()
            );

            ResponseEntity<String> response = restTemplate.postForEntity(
                    url,
                    new HttpEntity<>(body, headers),
                    String.class
            );

            if (response.getStatusCode() == HttpStatus.OK
                    && response.getBody() != null) {
                return parseResponse(response.getBody());
            }

            log.warn("Non-OK from Gemini: {}", response.getStatusCode());
            return fallback(context);

        } catch (Exception e) {
            log.error("Gemini chat failed: {}", e.getMessage());
            return fallback(context);
        }
    }

    // ── Prompt builder ──────────────────────────────────────────
    private String buildPrompt(String userMessage, String context) {
        return String.format("""
                SHIPFLOW DOCUMENTATION CONTEXT:
                --------------------------------
                %s
                --------------------------------
                
                USER QUESTION: %s
                
                Using ONLY the documentation context above, provide a \
                clear, accurate and helpful answer. If the context does \
                not contain enough information to answer fully, say so \
                and suggest what the user could search for instead.
                """,
                context,
                userMessage
        );
    }

    // ── Request body ────────────────────────────────────────────
    private Map<String, Object> buildRequestBody(
            String prompt,
            List<Map<String, Object>> history) {

        List<Map<String, Object>> contents = new ArrayList<>();

        // System context turn
        contents.add(Map.of(
                "role", "user",
                "parts", List.of(Map.of("text", SYSTEM_PROMPT))
        ));
        contents.add(Map.of(
                "role", "model",
                "parts", List.of(Map.of(
                        "text",
                        "Understood. I am SHIPFLOW AI. I will answer " +
                                "strictly based on the provided documentation."
                ))
        ));

        // Conversation history — last 6 messages only
        if (history != null && !history.isEmpty()) {
            int start = Math.max(0, history.size() - 6);
            contents.addAll(history.subList(start, history.size()));
        }

        // Current user message with context
        contents.add(Map.of(
                "role", "user",
                "parts", List.of(Map.of("text", prompt))
        ));

        Map<String, Object> body = new HashMap<>();
        body.put("contents", contents);
        body.put("generationConfig", Map.of(
                "temperature",     geminiConfig.getTemperature(),
                "maxOutputTokens", geminiConfig.getMaxOutputTokens(),
                "topK",            40,
                "topP",            0.95
        ));

        return body;
    }

    // ── Response parser ─────────────────────────────────────────
    private String parseResponse(String responseBody) throws Exception {
        JsonNode root = objectMapper.readTree(responseBody);

        JsonNode text = root
                .path("candidates")
                .path(0)
                .path("content")
                .path("parts")
                .path(0)
                .path("text");

        if (text.isMissingNode() || text.asText().isBlank()) {
            log.warn("Empty text in Gemini response: {}", responseBody);
            return "I received an empty response. Please try again.";
        }

        return text.asText().trim();
    }

    // ── Fallback when Gemini fails ──────────────────────────────
    private String fallback(String context) {
        if (context == null || context.isBlank()) {
            return "I couldn't find relevant information in the " +
                    "SHIPFLOW documentation. Please try rephrasing " +
                    "your question.";
        }

        // Return cleaned context as plain fallback
        String trimmed = context.length() > 600
                ? context.substring(0, 600) + "..."
                : context;

        return "Based on the SHIPFLOW documentation:\n\n" + trimmed;
    }
}
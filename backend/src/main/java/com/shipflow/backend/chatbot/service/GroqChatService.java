package com.shipflow.backend.chatbot.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.shipflow.backend.config.GroqConfig;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class GroqChatService {

    private final GroqConfig   groqConfig;
    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper = new ObjectMapper();

    private static final String GROQ_URL =
            "https://api.groq.com/openai/v1/chat/completions";

    private static final String SYSTEM_PROMPT = """
            You are SHIPFLOW AI, an expert assistant for the SHIPFLOW \
            computational fluid dynamics (CFD) software.
            
            Rules you MUST follow:
            - Answer ONLY based on the documentation context provided
            - Never make up information not present in the context
            - Be concise, clear and professional
            - Use natural language, not raw copied text
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
            List<Map<String, Object>> messages =
                    buildMessages(userMessage, context, history);

            Map<String, Object> body = new HashMap<>();
            body.put("model",       groqConfig.getModel());
            body.put("messages",    messages);
            body.put("max_tokens",  groqConfig.getMaxTokens());
            body.put("temperature", groqConfig.getTemperature());

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(groqConfig.getApiKey());

            ResponseEntity<String> response = restTemplate.postForEntity(
                    GROQ_URL,
                    new HttpEntity<>(body, headers),
                    String.class
            );

            if (response.getStatusCode() == HttpStatus.OK
                    && response.getBody() != null) {
                return parseResponse(response.getBody());
            }

            log.warn("Non-OK from Groq: {}", response.getStatusCode());
            return fallback(context);

        } catch (HttpClientErrorException e) {
            log.error("Groq client error: {} | {}",
                    e.getStatusCode(),
                    e.getResponseBodyAsString());
            return fallback(context);

        } catch (Exception e) {
            log.error("Groq chat failed: {}", e.getMessage());
            return fallback(context);
        }
    }

    // ── Message builder ─────────────────────────────────────────
    private List<Map<String, Object>> buildMessages(
            String userMessage,
            String context,
            List<Map<String, Object>> history) {

        List<Map<String, Object>> messages = new ArrayList<>();

        // 1. System prompt
        messages.add(Map.of(
                "role",    "system",
                "content", SYSTEM_PROMPT
        ));

        // 2. Conversation history (last 6 messages)
        if (history != null && !history.isEmpty()) {
            int start = Math.max(0, history.size() - 6);
            history.subList(start, history.size()).forEach(h -> {
                // Convert from Gemini format to OpenAI format
                String role = h.get("role").toString();
                // Gemini uses "model", OpenAI/Groq uses "assistant"
                if ("model".equals(role)) role = "assistant";

                @SuppressWarnings("unchecked")
                List<Map<String, Object>> parts =
                        (List<Map<String, Object>>) h.get("parts");

                String content = parts.get(0)
                        .get("text")
                        .toString();

                messages.add(Map.of(
                        "role",    role,
                        "content", content
                ));
            });
        }

        // 3. Current message with context
        String prompt = buildPrompt(userMessage, context);
        messages.add(Map.of(
                "role",    "user",
                "content", prompt
        ));

        return messages;
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

    // ── Response parser ─────────────────────────────────────────
    private String parseResponse(String responseBody) throws Exception {
        JsonNode root = objectMapper.readTree(responseBody);

        JsonNode content = root
                .path("choices")
                .path(0)
                .path("message")
                .path("content");

        if (content.isMissingNode() || content.asText().isBlank()) {
            log.warn("Empty content in Groq response");
            return "I received an empty response. Please try again.";
        }

        return content.asText().trim();
    }

    // ── Fallback ────────────────────────────────────────────────
    private String fallback(String context) {
        if (context == null || context.isBlank()) {
            return "I couldn't find relevant information in the " +
                    "SHIPFLOW documentation. Please try rephrasing.";
        }

        String trimmed = context.length() > 600
                ? context.substring(0, 600) + "..."
                : context;

        return "Based on the SHIPFLOW documentation:\n\n" + trimmed;
    }
}
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
            computational fluid dynamics (CFD) software by FLOWTECH.
            
            SHIPFLOW modules you know:
            - XFLOW: geometry definition and command interface
            - XMESH: mesh generation for potential flow
            - XPAN: potential flow (panel method) solver
            - XBOUND: boundary layer solver
            - XGRID / XGR8: structured grid generation for RANS
            - XCHAP: RANS solver with VOF, wake, actuator disk
            - XPOST: post-processing and visualization
            
            YOUR RULES:
            1. Answer using the documentation context provided
            2. NEVER mention "context", "documentation", "PDF" or \
               "based on the provided" — just answer naturally
            3. Sound like a knowledgeable SHIPFLOW expert, NOT a \
               document search engine
            4. If context is technical (SSH, MPI, cluster setup), \
               explain it in relation to SHIPFLOW usage
            5. Use markdown: **bold** for modules/commands, \
               bullet lists for steps, `code` for syntax
            6. If context truly doesn't answer the question, \
               acknowledge gaps and suggest which SHIPFLOW module \
               might help
            7. Be conversational and helpful — like ChatGPT
            
            NEVER SAY:
            - "Based on the SHIPFLOW documentation"
            - "The context mentions"
            - "According to the provided information"
            - "The documentation shows"
            
            INSTEAD JUST ANSWER DIRECTLY.
            """;

    // ── Main entry ──────────────────────────────────────────────
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
            return politeFallback();  // ✅ Never leak context

        } catch (HttpClientErrorException e) {
            log.error("Groq client error: {} | {}",
                    e.getStatusCode(),
                    e.getResponseBodyAsString());
            return politeFallback();

        } catch (Exception e) {
            log.error("Groq chat failed: {}", e.getMessage());
            return politeFallback();
        }
    }

    // ── Build messages using SYSTEM ROLE (not fake turns) ───────
    private List<Map<String, Object>> buildMessages(
            String userMessage,
            String context,
            List<Map<String, Object>> history) {

        List<Map<String, Object>> messages = new ArrayList<>();

        // ✅ Proper system message (Groq/OpenAI supports it)
        messages.add(Map.of(
                "role",    "system",
                "content", SYSTEM_PROMPT
        ));

        // ✅ Add history as proper conversation turns
        if (history != null && !history.isEmpty()) {
            int start = Math.max(0, history.size() - 6);
            history.subList(start, history.size()).forEach(h -> {
                String role = h.getOrDefault("role", "user").toString();
                if ("model".equals(role)) role = "assistant";

                String content = h.getOrDefault("content", "").toString();
                if (content.isBlank()) return;

                messages.add(Map.of(
                        "role",    role,
                        "content", content
                ));
            });
        }

        // ✅ Add ONLY the current question + context (no history dump)
        String prompt = buildPrompt(userMessage, context);
        messages.add(Map.of(
                "role",    "user",
                "content", prompt
        ));

        return messages;
    }

    // ── Prompt with context clearly separated ───────────────────
    private String buildPrompt(String userMessage, String context) {
        if (context == null || context.isBlank()) {
            return userMessage;
        }

        return String.format("""
                Reference material to help you answer:
                ---
                %s
                ---
                
                Question: %s
                
                Answer naturally as a SHIPFLOW expert. Do NOT \
                reference "the documentation" or "the context" — \
                just give a direct, helpful answer.
                """,
                context,
                userMessage
        );
    }

    // ── Parser ──────────────────────────────────────────────────
    private String parseResponse(String responseBody) throws Exception {
        JsonNode root = objectMapper.readTree(responseBody);

        JsonNode content = root
                .path("choices")
                .path(0)
                .path("message")
                .path("content");

        if (content.isMissingNode() || content.asText().isBlank()) {
            log.warn("Empty content in Groq response");
            return politeFallback();
        }

        String answer = content.asText().trim();

        // ✅ Post-process: remove any leaked "context" phrases
        return cleanResponse(answer);
    }

    // ── Clean AI response ───────────────────────────────────────
    private String cleanResponse(String answer) {
        return answer
                // Remove leaked phrases
                .replaceAll("(?i)based on the (provided )?" +
                        "(shipflow )?documentation[,:]?\\s*", "")
                .replaceAll("(?i)according to the (provided )?" +
                        "(context|documentation)[,:]?\\s*", "")
                .replaceAll("(?i)the (provided )?context " +
                                "(mentions|shows|states|indicates)[,:]?\\s*",
                        "")
                .replaceAll("(?i)PREVIOUS CONVERSATION:[\\s\\S]*?" +
                        "(?=\\n\\n|$)", "")
                .replaceAll("(?i)CURRENT CONTEXT:[\\s\\S]*?" +
                        "(?=\\n\\n|$)", "")
                .trim();
    }

    // ── Polite fallback (never leaks raw context) ───────────────
    private String politeFallback() {
        return """
                I'm having trouble generating a response right now. \
                Could you try rephrasing your question?
                
                You can ask me about:
                - **XFLOW** commands and geometry
                - **XPAN** potential flow solver
                - **XCHAP** RANS solver
                - **XMESH** or **XGRID** mesh generation
                - Hull design, resistance, or propulsion
                """;
    }
}
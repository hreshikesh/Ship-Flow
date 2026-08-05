package com.shipflow.backend.chatbot.serviceImpl;

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

    // ─────────────────────────────────────────────────────────────
    // System Prompt — Rewritten for clarity + no markdown
    // ─────────────────────────────────────────────────────────────
    private static final String SYSTEM_PROMPT = """
        You are SHIPFLOW AI, an expert assistant for the SHIPFLOW
        computational fluid dynamics (CFD) software by FLOWTECH.
        
        SHIPFLOW MODULES YOU KNOW:
        - XFLOW: geometry and command interface
        - XMESH: mesh generation for potential flow
        - XPAN: potential flow solver (panel method)
        - XBOUND: boundary layer solver
        - XGRID and XGR8: grid generation for RANS
        - XCHAP: RANS solver with VOF, wake, actuator disk
        - XPOST: post-processing and visualization
        
        ═══════════════════════════════════════════════════════
        CRITICAL RULES — FOLLOW EXACTLY:
        ═══════════════════════════════════════════════════════
        
        1. ANSWER FROM REFERENCE MATERIAL FIRST
           Use the provided reference material as your primary source.
           Give direct, complete answers using the actual information.
        
        2. WHEN REFERENCE MATERIAL IS INSUFFICIENT
           If the reference material does not fully answer the question,
           you MUST direct the user to the official website:
           
           "For more detailed information on this topic, please visit
            https://www.shipflow.com or contact FLOWTECH support."
           
           Never invent information. Never guess. Never make up commands.
        
        3. NO MARKDOWN FORMATTING
           Do NOT use these markdown symbols in your response:
           - Do NOT use **bold** (double asterisks)
           - Do NOT use *italic* (single asterisks)
           - Do NOT use `code blocks` (backticks)
           - Do NOT use # headers
           - Do NOT use --- separators
           
           Instead, write in plain, natural sentences.
           For emphasis, use CAPITAL LETTERS or quotes when needed.
        
        4. FORMATTING GUIDELINES
           - Write in clear, professional paragraphs
           - Use numbered lists (1. 2. 3.) for steps
           - Use dashes (-) for bullet points
           - Use blank lines to separate ideas
           - Keep responses focused and concise
        
        5. UNKNOWN ACRONYMS OR COMMANDS
           If asked about something not in the reference material:
           - Say honestly you do not have information about it
           - Direct them to https://www.shipflow.com
           - Do NOT guess or suggest unrelated alternatives
        
        6. FORBIDDEN PHRASES
           Never say:
           - "Based on the documentation"
           - "The context mentions"
           - "According to the provided information"
           - "The documentation shows"
           - "The reference material states"
           
           Instead, just answer directly as an expert would.
        
        7. TONE
           - Professional but friendly
           - Direct and clear
           - Like a senior CFD engineer helping a colleague
           - Honest about what you know and don't know
        
        Remember: It is better to say "I don't have that information,
        please check shipflow.com" than to guess or invent an answer.
        """;

    // ─────────────────────────────────────────────────────────────
    // Main entry
    // ─────────────────────────────────────────────────────────────
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
            return politeFallback();

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

    // ─────────────────────────────────────────────────────────────
    // Build messages
    // ─────────────────────────────────────────────────────────────
    private List<Map<String, Object>> buildMessages(
            String userMessage,
            String context,
            List<Map<String, Object>> history) {

        List<Map<String, Object>> messages = new ArrayList<>();

        // System prompt
        messages.add(Map.of(
                "role",    "system",
                "content", SYSTEM_PROMPT
        ));

        // Conversation history
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

        // Current question with context
        String prompt = buildPrompt(userMessage, context);
        messages.add(Map.of(
                "role",    "user",
                "content", prompt
        ));

        return messages;
    }

    // ─────────────────────────────────────────────────────────────
    // User prompt builder
    // ─────────────────────────────────────────────────────────────
    private String buildPrompt(String userMessage, String context) {

        // No context found → tell AI to direct to website
        if (context == null || context.isBlank()) {
            return String.format("""
                    Question: %s
                    
                    Note: No specific reference material was found for
                    this question. Please answer briefly if you can,
                    then direct the user to https://www.shipflow.com
                    for detailed information.
                    
                    Remember: NO markdown formatting (no ** or * or `).
                    Write in plain sentences only.
                    """,
                    userMessage);
        }

        return String.format("""
                Reference material:
                ═══════════════════
                %s
                ═══════════════════
                
                Question: %s
                
                Instructions:
                - Answer directly as a SHIPFLOW expert
                - Use plain text only, no markdown symbols
                - Do NOT use ** for bold or * for italic
                - Do NOT use backticks for code
                - Use dashes (-) for bullets and numbers for steps
                - If the reference does not fully answer, mention
                  https://www.shipflow.com for more details
                """,
                context,
                userMessage
        );
    }

    // ─────────────────────────────────────────────────────────────
    // Response parser
    // ─────────────────────────────────────────────────────────────
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
        return cleanResponse(answer);
    }

    // ─────────────────────────────────────────────────────────────
    // Clean response — strip markdown and leaked phrases
    // ─────────────────────────────────────────────────────────────
    private String cleanResponse(String answer) {
        String cleaned = answer;

        // ── Remove leaked phrases ──────────────────────────────
        cleaned = cleaned
                .replaceAll("(?i)based on the (provided )?" +
                        "(shipflow )?documentation[,:]?\\s*", "")
                .replaceAll("(?i)according to the (provided )?" +
                        "(context|documentation|reference material)" +
                        "[,:]?\\s*", "")
                .replaceAll("(?i)the (provided )?" +
                        "(context|reference material) " +
                        "(mentions|shows|states|indicates)[,:]?\\s*", "")
                .replaceAll("(?i)PREVIOUS CONVERSATION:[\\s\\S]*?" +
                        "(?=\\n\\n|$)", "")
                .replaceAll("(?i)CURRENT CONTEXT:[\\s\\S]*?" +
                        "(?=\\n\\n|$)", "")
                .replaceAll("(?i)reference material:[\\s\\S]*?" +
                        "(?=\\n\\n|$)", "");

        // ── STRIP MARKDOWN SYMBOLS ─────────────────────────────
        cleaned = cleaned
                // Remove **bold** but keep the text inside
                .replaceAll("\\*\\*(.+?)\\*\\*", "$1")
                // Remove *italic* but keep the text inside
                .replaceAll("(?<!\\*)\\*(?!\\*)(.+?)(?<!\\*)\\*(?!\\*)",
                        "$1")
                // Remove `code` but keep the text inside
                .replaceAll("`([^`]+)`", "$1")
                // Remove markdown headers (# ## ###)
                .replaceAll("(?m)^#{1,6}\\s+", "")
                // Remove --- separators
                .replaceAll("(?m)^---+$", "")
                // Remove === separators
                .replaceAll("(?m)^===+$", "")
                // Remove multiple blank lines
                .replaceAll("\\n{3,}", "\n\n");

        return cleaned.trim();
    }

    // ─────────────────────────────────────────────────────────────
    // Polite fallback
    // ─────────────────────────────────────────────────────────────
    private String politeFallback() {
        return """
                I'm having trouble generating a response right now.
                Could you try rephrasing your question?
                
                You can ask me about:
                - XFLOW commands and geometry
                - XPAN potential flow solver
                - XCHAP RANS solver
                - XMESH or XGRID mesh generation
                - Hull design, resistance, or propulsion
                
                For more information, visit https://www.shipflow.com
                """;
    }
}
package com.shipflow.backend.chatbot.serviceImpl;

import com.shipflow.backend.chatbot.dto.ChatRequest;
import com.shipflow.backend.chatbot.dto.ChatResponse;
import com.shipflow.backend.chatbot.dto.ClarificationResult;
import com.shipflow.backend.chatbot.service.ChatService;
import com.shipflow.backend.chatbot.service.ClarificationDetector;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class ChatServiceImpl implements ChatService {

    private final HybridSearchService    hybridSearchService;
    private final GroqChatService        groqChatService;
    private final ConversationMemory     conversationMemory;
    private final IntentDetector         intentDetector;
    private final SuggestionEngine       suggestionEngine;
    private final QueryReformulator      queryReformulator;
    private final ClarificationDetector clarificationDetector;
    private final EmotionDetector        emotionDetector;

    private static final int MAX_CONTEXT_CHARS = 8000;
    private static final int SUGGESTION_COUNT  = 3;

    @Override
    public ChatResponse chat(ChatRequest request) {

        String userMessage    = request.getMessage();
        String conversationId = getOrCreateConversationId(request);
        boolean hasHistory    = conversationMemory.hasHistory(conversationId);

        // ═══════════════════════════════════════════════════════
        // STEP 1: Detect emotion
        // ═══════════════════════════════════════════════════════
        EmotionDetector.Emotion emotion =
                emotionDetector.detect(userMessage);
        log.info("Emotion: {} | Query: {}", emotion, userMessage);

        // ═══════════════════════════════════════════════════════
        // STEP 2: Detect intent
        // ═══════════════════════════════════════════════════════
        IntentDetector.Intent intent =
                intentDetector.detect(userMessage);
        log.info("Intent: {}", intent);

        // ═══════════════════════════════════════════════════════
        // STEP 3: Handle conversational shortcuts
        // ═══════════════════════════════════════════════════════
        if (intentDetector.isConversational(intent)) {
            String reply = handleConversational(
                    intent, conversationId, emotion);
            saveMemory(conversationId, userMessage, reply, intent);

            List<String> suggestions = suggestionEngine.getSuggestions(
                    intent,
                    conversationMemory.getRecentTopics(conversationId),
                    userMessage,
                    SUGGESTION_COUNT
            );

            return buildResponse(reply, conversationId, intent,
                    suggestions, 1.0, "conversational");
        }

        // ═══════════════════════════════════════════════════════
        // STEP 4: Check if clarification needed
        // ═══════════════════════════════════════════════════════
        ClarificationResult clarification =
                clarificationDetector.check(userMessage, hasHistory);

        if (clarification.needsClarification()) {
            String reply = clarification.message();
            saveMemory(conversationId, userMessage, reply, intent);

            return buildResponse(reply, conversationId, intent,
                    clarification.options(), 1.0, "clarification");
        }

        // ═══════════════════════════════════════════════════════
        // STEP 5: Reformulate query (resolve "it", "that", etc.)
        // ═══════════════════════════════════════════════════════
        QueryReformulator.ReformResult reformResult =
                queryReformulator.reform(userMessage, conversationId);

        String searchQuery = reformResult.query();
        if (reformResult.wasReformed()) {
            log.info("Query reformed: '{}' → '{}'",
                    userMessage, searchQuery);
        }

        // ═══════════════════════════════════════════════════════
        // STEP 6: Hybrid search with reformulated query
        // ═══════════════════════════════════════════════════════
        List<HybridSearchService.ScoredResult> results =
                hybridSearchService.search(searchQuery);

        // ── Retry with original if reformed search found nothing ─
        if (results.isEmpty() && reformResult.wasReformed()) {
            log.info("Reformed query found nothing, " +
                    "retrying with original");
            results = hybridSearchService.search(userMessage);
        }

        // ═══════════════════════════════════════════════════════
        // STEP 7: Build context
        // ═══════════════════════════════════════════════════════
        String context = results.isEmpty()
                ? "" : buildContext(results);
        double confidence = calculateConfidence(results);

        // ═══════════════════════════════════════════════════════
        // STEP 8: Generate answer with emotional awareness
        // ═══════════════════════════════════════════════════════
        String answer;

        if (results.isEmpty()) {
            answer = buildNotFoundMessage(userMessage, emotion);
        } else {
            // Get conversation history
            List<Map<String, Object>> history =
                    conversationMemory.getHistory(conversationId);

            // Build emotion-aware prompt modifier
            String emotionHint = buildEmotionHint(emotion);

            // Call Groq with emotional context
            String rawAnswer = groqChatService.generateAnswer(
                    userMessage + emotionHint,
                    context,
                    history
            );

            // ✅ Add emotional prefix if detected
            String prefix = emotionDetector.getResponsePrefix(emotion);
            answer = prefix + rawAnswer;
        }

        // ═══════════════════════════════════════════════════════
        // STEP 9: Save to memory
        // ═══════════════════════════════════════════════════════
        saveMemory(conversationId, userMessage, answer, intent);

        // ═══════════════════════════════════════════════════════
        // STEP 10: Generate smart suggestions
        // ═══════════════════════════════════════════════════════
        List<String> topics =
                conversationMemory.getRecentTopics(conversationId);
        List<String> suggestions = suggestionEngine.getSuggestions(
                intent, topics, userMessage, SUGGESTION_COUNT);

        return buildResponse(answer, conversationId, intent,
                suggestions, confidence, "hybrid");
    }

    @Override
    public String chat(String userMessage) {
        List<HybridSearchService.ScoredResult> results =
                hybridSearchService.search(userMessage);
        if (results.isEmpty()) {
            return buildNotFoundMessage(userMessage,
                    EmotionDetector.Emotion.NEUTRAL);
        }
        String context = buildContext(results);
        return groqChatService.generateAnswer(
                userMessage, context, List.of());
    }

    // ── Emotion hint for Groq ───────────────────────────────────
    private String buildEmotionHint(EmotionDetector.Emotion emotion) {
        return switch (emotion) {
            case FRUSTRATED -> "\n[User seems frustrated — " +
                    "be extra patient, offer step-by-step help]";
            case CONFUSED   -> "\n[User seems confused — " +
                    "explain simply, use examples]";
            case URGENT     -> "\n[User needs a quick answer — " +
                    "be concise and direct]";
            case CURIOUS    -> "\n[User is curious — " +
                    "feel free to go deeper]";
            default         -> "";
        };
    }

    // ── Conversational handler ──────────────────────────────────
    private String handleConversational(
            IntentDetector.Intent intent,
            String conversationId,
            EmotionDetector.Emotion emotion) {

        boolean hasHistory =
                conversationMemory.hasHistory(conversationId);
        List<String> topics =
                conversationMemory.getRecentTopics(conversationId);

        return switch (intent) {

            case GREETING -> {
                if (hasHistory && !topics.isEmpty()) {
                    yield String.format("""
                            Welcome back! We were discussing \
                            **%s**. Want to continue or explore \
                            something new?
                            """,
                            String.join(" and ", topics));
                }
                yield """
                        Hello! I'm SHIPFLOW AI — your expert \
                        assistant for computational fluid dynamics.
                        
                        I know everything about:
                        - **XFLOW, XMESH, XPAN, XBOUND, XGRID, \
                        XCHAP, XPOST**
                        - Hull design, resistance, propulsion
                        - Command syntax and workflows
                        - Remote computing and parallel setup
                        
                        What would you like to explore?
                        """;
            }

            case FAREWELL -> "Goodbye! Come back anytime. 👋";

            case THANKS -> {
                String prefix = emotionDetector
                        .getResponsePrefix(EmotionDetector.Emotion.GRATEFUL);
                yield prefix + "Anything else about SHIPFLOW?";
            }

            case CAPABILITY_ASK -> """
                    I'm the SHIPFLOW AI — trained on the complete \
                    SHIPFLOW documentation.
                    
                    **Modules I know inside out:**
                    📦 XFLOW · XMESH · XPAN · XBOUND · XGRID · \
                    XCHAP · XPOST
                    
                    **Topics I can help with:**
                    🚢 Hull geometry · Resistance · Propulsion
                    ⚙️ Solver setup · Mesh generation · Workflows
                    🖥️ Remote computing · Parallel runs · File formats
                    
                    Just ask naturally — I'll find the answer.
                    """;

            default -> "How can I help with SHIPFLOW today?";
        };
    }

    // ── Context builder ─────────────────────────────────────────
    private String buildContext(
            List<HybridSearchService.ScoredResult> results) {

        StringBuilder ctx = new StringBuilder();
        int totalChars = 0;

        for (var result : results) {
            String content = cleanContent(result.chunk().getContent());
            if (content.isBlank()) continue;
            if (looksLikeToc(content)) continue;
            if (totalChars + content.length() > MAX_CONTEXT_CHARS) break;

            ctx.append(content).append("\n\n");
            totalChars += content.length();
        }

        return ctx.toString().trim();
    }

    // ── Helpers ─────────────────────────────────────────────────

    private String getOrCreateConversationId(ChatRequest request) {
        String id = request.getConversationId();
        return (id != null && !id.isBlank())
                ? id : UUID.randomUUID().toString();
    }

    private void saveMemory(
            String conversationId, String userMsg,
            String aiMsg, IntentDetector.Intent intent) {

        conversationMemory.addUserMessage(conversationId, userMsg);
        conversationMemory.addAssistantMessage(conversationId, aiMsg);
        conversationMemory.addTopic(
                conversationId,
                intentDetector.getTopicLabel(intent));
    }

    private boolean looksLikeToc(String content) {
        if (content == null || content.length() < 100) return false;
        long dots = content.chars().filter(c -> c == '.').count();
        if (dots > content.length() * 0.15) return true;
        int sectionRefs = 0;
        for (String line : content.split("\n")) {
            if (line.trim().matches("^\\s*\\d+\\.\\d+.*\\d+\\s*$"))
                sectionRefs++;
        }
        return sectionRefs > 3;
    }

    private double calculateConfidence(
            List<HybridSearchService.ScoredResult> results) {
        if (results.isEmpty()) return 0.0;
        double top = results.get(0).score();
        if (top >= 0.8) return 1.0;
        if (top >= 0.5) return 0.8;
        if (top >= 0.3) return 0.6;
        return 0.4;
    }

    private String cleanContent(String content) {
        if (content == null || content.isBlank()) return "";
        return content
                .replaceAll("\\s+", " ")
                .replaceAll("(?i)page\\s*\\d+", "")
                .replaceAll("(?i)rev\\.\\s*\\d+\\.\\d+", "")
                .replaceAll("[^\\x20-\\x7E]", " ")
                .trim();
    }

    private String buildNotFoundMessage(
            String query, EmotionDetector.Emotion emotion) {

        String prefix = "";
        if (emotion == EmotionDetector.Emotion.FRUSTRATED) {
            prefix = "I'm sorry I couldn't find what you need. ";
        } else if (emotion == EmotionDetector.Emotion.CONFUSED) {
            prefix = "No worries — let me help guide you. ";
        }

        return prefix + String.format("""
                I don't have specific information about "%s" \
                in my SHIPFLOW knowledge base.
                
                Try asking about:
                - **XFLOW** commands (geometry, hull, propeller)
                - **XPAN** or **XCHAP** solvers
                - **XMESH** or **XGRID** mesh/grid generation
                - Hull design, resistance, propulsion
                - Workflow setup or command syntax
                """, query);
    }

    private ChatResponse buildResponse(
            String answer, String conversationId,
            IntentDetector.Intent intent,
            List<String> suggestions,
            double confidence, String searchMode) {

        return ChatResponse.builder()
                .response(answer)
                .conversationId(conversationId)
                .timestamp(LocalDateTime.now())
                .suggestions(suggestions)
                .confidence(confidence)
                .intent(intent.name())
                .searchMode(searchMode)
                .build();
    }
}
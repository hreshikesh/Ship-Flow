package com.shipflow.backend.chatbot.serviceImpl;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Component
@Slf4j
public class ConversationMemory {

    // conversationId → session
    private final Map<String, ConversationSession> sessions =
            new ConcurrentHashMap<>();

    private static final int MAX_HISTORY          = 10;
    private static final int SESSION_TTL_HOURS    = 2;
    private static final int MAX_MESSAGE_LENGTH   = 800;

    // ── Null-safe validator ────────────────────────────────────
    private boolean isInvalid(String conversationId) {
        return conversationId == null || conversationId.isBlank();
    }

    // ── Get Groq/OpenAI format history ─────────────────────────
    public List<Map<String, Object>> getHistory(String conversationId) {
        if (isInvalid(conversationId)) return List.of();

        ConversationSession session = sessions.get(conversationId);
        if (session == null) return List.of();

        // Auto-cleanup expired sessions
        if (session.isExpired()) {
            sessions.remove(conversationId);
            log.debug("Session expired [{}]", conversationId);
            return List.of();
        }

        return Collections.unmodifiableList(session.getMessages());
    }

    // ── Get recent topics ───────────────────────────────────────
    public List<String> getRecentTopics(String conversationId) {
        if (isInvalid(conversationId)) return List.of();

        ConversationSession session = sessions.get(conversationId);
        if (session == null) return List.of();

        return Collections.unmodifiableList(session.getTopics());
    }

    // ── Add user message ────────────────────────────────────────
    public void addUserMessage(String conversationId, String message) {
        if (isInvalid(conversationId)) return;
        if (message == null || message.isBlank()) return;

        String trimmed = truncate(message);

        getOrCreate(conversationId).addMessage(Map.of(
                "role",    "user",
                "content", trimmed
        ));
        trim(conversationId);
        log.debug("Memory: user msg added [{}]", conversationId);
    }

    // ── Add assistant message ───────────────────────────────────
    public void addAssistantMessage(
            String conversationId,
            String message) {

        if (isInvalid(conversationId)) return;
        if (message == null || message.isBlank()) return;

        // ✅ Truncate long AI responses for memory efficiency
        String trimmed = truncate(message);

        getOrCreate(conversationId).addMessage(Map.of(
                "role",    "assistant",
                "content", trimmed
        ));
        trim(conversationId);
        log.debug("Memory: assistant msg added [{}]", conversationId);
    }

    // ── Add topic to session ────────────────────────────────────
    public void addTopic(String conversationId, String topic) {
        if (isInvalid(conversationId)) return;
        if (topic == null || topic.isBlank()) return;

        getOrCreate(conversationId).addTopic(topic);
    }

    // ── Clear session ───────────────────────────────────────────
    public void clear(String conversationId) {
        if (isInvalid(conversationId)) return;
        sessions.remove(conversationId);
        log.info("Memory cleared [{}]", conversationId);
    }

    // ── Check if session has history ────────────────────────────
    public boolean hasHistory(String conversationId) {
        if (isInvalid(conversationId)) return false;

        ConversationSession session = sessions.get(conversationId);
        return session != null
                && !session.isExpired()
                && !session.getMessages().isEmpty();
    }

    // ── Get total message count (useful for analytics) ──────────
    public int getMessageCount(String conversationId) {
        if (isInvalid(conversationId)) return 0;

        ConversationSession session = sessions.get(conversationId);
        return session == null ? 0 : session.getMessages().size();
    }

    // ── Get last user question (for suggestion deduping) ────────
    public String getLastUserMessage(String conversationId) {
        List<Map<String, Object>> history = getHistory(conversationId);
        if (history.isEmpty()) return null;

        for (int i = history.size() - 1; i >= 0; i--) {
            Map<String, Object> msg = history.get(i);
            if ("user".equals(msg.get("role"))) {
                return msg.get("content").toString();
            }
        }
        return null;
    }

    // ── Cleanup expired sessions (call periodically) ────────────
    public void cleanupExpiredSessions() {
        int removed = 0;
        Iterator<Map.Entry<String, ConversationSession>> it =
                sessions.entrySet().iterator();

        while (it.hasNext()) {
            if (it.next().getValue().isExpired()) {
                it.remove();
                removed++;
            }
        }

        if (removed > 0) {
            log.info("Cleaned up {} expired sessions", removed);
        }
    }

    // ── Get active session count (monitoring) ───────────────────
    public int getActiveSessionCount() {
        return sessions.size();
    }

    // ─────────────────────────────────────────────────────────────
    // Helpers
    // ─────────────────────────────────────────────────────────────

    private ConversationSession getOrCreate(String id) {
        return sessions.computeIfAbsent(
                id, k -> new ConversationSession());
    }

    private void trim(String conversationId) {
        ConversationSession session = sessions.get(conversationId);
        if (session == null) return;

        List<Map<String, Object>> msgs = session.getMessages();
        if (msgs.size() > MAX_HISTORY) {
            // Keep only the most recent MAX_HISTORY messages
            List<Map<String, Object>> trimmed = new ArrayList<>(
                    msgs.subList(msgs.size() - MAX_HISTORY, msgs.size())
            );
            session.setMessages(trimmed);
        }
    }

    private String truncate(String text) {
        if (text == null) return "";
        if (text.length() <= MAX_MESSAGE_LENGTH) return text;
        return text.substring(0, MAX_MESSAGE_LENGTH) + "...";
    }

    // ─────────────────────────────────────────────────────────────
    // Inner Session Class
    // ─────────────────────────────────────────────────────────────

    public static class ConversationSession {

        private List<Map<String, Object>> messages   = new ArrayList<>();
        private final List<String>        topics     = new ArrayList<>();
        private final LocalDateTime       createdAt  = LocalDateTime.now();
        private LocalDateTime             lastActive = LocalDateTime.now();

        public void addMessage(Map<String, Object> message) {
            messages.add(message);
            lastActive = LocalDateTime.now();
        }

        public void addTopic(String topic) {
            // Keep max 5 recent topics to avoid noise
            if (!topics.contains(topic)) {
                topics.add(topic);
                if (topics.size() > 5) {
                    topics.remove(0);
                }
            }
        }

        public boolean isExpired() {
            return lastActive
                    .plusHours(SESSION_TTL_HOURS)
                    .isBefore(LocalDateTime.now());
        }

        public List<Map<String, Object>> getMessages() {
            return messages;
        }

        public void setMessages(List<Map<String, Object>> messages) {
            this.messages = messages;
            this.lastActive = LocalDateTime.now();
        }

        public List<String> getTopics() {
            return topics;
        }

        public LocalDateTime getCreatedAt() {
            return createdAt;
        }

        public LocalDateTime getLastActive() {
            return lastActive;
        }
    }
}
package com.shipflow.backend.chatbot.service;

import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class ConversationMemory {

    // conversationId → list of messages
    private final Map<String, List<Map<String, Object>>> sessions =
            new ConcurrentHashMap<>();

    private static final int MAX_HISTORY = 10;

    public List<Map<String, Object>> getHistory(String conversationId) {
        if (conversationId == null || conversationId.isBlank()) {
            return List.of();
        }
        return sessions.getOrDefault(conversationId, List.of());
    }

    public void addUserMessage(String conversationId, String message) {
        if (conversationId == null || conversationId.isBlank()) return;
        getOrCreate(conversationId).add(Map.of(
                "role", "user",
                "parts", List.of(Map.of("text", message))
        ));
        trim(conversationId);
    }

    public void addAssistantMessage(String conversationId, String message) {
        if (conversationId == null || conversationId.isBlank()) return;
        getOrCreate(conversationId).add(Map.of(
                "role", "model",
                "parts", List.of(Map.of("text", message))
        ));
        trim(conversationId);
    }

    public void clear(String conversationId) {
        sessions.remove(conversationId);
    }

    private List<Map<String, Object>> getOrCreate(String id) {
        return sessions.computeIfAbsent(id, k -> new ArrayList<>());
    }

    private void trim(String conversationId) {
        List<Map<String, Object>> history = sessions.get(conversationId);
        if (history != null && history.size() > MAX_HISTORY) {
            // Keep last MAX_HISTORY messages
            List<Map<String, Object>> trimmed =
                    new ArrayList<>(history.subList(
                            history.size() - MAX_HISTORY,
                            history.size()));
            sessions.put(conversationId, trimmed);
        }
    }
}
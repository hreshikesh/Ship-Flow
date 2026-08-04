package com.shipflow.backend.chatbot.service;

import com.shipflow.backend.chatbot.dto.ChatRequest;
import com.shipflow.backend.chatbot.dto.ChatResponse;

public interface ChatService {

    ChatResponse chat(ChatRequest request);

    String chat(String userMessage);

}
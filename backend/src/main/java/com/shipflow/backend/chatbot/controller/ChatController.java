package com.shipflow.backend.chatbot.controller;

import com.shipflow.backend.chatbot.dto.ChatRequest;
import com.shipflow.backend.chatbot.dto.ChatResponse;
import com.shipflow.backend.chatbot.service.ChatService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/ai")
@RequiredArgsConstructor
@Tag(name = "SHIPFLOW AI", description = "PDF keyword search")
public class ChatController {

    private final ChatService chatService;

    @PostMapping("/chat")
    @Operation(summary = "Search SHIPFLOW documentation")
    public ResponseEntity<ChatResponse> chat(
            @Valid @RequestBody ChatRequest request) {
        return ResponseEntity.ok(chatService.chat(request));
    }

    @GetMapping("/health")
    @Operation(summary = "Health check")
    public ResponseEntity<Map<String, String>> health() {
        return ResponseEntity.ok(Map.of(
                "status", "online",
                "mode", "AI"
        ));
    }
}
package com.shipflow.backend;

import com.shipflow.backend.chatbot.serviceImpl.ConversationMemory;
import com.shipflow.backend.document.service.DocumentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

@SpringBootApplication
@EnableAsync
@RequiredArgsConstructor
@Slf4j
@EnableScheduling
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Bean
	ApplicationRunner ingestDocuments(DocumentService documentService) {
		return args -> {
			log.info("=== SHIPFLOW RAG System Starting ===");
			log.info("Checking for documents to ingest...");

			// Runs async - won't block server startup
			documentService.ingestAndEmbed("SHIPFLOW_Manual.pdf");
		};
	}

	private final ConversationMemory conversationMemory;

	// ✅ Run every hour
	@Scheduled(fixedRate = 3600000)  // 1 hour in ms
	public void cleanup() {
		log.debug("Running memory cleanup...");
		conversationMemory.cleanupExpiredSessions();
	}

}
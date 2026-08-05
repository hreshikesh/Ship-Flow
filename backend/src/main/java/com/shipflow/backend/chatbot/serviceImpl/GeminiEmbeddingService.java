package com.shipflow.backend.chatbot.serviceImpl;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.shipflow.backend.config.GeminiConfig;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class GeminiEmbeddingService {

    private final GeminiConfig  geminiConfig;
    private final RestTemplate  restTemplate;
    private final ObjectMapper  objectMapper = new ObjectMapper();

    private static final String EMBEDDING_URL =
            "https://generativelanguage.googleapis.com/v1beta/models/%s:embedContent?key=%s";

    // Max chars Gemini embedding accepts
    private static final int MAX_TEXT_LENGTH = 8000;

    // ── Document embedding (for ingestion) ──────────────────────
    public float[] embed(String text) {
        log.debug("Embedding document chunk ({} chars)", text.length());
        return callApi(text, "RETRIEVAL_DOCUMENT");
    }

    // ── Query embedding (for search) — cached ───────────────────
    @Cacheable(value = "queryEmbeddings", key = "#query.hashCode()")
    public float[] embedQuery(String query) {
        log.debug("Embedding query: {}", query);
        return callApi(query, "RETRIEVAL_QUERY");
    }

    // ── Core API call ────────────────────────────────────────────
    private float[] callApi(String text, String taskType) {
        try {
            // 1. Build URL
            String url = String.format(
                    EMBEDDING_URL,
                    geminiConfig.getEmbeddingModel(),
                    geminiConfig.getApiKey()
            );

            // 2. Truncate text if too long
            String truncated = text.length() > MAX_TEXT_LENGTH
                    ? text.substring(0, MAX_TEXT_LENGTH)
                    : text;

            // 3. Build headers
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            // 4. Build request body
            Map<String, Object> body = new HashMap<>();
            body.put("model",
                    "models/" + geminiConfig.getEmbeddingModel());
            body.put("taskType", taskType);
            body.put("content", Map.of(
                    "parts", List.of(Map.of("text", truncated))
            ));
            // Force 768 dims to save DB space
            // (gemini-embedding-001 defaults to 3072)
            body.put("outputDimensionality",
                    geminiConfig.getEmbeddingDimension());

            // 5. Call API
            ResponseEntity<String> response = restTemplate.postForEntity(
                    url,
                    new HttpEntity<>(body, headers),
                    String.class
            );

            // 6. Parse and return
            if (response.getStatusCode() == HttpStatus.OK
                    && response.getBody() != null) {
                return parseEmbedding(response.getBody());
            }

            throw new RuntimeException(
                    "Non-OK status: " + response.getStatusCode());

        } catch (HttpClientErrorException e) {
            // 4xx — bad request, wrong model name, invalid key etc.
            log.error("Gemini embedding client error [{}]: {} | body: {}",
                    taskType,
                    e.getStatusCode(),
                    e.getResponseBodyAsString());
            throw new RuntimeException(
                    "Embedding client error: " + e.getMessage());

        } catch (HttpServerErrorException e) {
            // 5xx — Gemini server issue
            log.error("Gemini embedding server error [{}]: {}",
                    taskType,
                    e.getStatusCode());
            throw new RuntimeException(
                    "Embedding server error: " + e.getMessage());

        } catch (Exception e) {
            log.error("Embedding failed [{}]: {}", taskType, e.getMessage());
            throw new RuntimeException(
                    "Embedding failed: " + e.getMessage());
        }
    }

    // ── Parse embedding values from response ─────────────────────
    private float[] parseEmbedding(String responseBody) throws Exception {
        JsonNode root = objectMapper.readTree(responseBody);

        JsonNode values = root
                .path("embedding")
                .path("values");

        if (!values.isArray() || values.isEmpty()) {
            log.error("Invalid embedding response: {}", responseBody);
            throw new RuntimeException(
                    "Empty embedding values in response");
        }

        float[] result = new float[values.size()];
        for (int i = 0; i < values.size(); i++) {
            result[i] = (float) values.get(i).asDouble();
        }

        log.debug("Parsed embedding: {} dimensions", result.length);
        return result;
    }

    // ── Zero vector fallback (used when embedding fails) ─────────
    public float[] zeroVector() {
        log.warn("Returning zero vector as fallback");
        return new float[geminiConfig.getEmbeddingDimension()];
    }
}
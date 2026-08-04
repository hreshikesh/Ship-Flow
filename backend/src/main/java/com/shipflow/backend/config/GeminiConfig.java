package com.shipflow.backend.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "gemini.api")
@Getter
@Setter
public class GeminiConfig {

    private String key;
    private String chatModel;
    private String embeddingModel;
    private int    embeddingDimension;
    private double temperature;
    private int    maxOutputTokens;

    // ── Convenience getter ─────────────────────────────────────
    public String getApiKey() {
        return key;
    }
}
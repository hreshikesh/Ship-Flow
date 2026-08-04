package com.shipflow.backend.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "groq.api")
@Getter
@Setter
public class GroqConfig {

    private String key;
    private String model;
    private int    maxTokens;
    private double temperature;

    public String getApiKey() {
        return key;
    }
}
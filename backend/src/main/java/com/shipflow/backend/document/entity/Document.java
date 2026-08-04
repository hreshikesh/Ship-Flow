package com.shipflow.backend.document.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "documents")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Document {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(name = "file_name", nullable = false, unique = true)
    private String fileName;

    @Column(name = "page_count")
    private Integer pageCount;

    @Column(name = "total_chunks")
    private Integer totalChunks;

    @Column(name = "embedded_chunks")
    @Builder.Default
    private Integer embeddedChunks = 0;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private IngestionStatus status = IngestionStatus.PENDING;

    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "completed_at")
    private LocalDateTime completedAt;

    @OneToMany(mappedBy = "document",
            cascade = CascadeType.ALL,
            orphanRemoval = true,
            fetch = FetchType.LAZY)
    @Builder.Default
    private List<DocumentChunk> chunks = new ArrayList<>();

    public enum IngestionStatus {
        PENDING, EXTRACTING, CHUNKING, EMBEDDING, COMPLETED, FAILED
    }

    // Progress helper
    public int getEmbeddingProgressPercent() {
        if (totalChunks == null || totalChunks == 0) return 0;
        return (int) ((embeddedChunks * 100.0) / totalChunks);
    }
}
package com.shipflow.backend.document.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "document_chunks")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DocumentChunk {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "document_id", nullable = false)
    @JsonIgnore
    private Document document;

    private Integer pageNumber;
    private Integer chunkIndex;

    // ✅ Removed @JdbcTypeCode - columnDefinition = "TEXT" is enough
    // Hibernate won't try to ALTER the column type anymore
    @Column(name = "content", columnDefinition = "TEXT")
    private String content;

    // ✅ Removed @JdbcTypeCode - same fix
    @Column(name = "embedding", columnDefinition = "TEXT")
    private String embedding;

    private Integer tokenCount;
}
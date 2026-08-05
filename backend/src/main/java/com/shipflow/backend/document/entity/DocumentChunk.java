package com.shipflow.backend.document.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

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

    // ✅ LONGVARCHAR = TEXT in PostgreSQL, no oid, no CLOB
    @JdbcTypeCode(SqlTypes.LONGVARCHAR)
    @Column(name = "content", columnDefinition = "TEXT")
    private String content;

    @JdbcTypeCode(SqlTypes.LONGVARCHAR)
    @Column(name = "embedding", columnDefinition = "TEXT")
    private String embedding;

    private Integer tokenCount;
}
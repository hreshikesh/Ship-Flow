package com.shipflow.backend.document.repository;

import com.shipflow.backend.document.entity.DocumentChunk;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DocumentChunkRepository
        extends JpaRepository<DocumentChunk, Long> {

    List<DocumentChunk> findByDocumentIdOrderByPageNumberAscChunkIndexAsc(
            Long documentId);

    @Query(value = """
            SELECT * FROM document_chunks
            WHERE LOWER(content) LIKE LOWER(CONCAT('%', :keyword, '%'))
            LIMIT :limit
            """, nativeQuery = true)
    List<DocumentChunk> searchByKeyword(
            @Param("keyword") String keyword,
            @Param("limit") int limit);

    long countByDocumentId(Long documentId);

    @Query("SELECT dc FROM DocumentChunk dc WHERE dc.embedding IS NOT NULL")
    List<DocumentChunk> findAllWithEmbeddings();
}
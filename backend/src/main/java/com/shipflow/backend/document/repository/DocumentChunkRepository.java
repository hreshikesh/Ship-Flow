package com.shipflow.backend.document.repository;

import com.shipflow.backend.document.entity.DocumentChunk;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DocumentChunkRepository
        extends JpaRepository<DocumentChunk, Long> {

    List<DocumentChunk> findByDocumentIdOrderByPageNumberAscChunkIndexAsc(
            Long documentId);

    @Query("SELECT c FROM DocumentChunk c WHERE c.embedding IS NOT NULL")
    List<DocumentChunk> findAllWithEmbeddings();

    // ─────────────────────────────────────────────────────────────
    // ✅ FIXED: Explicit column selection (excludes content_tsv)
    // ─────────────────────────────────────────────────────────────

    @Query(value = """
            SELECT id, document_id, page_number, chunk_index,
                   content, embedding, token_count
            FROM document_chunks
            WHERE LOWER(content) LIKE LOWER(CONCAT('%', :keyword, '%'))
            LIMIT :limit
            """, nativeQuery = true)
    List<DocumentChunk> searchByKeyword(
            @Param("keyword") String keyword,
            @Param("limit") int limit);

    @Query(value = """
            SELECT id, document_id, page_number, chunk_index,
                   content, embedding, token_count
            FROM document_chunks
            WHERE content ~* CONCAT('\\m', :keyword, '\\M')
            LIMIT :limit
            """, nativeQuery = true)
    List<DocumentChunk> searchByExactWord(
            @Param("keyword") String keyword,
            @Param("limit") int limit);

    // ─────────────────────────────────────────────────────────────
    // ✅ Full-Text Search — Fixed column mapping
    // ─────────────────────────────────────────────────────────────

    @Query(value = """
            SELECT id, document_id, page_number, chunk_index,
                   content, embedding, token_count
            FROM document_chunks
            WHERE content_tsv @@ plainto_tsquery('english', :query)
            ORDER BY ts_rank(content_tsv, 
                             plainto_tsquery('english', :query)) DESC
            LIMIT :limit
            """, nativeQuery = true)
    List<DocumentChunk> fullTextSearch(
            @Param("query") String query,
            @Param("limit") int limit);

    @Query(value = """
            SELECT id, document_id, page_number, chunk_index,
                   content, embedding, token_count
            FROM document_chunks
            WHERE content_tsv @@ phraseto_tsquery('english', :phrase)
            ORDER BY ts_rank(content_tsv, 
                             phraseto_tsquery('english', :phrase)) DESC
            LIMIT :limit
            """, nativeQuery = true)
    List<DocumentChunk> phraseSearch(
            @Param("phrase") String phrase,
            @Param("limit") int limit);

    @Query(value = """
            SELECT id, document_id, page_number, chunk_index,
                   content, embedding, token_count
            FROM document_chunks
            WHERE content % :keyword 
               OR content ILIKE CONCAT('%', :keyword, '%')
            ORDER BY similarity(content, :keyword) DESC NULLS LAST
            LIMIT :limit
            """, nativeQuery = true)
    List<DocumentChunk> fuzzySearch(
            @Param("keyword") String keyword,
            @Param("limit") int limit);

    // ─────────────────────────────────────────────────────────────
    // ✅ Smart Search — Rewritten without subquery issues
    // ─────────────────────────────────────────────────────────────

    @Query(value = """
            SELECT id, document_id, page_number, chunk_index,
                   content, embedding, token_count
            FROM document_chunks
            WHERE content_tsv @@ plainto_tsquery('english', :query)
               OR content % :query
               OR content ILIKE CONCAT('%', :query, '%')
            ORDER BY 
                CASE 
                    WHEN content_tsv @@ 
                         plainto_tsquery('english', :query) 
                    THEN ts_rank(content_tsv, 
                         plainto_tsquery('english', :query)) * 2
                    ELSE similarity(content, :query)
                END DESC
            LIMIT :limit
            """, nativeQuery = true)
    List<DocumentChunk> smartSearch(
            @Param("query") String query,
            @Param("limit") int limit);
}
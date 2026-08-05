package com.shipflow.backend.config;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
@Slf4j
public class FullTextSearchInitializer {

    private final JdbcTemplate jdbcTemplate;

    @EventListener(ApplicationReadyEvent.class)
    @Transactional
    public void initializeFullTextSearch() {
        log.info("═══ Initializing Full-Text Search ═══");

        try {
            // ✅ Check if document_chunks table exists before doing anything
            if (!tableExists("document_chunks")) {
                log.warn("⚠️ document_chunks table does not exist yet — skipping full-text search init");
                log.warn("⚠️ Table will be created by Hibernate. Restart or re-deploy to complete init.");
                return;
            }

            // 1. Enable pg_trgm extension for fuzzy search
            jdbcTemplate.execute(
                    "CREATE EXTENSION IF NOT EXISTS pg_trgm");
            log.info("✅ pg_trgm extension enabled");

            // 2. Add content_tsv column if missing
            jdbcTemplate.execute("""
                ALTER TABLE document_chunks 
                ADD COLUMN IF NOT EXISTS content_tsv tsvector
                """);
            log.info("✅ content_tsv column ready");

            // 3. Populate content_tsv for existing rows
            int updated = jdbcTemplate.update("""
                UPDATE document_chunks 
                SET content_tsv = to_tsvector('english', 
                                              COALESCE(content, ''))
                WHERE content_tsv IS NULL
                """);
            log.info("✅ Populated tsvector for {} existing rows", updated);

            // 4. Create GIN index for fast full-text search
            jdbcTemplate.execute("""
                CREATE INDEX IF NOT EXISTS idx_document_chunks_content_tsv
                ON document_chunks USING GIN(content_tsv)
                """);
            log.info("✅ GIN full-text index created");

            // 5. Create trigram index for fuzzy search
            jdbcTemplate.execute("""
                CREATE INDEX IF NOT EXISTS idx_document_chunks_content_trgm
                ON document_chunks USING GIN(content gin_trgm_ops)
                """);
            log.info("✅ Trigram fuzzy search index created");

            // 6. Create the auto-update function
            jdbcTemplate.execute("""
                CREATE OR REPLACE FUNCTION document_chunks_tsv_update()
                RETURNS trigger AS $$
                BEGIN
                    NEW.content_tsv := to_tsvector('english', 
                                                    COALESCE(NEW.content, ''));
                    RETURN NEW;
                END;
                $$ LANGUAGE plpgsql
                """);
            log.info("✅ tsvector update function created");

            // 7. Drop and recreate trigger (safe if it exists)
            jdbcTemplate.execute("""
                DROP TRIGGER IF EXISTS document_chunks_tsv_trigger
                ON document_chunks
                """);

            jdbcTemplate.execute("""
                CREATE TRIGGER document_chunks_tsv_trigger
                BEFORE INSERT OR UPDATE OF content ON document_chunks
                FOR EACH ROW EXECUTE FUNCTION document_chunks_tsv_update()
                """);
            log.info("✅ tsvector auto-update trigger created");

            log.info("═══ Full-Text Search Ready ═══");

        } catch (Exception e) {
            log.error("❌ Full-text search init failed: {}", e.getMessage(), e);
            // Don't crash the app — search will fall back to LIKE
        }
    }

    // ✅ Safely check if a table exists in PostgreSQL
    private boolean tableExists(String tableName) {
        try {
            String sql = """
                SELECT EXISTS (
                    SELECT FROM information_schema.tables 
                    WHERE table_schema = 'public' 
                    AND table_name = ?
                )
                """;
            Boolean exists = jdbcTemplate.queryForObject(sql, Boolean.class, tableName);
            return Boolean.TRUE.equals(exists);
        } catch (Exception e) {
            log.warn("⚠️ Could not check if table '{}' exists: {}", tableName, e.getMessage());
            return false;
        }
    }
}
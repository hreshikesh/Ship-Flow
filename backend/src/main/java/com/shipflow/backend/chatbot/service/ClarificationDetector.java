package com.shipflow.backend.chatbot.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
@RequiredArgsConstructor
@Slf4j
public class ClarificationDetector {

    // ── Vague patterns that need clarification ──────────────────
    private static final Map<String, ClarificationResponse> VAGUE_QUERIES =
            new LinkedHashMap<>() {{

                put("\\bhelp\\b", new ClarificationResponse(
                        "I'd love to help! Could you be more specific? Are you looking for help with:",
                        List.of(
                                "Setting up a simulation workflow",
                                "Understanding a specific module (XPAN, XCHAP, etc.)",
                                "Solving an error or convergence issue",
                                "Hull geometry or mesh generation"
                        )
                ));

                put("\\bmesh\\b(?!.*(?:xmesh|xgrid|refine|quality|generate|setup))",
                        new ClarificationResponse(
                                "I can help with meshing! Which context are you working in?",
                                List.of(
                                        "**XMESH** — mesh for potential flow (XPAN)",
                                        "**XGRID** — grid for RANS solver (XCHAP)",
                                        "Mesh refinement and quality",
                                        "A specific meshing error"
                                )
                        ));

                put("\\bsolver\\b(?!.*(?:xpan|xchap|basic|rans|boundary))",
                        new ClarificationResponse(
                                "SHIPFLOW has several solvers. Which one interests you?",
                                List.of(
                                        "**XPAN** — potential flow (panel method, fast)",
                                        "**XBOUND** — boundary layer",
                                        "**XCHAP** — RANS (viscous, detailed)",
                                        "Choosing between solvers"
                                )
                        ));

                put("\\b(error|problem|issue|wrong|fail|crash)\\b",
                        new ClarificationResponse(
                                "I'll help you troubleshoot! To give the best advice, could you tell me:",
                                List.of(
                                        "Which module shows the error (XPAN, XCHAP, etc.)?",
                                        "What step fails (mesh, solving, post-processing)?",
                                        "Is it a convergence issue or a crash?",
                                        "Any specific error message?"
                                )
                        ));

                put("\\bsetup\\b(?!.*(?:xflow|mesh|grid|boundary|solver|file))",
                        new ClarificationResponse(
                                "I can walk you through setup! What specifically?",
                                List.of(
                                        "Overall simulation workflow",
                                        "Command file / input file syntax",
                                        "Geometry setup in XFLOW",
                                        "Remote computation setup"
                                )
                        ));

                put("^(how|what|why|when)$", new ClarificationResponse(
                        "Could you give me a bit more detail? For example:",
                        List.of(
                                "\"How does XPAN compute wave resistance?\"",
                                "\"What is the XMESH FREE command?\"",
                                "\"Why is my simulation not converging?\""
                        )
                ));
            }};

    // ── Minimum query length for useful search ──────────────────
    private static final int MIN_USEFUL_LENGTH = 3;

    // ── Check if query needs clarification ──────────────────────
    public ClarificationResult check(
            String query,
            boolean hasHistory) {

        if (query == null || query.isBlank()) {
            return ClarificationResult.needsClarification(
                    "What would you like to know about SHIPFLOW?",
                    List.of(
                            "What is SHIPFLOW?",
                            "How do I get started?",
                            "What modules are available?"
                    )
            );
        }

        String lower = query.toLowerCase().trim();

        // Very short queries (1-2 chars)
        if (lower.length() < MIN_USEFUL_LENGTH) {
            return ClarificationResult.needsClarification(
                    "Could you tell me more about what you need?",
                    List.of(
                            "What is SHIPFLOW?",
                            "Help me with XPAN solver",
                            "How do I set up a simulation?"
                    )
            );
        }

        // Only check for vague patterns if no prior conversation
        // (if history exists, short queries may be follow-ups)
        if (!hasHistory) {
            for (var entry : VAGUE_QUERIES.entrySet()) {
                if (lower.matches(".*" + entry.getKey() + ".*")) {
                    // But only if query is short/generic
                    if (lower.split("\\s+").length <= 3) {
                        var resp = entry.getValue();
                        log.info("Clarification needed for: '{}'", query);
                        return ClarificationResult.needsClarification(
                                resp.message(), resp.options());
                    }
                }
            }
        }

        // Single word that's not a SHIPFLOW module
        if (lower.split("\\s+").length == 1 && !isModuleName(lower)) {
            return ClarificationResult.needsClarification(
                    "I want to help with \"" + query + "\"! " +
                            "Could you give me a bit more context?",
                    List.of(
                            "\"What is " + query + " in SHIPFLOW?\"",
                            "\"How do I use " + query + "?\"",
                            "\"" + query + " setup in XFLOW\""
                    )
            );
        }

        return ClarificationResult.clear();
    }

    // ── Module name checker ─────────────────────────────────────
    private boolean isModuleName(String word) {
        return Set.of(
                "xflow", "xmesh", "xpan", "xbound",
                "xgrid", "xgr8", "xchap", "xpost",
                "shipflow"
        ).contains(word.toLowerCase());
    }

    // ── Result records ──────────────────────────────────────────

    public record ClarificationResult(
            boolean needsClarification,
            String message,
            List<String> options
    ) {
        public static ClarificationResult clear() {
            return new ClarificationResult(false, null, List.of());
        }

        public static ClarificationResult needsClarification(
                String message, List<String> options) {
            return new ClarificationResult(true, message, options);
        }
    }

    public record ClarificationResponse(
            String message,
            List<String> options
    ) {}
}
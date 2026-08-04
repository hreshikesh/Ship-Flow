package com.shipflow.backend.chatbot.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
@Slf4j
public class SuggestionEngine {

    private static final Map<IntentDetector.Intent, List<String>>
            SUGGESTIONS = new EnumMap<>(IntentDetector.Intent.class) {{

        put(IntentDetector.Intent.CAPABILITY_ASK, List.of(
                "What is SHIPFLOW?",
                "What modules does SHIPFLOW have?",
                "How do I set up my first simulation?",
                "What is the XPAN solver used for?"
        ));

        put(IntentDetector.Intent.MODULE_XFLOW, List.of(
                "What commands are available in XFLOW?",
                "How do I define hull geometry with HULLTYPE?",
                "How do I add a propeller in XFLOW?",
                "What is the SYMMETRY command?",
                "How do I configure a rudder in XFLOW?"
        ));

        put(IntentDetector.Intent.MODULE_XMESH, List.of(
                "How does XMESH generate meshes?",
                "What is the FREE command in XMESH?",
                "How do I set up mesh strips?",
                "What is FSFAR in XMESH?",
                "How do I control mesh refinement?"
        ));

        put(IntentDetector.Intent.MODULE_XPAN, List.of(
                "What is the XPAN solver?",
                "How do I set convergence criteria in XPAN?",
                "What is a wavecut in XPAN?",
                "How does XPAN handle iterations?",
                "How do I run XPAN in parallel?"
        ));

        put(IntentDetector.Intent.MODULE_XBOUND, List.of(
                "What does XBOUND compute?",
                "How do I set boundary layer initial conditions?",
                "What is the RESISTANCE command in XBOUND?",
                "How does XBOUND calculate roughness effects?"
        ));

        put(IntentDetector.Intent.MODULE_XGRID, List.of(
                "How does XGRID generate the grid?",
                "What is the YPLUS command?",
                "How do I use POISSON grid smoothing?",
                "What is grid FEEDBACK in XGRID?",
                "How do I control grid TUNE parameters?"
        ));

        put(IntentDetector.Intent.MODULE_XCHAP, List.of(
                "What is XCHAP used for?",
                "How does XCHAP handle overlapping grids?",
                "What is the VOF method in XCHAP?",
                "How do I define an ACTUATOR disk?",
                "How does XCHAP compute wake?"
        ));

        put(IntentDetector.Intent.HULL_GEOMETRY, List.of(
                "How do I import a hull geometry?",
                "How do I model a bulbous bow in SHIPFLOW?",
                "How do I handle twin skeg hulls?",
                "What offset file format does SHIPFLOW use?",
                "How do I define transom stern geometry?"
        ));

        put(IntentDetector.Intent.PROPULSION, List.of(
                "How do I add a propeller in SHIPFLOW?",
                "What is self-propulsion analysis?",
                "How do I set up shaft geometry?",
                "How does SHIPFLOW compute thrust?",
                "How do I use the actuator disk model?"
        ));

        put(IntentDetector.Intent.RESISTANCE, List.of(
                "How does SHIPFLOW predict resistance?",
                "What is wave resistance calculation?",
                "How do I compute viscous resistance?",
                "How accurate is SHIPFLOW resistance prediction?",
                "How do I add roughness effects?"
        ));

        put(IntentDetector.Intent.WORKFLOW, List.of(
                "What are the steps for a typical SHIPFLOW analysis?",
                "How do I write a command file?",
                "What is the command file syntax?",
                "What files does SHIPFLOW generate?",
                "How do I validate results?"
        ));

        put(IntentDetector.Intent.FILE_FORMAT, List.of(
                "What is the offset file format?",
                "How are coordinate systems defined?",
                "How do I import an H-O topology grid?",
                "What are group labels and status flags?"
        ));

        put(IntentDetector.Intent.REMOTE_COMPUTE, List.of(
                "How do I set up remote computations?",
                "How does SHIPFLOW use MPI?",
                "How do I configure SSH for remote runs?",
                "What are the known limitations of remote compute?",
                "How do I integrate with PBS/Torque?"
        ));

        put(IntentDetector.Intent.COMPARISON, List.of(
                "What is the difference between XPAN and XCHAP?",
                "When should I use XPAN vs XCHAP?",
                "Compare potential flow vs RANS solvers",
                "Which solver is best for early design?"
        ));

        put(IntentDetector.Intent.GENERAL, List.of(
                "What is SHIPFLOW?",
                "What modules are in SHIPFLOW?",
                "How does the XPAN solver work?",
                "How do I set up a mono-hull analysis?",
                "What is the difference between XPAN and XCHAP?"
        ));
    }};

    // ── Get suggestions ────────────────────────────────────────
    public List<String> getSuggestions(
            IntentDetector.Intent intent,
            List<String> recentTopics,
            String lastQuery,
            int count) {

        // Start with intent-based
        List<String> pool = new ArrayList<>(
                SUGGESTIONS.getOrDefault(intent,
                        SUGGESTIONS.get(IntentDetector.Intent.GENERAL))
        );

        // Add cross-topic based on history
        if (recentTopics != null && !recentTopics.isEmpty()) {
            pool.addAll(getCrossTopicSuggestions(recentTopics));
        }

        // Remove exact/near duplicates of last query
        if (lastQuery != null && !lastQuery.isBlank()) {
            String lower = lastQuery.toLowerCase();
            pool.removeIf(s -> {
                String sl = s.toLowerCase();
                // Remove if user already asked something very similar
                return sl.equals(lower)
                        || (lower.length() > 10
                        && sl.contains(lower.substring(0, 10)));
            });
        }

        // Shuffle and dedupe
        Collections.shuffle(pool);
        return pool.stream()
                .distinct()
                .limit(count)
                .toList();
    }

    // ── Smart cross-topic suggestions ──────────────────────────
    private List<String> getCrossTopicSuggestions(
            List<String> topics) {

        List<String> cross = new ArrayList<>();

        // XFLOW + XMESH
        if (topics.contains("XFLOW") && topics.contains("XMESH")) {
            cross.add("How does XFLOW output feed into XMESH?");
            cross.add("What geometry commands affect mesh quality?");
        }

        // XMESH + XPAN
        if (topics.contains("XMESH") && topics.contains("XPAN")) {
            cross.add("What mesh quality is needed for XPAN?");
            cross.add("How do free surface panels affect XPAN?");
        }

        // XGRID + XCHAP
        if (topics.contains("XGRID") && topics.contains("XCHAP")) {
            cross.add("How does XGRID prepare the grid for XCHAP?");
            cross.add("What YPLUS values work for XCHAP?");
        }

        // Hull + Resistance
        if (topics.contains("Hull Design")
                && topics.contains("Resistance")) {
            cross.add("How does hull geometry affect resistance?");
            cross.add("Which hull features minimize wave resistance?");
        }

        // Propulsion + XCHAP
        if (topics.contains("Propulsion")
                && topics.contains("XCHAP")) {
            cross.add("How do I combine actuator disk with XCHAP?");
            cross.add("How does XCHAP compute propeller wake?");
        }

        return cross;
    }
}
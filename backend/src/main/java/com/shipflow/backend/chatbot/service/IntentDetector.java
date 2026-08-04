package com.shipflow.backend.chatbot.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
@Slf4j
public class IntentDetector {

    public enum Intent {
        GREETING,
        FAREWELL,
        THANKS,
        CAPABILITY_ASK,      // what can you do
        MODULE_XFLOW,        // XFLOW commands
        MODULE_XMESH,        // XMESH commands
        MODULE_XPAN,         // XPAN commands
        MODULE_XBOUND,       // XBOUND commands
        MODULE_XGRID,        // XGRID commands
        MODULE_XCHAP,        // XCHAP commands
        MODULE_XPOST,        // XPOST commands
        HULL_GEOMETRY,       // hull, bulbous, transom
        PROPULSION,          // propeller, shaft
        RESISTANCE,          // resistance, drag
        WORKFLOW,            // setup, steps
        FILE_FORMAT,         // offset file, format
        COMPARISON,          // vs, compare
        HOW_TO,
        WHAT_IS,
        REMOTE_COMPUTE,      // remote, cluster, MPI
        GENERAL
    }

    // ── SHIPFLOW module keywords ────────────────────────────────
    private static final Map<Intent, List<String>> INTENT_KEYWORDS =
            new LinkedHashMap<>() {{

                put(Intent.GREETING, List.of(
                        "\\bhello\\b", "\\bhi\\b", "\\bhey\\b",
                        "\\bgood morning\\b", "\\bgood afternoon\\b",
                        "\\bhowdy\\b"
                ));

                put(Intent.FAREWELL, List.of(
                        "\\bbye\\b", "\\bgoodbye\\b", "\\bsee you\\b"
                ));

                put(Intent.THANKS, List.of(
                        "\\bthanks\\b", "\\bthank you\\b", "\\bthx\\b",
                        "\\bappreciate\\b"
                ));

                put(Intent.CAPABILITY_ASK, List.of(
                        "\\bwhat can you do\\b", "\\bwhat do you know\\b",
                        "\\bhelp\\b", "\\bcapabilities\\b",
                        "\\bwhat are you\\b", "\\bwho are you\\b"
                ));

                // ── Modules ────────────────────────────────────────────
                put(Intent.MODULE_XFLOW, List.of(
                        "\\bxflow\\b", "\\bxflow command\\b",
                        "\\bappendage\\b", "\\bassembly\\b",
                        "\\bbracket\\b", "\\bcylinder\\b",
                        "\\bhullype\\b", "\\bpropeller\\b",
                        "\\brudder\\b", "\\bshaft\\b", "\\bvship\\b"
                ));

                put(Intent.MODULE_XMESH, List.of(
                        "\\bxmesh\\b", "\\bxmas\\b",   // ✅ typo support
                        "\\bmesh command\\b",
                        "\\benvironment\\b", "\\btransom\\b",
                        "\\bfsfar\\b", "\\bstrip\\b", "\\bobpoint\\b"
                ));

                put(Intent.MODULE_XPAN, List.of(
                        "\\bxpan\\b", "\\bpanel method\\b",
                        "\\bconvergence\\b", "\\bexforce\\b",
                        "\\bexmoment\\b", "\\biteration\\b",
                        "\\brelaxation\\b", "\\btwcut\\b", "\\bwavecut\\b"
                ));

                put(Intent.MODULE_XBOUND, List.of(
                        "\\bxbound\\b", "\\bboundary layer\\b",
                        "\\binicon\\b", "\\btrace\\b"
                ));

                put(Intent.MODULE_XGRID, List.of(
                        "\\bxgrid\\b", "\\bxgr8\\b",
                        "\\bgrid\\b", "\\bcoarse\\b",
                        "\\boffset\\b", "\\bpoisson\\b",
                        "\\bxdistr\\b", "\\betasmooth\\b",
                        "\\bfeedback\\b", "\\bneumann\\b",
                        "\\byplus\\b", "\\btune\\b"
                ));

                put(Intent.MODULE_XCHAP, List.of(
                        "\\bxchap\\b", "\\bchap\\b",
                        "\\bactuator\\b", "\\bextpropeller\\b",
                        "\\bextract\\b", "\\bkrylov\\b",
                        "\\blline\\b", "\\boverlap\\b",
                        "\\brefine\\b", "\\bunion\\b",
                        "\\bvolume\\b", "\\bvof\\b", "\\bwake\\b"
                ));

                put(Intent.MODULE_XPOST, List.of(
                        "\\bxpost\\b", "\\bpost processing\\b",
                        "\\bpost-processing\\b"
                ));

                // ── Domain topics ──────────────────────────────────────
                put(Intent.HULL_GEOMETRY, List.of(
                        "\\bhull\\b", "\\bbulbous\\b", "\\btransom\\b",
                        "\\bkeel\\b", "\\bbow\\b", "\\bstern\\b",
                        "\\bmono.hull\\b", "\\btwin.skeg\\b",
                        "\\bwaterplane\\b"
                ));

                put(Intent.PROPULSION, List.of(
                        "\\bpropeller\\b", "\\bself.?propulsion\\b",
                        "\\bshaft\\b", "\\bthrust\\b", "\\btorque\\b"
                ));

                put(Intent.RESISTANCE, List.of(
                        "\\bresistance\\b", "\\bdrag\\b",
                        "\\bfriction\\b", "\\bviscous\\b",
                        "\\bwave resistance\\b", "\\bcalm water\\b"
                ));

                put(Intent.WORKFLOW, List.of(
                        "\\bworkflow\\b", "\\bsetup\\b", "\\bconfigure\\b",
                        "\\bsteps\\b", "\\binstall\\b",
                        "\\binput\\b", "\\boutput\\b", "\\bcommand file\\b",
                        "\\bsyntax\\b"
                ));

                put(Intent.FILE_FORMAT, List.of(
                        "\\boffset file\\b", "\\bfile format\\b",
                        "\\bcoordinate system\\b", "\\bh.o topology\\b"
                ));

                put(Intent.REMOTE_COMPUTE, List.of(
                        "\\bremote\\b", "\\bcluster\\b", "\\bmpi\\b",
                        "\\bopen mpi\\b", "\\bpbs\\b", "\\btorque\\b",
                        "\\bssh\\b", "\\bparallel\\b"
                ));

                put(Intent.COMPARISON, List.of(
                        "\\bvs\\b", "\\bversus\\b", "\\bcompare\\b",
                        "\\bdifference\\b", "\\bbetter\\b",
                        "\\bwhich is\\b"
                ));

                put(Intent.HOW_TO, List.of(
                        "\\bhow do\\b", "\\bhow to\\b", "\\bhow can\\b",
                        "\\bhow does\\b", "\\bguide\\b", "\\btutorial\\b"
                ));

                put(Intent.WHAT_IS, List.of(
                        "\\bwhat is\\b", "\\bwhat are\\b",
                        "\\bdefine\\b", "\\bexplain\\b",
                        "\\btell me about\\b"
                ));
            }};

    // ── Detect intent ───────────────────────────────────────────
    public Intent detect(String query) {
        if (query == null || query.isBlank()) return Intent.GENERAL;

        String lower = query.toLowerCase().trim();

        for (var entry : INTENT_KEYWORDS.entrySet()) {
            for (String pattern : entry.getValue()) {
                if (lower.matches(".*" + pattern + ".*")) {
                    log.debug("Intent: {} for: {}",
                            entry.getKey(), query);
                    return entry.getKey();
                }
            }
        }

        return Intent.GENERAL;
    }

    // ── Purely conversational (no DB search) ────────────────────
    public boolean isConversational(Intent intent) {
        return intent == Intent.GREETING
                || intent == Intent.FAREWELL
                || intent == Intent.THANKS
                || intent == Intent.CAPABILITY_ASK;
    }

    // ── Topic label for memory ──────────────────────────────────
    public String getTopicLabel(Intent intent) {
        return switch (intent) {
            case MODULE_XFLOW     -> "XFLOW";
            case MODULE_XMESH     -> "XMESH";
            case MODULE_XPAN      -> "XPAN";
            case MODULE_XBOUND    -> "XBOUND";
            case MODULE_XGRID     -> "XGRID";
            case MODULE_XCHAP     -> "XCHAP";
            case MODULE_XPOST     -> "XPOST";
            case HULL_GEOMETRY    -> "Hull Design";
            case PROPULSION       -> "Propulsion";
            case RESISTANCE       -> "Resistance";
            case WORKFLOW         -> "Workflow";
            case FILE_FORMAT      -> "File Format";
            case REMOTE_COMPUTE   -> "Remote Compute";
            case COMPARISON       -> "Comparison";
            case HOW_TO           -> "How-To";
            case WHAT_IS          -> "Definition";
            default               -> "General";
        };
    }
}
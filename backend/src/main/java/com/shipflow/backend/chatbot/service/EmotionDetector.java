package com.shipflow.backend.chatbot.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
@Slf4j
public class EmotionDetector {

    public enum Emotion {
        NEUTRAL,
        FRUSTRATED,
        CONFUSED,
        SATISFIED,
        CURIOUS,
        URGENT,
        GRATEFUL
    }

    // ── Emotion detection patterns ──────────────────────────────
    private static final Map<Emotion, List<String>> PATTERNS =
            new EnumMap<>(Emotion.class) {{

                put(Emotion.FRUSTRATED, List.of(
                        "\\bnot working\\b", "\\bdoesn't work\\b",
                        "\\bdoesn.t work\\b", "\\bstill not\\b",
                        "\\bstill can.t\\b", "\\bstill doesn.t\\b",
                        "\\bbroke\\b", "\\bbroken\\b",
                        "\\bfailed again\\b", "\\bwaste\\b",
                        "\\buseless\\b", "\\bterrible\\b",
                        "\\bawful\\b", "\\bugh\\b",
                        "\\bstupid\\b", "\\bidiot\\b",
                        "\\bfrustr\\b", "\\bannoy\\b",
                        "\\bwhy (is|does|can|won).*(it|this|that)\\b",
                        "\\b(nothing|none|never) works?\\b",
                        "\\bgive up\\b", "\\bi quit\\b"
                ));

                put(Emotion.CONFUSED, List.of(
                        "\\bconfus\\b", "\\bdon.t understand\\b",
                        "\\bdoesn.t make sense\\b",
                        "\\bnot sure what\\b", "\\bnot sure how\\b",
                        "\\bwhat do you mean\\b",
                        "\\blost\\b", "\\bstuck\\b",
                        "\\bwhat.s the difference\\b",
                        "\\bi.m not getting\\b",
                        "\\bcan.t figure\\b", "\\bno idea\\b",
                        "\\bhelp me understand\\b",
                        "\\b(huh|what)\\?\\b"
                ));

                put(Emotion.SATISFIED, List.of(
                        "\\bperfect\\b", "\\bexactly\\b",
                        "\\bthat.s (right|correct|it|great)\\b",
                        "\\bawesome\\b", "\\bexcellent\\b",
                        "\\bwonderful\\b", "\\bbrilliant\\b",
                        "\\bgreat answer\\b", "\\bvery helpful\\b",
                        "\\bwell done\\b", "\\b(nice|good) one\\b",
                        "\\bnow I (understand|get it)\\b",
                        "\\bmakes sense\\b", "\\bclear now\\b"
                ));

                put(Emotion.CURIOUS, List.of(
                        "\\binteresting\\b", "\\bcurious\\b",
                        "\\btell me more\\b", "\\bi wonder\\b",
                        "\\bcan you explain\\b",
                        "\\bwhat (happens|would happen)\\b",
                        "\\bhow (exactly|precisely)\\b",
                        "\\bwhy (exactly|precisely)\\b",
                        "\\bi.d like to know\\b",
                        "\\bwhat.s (behind|under|inside)\\b"
                ));

                put(Emotion.URGENT, List.of(
                        "\\burgent\\b", "\\basap\\b",
                        "\\bimmediately\\b", "\\bright now\\b",
                        "\\bdeadline\\b", "\\bquick(ly)?\\b",
                        "\\bhurry\\b", "\\btime.sensitive\\b",
                        "\\bneed.*(now|today|fast|asap)\\b",
                        "\\bemergency\\b"
                ));

                put(Emotion.GRATEFUL, List.of(
                        "\\bthank\\b", "\\bthanks\\b", "\\bthx\\b",
                        "\\bappreciate\\b", "\\bgrateful\\b",
                        "\\bhelpful\\b", "\\bsaved me\\b",
                        "\\blifesaver\\b"
                ));
            }};

    // ── Emotional response prefixes ─────────────────────────────
    private static final Map<Emotion, List<String>> RESPONSES =
            new EnumMap<>(Emotion.class) {{

                put(Emotion.FRUSTRATED, List.of(
                        "I understand this can be frustrating. " +
                                "Let me try a different approach.\n\n",

                        "I'm sorry you're having trouble. " +
                                "Let's break this down step by step.\n\n",

                        "That sounds annoying — let me see if I " +
                                "can find a clearer explanation.\n\n"
                ));

                put(Emotion.CONFUSED, List.of(
                        "No worries — let me explain this differently.\n\n",

                        "Good question! Let me break it down simply.\n\n",

                        "I can see how that might be unclear. " +
                                "Here's a simpler way to think about it:\n\n"
                ));

                put(Emotion.SATISFIED, List.of(
                        "Glad that helped! ",
                        "Great to hear! ",
                        "Awesome! "
                ));

                put(Emotion.CURIOUS, List.of(
                        "Great question! ",
                        "That's an interesting point — ",
                        "Good thinking! "
                ));

                put(Emotion.URGENT, List.of(
                        "Let me get you the key info quickly:\n\n",
                        "Here's the essential info you need:\n\n",
                        "Right away — here's what you need:\n\n"
                ));

                put(Emotion.GRATEFUL, List.of(
                        "You're welcome! ",
                        "Happy to help! ",
                        "Glad I could assist! "
                ));
            }};

    // ── Detect emotion ──────────────────────────────────────────
    public Emotion detect(String query) {
        if (query == null || query.isBlank()) return Emotion.NEUTRAL;

        String lower = query.toLowerCase().trim();

        for (var entry : PATTERNS.entrySet()) {
            for (String pattern : entry.getValue()) {
                if (lower.matches(".*" + pattern + ".*")) {
                    log.debug("Emotion: {} for: '{}'",
                            entry.getKey(), query);
                    return entry.getKey();
                }
            }
        }

        return Emotion.NEUTRAL;
    }

    // ── Get emotional prefix for response ───────────────────────
    public String getResponsePrefix(Emotion emotion) {
        List<String> prefixes = RESPONSES.get(emotion);
        if (prefixes == null || prefixes.isEmpty()) return "";

        // Random selection for variety
        return prefixes.get(
                new Random().nextInt(prefixes.size()));
    }

    // ── Should we adjust the search strategy? ───────────────────
    public boolean shouldRetrySearch(Emotion emotion) {
        return emotion == Emotion.FRUSTRATED
                || emotion == Emotion.CONFUSED;
    }

    // ── Should we simplify the response? ────────────────────────
    public boolean shouldSimplify(Emotion emotion) {
        return emotion == Emotion.CONFUSED
                || emotion == Emotion.URGENT;
    }
}
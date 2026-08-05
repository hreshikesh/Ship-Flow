import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import ChatHeader from "./ChatHeader";
import Conversation from "./Conversation";
import ChatInput from "./ChatInput";
import { chatbotService } from "../../services/chatbotApi";

export default function ChatPanel({ onClose }) {
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const [healthStatus, setHealthStatus] = useState(null);
    const [error, setError] = useState(null);
    const [isNearBottom, setIsNearBottom] = useState(true);
    const [showScrollBtn, setShowScrollBtn] = useState(false);

    // ✅ Persistent conversation ID (survives across sessions)
    const [conversationId] = useState(() => {
        let id = localStorage.getItem("shipflow-conv-id");
        if (!id) {
            id = crypto.randomUUID();
            localStorage.setItem("shipflow-conv-id", id);
        }
        return id;
    });

    const scrollRef = useRef(null);
    const panelRef = useRef(null);

    // ─── Stop wheel/touch events from bubbling to Lenis ───────────
    useEffect(() => {
        const panel = panelRef.current;
        if (!panel) return;

        // ✅ Prevent wheel scroll from reaching Lenis/page
        const stopWheelBubble = (e) => {
            const el = scrollRef.current;
            if (!el) return;

            const { scrollTop, scrollHeight, clientHeight } = el;
            const atTop = scrollTop === 0;
            const atBottom = scrollTop + clientHeight >= scrollHeight - 1;

            // Only block if scroll direction would overflow
            const scrollingUp = e.deltaY < 0;
            const scrollingDown = e.deltaY > 0;

            if ((atTop && scrollingUp) || (atBottom && scrollingDown)) {
                e.preventDefault(); // Stop page scroll
            }

            e.stopPropagation(); // Always stop bubbling to Lenis
        };

        // ✅ Prevent touch scroll from reaching page
        const stopTouchBubble = (e) => {
            e.stopPropagation();
        };

        panel.addEventListener("wheel", stopWheelBubble, { passive: false });
        panel.addEventListener("touchmove", stopTouchBubble, { passive: false });

        return () => {
            panel.removeEventListener("wheel", stopWheelBubble);
            panel.removeEventListener("touchmove", stopTouchBubble);
        };
    }, []);

    // ─── Scroll Helpers ────────────────────────────────────────────
    const handleScroll = useCallback(() => {
        if (!scrollRef.current) return;
        const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
        const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
        const nearBottom = distanceFromBottom <= 100;
        setIsNearBottom(nearBottom);
        setShowScrollBtn(!nearBottom);
    }, []);

    const scrollToBottom = useCallback(
        (force = false) => {
            if (!scrollRef.current) return;
            if (force || isNearBottom) {
                scrollRef.current.scrollTo({
                    top: scrollRef.current.scrollHeight,
                    behavior: "smooth",
                });
            }
        },
        [isNearBottom]
    );

    // ─── Attach scroll listener ────────────────────────────────────
    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;
        container.addEventListener("scroll", handleScroll, { passive: true });
        return () => container.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    // ─── Auto-scroll on new messages ──────────────────────────────
    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping, scrollToBottom]);

    // ─── Health Check ──────────────────────────────────────────────
    const checkHealth = useCallback(async () => {
        try {
            const status = await chatbotService.checkHealth();
            setHealthStatus(status);
            setError(null);
        } catch (err) {
            setHealthStatus({ status: "offline" });
            if (!err.response) {
                setError("AI service is offline. Check your connection.");
            }
        }
    }, []);

    useEffect(() => {
        checkHealth();
    }, [checkHealth]);

    // ─── Send Message ──────────────────────────────────────────────
    // ✅ Update handleSend to include conversationId
    const handleSend = useCallback(
        async (text) => {
            if (!text.trim() || isTyping) return;

            const userMsg = {
                id: crypto.randomUUID(),
                role: "user",
                content: text.trim(),
                timestamp: new Date().toISOString(),
            };

            setMessages((prev) => [...prev, userMsg]);
            setIsTyping(true);
            setIsNearBottom(true);
            setError(null);

            try {
                // ✅ Pass conversationId to API
                const response = await chatbotService.chat(text.trim(), conversationId);

                const aiMsg = {
                    id: crypto.randomUUID(),
                    role: "assistant",
                    content: response.response || "I couldn't find relevant info.",
                    sources: response.sources || [],
                    suggestions: response.suggestions || [],
                    confidence: response.confidence ?? null,
                    intent: response.intent || null,
                    searchMode: response.searchMode || null,    // ✅ Add this
                    timestamp: response.timestamp || new Date().toISOString(),
                };

                setMessages((prev) => [...prev, aiMsg]);
            } catch (err) {
                const errorMsg = {
                    id: crypto.randomUUID(),
                    role: "assistant",
                    content:
                        err.response?.data?.message ||
                        "Sorry, I encountered an error. Please try again.",
                    isError: true,
                    timestamp: new Date().toISOString(),
                };

                setMessages((prev) => [...prev, errorMsg]);
                setError("Failed to get response. Please try again.");

                if (!err.response) {
                    checkHealth();
                }
            } finally {
                setIsTyping(false);
            }
        },
        [isTyping, conversationId]  // ✅ Add conversationId to deps
    );

    // ─── Clear & Retry ─────────────────────────────────────────────
    const handleClear = useCallback(() => {
        setMessages([]);
        setIsTyping(false);
        setError(null);
        setIsNearBottom(true);
        setShowScrollBtn(false);

        localStorage.removeItem("shipflow-conv-id");
    }, []);

    const handleRetry = useCallback(() => {
        checkHealth();
        setError(null);
    }, [checkHealth]);

    return (
        <motion.div
            ref={panelRef}
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 14 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            className="fixed bottom-6 right-6 z-[9999] flex h-[600px] w-[400px] flex-col overflow-hidden rounded-2xl border border-cyan-400/10 bg-[#041423] shadow-[0_20px_60px_rgba(0,0,0,.6)] backdrop-blur-2xl"
            aria-label="SHIPFLOW AI Chat"
            role="dialog"
            // ✅ Lenis data attribute — tells Lenis to ignore this element
            data-lenis-prevent
        >
            {/* ── Header ── */}
            <ChatHeader
                onClose={onClose}
                onClear={handleClear}
                hasMessages={messages.length > 0}
                healthStatus={healthStatus}
                onRetry={handleRetry}
            />

            {/* ── Error Banner ── */}
            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-b border-red-500/20 bg-red-500/10 px-4 py-2"
                    >
                        <p className="text-xs text-red-400">{error}</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Scrollable Messages ── */}
            <div className="relative flex-1 overflow-hidden">
                <div
                    ref={scrollRef}
                    onScroll={handleScroll}
                    className="chat-scroll h-full overflow-y-auto"
                    // ✅ Also tell Lenis to prevent scroll on this element
                    data-lenis-prevent
                >
                    <Conversation
                        messages={messages}
                        onSuggestionClick={handleSend}
                        isTyping={isTyping}
                    />
                </div>

                {/* ── Scroll to Bottom Button ── */}
                <AnimatePresence>
                    {showScrollBtn && (
                        <motion.button
                            initial={{ opacity: 0, y: 6, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 6, scale: 0.9 }}
                            onClick={() => scrollToBottom(true)}
                            className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-cyan-500/20 bg-[#041423]/90 px-3 py-1.5 text-xs text-cyan-400 shadow-lg backdrop-blur-sm transition-colors hover:border-cyan-400/40 hover:text-cyan-300"
                        >
                            <ChevronDown size={12} />
                            Scroll to bottom
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>

            {/* ── Input ── */}
            <ChatInput
                onSend={handleSend}
                isTyping={isTyping}
                disabled={healthStatus?.status !== "online"}
            />
        </motion.div>
    );
}
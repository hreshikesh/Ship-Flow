import { motion, AnimatePresence } from "framer-motion";
import { FileText, AlertCircle, Copy, Check, Lightbulb } from "lucide-react";
import { useState } from "react";
import TypingIndicator from "./TypingIndicator";

const DEFAULT_SUGGESTIONS = [
    "What is SHIPFLOW?",
    "How does the BASIC solver work?",
    "BASIC vs RANS comparison",
    "How do I predict ship resistance?",
];

function CopyButton({ text }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch { }
    };

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCopy}
            className="ml-auto flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] text-slate-500 transition-colors hover:bg-white/5 hover:text-slate-300"
        >
            {copied ? (
                <>
                    <Check size={10} className="text-green-400" />
                    <span className="text-green-400">Copied</span>
                </>
            ) : (
                <>
                    <Copy size={10} />
                    Copy
                </>
            )}
        </motion.button>
    );
}

function MessageBubble({ msg, onSuggestionClick }) {
    const isUser = msg.role === "user";
    const isError = msg.isError;

    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className={`flex ${isUser ? "justify-end" : "justify-start"}`}
        >
            {/* AI Avatar */}
            {!isUser && (
                <div className="mr-2 mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-cyan-400/12 bg-cyan-500/10">
                    <svg width={10} height={10} viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth={2} strokeLinecap="round"
                        className="text-cyan-400">
                        <path d="M3 17l3-12h12l3 12" />
                        <path d="M2 17c2 2 5 3 10 3s8-1 10-3" />
                    </svg>
                </div>
            )}

            <div className="flex max-w-[82%] flex-col gap-1">
                {/* Message bubble */}
                <div className={`rounded-2xl px-4 py-3 ${isUser
                        ? "rounded-tr-sm bg-cyan-500 text-black"
                        : isError
                            ? "rounded-tl-sm border border-red-500/20 bg-red-500/10 text-red-300"
                            : "rounded-tl-sm border border-white/[0.06] bg-white/[0.04] text-slate-200"
                    }`}>
                    <p className="whitespace-pre-wrap text-[12.5px] leading-relaxed">
                        {msg.content}
                    </p>

                    {/* Sources */}
                    {msg.sources && msg.sources.length > 0 && (
                        <div className="mt-3 space-y-1 border-t border-white/10 pt-2">
                            <p className="flex items-center gap-1 text-[10px] text-slate-500">
                                <FileText size={10} /> Sources
                            </p>
                            {msg.sources.map((source, idx) => (
                                <div key={idx}
                                    className="rounded-md bg-white/5 px-2 py-1 text-[10px] text-cyan-400">
                                    {source}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Error indicator */}
                    {isError && (
                        <div className="mt-2 flex items-center gap-1 text-[10px] text-red-400">
                            <AlertCircle size={10} />
                            <span>Something went wrong</span>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className={`flex items-center gap-2 px-1 ${isUser ? "flex-row-reverse" : "flex-row"
                    }`}>
                    <span className="text-[10px] text-slate-600">
                        {new Date(msg.timestamp).toLocaleTimeString([], {
                            hour: "2-digit", minute: "2-digit"
                        })}
                    </span>
                    {!isUser && <CopyButton text={msg.content} />}
                </div>

                {/* ✅ AI Suggestions after each AI message */}
                {!isUser && !isError && msg.suggestions?.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mt-1 space-y-1"
                    >
                        <p className="flex items-center gap-1 px-1 text-[10px] text-slate-600">
                            <Lightbulb size={10} className="text-yellow-500/60" />
                            You might also ask:
                        </p>
                        {msg.suggestions.map((suggestion, idx) => (
                            <motion.button
                                key={idx}
                                initial={{ opacity: 0, x: -4 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.35 + idx * 0.05 }}
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                onClick={() => onSuggestionClick(suggestion)}
                                className="w-full rounded-lg border border-cyan-500/10 bg-cyan-500/[0.03] px-3 py-2 text-left text-[10.5px] text-cyan-400/80 transition-all hover:border-cyan-500/20 hover:bg-cyan-500/[0.07] hover:text-cyan-300"
                            >
                                {suggestion}
                               
                                {!isUser && !isError && msg.searchMode === "clarification"
                                    && msg.suggestions?.length > 0 && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 4 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 }}
                                            className="mt-2 space-y-1.5"
                                        >
                                            {msg.suggestions.map((option, idx) => (
                                                <motion.button
                                                    key={idx}
                                                    initial={{ opacity: 0, x: -4 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.25 + idx * 0.05 }}
                                                    whileHover={{ scale: 1.01 }}
                                                    whileTap={{ scale: 0.99 }}
                                                    onClick={() => onSuggestionClick(option)}
                                                    className="w-full rounded-lg border border-cyan-500/15 
                                                    bg-cyan-500/[0.05] px-3 py-2 text-left 
                                                    text-[11px] text-cyan-400/90 
                                                    transition-all hover:border-cyan-500/25 
                                                    hover:bg-cyan-500/[0.1] hover:text-cyan-300"
                                                >
                                                    {option}
                                                </motion.button>
                                            ))}
                                        </motion.div>
                                    )}
                            </motion.button>

                        ))}
                    </motion.div>
                )}
            </div>

            {/* User Avatar */}
            {isUser && (
                <div className="ml-2 mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-white/[0.06]">
                    <span className="text-[9px] font-semibold text-slate-400">YOU</span>
                </div>
            )}
        </motion.div>
    );
}

export default function Conversation({
    messages,
    onSuggestionClick,
    isTyping
}) {
    return (
        <div className="flex min-h-full flex-col justify-end space-y-3 p-4">

            {/* Welcome state */}
            {messages.length === 0 && !isTyping && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center py-8 text-center"
                >
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-400/10 bg-gradient-to-br from-cyan-500/10 to-blue-500/5">
                        <svg width={22} height={22} viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth={1.5} strokeLinecap="round"
                            className="text-cyan-400">
                            <path d="M3 17l3-12h12l3 12" />
                            <path d="M2 17c2 2 5 3 10 3s8-1 10-3" />
                            <line x1="12" y1="5" x2="12" y2="2" />
                            <line x1="10" y1="3" x2="14" y2="3" />
                        </svg>
                    </div>

                    <h2 className="mb-1 text-sm font-semibold text-white">
                        SHIPFLOW AI Assistant
                    </h2>
                    <p className="mb-6 text-[11px] leading-relaxed text-slate-500">
                        Ask me anything about SHIPFLOW documentation,
                        <br />solvers, hull design and CFD workflows.
                    </p>

                    <div className="flex w-full flex-col gap-2">
                        {DEFAULT_SUGGESTIONS.map((suggestion, idx) => (
                            <motion.button
                                key={idx}
                                initial={{ opacity: 0, x: -6 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.05 + idx * 0.05 }}
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                onClick={() => onSuggestionClick(suggestion)}
                                className="w-full rounded-lg border border-cyan-500/10 bg-cyan-500/[0.04] px-3 py-2.5 text-left text-[11px] text-cyan-300 transition-colors hover:border-cyan-500/20 hover:bg-cyan-500/[0.08]"
                            >
                                {suggestion}
                            </motion.button>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* Messages */}
            <AnimatePresence initial={false}>
                {messages.map((msg) => (
                    <MessageBubble
                        key={msg.id}
                        msg={msg}
                        onSuggestionClick={onSuggestionClick}
                    />
                ))}
            </AnimatePresence>

            {isTyping && <TypingIndicator />}
        </div>
    );
}
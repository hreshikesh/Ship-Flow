// Book.jsx
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ExternalLink, Quote } from "lucide-react";

export default function Book({ book, index }) {
    const [isHovered, setIsHovered] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                    delay: index * 0.08,
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                }}
                className="relative flex flex-col items-center"
            >
                {/* Replace the tooltip block in Book.jsx */}
                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.95 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-4 hidden w-60 -translate-x-1/2 md:block"
                        >
                            <div className="relative rounded-xl border border-white/10 bg-slate-900/95 p-4 shadow-2xl backdrop-blur-xl">
                                {/* Accent bar */}
                                <div className={`absolute left-0 top-0 h-full w-1 rounded-l-xl ${book.accent}`} />

                                <div className="pl-2">
                                    <div className="text-[10px] font-semibold uppercase tracking-wider text-cyan-400">
                                        {book.category}
                                    </div>
                                    <div className="mt-1.5 text-sm font-bold leading-snug text-white">
                                        {book.title}
                                    </div>
                                    <div className="mt-2 text-[11px] text-slate-400">
                                        {book.author}
                                    </div>
                                    <div className="text-[11px] text-slate-500">
                                        {book.journal} · {book.year}
                                    </div>
                                    <div className="mt-3 flex items-center gap-2 border-t border-white/5 pt-2">
                                        <span className={`h-1.5 w-1.5 rounded-full ${book.accent}`} />
                                        <span className="text-[10px] font-medium text-slate-400">
                                            {book.citations} citations
                                        </span>
                                    </div>
                                </div>

                                {/* Arrow pointing down to book */}
                                <div className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-b border-r border-white/10 bg-slate-900/95" />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                <motion.div
                    whileHover={{ y: -24, rotate: -3, scale: 1.08 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    onHoverStart={() => setIsHovered(true)}
                    onHoverEnd={() => setIsHovered(false)}
                    onClick={() => setIsOpen(true)}
                    className={`
            group relative cursor-pointer
            h-56 w-12 sm:h-64 sm:w-14 md:h-72 md:w-16
            rounded-t-lg bg-gradient-to-b ${book.color}
            shadow-2xl transition-shadow duration-300
            hover:shadow-[0_20px_60px_-10px_rgba(0,0,0,0.5)]
          `}
                >
                    {/* ✅ Fixed: border-white/15 → border-white/10 */}
                    <div className="absolute inset-0 rounded-t-lg border border-white/10" />
                    <div className="absolute left-0 top-0 h-full w-[3px] rounded-tl-lg bg-white/20" />

                    <div className="absolute left-2 right-2 top-3 h-px bg-white/20" />
                    {/* ✅ Fixed: top-4.5 → top-[18px] */}
                    <div className="absolute left-3 right-3 top-[18px] h-px bg-white/10" />

                    <div className="absolute left-1/2 top-8 -translate-x-1/2 -rotate-90 whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.15em] text-white/90 sm:text-xs">
                        {book.title.length > 22
                            ? book.title.substring(0, 22) + "…"
                            : book.title}
                    </div>

                    <div
                        className={`absolute bottom-10 left-1/2 -translate-x-1/2 rounded-full ${book.accent} px-1 py-px`}
                    >
                        <span className="text-[6px] font-bold uppercase tracking-wider text-white">
                            {book.category}
                        </span>
                    </div>

                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[9px] font-medium tabular-nums text-white/60 sm:text-[10px]">
                        {book.year}
                    </div>

                    <div className="absolute bottom-8 left-2 right-2 h-px bg-white/10" />
                    <div className="pointer-events-none absolute inset-0 rounded-t-lg bg-white/0 transition-all duration-300 group-hover:bg-white/5" />
                </motion.div>

                <div
                    className={`h-3 w-10 rounded-full bg-gradient-to-b ${book.color} opacity-20 blur-sm sm:w-12 md:w-14`}
                />
            </motion.div>

            <AnimatePresence>
                {isOpen && (
                    <BookModal book={book} onClose={() => setIsOpen(false)} />
                )}
            </AnimatePresence>
        </>
    );
}

function BookModal({ book, onClose }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 30 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-slate-900/95 shadow-2xl backdrop-blur-xl"
            >
                <div className={`h-2 bg-gradient-to-r ${book.color}`} />

                <div className="p-6 sm:p-8">
                    {/*
            ✅ Fixed: `${book.accent}/20` doesn't work in Tailwind —
            Tailwind can't parse dynamic opacity modifiers on runtime values.
            Solution: use inline style for background opacity instead.
          */}
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1">
                        <span className={`h-1.5 w-1.5 rounded-full ${book.accent}`} />
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-white/80">
                            {book.category}
                        </span>
                    </span>

                    <h3 className="mt-4 text-xl font-bold text-white sm:text-2xl">
                        {book.title}
                    </h3>

                    <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-slate-400">
                        <span>{book.author}</span>
                        <span className="h-1 w-1 rounded-full bg-slate-600" />
                        <span>{book.journal}</span>
                        <span className="h-1 w-1 rounded-full bg-slate-600" />
                        <span>{book.year}</span>
                    </div>

                    <div className="mt-6 rounded-xl border border-white/5 bg-white/5 p-4">
                        <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                            <Quote size={12} />
                            Abstract
                        </div>
                        <p className="text-sm leading-relaxed text-slate-300">
                            {book.abstract}
                        </p>
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5">
                                <span className="text-lg font-bold text-white">
                                    {book.citations}
                                </span>
                            </div>
                            <div className="text-xs text-slate-500">
                                Total
                                <br />
                                Citations
                            </div>
                        </div>

                        <button className="group flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-5 py-2.5 text-sm font-medium text-cyan-400 transition hover:bg-cyan-500 hover:text-white">
                            Read Paper
                            <ExternalLink
                                size={14}
                                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            />
                        </button>
                    </div>
                </div>

                <button
                    onClick={onClose}
                    className="absolute right-4 top-6 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/60 transition hover:bg-white/20 hover:text-white"
                >
                    ✕
                </button>
            </motion.div>
        </motion.div>
    );
}
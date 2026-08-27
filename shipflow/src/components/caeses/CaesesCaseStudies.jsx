import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Library, Anchor } from "lucide-react";

import osvImage from "../../assets/images/casestudy/osv.webp";
import navalImage from "../../assets/images/casestudy/naval.webp";

const caseStudies = [
    {
        id: "osv",
        title: "OSV Design",
        client: "Kongsberg Maritime",
        image: osvImage,
        url: "https://www.caeses.com/cases/osv-design",
        spine: "linear-gradient(180deg, #0891b2 0%, #164e63 50%, #0c4a6e 100%)",
        spineTop: "#67e8f9",
        spineBottom: "#083344",
        glow: "rgba(34,211,238,0.3)",
        primary: "#22d3ee",
    },
    {
        id: "naval",
        title: "Naval Ship Design",
        client: "TKMS",
        image: navalImage,
        url: "https://www.caeses.com/cases/naval-ship-design",
        spine: "linear-gradient(180deg, #b45309 0%, #7c2d12 50%, #431407 100%)",
        spineTop: "#fbbf24",
        spineBottom: "#1c0a03",
        glow: "rgba(245,158,11,0.3)",
        primary: "#f59e0b",
    },
];

/* ============================================================
   SVGs
============================================================ */

const SpineTexture = () => (
    <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <defs>
            <linearGradient id="sp-shine" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(0,0,0,0.5)" />
                <stop offset="8%" stopColor="rgba(255,255,255,0)" />
                <stop offset="45%" stopColor="rgba(255,255,255,0.08)" />
                <stop offset="55%" stopColor="rgba(255,255,255,0.2)" />
                <stop offset="65%" stopColor="rgba(255,255,255,0.08)" />
                <stop offset="92%" stopColor="rgba(255,255,255,0)" />
                <stop offset="100%" stopColor="rgba(0,0,0,0.5)" />
            </linearGradient>
            <pattern id="sp-grain" width="3" height="5" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="0.35" fill="rgba(255,255,255,0.025)" />
                <circle cx="2.5" cy="3.5" r="0.35" fill="rgba(0,0,0,0.06)" />
            </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#sp-shine)" />
        <rect width="100%" height="100%" fill="url(#sp-grain)" />
    </svg>
);

/* Nautical rope border */
const RopeBorderSVG = ({ className }) => (
    <svg
        viewBox="0 0 400 8"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <defs>
            <pattern id="rope-pat" x="0" y="0" width="16" height="8" patternUnits="userSpaceOnUse">
                <path d="M0 4 Q 4 1 8 4 T 16 4" stroke="rgba(194,155,97,0.5)" strokeWidth="1.5" fill="none" />
                <path d="M0 5 Q 4 2 8 5 T 16 5" stroke="rgba(194,155,97,0.25)" strokeWidth="1" fill="none" />
            </pattern>
        </defs>
        <rect width="400" height="8" fill="url(#rope-pat)" />
    </svg>
);

/* Ship wheel decoration SVG */
const ShipWheelSVG = ({ className, color = "rgba(194,155,97,0.3)" }) => (
    <svg
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <circle cx="30" cy="30" r="12" stroke={color} strokeWidth="2" />
        <circle cx="30" cy="30" r="5" stroke={color} strokeWidth="1.5" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
            const rad = (angle * Math.PI) / 180;
            const x1 = 30 + 12 * Math.cos(rad);
            const y1 = 30 + 12 * Math.sin(rad);
            const x2 = 30 + 22 * Math.cos(rad);
            const y2 = 30 + 22 * Math.sin(rad);
            return (
                <line
                    key={angle}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={color}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                />
            );
        })}
        <circle cx="30" cy="30" r="22" stroke={color} strokeWidth="0.5" strokeDasharray="2 3" />
    </svg>
);

/* Porthole decoration */
const PortholeFrameSVG = ({ className, color = "rgba(194,155,97,0.25)" }) => (
    <svg
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <circle cx="25" cy="25" r="20" stroke={color} strokeWidth="3" />
        <circle cx="25" cy="25" r="23" stroke={color} strokeWidth="0.5" />
        <circle cx="25" cy="25" r="16" stroke={color} strokeWidth="0.5" />
        {/* Bolts */}
        {[0, 60, 120, 180, 240, 300].map((a) => {
            const r = (a * Math.PI) / 180;
            return (
                <circle
                    key={a}
                    cx={25 + 21.5 * Math.cos(r)}
                    cy={25 + 21.5 * Math.sin(r)}
                    r="1.2"
                    fill={color}
                />
            );
        })}
    </svg>
);

/* Rivet line — horizontal metal studs */
const RivetLineSVG = ({ className }) => (
    <svg
        viewBox="0 0 400 6"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <defs>
            <pattern id="rivets" x="0" y="0" width="20" height="6" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="3" r="1.5" fill="rgba(194,155,97,0.2)" />
                <circle cx="10" cy="3" r="0.8" fill="rgba(194,155,97,0.35)" />
            </pattern>
        </defs>
        <rect width="400" height="6" fill="url(#rivets)" />
    </svg>
);

/* Metal plate frame — top + bottom bars */
const MetalBarSVG = ({ variant = "top" }) => (
    <svg
        viewBox="0 0 1200 18"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-3 w-full sm:h-4"
    >
        <defs>
            <linearGradient id={`bar-${variant}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={variant === "top" ? "rgba(100,80,50,0.6)" : "rgba(60,45,30,0.5)"} />
                <stop offset="50%" stopColor={variant === "top" ? "rgba(70,55,35,0.8)" : "rgba(40,30,20,0.7)"} />
                <stop offset="100%" stopColor="rgba(15,10,5,0.9)" />
            </linearGradient>
        </defs>
        <rect width="1200" height="18" fill={`url(#bar-${variant})`} />
        <rect y={variant === "top" ? "0" : "16"} width="1200" height="2" fill="rgba(194,155,97,0.15)" />
        <rect y={variant === "top" ? "16" : "0"} width="1200" height="1" fill="rgba(0,0,0,0.8)" />
    </svg>
);

/* ============================================================
   SPINE
============================================================ */

const BookSpine = ({ study, index, hovered, setHovered }) => {
    const h = [280, 300, 290, 310];
    const w = [72, 82, 68, 86];
    const height = h[index % h.length];
    const width = w[index % w.length];
    const isHovered = hovered === study.id;
    const isFaded = hovered !== null && !isHovered;

    return (
        <motion.div
            onMouseEnter={() => setHovered(study.id)}
            onMouseLeave={() => setHovered(null)}
            animate={{
                y: isHovered ? -18 : 0,
                rotateZ: isHovered ? -0.8 : 0,
                opacity: isFaded ? 0.35 : 1,
                filter: isFaded ? "blur(1.5px)" : "blur(0px)",
            }}
            transition={{ type: "spring", stiffness: 280, damping: 24 }}
            className="group relative shrink-0 origin-bottom cursor-pointer"
            style={{ width, height }}
        >
            {/* Underglow */}
            <motion.div
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.25 }}
                className="pointer-events-none absolute -inset-3 rounded-full blur-xl"
                style={{ background: study.glow }}
            />

            {/* Spine body */}
            <div
                className="relative h-full w-full overflow-hidden rounded-t-[3px] shadow-[0_6px_24px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.12)]"
                style={{ background: study.spine }}
            >
                <SpineTexture />

                {/* Top cap */}
                <div
                    className="absolute inset-x-0 top-0 h-[5px]"
                    style={{
                        background: `linear-gradient(180deg, ${study.spineTop} 0%, rgba(0,0,0,0.4) 100%)`,
                    }}
                />
                <div className="absolute inset-x-2 top-[7px] h-px bg-white/20" />

                {/* Bottom cap */}
                <div
                    className="absolute inset-x-0 bottom-0 h-[5px]"
                    style={{
                        background: `linear-gradient(0deg, ${study.spineBottom} 0%, rgba(0,0,0,0.4) 100%)`,
                    }}
                />
                <div className="absolute inset-x-2 bottom-[7px] h-px bg-white/15" />

                {/* Vertical title */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="rotate-180 [writing-mode:vertical-rl]">
                        <span
                            className="whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.2em] text-white"
                            style={{ textShadow: "0 1px 3px rgba(0,0,0,0.6)" }}
                        >
                            {study.title}
                        </span>
                    </div>
                </div>

                {/* Shine sweep */}
                <motion.div
                    initial={{ x: "-100%", opacity: 0 }}
                    animate={{
                        x: isHovered ? "200%" : "-100%",
                        opacity: isHovered ? 1 : 0,
                    }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                    className="pointer-events-none absolute inset-0"
                    style={{
                        background:
                            "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.25) 50%, transparent 60%)",
                    }}
                />
            </div>

            {/* Hover Preview — image card */}
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.92 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.92 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="pointer-events-none absolute -top-[240px] left-1/2 z-30 w-56 -translate-x-1/2 sm:w-64"
                    >
                        <div
                            className="overflow-hidden rounded-xl border border-white/[0.1] bg-[#070d15]/95 shadow-2xl backdrop-blur-md"
                            style={{
                                boxShadow: `0 0 30px ${study.glow}, 0 12px 40px rgba(0,0,0,0.6)`,
                            }}
                        >
                            {/* Image */}
                            <div className="relative aspect-[16/9] w-full overflow-hidden">
                                <img
                                    src={study.image}
                                    alt={study.title}
                                    className="h-full w-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#070d15] via-transparent to-transparent" />

                                {/* Porthole frame overlay on image */}
                                <PortholeFrameSVG
                                    className="absolute right-2 top-2 h-6 w-6 opacity-60"
                                    color={study.primary}
                                />
                            </div>

                            {/* Info */}
                            <div className="px-3.5 pb-3.5 pt-2">
                                <p
                                    className="text-[10px] font-semibold uppercase tracking-[0.2em] opacity-80"
                                    style={{ color: study.primary }}
                                >
                                    {study.client}
                                </p>
                                <p className="mt-1 text-xs font-bold leading-snug text-white">
                                    {study.title}
                                </p>

                                <a
                                    href={study.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="pointer-events-auto mt-2.5 inline-flex items-center gap-1 text-[10px] font-semibold transition-colors duration-200"
                                    style={{ color: study.primary }}
                                >
                                    Read case study
                                    <ArrowUpRight size={11} />
                                </a>
                            </div>

                            {/* Arrow */}
                            <div
                                className="absolute -bottom-[6px] left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-b border-r bg-[#070d15]/95"
                                style={{ borderColor: "rgba(255,255,255,0.1)" }}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

/* ============================================================
   MAIN
============================================================ */

export default function CaesesCaseStudies() {
    const [hovered, setHovered] = useState(null);

    return (
        <section className="relative overflow-hidden bg-[#05080d] py-14 text-white md:py-20 lg:py-24">

            <div className="pointer-events-none absolute left-[20%] top-1/3 h-[400px] w-[400px] rounded-full bg-cyan-500/[0.025] blur-[140px]" />
            <div className="pointer-events-none absolute right-[15%] bottom-1/4 h-[350px] w-[350px] rounded-full bg-amber-500/[0.02] blur-[120px]" />

            <div className="relative mx-auto max-w-[1300px] px-5 sm:px-6 md:px-10">
                {/* ---- HEADER ---- */}
                {/* ---- HEADER ---- */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="mb-14 md:mb-20"
                >
                    {/* Eyebrow */}
                    <div className="mb-5 flex items-center gap-3">
                        <span className="h-px w-10 bg-cyan-400" />
                        <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-400">
                            <Anchor size={12} />
                            Proven In Practice
                        </span>
                    </div>

                    {/* Heading + intro */}
                    <div className="grid items-end gap-8 lg:grid-cols-[1fr_0.75fr] lg:gap-16">
                        <h2 className="max-w-4xl text-4xl font-extrabold leading-[1.03] tracking-tight sm:text-5xl lg:text-[4.25rem]">
                            Case Studies
                          
                        </h2>

                        <p className="max-w-md pb-2 text-sm font-light leading-7 text-slate-400 md:text-base">
                            How leading maritime engineering teams use CAESES to explore hull forms,
                            optimize hydrodynamics, and deliver measurable performance gains.
                        </p>
                    </div>

                    {/* Bottom rule with counter */}
                    <div className="mt-10 flex items-center gap-4 border-t border-white/[0.07] pt-5">
                      
                        <span className="h-px flex-1 bg-white/[0.05]" />
                        <span className="text-[10px] uppercase tracking-[0.2em] text-slate-600">
                            Hover a spine to preview
                        </span>
                    </div>
                </motion.div>
                {/* ---- NAUTICAL FRAME + SHELF ---- */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="relative mx-auto max-w-3xl"
                >
                    {/* Overall frame shadow */}
                    <div className="pointer-events-none absolute inset-x-4 -bottom-6 h-12 rounded-[100%] bg-black/50 blur-2xl" />

                    {/* ---- TOP FRAME BAR ---- */}
                    <div className="relative">
                        <MetalBarSVG variant="top" />
                        <RivetLineSVG className="absolute inset-x-0 top-0 h-1.5 w-full" />
                        {/* Rope accent on top */}
                        <RopeBorderSVG className="absolute -top-2 left-[10%] h-2 w-[80%] opacity-60" />
                    </div>

                    {/* ---- FRAME INTERIOR ---- */}
                    <div className="relative flex">
                        {/* Left frame edge */}
                        <div className="relative w-3 shrink-0 bg-gradient-to-r from-[#3d2a18]/80 via-[#2a1c10]/60 to-black/40 sm:w-4">
                            <div className="absolute inset-y-0 left-0 w-px bg-[#c29b61]/15" />
                        </div>

                        {/* Interior */}
                        <div className="relative flex-1 overflow-visible bg-[#05080d]">
                            {/* Ship wheel watermark */}
                            <ShipWheelSVG className="pointer-events-none absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 opacity-[0.03]" />

                            {/* Porthole decorations in corners */}
                            <PortholeFrameSVG className="pointer-events-none absolute left-3 top-3 h-8 w-8 opacity-[0.08]" />
                            <PortholeFrameSVG className="pointer-events-none absolute right-3 top-3 h-8 w-8 opacity-[0.08]" />

                            {/* Books row */}
                            <div className="relative flex flex-wrap items-end justify-center gap-2 px-6 pb-1 pt-14 sm:gap-3 sm:pt-18 md:pt-22">
                                {caseStudies.map((study, i) => (
                                    <BookSpine
                                        key={study.id}
                                        study={study}
                                        index={i}
                                        hovered={hovered}
                                        setHovered={setHovered}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Right frame edge */}
                        <div className="relative w-3 shrink-0 bg-gradient-to-l from-[#3d2a18]/80 via-[#2a1c10]/60 to-black/40 sm:w-4">
                            <div className="absolute inset-y-0 right-0 w-px bg-[#c29b61]/15" />
                        </div>
                    </div>

                    {/* ---- BOTTOM SHELF PLANK ---- */}
                    <div className="relative">
                        <MetalBarSVG variant="bottom" />
                        <RivetLineSVG className="absolute inset-x-0 bottom-0 h-1.5 w-full" />
                        <RopeBorderSVG className="absolute -bottom-2 left-[10%] h-2 w-[80%] opacity-60" />

                        {/* Under-shelf reflections */}
                        <div className="pointer-events-none absolute inset-x-12 -bottom-4 h-8 rounded-[100%] bg-cyan-500/[0.05] blur-2xl" />
                        <div className="pointer-events-none absolute inset-x-16 -bottom-2 h-5 rounded-[100%] bg-amber-500/[0.03] blur-xl" />
                    </div>
                </motion.div>

                {/* Labels */}
                <div className="mt-10 flex items-center justify-center gap-4">
                    {caseStudies.map((cs) => (
                        <button
                            key={cs.id}
                            onMouseEnter={() => setHovered(cs.id)}
                            onMouseLeave={() => setHovered(null)}
                            className="group flex items-center gap-1.5 text-[9px] uppercase tracking-[0.2em] text-slate-500 transition-colors duration-300 hover:text-white"
                        >
                            <span
                                className="h-1.5 w-1.5 rounded-full transition-all duration-300 group-hover:scale-150"
                                style={{
                                    backgroundColor: cs.primary,
                                    boxShadow:
                                        hovered === cs.id ? `0 0 8px ${cs.primary}` : "none",
                                }}
                            />
                            {cs.client}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}
import React, { useState, useCallback } from "react";
import { ArrowUpRight, Anchor } from "lucide-react";

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
        glow: "rgba(34,211,238,0.2)",
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
        glow: "rgba(245,158,11,0.2)",
        primary: "#f59e0b",
    },
];

/* Static pure-CSS optimizations to bypass heavy inline SVGs */
const SpineTexture = React.memo(() => (
    <div className="pointer-events-none absolute inset-0 h-full w-full opacity-20 mix-blend-overlay">
        <div className="h-full w-full bg-gradient-to-r from-black/40 via-white/10 to-black/40" />
    </div>
));
SpineTexture.displayName = "SpineTexture";

const RopeBorder = React.memo(({ className }) => (
    <div 
        className={`h-[3px] bg-repeat-x opacity-30 ${className}`}
        style={{
            backgroundImage: `radial-gradient(circle, rgba(194,155,97,0.6) 20%, transparent 40%)`,
            backgroundSize: "6px 3px",
        }}
    />
));
RopeBorder.displayName = "RopeBorder";

const RivetLine = React.memo(({ className }) => (
    <div 
        className={`h-[4px] bg-repeat-x opacity-20 ${className}`}
        style={{
            backgroundImage: `radial-gradient(circle, rgba(194,155,97,0.5) 1.5px, transparent 2px)`,
            backgroundSize: "16px 4px",
        }}
    />
));
RivetLine.displayName = "RivetLine";

const MetalBar = React.memo(({ variant = "top" }) => (
    <div 
        className={`h-3 w-full border-t border-b border-black/80 ${
            variant === "top" 
              ? "bg-gradient-to-b from-[#3a2d1d] to-[#1a120a]" 
              : "bg-gradient-to-b from-[#241a10] to-[#0e0a05]"
        }`}
    />
));
MetalBar.displayName = "MetalBar";

/* Highly optimized BookSpine using pure hardware-accelerated CSS classes */
const BookSpine = ({ study, index, hovered, setHovered }) => {
    const h = [250, 270, 260, 280]; // Marginally reduced heights for better mobile ratios
    const w = [65, 75, 62, 78];
    const height = h[index % h.length];
    const width = w[index % w.length];
    
    const isHovered = hovered === study.id;
    const isFaded = hovered !== null && !isHovered;

    // Combined touch support for seamless mobile taps
    const handleTrigger = (e) => {
        e.stopPropagation();
        setHovered(isHovered ? null : study.id);
    };

    return (
        <div
            onMouseEnter={() => setHovered(study.id)}
            onMouseLeave={() => setHovered(null)}
            onClick={handleTrigger}
            className="group relative shrink-0 cursor-pointer select-none transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]"
            style={{ 
                width, 
                height,
                transform: isHovered ? "translateY(-12px) rotate(-0.5deg)" : "translateY(0) rotate(0)",
                opacity: isFaded ? 0.45 : 1,
                willChange: "transform, opacity"
            }}
        >
            {/* Ambient Background Blur */}
            <div
                className={`pointer-events-none absolute -inset-2 rounded-full transition-opacity duration-300 blur-md ${
                    isHovered ? "opacity-100" : "opacity-0"
                }`}
                style={{ background: study.glow }}
            />

            {/* Spine Solid Body */}
            <div
                className="relative h-full w-full overflow-hidden rounded-t-[3px] shadow-[0_4px_12px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.08)]"
                style={{ background: study.spine }}
            >
                <SpineTexture />

                <div className="absolute inset-x-0 top-0 h-[3px]" style={{ background: `linear-gradient(180deg, ${study.spineTop} 0%, rgba(0,0,0,0.3) 100%)` }} />
                <div className="absolute inset-x-0 bottom-0 h-[3px]" style={{ background: `linear-gradient(0deg, ${study.spineBottom} 0%, rgba(0,0,0,0.3) 100%)` }} />

                {/* Vertical title text */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="rotate-180 [writing-mode:vertical-rl]">
                        <span
                            className="whitespace-nowrap text-[9px] font-bold uppercase tracking-[0.25em] text-white/90"
                            style={{ textShadow: "0 1px 2px rgba(0,0,0,0.5)" }}
                        >
                            {study.title}
                        </span>
                    </div>
                </div>

                {/* Hardware-accelerated CSS hover shimmer */}
                <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
            </div>

            {/* Pure CSS Fade-in Preview Card */}
            <div
                className={`pointer-events-none absolute -top-[210px] left-1/2 z-50 w-52 -translate-x-1/2 sm:w-60 transition-all duration-200 ease-out ${
                    isHovered ? "opacity-100 translate-y-0 scale-100 visible" : "opacity-0 translate-y-2 scale-95 invisible"
                }`}
            >
                <div
                    className="overflow-hidden rounded-xl border border-white/15 bg-[#070d15] shadow-2xl"
                    style={{
                        boxShadow: `0 0 20px ${study.glow}, 0 8px 25px rgba(0,0,0,0.6)`,
                    }}
                >
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
                        <img
                            src={study.image}
                            alt={study.title}
                            loading="lazy"
                            decoding="async"
                            className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#070d15] via-transparent to-transparent" />
                    </div>

                    <div className="p-3">
                        <p className="text-[9px] font-semibold uppercase tracking-[0.15em]" style={{ color: study.primary }}>
                            {study.client}
                        </p>
                        <p className="mt-0.5 text-xs font-bold leading-tight text-white">
                            {study.title}
                        </p>

                        <a
                            href={study.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="pointer-events-auto mt-2 inline-flex items-center gap-1 text-[10px] font-bold hover:underline"
                            style={{ color: study.primary }}
                        >
                            Read case study
                            <ArrowUpRight size={10} />
                        </a>
                    </div>

                    <div className="absolute -bottom-1 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rotate-45 border-b border-r border-white/15 bg-[#070d15]" />
                </div>
            </div>
        </div>
    );
};

export default function CaesesCaseStudies() {
    const [hovered, setHovered] = useState(null);

    const closeAll = useCallback(() => setHovered(null), []);

    return (
        <section 
            onClick={closeAll} 
            className="relative overflow-hidden bg-[#05080d] py-10 text-white md:py-16"
        >
            <div className="pointer-events-none absolute left-[20%] top-1/3 h-[250px] w-[250px] rounded-full bg-cyan-500/[0.01] blur-[100px]" />
            <div className="pointer-events-none absolute right-[15%] bottom-1/4 h-[250px] w-[250px] rounded-full bg-amber-500/[0.01] blur-[100px]" />

            <div className="relative mx-auto max-w-[1100px] px-4 sm:px-6">
                {/* Header */}
                <div className="mb-8 md:mb-12">
                    <div className="mb-3 flex items-center gap-2">
                        <span className="h-px w-6 bg-cyan-400/70" />
                        <span className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-[0.2em] text-cyan-400">
                            <Anchor size={10} />
                            Proven In Practice
                        </span>
                    </div>

                    <div className="grid items-end gap-4 lg:grid-cols-[1fr_0.75fr] lg:gap-10">
                        <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl md:text-4xl">
                            Case Studies
                        </h2>
                        <p className="max-w-md text-xs leading-relaxed text-slate-400">
                            How leading maritime engineering teams use CAESES to explore hull forms, optimize hydrodynamics, and deliver performance gains.
                        </p>
                    </div>

                    <div className="mt-6 border-t border-white/[0.05] pt-3 text-right">
                        <span className="text-[9px] uppercase tracking-[0.15em] text-slate-500">
                            Tap a book to preview details
                        </span>
                    </div>
                </div>

                {/* Bookshelf Interface */}
                <div className="relative mx-auto max-w-xl select-none">
                    <div className="pointer-events-none absolute inset-x-6 -bottom-3 h-6 rounded-[100%] bg-black/40 blur-lg" />

                    {/* Top Shelf Metal Trim */}
                    <div className="relative">
                        <MetalBar variant="top" />
                        <RivetLine className="absolute inset-x-0 top-[2px]" />
                        <RopeBorder className="absolute -top-1 left-[15%] w-[70%]" />
                    </div>

                    {/* Shelf Content Core */}
                    <div className="relative flex">
                        <div className="w-2 shrink-0 bg-gradient-to-r from-[#20150d] to-black/40" />

                        <div className="relative flex-1 bg-[#05080d]/80 py-1">
                            <div className="relative flex flex-wrap items-end justify-center gap-1.5 px-4 pb-1 pt-10 sm:gap-2 sm:pt-14">
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

                        <div className="w-2 shrink-0 bg-gradient-to-l from-[#20150d] to-black/40" />
                    </div>

                    {/* Bottom Shelf Metal Trim */}
                    <div className="relative">
                        <MetalBar variant="bottom" />
                        <RivetLine className="absolute inset-x-0 bottom-[2px]" />
                        <RopeBorder className="absolute -bottom-1 left-[15%] w-[70%]" />
                    </div>
                </div>

                {/* Secondary Toggles */}
                <div className="mt-6 flex flex-wrap justify-center gap-4">
                    {caseStudies.map((cs) => (
                        <button
                            key={cs.id}
                            onClick={(e) => {
                                e.stopPropagation();
                                setHovered(hovered === cs.id ? null : cs.id);
                            }}
                            className="flex items-center gap-1.5 text-[8.5px] uppercase tracking-[0.15em] text-slate-500 hover:text-white"
                        >
                            <span
                                className="h-1 w-1 rounded-full transition-transform duration-200"
                                style={{
                                    backgroundColor: cs.primary,
                                    boxShadow: hovered === cs.id ? `0 0 6px ${cs.primary}` : "none",
                                    transform: hovered === cs.id ? "scale(1.25)" : "scale(1)"
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
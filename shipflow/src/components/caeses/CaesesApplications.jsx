import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Compass, Eye, ShieldAlert } from "lucide-react";
import { applications, applicationProducts } from "./application";

const easeCustom = [0.16, 1, 0.3, 1];

function CaesesApplications() {
    const [active, setActive] = useState(0);
    const current = applications[active];

    // Filter products by active category
    const filteredProducts = useMemo(() => {
        return applicationProducts.filter(
            (product) => product.category === current.category
        );
    }, [current.category]);

    return (
        <section className="relative overflow-hidden bg-[#02080d] py-14 text-white md:py-12">

            {/* Premium Cyber Ambient Light Filters */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute right-[-10%] top-1/4 h-[600px] w-[600px] rounded-full bg-cyan-500/[0.025] blur-[140px]" />
                <div className="absolute left-[-5%] top-1/2 h-[500px] w-[500px] rounded-full bg-blue-500/[0.015] blur-[120px]" />

                <div
                    className="absolute inset-0 opacity-[0.08]"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(6, 182, 212, 0.03) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(6, 182, 212, 0.03) 1px, transparent 1px)
                        `,
                        backgroundSize: "60px 60px",
                    }}
                />
            </div>

            <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">

                {/* Header System */}
                <div className="mb-16">
                   

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1, duration: 0.8 }}
                        className="mt-5 max-w-4xl text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-7xl"
                    >
                        Engineered for Every
                        <span className="block bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent">
                            Maritime Challenge.
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15, duration: 0.7 }}
                        className="mt-6 max-w-2xl text-sm md:text-base text-slate-400 leading-relaxed font-light"
                    >
                        Explore how CAESES parametric CAD powers simulation-driven maritime design — generating defect-free geometries optimized directly for target CFD criteria.
                    </motion.p>
                </div>

                {/* Tab Controls */}
                <div className="mb-12 border-b border-white/[0.08]">
                    <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-3 scrollbar-none">
                        {applications.map((item, index) => {
                            const count = applicationProducts.filter(
                                (p) => p.category === item.category
                            ).length;
                            const isActive = active === index;

                            return (
                                <button
                                    key={item.id}
                                    onClick={() => setActive(index)}
                                    className={`
                                        group relative shrink-0 px-4 sm:px-6 py-3.5 text-xs 
                                        font-bold uppercase tracking-[0.18em] transition-all duration-300 rounded-lg
                                        ${isActive 
                                            ? "text-cyan-300 bg-cyan-950/20" 
                                            : "text-slate-500 hover:text-slate-200 hover:bg-white/[0.01]"
                                        }
                                    `}
                                >
                                    <div className="flex items-center gap-2.5">
                                        <span className={`
                                            h-1 w-1 rounded-full transition-all duration-300
                                            ${isActive ? "bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.95)]" : "bg-slate-700"}
                                        `} />
                                        <span>{item.title}</span>
                                        <span className={`
                                            text-[9px] font-semibold px-2 py-0.5 rounded transition-colors
                                            ${isActive 
                                                ? "bg-cyan-500/15 text-cyan-300 border border-cyan-500/25" 
                                                : "bg-white/[0.02] text-slate-600 border border-transparent"
                                            }
                                        `}>
                                            {String(count).padStart(2, "0")}
                                        </span>
                                    </div>

                                    {isActive && (
                                        <motion.div
                                            layoutId="caeses-active-tab"
                                            className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                                            transition={{ type: "spring", stiffness: 450, damping: 35 }}
                                        />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Product Grid — Adaptive 4-Per-Row Layout */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={current.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.4, ease: easeCustom }}
                        // On small viewports: Single row horizontal swipe with 4 items visible
                        // On desktop: Absolute 4-column grid layout
                        className="flex md:grid md:grid-cols-4 gap-4 sm:gap-5 overflow-x-auto md:overflow-visible pb-8 md:pb-0 snap-x snap-mandatory scrollbar-none"
                    >
                        {filteredProducts.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    delay: index * 0.05,
                                    duration: 0.6,
                                    ease: easeCustom,
                                }}
                                whileHover={{ y: -5 }}
                                className="
                                    group relative shrink-0 snap-start w-[290px] sm:w-[330px] md:w-full
                                    overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-b from-[#050e1c] to-[#020712] 
                                    cursor-pointer hover:border-cyan-500/30 transition-all duration-500 
                                    shadow-[0_12px_45px_-12px_rgba(0,0,0,0.7)] hover:shadow-[0_20px_50px_-10px_rgba(6,182,212,0.18)]
                                "
                            >
                                {/* Showcase Canvas Panel */}
                                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#020712]/50">
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        loading="lazy"
                                        onError={(e) => {
                                            e.target.style.opacity = "0.15";
                                            e.target.src = "https://via.placeholder.com/400x300/030b12/06B6D4?text=CAESES+Model";
                                        }}
                                        className="w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-105"
                                    />

                                    {/* Tech Gradient Wash */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#02080d] via-transparent to-transparent pointer-events-none" />

                                 

                                    {/* HUD Ticks */}
                                    <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-cyan-500/20 transition-colors duration-300 group-hover:border-cyan-400/60" />
                                    <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-cyan-500/20 transition-colors duration-300 group-hover:border-cyan-400/60" />
                                    <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-cyan-500/20 transition-colors duration-300 group-hover:border-cyan-400/60" />
                                    <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-cyan-500/20 transition-colors duration-300 group-hover:border-cyan-400/60" />

                                </div>

                                {/* Card Metrics & Title */}
                                <div className="p-5 relative">
                                    <div className="flex items-center gap-1.5">
                                        <span className="h-1 w-1 rounded-full bg-cyan-400 animate-pulse" />
                                        <span className="text-[9px] font-bold tracking-[0.25em] text-cyan-500/80 uppercase">
                                            {product.category}
                                        </span>
                                    </div>

                                    <div className="mt-3.5 flex items-start justify-between gap-3">
                                        <h3 className="text-sm sm:text-base font-bold tracking-wide text-white leading-snug group-hover:text-cyan-200 transition-colors duration-300">
                                            {product.title}
                                        </h3>

                                  
                                    </div>
                                </div>

                                {/* Under-glow Scan Indicator Line */}
                                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-cyan-500 via-sky-400 to-transparent transition-all duration-700 group-hover:w-full" />
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>

                {/* Empty State Exception */}
                {filteredProducts.length === 0 && (
                    <div className="mt-8 py-16 text-center border border-white/[0.05] rounded-2xl bg-[#030e1c]/40 backdrop-blur-md flex flex-col items-center justify-center">
                        <ShieldAlert size={28} className="text-cyan-500/40 mb-3" />
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">
                            No models populated in this division
                        </p>
                    </div>
                )}

                {/* Bottom Analytics & External Links */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.25, duration: 0.8 }}
                    className="mt-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-8 border-t border-white/[0.06]"
                >
                  

                    {current.link && (
                        <a
                            href={current.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cyan-300 hover:text-cyan-100 transition-colors group"
                        >
                            View Full Application
                            <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                    )}
                </motion.div>

            </div>
        </section>
    );
}

export default CaesesApplications;
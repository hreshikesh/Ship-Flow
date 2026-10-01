import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  Zap,
  X,
  CheckCircle2,
  Cpu,
  Layers,
  Globe,
  Sliders,
  RotateCcw
} from "lucide-react";
import DepthCarousel from "./DepthCarousel";
import hero1 from "../../../../assets/images/shipflow/hero/hero1.webp";
import hero2 from "../../../../assets/images/shipflow/hero/hero2.webp";
import hero3 from "../../../../assets/images/shipflow/hero/hero3.webp";
import hero4 from "../../../../assets/images/shipflow/hero/hero4.webp";

const carouselItems = [
  { image: hero1, alt: "Resistance & Propulsion" },
  { image: hero2, alt: "Hull Form Optimization" },
  { image: hero3, alt: "Seakeeping Analysis" },
  { image: hero4, alt: "Shipflow" }
];

const ShipflowHero = ({ image }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-[#03080d] text-white flex flex-col justify-center">

      {/* ================= BACKGROUND ================= */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <img
          src={image}
          alt="ShipFlow marine CFD"
          className="h-full w-full object-contain object-center opacity-35"
        />
      </motion.div>

      {/* Cinematic Overlays */}
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#02070b]/95 via-[#02070b]/80 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[35%] bg-gradient-to-t from-[#03080d] via-[#03080d]/70 to-transparent" />

      {/* ================= HERO MAIN CONTENT ================= */}
      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1400px] flex-col lg:flex-row lg:items-center px-5 pt-28 pb-12 md:px-10 lg:py-0">
        
        {/* LEFT COLUMN */}
        <div className="w-full lg:w-[52%] lg:pr-8 xl:pr-12 flex flex-col justify-center">
          
          {/* Eyebrow Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-3 flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-300 md:text-xs"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-2.5 py-0.5 text-[10px] text-cyan-300 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400"></span>
              </span>
              RELEASE 9.0
            </span>
            <span className="text-white/30">•</span>
            <span className="text-slate-300">FLOWTECH INTERNATIONAL AB</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(2.2rem,3.8vw,3.8rem)] font-bold leading-[1.05] tracking-[-0.03em]"
          >
            ShipFlow <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-white via-cyan-100 to-cyan-300 bg-clip-text text-transparent">
              Next-Gen Marine CFD
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="mt-3.5 max-w-[520px] text-xs sm:text-sm leading-relaxed text-slate-300/90"
          >
            Dedicated CFD software developed by naval architects. Specialized for resistance, propulsion, manoeuvring, and seakeeping predictions to optimize modern hull forms and energy-saving devices.
          </motion.p>

          {/* ================= CREATIVE BENCHMARK STRIP ================= */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.7 }}
            className="mt-5 max-w-[520px] rounded-xl border border-cyan-500/25 bg-cyan-950/20 p-2.5 backdrop-blur-md"
          >
            <div className="flex items-center justify-between px-1 mb-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
                <Zap className="h-3 w-3 text-cyan-400" /> SHIPFLOW 9.0 Performance Speedups
              </span>
              <span className="text-[9px] text-slate-400">(16 Cores)</span>
            </div>

            {/* Micro Ticker Grid */}
            <div className="grid grid-cols-4 gap-1.5 text-center">
              <div className="rounded-lg bg-black/40 border border-white/5 py-1.5 px-1">
                <span className="block text-xs font-extrabold text-cyan-300">10×</span>
                <span className="block text-[8px] uppercase tracking-tight text-slate-400">RANS VOF</span>
              </div>
              <div className="rounded-lg bg-black/40 border border-white/5 py-1.5 px-1">
                <span className="block text-xs font-extrabold text-cyan-300">10×</span>
                <span className="block text-[8px] uppercase tracking-tight text-slate-400">MOTIONS</span>
              </div>
              <div className="rounded-lg bg-black/40 border border-white/5 py-1.5 px-1">
                <span className="block text-xs font-extrabold text-cyan-300">6×</span>
                <span className="block text-[8px] uppercase tracking-tight text-slate-400">XPAN</span>
              </div>
              <div className="rounded-lg bg-black/40 border border-white/5 py-1.5 px-1">
                <span className="block text-xs font-extrabold text-cyan-300">5×</span>
                <span className="block text-[8px] uppercase tracking-tight text-slate-400">RANS Grid</span>
              </div>
            </div>
          </motion.div>

          {/* ================= ACTION BUTTONS ================= */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
            className="mt-6 flex flex-wrap items-center gap-3"
          >
            {/* Primary Action */}
            <button
              onClick={scrollToNext}
              className="
                group
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-cyan-400/40
                bg-cyan-500/20
                px-5
                py-3
                text-xs
                font-semibold
                uppercase
                tracking-wider
                text-cyan-100
                backdrop-blur-md
                transition-all
                duration-300
                hover:border-cyan-300
                hover:bg-cyan-400/30
                hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]
              "
            >
              Explore Capabilities
              <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            {/* Release 9.0 Feature Trigger */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-white/10
                bg-white/5
                px-4
                py-3
                text-xs
                font-medium
                text-slate-200
                backdrop-blur-md
                transition-all
                duration-300
                hover:border-cyan-400/40
                hover:bg-cyan-950/30
                hover:text-cyan-200
              "
            >
              
              <span>What's New in 9.0</span>
            </button>
          </motion.div>

        </div>

        {/* RIGHT COLUMN: Depth Carousel */}
        <motion.div 
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ delay: 0.8, duration: 1 }}
          className="relative mt-8 h-[320px] w-full sm:h-[420px] lg:mt-0 lg:h-[560px] lg:w-[48%]"
        >
          {/* Faded glow behind carousel */}
          <div className="absolute left-1/2 top-1/2 -z-10 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[80px]" />
          
          <DepthCarousel
            items={carouselItems}
            cardWidth={300}
            cardHeight={390}
            depth={200}
            spread={75}
            tilt={20}
            tiltDirection="left"
            perspective={1200}
            visibleCards={3}
            autoplay={true}
            autoplayDelay={3500}
            showIndicators={false}
          />
        </motion.div>

      </div>

      {/* ================= BOTTOM METADATA ================= */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="
          absolute bottom-5 left-5 z-20 flex items-center gap-2 text-[8px] font-bold uppercase tracking-[0.2em] text-white/40 md:left-10 md:text-[9px]
        "
      >
        <span>FLOWTECH INTERNATIONAL AB</span>
        <span className="text-white/20">•</span>
        <span>SWEDEN</span>
      </motion.div>

      {/* Scroll Hint */}
      <motion.button
        onClick={scrollToNext}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="
          absolute bottom-5 right-5 z-20 hidden items-center gap-2.5 text-[8px] font-bold uppercase tracking-[0.2em] text-cyan-400/70 transition-colors hover:text-cyan-300 md:flex md:right-10
        "
      >
        <span>SCROLL TO EXPLORE</span>
        <motion.span
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={14} />
        </motion.span>
      </motion.button>

      {/* ================= SHIPFLOW 9.0 RELEASE MODAL ================= */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="
                relative
                z-10
                max-h-[85vh]
                w-full
                max-w-2xl
                overflow-y-auto
                rounded-2xl
                border
                border-cyan-500/30
                bg-[#07131e]/95
                p-6
                text-white
                shadow-[0_0_50px_rgba(6,182,212,0.25)]
              "
            >
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute right-4 top-4 rounded-full p-2 text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>

              {/* Header */}
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-widest">
               Official Announcement
              </div>
              <h2 className="mt-1 text-2xl font-bold text-white">
                SHIPFLOW 9.0 Available Now
              </h2>
              <p className="mt-2 text-xs leading-relaxed text-slate-300">
                This release brings major performance improvements, new modelling capabilities, an updated working environment across all SHIPFLOW modules, and multi-language documentation.
              </p>

              {/* Benchmarks Breakdown */}
              <div className="mt-5 rounded-xl border border-cyan-500/20 bg-cyan-950/30 p-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5 mb-3">
                  <Zap size={14} /> Measured Performance Gains (16 Cores)
                </h4>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 text-center">
                  <div className="rounded-lg bg-black/40 border border-white/5 p-2">
                    <span className="block text-lg font-bold text-cyan-300">10×</span>
                    <span className="text-[10px] text-slate-400">RANS VOF</span>
                  </div>
                  <div className="rounded-lg bg-black/40 border border-white/5 p-2">
                    <span className="block text-lg font-bold text-cyan-300">10×</span>
                    <span className="text-[10px] text-slate-400">MOTIONS</span>
                  </div>
                  <div className="rounded-lg bg-black/40 border border-white/5 p-2">
                    <span className="block text-lg font-bold text-cyan-300">6×</span>
                    <span className="text-[10px] text-slate-400">XPAN</span>
                  </div>
                  <div className="rounded-lg bg-black/40 border border-white/5 p-2">
                    <span className="block text-lg font-bold text-cyan-300">5×</span>
                    <span className="text-[10px] text-slate-400">RANS Grid</span>
                  </div>
                </div>
              </div>

              {/* Feature Bullet Grid */}
              <div className="mt-5 space-y-3 text-xs text-slate-300">
                <div className="flex items-start gap-3">
                  <Cpu className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" />
                  <div>
                    <strong className="text-white">SHIPFLOW Workbench:</strong> Replaces Notepad++ with an integrated environment for configuration editing, running simulations, monitoring output, and viewing reports.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Layers className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" />
                  <div>
                    <strong className="text-white">Improved RANS VOF Solver:</strong> Enhanced convergence and free-surface treatment, including transom ventilation and overlapping-grid interfaces.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <RotateCcw className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" />
                  <div>
                    <strong className="text-white">Stop & Save:</strong> Allows RANS and MOTIONS simulations to be stopped cleanly and saved for subsequent restart.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Sliders className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" />
                  <div>
                    <strong className="text-white">Appendage Grids & Propeller Model:</strong> Extended options for rudders, ducts, and fins with a new panel-method propeller model.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Globe className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" />
                  <div>
                    <strong className="text-white">Multilingual Documentation:</strong> Integrated documentation is now available in English, Chinese, Japanese, and Korean.
                  </div>
                </div>
              </div>

              {/* Footer Modal Action */}
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-full bg-cyan-500/20 border border-cyan-400/30 px-5 py-2 text-xs font-semibold text-cyan-200 hover:bg-cyan-400/30 transition-colors"
                >
                  Close Overview
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default ShipflowHero;
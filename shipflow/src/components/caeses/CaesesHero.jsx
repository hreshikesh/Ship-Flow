// CaesesHero.jsx
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SoftAurora from "./SoftAurora";

const CAESES_URL = "https://www.caeses.com/applications/maritime";
const YOUTUBE_VIDEO_URL = "https://www.youtube.com/embed/O1wSnnim6gs?rel=0&modestbranding=1&playsinline=1";

const easeCustom = [0.16, 1, 0.3, 1];

function CaesesHero() {
  return (
    <section className="relative min-h-[92vh] lg:min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#020712] px-4 py-20 sm:px-6 lg:px-12 z-10">
      
      {/* 🌌 DYNAMIC AURORA BACKGROUND */}
      <SoftAurora
        speed={0.4}
        scale={1.1}
        brightness={0.8}
        color1="#06B6D4" // Bright Cyan
        color2="#0284C7" // Oceanic Sky Blue
        noiseFrequency={2.0}
        noiseAmplitude={0.9}
        bandHeight={0.4}
        bandSpread={1.1}
        octaveDecay={0.12}
        layerOffset={0.5}
        colorSpeed={0.8}
        enableMouseInteraction={true}
        mouseInfluence={0.15}
      />

      {/* 🌐 CYBERNETIC GRID OVERLAYS */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_100%)] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#020712]/90 via-transparent to-[#020712] pointer-events-none" />

      <div className="relative w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center z-20">

        {/* ==================== LEFT COLUMN: CONTENT ==================== */}
        <motion.div
          className="lg:col-span-6 flex flex-col items-start space-y-6 text-left"
          initial={{ opacity: 0, x: -35 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: easeCustom }}
        >
          {/* Eyebrow Badge */}
        

          {/* Headline */}
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.8 }}
          >
            Design and Optimization
            <span className="block mt-1 bg-gradient-to-r from-cyan-400 via-sky-300 to-sky-500 bg-clip-text text-transparent">
              of Maritime Systems
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-slate-400 text-sm sm:text-base max-w-xl leading-relaxed font-light"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
          >
            Decrease fuel consumption, reduce operational downtime, and maximize hydro-mechanical efficiency under dynamic ocean scenarios using automated CAESES pipelines.
          </motion.p>

          {/* Call to Action Button */}
          {/* <motion.a
            href={CAESES_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-cyan-500/10 via-cyan-500/5 to-transparent hover:from-cyan-500/20 hover:via-cyan-500/10 border border-cyan-400/20 hover:border-cyan-400/50 rounded-full text-cyan-200 hover:text-white text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-[0_4px_20px_rgba(6,182,212,0.05)] hover:shadow-[0_4px_30px_rgba(6,182,212,0.15)] backdrop-blur-sm"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
          >
            Explore CAESES
            <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.a> */}
        </motion.div>


        {/* ==================== RIGHT COLUMN: VIDEO HUD ==================== */}
        <motion.div
          className="lg:col-span-6 w-full flex flex-col justify-center relative"
          initial={{ opacity: 0, scale: 0.94, x: 35 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.9, ease: easeCustom }}
        >
          {/* Ambient Outer Halo behind video player */}
          <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/15 to-transparent blur-3xl rounded-3xl pointer-events-none" />

          {/* HUD Top Status Header */}
         

          {/* Glass-cybernetic Frame Wrapper */}
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-[#030d1d]/80 border border-white/[0.08] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] backdrop-blur-md hover:border-cyan-500/35 transition-all duration-500 group">
            
            {/* Corner Bracket Accents */}
            <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-cyan-400/40 pointer-events-none transition-colors duration-300 group-hover:border-cyan-400" />
            <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-cyan-400/40 pointer-events-none transition-colors duration-300 group-hover:border-cyan-400" />
            <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-cyan-400/40 pointer-events-none transition-colors duration-300 group-hover:border-cyan-400" />
            <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-cyan-400/40 pointer-events-none transition-colors duration-300 group-hover:border-cyan-400" />

            <iframe
              src={YOUTUBE_VIDEO_URL}
              title="CAESES Maritime Engineering Showcase"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
              className="w-full h-full border-none block z-10 relative"
            />
          </div>

          {/* Floating HUD Link badge */}
          <motion.a
            href={CAESES_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute -right-3 -bottom-5 z-20 flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#030e1c]/90 border border-cyan-500/30 text-cyan-200 hover:text-white hover:border-cyan-400 hover:bg-cyan-600 text-[10px] font-bold uppercase tracking-widest backdrop-blur-md shadow-2xl transition-all duration-300 hover:-translate-y-0.5"
            animate={{ y: [0, -6, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <span>Visit CAESES</span>
            <ArrowUpRight size={13} />
          </motion.a>
        </motion.div>

      </div>

      {/* BOTTOM METRIC TRANSITION DECO BAR */}
      <div className="absolute bottom-8 left-0 right-0 w-full flex items-center justify-between px-6 sm:px-12 text-[11px] font-bold tracking-[0.25em] text-slate-600 pointer-events-none z-20 select-none">
        <span>02</span>
        <div className="flex-grow h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent mx-6" />
        <span className="text-cyan-500/40 uppercase">CAESES INTERFACES</span>
      </div>

    </section>
  );
}

export default CaesesHero;
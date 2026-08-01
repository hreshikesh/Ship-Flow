import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useArrivalState, setArrivalState } from "./arrivalStore";

const SYSTEMS = [
  { id: "core", label: "Core Kernel", verb: "Linking" },
  { id: "hydro", label: "Hydrodynamic Mesh", verb: "Calibrating" },
  { id: "telemetry", label: "AIS Telemetry Feed", verb: "Syncing" },
  { id: "radar", label: "Bathymetric Radar", verb: "Mapping" },
  { id: "cfd", label: "CFD Solver Engine", verb: "Warming Up" },
  { id: "geometry", label: "Hull Geometry Loader", verb: "Parsing" },
  { id: "ui", label: "Command Interface", verb: "Initializing" },
];

const TOTAL_DURATION = 10000; // 10 seconds
const EXIT_DELAY = 500;

export default function ShipflowLoader() {
  const { loaderDone } = useArrivalState();
  const [forceHidden, setForceHidden] = useState(false);
  const [internalProgress, setInternalProgress] = useState(0);
  const canvasRef = useRef(null);

  // Smooth loading progression over 10 seconds
  useEffect(() => {
    const startTime = performance.now();
    let rafId;

    const updateProgress = (currentTime) => {
      const elapsed = currentTime - startTime;
      const rawPct = (elapsed / TOTAL_DURATION) * 100;

      // Ease-out for smoother progression
      const eased = Math.min(100, rawPct);
      setInternalProgress(Math.floor(eased));

      if (eased < 100) {
        rafId = requestAnimationFrame(updateProgress);
      }
    };

    rafId = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // Trigger completion after 10s + exit delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setForceHidden(true);
      setArrivalState({
        loaderDone: true,
        phase: "brand",
      });
    }, TOTAL_DURATION + EXIT_DELAY);

    return () => clearTimeout(timer);
  }, []);

  // CFD Streamlines background canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let width = 0;
    let height = 0;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const COUNT = 120;
    const particles = [];
    for (let i = 0; i < COUNT; i++) {
      particles.push({
        x: Math.random() * width,
        y: height * (0.1 + Math.random() * 0.8),
        speed: 0.3 + Math.random() * 1.2,
        length: 15 + Math.random() * 25,
        opacity: 0.15 + Math.random() * 0.35,
      });
    }

    const draw = () => {
      ctx.fillStyle = "rgba(4, 7, 13, 0.15)";
      ctx.fillRect(0, 0, width, height);

      for (const p of particles) {
        p.x += p.speed;
        if (p.x > width + 30) p.x = -30;

        ctx.strokeStyle = `rgba(127, 216, 229, ${p.opacity})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(p.x - p.length, p.y);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const progress = internalProgress;
  const visible = !loaderDone && !forceHidden;

  // Calculate segment progress (100 / 7 systems = ~14.28 per system)
  const segmentSize = 100 / SYSTEMS.length;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#02070d] text-[#C9D6DF] overflow-hidden font-mono"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Blueprint Grid */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(127,216,229,0.05) 1px, transparent 1px)," +
                "linear-gradient(90deg, rgba(127,216,229,0.05) 1px, transparent 1px)",
              backgroundSize: "56px 56px",
            }}
          />

          {/* CFD Streamlines Canvas */}
          <canvas
            ref={canvasRef}
            aria-hidden
            className="pointer-events-none absolute inset-0 h-full w-full"
          />

          {/* Central Horizon Line */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 z-10 h-px w-[72vw] max-w-[850px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-[#7fd8e5]/70 to-transparent shadow-[0_0_14px_rgba(127,216,229,0.5)]"
          />

          {/* Corner Brackets */}
          <div aria-hidden className="pointer-events-none absolute inset-6">
            <div className="absolute left-0 top-0 h-8 w-8 border-l-2 border-t-2 border-[#7fd8e5]/40" />
            <div className="absolute right-0 top-0 h-8 w-8 border-r-2 border-t-2 border-[#7fd8e5]/40" />
            <div className="absolute left-0 bottom-0 h-8 w-8 border-l-2 border-b-2 border-[#7fd8e5]/40" />
            <div className="absolute right-0 bottom-0 h-8 w-8 border-r-2 border-b-2 border-[#7fd8e5]/40" />
          </div>

          {/* Main HUD Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative z-20 w-[min(560px,90vw)] p-6 sm:p-8 rounded-lg border border-[#7fd8e5]/20 bg-[#04070d]/85 backdrop-blur-md shadow-2xl"
          >
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-[#7fd8e5] shadow-[0_0_16px_rgba(127,216,229,0.95)] animate-pulse" />
                <span className="text-xs font-bold tracking-[0.35em] text-white sm:tracking-[0.4em]">
                  SHIPFLOW <span className="text-[#7fd8e5] font-normal">/ ENGINE</span>
                </span>
              </div>
              <motion.span 
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-[9px] tracking-[0.25em] text-[#C9D6DF]/50 sm:text-[10px] sm:tracking-[0.3em]"
              >
                NORTH ATLANTIC
              </motion.span>
            </div>

            {/* Subtitle */}
            <div className="mb-6 space-y-3">
              <p className="text-xs uppercase tracking-[0.2em] text-[#7fd8e5]">
                Initializing Maritime Intelligence...
              </p>

              {/* System Log Feed */}
              <div className="space-y-2 border-l border-[#7fd8e5]/20 pl-3">
                {SYSTEMS.map((sys, idx) => {
                  const threshold = (idx + 1) * segmentSize;
                  const isLoading = progress >= idx * segmentSize && progress < threshold;
                  const isReady = progress >= threshold;
                  
                  return (
                    <motion.div
                      key={sys.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-center justify-between text-[10px] tracking-[0.18em] sm:text-[11px] sm:tracking-[0.2em]"
                    >
                      <span className={
                        isReady 
                          ? "text-[#C9D6DF]" 
                          : isLoading 
                          ? "text-[#C9D6DF]/80" 
                          : "text-[#C9D6DF]/30"
                      }>
                        {sys.label}
                      </span>
                      
                      <div className="flex items-center gap-2">
                        {isLoading && (
                          <motion.span
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ repeat: Infinity, duration: 1 }}
                            className="h-1 w-1 rounded-full bg-[#7fd8e5]"
                          />
                        )}
                        <span className={
                          isReady 
                            ? "text-[#7fd8e5]" 
                            : isLoading
                            ? "text-[#7fd8e5]/70"
                            : "text-white/25"
                        }>
                          {isReady ? "READY" : isLoading ? `${sys.verb}...` : sys.verb}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#7fd8e5] to-[#38BDF8] shadow-[0_0_12px_rgba(127,216,229,0.85)]"
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "linear", duration: 0.1 }}
                />
              </div>

              <div className="flex items-center justify-between text-[10px] tracking-[0.25em] text-white/50 sm:text-[11px] sm:tracking-[0.3em]">
                <span className="tabular-nums">{progress.toString().padStart(3, "0")}%</span>
                <span>
                  {progress >= 100 
                    ? "Entering Simulation..." 
                    : progress >= 80
                    ? "Finalizing"
                    : progress >= 50
                    ? "Loading Systems"
                    : progress >= 25
                    ? "Establishing Link"
                    : "Loading"}
                </span>
              </div>
            </div>

            {/* Bottom Metadata */}
            <div className="mt-6 pt-4 border-t border-[#7fd8e5]/10 flex items-center justify-between text-[9px] tracking-[0.2em] text-[#C9D6DF]/40">
              <span>v7.0.2</span>
              <span>SHIPFLOW © FLOWTECH</span>
              <span>SECURE</span>
            </div>
          </motion.div>

          {/* Bottom Status Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 text-[9px] tracking-[0.3em] text-[#7fd8e5]/60 sm:text-[10px]"
          >
            <div className="flex items-center gap-2">
              <div className="h-1 w-1 rounded-full bg-green-400 animate-pulse" />
              <span>SYSTEM ONLINE</span>
            </div>
            <span className="text-white/20">|</span>
            <span>ENCRYPTED CHANNEL</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
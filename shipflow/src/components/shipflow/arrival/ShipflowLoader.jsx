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

const TOTAL_DURATION = 10000;
const EXIT_DELAY = 400;

export default function ShipflowLoader() {
  const { loaderDone } = useArrivalState();
  const [forceHidden, setForceHidden] = useState(false);
  const [progress, setProgress] = useState(0);
  const canvasRef = useRef(null);

  useEffect(() => {
    const startTime = performance.now();
    let rafId;

    const updateProgress = (currentTime) => {
      const elapsed = currentTime - startTime;
      const pct = Math.min(100, (elapsed / TOTAL_DURATION) * 100);
      setProgress(Math.floor(pct));

      if (pct < 100) {
        rafId = requestAnimationFrame(updateProgress);
      }
    };

    rafId = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(rafId);
  }, []);

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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let width = 0;
    let height = 0;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const COUNT = 60;
    const particles = [];
    for (let i = 0; i < COUNT; i++) {
      particles.push({
        x: Math.random() * width,
        y: height * (0.15 + Math.random() * 0.7),
        speed: 0.4 + Math.random() * 0.9,
        length: 15 + Math.random() * 20,
        opacity: 0.15 + Math.random() * 0.3,
      });
    }

    const draw = () => {
      ctx.fillStyle = "rgba(4, 7, 13, 0.2)";
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

  const visible = !loaderDone && !forceHidden;
  const segmentSize = 100 / SYSTEMS.length;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#02070d] text-[#C9D6DF] overflow-hidden font-mono"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
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

          <canvas
            ref={canvasRef}
            aria-hidden
            className="pointer-events-none absolute inset-0 h-full w-full"
          />

          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 z-10 h-px w-[72vw] max-w-[850px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-[#7fd8e5]/70 to-transparent shadow-[0_0_14px_rgba(127,216,229,0.5)]"
          />

          <div aria-hidden className="pointer-events-none absolute inset-4 sm:inset-6">
            <div className="absolute left-0 top-0 h-6 w-6 sm:h-8 sm:w-8 border-l-2 border-t-2 border-[#7fd8e5]/40" />
            <div className="absolute right-0 top-0 h-6 w-6 sm:h-8 sm:w-8 border-r-2 border-t-2 border-[#7fd8e5]/40" />
            <div className="absolute left-0 bottom-0 h-6 w-6 sm:h-8 sm:w-8 border-l-2 border-b-2 border-[#7fd8e5]/40" />
            <div className="absolute right-0 bottom-0 h-6 w-6 sm:h-8 sm:w-8 border-r-2 border-b-2 border-[#7fd8e5]/40" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative z-20 w-[min(560px,92vw)] p-5 sm:p-6 md:p-8 rounded-lg border border-[#7fd8e5]/20 bg-[#04070d]/85 backdrop-blur-md shadow-2xl"
          >
            <div className="mb-5 flex items-center justify-between sm:mb-6">
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="h-2 w-2 rounded-full bg-[#7fd8e5] shadow-[0_0_16px_rgba(127,216,229,0.95)] animate-pulse" />
                <span className="text-[10px] font-bold tracking-[0.3em] text-white sm:text-xs sm:tracking-[0.4em]">
                  SHIPFLOW <span className="text-[#7fd8e5] font-normal">/ ENGINE</span>
                </span>
              </div>
              <motion.span
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-[8px] tracking-[0.2em] text-[#C9D6DF]/50 sm:text-[10px] sm:tracking-[0.3em]"
              >
                NORTH ATLANTIC
              </motion.span>
            </div>

            <div className="mb-5 space-y-3 sm:mb-6">
              <p className="text-[10px] uppercase tracking-[0.18em] text-[#7fd8e5] sm:text-xs sm:tracking-[0.2em]">
                Initializing Maritime Intelligence...
              </p>

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
                      transition={{ delay: idx * 0.08 }}
                      className="flex items-center justify-between text-[9px] tracking-[0.15em] sm:text-[11px] sm:tracking-[0.2em]"
                    >
                      <span className={isReady ? "text-[#C9D6DF]" : isLoading ? "text-[#C9D6DF]/80" : "text-[#C9D6DF]/30"}>
                        {sys.label}
                      </span>

                      <div className="flex items-center gap-1.5 sm:gap-2">
                        {isLoading && (
                          <motion.span
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ repeat: Infinity, duration: 1 }}
                            className="h-1 w-1 rounded-full bg-[#7fd8e5]"
                          />
                        )}
                        <span className={isReady ? "text-[#7fd8e5]" : isLoading ? "text-[#7fd8e5]/70" : "text-white/25"}>
                          {isReady ? "READY" : isLoading ? `${sys.verb}...` : sys.verb}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2">
              <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#7fd8e5] to-[#38BDF8] shadow-[0_0_12px_rgba(127,216,229,0.85)]"
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "linear", duration: 0.1 }}
                />
              </div>

              <div className="flex items-center justify-between text-[9px] tracking-[0.2em] text-white/50 sm:text-[11px] sm:tracking-[0.3em]">
                <span className="tabular-nums">{progress.toString().padStart(3, "0")}%</span>
                <span className="text-right">
                  {progress >= 100 ? "Entering..." : progress >= 80 ? "Finalizing" : progress >= 50 ? "Loading" : "Initializing"}
                </span>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-[#7fd8e5]/10 flex items-center justify-between text-[8px] tracking-[0.15em] text-[#C9D6DF]/40 sm:mt-6 sm:text-[9px] sm:tracking-[0.2em]">
              <span>v7.0.2</span>
              <span className="hidden sm:inline">SHIPFLOW © FLOWTECH</span>
              <span>SECURE</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
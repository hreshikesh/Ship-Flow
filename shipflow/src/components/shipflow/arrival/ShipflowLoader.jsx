// src/components/shipflow/arrival/ShipflowLoader.jsx
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { setArrivalState } from "./arrivalStore";
import logo from "../../../assets/images/logo/logo1.webp";

const SYSTEMS = [
  { id: "core", label: "SandebTech Core", verb: "Connecting" },
  { id: "marine", label: "Marine Engineering Engine", verb: "Initializing" },
  { id: "hydro", label: "Hydrodynamic Analysis", verb: "Calibrating" },
  { id: "cfd", label: "CFD Simulation Engine", verb: "Warming Up" },
  { id: "hull", label: "Hull Geometry System", verb: "Parsing" },
  { id: "flow", label: "Flow Analysis Network", verb: "Synchronizing" },
  { id: "caeses", label: "CAESES Optimization", verb: "Loading" },
  { id: "interface", label: "Command Interface", verb: "Initializing" },
];

const TOTAL_DURATION = 2800; // 🚀 Reduced from 10000ms (10s) to 2.8s for fast loading
const EXIT_DURATION = 500;
const EXIT_DELAY = 200;

export default function ShipflowLoader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const canvasRef = useRef(null);

  /* PROGRESS COUNTER */
  useEffect(() => {
    const start = performance.now();
    let animationFrame;

    const update = (time) => {
      const elapsed = time - start;
      const percentage = Math.min(100, (elapsed / TOTAL_DURATION) * 100);
      setProgress(Math.floor(percentage));

      if (percentage < 100) {
        animationFrame = requestAnimationFrame(update);
      }
    };

    animationFrame = requestAnimationFrame(update);

    // Fallback safety timer
    const safetyTimer = setTimeout(() => {
      setProgress(100);
    }, TOTAL_DURATION + 500);

    return () => {
      cancelAnimationFrame(animationFrame);
      clearTimeout(safetyTimer);
    };
  }, []);

  /* EXIT SEQUENCE */
  useEffect(() => {
    if (progress < 100) return;

    const timer = setTimeout(() => {
      setVisible(false);

      setTimeout(() => {
        setArrivalState({
          loaderDone: true,
          phase: "brand",
        });
        onComplete?.();
      }, EXIT_DURATION);
    }, EXIT_DELAY);

    return () => clearTimeout(timer);
  }, [progress, onComplete]);

  /* FLOW PARTICLES CANVAS */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrame;
    let width = 0;
    let height = 0;
    const particles = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const COUNT = Math.min(60, Math.max(30, Math.floor(width / 20)));

    for (let i = 0; i < COUNT; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        speed: 0.25 + Math.random() * 0.9,
        length: 8 + Math.random() * 30,
        opacity: 0.08 + Math.random() * 0.25,
        thickness: 0.5 + Math.random(),
      });
    }

    const draw = () => {
      ctx.fillStyle = "rgba(2, 7, 13, 0.20)";
      ctx.fillRect(0, 0, width, height);

      particles.forEach((particle) => {
        particle.x += particle.speed;

        if (particle.x > width + 50) {
          particle.x = -50;
          particle.y = Math.random() * height;
        }

        ctx.beginPath();
        ctx.strokeStyle = `rgba(127, 216, 229, ${particle.opacity})`;
        ctx.lineWidth = particle.thickness;
        ctx.moveTo(particle.x - particle.length, particle.y);
        ctx.lineTo(particle.x, particle.y);
        ctx.stroke();
      });

      animationFrame = requestAnimationFrame(draw);
    };

    animationFrame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const segmentSize = 100 / SYSTEMS.length;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#02070d] p-4 font-mono text-white sm:p-6"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: EXIT_DURATION / 1000,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {/* BACKGROUND GRID */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.28]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(127,216,229,0.045) 1px, transparent 1px),
                linear-gradient(90deg, rgba(127,216,229,0.045) 1px, transparent 1px)
              `,
              backgroundSize: "56px 56px",
            }}
          />

          {/* PARTICLE CANVAS */}
          <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full"
          />

          {/* CENTER FLOW LINE */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 z-10 h-px w-[75vw] max-w-[900px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent"
            style={{ boxShadow: "0 0 18px rgba(127,216,229,0.45)" }}
          />

          {/* CORNER HUD */}
          <div aria-hidden className="pointer-events-none absolute inset-3 sm:inset-7">
            <div className="absolute left-0 top-0 h-5 w-5 border-l border-t border-cyan-300/40 sm:h-7 sm:w-7" />
            <div className="absolute right-0 top-0 h-5 w-5 border-r border-t border-cyan-300/40 sm:h-7 sm:w-7" />
            <div className="absolute bottom-0 left-0 h-5 w-5 border-b border-l border-cyan-300/40 sm:h-7 sm:w-7" />
            <div className="absolute bottom-0 right-0 h-5 w-5 border-b border-r border-cyan-300/40 sm:h-7 sm:w-7" />
          </div>

          {/* LOADER PANEL */}
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="my-auto relative z-20 w-full max-w-[580px] rounded-xl border border-cyan-300/15 bg-[#04070d]/90 p-4 shadow-2xl backdrop-blur-xl sm:p-7"
          >
            {/* BRAND HEADER */}
            <div className="mb-5 flex items-center justify-between gap-3 sm:mb-7">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-9 shrink-0 items-center justify-center sm:h-10">
                  <img
                    src={logo}
                    alt="Shipflow Engine"
                    className="h-7 w-auto object-contain filter drop-shadow-[0_0_8px_rgba(127,216,229,0.35)] sm:h-9"
                  />
                </div>

                <div className="min-w-0">
                  <div className="truncate text-[9px] font-bold tracking-[0.25em] text-white sm:text-xs sm:tracking-[0.35em]">
                    SANDEBTECH <span className="font-normal text-cyan-300">/ MARINE</span>
                  </div>
                </div>
              </div>

              <motion.span
                animate={{ opacity: [0.35, 1, 0.35] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="shrink-0 text-[7px] tracking-[0.2em] text-cyan-200/50 sm:text-[10px] sm:tracking-[0.25em]"
              >
                NORTH ATLANTIC
              </motion.span>
            </div>

            {/* TITLE */}
            <div className="mb-5 sm:mb-6">
              <p className="text-[9px] uppercase tracking-[0.18em] text-cyan-300 sm:text-xs sm:tracking-[0.2em]">
                Initializing Maritime Intelligence
              </p>
            </div>

            {/* SYSTEM LIST */}
            <div className="mb-5 max-h-[35vh] space-y-2 overflow-y-auto border-l border-cyan-300/15 pl-2.5 sm:mb-7 sm:max-h-none sm:space-y-2.5 sm:pl-3">
              {SYSTEMS.map((system, index) => {
                const start = index * segmentSize;
                const end = (index + 1) * segmentSize;
                const loading = progress >= start && progress < end;
                const ready = progress >= end;

                return (
                  <motion.div
                    key={system.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.04 }}
                    className="flex items-center justify-between gap-3 text-[8px] tracking-[0.12em] sm:gap-4 sm:text-[10px] sm:tracking-[0.18em]"
                  >
                    <span
                      className={
                        ready
                          ? "truncate text-slate-300"
                          : loading
                          ? "truncate text-slate-300/80"
                          : "truncate text-white/25"
                      }
                    >
                      {system.label}
                    </span>

                    <div className="flex shrink-0 items-center gap-2">
                      {loading && (
                        <motion.span
                          animate={{ opacity: [0.25, 1, 0.25] }}
                          transition={{ duration: 1, repeat: Infinity }}
                          className="h-1.5 w-1.5 rounded-full bg-cyan-300"
                        />
                      )}

                      <span
                        className={
                          ready
                            ? "text-cyan-300"
                            : loading
                            ? "text-cyan-300/70"
                            : "text-white/20"
                        }
                      >
                        {ready ? "READY" : loading ? `${system.verb}...` : system.verb}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* PROGRESS BAR */}
            <div className="space-y-1.5 sm:space-y-2">
              <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-500"
                  style={{
                    width: `${progress}%`,
                    boxShadow: "0 0 14px rgba(34,211,238,0.8)",
                  }}
                />
              </div>

              <div className="flex items-center justify-between text-[8px] tracking-[0.18em] text-white/40 sm:text-[10px] sm:tracking-[0.2em]">
                <span className="tabular-nums">
                  {progress.toString().padStart(3, "0")}%
                </span>

                <span>
                  {progress >= 100
                    ? "ENTERING SYSTEM"
                    : progress >= 80
                    ? "FINALIZING"
                    : progress >= 50
                    ? "CALIBRATING"
                    : "INITIALIZING"}
                </span>
              </div>
            </div>

            {/* FOOTER */}
            <div className="mt-5 flex items-center justify-between border-t border-cyan-300/10 pt-3 text-[7px] tracking-[0.15em] text-white/30 sm:mt-6 sm:pt-4 sm:text-[9px] sm:tracking-[0.18em]">
              <span className="hidden sm:block">SIMULATE OPTIMIZE SUSTAIN</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
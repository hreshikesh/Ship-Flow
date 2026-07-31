import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useArrivalState, setArrivalState } from "./arrivalStore";

const SYSTEMS = [
  { id: "core", label: "Core Kernel", verb: "Linking" },
  { id: "hydro", label: "Hydrodynamic Mesh", verb: "Calibrating" },
  { id: "telemetry", label: "AIS Telemetry Feed", verb: "Syncing" },
  { id: "radar", label: "Bathymetric Radar", verb: "Mapping" },
  { id: "ui", label: "Command Interface", verb: "Initializing" },
];

export default function ShipflowLoader() {
  const { loaderDone } = useArrivalState();
  const [forceHidden, setForceHidden] = useState(false);
  const [internalProgress, setInternalProgress] = useState(0);
  const canvasRef = useRef(null);

  // Smooth loading progression over 4.2 seconds
  useEffect(() => {
    let startTime = performance.now();
    const DURATION = 4200; // ~4.2 seconds for full 0-100%
    let rafId;

    const updateProgress = (currentTime) => {
      const elapsed = currentTime - startTime;
      const pct = Math.min(100, Math.floor((elapsed / DURATION) * 100));
      setInternalProgress(pct);

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
    }, 4500);

    return () => clearTimeout(timer);
  }, []);

  // CFD Streamlines background canvas effect
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

    const COUNT = 90;
    const particles = [];
    for (let i = 0; i < COUNT; i++) {
      particles.push({
        x: Math.random() * width,
        y: height * (0.15 + Math.random() * 0.7),
        speed: 0.35 + Math.random() * 0.8,
      });
    }

    const draw = () => {
      ctx.fillStyle = "rgba(4, 7, 13, 0.22)";
      ctx.fillRect(0, 0, width, height);

      for (const p of particles) {
        p.x += p.speed;
        if (p.x > width + 20) p.x = -20;

        ctx.strokeStyle = "rgba(127, 216, 229, 0.22)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(p.x - 20, p.y);
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

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#02070d] text-[#C9D6DF] overflow-hidden font-mono"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Blueprint Grid Overlay */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-35"
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

          {/* Main HUD Card */}
          <div className="relative z-20 w-[min(540px,88vw)] p-8 rounded-lg border border-[#7fd8e5]/20 bg-[#04070d]/85 backdrop-blur-md shadow-2xl">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-[#7fd8e5] shadow-[0_0_16px_rgba(127,216,229,0.95)] animate-pulse" />
                <span className="text-xs font-bold tracking-[0.4em] text-white">
                  SHIPFLOW <span className="text-[#7fd8e5] font-normal">/ ENGINE</span>
                </span>
              </div>
              <span className="text-[10px] tracking-[0.3em] text-[#C9D6DF]/50">
                NORTH ATLANTIC
              </span>
            </div>

            {/* Subtitle / System Log Feed */}
            <div className="mb-6 space-y-3">
              <p className="text-xs uppercase tracking-[0.2em] text-[#7fd8e5]">
                Initializing Maritime Intelligence...
              </p>

              <div className="space-y-1.5 border-l border-[#7fd8e5]/20 pl-3">
                {SYSTEMS.map((sys, idx) => {
                  const active = progress >= (idx + 1) * 20;
                  return (
                    <div key={sys.id} className="flex items-center justify-between text-[11px] tracking-[0.2em]">
                      <span className={active ? "text-[#C9D6DF]" : "text-[#C9D6DF]/40"}>
                        {sys.label}
                      </span>
                      <span className={active ? "text-[#7fd8e5]" : "text-white/30"}>
                        {active ? "READY" : sys.verb}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full bg-[#7fd8e5] shadow-[0_0_12px_rgba(127,216,229,0.85)]"
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "linear", duration: 0.1 }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] tracking-[0.3em] text-white/50">
                <span>{progress}%</span>
                <span>
                  {progress >= 100 ? "Entering Simulation..." : "Loading"}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
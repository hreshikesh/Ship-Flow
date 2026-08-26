import { motion } from "framer-motion";

function WaterMark() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none relative select-none overflow-hidden py-10 sm:py-16"
    >
      {/* ============ LAYER 1 — DEEP OCEAN GRADIENT ============ */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 90% 70% at 50% 100%, rgba(6,182,212,0.15) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 20% 50%, rgba(59,130,246,0.10) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 80% 50%, rgba(16,185,129,0.08) 0%, transparent 60%),
            linear-gradient(to bottom, transparent 0%, rgba(6,182,212,0.03) 100%)
          `,
        }}
      />

      {/* ============ LAYER 2 — CFD MESH GRID ============ */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(6,182,212,0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6,182,212,0.4) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 100%)",
        }}
      />

      {/* ============ LAYER 3 — LARGER MESH OVERLAY ============ */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(6,182,212,0.8) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6,182,212,0.8) 1px, transparent 1px)
          `,
          backgroundSize: "160px 160px",
        }}
      />

      {/* ============ LAYER 4 — LIGHT RAYS ============ */}
      <div className="absolute inset-0 overflow-hidden">
        <svg
          className="absolute inset-0 h-full w-full opacity-30"
          viewBox="0 0 1440 400"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="rayGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
            </linearGradient>
          </defs>

          <polygon points="200,0 260,0 340,400 220,400" fill="url(#rayGrad)">
            <animate
              attributeName="opacity"
              values="0.3;0.6;0.3"
              dur="6s"
              repeatCount="indefinite"
            />
          </polygon>

          <polygon points="600,0 680,0 780,400 620,400" fill="url(#rayGrad)">
            <animate
              attributeName="opacity"
              values="0.5;0.2;0.5"
              dur="8s"
              repeatCount="indefinite"
            />
          </polygon>

          <polygon points="1000,0 1080,0 1200,400 1040,400" fill="url(#rayGrad)">
            <animate
              attributeName="opacity"
              values="0.4;0.7;0.4"
              dur="7s"
              repeatCount="indefinite"
            />
          </polygon>

          <polygon points="1200,0 1260,0 1380,400 1260,400" fill="url(#rayGrad)">
            <animate
              attributeName="opacity"
              values="0.2;0.5;0.2"
              dur="9s"
              repeatCount="indefinite"
            />
          </polygon>
        </svg>
      </div>

      {/* ============ LAYER 5 — FLOW STREAMLINES ============ */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          className="h-full w-full opacity-[0.15]"
          viewBox="0 0 1440 400"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="flowGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
              <stop offset="50%" stopColor="#06b6d4" stopOpacity="1" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="flowGrad2" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0" />
              <stop offset="50%" stopColor="#10b981" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
            </linearGradient>
          </defs>

          {[
            { y: 80, curve: 60, color: "flowGrad", duration: "4s", offset: 0 },
            { y: 130, curve: 40, color: "flowGrad2", duration: "5s", offset: 1 },
            { y: 180, curve: 55, color: "flowGrad", duration: "3.5s", offset: 0.5 },
            { y: 220, curve: 45, color: "flowGrad2", duration: "6s", offset: 2 },
            { y: 270, curve: 50, color: "flowGrad", duration: "4.5s", offset: 1.5 },
            { y: 320, curve: 35, color: "flowGrad2", duration: "5.5s", offset: 0.8 },
          ].map((line, i) => (
            <path
              key={i}
              d={`M -100 ${line.y} Q 360 ${line.y - line.curve} 720 ${line.y} T 1540 ${line.y}`}
              stroke={`url(#${line.color})`}
              strokeWidth="1"
              fill="none"
              strokeDasharray="12 8"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="0"
                to="-40"
                dur={line.duration}
                begin={`${line.offset}s`}
                repeatCount="indefinite"
              />
            </path>
          ))}
        </svg>
      </div>

      {/* ============ LAYER 6 — PARTICLE FIELD ============ */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => {
          const seed = i * 37;
          return (
            <motion.div
              key={i}
              className="absolute rounded-full bg-cyan-300"
              style={{
                left: `${(seed * 17) % 100}%`,
                top: `${(seed * 23) % 100}%`,
                width: `${1 + (seed % 3)}px`,
                height: `${1 + (seed % 3)}px`,
                opacity: 0.3 + ((seed % 4) * 0.1),
              }}
              animate={{
                opacity: [0.1, 0.8, 0.1],
                scale: [0.5, 1.5, 0.5],
              }}
              transition={{
                duration: 3 + (i % 4),
                repeat: Infinity,
                delay: (i * 0.3) % 4,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </div>

      {/* ============ LAYER 7 — HEXAGON MESH NODES ============ */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(6,182,212,0.3) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
          maskImage:
            "radial-gradient(ellipse 60% 40% at 50% 50%, black 20%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 60% 40% at 50% 50%, black 20%, transparent 80%)",
        }}
      />

      {/* ============ LAYER 8 — TOP/BOTTOM GRADIENT EDGES ============ */}
      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#020b16] to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#020b16] to-transparent" />

      {/* ============ LAYER 9 — HORIZONTAL SCAN LINE ============ */}
      <motion.div
        className="absolute inset-x-0 h-px z-10"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(6,182,212,0.6) 50%, transparent 100%)",
          boxShadow: "0 0 10px rgba(6,182,212,0.5)",
        }}
        animate={{
          top: ["10%", "90%", "10%"],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* ============ LAYER 10 — MAIN WATERMARK TEXT (Zero-Clipping) ============ */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative z-10 w-full px-2 text-center"
      >
        <h2 className="w-full text-center font-black leading-none tracking-tight text-[11.2vw] whitespace-nowrap select-none">
          {/* SanDeb — Blue/Cyan Gradient */}
          <span
            className="bg-gradient-to-b from-sky-400/25 via-cyan-500/12 to-transparent bg-clip-text text-transparent"
            style={{
              WebkitTextStroke: "1.2px rgba(56, 189, 248, 0.35)",
              filter: "drop-shadow(0 0 30px rgba(56, 189, 248, 0.18))",
            }}
          >
            SanDeb
          </span>

          {/* Tech — Emerald/Green Gradient (Logo Leaf Accent) */}
          <span
            className="bg-gradient-to-b from-emerald-400/25 via-green-500/12 to-transparent bg-clip-text text-transparent"
            style={{
              WebkitTextStroke: "1.2px rgba(52, 211, 153, 0.38)",
              filter: "drop-shadow(0 0 30px rgba(52, 211, 153, 0.18))",
            }}
          >
            Tech
          </span>
        </h2>

        {/* Official Tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="mt-3 flex items-center justify-center gap-2 sm:gap-6 font-mono text-[8px] sm:text-xs font-bold uppercase tracking-[0.3em] text-slate-500"
        >
          <span className="text-sky-400/80">Simulate</span>
          <span className="text-slate-700">|</span>
          <span className="text-cyan-400/80">Optimize</span>
          <span className="text-slate-700">|</span>
          <span className="text-emerald-400/80">Sustain</span>
        </motion.div>
      </motion.div>

      {/* ============ CORNER ORNAMENTS ============ */}
      <div className="absolute left-4 top-4 hidden opacity-30 sm:block">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path
            d="M 4 4 L 4 16 M 4 4 L 16 4"
            stroke="#06b6d4"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx="4" cy="4" r="2" fill="#06b6d4" opacity="0.5" />
        </svg>
      </div>
      <div className="absolute right-4 top-4 hidden opacity-30 sm:block">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path
            d="M 28 4 L 28 16 M 28 4 L 16 4"
            stroke="#06b6d4"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx="28" cy="4" r="2" fill="#06b6d4" opacity="0.5" />
        </svg>
      </div>

      {/* ============ HUD READOUTS ============ */}
      <div className="absolute left-4 top-16 hidden font-mono text-[8px] uppercase tracking-wider text-cyan-500/40 sm:block">
        <div>◆ Grid: 2.4M cells</div>
        <div>◆ Re: 1.2 × 10⁹</div>
      </div>
      <div className="absolute right-4 top-16 hidden font-mono text-[8px] uppercase tracking-wider text-cyan-500/40 sm:block">
        <div className="text-right">Fn: 0.26 ◆</div>
        <div className="text-right">Cₜ: 3.42e-3 ◆</div>
      </div>
    </div>
  );
}

export default WaterMark;
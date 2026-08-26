import { motion } from "framer-motion";
import {
  ArrowRight,
  MessageSquare,
  Calendar,
  Waves,
  Gauge,
  Zap,
  Ship,
  Boxes,
  Anchor,
} from "lucide-react";

const CONTACT_URL = "https://sandebtech.com/contact";
const MEETING_URL = "https://sandebtech.com/meeting";

export default function MarineContactBanner() {
  return (
    <section
      className="relative overflow-hidden bg-[#020b16] py-20 sm:py-24 lg:py-32"
      style={{ contentVisibility: "auto", containIntrinsicSize: "900px" }}
    >
      {/* ============ BACKGROUND ============ */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 25% 50%, rgba(6,182,212,0.10) 0%, transparent 60%),
            radial-gradient(ellipse 50% 40% at 80% 50%, rgba(59,130,246,0.06) 0%, transparent 60%)
          `,
        }}
      />

      {/* Grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(rgba(6,182,212,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* ============ LEFT — CFD VISUAL ============ */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative order-2 flex h-[400px] items-center justify-center sm:h-[480px] lg:order-1 lg:h-[540px]"
          >
            <CFDShipScene />
          </motion.div>

          {/* ============ RIGHT — CTA ============ */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="order-1 lg:order-2"
          >
            {/* Badge */}
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.3em] text-cyan-300 sm:text-xs">
              <MessageSquare size={12} />
              Contact SandebTech Marine
            </span>

            {/* Heading */}
            <h2 className="mt-6 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl xl:text-6xl">
              Ready to advance your{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
                marine engineering?
              </span>
            </h2>

            {/* Description */}
            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">
              SandebTech Marine delivers specialized CFD, parametric design and
              optimization for ship hydrodynamics — powered by{" "}
              <span className="text-slate-200">SHIPFLOW</span> and{" "}
              <span className="text-slate-200">CAESES</span>. Built with naval
              architects, for naval architects.
            </p>

            {/* Capability chips */}
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                { icon: Ship, label: "SHIPFLOW", sub: "Marine CFD" },
                { icon: Boxes, label: "CAESES", sub: "Optimization" },
             
              ].map((mod) => (
                <div
                  key={mod.label}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-3"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10">
                    <mod.icon size={16} className="text-cyan-400" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-white">{mod.label}</div>
                    <div className="truncate text-[10px] uppercase tracking-wider text-slate-500">
                      {mod.sub}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons — Contact + Appointment */}
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              {/* Primary — Contact */}
              <a
                href={CONTACT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center gap-2.5 overflow-hidden rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition hover:shadow-xl hover:shadow-cyan-500/40 sm:text-base"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <MessageSquare size={16} className="relative" />
                <span className="relative">Contact Us</span>
                <ArrowRight
                  size={18}
                  className="relative transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>

              {/* Secondary — Meeting / Appointment */}
              <a
                href={MEETING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center gap-2.5 overflow-hidden rounded-full border border-cyan-400/30 bg-cyan-400/5 px-8 py-4 text-sm font-semibold text-cyan-300 backdrop-blur-sm transition hover:border-cyan-400/50 hover:bg-cyan-400/10 sm:text-base"
              >
                <Calendar size={16} className="relative" />
                <span className="relative">Book a Meeting</span>
                <ArrowRight
                  size={18}
                  className="relative transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
            </div>

            {/* Trust stats */}
            {/* <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-white/5 pt-8">
              {[
                { value: "CFD", label: "Hydrodynamics" },
                { value: "CAD", label: "Parametric Design" },
                { value: "AI", label: "Optimization" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold text-white sm:text-3xl">
                    {stat.value}
                  </div>
                  <div className="mt-0.5 text-[11px] uppercase tracking-wider text-slate-500">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div> */}

            {/* Trusted strip */}
            <div className="mt-8 flex items-center gap-3 text-[11px] uppercase tracking-wider text-slate-600">
              <div className="h-px flex-1 bg-white/10" />
              SandebTech Marine · SHIPFLOW · CAESES
              <div className="h-px flex-1 bg-white/10" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   CFD SHIP SCENE — SandebTech Marine
============================================ */
function CFDShipScene() {
  return (
    <div className="relative h-full w-full">
      {/* Ambient glow */}
      <div
        className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(6,182,212,0.25) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Status label */}
      <div className="absolute left-4 top-4 z-10 flex items-center gap-2 rounded-md border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 backdrop-blur-sm">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-400" />
        </span>
        <span className="font-mono text-[9px] uppercase tracking-wider text-cyan-300">
          Live Analysis
        </span>
      </div>

      {/* HUD readouts */}
      <div className="absolute right-4 top-4 z-10 rounded-md border border-white/10 bg-black/40 px-3 py-1.5 font-mono text-[10px] backdrop-blur-sm">
        <div className="text-slate-500">
          Re: <span className="text-cyan-300">1.2 × 10⁹</span>
        </div>
        <div className="text-slate-500">
          Fn: <span className="text-cyan-300">0.26</span>
        </div>
      </div>

      <div className="absolute bottom-4 left-4 z-10 rounded-md border border-white/10 bg-black/40 px-3 py-1.5 font-mono text-[10px] backdrop-blur-sm">
        <div className="text-slate-500">
          Engine: <span className="text-emerald-300">SANDEBTECH</span>
        </div>
        <div className="text-slate-500">
          Suite: <span className="text-emerald-300">MARINE</span>
        </div>
      </div>

      <div className="absolute bottom-4 right-4 z-10 rounded-md border border-white/10 bg-black/40 px-3 py-1.5 font-mono text-[10px] backdrop-blur-sm">
        <div className="text-slate-500">
          Cₜ: <span className="text-amber-300">3.42e-3</span>
        </div>
        <div className="text-slate-500">
          Cf: <span className="text-amber-300">1.48e-3</span>
        </div>
      </div>

      {/* Floating ship */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="relative flex h-full w-full items-center justify-center"
      >
        <svg
          viewBox="0 0 500 400"
          className="h-full w-full max-w-[520px]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="SandebTech Marine CFD simulation"
        >
          <defs>
            <linearGradient id="pressureGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#1e40af" />
              <stop offset="25%" stopColor="#0891b2" />
              <stop offset="50%" stopColor="#10b981" />
              <stop offset="75%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>

            <linearGradient id="hullMainGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#020617" />
            </linearGradient>

            <linearGradient id="wakeGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="flowGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
              <stop offset="50%" stopColor="#06b6d4" stopOpacity="1" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
            </linearGradient>

            <clipPath id="hullClip">
              <path d="M 70 240 Q 90 220 130 218 L 380 218 Q 420 218 445 240 L 445 265 Q 435 285 400 285 L 110 285 Q 80 285 70 265 Z" />
            </clipPath>
          </defs>

          {/* Computational mesh */}
          <g opacity="0.15" stroke="#06b6d4" strokeWidth="0.5" fill="none">
            {Array.from({ length: 20 }).map((_, i) => (
              <line
                key={`vm-${i}`}
                x1={50 + i * 21}
                y1="150"
                x2={50 + i * 21}
                y2="330"
              />
            ))}
            {Array.from({ length: 10 }).map((_, i) => (
              <line
                key={`hm-${i}`}
                x1="50"
                y1={150 + i * 18}
                x2="470"
                y2={150 + i * 18}
              />
            ))}
            {Array.from({ length: 30 }).map((_, i) => (
              <line
                key={`fm-${i}`}
                x1={60 + i * 13}
                y1="215"
                x2={60 + i * 13}
                y2="290"
                strokeWidth="0.3"
              />
            ))}
          </g>

          {/* Streamlines */}
          <g>
            {[
              { y: 170, delay: 0 },
              { y: 195, delay: 0.3 },
              { y: 210, delay: 0.6 },
              { y: 260, delay: 0.2 },
              { y: 280, delay: 0.8 },
              { y: 300, delay: 0.4 },
            ].map((line, i) => (
              <path
                key={i}
                d={`M 20 ${line.y} Q 100 ${line.y} 200 ${line.y + Math.sin(i) * 5} T 480 ${line.y}`}
                stroke="url(#flowGrad)"
                strokeWidth="1.2"
                fill="none"
                strokeDasharray="8 4"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="0"
                  to="-24"
                  dur="1.5s"
                  begin={`${line.delay}s`}
                  repeatCount="indefinite"
                />
              </path>
            ))}
          </g>

          {/* Hull */}
          <g>
            <path
              d="M 70 240 Q 90 220 130 218 L 380 218 Q 420 218 445 240 L 445 265 Q 435 285 400 285 L 110 285 Q 80 285 70 265 Z"
              fill="url(#hullMainGrad)"
              stroke="#0891b2"
              strokeWidth="1.5"
            />

            <g clipPath="url(#hullClip)" opacity="0.75">
              <ellipse cx="90" cy="250" rx="45" ry="30" fill="#ef4444" opacity="0.6" />
              <ellipse cx="105" cy="250" rx="35" ry="25" fill="#f59e0b" opacity="0.5" />
              <ellipse cx="200" cy="250" rx="60" ry="25" fill="#0891b2" opacity="0.4" />
              <ellipse cx="280" cy="250" rx="50" ry="25" fill="#1e40af" opacity="0.4" />
              <ellipse cx="380" cy="255" rx="40" ry="25" fill="#10b981" opacity="0.5" />
              <ellipse cx="420" cy="255" rx="30" ry="20" fill="#f59e0b" opacity="0.4" />
            </g>

            <line
              x1="70"
              y1="253"
              x2="445"
              y2="253"
              stroke="#ef4444"
              strokeWidth="1"
              opacity="0.5"
              strokeDasharray="4 2"
            />

            <g
              clipPath="url(#hullClip)"
              opacity="0.2"
              stroke="#06b6d4"
              fill="none"
              strokeWidth="0.4"
            >
              {Array.from({ length: 20 }).map((_, i) => (
                <line
                  key={`hg-${i}`}
                  x1={70 + i * 20}
                  y1="218"
                  x2={70 + i * 20}
                  y2="285"
                />
              ))}
              {Array.from({ length: 5 }).map((_, i) => (
                <line
                  key={`hh-${i}`}
                  x1="70"
                  y1={225 + i * 13}
                  x2="445"
                  y2={225 + i * 13}
                />
              ))}
            </g>

            {/* Brand on hull */}
            <text
              x="260"
              y="248"
              textAnchor="middle"
              fill="#ffffff"
              fontSize="7"
              fontFamily="monospace"
              fontWeight="bold"
              letterSpacing="2"
              opacity="0.9"
            >
              SANDEBTECH MARINE
            </text>
          </g>

          {/* Superstructure */}
          <g>
            {[130, 160, 190, 220, 250, 280, 310].map((x, i) => (
              <rect
                key={x}
                x={x}
                y="188"
                width="28"
                height="30"
                fill={
                  ["#0891b2", "#1e40af", "#0891b2", "#1e40af", "#0891b2", "#1e40af", "#0891b2"][i]
                }
                stroke="#020617"
                strokeWidth="0.8"
                opacity="0.9"
              />
            ))}
            {[145, 175, 205, 235, 265, 295].map((x) => (
              <rect
                key={x}
                x={x}
                y="163"
                width="26"
                height="25"
                fill="#0f172a"
                stroke="#0891b2"
                strokeWidth="0.5"
                opacity="0.8"
              />
            ))}

            <rect
              x="340"
              y="163"
              width="40"
              height="55"
              fill="#1e293b"
              stroke="#0891b2"
              strokeWidth="1"
            />
            {[168, 178, 188, 198, 208].map((y) => (
              <rect
                key={y}
                x="345"
                y={y}
                width="30"
                height="4"
                fill="#06b6d4"
                opacity="0.7"
              />
            ))}

            <line
              x1="360"
              y1="163"
              x2="360"
              y2="130"
              stroke="#94a3b8"
              strokeWidth="1.5"
            />
            <ellipse cx="360" cy="140" rx="10" ry="2" fill="#94a3b8">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 360 140"
                to="360 360 140"
                dur="4s"
                repeatCount="indefinite"
              />
            </ellipse>
          </g>

          {/* Velocity vectors */}
          <g stroke="#f59e0b" strokeWidth="1" fill="#f59e0b" opacity="0.7">
            {[
              { x: 55, y: 235, angle: -25 },
              { x: 55, y: 260, angle: 20 },
              { x: 60, y: 275, angle: 35 },
            ].map((v, i) => (
              <g key={i} transform={`translate(${v.x}, ${v.y}) rotate(${v.angle})`}>
                <line x1="0" y1="0" x2="12" y2="0" strokeWidth="1.2" />
                <path d="M 12 0 L 8 -2 L 8 2 Z" />
              </g>
            ))}
          </g>

          {/* Kelvin wake */}
          <g opacity="0.7">
            <path
              d="M 445 260 Q 470 250 490 240"
              stroke="#06b6d4"
              strokeWidth="1.5"
              fill="none"
              strokeDasharray="6 3"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="0"
                to="18"
                dur="2s"
                repeatCount="indefinite"
              />
            </path>
            <path
              d="M 445 275 Q 470 285 490 295"
              stroke="#06b6d4"
              strokeWidth="1.5"
              fill="none"
              strokeDasharray="6 3"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="0"
                to="18"
                dur="2s"
                repeatCount="indefinite"
              />
            </path>

            {[280, 310, 340, 370, 400].map((x, i) => (
              <path
                key={x}
                d={`M ${x + 150} 250 Q ${x + 170} ${255 + i * 3} ${x + 190} 250`}
                stroke="#06b6d4"
                strokeWidth="1"
                fill="none"
                opacity={0.7 - i * 0.1}
              >
                <animate
                  attributeName="opacity"
                  values={`${0.7 - i * 0.1};${0.3 - i * 0.05};${0.7 - i * 0.1}`}
                  dur="3s"
                  begin={`${i * 0.2}s`}
                  repeatCount="indefinite"
                />
              </path>
            ))}
          </g>

          {/* Turbulent wake */}
          <g>
            <path
              d="M 445 240 L 500 235 L 500 290 L 445 285 Z"
              fill="url(#wakeGrad)"
              opacity="0.5"
            />
            {[
              { cx: 460, cy: 250, r: 2, delay: 0 },
              { cx: 470, cy: 265, r: 1.5, delay: 0.3 },
              { cx: 480, cy: 258, r: 2, delay: 0.6 },
              { cx: 465, cy: 275, r: 1.5, delay: 0.9 },
              { cx: 485, cy: 270, r: 1, delay: 1.2 },
            ].map((b, i) => (
              <circle key={i} cx={b.cx} cy={b.cy} r={b.r} fill="#06b6d4">
                <animate
                  attributeName="opacity"
                  values="0;1;0"
                  dur="2s"
                  begin={`${b.delay}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="r"
                  values={`${b.r};${b.r * 2};${b.r}`}
                  dur="2s"
                  begin={`${b.delay}s`}
                  repeatCount="indefinite"
                />
              </circle>
            ))}
          </g>

          {/* Pressure legend */}
          <g transform="translate(180, 355)">
            <text
              x="0"
              y="-2"
              fill="#64748b"
              fontSize="7"
              fontFamily="monospace"
              letterSpacing="1"
            >
              PRESSURE COEFFICIENT (Cp)
            </text>
            <rect x="0" y="2" width="140" height="6" fill="url(#pressureGrad)" rx="1" />
            <text x="0" y="18" fill="#94a3b8" fontSize="6" fontFamily="monospace">
              LOW
            </text>
            <text
              x="140"
              y="18"
              textAnchor="end"
              fill="#94a3b8"
              fontSize="6"
              fontFamily="monospace"
            >
              HIGH
            </text>
          </g>
        </svg>
      </motion.div>
    </div>
  );
}
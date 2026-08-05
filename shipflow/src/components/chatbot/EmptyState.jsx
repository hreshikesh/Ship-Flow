import { motion } from "framer-motion";

const suggestions = [
  { icon: "⚓", title: "Explain BASIC Solver" },
  { icon: "🌊", title: "BASIC vs RANS" },
  { icon: "📐", title: "Hull Optimization" },
  { icon: "📊", title: "Resistance Prediction" },
];

export default function EmptyState({ onSuggestionClick }) {
  return (
    <div className="flex h-full flex-col items-center justify-center px-5">
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-5"
      >
        <div className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-400/10 bg-gradient-to-br from-cyan-500/10 to-transparent">
          <svg
            width={22}
            height={22}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            className="text-cyan-400"
          >
            <path d="M3 17l3-12h12l3 12" />
            <path d="M2 17c2 2 5 3 10 3s8-1 10-3" />
            <line x1="12" y1="5" x2="12" y2="2" />
            <line x1="10" y1="3" x2="14" y2="3" />
          </svg>
          <div className="absolute -inset-1.5 rounded-xl bg-cyan-400/5 blur-lg" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.06 }}
        className="mb-6 text-center"
      >
        <h2 className="text-base font-bold text-white">SHIPFLOW AI</h2>
        <p className="mt-1.5 text-[11px] leading-relaxed text-slate-400">
          Ask about CFD, solvers, hull design
          <br />
          and engineering workflows.
        </p>
      </motion.div>

      <div className="flex w-full flex-col gap-1.5">
        {suggestions.map((item, i) => (
          <motion.button
            key={item.title}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.04 }}
            onClick={() => onSuggestionClick?.(item.title)}
            className="group flex items-center gap-2.5 rounded-lg border border-white/[0.04] bg-white/[0.015] px-3 py-2.5 text-left transition hover:border-cyan-400/15 hover:bg-cyan-500/[0.04]"
          >
            <span className="text-sm">{item.icon}</span>
            <p className="text-[11px] text-slate-300 group-hover:text-white">
              {item.title}
            </p>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
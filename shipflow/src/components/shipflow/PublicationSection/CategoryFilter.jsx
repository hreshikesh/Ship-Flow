// CategoryFilter.jsx
import { motion } from "framer-motion";

const categories = ["All", "CFD", "RANS", "Optimization"];

export default function CategoryFilter({ active, onChange }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className="mb-16 flex justify-center"
    >
      {/* Wrapper pill container — keeps all buttons together */}
      <div className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1.5 backdrop-blur-sm">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            className={`
              relative rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-wider
              transition-colors duration-300
              ${
                active === cat
                  ? "text-white"
                  : "text-slate-400 hover:text-white"
              }
            `}
          >
            {active === cat && (
              <motion.div
                layoutId="activeFilterPill"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/30"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{cat}</span>
          </button>
        ))}
      </div>
    </motion.div>
  );
}
// BrowseButton.jsx
import { motion } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";

export default function BrowseButton() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.4, duration: 0.6 }}
      className="mt-20 flex flex-col items-center gap-4"
    >
      <button
        className="
          group relative flex items-center gap-3 overflow-hidden
          rounded-full border border-cyan-500/40
          bg-gradient-to-r from-cyan-500/10 to-blue-500/10
          px-8 py-4 text-sm font-semibold text-white
          transition-all duration-500
          hover:border-cyan-400/60 hover:shadow-[0_0_40px_rgba(6,182,212,0.2)]
        "
      >
        {/* Hover fill */}
        <span
          className="
            absolute inset-0 -translate-x-full bg-gradient-to-r from-cyan-500 to-blue-500
            transition-transform duration-500 group-hover:translate-x-0
          "
        />

        <BookOpen size={18} className="relative z-10" />
        <span className="relative z-10">Browse All Publications</span>
        <ArrowRight
          size={18}
          className="relative z-10 transition-transform duration-300 group-hover:translate-x-2"
        />
      </button>

      <span className="text-xs text-slate-600">
        50+ papers across 12 journals
      </span>
    </motion.div>
  );
}
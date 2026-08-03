// SectionHeader.jsx
import { motion } from "framer-motion";
// ✅ Removed unused Sparkles import
import { BookOpen } from "lucide-react";

export default function SectionHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="mx-auto mb-24 max-w-4xl text-center"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-5 py-2 backdrop-blur-sm"
      >
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400">
          Scientific Publications
        </span>
        <BookOpen size={14} className="text-cyan-400" />
      </motion.div>

      <h2 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
        Explore{" "}
        <span className="relative inline-block">
          <span className="relative z-10 bg-gradient-to-r from-cyan-400 via-blue-400 to-blue-600 bg-clip-text text-transparent">
            peer&#8209;reviewed
          </span>
          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute -bottom-1 left-0 h-[3px] w-full origin-left rounded-full bg-gradient-to-r from-cyan-400 to-violet-400"
          />
        </span>{" "}
        research
      </h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="mt-6 text-lg leading-relaxed text-slate-400 sm:text-xl"
      >
        Decades of computational fluid dynamics research from the SHIPFLOW
        development team, published in leading maritime journals.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="mt-10 flex flex-wrap justify-center gap-8 sm:gap-12"
      >
        {[
          { value: "50+", label: "Publications" },
          { value: "824", label: "Total Citations" },
          { value: "12", label: "Journals" },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-2xl font-bold text-white sm:text-3xl">
              {stat.value}
            </div>
            <div className="mt-1 text-xs uppercase tracking-wider text-slate-500">
              {stat.label}
            </div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
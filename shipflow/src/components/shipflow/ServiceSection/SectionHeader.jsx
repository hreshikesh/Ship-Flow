import { motion } from "framer-motion";
import { Anchor } from "lucide-react";

export default function SectionHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="mx-auto mb-12 max-w-4xl text-center 
      sm:mb-14 
      lg:mb-16"
    >
      {/* Badge */}
      <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/5 px-4 py-2 backdrop-blur-sm">
        <Anchor size={14} className="text-cyan-400" />
        <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-cyan-400 sm:text-xs">
          Professional Services
        </span>
      </div>

      {/* Title */}
      <h2 className="text-3xl font-bold leading-tight text-white 
      sm:text-4xl 
      lg:text-5xl">
        Comprehensive support to maximize your success with{" "}
        <span className="bg-gradient-to-r from-cyan-300 via-cyan-400 to-cyan-300 bg-clip-text text-transparent">
          SHIPFLOW
        </span>
      </h2>

      {/* Description */}
      <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-400 
      sm:text-base sm:leading-8">
        Training, customization and consulting services designed to help teams
        adopt SHIPFLOW effectively and solve complex hydrodynamic challenges.
      </p>
    </motion.div>
  );
}
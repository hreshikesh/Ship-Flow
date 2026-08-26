// SectionHeader.jsx
import { motion } from "framer-motion";
import { Anchor } from "lucide-react";

export default function SectionHeader() {
  return (
    <div className="mx-auto max-w-4xl text-center">
      {/* Marine Badge */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-6 inline-flex items-center gap-3 rounded-full border border-[#6FC3DF]/30 bg-[#6FC3DF]/5 px-6 py-2.5 backdrop-blur-sm"
      >
        <Anchor size={16} className="text-[#6FC3DF]" />
        <p className="text-xs uppercase tracking-[0.4em] text-[#6FC3DF] font-medium">
          Simulation Platform
        </p>
      </motion.div>

      {/* Main Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="mt-6 text-4xl font-bold leading-tight tracking-[-0.04em] text-white
          sm:text-5xl 
          md:text-6xl 
          lg:text-[4rem]"
      >
        What{" "}
        <motion.span
          initial={{ backgroundPosition: "0% 50%" }}
          animate={{ backgroundPosition: "100% 50%" }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
          className="bg-gradient-to-r from-[#6FC3DF] via-[#38BDF8] to-[#6FC3DF] bg-[length:200%_auto] bg-clip-text text-transparent"
        >
          SHIPFLOW
        </motion.span>{" "}
        Does
      </motion.h2>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[#9CB7C9]
          sm:text-lg sm:leading-8
          md:mt-8"
      >
        Multi-fidelity CFD solution designed to analyse every stage of
        ship hydrodynamics—from rapid concept evaluation to advanced
        viscous flow simulation and motion prediction.
      </motion.p>

      {/* Wave Decoration */}
      <motion.div
        animate={{ 
          scaleX: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ duration: 3, repeat: Infinity }}
        className="mx-auto mt-8 h-1 w-24 rounded-full bg-gradient-to-r from-transparent via-[#6FC3DF]/60 to-transparent"
      />
    </div>
  );
}
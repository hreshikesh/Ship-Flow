import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";

export default function FlipBack({ module }) {
  return (
    <div
      className="absolute inset-0 rounded-3xl overflow-hidden
      border border-[#6FC3DF]/30
      bg-gradient-to-br from-[#03111E] via-[#02070D] to-[#020A14]
      shadow-[0_20px_60px_rgba(0,0,0,.6)]
      p-6 flex flex-col"
      style={{
        transform: "rotateY(180deg)",
        backfaceVisibility: "hidden",
        transformStyle: "preserve-3d",
      }}
    >
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-[#6FC3DF]">
          Capabilities
        </p>

        <h3 className="mt-2 text-2xl font-bold text-white">
          {module.title}
        </h3>
      </div>

      <div className="mt-6 space-y-3 flex-1">
        {module.points.map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ x: 6 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="flex items-center gap-3"
          >
            <div className="w-6 h-6 rounded-full bg-[#6FC3DF]/10 border border-[#6FC3DF]/30 flex items-center justify-center">
              <Check size={14} className="text-[#6FC3DF]" />
            </div>

            <span className="text-sm text-[#D3E3EF]">
              {item}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 border border-[#6FC3DF]/20 rounded-xl p-4 bg-[#071A2F]/60">
        <p className="text-xs uppercase tracking-[0.3em] text-[#6FC3DF]">
          Average Runtime
        </p>

        <h4 className="mt-2 text-xl font-bold text-white">
          {module.result}
        </h4>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 250 }}
        className="mt-6 w-full flex items-center justify-between px-4 py-3
        rounded-xl border border-[#6FC3DF]/30
        bg-gradient-to-r from-[#04101F] to-[#071A2F]
        hover:border-[#38BDF8]/50 transition"
      >
        <span className="text-white text-sm font-medium">
          Explore Module
        </span>

        <ArrowRight size={16} className="text-[#6FC3DF]" />
      </motion.button>
    </div>
  );
}
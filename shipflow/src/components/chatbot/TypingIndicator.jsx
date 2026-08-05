import { motion } from "framer-motion";

export default function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4 }}
      className="flex items-start gap-2"
    >
      {/* AI Avatar */}
      <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-cyan-400/12 bg-cyan-500/10">
        <svg
          width={10}
          height={10}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          className="text-cyan-400"
        >
          <path d="M3 17l3-12h12l3 12" />
          <path d="M2 17c2 2 5 3 10 3s8-1 10-3" />
        </svg>
      </div>

      {/* Dots */}
      <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm border border-white/[0.06] bg-white/[0.04] px-4 py-3">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-cyan-400/50"
            animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
            transition={{
              duration: 0.8,
              delay: i * 0.15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
// FlipCard.jsx
import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import FlipFront from "./FlipFront";
import FlipBack from "./FlipBack";

export default function FlipCard({ module, index }) {
  const [flipped, setFlipped] = useState(false);

  // ✅ Memoized handler prevents re-renders
  const handleFlip = useCallback((e) => {
    // Don't flip if clicking a link/button inside
    if (e.target.closest("a, button")) return;
    setFlipped((prev) => !prev);
  }, []);

  // ✅ Keyboard support
  const handleKeyDown = useCallback((e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setFlipped((prev) => !prev);
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        delay: Math.min(index * 0.1, 0.4), // ✅ Cap delay so it doesn't get too slow
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="w-full h-[520px]"
      style={{ perspective: "2000px" }} // ✅ Inline style — more reliable than utility
    >
      <div
        role="button"
        tabIndex={0}
        aria-label={`${module.title} card. Click to see details.`}
        aria-pressed={flipped}
        onClick={handleFlip}
        onKeyDown={handleKeyDown}
        className="relative w-full h-full cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#6FC3DF] focus-visible:ring-offset-4 focus-visible:ring-offset-[#02070D] rounded-3xl"
      >
        <motion.div
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            transformStyle: "preserve-3d",
            willChange: "transform",
            width: "100%",
            height: "100%",
            position: "relative",
          }}
        >
          <FlipFront module={module} flipped={flipped} />
          <FlipBack module={module} flipped={flipped} />
        </motion.div>

        {/* Flip indicator dot in corner */}
        <div className="pointer-events-none absolute right-3 top-3 z-40 flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 backdrop-blur-sm">
          <div className="flex gap-1">
            <span
              className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                !flipped ? "bg-[#6FC3DF]" : "bg-[#6FC3DF]/30"
              }`}
            />
            <span
              className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                flipped ? "bg-[#6FC3DF]" : "bg-[#6FC3DF]/30"
              }`}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
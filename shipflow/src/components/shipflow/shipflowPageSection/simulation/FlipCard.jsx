// FlipCard.jsx
import { useState, useCallback } from "react";
import FlipFront from "./FlipFront";
import FlipBack from "./FlipBack";

export default function FlipCard({ module, compact = false }) {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = useCallback((e) => {
    if (e.target.closest("a, button")) return;
    setFlipped((v) => !v);
  }, []);

  const handleKeyDown = useCallback((e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setFlipped((v) => !v);
    }
  }, []);

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`${module.title}. Tap to flip.`}
      aria-pressed={flipped}
      onClick={handleFlip}
      onKeyDown={handleKeyDown}
      className={`relative w-full cursor-pointer rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-[#6FC3DF] ${
        compact ? "h-[400px]" : "h-[420px] lg:h-[460px]"
      }`}
      style={{ perspective: "1000px" }}
    >
      <div
        className="relative h-full w-full transition-transform duration-500 ease-out"
        style={{
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          transformStyle: "preserve-3d",
        }}
      >
        <FlipFront module={module} flipped={flipped} />
        <FlipBack module={module} flipped={flipped} />
      </div>

      <div className="pointer-events-none absolute right-3 top-3 z-20 flex gap-1 rounded-full bg-black/50 px-2 py-1">
        <span
          className={`h-1 w-1 rounded-full ${
            !flipped ? "bg-[#6FC3DF]" : "bg-white/25"
          }`}
        />
        <span
          className={`h-1 w-1 rounded-full ${
            flipped ? "bg-[#6FC3DF]" : "bg-white/25"
          }`}
        />
      </div>
    </div>
  );
}
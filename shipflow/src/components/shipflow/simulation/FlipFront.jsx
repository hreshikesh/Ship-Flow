// FlipFront.jsx
import { motion } from "framer-motion";
import { useState } from "react";

export default function FlipFront({ module, flipped }) {
  const Icon = module.icon;
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className="absolute inset-0 rounded-3xl overflow-hidden border border-[#6FC3DF]/30 bg-gradient-to-br from-[#071A2F] via-[#04101F] to-[#020A14] shadow-[0_20px_60px_rgba(0,0,0,.6)]"
      style={{
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        transform: "rotateY(0deg)",
      }}
    >
      {/* ============ IMAGE SECTION ============ */}
      <div className="relative h-[62%] overflow-hidden bg-[#04101F]">
        {/* Skeleton loader */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#071A2F] to-[#020A14]">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#6FC3DF]/20 border-t-[#6FC3DF]" />
          </div>
        )}

        {/* Fallback for image error */}
        {imageError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#071A2F] to-[#020A14]">
            <Icon size={40} className="text-[#6FC3DF]/40" />
            <span className="text-xs text-[#6FC3DF]/60">Preview unavailable</span>
          </div>
        )}

        {/* ✅ Image with proper error handling */}
        <img
          src={module.image}
          alt={module.title}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
          className={`h-full w-full object-cover transition-all duration-700 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Gradient Overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#04101F] via-[#04101F]/40 to-transparent" />

        {/* Blueprint Grid Overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(111,195,223,.4) 1px, transparent 1px),
              linear-gradient(90deg, rgba(111,195,223,.4) 1px, transparent 1px)
            `,
            backgroundSize: "32px 32px",
          }}
        />

        {/* ✅ Scan Line — only animates when card is visible on front */}
        {!flipped && (
          <motion.div
            animate={{ y: ["-100%", "200%"] }}
            transition={{
              repeat: Infinity,
              duration: 4,
              ease: "linear",
            }}
            className="pointer-events-none absolute inset-x-0 h-20 bg-gradient-to-b from-transparent via-[#6FC3DF]/10 to-transparent blur-xl"
          />
        )}

      

        {/* Corner accents */}
        <span className="pointer-events-none absolute left-4 top-4 h-6 w-6 border-l-2 border-t-2 border-[#6FC3DF]/40" />
        <span className="pointer-events-none absolute bottom-4 right-4 h-6 w-6 border-b-2 border-r-2 border-[#6FC3DF]/40" />
      </div>

      {/* ============ CONTENT SECTION ============ */}
      <div className="relative flex h-[38%] flex-col justify-between p-6">
        <div>
          <div className="flex items-center gap-3">
            <div className="grid h-8 w-8 place-items-center rounded-full border border-[#6FC3DF]/30 bg-[#6FC3DF]/10">
              <Icon size={16} className="text-[#6FC3DF]" />
            </div>
            <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-[#6FC3DF]">
              SHIPFLOW
            </span>
          </div>

          <h3 className="mt-3 text-xl font-bold tracking-tight text-white sm:text-2xl">
            {module.title}
          </h3>

          <p className="mt-2 line-clamp-2 text-sm text-[#AFC4D8]">
            {module.subtitle}
          </p>
        </div>

        {/* ✅ Tap prompt (changed from Hover) */}
        <div className="mt-4 flex items-center justify-between border-t border-[#6FC3DF]/15 pt-3">
          <div className="flex items-center gap-2">
            {/* Tap icon */}
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-[#6FC3DF]"
            >
              <path d="M9 11.24V7.5C9 6.12 10.12 5 11.5 5S14 6.12 14 7.5v3.74" />
              <path d="M14 13V9.5C14 8.12 15.12 7 16.5 7S19 8.12 19 9.5V16" />
              <path d="M19 15V11.5C19 10.12 20.12 9 21.5 9S24 10.12 24 11.5V22" />
            </svg>
            <span className="text-xs font-medium text-[#6FC3DF]">
              Tap for details
            </span>
          </div>
          <motion.span
            animate={{ x: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="text-lg text-[#6FC3DF]"
          >
            →
          </motion.span>
        </div>
      </div>
    </div>
  );
}
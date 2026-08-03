// FlipBack.jsx
import { motion } from "framer-motion";
import { Check, ArrowRight, Ship, Gauge } from "lucide-react";

export default function FlipBack({ module, flipped }) {
  return (
    <div
      className="absolute inset-0 flex flex-col overflow-hidden rounded-3xl border border-[#6FC3DF]/30 bg-gradient-to-br from-[#03111E] via-[#02070D] to-[#020A14] p-6 shadow-[0_20px_60px_rgba(0,0,0,.6)]"
      style={{
        transform: "rotateY(180deg)",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
      }}
    >
      {/* Background Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(111,195,223,.35) 1px, transparent 1px),
            linear-gradient(90deg, rgba(111,195,223,.35) 1px, transparent 1px)
          `,
          backgroundSize: "36px 36px",
        }}
      />

      {/* Top glow */}
      <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-[#38BDF8]/15 blur-[100px]" />

      {/* ✅ Scan effect — only when card is on back */}
      {flipped && (
        <motion.div
          animate={{ y: ["100%", "-100%"] }}
          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
          className="pointer-events-none absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-[#6FC3DF]/5 to-transparent blur-2xl"
        />
      )}

      {/* Content wrapper */}
      <div className="relative z-10 flex h-full flex-col">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <Ship size={12} className="text-[#6FC3DF]" />
              <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#6FC3DF]">
                Capabilities
              </p>
            </div>
            <h3 className="mt-2 text-2xl font-bold tracking-tight text-white">
              {module.title}
            </h3>
          </div>

          {/* Status indicator */}
          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-1">
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="h-1.5 w-1.5 rounded-full bg-[#6FC3DF] shadow-[0_0_6px_rgba(111,195,223,.8)]"
              />
              <div className="h-1 w-1 rounded-full bg-[#6FC3DF]/60" />
              <div className="h-0.5 w-0.5 rounded-full bg-[#6FC3DF]/40" />
            </div>
            <span className="text-[8px] font-medium uppercase tracking-[0.25em] text-[#6FC3DF]/70">
              ACTIVE
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="relative my-5 h-px">
          <div className="absolute inset-0 bg-gradient-to-r from-[#6FC3DF]/40 via-[#6FC3DF]/20 to-transparent" />
          {flipped && (
            <motion.div
              animate={{ x: ["-100%", "100%"] }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
              className="absolute inset-y-0 w-16 bg-gradient-to-r from-transparent via-[#6FC3DF]/60 to-transparent blur-sm"
            />
          )}
        </div>

        {/* Features list — ✅ animate only when flipped */}
        <div className="flex-1 space-y-3">
          {module.points.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={
                flipped ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
              }
              transition={{ delay: flipped ? i * 0.08 : 0, duration: 0.4 }}
              className="flex items-center gap-3"
            >
              <div className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-[#6FC3DF]/30 bg-[#6FC3DF]/10">
                <Check size={12} className="text-[#6FC3DF]" strokeWidth={3} />
              </div>
              <span className="text-sm text-[#D3E3EF]">{item}</span>
            </motion.div>
          ))}
        </div>

        {/* Runtime Card */}
        <div className="relative mt-4 overflow-hidden rounded-xl border border-[#6FC3DF]/25 bg-gradient-to-br from-[#071A2F]/80 to-[#04101F]/60 p-4">
          {/* Animated stripes — only when flipped */}
          {flipped && (
            <motion.div
              animate={{ x: ["0%", "100%"] }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
              className="pointer-events-none absolute inset-0 opacity-10"
              style={{
                backgroundImage: `repeating-linear-gradient(
                  90deg,
                  transparent,
                  transparent 10px,
                  rgba(111,195,223,.15) 10px,
                  rgba(111,195,223,.15) 11px
                )`,
              }}
            />
          )}

          <div className="relative flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5">
                <Gauge size={11} className="text-[#6FC3DF]" />
                <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#6FC3DF]">
                  Avg Runtime
                </p>
              </div>
              <h4 className="mt-1 bg-gradient-to-r from-white via-[#6FC3DF] to-white bg-clip-text text-xl font-bold text-transparent">
                {module.result}
              </h4>
            </div>

            {/* Performance bars — only when flipped */}
            {flipped && (
              <div className="flex items-end gap-0.5">
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scaleY: 0.3 }}
                    animate={{ scaleY: [0.3, 1, 0.3] }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.5,
                      delay: i * 0.1,
                    }}
                    className="w-1 rounded-full bg-[#6FC3DF]/60"
                    style={{
                      height: `${(i + 1) * 4}px`,
                      transformOrigin: "bottom",
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* CTA Button — ✅ Using real anchor so clicks are properly captured */}
        <a
          href={module.href || "#"}
          onClick={(e) => e.stopPropagation()} // Prevent card flip
          className="group relative mt-4 flex w-full items-center justify-between overflow-hidden rounded-xl border border-[#6FC3DF]/30 bg-gradient-to-r from-[#04101F] to-[#071A2F] px-4 py-3 transition-all duration-300 hover:border-[#38BDF8]/60 hover:shadow-[0_0_20px_rgba(111,195,223,.2)]"
        >
          {/* Shine effect */}
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#6FC3DF]/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

          <span className="relative text-sm font-semibold text-white">
            Explore Module
          </span>

          <ArrowRight
            size={16}
            className="relative text-[#6FC3DF] transition-transform duration-300 group-hover:translate-x-1"
          />
        </a>
      </div>

      {/* Corner accents */}
      <span className="pointer-events-none absolute left-4 top-4 h-6 w-6 border-l-2 border-t-2 border-[#6FC3DF]/40" />
      <span className="pointer-events-none absolute bottom-4 right-4 h-6 w-6 border-b-2 border-r-2 border-[#6FC3DF]/40" />
    </div>
  );
}
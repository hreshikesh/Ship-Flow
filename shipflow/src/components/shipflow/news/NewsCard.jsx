// NewsCard.jsx
import { motion } from "framer-motion";
import { ArrowRight, Calendar, FileText, PlayCircle, BookOpen } from "lucide-react";

const typeConfig = {
  Publication: {
    icon: FileText,
    color: "from-cyan-500 to-blue-600",
    accent: "text-cyan-400",
    accentBg: "bg-cyan-500/10",
    accentBorder: "border-cyan-500/30",
    shadow: "shadow-cyan-500/20",
  },
  "Video Tutorial": {
    icon: PlayCircle,
    color: "from-violet-500 to-purple-600",
    accent: "text-violet-400",
    accentBg: "bg-violet-500/10",
    accentBorder: "border-violet-500/30",
    shadow: "shadow-violet-500/20",
  },
  Research: {
    icon: BookOpen,
    color: "from-emerald-500 to-teal-600",
    accent: "text-emerald-400",
    accentBg: "bg-emerald-500/10",
    accentBorder: "border-emerald-500/30",
    shadow: "shadow-emerald-500/20",
  },
};

export default function NewsCard({ item, index }) {
  const config = typeConfig[item.type] || typeConfig.Publication;
  const Icon = config.icon;


  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      whileHover="hover"
      initial-hover="rest"
      className="group relative"
    >
      {/* Ground shadow */}
      <div className="absolute -bottom-4 left-1/2 h-6 w-[85%] -translate-x-1/2 rounded-full bg-black/50 blur-xl" />

      {/* Container body */}
      <div
        className={`
          relative h-[420px] overflow-hidden rounded-lg
          border border-white/10
          bg-gradient-to-b from-[#0b1a2c] to-[#050d17]
          shadow-2xl ${config.shadow}
          transition-shadow duration-500
          group-hover:shadow-[0_25px_60px_-15px_rgba(6,182,212,0.35)]
        `}
      >
        {/* ============ CONTAINER TOP HEADER ============ */}
        <div className={`relative h-12 bg-gradient-to-r ${config.color} px-4 sm:px-5`}>
          {/* Rivets on top edge */}
          <div className="absolute inset-x-0 top-1 flex justify-around px-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <span
                key={i}
                className="h-1.5 w-1.5 rounded-full bg-black/40 shadow-inner"
              />
            ))}
          </div>

          {/* Header content */}
          <div className="flex h-full items-center justify-between pt-1">
            <div className="flex items-center gap-2">
                <Icon size={16} className={`text-white/90 ${config.accent}`} />
              <span className="hidden text-[10px] font-bold uppercase tracking-[0.2em] text-white/90 sm:inline">
                SHIPFLOW
              </span>
            </div>

            <div className="flex items-center gap-2">
                
              {/* Warning stripes */}
              <div className="flex gap-0.5">
                <div className="h-4 w-1 bg-black/40" />
                <div className="h-4 w-1 bg-white/40" />
                <div className="h-4 w-1 bg-black/40" />
              </div>
            </div>
          </div>
        </div>

        {/* ============ CORRUGATED CONTAINER DOORS ============ */}
        <div className="absolute inset-x-0 top-12 bottom-12 z-20 flex overflow-hidden">
          {/* LEFT DOOR */}
          <motion.div
            variants={{
              rest: { x: "0%" },
              hover: { x: "-102%" },
            }}
            transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
            className="relative w-1/2 border-r-2 border-black/40"
            style={{
              background: `
                repeating-linear-gradient(
                  90deg,
                  #0f2338 0px,
                  #14304d 4px,
                  #0a1a2b 14px,
                  #14304d 22px
                )
              `,
            }}
          >
            {/* Door plate/label */}
            <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2">
              <div className={`rounded-sm border ${config.accentBorder} ${config.accentBg} px-2 py-1`}>
                <span className={`text-[8px] font-bold uppercase tracking-widest ${config.accent}`}>
                  Cargo
                </span>
              </div>
              <div className="h-8 w-8 rounded-full border-2 border-white/20 bg-black/30" />
            </div>

            {/* Vertical bar (door lock) */}
            <div className="absolute right-2 top-0 h-full w-1 bg-black/50" />
            <div className="absolute right-1.5 top-4 h-2 w-2 rounded-full bg-yellow-400 shadow-lg" />
            <div className="absolute right-1.5 bottom-4 h-2 w-2 rounded-full bg-red-500 shadow-lg" />

            {/* Rivets */}
            <div className="absolute left-2 top-4 flex flex-col gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <span key={i} className="h-1.5 w-1.5 rounded-full bg-black/50" />
              ))}
            </div>
          </motion.div>

          {/* RIGHT DOOR */}
          <motion.div
            variants={{
              rest: { x: "0%" },
              hover: { x: "102%" },
            }}
            transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
            className="relative w-1/2 border-l-2 border-black/40"
            style={{
              background: `
                repeating-linear-gradient(
                  90deg,
                  #0f2338 0px,
                  #14304d 4px,
                  #0a1a2b 14px,
                  #14304d 22px
                )
              `,
            }}
          >
            {/* Door plate/label */}
            <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2">
              <div className={`rounded-sm border ${config.accentBorder} ${config.accentBg} px-2 py-1`}>
                <span className={`text-[8px] font-bold uppercase tracking-widest ${config.accent}`}>
                  Container
                </span>
              </div>
              <div className="h-8 w-8 rounded-full border-2 border-white/20 bg-black/30" />
            </div>

            {/* Vertical bar (door lock) */}
            <div className="absolute left-2 top-0 h-full w-1 bg-black/50" />
            <div className="absolute left-1.5 top-4 h-2 w-2 rounded-full bg-yellow-400 shadow-lg" />
            <div className="absolute left-1.5 bottom-4 h-2 w-2 rounded-full bg-red-500 shadow-lg" />

            {/* Rivets */}
            <div className="absolute right-2 top-4 flex flex-col gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <span key={i} className="h-1.5 w-1.5 rounded-full bg-black/50" />
              ))}
            </div>
          </motion.div>
        </div>

        {/* ============ INSIDE CONTAINER (revealed on hover) ============ */}
        <div className="absolute inset-x-0 top-12 bottom-12 z-10 overflow-hidden">
          {/* Interior gradient / depth */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a1725] via-[#08131f] to-[#050d17]" />

          {/* Light beam from opening */}
          <motion.div
            variants={{
              rest: { opacity: 0 },
              hover: { opacity: 1 },
            }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className={`absolute inset-0 bg-gradient-to-b ${config.color} opacity-[0.04]`}
          />

          {/* Content */}
          <motion.div
            variants={{
              rest: { opacity: 0, y: 20 },
              hover: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="relative flex h-full flex-col p-5 sm:p-6"
          >
            {/* Type badge with icon */}
            <div className="flex items-center gap-2.5">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg ${config.accentBg} border ${config.accentBorder}`}
              >
                <Icon size={18} className={config.accent} />
              </div>
              <span
                className={`text-[10px] font-bold uppercase tracking-[0.2em] ${config.accent}`}
              >
                {item.type}
              </span>
            </div>

            {/* Title */}
            <h3 className="mt-4 line-clamp-2 text-lg font-bold leading-snug text-white sm:text-xl">
              {item.title}
            </h3>

            {/* Description */}
            <p className="mt-3 line-clamp-3 text-xs leading-relaxed text-slate-400 sm:text-sm">
              {item.description}
            </p>

            {/* Bottom bar */}
            <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-4">
              <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                <Calendar size={12} />
                <span>{item.date}</span>
              </div>

              <button
                className={`flex items-center gap-1.5 text-xs font-semibold ${config.accent} transition-all hover:gap-2.5`}
              >
                Read More
                <ArrowRight size={14} />
              </button>
            </div>
          </motion.div>
        </div>

        {/* ============ CONTAINER BOTTOM RAIL ============ */}
        <div className="absolute inset-x-0 bottom-0 z-30 h-12 bg-gradient-to-b from-[#0a1725] to-[#050d17]">
          {/* Rivets bottom */}
          <div className="absolute inset-x-0 bottom-1 flex justify-around px-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <span
                key={i}
                className="h-1.5 w-1.5 rounded-full bg-black/50 shadow-inner"
              />
            ))}
          </div>

          {/* Bottom info strip */}
          <div className="flex h-full items-center justify-between border-t border-white/5 px-4 pt-1 sm:px-5">
            <div className="flex items-center gap-2">
              <div className={`h-1.5 w-1.5 rounded-full ${config.accent.replace("text", "bg")} animate-pulse`} />
              <span className="text-[9px] font-mono uppercase tracking-wider text-slate-500">
                {item.type}
              </span>
            </div>
            <span className="text-[9px] font-mono uppercase tracking-wider text-slate-500">
                {item.date} 
            </span>
          </div>
        </div>

        {/* Corner reinforcements */}
        <div className="absolute left-0 top-12 h-2 w-2 bg-black/40" />
        <div className="absolute right-0 top-12 h-2 w-2 bg-black/40" />
        <div className="absolute left-0 bottom-12 h-2 w-2 bg-black/40" />
        <div className="absolute right-0 bottom-12 h-2 w-2 bg-black/40" />

        {/* Hover glow */}
        <div
          className={`pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-b ${config.color} opacity-0 transition-opacity duration-500 group-hover:opacity-[0.03]`}
        />
      </div>
    </motion.div>
  );
}
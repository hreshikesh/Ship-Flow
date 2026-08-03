// Shelf.jsx
import { motion } from "framer-motion";

// ✅ Was: export default function Bookshelf()
export default function Shelf() {
  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, scaleX: 0.8 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10"
      >
        <div className="h-3 rounded-t-sm bg-gradient-to-b from-amber-800/80 via-amber-900/60 to-amber-950/80 shadow-[0_-2px_15px_rgba(0,0,0,0.3)]" />
        <div className="relative h-5 overflow-hidden rounded-b-sm bg-gradient-to-b from-amber-900/70 to-amber-950/90 shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute left-[10%] top-0 h-full w-px bg-amber-700/40" />
            <div className="absolute left-[25%] top-0 h-full w-px bg-amber-700/30" />
            <div className="absolute left-[55%] top-0 h-full w-px bg-amber-700/20" />
            <div className="absolute left-[78%] top-0 h-full w-px bg-amber-700/40" />
            <div className="absolute left-[92%] top-0 h-full w-px bg-amber-700/25" />
          </div>
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-600/30 to-transparent" />
        </div>
      </motion.div>

      <div className="mx-auto h-4 w-[95%] rounded-b-full bg-black/30 blur-md" />
      <div className="absolute -bottom-6 left-8 h-6 w-3 rounded-b bg-amber-900/40 sm:left-16" />
      <div className="absolute -bottom-6 right-8 h-6 w-3 rounded-b bg-amber-900/40 sm:right-16" />
    </div>
  );
}
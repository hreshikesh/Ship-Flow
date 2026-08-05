import { motion } from "framer-motion";
import { User } from "lucide-react";

function AiAvatar() {
  return (
    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-cyan-400/12 bg-cyan-500/10">
      <svg
        width={12}
        height={12}
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
  );
}

export default function Message({ message }) {
  const isAi = message.role === "assistant";

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`flex items-start gap-2 ${isAi ? "" : "justify-end"}`}
    >
      {isAi && <AiAvatar />}

      <div
        className={`max-w-[82%] rounded-xl px-3 py-2.5 ${
          isAi
            ? "border border-white/[0.05] bg-white/[0.03] text-slate-200"
            : "bg-cyan-500 text-black"
        }`}
      >
        <p className="text-[12px] leading-relaxed whitespace-pre-wrap">
          {message.content}
        </p>
      </div>

      {!isAi && (
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/[0.06]">
          <User size={12} className="text-slate-400" />
        </div>
      )}
    </motion.div>
  );
}
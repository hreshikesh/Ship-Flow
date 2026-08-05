import { X, Trash2, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

function HeaderButton({ onClick, title, children, danger = false }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      title={title}
      className={`flex h-7 w-7 items-center justify-center rounded-lg bg-white/5 text-slate-400 transition-colors ${
        danger
          ? "hover:bg-red-500/20 hover:text-red-400"
          : "hover:bg-white/10 hover:text-white"
      }`}
    >
      {children}
    </motion.button>
  );
}

export default function ChatHeader({
  onClose,
  onClear,
  hasMessages,
  healthStatus,
  onRetry,
}) {
  const isOnline = healthStatus?.status === "online";
  const isLoading = healthStatus === null;

  return (
    <div className="relative border-b border-white/5 bg-gradient-to-r from-[#0a2540] to-[#051a2f] px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Left: Branding */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 shadow-[0_0_16px_rgba(6,182,212,0.25)]">
            <span className="text-sm font-bold text-black">AI</span>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">
              SHIPFLOW Assistant
            </h3>
            <div className="flex items-center gap-1.5">
              {/* Status Dot */}
              <div
                className={`h-1.5 w-1.5 rounded-full transition-colors ${
                  isLoading
                    ? "animate-pulse bg-yellow-400"
                    : isOnline
                    ? "bg-green-400"
                    : "bg-red-400"
                }`}
              />
              <span className="text-[11px] text-slate-400">
                {isLoading
                  ? "Connecting..."
                  : healthStatus?.mode || (isOnline ? "Online" : "Offline")}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1">
          {/* Retry when offline */}
          {!isOnline && !isLoading && (
            <HeaderButton onClick={onRetry} title="Retry connection">
              <RefreshCw size={13} />
            </HeaderButton>
          )}

          {/* Clear conversation */}
          {hasMessages && (
            <HeaderButton onClick={onClear} title="Clear conversation" danger>
              <Trash2 size={13} />
            </HeaderButton>
          )}

          {/* Close */}
          <HeaderButton onClick={onClose} title="Close chat">
            <X size={13} />
          </HeaderButton>
        </div>
      </div>
    </div>
  );
}
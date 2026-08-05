import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ChatPanel from "./ChatPanel";

function HullIcon({ size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 17l3-12h12l3 12" />
      <path d="M2 17c2 2 5 3 10 3s8-1 10-3" />
      <line x1="12" y1="5" x2="12" y2="2" />
      <line x1="10" y1="3" x2="14" y2="3" />
    </svg>
  );
}

function SonarPing() {
  return (
    <>
      <motion.div
        className="absolute inset-0 rounded-full border border-cyan-400/20"
        initial={{ scale: 1, opacity: 0.4 }}
        animate={{ scale: 1.9, opacity: 0 }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
      />
      <motion.div
        className="absolute inset-0 rounded-full border border-cyan-400/10"
        initial={{ scale: 1, opacity: 0.25 }}
        animate={{ scale: 2.3, opacity: 0 }}
        transition={{
          duration: 2.5,
          delay: 0.5,
          repeat: Infinity,
          ease: "easeOut",
        }}
      />
    </>
  );
}

export default function FloatingAI() {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const show = setTimeout(() => setShowHint(true), 4000);
    const hide = setTimeout(() => setShowHint(false), 9000);
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {open && <ChatPanel onClose={() => setOpen(false)} />}
      </AnimatePresence>

      <AnimatePresence>
        {!open && (
          <motion.div
            className="fixed bottom-6 right-6 z-[9999]"
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 15 }}
            transition={{ type: "spring", stiffness: 280, damping: 22 }}
          >
            {/* Hint Tooltip */}
            <AnimatePresence>
              {showHint && !hovered && (
                <motion.div
                  initial={{ opacity: 0, x: 6, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 6, scale: 0.9 }}
                  className="absolute -left-48 bottom-2 w-44 rounded-xl border border-cyan-500/15 bg-[#051a2d]/95 px-3 py-2.5 shadow-lg backdrop-blur-xl"
                >
                  <p className="text-[11px] leading-relaxed text-slate-300">
                    Need help with SHIPFLOW documentation?
                  </p>
                  <div className="absolute -right-1.5 bottom-4 h-2.5 w-2.5 rotate-45 border-r border-t border-cyan-500/15 bg-[#051a2d]/95" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* FAB Button */}
            <motion.button
              onMouseEnter={() => {
                setHovered(true);
                setShowHint(false);
              }}
              onMouseLeave={() => setHovered(false)}
              onClick={() => setOpen(true)}
              whileTap={{ scale: 0.9 }}
              className="group relative"
              aria-label="Open SHIPFLOW AI Assistant"
            >
              <div className="relative">
                <SonarPing />
                <motion.div
                  animate={
                    hovered
                      ? {
                          scale: 1.08,
                          boxShadow: "0 0 30px rgba(6,182,212,0.25)",
                        }
                      : {
                          scale: 1,
                          boxShadow: "0 0 15px rgba(6,182,212,0.1)",
                        }
                  }
                  transition={{ duration: 0.25 }}
                  className="relative flex h-12 w-12 items-center justify-center rounded-full border border-cyan-400/25 bg-gradient-to-br from-[#062842] to-[#0a3a5c]"
                >
                  <motion.div
                    className="text-cyan-400"
                    animate={
                      hovered ? { y: [-0.5, 1, -0.5] } : { y: [0, -2, 0] }
                    }
                    transition={{
                      duration: hovered ? 1 : 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <HullIcon size={20} />
                  </motion.div>

                  {/* Online Dot */}
                  <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5 items-center justify-center">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-30" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                </motion.div>
              </div>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
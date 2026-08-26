// Book.jsx
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

import PdfViewerModal from "../../pdf/PdfViewerModal";

const FALLBACK_COLORS = [
  "from-cyan-800 to-slate-900",
  "from-sky-900 to-slate-950",
  "from-teal-800 to-slate-900",
  "from-blue-900 to-slate-950",
];
const FALLBACK_ACCENTS = ["bg-cyan-400", "bg-sky-400", "bg-teal-400", "bg-blue-400"];

export default function Book({ book, index = 0 }) {
  const [isHovered, setIsHovered] = useState(false);
  const [pdfOpen, setPdfOpen] = useState(false);

  const isPdf = (book.type || "").toLowerCase() === "pdf";
  const color = book.color || FALLBACK_COLORS[index % FALLBACK_COLORS.length];
  const accent = book.accent || FALLBACK_ACCENTS[index % FALLBACK_ACCENTS.length];
  const spineLabel =
    book.title.length > 22 ? `${book.title.substring(0, 22)}…` : book.title;

  const handleOpen = () => {
    if (isPdf) {
      setPdfOpen(true);
      return;
    }
    // external link type
    if (book.link) {
      window.open(book.link, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{
          delay: index * 0.08,
          duration: 0.6,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="relative flex flex-col items-center"
      >
        {/* Tooltip — full title */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-4 hidden w-64 -translate-x-1/2 md:block"
            >
              <div className="relative rounded-xl border border-white/10 bg-slate-900/95 p-4 shadow-2xl backdrop-blur-xl">
                <div className={`absolute left-0 top-0 h-full w-1 rounded-l-xl ${accent}`} />

                <div className="pl-2">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-cyan-400">
                    {isPdf ? "PDF Publication" : "Online Publication"}
                  </div>

                  {/* FULL title */}
                  <div className="mt-1.5 text-sm font-bold leading-snug text-white">
                    {book.title}
                  </div>

                  {book.year && (
                    <div className="mt-2 text-[11px] text-slate-500">{book.year}</div>
                  )}

                  <div className="mt-3 flex items-center gap-2 border-t border-white/5 pt-2">
                    <span className={`h-1.5 w-1.5 rounded-full ${accent}`} />
                    <span className="text-[10px] font-medium text-slate-400">
                      {isPdf ? "Click to view PDF" : "Click to open link"}
                    </span>
                  </div>
                </div>

                <div className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-b border-r border-white/10 bg-slate-900/95" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Book spine — same size as your design */}
        <motion.div
          whileHover={{ y: -24, rotate: -3, scale: 1.08 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          onClick={handleOpen}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleOpen();
            }
          }}
          className={`
            group relative cursor-pointer
            h-56 w-12 sm:h-64 sm:w-14 md:h-72 md:w-16
            rounded-t-lg bg-gradient-to-b ${color}
            shadow-2xl transition-shadow duration-300
            hover:shadow-[0_20px_60px_-10px_rgba(0,0,0,0.5)]
          `}
          aria-label={book.title}
        >
          <div className="absolute inset-0 rounded-t-lg border border-white/10" />
          <div className="absolute left-0 top-0 h-full w-[3px] rounded-tl-lg bg-white/20" />

          <div className="absolute left-2 right-2 top-3 h-px bg-white/20" />
          <div className="absolute left-3 right-3 top-[18px] h-px bg-white/10" />

          <div className="absolute left-1/2 top-8 -translate-x-1/2 -rotate-90 whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.15em] text-white/90 sm:text-xs">
            {spineLabel}
          </div>

          <div
            className={`absolute bottom-10 left-1/2 -translate-x-1/2 rounded-full ${accent} px-1 py-px`}
          >
            <span className="text-[6px] font-bold uppercase tracking-wider text-white">
              {isPdf ? "PDF" : "WEB"}
            </span>
          </div>

          {book.year && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[9px] font-medium tabular-nums text-white/60 sm:text-[10px]">
              {book.year}
            </div>
          )}

          <div className="absolute bottom-8 left-2 right-2 h-px bg-white/10" />
          <div className="pointer-events-none absolute inset-0 rounded-t-lg bg-white/0 transition-all duration-300 group-hover:bg-white/5" />
        </motion.div>

        <div
          className={`h-3 w-10 rounded-full bg-gradient-to-b ${color} opacity-20 blur-sm sm:w-12 md:w-14`}
        />
      </motion.div>

      {/* PDF viewer + gated download (only for type: pdf) */}
      {isPdf && (
        <PdfViewerModal
          isOpen={pdfOpen}
          onClose={() => setPdfOpen(false)}
          pdfUrl={book.link}
          title={book.title}
          user={null}
        />
      )}
    </>
  );
}
// PdfViewerModal.jsx
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, FileText, Loader2, AlertCircle } from "lucide-react";
import DownloadFormModal from "./DownloadFormModal";

export default function PdfViewerModal({
  isOpen,
  onClose,
  pdfUrl,
  title,
  user = null,
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [showDownloadForm, setShowDownloadForm] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setHasError(false);
    }
  }, [isOpen, pdfUrl]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && !showDownloadForm) onClose?.();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "";
      };
    }
  }, [isOpen, onClose, showDownloadForm]);

  if (!isOpen || !pdfUrl) return null;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="absolute inset-0 bg-[#01060b]/90 backdrop-blur-md"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex h-full mt-11 max-h-[80vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-cyan-500/20 bg-[#030d17] shadow-[0_0_50px_rgba(6,182,212,0.15)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <header className="flex shrink-0 items-center justify-between border-b border-white/10 bg-white/[0.02] px-4 py-3 sm:px-6">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400">
                    <FileText size={18} />
                  </div>
                  <h3 className="truncate font-semibold text-white">
                    {title || "Document Preview"}
                  </h3>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => setShowDownloadForm(true)}
                    className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-lg transition-all hover:shadow-cyan-500/25 sm:px-5 sm:text-sm"
                  >
                    <Download size={14} className="transition-transform group-hover:-translate-y-0.5" />
                    <span>Download</span>
                  </button>

                  <button
                    type="button"
                    onClick={onClose}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <X size={18} />
                  </button>
                </div>
              </header>

              {/* Body */}
              <div className="relative flex-1 bg-black/40">
                {isLoading && !hasError && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-cyan-400">
                    <Loader2 size={32} className="animate-spin" />
                    <p className="text-sm font-medium tracking-wider text-slate-400">
                      LOADING DOCUMENT...
                    </p>
                  </div>
                )}

                {hasError ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
                    <AlertCircle size={40} className="text-rose-500" />
                    <p className="text-slate-300">
                      Unable to display PDF preview directly.
                    </p>
                    <button
                      type="button"
                      onClick={() => setShowDownloadForm(true)}
                      className="mt-2 flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-6 py-2.5 text-sm font-medium text-cyan-300 transition-colors hover:bg-cyan-500/20"
                    >
                      <Download size={16} />
                      Download Document Instead
                    </button>
                  </div>
                ) : (
                  <iframe
                    src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`}
                    title={title || "PDF Viewer"}
                    className={`h-full w-full border-0 transition-opacity duration-500 ${
                      isLoading ? "opacity-0" : "opacity-100"
                    }`}
                    onLoad={() => setIsLoading(false)}
                    onError={() => {
                      setIsLoading(false);
                      setHasError(true);
                    }}
                  />
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Download Gate Form */}
      <DownloadFormModal
        isOpen={showDownloadForm}
        onClose={() => setShowDownloadForm(false)}
        pdfUrl={pdfUrl}
        title={title}
        user={user}
      />
    </>
  );
}
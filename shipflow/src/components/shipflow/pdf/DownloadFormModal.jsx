// DownloadFormModal.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, User, Mail, Phone, Loader2, CheckCircle } from "lucide-react";
import { submitDownloadInfo } from "../../../services/downloadService";

const initialForm = { name: "", email: "", phone: "" };
const initialErrors = { name: "", email: "", phone: "" };

export default function DownloadFormModal({
  isOpen,
  onClose,
  pdfUrl,
  title,
  user = null,
}) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState(initialErrors);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  const resolvedTitle = (title && title.trim()) || "Document";

  useEffect(() => {
    if (isOpen) {
      setForm({
        name: user?.name || "",
        email: user?.email || "",
        phone: user?.phone || "",
      });
      setErrors(initialErrors);
      setIsSuccess(false);
      setServerError("");
      setIsSubmitting(false);
    }
  }, [isOpen, user]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    if (isOpen) document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !pdfUrl) return null;

  // Form Validation
  const validateName = (val) => {
    if (!val.trim()) return "Full name is required.";
    if (val.trim().length < 2) return "Name must be at least 2 characters.";
    return "";
  };

  const validateEmail = (val) => {
    if (!val.trim()) return "Email address is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val.trim())) return "Invalid email address.";
    return "";
  };

  const validatePhone = (val) => {
    const digits = val.replace(/\D/g, "");
    if (digits.length > 0 && (digits.length < 7 || digits.length > 15)) {
      return "Enter a valid phone number (or leave blank).";
    }
    return "";
  };

  const validateAll = () => {
    const newErrors = {
      name: validateName(form.name),
      email: validateEmail(form.email),
      phone: validatePhone(form.phone),
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    if (!validateAll()) return;

    setIsSubmitting(true);
    try {
      await submitDownloadInfo({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || null,
        documentTitle: resolvedTitle,
      });
      
      setIsSuccess(true);

      setTimeout(() => {
        const link = document.createElement("a");
        link.href = pdfUrl;
        link.download = `${resolvedTitle}.pdf`;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, 800);
    } catch (err) {
      setServerError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to process download request. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#01060b]/90 backdrop-blur-md"
          />

          {/* Form Modal Container */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-cyan-500/20 bg-[#030d17] shadow-[0_0_50px_rgba(6,182,212,0.15)]"
          >
            {/* Top Accent Line */}
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-600" />

            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full p-1.5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X size={18} />
            </button>

            {isSuccess ? (
              <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", bounce: 0.5 }}
                  className="flex h-20 w-20 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-400"
                >
                  <CheckCircle size={40} />
                </motion.div>
                <h3 className="mt-6 text-xl font-bold text-white">Download Starting!</h3>
                <p className="mt-3 text-sm text-slate-400">
                  Thank you, <strong>{form.name}</strong>. Your document{" "}
                  <span className="text-cyan-300">"{resolvedTitle}"</span> is downloading now.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-8 w-full rounded-full border border-white/10 bg-white/5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <div className="p-6 sm:p-8">
                <div className="mb-8">
                  <div className="mb-4 inline-flex items-center justify-center rounded-xl bg-cyan-500/10 p-3 text-cyan-400">
                    <Download size={24} />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Get Document</h2>
                  <p className="mt-2 text-sm text-slate-400 line-clamp-2">
                    {resolvedTitle}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {serverError && (
                    <div className="rounded-lg border border-rose-500/20 bg-rose-500/10 p-3 text-xs text-rose-400">
                      {serverError}
                    </div>
                  )}

                  {/* Name */}
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Full Name <span className="text-cyan-400">*</span>
                    </label>
                    <div className="relative">
                      <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                      <input
                        type="text"
                        value={form.name}
                        disabled={!!user?.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className={`w-full rounded-xl border bg-black/40 py-3 pl-10 pr-4 text-sm text-white placeholder-slate-600 outline-none transition-colors ${
                          errors.name ? "border-rose-500/50 focus:border-rose-500" : "border-white/10 focus:border-cyan-400"
                        }`}
                        placeholder="John Doe"
                      />
                    </div>
                    {errors.name && <p className="mt-1.5 text-xs text-rose-400">{errors.name}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Email Address <span className="text-cyan-400">*</span>
                    </label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                      <input
                        type="email"
                        value={form.email}
                        disabled={!!user?.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className={`w-full rounded-xl border bg-black/40 py-3 pl-10 pr-4 text-sm text-white placeholder-slate-600 outline-none transition-colors ${
                          errors.email ? "border-rose-500/50 focus:border-rose-500" : "border-white/10 focus:border-cyan-400"
                        }`}
                        placeholder="john@example.com"
                      />
                    </div>
                    {errors.email && <p className="mt-1.5 text-xs text-rose-400">{errors.email}</p>}
                  </div>

                  {/* Phone (Optional) */}
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Phone Number <span className="text-slate-600">(Optional)</span>
                    </label>
                    <div className="relative">
                      <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                      <input
                        type="tel"
                        value={form.phone}
                        disabled={!!user?.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className={`w-full rounded-xl border bg-black/40 py-3 pl-10 pr-4 text-sm text-white placeholder-slate-600 outline-none transition-colors ${
                          errors.phone ? "border-rose-500/50 focus:border-rose-500" : "border-white/10 focus:border-cyan-400"
                        }`}
                        placeholder="+91 9876543210"
                      />
                    </div>
                    {errors.phone && <p className="mt-1.5 text-xs text-rose-400">{errors.phone}</p>}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3.5 text-sm font-semibold text-white shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-all hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Download size={16} />
                        Download PDF
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
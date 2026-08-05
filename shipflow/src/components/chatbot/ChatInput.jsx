import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { SendHorizontal, Loader2 } from "lucide-react";

const MAX_LENGTH = 500;

export default function ChatInput({ onSend, isTyping, disabled = false }) {
  const [value, setValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const textareaRef = useRef(null);

  const hasText = value.trim().length > 0;
  const isDisabled = !hasText || isTyping || disabled || isSubmitting;
  const charsLeft = MAX_LENGTH - value.length;

  // ✅ Auto-resize textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  }, [value]);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (isDisabled) return;

    const messageToSend = value.trim();
    setValue("");
    setIsSubmitting(true);

    try {
      await onSend(messageToSend);
    } catch (err) {
      console.error("Send failed:", err);
      setValue(messageToSend); // Restore on failure
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="border-t border-white/5 p-3">
      <form onSubmit={handleSubmit}>
        <motion.div
          animate={{
            borderColor: hasText
              ? "rgba(6,182,212,0.25)"
              : "rgba(255,255,255,0.05)",
          }}
          transition={{ duration: 0.2 }}
          className="flex items-end gap-2 rounded-xl border bg-[#081b2b]/70 px-3 py-2"
        >
          {/* ✅ Auto-resizing Textarea */}
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isTyping || disabled || isSubmitting}
            placeholder={
              isSubmitting
                ? "Sending..."
                : isTyping
                ? "AI is thinking..."
                : "Ask about SHIPFLOW documentation..."
            }
            rows={1}
            maxLength={MAX_LENGTH}
            autoComplete="off"
            className="max-h-[120px] min-h-[24px] flex-1 resize-none bg-transparent text-xs leading-relaxed text-white placeholder:text-slate-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            style={{ scrollbarWidth: "none" }}
          />

          {/* Send Button */}
          <motion.button
            type="submit"
            disabled={isDisabled}
            whileHover={!isDisabled ? { scale: 1.05 } : {}}
            whileTap={!isDisabled ? { scale: 0.92 } : {}}
            className={`mb-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-all duration-200 ${
              !isDisabled
                ? "bg-cyan-500 text-black shadow-[0_0_12px_rgba(6,182,212,0.2)] hover:bg-cyan-400"
                : "cursor-not-allowed bg-white/5 text-slate-600"
            }`}
            aria-label="Send message"
          >
            {isSubmitting ? (
              <Loader2 size={13} className="animate-spin" />
            ) : (
              <SendHorizontal size={13} />
            )}
          </motion.button>
        </motion.div>
      </form>

      {/* Character Counter & Hint */}
      <div className="mt-1.5 flex items-center justify-between px-1">
        <p className="text-[10px] text-slate-600">
          Shift + Enter for new line
        </p>
        {value.length > 400 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`text-[10px] ${
              charsLeft <= 20 ? "text-red-400" : "text-slate-500"
            }`}
          >
            {charsLeft} left
          </motion.p>
        )}
      </div>
    </div>
  );
}
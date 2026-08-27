import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

// International format (+91 for India + 9108994209)
const WHATSAPP_NUMBER = "919108994209";
const PREFILLED_MESSAGE = encodeURIComponent(
  "Hello SandebTech Marine, I would like to inquire about your services."
);

export default function WhatsAppButton() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${PREFILLED_MESSAGE}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with SandebTech Marine on WhatsApp"
      initial={{ opacity: 0, scale: 0.7, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      className="
        group
        fixed
        right-3
        top-[62vh]
        z-[90]
        flex
        h-12
        w-12
        items-center
        justify-center
        rounded-full
        bg-[#25D366]
        text-white
        shadow-[0_6px_25px_rgba(37,211,102,0.35)]
        transition-all
        duration-300
        hover:shadow-[0_10px_35px_rgba(37,211,102,0.5)]
        active:scale-95
        xs:right-4
        sm:top-auto
        sm:bottom-7
        sm:right-7
        sm:h-14
        sm:w-14
      "
    >
      {/* Animated Background Pulse Ring */}
      <span
        className="
          absolute
          inset-0
          -z-10
          rounded-full
          bg-[#25D366]
          opacity-40
          animate-ping
        "
      />

      {/* Responsive Icon */}
      <MessageCircle
        size={22}
        strokeWidth={2.2}
        className="transition-transform duration-300 group-hover:rotate-[-8deg] sm:hidden"
      />
      <MessageCircle
        size={25}
        strokeWidth={2.2}
        className="hidden transition-transform duration-300 group-hover:rotate-[-8deg] sm:block"
      />

      {/* Desktop / Tablet Tooltip */}
      <span
        className="
          pointer-events-none
          absolute
          right-[calc(100%+12px)]
          hidden
          whitespace-nowrap
          rounded-lg
          border
          border-white/10
          bg-[#061019]/95
          px-3
          py-2
          text-[9px]
          font-medium
          uppercase
          tracking-[0.15em]
          text-white
          opacity-0
          shadow-xl
          backdrop-blur-md
          transition-all
          duration-300
          group-hover:translate-x-0
          group-hover:opacity-100
          translate-x-2
          sm:block
        "
      >
        Chat with SandebTech Marine
      </span>
    </motion.a>
  );
}
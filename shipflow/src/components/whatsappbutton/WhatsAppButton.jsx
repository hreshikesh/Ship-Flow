import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "9108994209";

export default function WhatsAppButton() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with SandebTech on WhatsApp"
      initial={{ opacity: 0, scale: 0.7, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: 1,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      className="
        group
        fixed
        bottom-5
        right-5
        z-[90]
        flex
        h-14
        w-14
        items-center
        justify-center
        rounded-full
        bg-[#25D366]
        text-white
        shadow-[0_8px_30px_rgba(37,211,102,0.28)]
        transition-shadow
        duration-300
        hover:shadow-[0_10px_40px_rgba(37,211,102,0.42)]
        sm:bottom-7
        sm:right-7
        sm:h-15
        sm:w-15
      "
    >
      {/* Pulse */}
      <span
        className="
          absolute
          inset-0
          -z-10
          rounded-full
          bg-[#25D366]
          opacity-30
          animate-ping
        "
      />

      {/* Icon */}
      <MessageCircle
        size={25}
        strokeWidth={2.2}
        className="transition-transform duration-300 group-hover:rotate-[-8deg]"
      />

      {/* Tooltip */}
      <span
        className="
          pointer-events-none
          absolute
          right-[calc(100%+10px)]
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
        "
      >
        Chat with SandebTech
      </span>
    </motion.a>
  );
}
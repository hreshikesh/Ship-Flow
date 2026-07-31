// FloatingParticles.jsx
import { motion } from "framer-motion";

const particles = [...Array(24)];

export default function FloatingParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((_, i) => {
        const size = Math.random() > 0.7 ? 2 : 1;
        const isBlue = Math.random() > 0.5;
        
        return (
          <motion.span
            key={i}
            initial={{
              y: "100vh",
              opacity: 0,
              x: `${Math.random() * 100}%`,
            }}
            animate={{
              y: "-20vh",
              opacity: [0, 0.8, 0.6, 0],
              scale: [0, 1, 1, 0.5],
            }}
            transition={{
              repeat: Infinity,
              duration: 14 + Math.random() * 10,
              delay: Math.random() * 8,
              ease: "linear",
            }}
            className={`absolute rounded-full ${
              isBlue ? "bg-[#6FC3DF]" : "bg-[#38BDF8]"
            } blur-[1px]`}
            style={{
              height: `${size}px`,
              width: `${size}px`,
            }}
          />
        );
      })}
    </div>
  );
}
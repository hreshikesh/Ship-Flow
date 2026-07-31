import { useState } from "react";
import { motion } from "framer-motion";
import FlipFront from "./FlipFront";
import FlipBack from "./FlipBack";

export default function FlipCard({ module, index }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.55, duration: 5 }}
      className="w-full h-[520px] perspective"
    >
      <motion.div
        onMouseEnter={() => setFlipped(true)}
        onMouseLeave={() => setFlipped(false)}
        onClick={() => setFlipped((prev) => !prev)}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          transformStyle: "preserve-3d",
        }}
        className="relative w-full h-full will-change-transform"
      >
        <FlipFront module={module} />
        <FlipBack module={module} />
      </motion.div>
    </motion.div>
  );
}
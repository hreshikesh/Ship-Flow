import { motion } from "framer-motion";
import { Anchor } from "lucide-react";

export default function SectionHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="gp-header"
    >
      <div className="gp-header-badge">
        <Anchor size={14} color="#6FC3DF" />
        <span>Worldwide Presence</span>
      </div>

      <h2>
        Trusted <span className="highlight">Globally</span>
      </h2>

      <p>
        Used at leading shipyards, design offices and universities 
        worldwide since 1992.
      </p>
    </motion.div>
  );
}
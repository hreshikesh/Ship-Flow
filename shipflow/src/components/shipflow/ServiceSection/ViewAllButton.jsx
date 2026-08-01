import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function ViewAllButton() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mt-12 flex justify-center sm:mt-14 lg:mt-16"
    >
      <button className="group inline-flex items-center gap-2.5 
      rounded-full border border-cyan-400/35 bg-cyan-400/10 
      px-6 py-3 text-sm font-medium text-white 
      transition-all duration-300 
      hover:border-cyan-400 hover:bg-cyan-400 hover:text-[#04101F] 
      sm:px-8 sm:py-3.5">
        View All Services
        <ArrowRight
          size={18}
          className="transition-transform duration-300 group-hover:translate-x-1.5"
        />
      </button>
    </motion.div>
  );
}
// SimulationSection.jsx
import SectionHeader from "./SectionHeader";
import SimulationGrid from "./SimulationGrid";
import { motion } from "framer-motion";

export default function SimulationSection() {
  return (
    <section
      className="relative overflow-hidden bg-[#02070D] py-10 sm:py-12 md:py-12 lg:py-12"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(111,195,223,.08),transparent_70%)]" />
      
      {/* Animated Grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(111,195,223,.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(111,195,223,.4) 1px, transparent 1px)
          `,
          backgroundSize: "clamp(40px, 6vw, 60px) clamp(40px, 6vw, 60px)",
        }}
      />

      {/* Ambient Glow */}
      <div className="absolute left-1/4 top-1/4 h-[400px] w-[400px] rounded-full bg-[#38BDF8]/10 blur-[150px]" />
      <div className="absolute right-1/4 bottom-1/4 h-[350px] w-[350px] rounded-full bg-[#0EA5E9]/8 blur-[150px]" />

      {/* Floating Waves */}
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity,
          ease: "easeInOut" 
        }}
        className="absolute left-0 top-1/3 h-1 w-full bg-gradient-to-r from-transparent via-[#6FC3DF]/20 to-transparent"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <SectionHeader />
        <SimulationGrid />
      </div>
    </section>
  );
}
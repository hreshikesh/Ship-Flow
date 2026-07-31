// AboutGrid.jsx
import { aboutFeatures } from "./aboutData";
import FeatureCard from "./FeatureCard";
import { motion } from "framer-motion";

export default function AboutGrid() {
  return (
    <div className="relative mt-16 sm:mt-20 md:mt-24 lg:mt-28">
      {/* Vertical dividers between cards */}
      <div className="absolute left-1/4 top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-[#6FC3DF]/20 to-transparent xl:block" />
      <div className="absolute left-1/2 top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-[#6FC3DF]/30 to-transparent md:block" />
      <div className="absolute left-3/4 top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-[#6FC3DF]/20 to-transparent xl:block" />

      {/* Marine-themed decorative elements */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute -left-8 top-1/2 hidden h-16 w-16 -translate-y-1/2 rounded-full border-2 border-dashed border-[#6FC3DF]/20 lg:block"
      />
      
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute -right-8 top-1/2 hidden h-20 w-20 -translate-y-1/2 rounded-full border-2 border-dashed border-[#38BDF8]/20 lg:block"
      />

      {/* Grid layout - 4 columns on large screens, 2 on medium, 1 on mobile */}
      <div className="grid gap-4 sm:gap-5 md:grid-cols-2 md:gap-6 xl:grid-cols-4 xl:gap-5">
        {aboutFeatures.map((feature, index) => (
          <FeatureCard
            key={feature.id}
            feature={feature}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
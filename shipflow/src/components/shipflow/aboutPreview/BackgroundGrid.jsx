// BackgroundGrid.jsx
import { motion } from "framer-motion";

export default function BackgroundGrid() {
  return (
    <>
      {/* Background */}
      <div className="absolute inset-0 bg-[#02070D]" />

      {/* Radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(111,195,223,.12),transparent_60%)]" />

      {/* Blueprint Grid - responsive sizing */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(111,195,223,.25) 1px, transparent 1px),
            linear-gradient(90deg, rgba(111,195,223,.25) 1px, transparent 1px)
          `,
          backgroundSize: "clamp(50px, 7vw, 70px) clamp(50px, 7vw, 70px)",
        }}
      />

      {/* Moving Scan - slower, smoother */}
      <motion.div
        animate={{ y: ["-100%", "100%"] }}
        transition={{
          repeat: Infinity,
          duration: 12,
          ease: "linear",
        }}
        className="absolute inset-x-0 h-48 bg-gradient-to-b from-transparent via-[#6FC3DF]/8 to-transparent blur-3xl"
      />

      {/* Ambient glows - responsive positioning */}
      <div className="absolute left-0 top-1/3 h-[300px] w-[300px] rounded-full bg-[#38BDF8]/8 blur-[150px] 
        sm:h-[400px] sm:w-[400px]
        lg:h-[500px] lg:w-[500px] lg:blur-[180px]" />

      <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-[#0EA5E9]/6 blur-[150px]
        sm:h-[380px] sm:w-[380px]
        lg:h-[450px] lg:w-[450px] lg:blur-[180px]" />

      {/* Marine-themed corner accents */}
      <div className="absolute left-8 top-8 h-24 w-24 border-l-2 border-t-2 border-[#6FC3DF]/10 hidden sm:block" />
      <div className="absolute right-8 bottom-8 h-24 w-24 border-b-2 border-r-2 border-[#6FC3DF]/10 hidden sm:block" />
    </>
  );
}
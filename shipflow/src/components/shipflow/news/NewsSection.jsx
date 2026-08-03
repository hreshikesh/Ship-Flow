// NewsSection.jsx
import { motion } from "framer-motion";
import { ArrowRight, Package } from "lucide-react";
import NewsCard from "./NewsCard";

const news = [
  {
    type: "Publication",
    title: "Tokyo 2015 Workshop on CFD in Ship Hydrodynamics",
    description:
      "Verification and validation studies for resistance and self-propulsion simulations using advanced CFD methods.",
    date: "May 7, 2026",
  },
  {
    type: "Publication",
    title: "CFD Predictions for JAPAN Bulk Carrier",
    description:
      "Resistance and propulsion predictions with and without Energy Saving Devices for modern bulk carrier designs.",
    date: "May 7, 2026",
  },
  {
    type: "Video Tutorial",
    title: "Results Visualization in SHIPFLOW",
    description:
      "Learn post-processing techniques and visualization workflows inside SHIPFLOW's integrated environment.",
    date: "May 6, 2026",
  },
];

export default function NewsSection() {
  return (
    <section className="relative overflow-hidden bg-[#050d17] py-24 sm:py-28">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-1/3 h-[500px] w-[500px] rounded-full bg-cyan-500/[0.04] blur-3xl" />
        <div className="absolute right-0 bottom-1/3 h-[400px] w-[400px] rounded-full bg-violet-500/[0.03] blur-3xl" />

        {/* Port grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(6,182,212,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,.3) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center sm:mb-20"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 backdrop-blur-sm">
            <Package size={12} className="text-cyan-400" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-cyan-400 sm:text-xs">
              Latest Updates
            </span>
          </div>

          <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            News from the{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              ShipFlow
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
            Publications, research papers and tutorials from the SHIPFLOW
            development team — hover to unlock the container.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {news.map((item, index) => (
            <NewsCard key={index} item={item} index={index} />
          ))}
        </div>

        {/* View all button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-16 flex justify-center"
        >
          <button className="group relative flex items-center gap-2.5 overflow-hidden rounded-full border border-cyan-500/30 bg-cyan-500/5 px-6 py-3 text-sm font-semibold text-cyan-400 transition hover:border-cyan-400 hover:bg-cyan-500 hover:text-white">
            View All Updates
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>
        </motion.div>
      </div>

      {/* Ground / dock line at bottom */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
    </section>
  );
}
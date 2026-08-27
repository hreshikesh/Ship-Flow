import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Download, Cpu, HelpCircle } from "lucide-react";

export default function CaesesPortalBanner() {
  return (
    <section className="relative overflow-hidden bg-[#05080d] py-10 text-white md:py-14">
      {/* Background radial glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/[0.03] blur-[100px]" />
      
      <div className="relative mx-auto max-w-[1300px] px-5 sm:px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-xl border border-white/[0.07] bg-gradient-to-br from-[#081019] via-[#0a1420] to-[#071019] p-5 sm:rounded-2xl sm:p-7 md:p-8"
        >
          {/* Accent corner decorative graphics */}
          <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-cyan-400/[0.02] blur-xl" />
          
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            
            {/* Left Content Column */}
            <div className="max-w-2xl">
              <div className="mb-2.5 flex items-center gap-2">
                <div className="flex h-5 w-5 items-center justify-center rounded-md border border-cyan-400/20 bg-cyan-400/[0.06] text-cyan-400">
                  <Cpu size={11} strokeWidth={2} />
                </div>
                <span className="text-[9px] font-bold tracking-[0.2em] text-cyan-400 uppercase">
                  OFFICIAL PORTALS
                </span>
              </div>
              
              <h2 className="text-lg font-semibold tracking-[-0.02em] text-white sm:text-xl md:text-2xl">
                CAESES Download &amp; Support
              </h2>
              
              <p className="mt-2 text-xs leading-5 text-slate-400 sm:text-sm sm:leading-6">
                Get direct access to software downloads, technical updates, licensing resources, and friendship systems support documentation.
              </p>
            </div>

            {/* Right Action Column — Dual Buttons */}
            <div className="flex w-full flex-wrap gap-2.5 sm:w-auto sm:flex-nowrap">
              {/* Download Button */}
              <motion.a
                whileHover={{ scale: 1.01, y: -0.5 }}
                whileTap={{ scale: 0.99 }}
                href="https://www.caeses.com/download"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex w-full items-center justify-center gap-2 rounded-lg bg-cyan-400 px-4 py-2.5 text-xs font-semibold text-[#05080d] transition-all duration-300 hover:bg-cyan-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.15)] sm:w-auto"
              >
                <Download size={13} className="transition-transform duration-300 group-hover:translate-y-0.5" />
                <span>Download CAESES</span>
                <ArrowUpRight size={13} className="opacity-60 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </motion.a>

              {/* Support Button */}
              <motion.a
                whileHover={{ scale: 1.01, y: -0.5 }}
                whileTap={{ scale: 0.99 }}
                href="https://www.caeses.com/support"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.02] px-4 py-2.5 text-xs font-semibold text-slate-300 transition-all duration-300 hover:border-white/20 hover:text-white sm:w-auto"
              >
                <HelpCircle size={13} className="text-slate-400 transition-colors duration-300 group-hover:text-cyan-400" />
                <span>Official Support</span>
                <ArrowUpRight size={13} className="opacity-40 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </motion.a>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
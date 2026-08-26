import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Ship,
  Waves,
  Gauge,
  CheckCircle2,
  FileText,
  ArrowUpRight,
  Eye,
  Wind,
  Anchor,
  Compass,
} from "lucide-react";
import PdfViewerModal from "../../pdf/PdfViewerModal";
import shipflowOverviewPdf from "../../../../assets/pdf/SHIPFLOW CFD Service.pdf";

const CAPABILITIES = [
  {
    title: "Ship Hulls & Vessel Types",
    desc: "Cruise, bulk carriers, naval vessels, RoPax, SWATH, and twin-skeg hull forms.",
    icon: Ship,
  },
  {
    title: "Propellers & Propulsion",
    desc: "Tip rake, variable pitch, outboard, and surface-piercing propulsor designs.",
    icon: Compass,
  },
  {
    title: "Power & Resistance Prediction",
    desc: "Total resistance, self-propulsion, and delivered power calculations.",
    icon: Gauge,
  },
  {
    title: "Seakeeping & Waves",
    desc: "Ship motions and added resistance in waves (EEDI weather factor).",
    icon: Waves,
  },
  {
    title: "Wind-Assisted Propulsion",
    desc: "Hydrodynamic interaction for Flettner rotors and wing-sail-equipped vessels.",
    icon: Wind,
  },
  {
    title: "Appendages & ESDs",
    desc: "Energy Saving Devices, ducts, fins, rudders, and offshore structures.",
    icon: Anchor,
  },
];

const SOLVERS = [
  {
    name: "XPAN",
    type: "Potential Flow",
    desc: "Rapid panel method for wave resistance, surface elevation, and hull ranking in seconds.",
    speed: "Seconds",
    color: "from-cyan-500/20 to-blue-500/10",
  },
  {
    name: "XCHAP",
    type: "Viscous RANS Solver",
    desc: "Resolves boundary layers, stern wake fields, and viscous resistance with precision.",
    speed: "Minutes",
    color: "from-blue-500/20 to-sky-500/10",
  },
  {
    name: "MOTIONS",
    type: "Time-Dependent Solver",
    desc: "Predicts seakeeping, pitch/heave responses, and added resistance in real seaways.",
    speed: "Hours",
    color: "from-teal-500/20 to-cyan-500/10",
  },
];

export default function ShipflowServicesSection() {
  const [isPdfOpen, setIsPdfOpen] = useState(false);

  const documentData = {
    title: "SHIPFLOW Ship Hydrodynamics CFD Overview",
    subtitle:
      "Solver modules, automatic grid generation, and the resistance-to-delivered-power workflow.",
    pdfUrl: shipflowOverviewPdf,
  };

  return (
    <section className="relative overflow-hidden bg-[#02070d] py-16 sm:py-24 lg:py-32">
      {/* Background glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30"
        style={{
          background:
            "radial-gradient(ellipse, rgba(6,182,212,0.15), transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(103,232,249,.7) 1px, transparent 1px),
            linear-gradient(90deg, rgba(103,232,249,.7) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.22em] text-cyan-300 sm:px-4 sm:py-1.5 sm:text-[10px] sm:tracking-[0.28em]"
          >
            SHIPFLOW CFD Consulting
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-2xl font-bold leading-tight text-white sm:mt-5 sm:text-4xl lg:text-5xl"
          >
            Expert CFD consulting to optimize{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-sky-300 to-blue-400 bg-clip-text text-transparent">
              your vessel designs.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-xs leading-relaxed text-slate-400 sm:mt-5 sm:text-base lg:text-lg"
          >
            Decrease fuel consumption, reduce operational downtime, and maximize
            speed.{" "}
            <strong className="text-slate-200">SHIPFLOW from FLOWTECH</strong> is
            the world standard for ship hydrodynamics CFD — grids are generated
            automatically from the hull shape, presenting data the naval
            architect&apos;s way.
          </motion.p>
        </div>

        {/* =====================================================
            KPI / STATS — always 3 in a row
        ====================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          className="mt-8 grid grid-cols-3 gap-2 sm:mt-12 sm:gap-4 lg:gap-6"
        >
          <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] p-3 text-center backdrop-blur-xl sm:rounded-2xl sm:p-6">
            <div className="text-lg font-extrabold text-cyan-300 sm:text-3xl lg:text-4xl">
              5%+
            </div>
            <div className="mt-1 text-[8px] font-semibold uppercase leading-tight tracking-wide text-slate-400 sm:mt-1.5 sm:text-xs sm:tracking-wider">
              Typical Energy Savings
            </div>
            <p className="mt-0.5 hidden text-[11px] text-slate-500 sm:block">
              Fuel reduction through ESDs & hull tuning
            </p>
          </div>

          <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] p-3 text-center backdrop-blur-xl sm:rounded-2xl sm:p-6">
            <div className="text-lg font-extrabold text-cyan-300 sm:text-3xl lg:text-4xl">
              100%
            </div>
            <div className="mt-1 text-[8px] font-semibold uppercase leading-tight tracking-wide text-slate-400 sm:mt-1.5 sm:text-xs sm:tracking-wider">
              Automatic Grids
            </div>
            <p className="mt-0.5 hidden text-[11px] text-slate-500 sm:block">
              Zero manual meshing required
            </p>
          </div>

          <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] p-3 text-center backdrop-blur-xl sm:rounded-2xl sm:p-6">
            <div className="text-lg font-extrabold text-cyan-300 sm:text-3xl lg:text-4xl">
              35+ Yrs
            </div>
            <div className="mt-1 text-[8px] font-semibold uppercase leading-tight tracking-wide text-slate-400 sm:mt-1.5 sm:text-xs sm:tracking-wider">
              Validated Accuracy
            </div>
            <p className="mt-0.5 hidden text-[11px] text-slate-500 sm:block">
              Built by naval architects for naval architects
            </p>
          </div>
        </motion.div>

        {/* =====================================================
            SOLVERS — always 3 in a row
        ====================================================== */}
        <div className="mt-12 sm:mt-16 lg:mt-20">
          <div className="mb-5 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-cyan-400 sm:text-[10px] sm:tracking-[0.25em]">
                Zonal CFD Solver Suite
              </span>
              <h3 className="mt-1 text-lg font-bold text-white sm:text-2xl lg:text-3xl">
                The SHIPFLOW Zonal Approach
              </h3>
            </div>
            <a
              href="https://www.flowtech.se/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-semibold text-cyan-300 transition hover:border-cyan-400/40 hover:bg-cyan-400/10 sm:px-4 sm:py-2 sm:text-xs"
            >
              <span>SHIPFLOW by FLOWTECH</span>
              <ArrowUpRight size={12} className="sm:h-3.5 sm:w-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:gap-6">
            {SOLVERS.map((solver, idx) => (
              <motion.div
                key={solver.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`relative flex flex-col justify-between overflow-hidden rounded-xl border border-cyan-500/20 bg-gradient-to-b ${solver.color} p-2.5 backdrop-blur-xl sm:rounded-2xl sm:p-5 lg:p-6`}
              >
                <div>
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <span className="w-fit rounded border border-cyan-400/30 bg-cyan-400/10 px-1.5 py-0.5 text-[7px] font-bold uppercase tracking-wide text-cyan-300 sm:rounded-md sm:px-2.5 sm:py-1 sm:text-[9px] sm:tracking-wider">
                      {solver.type}
                    </span>
                    <span className="text-[8px] font-mono text-slate-400 sm:text-[10px]">
                      ~{solver.speed}
                    </span>
                  </div>

                  <h4 className="mt-2 text-sm font-bold tracking-tight text-white sm:mt-4 sm:text-xl lg:text-2xl">
                    {solver.name}
                  </h4>
                  <p className="mt-1 text-[9px] leading-snug text-slate-300 sm:mt-2 sm:text-xs sm:leading-relaxed">
                    {solver.desc}
                  </p>
                </div>

                <div className="mt-3 flex items-center gap-1 border-t border-white/10 pt-2 text-[8px] font-semibold text-cyan-300/80 sm:mt-6 sm:gap-2 sm:pt-4 sm:text-[10px]">
                  <CheckCircle2 size={10} className="shrink-0 text-cyan-400 sm:h-3 sm:w-3" />
                  <span className="leading-tight">Naval Architect Workflow</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* =====================================================
            CAPABILITIES — always 3 in a row (2 rows)
        ====================================================== */}
        <div className="mt-12 sm:mt-16 lg:mt-20">
          <div className="mb-5 sm:mb-8">
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-cyan-400 sm:text-[10px] sm:tracking-[0.25em]">
              Scope & Applications
            </span>
            <h3 className="mt-1 text-lg font-bold text-white sm:text-2xl lg:text-3xl">
              SHIPFLOW Hydrodynamic Capabilities
            </h3>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:gap-5">
            {CAPABILITIES.map((cap, i) => {
              const IconComp = cap.icon;
              return (
                <motion.div
                  key={cap.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="group relative flex flex-col items-start gap-2 rounded-xl border border-white/10 bg-white/[0.02] p-2.5 transition-all duration-300 hover:border-cyan-400/30 hover:bg-white/[0.04] sm:flex-row sm:gap-4 sm:rounded-2xl sm:p-5"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-400/10 text-cyan-300 transition-colors group-hover:border-cyan-400/40 group-hover:bg-cyan-400/20 sm:h-11 sm:w-11 sm:rounded-xl">
                    <IconComp size={14} className="sm:h-5 sm:w-5" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-[10px] font-bold leading-snug text-white group-hover:text-cyan-200 sm:text-sm">
                      {cap.title}
                    </h4>
                    <p className="mt-0.5 text-[8px] leading-snug text-slate-400 sm:mt-1 sm:text-xs sm:leading-relaxed">
                      {cap.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* =====================================================
            TECHNICAL DOCUMENT CARD
        ====================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-12 overflow-hidden rounded-2xl border border-cyan-500/25 bg-gradient-to-r from-[#03101c] via-[#041525] to-[#03101c] p-4 shadow-[0_0_40px_rgba(6,182,212,0.1)] sm:mt-16 sm:rounded-3xl sm:p-8 md:p-10"
        >
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
            <div className="flex min-w-0 items-start gap-3 sm:gap-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-400/10 text-cyan-300 shadow-inner sm:h-14 sm:w-14 sm:rounded-2xl">
                <FileText size={22} className="sm:h-7 sm:w-7" />
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded bg-cyan-400/20 px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider text-cyan-300 sm:text-[9px]">
                    Technical Document
                  </span>
                  <span className="text-[9px] text-slate-400 sm:text-[10px]">
                    PDF Overview
                  </span>
                </div>

                <h4 className="mt-1.5 text-base font-bold leading-snug text-white sm:mt-2 sm:text-xl md:text-2xl">
                  {documentData.title}
                </h4>

                <p className="mt-1 text-[11px] leading-relaxed text-slate-400 sm:mt-1.5 sm:text-sm">
                  {documentData.subtitle}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => setIsPdfOpen(true)}
                className="flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2.5 text-[11px] font-semibold text-cyan-300 transition-colors hover:border-cyan-400/60 hover:bg-cyan-400/20 sm:px-5 sm:py-3 sm:text-xs"
              >
                <Eye size={14} />
                <span>View Overview</span>
              </button>

              <a
                href="https://www.flowtech.se/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-[11px] font-semibold text-slate-300 transition-colors hover:border-white/20 hover:text-white sm:px-5 sm:py-3 sm:text-xs"
              >
                <span>FLOWTECH Official</span>
                <ArrowUpRight size={13} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      <PdfViewerModal
        isOpen={isPdfOpen}
        onClose={() => setIsPdfOpen(false)}
        pdfUrl={documentData.pdfUrl}
        title={documentData.title}
      />
    </section>
  );
}
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Users,
  ChevronRight,
  Cpu,
  ArrowRight,
  Ship,
  Waves,
  Zap,
  FileText,
  Video,
  CloudDownload,
} from "lucide-react";

import OrbitImages from "../../../component/OrbitImages";

import hardware from "../../../assets/images/naval-architect/naval1.png";
import docs from "../../../assets/images/naval-architect/naval2.png";
import video from "../../../assets/images/naval-architect/naval3.png";
import download from "../../../assets/images/naval-architect/naval4.png";
import logo from "../../../assets/images/logo/image.png";

const orbitImages = [hardware, docs, video, download];

const analysis = [
  {
    title: "SHIPFLOW BASIC",
    desc: "Potential flow solver for wave resistance, sinkage and trim calculations",
    icon: Ship,
    color: "#38BDF8",
  },
  {
    title: "SHIPFLOW RANS",
    desc: "RANS CFD solver for viscous flow analysis and total resistance prediction",
    icon: Zap,
    color: "#6FC3DF",
  },
  {
    title: "SHIPFLOW MOTIONS",
    desc: "Time-dependent solver for seakeeping and motion analysis in waves",
    icon: Waves,
    color: "#67E8F9",
  },
];

const resources = [
  {
    id: "hardware",
    icon: Cpu,
    title: "System Requirements",
    desc: "Hardware specifications for SHIPFLOW",
    details:
      "Minimum and recommended system requirements for optimal performance",
    color: "#38BDF8",
    image: hardware,
  },
  {
    id: "docs",
    icon: FileText,
    title: "User Manual",
    desc: "Complete SHIPFLOW documentation",
    details:
      "Installation guide, theory manual, and user reference documentation",
    color: "#6FC3DF",
    image: docs,
  },
  {
    id: "videos",
    icon: Video,
    title: "Tutorial Videos",
    desc: "Learn SHIPFLOW workflow",
    details:
      "Step-by-step tutorials covering basic to advanced SHIPFLOW usage",
    color: "#67E8F9",
    image: video,
  },
  {
    id: "downloads",
    icon: CloudDownload,
    title: "Software Download",
    desc: "Get SHIPFLOW installer",
    details: "Latest SHIPFLOW version with all modules and example cases",
    color: "#93C5FD",
    image: download,
  },
];

export default function NavalArchitects() {
  const [activeResource, setActiveResource] = useState(resources[0]);

  return (
    <section
      className="relative min-h-screen overflow-hidden bg-[#02070D] py-20 sm:py-28 lg:py-36"
      style={{ contentVisibility: "auto", containIntrinsicSize: "1600px" }}
    >
      {/* ============ BACKGROUND EFFECTS ============ */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(56,189,248,0.10) 0%, transparent 60%)",
            filter: "blur(80px)",
          }}
        />

        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(56,189,248,.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(56,189,248,.2) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="absolute left-0 top-1/4 h-px w-full bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent" />
        <div className="absolute left-0 bottom-1/4 h-px w-full bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ============ HERO SECTION ============ */}
        <div className="mb-16 flex flex-col items-center text-center sm:mb-20">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-6 inline-flex items-center gap-3 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-5 py-2 backdrop-blur-sm sm:px-6 sm:py-2.5"
          >
            <Users className="h-3.5 w-3.5 text-cyan-300 sm:h-4 sm:w-4" />
            <span className="font-bold text-[10px] uppercase tracking-[0.35em] text-cyan-300 sm:text-xs">
              SHIPFLOW CFD Platform
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="mb-6 text-4xl font-bold text-white sm:text-5xl lg:text-7xl"
          >
            For Naval{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-cyan-400 to-cyan-300 bg-clip-text text-transparent">
              Architects
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg lg:text-xl"
          >
            Professional CFD software for ship hydrodynamics, resistance,
            propulsion and seakeeping analysis.
          </motion.p>
        </div>

        {/* ============ MAIN CONTENT GRID ============ */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-start">
          {/* ============ LEFT — MODULES ============ */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="order-2 lg:order-1"
          >
            <div className="mb-8">
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px w-10 bg-cyan-400/30" />
                <span className="font-bold text-[10px] uppercase tracking-[0.4em] text-cyan-300 sm:text-xs">
                  CFD Modules
                </span>
              </div>
              <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                SHIPFLOW
                <br />
                <span className="bg-gradient-to-r from-cyan-300 to-cyan-400 bg-clip-text text-transparent">
                  Solutions
                </span>
              </h2>
            </div>

            <div className="space-y-4">
              {analysis.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: index * 0.12, duration: 0.5 }}
                    className="group relative overflow-hidden rounded-2xl border border-cyan-400/10 bg-[#06111E]/50 p-5 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/30 hover:bg-cyan-400/[0.03] hover:translate-x-2"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <div className="grid h-11 w-11 place-items-center rounded-full border border-cyan-400/20 bg-cyan-400/10 transition-transform group-hover:scale-110">
                          <Icon size={18} className="text-cyan-300" />
                        </div>
                        {index !== analysis.length - 1 && (
                          <div className="mt-2 h-12 w-px bg-gradient-to-b from-cyan-400/30 to-transparent" />
                        )}
                      </div>

                      <div className="flex-1 pt-1">
                        <h3 className="mb-2 text-lg font-bold text-white">
                          {item.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-slate-400">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <motion.a
              href="#"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.5 }}
              className="group mt-8 inline-flex items-center gap-3 rounded-xl border border-cyan-400/30 bg-gradient-to-r from-cyan-400/10 to-transparent px-6 py-3 text-sm font-medium text-cyan-300 transition-all hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(56,189,248,.15)]"
            >
              Learn More About SHIPFLOW
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </motion.a>
          </motion.div>

          {/* ============ RIGHT — ORBIT + RESOURCE CARD ============ */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="order-1 lg:order-2"
          >
            {/* ============ ORBIT SECTION ============ */}
            <div className="relative mb-8 flex items-center justify-center">
              {/* Background rings */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
                  className="absolute h-[520px] w-[520px] rounded-full border border-dashed border-cyan-400/10"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ repeat: Infinity, duration: 45, ease: "linear" }}
                  className="absolute h-[400px] w-[400px] rounded-full border border-dashed border-cyan-400/[0.08]"
                />
              </div>

              {/* Ambient glow */}
              <div
                className="pointer-events-none absolute h-[400px] w-[400px] rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 60%)",
                  filter: "blur(60px)",
                }}
              />

              <OrbitImages
                images={orbitImages}
                responsive
                shape="circle"
                radius={240}
                itemSize={100}
                duration={30}
                rotation={0}
                baseWidth={640}
                centerContent={
                  <div className="relative">
                    {/* ============ AMBIENT GLOWS ============ */}
                    <motion.div
                      animate={{
                        scale: [1, 1.15, 1],
                        opacity: [0.4, 0.7, 0.4],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 4,
                        ease: "easeInOut",
                      }}
                      className="absolute inset-0 -m-8 rounded-full bg-cyan-400/25 blur-3xl"
                    />

                    <motion.div
                      animate={{ scale: [1, 1.08, 1] }}
                      transition={{
                        repeat: Infinity,
                        duration: 3,
                        ease: "easeInOut",
                      }}
                      className="absolute inset-0 -m-4 rounded-full bg-cyan-400/20 blur-2xl"
                    />

                    {/* ============ MAIN HUB — LOGO FILLS IT ============ */}
                    <div className="relative flex h-40 w-40 items-center justify-center rounded-full border border-cyan-400/40 bg-gradient-to-br from-[#04101F] via-[#02070D] to-[#020A14] shadow-[0_0_60px_rgba(6,182,212,0.25)] backdrop-blur-2xl sm:h-48 sm:w-48">
                      {/* Rotating dashed inner ring */}
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          repeat: Infinity,
                          duration: 25,
                          ease: "linear",
                        }}
                        className="absolute inset-2 rounded-full border border-dashed border-cyan-400/30"
                      />

                      {/* Compass ticks — 8 points */}
                      <div className="pointer-events-none absolute inset-0 rounded-full">
                        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                          <div
                            key={deg}
                            className="absolute left-1/2 top-1/2"
                            style={{
                              transform: `rotate(${deg}deg) translateY(-${80}px)`,
                            }}
                          >
                            <div
                              className={
                                deg % 90 === 0
                                  ? "h-3 w-px bg-cyan-400/70"
                                  : "h-1.5 w-px bg-cyan-400/30"
                              }
                            />
                          </div>
                        ))}
                      </div>

                      {/* ============ LOGO FILLS THE HUB ============ */}
                      <motion.img
                        src={logo}
                        alt="SHIPFLOW"
                        animate={{ scale: [1, 1.03, 1] }}
                        transition={{
                          repeat: Infinity,
                          duration: 4,
                          ease: "easeInOut",
                        }}
                        className="relative z-10 h-24 w-24 object-contain sm:h-32 sm:w-32"
                        style={{
                          filter:
                            "brightness(0) invert(1) drop-shadow(0 0 12px rgba(6,182,212,0.6)) drop-shadow(0 0 24px rgba(6,182,212,0.3))",
                        }}
                      />


                    </div>
                  </div>
                }
              />
            </div>

            {/* ============ RESOURCE CARD ============ */}
            <motion.div
              key={activeResource.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative overflow-hidden rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-[#06111E]/90 to-[#02070D]/90 p-6 backdrop-blur-2xl sm:p-8"
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.08]"
                style={{
                  backgroundImage: `
                    linear-gradient(45deg, rgba(56,189,248,.15) 1px, transparent 1px),
                    linear-gradient(-45deg, rgba(56,189,248,.15) 1px, transparent 1px)
                  `,
                  backgroundSize: "20px 20px",
                }}
              />

              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500" />

              <div className="relative z-10">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="grid h-12 w-12 place-items-center rounded-xl border border-cyan-400/20 bg-cyan-400/10">
                      <activeResource.icon size={22} className="text-cyan-300" />
                    </div>
                    <div>
                      <p className="font-bold text-[10px] uppercase tracking-[0.35em] text-cyan-300">
                        Resource
                      </p>
                      <h3 className="mt-1 text-lg font-bold text-white sm:text-xl">
                        {activeResource.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-emerald-400">
                      Available
                    </span>
                  </div>
                </div>

                <p className="mb-4 text-sm text-slate-400 sm:text-base">
                  {activeResource.desc}
                </p>

                <div className="mb-6 rounded-xl border border-cyan-400/10 bg-black/30 p-4">
                  <p className="text-xs leading-relaxed text-slate-300 sm:text-sm">
                    {activeResource.details}
                  </p>
                </div>

                <a
                  href="#"
                  className="group flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-500/25 transition hover:shadow-xl hover:shadow-cyan-500/40"
                >
                  {activeResource.id === "downloads"
                    ? "Contact for Download"
                    : "View Resource"}
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* ============ RESOURCES GRID (BOTTOM) ============ */}
        <div className="mt-24 lg:mt-32">
          <div className="mb-12 text-center">
            <div className="mb-4 inline-flex items-center gap-3">
              <div className="h-px w-8 bg-cyan-400/30" />
              <span className="font-bold text-[10px] uppercase tracking-[0.4em] text-cyan-300 sm:text-xs">
                Resources
              </span>
              <div className="h-px w-8 bg-cyan-400/30" />
            </div>
            <h3 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
              Documentation & Support
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-6 xl:grid-cols-4 xl:gap-6">
            {resources.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeResource.id === item.id;
              return (
                <motion.button
                  key={item.id}
                  type="button"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: index * 0.08, duration: 0.5 }}
                  onClick={() => setActiveResource(item)}
                  className={`group relative overflow-hidden rounded-2xl border p-4 text-left backdrop-blur-xl transition-all duration-300 sm:p-6 ${
                    isActive
                      ? "border-cyan-400/40 bg-cyan-400/10 shadow-[0_0_40px_rgba(56,189,248,.1)]"
                      : "border-cyan-400/10 bg-white/[0.02] hover:border-cyan-400/30 hover:-translate-y-1"
                  }`}
                >
                  {isActive && (
                    <div className="absolute right-3 top-3">
                      <span className="flex h-2 w-2">
                        <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-cyan-400 opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
                      </span>
                    </div>
                  )}

                  <div className="mb-4 inline-flex">
                    <div
                      className={`grid h-10 w-10 place-items-center rounded-xl border transition-all sm:h-12 sm:w-12 ${
                        isActive
                          ? "border-cyan-400/40 bg-cyan-400/15"
                          : "border-cyan-400/20 bg-cyan-400/5 group-hover:border-cyan-400/40 group-hover:bg-cyan-400/10"
                      }`}
                    >
                      <Icon size={20} className="text-cyan-300 sm:h-6 sm:w-6" />
                    </div>
                  </div>

                  <h4 className="mb-2 text-sm font-bold text-white sm:text-base">
                    {item.title}
                  </h4>

                  <p className="text-xs leading-relaxed text-slate-400 sm:text-sm">
                    {item.desc}
                  </p>

                  <div
                    className={`mt-4 flex items-center gap-1 text-xs font-medium transition-all group-hover:gap-2 ${
                      isActive
                        ? "text-cyan-300"
                        : "text-slate-400 group-hover:text-cyan-300"
                    }`}
                  >
                    <span>{item.id === "downloads" ? "Contact" : "View"}</span>
                    <ChevronRight size={14} />
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
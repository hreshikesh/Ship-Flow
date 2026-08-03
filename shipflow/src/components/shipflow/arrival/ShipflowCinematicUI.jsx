import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

import { useArrivalState } from "./arrivalStore";
import ShipflowMarineNav from "../navbar/ShipflowMarineNav";
import logo from "../../../assets/images/logo/image.png";
const ease = [0.22, 1, 0.36, 1];

// ============================================
// 1. BRAND INTRO
// ============================================
function BrandIntro({ visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="shipflow-brand-intro"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease }}
          className="pointer-events-none absolute inset-0 z-[80] overflow-hidden"
        >
          {/* ============ BACKGROUND LAYERS ============ */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(5,20,38,0.88)_0%,rgba(4,14,28,0.72)_32%,rgba(2,7,15,0.48)_64%,rgba(1,4,10,0.2)_100%)]" />

          <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(111,195,223,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(111,195,223,0.15)_1px,transparent_1px)] [background-size:76px_76px]" />

          {/* Scanning line */}
          <motion.div
            initial={{ y: "-20%", opacity: 0 }}
            animate={{ y: "120%", opacity: [0, 0.5, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#6FC3DF]/80 to-transparent"
          />

          {/* ============ CENTERED CONTENT (all stacked) ============ */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
            {/* Logo */}
            <motion.img
              src={logo}
              alt="ShipFlow Logo"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease }}
              className="w-[120px] sm:w-[160px] md:w-[200px] lg:w-[240px] xl:w-[280px]"
              style={{
                filter: "brightness(0) invert(1) drop-shadow(0 0 20px rgba(111,195,223,0.3))",
              }}
            />

            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.35, ease }}
              className="mt-4 text-center text-[9px] uppercase tracking-[0.3em] text-[#6FC3DF]/80 sm:mt-5 sm:text-[10px] sm:tracking-[0.36em] md:text-xs"
            >
              By Naval Architects for Naval Architects
            </motion.div>

            {/* Divider line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 0.65, ease }}
              className="mt-6 h-px w-40 origin-center bg-gradient-to-r from-transparent via-[#6FC3DF]/75 to-transparent sm:mt-7 sm:w-52 md:w-64"
            />

            {/* Scroll prompt */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.36, 0.95, 0.36] }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.1,
              }}
              className="mt-8 text-center text-[9px] uppercase tracking-[0.28em] text-[#6FC3DF]/80 sm:mt-10 sm:text-[10px] sm:tracking-[0.34em]"
            >
              Scroll to enter simulation
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
// ============================================
// 2. SHIPFLOW SUITE PANEL (Right side info)
// ============================================
function ShipflowSuitePanel({ visible }) {
  const modules = [
    {
      title: "BASIC",
      text: "Fast potential-flow hydrodynamics.",
      href: "https://shipflow.se/?page_id=135",
    },
    {
      title: "RANS",
      text: "Viscous CFD for resistance and propulsion.",
      href: "https://shipflow.se/shipflow-rans/",
    },
    {
      title: "MOTIONS",
      text: "Seakeeping and motion prediction.",
      href: "https://shipflow.se/?page_id=136",
    },
    {
      title: "GUI",
      text: "Integrated workflow for simulation projects.",
      href: "https://shipflow.se/shipflow-caeses/",
    },
  ];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease }}
          className="pointer-events-none absolute inset-0 hidden lg:block"
        >
          <motion.svg
            className="absolute right-[4vw] top-[18vh] h-[50vh] w-[46vw]"
            viewBox="0 0 700 460"
            fill="none"
          >
            <defs>
              <linearGradient id="suiteLine" x1="0" y1="0" x2="700" y2="0">
                <stop stopColor="#38BDF8" stopOpacity="0" />
                <stop offset="0.45" stopColor="#6FC3DF" stopOpacity="0.5" />
                <stop offset="1" stopColor="#38BDF8" stopOpacity="0.18" />
              </linearGradient>
              <filter id="suiteGlow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {[0, 1, 2].map((i) => (
              <motion.path
                key={i}
                d={`M24 ${305 - i * 58} C 180 ${200 - i * 34}, 360 ${350 - i * 48}, 665 ${130 + i * 38}`}
                stroke="url(#suiteLine)"
                strokeWidth="1.5"
                strokeDasharray="10 16"
                filter="url(#suiteGlow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  duration: 3,
                  delay: i * 0.18,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.svg>

          <motion.aside
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 24 }}
            transition={{ duration: 0.8, ease }}
            className="pointer-events-auto absolute right-8 top-[22vh] w-[320px] rounded-[2rem] border border-[#6FC3DF]/20 bg-[#030E1C]/75 p-6 shadow-[0_30px_100px_rgba(2,12,27,0.6)] backdrop-blur-2xl"
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-[#6FC3DF]">
                  SHIPFLOW Suite
                </div>
                <div className="mt-1.5 text-xs text-[#93C5FD]/60">
                  Hydrodynamics modules
                </div>
              </div>

              <motion.span
                className="h-2.5 w-2.5 rounded-full bg-[#38BDF8]"
                animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.3, 1] }}
                transition={{ duration: 1.8, repeat: Infinity }}
              />
            </div>

            <div className="grid gap-3.5">
              {modules.map((item, index) => (
                <motion.a
                  key={item.title}
                  href={item.href}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: index * 0.08, ease }}
                  className="group block rounded-2xl border border-[#6FC3DF]/15 bg-[#05162D]/50 p-4 transition-all duration-300 hover:border-[#6FC3DF]/40 hover:bg-[#07203E]/70 hover:shadow-[0_10px_30px_rgba(56,189,248,0.15)]"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#6FC3DF]">
                      SHIPFLOW {item.title}
                    </span>
                    <span className="text-[#93C5FD]/40 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[#38BDF8]">
                      →
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-[#93C5FD]/75">
                    {item.text}
                  </p>
                </motion.a>
              ))}
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ============================================
// 3. RESPONSIVE SUITE CHIP (Mobile/Tablet)
// ============================================
function ResponsiveSuiteChip({ visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.6, ease }}
            className="pointer-events-none absolute right-6 top-24 hidden rounded-2xl border border-[#6FC3DF]/20 bg-[#030E1C]/80 p-4 text-white backdrop-blur-xl md:block lg:hidden"
          >
            <div className="text-[10px] uppercase tracking-[0.24em] text-[#6FC3DF]">
              SHIPFLOW Suite
            </div>
            <div className="mt-2 text-sm text-[#93C5FD]/80">
              BASIC · RANS · MOTIONS · GUI
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.6, ease }}
            className="pointer-events-none absolute right-4 top-24 rounded-2xl border border-[#6FC3DF]/20 bg-[#030E1C]/80 p-3 text-white backdrop-blur-xl md:hidden"
          >
            <div className="text-[9px] uppercase tracking-[0.22em] text-[#6FC3DF]">
              Simulation Suite
            </div>
            <div className="mt-1 text-xs text-[#93C5FD]/80">
              BASIC · RANS · MOTIONS
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}



// ============================================
// 5. MAIN COMPONENT
// ============================================
export default function ShipflowCinematicUI() {
  const {
    introVisible,
    textVisible,
    ctaVisible,
    navVisible,
    routeVisible,
    heroComplete,
    loaderDone,
  } = useArrivalState();

  if (!loaderDone) return null;

  return (
    <>
      {/* Navbar - visible after 100% scroll */}
      <ShipflowMarineNav visible={navVisible} />

      {/* Hero UI - fades out when heroComplete */}
      <motion.div
        animate={{ opacity: heroComplete ? 0 : 1 }}
        transition={{ duration: 0.65, ease }}
        className="pointer-events-none fixed inset-0 z-50 overflow-hidden text-white"
        style={{
          visibility: heroComplete ? "hidden" : "visible",
        }}
      >
        <div className="absolute inset-y-0 left-0 w-[42vw] bg-gradient-to-r from-[#010610]/70 via-[#030E1C]/30 to-transparent md:w-[48vw]" />

        <BrandIntro visible={introVisible && !heroComplete} />
        <ShipflowSuitePanel visible={routeVisible} />
        <ResponsiveSuiteChip visible={routeVisible} />

        <main className="absolute bottom-[9vh] left-4 right-4 max-w-none sm:bottom-[11vh] sm:left-6 sm:right-6 md:bottom-[10vh] md:left-10 md:right-auto md:max-w-[580px] lg:left-16 xl:left-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={textVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, ease }}
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={textVisible ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1.1, ease }}
              className="mb-4 h-px w-20 origin-left bg-gradient-to-r from-[#38BDF8] to-transparent sm:mb-6 sm:w-28 md:w-32"
            />

            <div className="mb-3 text-[9px] uppercase tracking-[0.3em] text-[#6FC3DF] sm:mb-4 sm:text-[10px] sm:tracking-[0.36em] md:text-[11px] md:tracking-[0.4em]">
              Maritime Engineering
            </div>

            <h1
              className="font-semibold text-white text-[clamp(2.6rem,12vw,4.2rem)] sm:text-[clamp(3.2rem,13vw,5.4rem)] md:text-[clamp(3.8rem,8vw,6.5rem)] lg:text-[clamp(4.5rem,7vw,7.5rem)] leading-[1.02] sm:leading-[1] md:leading-[0.95] tracking-[-0.03em] sm:tracking-[-0.04em] md:tracking-[-0.05em] drop-shadow-[0_20px_70px_rgba(0,0,0,0.74)]"
            >
              {["Engineering", "Fluid", "Intelligence"].map((word, index) => (
                <motion.span
                  key={word}
                  className={`
        block relative
        ${index > 0 ? "mt-1 sm:mt-2 md:mt-3" : ""}
        ${word === "Intelligence"
                      ? "bg-gradient-to-r from-white via-[#BAE6FD] to-[#38BDF8] bg-clip-text text-transparent pb-2"
                      : ""
                    }
      `}
                  initial={{ opacity: 0, y: 36, filter: "blur(10px)" }}
                  animate={
                    textVisible
                      ? { opacity: 1, y: 0, filter: "blur(0px)" }
                      : { opacity: 0, y: 36, filter: "blur(10px)" }
                  }
                  transition={{ duration: 1.05, delay: index * 0.14, ease }}
                >
                  {word}
                  {/* Subtle underline accent on "Intelligence" */}
                  {word === "Intelligence" && (
                    <motion.span
                      initial={{ scaleX: 0 }}
                      animate={textVisible ? { scaleX: 1 } : { scaleX: 0 }}
                      transition={{ duration: 1, delay: 0.9, ease }}
                      className="absolute -bottom-1 left-0 h-[3px] w-24 origin-left rounded-full bg-gradient-to-r from-[#38BDF8] to-transparent sm:w-32 md:w-40 md:h-1"
                    />
                  )}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={textVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={{ duration: 1, delay: 0.42, ease }}
              className="mt-4 max-w-[20rem] text-xs font-light leading-relaxed text-[#93C5FD]/85 sm:mt-6 sm:max-w-[21rem] sm:text-sm md:mt-7 md:max-w-md md:text-lg"
            >
              Ship hydrodynamics, resistance prediction and marine simulation for
              modern vessel performance.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={ctaVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: 1, ease }}
            className="mt-5 flex items-center gap-4 sm:mt-7 md:mt-9 md:gap-6"
          >
            <a
              href="https://shipflow.se/products-overview/"
              className="pointer-events-auto group relative inline-flex overflow-hidden rounded-full border border-[#6FC3DF]/30 bg-[#030E1C]/75 px-5 py-3 text-xs font-medium text-white backdrop-blur-xl transition-all duration-300 hover:border-[#38BDF8]/60 sm:px-6 sm:py-3.5 sm:text-sm md:px-8 md:py-4"
            >
              <span className="relative flex items-center gap-2.5 sm:gap-3.5">
                Explore Shipflow
                <span className="grid h-5 w-5 place-items-center rounded-full bg-[#6FC3DF]/20 text-[#38BDF8] transition-transform duration-300 group-hover:translate-x-0.5 sm:h-6 sm:w-6">
                  →
                </span>
              </span>
            </a>
          </motion.div>
        </main>
      </motion.div>
    </>
  );
}
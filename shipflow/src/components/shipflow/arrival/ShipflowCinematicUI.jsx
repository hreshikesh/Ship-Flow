import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { useArrivalState } from "./arrivalStore";

const ease = [0.22, 1, 0.36, 1];

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
          className="pointer-events-none absolute inset-0 z-[80]"
        >
          {/* Focus layer */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(5,20,38,0.88)_0%,rgba(4,14,28,0.72)_32%,rgba(2,7,15,0.48)_64%,rgba(1,4,10,0.2)_100%)]" />

          {/* Scan grid */}
          <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(111,195,223,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(111,195,223,0.15)_1px,transparent_1px)] [background-size:76px_76px]" />

          {/* Scan line */}
          <motion.div
            initial={{ y: "-20%", opacity: 0 }}
            animate={{ y: "120%", opacity: [0, 0.5, 0] }}
            transition={{
              duration: 3.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#6FC3DF]/80 to-transparent"
          />

          {/* Center lockup */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.94,
              y: 20,
              filter: "blur(12px)",
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              filter: "blur(0px)",
            }}
            exit={{
              opacity: 0,
              scale: 1.06,
              filter: "blur(12px)",
            }}
            transition={{ duration: 1.15, ease }}
            className="absolute left-1/2 top-1/2 flex w-[min(760px,88vw)] -translate-x-1/2 -translate-y-1/2 flex-col items-center"
          >
            <div className="relative mb-6 grid h-28 w-28 place-items-center md:mb-8 md:h-36 md:w-36">
              <motion.div
                className="absolute inset-0 rounded-full border border-[#6FC3DF]/30"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 18,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              <motion.div
                className="absolute inset-5 rounded-full border border-[#38BDF8]/25"
                animate={{ rotate: -360 }}
                transition={{
                  duration: 28,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              <motion.div
                className="absolute inset-2 rounded-full border border-[#6FC3DF]/35"
                animate={{
                  scale: [0.82, 1.28],
                  opacity: [0.6, 0],
                }}
                transition={{
                  duration: 2.25,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />

              <div className="relative grid h-16 w-16 place-items-center rounded-full border border-[#6FC3DF]/40 bg-[#04101F]/90 shadow-[0_0_120px_rgba(111,195,223,0.35)] backdrop-blur-2xl md:h-20 md:w-20">
                <span className="h-4 w-4 rounded-full bg-[#6FC3DF] shadow-[0_0_40px_rgba(111,195,223,0.95)]" />
              </div>

              <span className="absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-[#6FC3DF]/60" />
              <span className="absolute bottom-0 left-1/2 h-3 w-px -translate-x-1/2 bg-[#6FC3DF]/30" />
              <span className="absolute left-0 top-1/2 h-px w-3 -translate-y-1/2 bg-[#6FC3DF]/30" />
              <span className="absolute right-0 top-1/2 h-px w-3 -translate-y-1/2 bg-[#6FC3DF]/60" />
            </div>

            <motion.div
              initial={{ opacity: 0, letterSpacing: "0.2em" }}
              animate={{ opacity: 1, letterSpacing: "0.46em" }}
              transition={{ duration: 1.25, ease }}
              className="text-center text-[clamp(1.45rem,8vw,2.4rem)] font-semibold text-white drop-shadow-[0_18px_70px_rgba(0,0,0,0.9)] md:text-[clamp(1.8rem,4vw,3.7rem)]"
            >
              SHIPFLOW
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.35, ease }}
              className="mt-5 text-center text-[10px] uppercase tracking-[0.36em] text-[#6FC3DF]/80 md:text-xs"
            >
              Vessel Hydrodynamics Platform
            </motion.div>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 0.65, ease }}
              className="mt-7 h-px w-52 origin-center bg-gradient-to-r from-transparent via-[#6FC3DF]/75 to-transparent md:w-64"
            />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.36, 0.95, 0.36] }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.1,
              }}
              className="mt-10 text-center text-[10px] uppercase tracking-[0.34em] text-[#6FC3DF]/80"
            >
              Scroll to enter simulation
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={visible ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1, ease }}
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
            d={`M24 ${305 - i * 58} C 180 ${200 - i * 34}, 360 ${
              350 - i * 48
            }, 665 ${130 + i * 38}`}
            stroke="url(#suiteLine)"
            strokeWidth="1.5"
            strokeDasharray="10 16"
            filter="url(#suiteGlow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={
              visible
                ? { pathLength: 1, opacity: 1 }
                : { pathLength: 0, opacity: 0 }
            }
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
        animate={visible ? { opacity: 1, x: 0 } : { opacity: 0, x: 24 }}
        transition={{ duration: 1, ease }}
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
            animate={{
              opacity: [0.4, 1, 0.4],
              scale: [1, 1.3, 1],
            }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
        </div>

        <div className="grid gap-3.5">
          {modules.map((item, index) => (
            <motion.a
              key={item.title}
              href={item.href}
              initial={{ opacity: 0, y: 10 }}
              animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
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
  );
}

function ResponsiveSuiteChip({ visible }) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ duration: 0.8, ease }}
        className="absolute right-6 top-24 hidden rounded-2xl border border-[#6FC3DF]/20 bg-[#030E1C]/80 p-4 text-white backdrop-blur-xl md:block lg:hidden"
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
        animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ duration: 0.8, ease }}
        className="absolute right-4 top-24 rounded-2xl border border-[#6FC3DF]/20 bg-[#030E1C]/80 p-3 text-white backdrop-blur-xl md:hidden"
      >
        <div className="text-[9px] uppercase tracking-[0.22em] text-[#6FC3DF]">
          Simulation Suite
        </div>

        <div className="mt-1 text-xs text-[#93C5FD]/80">
          BASIC · RANS · MOTIONS
        </div>
      </motion.div>
    </>
  );
}

function SonarOverlay({ visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="pointer-events-none absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 opacity-[0.1] [background-image:radial-gradient(circle_at_50%_50%,transparent_0,transparent_80px,rgba(56,189,248,0.75)_81px,transparent_83px)] [background-size:180px_180px]" />

          <motion.div
            className="absolute left-1/2 top-1/2 h-[42vw] w-[42vw] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#38BDF8]/40"
            animate={{
              scale: [0.7, 1.35],
              opacity: [0.6, 0],
            }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function ShipflowCinematicUI() {
const {
  phase,
  introVisible,
  textVisible,
  ctaVisible,
  navVisible,
  routeVisible,
  sonarMode,
  heroComplete,
} = useArrivalState();

  const [hornNotice, setHornNotice] = useState(false);
  const [sonarNotice, setSonarNotice] = useState(false);

  useEffect(() => {
    const onHorn = () => {
      setHornNotice(true);
      setTimeout(() => setHornNotice(false), 1800);
    };

    const onSonar = () => {
      setSonarNotice(true);
      setTimeout(() => setSonarNotice(false), 1800);
    };

    window.addEventListener("shipflow:horn", onHorn);
    window.addEventListener("shipflow:sonar", onSonar);

    return () => {
      window.removeEventListener("shipflow:horn", onHorn);
      window.removeEventListener("shipflow:sonar", onSonar);
    };
  }, []);

  const brandVisible = introVisible;

  return (
    <motion.div
      animate={{ opacity: heroComplete ? 0 : 1 }}
      transition={{ duration: 0.65, ease }}
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden text-white"
    >
      <div className="absolute inset-y-0 left-0 w-[42vw] bg-gradient-to-r from-[#010610]/70 via-[#030E1C]/30 to-transparent md:w-[48vw]" />

      <BrandIntro visible={brandVisible} />

      <ShipflowSuitePanel visible={routeVisible} />

      <ResponsiveSuiteChip visible={routeVisible} />

      <SonarOverlay visible={sonarMode} />

      <motion.header
        initial={{ opacity: 1 }}
        animate={{ opacity: navVisible || brandVisible ? 0 : 1 }}
        transition={{ duration: 0.45, ease }}
        className="absolute left-6 top-6 md:left-10 md:top-8"
      >
        <a
          href="https://shipflow.se/home/"
          className="pointer-events-auto flex items-center gap-3.5 rounded-full border border-[#6FC3DF]/25 bg-[#030E1C]/65 px-5 py-3 backdrop-blur-2xl transition-all duration-300 hover:border-[#38BDF8]/60 hover:shadow-[0_0_25px_rgba(56,189,248,0.25)]"
        >
          <span className="relative grid h-7 w-7 place-items-center rounded-full border border-[#6FC3DF]/30 bg-[#6FC3DF]/15">
            <span className="h-2.5 w-2.5 rounded-full bg-[#38BDF8] shadow-[0_0_20px_rgba(56,189,248,0.9)]" />
          </span>

          <span className="text-[11px] font-semibold tracking-[0.3em] text-white md:text-xs">
            SHIPFLOW
          </span>
        </a>
      </motion.header>

      <main className="absolute bottom-[11vh] left-6 right-6 max-w-none md:bottom-[10vh] md:left-10 md:right-auto md:max-w-[580px] lg:left-16 xl:left-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={textVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, ease }}
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={textVisible ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1.1, ease }}
            className="mb-6 h-px w-28 origin-left bg-gradient-to-r from-[#38BDF8] to-transparent md:w-32"
          />

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={
              textVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }
            }
            transition={{ duration: 1, ease }}
            className="mb-4 text-[10px] uppercase tracking-[0.36em] text-[#6FC3DF] drop-shadow-[0_4px_18px_rgba(0,0,0,0.6)] md:text-[11px] md:tracking-[0.4em]"
          >
            Maritime Engineering
          </motion.div>

          <h1 className="text-[clamp(3.1rem,16vw,5rem)] font-semibold leading-[0.88] tracking-[-0.085em] text-white drop-shadow-[0_20px_70px_rgba(0,0,0,0.74)] md:text-[clamp(3.6rem,7vw,7.1rem)]">
            {["Engineering", "Fluid", "Intelligence"].map((word, index) => (
              <motion.span
                key={word}
                className={
                  word === "Intelligence"
                    ? "block bg-gradient-to-r from-white via-[#BAE6FD] to-[#38BDF8] bg-clip-text text-transparent"
                    : "block"
                }
                initial={{ opacity: 0, y: 36, filter: "blur(10px)" }}
                animate={
                  textVisible
                    ? { opacity: 1, y: 0, filter: "blur(0px)" }
                    : { opacity: 0, y: 36, filter: "blur(10px)" }
                }
                transition={{
                  duration: 1.05,
                  delay: index * 0.12,
                  ease,
                }}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={
              textVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }
            }
            transition={{ duration: 1, delay: 0.42, ease }}
            className="mt-6 max-w-[21rem] text-sm font-light leading-relaxed tracking-[-0.02em] text-[#93C5FD]/85 drop-shadow-[0_8px_28px_rgba(0,0,0,0.7)] md:mt-7 md:max-w-md md:text-lg"
          >
            Ship hydrodynamics, resistance prediction and marine simulation for
            modern vessel performance.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={ctaVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ duration: 1, ease }}
          className="mt-7 flex items-center gap-5 md:mt-9 md:gap-6"
        >
          <a
            href="https://shipflow.se/products-overview/"
            className="pointer-events-auto group relative inline-flex overflow-hidden rounded-full border border-[#6FC3DF]/30 bg-[#030E1C]/75 px-6 py-3.5 text-sm font-medium text-white shadow-[0_20px_60px_rgba(2,12,27,0.5)] backdrop-blur-xl transition-all duration-300 hover:border-[#38BDF8]/60 hover:bg-[#051830]/85 hover:shadow-[0_0_30px_rgba(56,189,248,0.25)] md:px-8 md:py-4"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#38BDF8]/20 to-transparent transition duration-700 group-hover:translate-x-full" />

            <span className="relative flex items-center gap-3.5">
              Explore Shipflow

              <span className="grid h-6 w-6 place-items-center rounded-full bg-[#6FC3DF]/20 text-[#38BDF8] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:bg-[#38BDF8]/30">
                →
              </span>
            </span>
          </a>

          <div className="hidden h-px w-24 bg-gradient-to-r from-[#6FC3DF]/30 to-transparent md:block" />
        </motion.div>
      </main>

      <AnimatePresence>
        {hornNotice && (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 18 }}
            className="absolute bottom-8 right-8 rounded-full border border-[#38BDF8]/30 bg-[#030E1C]/85 px-6 py-3.5 text-xs tracking-[0.18em] text-[#38BDF8] shadow-[0_10px_30px_rgba(2,12,27,0.5)] backdrop-blur-2xl"
          >
            VESSEL HORN ACTIVATED
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {sonarNotice && (
          <motion.div
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            className="absolute right-8 top-8 rounded-full border border-[#6FC3DF]/30 bg-[#030E1C]/85 px-6 py-3.5 text-xs tracking-[0.18em] text-[#6FC3DF] shadow-[0_10px_30px_rgba(2,12,27,0.5)] backdrop-blur-2xl"
          >
            SONAR MODE TOGGLED
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {sonarMode && (
          <motion.div
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            className="absolute right-8 top-20 rounded-full border border-[#6FC3DF]/30 bg-[#030E1C]/85 px-6 py-3.5 text-xs tracking-[0.18em] text-[#6FC3DF] shadow-[0_10px_30px_rgba(2,12,27,0.5)] backdrop-blur-2xl"
          >
            SONAR MODE
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
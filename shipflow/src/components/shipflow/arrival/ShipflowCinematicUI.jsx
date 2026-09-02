import { useEffect, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import { Link } from "react-router-dom";

import {
  useArrivalState,
  prepareHeroState,
  advanceFromIntro,
  skipHeroToContent,
} from "./arrivalStore";
import ShipflowMarineNav from "../../navbar/ShipflowMarineNav";

import logo from "../../../assets/images/logo/logo1.webp";
import sandeblogo from "../../../assets/images/logo/logo1.webp";
import shipflowlogo from "../../../assets/images/logo/shipflowlogo.webp";
import caeseslogo from "../../../assets/images/logo/caeses.webp";

const ease = [0.22, 1, 0.36, 1];

function isFinePointer() {
  return window.matchMedia?.("(hover: hover) and (pointer: fine)")?.matches;
}

/* ============================================================
   BRAND INTRO (Clickable & Touch-enabled)
============================================================ */
function BrandIntro({ visible, onContinue }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="shipflow-brand-intro"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease }}
          className="pointer-events-auto absolute inset-0 z-[80] overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(5,20,38,0.85)_0%,rgba(4,14,28,0.55)_40%,transparent_100%)]" />

          {/* Full-screen click/tap layer */}
          <button
            type="button"
            onClick={onContinue}
            className="pointer-events-auto absolute inset-0 z-10 cursor-pointer border-0 bg-transparent"
            aria-label="Continue to experience"
          />

          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6">
            <motion.img
              src={logo}
              alt="SandebTech"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease }}
              className="w-[120px] sm:w-[160px] md:w-[200px] lg:w-[240px]"
            />

            <div className="mt-4 text-center text-[9px] uppercase tracking-[0.3em] text-[#6FC3DF]/80 sm:text-[10px]">
              Simulate · Optimize · Sustain
            </div>

            <div className="mt-6 h-px w-40 bg-gradient-to-r from-transparent via-[#6FC3DF]/75 to-transparent sm:w-52" />

            <div className="mt-8 space-y-2 text-center">
              <p className="text-[10px] uppercase tracking-[0.28em] text-[#6FC3DF]/90 sm:text-[11px]">
                Click, tap, or press Space
              </p>
              <p className="text-[9px] uppercase tracking-[0.22em] text-slate-500">
                or scroll to continue
              </p>
            </div>

            <div className="pointer-events-auto relative z-20 mt-8">
              <button
                type="button"
                onClick={onContinue}
                className="rounded-full border border-[#6FC3DF]/35 bg-[#6FC3DF]/10 px-6 py-2.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7DD3FC] transition hover:bg-[#6FC3DF]/20"
              >
                Enter experience
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ============================================================
   PRODUCT CARDS
============================================================ */
function FloatingProduct({ name, subtitle, description, to, side = "left", delay = 0, logo: logoSrc }) {
  const isLeft = side === "left";

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -40 : 40, y: 20 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      exit={{ opacity: 0, x: isLeft ? -20 : 20 }}
      transition={{ duration: 0.8, delay, ease }}
      className="w-full max-w-sm"
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: delay + 0.5 }}
        className="group relative"
      >
        <Link
          to={to}
          className="pointer-events-auto relative block rounded-3xl border border-white/[0.06] bg-gradient-to-b from-white/[0.03] via-transparent to-transparent p-6 text-left backdrop-blur-xl transition-all duration-300 hover:border-cyan-500/30 hover:shadow-[0_20px_50px_rgba(6,182,212,0.1)]"
        >
          <div className="flex items-start gap-4">
            <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-cyan-400/[0.05] p-3 shadow-lg">
              {logoSrc ? (
                <img src={logoSrc} alt={name} className="h-full w-full object-contain" />
              ) : (
                <div className="h-3 w-3 rounded-full bg-cyan-400" />
              )}
            </div>

            <div className="space-y-1">
              <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-cyan-400">
                {subtitle}
              </span>
              <h2 className="text-xl font-bold tracking-wide text-white">
                {name}
              </h2>
            </div>
          </div>

          <p className="mt-4 text-xs leading-relaxed text-slate-400">
            {description}
          </p>

          <div className="mt-5 flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest text-slate-300">
            Explore System <ArrowRight size={12} />
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}

function MobileCard({ name, subtitle, to, delay, logo: logoSrc }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.6, delay, ease }}
      whileTap={{ scale: 0.96 }}
      className="w-full"
    >
      <Link
        to={to}
        className="pointer-events-auto relative flex h-full flex-col justify-between gap-3 rounded-[14px] border border-white/[0.07] bg-gradient-to-b from-white/[0.05] to-transparent p-3 text-left backdrop-blur-xl"
      >
        <div className="flex items-start justify-between">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.05] bg-white/[0.04] p-1.5">
            <img src={logoSrc} alt={name} className="h-full w-full object-contain" />
          </div>
          <span className="mt-0.5 rounded-full bg-cyan-400/[0.08] px-2 py-0.5 text-[6px] font-bold uppercase tracking-widest text-cyan-300">
            View
          </span>
        </div>

        <div>
          <h3 className="text-[11px] font-bold tracking-wide text-white">{name}</h3>
          <p className="mt-0.5 text-[7px] font-medium uppercase tracking-wider text-slate-400">
            {subtitle}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

function ProductShowcase({ visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease }}
          className="pointer-events-none absolute inset-0"
        >
          {/* DESKTOP */}
          <div className="pointer-events-none absolute bottom-[12vh] right-6 top-auto hidden w-[340px] flex-col justify-end gap-4 lg:flex xl:right-12 xl:w-[360px]">
            <FloatingProduct
              name="SHIPFLOW"
              subtitle="Hydrodynamics"
              description="Advanced marine CFD for resistance, propulsion, and seakeeping."
              to="/shipflow"
              side="right"
              delay={0.1}
              logo={shipflowlogo}
            />
            <FloatingProduct
              name="CAESES"
              subtitle="Optimization"
              description="Parametric design and automated system optimizations."
              to="/caeses"
              side="right"
              delay={0.2}
              logo={caeseslogo}
            />
          </div>

          {/* TABLET */}
          <div className="pointer-events-none absolute bottom-[14vh] right-4 hidden w-[300px] flex-col gap-3 md:flex lg:hidden">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="pointer-events-auto rounded-2xl border border-[#6FC3DF]/20 bg-[#030E1C]/80 p-4 backdrop-blur-xl"
            >
              <Link to="/shipflow" className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] p-2">
                  <img src={shipflowlogo} alt="SHIPFLOW" className="h-full w-full object-contain" />
                </div>
                <div>
                  <div className="text-[9px] uppercase tracking-[0.24em] text-[#6FC3DF]">
                    Hydrodynamics
                  </div>
                  <div className="text-sm font-bold text-white">SHIPFLOW</div>
                </div>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="pointer-events-auto rounded-2xl border border-[#6FC3DF]/20 bg-[#030E1C]/80 p-4 backdrop-blur-xl"
            >
              <Link to="/caeses" className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] p-2">
                  <img src={caeseslogo} alt="CAESES" className="h-full w-full object-contain" />
                </div>
                <div>
                  <div className="text-[9px] uppercase tracking-[0.24em] text-[#6FC3DF]">
                    Optimization
                  </div>
                  <div className="text-sm font-bold text-white">CAESES</div>
                </div>
              </Link>
            </motion.div>
          </div>

          {/* MOBILE */}
          <div className="pointer-events-none absolute inset-x-4 bottom-28 md:hidden">
            <div className="mx-auto grid max-w-[340px] grid-cols-2 gap-2.5">
              <MobileCard
                name="SHIPFLOW"
                subtitle="Hydrodynamics"
                to="/shipflow"
                delay={0.1}
                logo={shipflowlogo}
              />
              <MobileCard
                name="CAESES"
                subtitle="Optimization"
                to="/caeses"
                delay={0.18}
                logo={caeseslogo}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ============================================================
   MAIN CINEMATIC UI
============================================================ */
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

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 80, damping: 25 });
  const smoothY = useSpring(mouseY, { stiffness: 80, damping: 25 });
  const logoX = useTransform(smoothX, [-600, 600], [-12, 12]);
  const logoY = useTransform(smoothY, [-600, 600], [-8, 8]);

  const continueFromIntro = useCallback(() => {
    advanceFromIntro();
  }, []);

  const skipAll = useCallback(() => {
    skipHeroToContent();
    requestAnimationFrame(() => {
      const next = document.querySelector("#main-content, [data-page-content], #shipflow-arrival + *");
      if (next) {
        next.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.scrollTo({ top: window.innerHeight * 1.1, behavior: "smooth" });
      }
    });
  }, []);

  useEffect(() => {
    prepareHeroState();
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (!loaderDone || heroComplete) return;

    const onKey = (e) => {
      const t = e.target;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;

      if (e.key === "Escape") {
        e.preventDefault();
        skipAll();
        return;
      }

      if (e.key === " " || e.key === "Enter" || e.key === "ArrowDown") {
        e.preventDefault();
        if (introVisible) continueFromIntro();
        else skipAll();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [loaderDone, heroComplete, introVisible, continueFromIntro, skipAll]);

  const handleMouseMove = (event) => {
    if (!isFinePointer()) return;
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set(event.clientX - (rect.left + rect.width / 2));
    mouseY.set(event.clientY - (rect.top + rect.height / 2));
  };

  if (!loaderDone) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#02070d] text-white">
        <div className="text-center">
          <img src={logo} alt="SandebTech" className="mx-auto w-28 opacity-90 sm:w-36" />
          <p className="mt-4 text-[10px] uppercase tracking-[0.3em] text-[#6FC3DF]/80">
            Loading…
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <ShipflowMarineNav visible={navVisible} />

      {/* Always-visible Skip Intro Button */}
      <AnimatePresence>
        {!heroComplete && loaderDone && (
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={skipAll}
            className="pointer-events-auto fixed right-4 top-4 z-[100] rounded-full border border-white/15 bg-black/50 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/80 backdrop-blur-md transition hover:border-cyan-400/40 hover:text-cyan-200 sm:right-6 sm:top-5"
          >
            Skip intro
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!heroComplete && (
          <motion.div
            key="cinematic-hero-overlay"
            onMouseMove={handleMouseMove}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease }}
            className="pointer-events-none fixed inset-0 z-40 overflow-hidden text-white"
          >
            <div className="pointer-events-none absolute inset-y-0 left-0 w-[42vw] bg-gradient-to-r from-[#010610]/50 via-[#030E1C]/15 to-transparent md:w-[48vw]" />

            <motion.div
              style={{ x: logoX, y: logoY }}
              className="pointer-events-none absolute left-1/2 top-[48%] z-[3] -translate-x-1/2 -translate-y-1/2 opacity-[0.06] sm:opacity-[0.09]"
            >
              <img src={sandeblogo} alt="" className="w-[50vw] max-w-[200px] object-contain md:max-w-4xl" />
            </motion.div>

            <BrandIntro visible={introVisible} onContinue={continueFromIntro} />

            <ProductShowcase visible={routeVisible} />

            {/* HEADLINE TEXT BLOCK */}
            <main className="absolute left-4 right-4 top-[22vh] max-w-none sm:left-6 sm:right-6 sm:top-[20vh] md:bottom-[14vh] md:left-10 md:right-auto md:top-auto md:max-w-[560px] lg:bottom-[16vh] lg:left-16 lg:max-w-[600px] xl:left-20">
              <AnimatePresence>
                {textVisible && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.7, ease }}
                  >
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 1.1, ease }}
                      className="mb-4 h-px w-20 origin-left bg-gradient-to-r from-[#38BDF8] to-transparent sm:mb-5 sm:w-28"
                    />

                    <div className="mb-3 text-[9px] uppercase tracking-[0.3em] text-[#6FC3DF] sm:text-[10px] md:text-[11px]">
                      SandebTech Marine
                    </div>

                    <h1 className="font-semibold text-white text-[clamp(2.4rem,10vw,3.8rem)] sm:text-[clamp(2.8rem,11vw,4.6rem)] md:text-[clamp(3.2rem,7vw,5.5rem)] leading-[1.02] tracking-[-0.03em] drop-shadow-[0_20px_70px_rgba(0,0,0,0.74)]">
                      {["Engineering", "Fluid", "Intelligence"].map((word, index) => (
                        <motion.span
                          key={word}
                          className={`relative block ${index > 0 ? "mt-1 sm:mt-1.5" : ""} ${
                            word === "Intelligence"
                              ? "bg-gradient-to-r from-white via-[#BAE6FD] to-[#38BDF8] bg-clip-text pb-1 text-transparent"
                              : ""
                          }`}
                          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                          transition={{ duration: 0.9, delay: index * 0.12, ease }}
                        >
                          {word}
                        </motion.span>
                      ))}
                    </h1>

                    <motion.p
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.35, ease }}
                      className="mt-4 max-w-[20rem] text-xs font-light leading-relaxed text-[#93C5FD]/85 sm:mt-5 sm:max-w-[22rem] sm:text-sm md:mt-6 md:max-w-md md:text-base"
                    >
                      Ship hydrodynamics, resistance prediction and marine simulation for modern vessel performance. Powered by{" "}
                      <span className="font-semibold text-cyan-200">SHIPFLOW</span> and{" "}
                      <span className="font-semibold text-cyan-200">CAESES</span>.
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ACTION BUTTONS */}
              <AnimatePresence>
                {ctaVisible && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-6 flex flex-wrap items-center gap-3"
                  >
                    <button
                      type="button"
                      onClick={skipAll}
                      className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-200 hover:border-cyan-400/40"
                    >
                      View site <ArrowDown size={12} />
                    </button>
                    <Link
                      to="/shipflow"
                      className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-200"
                    >
                      SHIPFLOW <ArrowRight size={12} />
                    </Link>
                    <Link
                      to="/caeses"
                      className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-200"
                    >
                      CAESES <ArrowRight size={12} />
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
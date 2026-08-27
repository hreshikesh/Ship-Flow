import { useEffect } from "react";
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
  resetTransientOverlay,
  prepareHeroState,
} from "./arrivalStore";
import ShipflowMarineNav from "../../navbar/ShipflowMarineNav";

import logo from "../../../assets/images/logo/logo1.webp";
import sandeblogo from "../../../assets/images/logo/logo1.webp";
import shipflowlogo from "../../../assets/images/logo/shipflowlogo.webp";
import caeseslogo from "../../../assets/images/logo/caeses.webp";

const ease = [0.22, 1, 0.36, 1];

/* ============================================================
   1. BRAND INTRO (Visible initially at top of page)
============================================================ */
function BrandIntro({ visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="shipflow-brand-intro"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease }}
          className="pointer-events-none absolute inset-0 z-[80] overflow-hidden"
          style={{ touchAction: "pan-y" }}
        >
          {/* Subtle radial wash so 3D background stays visible behind */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(5,20,38,0.85)_0%,rgba(4,14,28,0.65)_35%,rgba(2,7,15,0.3)_70%,transparent_100%)]" />

          <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(111,195,223,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(111,195,223,0.15)_1px,transparent_1px)] [background-size:76px_76px]" />

          <motion.div
            initial={{ y: "-20%", opacity: 0 }}
            animate={{ y: "120%", opacity: [0, 0.5, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#6FC3DF]/80 to-transparent"
          />

          <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
            <motion.img
              src={logo}
              alt="SandebTech"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease }}
              className="w-[120px] sm:w-[160px] md:w-[200px] lg:w-[240px] xl:w-[280px]"
            />

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.35, ease }}
              className="mt-4 text-center text-[9px] uppercase tracking-[0.3em] text-[#6FC3DF]/80 sm:mt-5 sm:text-[10px] sm:tracking-[0.36em] md:text-xs"
            >
              SIMULATE OPTIMIZE SUSTAIN 
            </motion.div>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 0.65, ease }}
              className="mt-6 h-px w-40 origin-center bg-gradient-to-r from-transparent via-[#6FC3DF]/75 to-transparent sm:mt-7 sm:w-52 md:w-64"
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

/* ============================================================
   2. FLOATING PRODUCT CARD (Desktop)
============================================================ */
function FloatingProduct({
  name,
  subtitle,
  description,
  to,
  side = "left",
  delay = 0,
  logo,
}) {
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
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay + 0.5,
        }}
        className="group relative"
      >
        <Link
          to={to}
          className="pointer-events-auto relative block rounded-3xl border border-white/[0.06] bg-gradient-to-b from-white/[0.03] via-transparent to-transparent p-6 text-left backdrop-blur-xl transition-all duration-300 hover:border-cyan-500/30 hover:shadow-[0_20px_50px_rgba(6,182,212,0.1)]"
        >
          <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-cyan-400/10 to-transparent opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

          <div className="flex items-start gap-4">
            <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-cyan-400/[0.05] p-3 shadow-lg transition-colors duration-300 group-hover:border-cyan-400/30">
              {logo ? (
                <img
                  src={logo}
                  alt={name}
                  className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <div className="h-3 w-3 rounded-full bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)]" />
              )}
            </div>

            <div className="space-y-1">
              <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-cyan-400">
                {subtitle}
              </span>
              <h2 className="text-xl font-bold tracking-wide text-white transition-colors duration-300 group-hover:text-cyan-200">
                {name}
              </h2>
            </div>
          </div>

          <p className="mt-4 text-xs leading-relaxed text-slate-400">
            {description}
          </p>

          <div className="mt-5 flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest text-slate-300 transition-colors duration-300 group-hover:text-cyan-300">
            Explore System
            <ArrowRight
              size={12}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}

/* ============================================================
   3. MOBILE PRODUCT CARD
============================================================ */
function MobileCard({ name, subtitle, to, delay, logo }) {
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
        className="pointer-events-auto relative flex h-full flex-col justify-between gap-3 rounded-[14px] border border-white/[0.07] bg-gradient-to-b from-white/[0.05] to-transparent p-3 text-left backdrop-blur-xl transition-colors duration-200 active:border-cyan-500/30"
      >
        <div className="absolute inset-0 -z-10 rounded-[14px] bg-gradient-to-b from-cyan-500/[0.03] to-transparent opacity-0 transition-opacity duration-300 active:opacity-100" />

        <div className="flex items-start justify-between">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.05] bg-white/[0.04] p-1.5">
            <img src={logo} alt={name} className="h-full w-full object-contain" />
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

/* ============================================================
   4. PRODUCT SHOWCASE — SHIPFLOW + CAESES (Reveals on scroll)
============================================================ */
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
          style={{ touchAction: "pan-y" }}
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
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease }}
              className="pointer-events-auto rounded-2xl border border-[#6FC3DF]/20 bg-[#030E1C]/80 p-4 backdrop-blur-xl"
            >
              <Link to="/shipflow" className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] p-2">
                  <img
                    src={shipflowlogo}
                    alt="SHIPFLOW"
                    className="h-full w-full object-contain"
                  />
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
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease }}
              className="pointer-events-auto rounded-2xl border border-[#6FC3DF]/20 bg-[#030E1C]/80 p-4 backdrop-blur-xl"
            >
              <Link to="/caeses" className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] p-2">
                  <img
                    src={caeseslogo}
                    alt="CAESES"
                    className="h-full w-full object-contain"
                  />
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
          <div className="pointer-events-none absolute inset-x-4 bottom-28 md:hidden touch-pan-y">
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
   5. MAIN CINEMATIC UI
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
  const logoX = useTransform(smoothX, [-600, 600], [-15, 15]);
  const logoY = useTransform(smoothY, [-600, 600], [-10, 10]);

  useEffect(() => {
    prepareHeroState();

    return () => {
      resetTransientOverlay();
    };
  }, []);

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set(event.clientX - (rect.left + rect.width / 2));
    mouseY.set(event.clientY - (rect.top + rect.height / 2));
  };

  if (!loaderDone) return null;

  return (
    <>
      <ShipflowMarineNav visible={navVisible} />

      <AnimatePresence>
        {!heroComplete && (
          <motion.div
            key="cinematic-hero-overlay"
            onMouseMove={handleMouseMove}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, ease }}
            className="pointer-events-none fixed inset-0 z-40 overflow-hidden text-white"
            style={{ touchAction: "pan-y" }} /* 🚀 Fixes Touch Overlay Interceptions */
          >
            {/* Subtle left gradient overlay that keeps 3D scene fully visible */}
            <div className="absolute inset-y-0 left-0 w-[42vw] bg-gradient-to-r from-[#010610]/60 via-[#030E1C]/20 to-transparent md:w-[48vw] pointer-events-none" />

            {/* Parallax watermark */}
            <motion.div
              style={{ x: logoX, y: logoY }}
              className="pointer-events-none absolute left-1/2 top-[48%] z-[3] -translate-x-1/2 -translate-y-1/2 select-none opacity-[0.06] sm:opacity-[0.09]"
            >
              <img
                src={sandeblogo}
                alt=""
                className="w-[50vw] max-w-[200px] object-contain sm:w-[65vw] md:max-w-4xl lg:w-[50vw]"
              />
            </motion.div>

            {/* 1. Logo Intro screen (Visible initially at Y=0) */}
            <BrandIntro visible={introVisible} />

            {/* 2. Right-side cards (Reveals upon scroll) */}
            <ProductShowcase visible={routeVisible} />

            {/* 3. LEFT headline copy (Reveals upon scroll) */}
            <main
              className="
                absolute left-4 right-4
                top-[22vh]
                max-w-none
                sm:left-6 sm:right-6 sm:top-[20vh]
                md:left-10 md:right-auto md:top-auto md:bottom-[14vh] md:max-w-[560px]
                lg:left-16 lg:bottom-[16vh] lg:max-w-[600px]
                xl:left-20
              "
            >
              <AnimatePresence>
                {textVisible && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.7, ease }}
                  >
                    {/* Accent line */}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 1.1, ease }}
                      className="mb-4 h-px w-20 origin-left bg-gradient-to-r from-[#38BDF8] to-transparent sm:mb-5 sm:w-28 md:w-32"
                    />

                    {/* Eyebrow */}
                    <div className="mb-3 text-[9px] uppercase tracking-[0.3em] text-[#6FC3DF] sm:mb-4 sm:text-[10px] sm:tracking-[0.36em] md:text-[11px] md:tracking-[0.4em]">
                      SandebTech Marine
                    </div>

                    {/* Headline */}
                    <h1
                      className="
                        font-semibold text-white
                        text-[clamp(2.4rem,10vw,3.8rem)]
                        sm:text-[clamp(2.8rem,11vw,4.6rem)]
                        md:text-[clamp(3.2rem,7vw,5.5rem)]
                        lg:text-[clamp(3.6rem,6vw,6.2rem)]
                        leading-[1.02] sm:leading-[1] md:leading-[0.95]
                        tracking-[-0.03em] sm:tracking-[-0.04em] md:tracking-[-0.05em]
                        drop-shadow-[0_20px_70px_rgba(0,0,0,0.74)]
                      "
                    >
                      {["Engineering", "Fluid", "Intelligence"].map((word, index) => (
                        <motion.span
                          key={word}
                          className={`
                            relative block
                            ${index > 0 ? "mt-1 sm:mt-1.5 md:mt-2" : ""}
                            ${
                              word === "Intelligence"
                                ? "bg-gradient-to-r from-white via-[#BAE6FD] to-[#38BDF8] bg-clip-text pb-1 text-transparent"
                                : ""
                            }
                          `}
                          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                          transition={{ duration: 0.9, delay: index * 0.12, ease }}
                        >
                          {word}
                          {word === "Intelligence" && (
                            <motion.span
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: 1 }}
                              transition={{ duration: 0.9, delay: 0.7, ease }}
                              className="absolute -bottom-0.5 left-0 h-[3px] w-20 origin-left rounded-full bg-gradient-to-r from-[#38BDF8] to-transparent sm:w-28 md:h-1 md:w-36"
                            />
                          )}
                        </motion.span>
                      ))}
                    </h1>

                    {/* Paragraph */}
                    <motion.p
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.35, ease }}
                      className="mt-4 max-w-[20rem] text-xs font-light leading-relaxed text-[#93C5FD]/85 sm:mt-5 sm:max-w-[22rem] sm:text-sm md:mt-6 md:max-w-md md:text-base lg:text-lg"
                    >
                      Ship hydrodynamics, resistance prediction and marine simulation
                      for modern vessel performance. Powered by{" "}
                      <span className="font-semibold text-cyan-200">SHIPFLOW</span> and{" "}
                      <span className="font-semibold text-cyan-200">CAESES</span>.
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Scroll hint only */}
              <AnimatePresence>
                {ctaVisible && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="mt-8 hidden items-center gap-2 md:flex"
                  >
                    <span className="text-[8px] font-semibold uppercase tracking-[0.3em] text-slate-500">
                      Scroll Down
                    </span>
                    <motion.div
                      animate={{ y: [0, 6, 0] }}
                      transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="text-cyan-400/80"
                    >
                      <ArrowDown size={12} strokeWidth={2.5} />
                    </motion.div>
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
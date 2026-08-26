import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Ship, Boxes, Anchor } from "lucide-react";
import { Link } from "react-router-dom";

const PARTNERS = [
  {
    id: "shipflow",
    label: "Hydrodynamics & CFD",
    name: "SHIPFLOW",
    company: "FLOWTECH",
    description:
      "Industry-leading marine CFD for resistance, propulsion, seakeeping and hull-form analysis. Trusted worldwide for high-fidelity hydrodynamic simulation.",
    to: "/shipflow",
    external: "https://www.flowtech.se/",
    externalLabel: "flowtech.se",
    icon: Ship,
    side: "left",
  },
  {
    id: "caeses",
    label: "Parametric Design",
    name: "CAESES",
    company: "FRIENDSHIP SYSTEMS",
    description:
      "Parametric modeling and automated optimization for complex engineering shapes. Couple geometry with simulation to explore better-performing designs faster.",
    to: "/caeses",
    external: "https://www.caeses.com/",
    externalLabel: "caeses.com",
    icon: Boxes,
    side: "right",
  },
];

export default function MarineSystem() {
  return (
    <section
      id="marine-system"
      className="relative z-20  overflow-hidden bg-[#02070d] py-20 sm:py-28 lg:py-36"
    >
      {/* Soft atmosphere */}
      <div
        className="pointer-events-none absolute left-1/2 top-[40%] h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full sm:h-[600px] sm:w-[600px]"
        style={{
          background:
            "radial-gradient(circle, rgba(6,182,212,0.06), transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[9px] font-medium uppercase tracking-[0.28em] text-cyan-300/70 sm:text-[10px]"
          >
            SandebTech Marine
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="mt-3 text-[clamp(1.75rem,5vw,3.5rem)] font-semibold leading-[1.1] tracking-tight text-white"
          >
            Two powerful technologies.
            <br />
            <span className="bg-gradient-to-r from-cyan-300 via-sky-300 to-blue-400 bg-clip-text text-transparent">
              One engineering workflow.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.14 }}
            className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-400 sm:mt-5 sm:text-base"
          >
            SandebTech Marine brings{" "}
            <span className="text-slate-200">SHIPFLOW</span> and{" "}
            <span className="text-slate-200">CAESES</span> together — simulation
            and optimization in one coherent path from concept to performance.
          </motion.p>
        </div>

        {/* System layout */}
        <div className="relative mt-12 sm:mt-16 lg:mt-20">
          {/* Desktop connector */}
          <div className="pointer-events-none absolute left-[18%] right-[18%] top-1/2 hidden h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-cyan-300/25 to-transparent lg:block" />

          <div className="grid items-stretch gap-5 sm:gap-6 lg:grid-cols-[1fr_minmax(140px,180px)_1fr] lg:items-center lg:gap-4">
            <TiltCard partner={PARTNERS[0]} />

            {/* Center — SandebTech Marine hub */}
            <motion.div
              initial={{ opacity: 0, scale: 0.88 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="relative order-first mx-auto flex flex-col items-center justify-center lg:order-none"
            >
              <a
                href="https://sandebtech.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group relative flex h-[7.5rem] w-[7.5rem] flex-col items-center justify-center
                  rounded-full border border-cyan-300/20 bg-[#06111b]
                  shadow-[0_0_60px_rgba(6,182,212,0.1)]
                  transition duration-500
                  hover:border-cyan-300/40 hover:shadow-[0_0_80px_rgba(6,182,212,0.18)]
                  sm:h-32 sm:w-32
                "
              >
                <div className="absolute inset-2.5 rounded-full border border-cyan-300/10 transition group-hover:border-cyan-300/25" />
                <div className="absolute inset-5 rounded-full border border-white/[0.04]" />

                <Anchor
                  size={20}
                  className="relative z-10 text-cyan-300 transition group-hover:scale-110"
                  strokeWidth={1.75}
                />
                <span className="relative z-10 mt-1.5 text-center text-[8px] font-semibold uppercase tracking-[0.18em] text-slate-400 transition group-hover:text-cyan-200/90">
                  SandebTech
                  <br />
                  Marine
                </span>
              </a>

           
            </motion.div>

            <TiltCard partner={PARTNERS[1]} />
          </div>
        </div>

        {/* Bottom statement */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mt-14 max-w-2xl text-center sm:mt-20"
        >
          <p className="text-base leading-relaxed text-slate-400 sm:text-lg">
            From how a vessel moves through water to how it can perform better —
            simulation, geometry, and optimization in one loop.
          </p>
          <p className="mt-3 text-[10px] font-medium uppercase tracking-[0.22em] text-cyan-300/65 sm:text-[11px]">
            Simulation → Optimization → Performance
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================
   TILT CARD
============================================================ */

function TiltCard({ partner }) {
  const ref = useRef(null);
  const Icon = partner.icon;

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 180, damping: 18 });
  const springY = useSpring(y, { stiffness: 180, damping: 18 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-10, 10]);

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(px);
    y.set(py);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: partner.side === "left" ? -28 : 28,
      }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65 }}
      style={{ perspective: 900 }}
      className="h-full"
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="h-full will-change-transform"
      >
        <div
          className="
            group relative flex h-full flex-col overflow-hidden
            rounded-2xl border border-white/[0.08] bg-white/[0.025]
            p-5 backdrop-blur-xl
            transition-colors duration-500
            hover:border-cyan-300/25 hover:bg-cyan-300/[0.03]
            sm:rounded-3xl sm:p-7 lg:p-8
          "
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Hover glow */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-cyan-400/10 opacity-0 blur-3xl transition duration-500 group-hover:opacity-100" />

          <div
            className="relative flex h-full flex-col"
            style={{ transform: "translateZ(24px)" }}
          >
            {/* Icon + external */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-300/15 bg-cyan-300/[0.06] text-cyan-300 sm:h-11 sm:w-11">
                <Icon size={18} strokeWidth={1.75} />
              </div>

              <a
                href={partner.external}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="
                  flex items-center gap-1 rounded-full
                  border border-white/[0.06] bg-white/[0.03]
                  px-2.5 py-1 text-[8px] font-medium uppercase tracking-[0.14em]
                  text-slate-500 transition
                  hover:border-cyan-300/25 hover:text-cyan-300
                "
              >
                {partner.externalLabel}
                <ArrowUpRight size={10} />
              </a>
            </div>

            <div className="mt-5 text-[9px] uppercase tracking-[0.24em] text-cyan-300/60 sm:mt-6">
              {labelSafe(partner.label)}
            </div>

            <h3 className="mt-1.5 text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-[2rem]">
              {partner.name}
            </h3>

            <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.16em] text-slate-600">
              {partner.company}
            </p>

            <p className="mt-3 flex-1 text-[13px] leading-relaxed text-slate-500 sm:mt-4 sm:text-sm">
              {partner.description}
            </p>

            <Link
              to={partner.to}
              className="
                mt-5 inline-flex items-center gap-2
                text-[9px] font-semibold uppercase tracking-[0.2em] text-cyan-300
                transition sm:mt-7
                group-hover:gap-2.5
              "
            >
              Explore {partner.name}
              <ArrowUpRight
                size={13}
                className="transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function labelSafe(label) {
  return label;
}
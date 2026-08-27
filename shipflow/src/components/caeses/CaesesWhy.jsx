import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  Box,
  Target,
  Workflow,
  Layers3,
  BarChart3,
  Cpu,
  ExternalLink,
} from "lucide-react";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "features", label: "Key Features" },
  { id: "applications", label: "Applications" },
  { id: "industries", label: "Industries" },
  { id: "workflow", label: "Workflow" },
  { id: "benefits", label: "Benefits" },
];

const keyFeatures = [
  {
    icon: Box,
    title: "Parametric 3D Modeling",
    description:
      "CAESES provides a powerful parametric modeling engine that allows engineers to create flexible and robust geometry models. Design parameters can be easily varied to explore a wide range of design alternatives automatically.",
  },
  {
    icon: Target,
    title: "Shape Optimization",
    description:
      "CAESES enables automated shape optimization by connecting parametric models to CFD or FEA solvers. The software systematically varies design parameters and evaluates performance to find the best possible shape.",
  },
  {
    icon: Workflow,
    title: "Automated Simulation Workflows",
    description:
      "CAESES allows engineers to set up fully automated simulation workflows. Once configured, the software can run hundreds or thousands of design variations and simulations without manual intervention.",
  },
  {
    icon: Layers3,
    title: "CAD Integration",
    description:
      "CAESES integrates seamlessly with existing CAD and simulation tools. It supports standard file formats such as STEP, IGES, and STL, making it easy to incorporate into your existing engineering workflow.",
  },
  {
    icon: BarChart3,
    title: "Design Space Exploration",
    description:
      "CAESES provides tools for systematic design space exploration. Engineers can visualize and analyze the relationships between design parameters and performance metrics to gain deeper insights.",
  },
  {
    icon: Cpu,
    title: "Solver Coupling",
    description:
      "CAESES can be coupled with a wide range of CFD and FEA solvers including ANSYS Fluent, OpenFOAM, STAR-CCM+, and others. This flexibility allows engineers to use their preferred simulation tools.",
  },
];

/* ------------------------------------------------------------------ */
/*  Responsive Carousel                                                */
/* ------------------------------------------------------------------ */
const Carousel = ({ items, renderCard, desktopCols = 3 }) => {
  const [current, setCurrent] = useState(0);
  const [colsPerView, setColsPerView] = useState(desktopCols);
  const ref = useRef(null);

  useEffect(() => {
    const calc = () => {
      const w = ref.current?.offsetWidth || window.innerWidth;
      if (w < 640) setColsPerView(1);
      else if (w < 1024) setColsPerView(2);
      else setColsPerView(desktopCols);
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, [desktopCols]);

  const maxIndex = Math.max(0, items.length - colsPerView);
  const showNav = colsPerView < items.length;
  const next = () => setCurrent((p) => Math.min(p + 1, maxIndex));
  const prev = () => setCurrent((p) => Math.max(p - 1, 0));
  const cardWidth = 100 / colsPerView;

  return (
    <div ref={ref} className="relative w-full">
      {showNav && (
        <div className="mb-5 flex items-center justify-end gap-2">
          <button
            onClick={prev}
            disabled={current === 0}
            aria-label="Previous"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-slate-400 transition-all duration-300 hover:border-cyan-400/40 hover:text-cyan-400 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ArrowLeft size={15} />
          </button>
          <button
            onClick={next}
            disabled={current === maxIndex}
            aria-label="Next"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-slate-400 transition-all duration-300 hover:border-cyan-400/40 hover:text-cyan-400 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ArrowRight size={15} />
          </button>
        </div>
      )}

      <div className="overflow-hidden">
        <motion.div
          className="flex"
          animate={{ x: `-${current * cardWidth}%` }}
          transition={{ type: "spring", stiffness: 260, damping: 30 }}
        >
          {items.map((item, i) => (
            <div
              key={i}
              className="shrink-0 px-1.5"
              style={{ width: `${cardWidth}%` }}
            >
              {renderCard(item, i)}
            </div>
          ))}
        </motion.div>
      </div>

      {showNav && (
        <div className="mt-5 flex justify-center gap-1.5">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                current === i ? "w-6 bg-cyan-400" : "w-1.5 bg-white/20"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
const CAESES = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const sectionRefs = useRef({});

  /* active-tab via IntersectionObserver */
  useEffect(() => {
    const observers = [];
    tabs.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveTab(id);
        },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (id) => {
    setActiveTab(id);
    const el = document.getElementById(id);
    if (el) {
      const offset = 64;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <main className="overflow-hidden bg-[#05080d] text-white">

    
     

      {/* =====================================================
          OVERVIEW  (no image — text-only)
      ===================================================== */}
      <section id="overview" className="scroll-mt-16 py-16 md:py-24 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="mb-10 md:mb-14"
          >
            <span className="text-[10px] tracking-[0.3em] text-cyan-400">
              OVERVIEW
            </span>
            <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-[-0.04em] sm:text-4xl md:mt-4 md:text-5xl">
              Simulation-Driven Design
              <span className="text-slate-500"> Optimization</span>
            </h2>
          </motion.div>

          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="flex flex-col gap-5"
            >
              <p className="text-sm leading-7 text-slate-400 sm:text-base sm:leading-8">
                CAESES is developed by FRIENDSHIP SYSTEMS and is a leading
                software platform for geometry modeling and shape optimization.
                The software is specifically designed for engineers who want to
                automate their design processes and use simulation results to
                systematically improve product performance.
              </p>
              <p className="text-sm leading-7 text-slate-400 sm:text-base sm:leading-8">
                Unlike traditional CAD tools, CAESES focuses on creating
                parametric models that are specifically built for optimization.
                The software provides a unique combination of powerful geometry
                modeling, automated workflow management, and deep integration
                with CFD and FEA solvers.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.12 }}
              className="flex flex-col gap-5"
            >
              <p className="text-sm leading-7 text-slate-400 sm:text-base sm:leading-8">
                CAESES is trusted by leading engineering companies worldwide
                including shipyards, turbomachinery manufacturers, automotive
                OEMs, and research institutions. Its flexible architecture
                supports both novice users and expert engineers running
                large-scale optimization campaigns.
              </p>

              <a
                href="https://www.caeses.com/"
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex w-fit items-center gap-2 rounded-xl border border-white/10 px-5 py-2.5 text-sm text-slate-400 transition-all duration-300 hover:border-cyan-400/30 hover:text-cyan-400"
              >
                Learn more at caeses.com
                <ExternalLink size={13} />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================
          KEY FEATURES
      ===================================================== */}
      <section
        id="features"
        className="scroll-mt-16 border-y border-white/[0.06] bg-[#071019] py-16 md:py-24 lg:py-28"
      >
        <div className="mx-auto max-w-[1400px] px-5 sm:px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="mb-10 md:mb-14"
          >
            <span className="text-[10px] tracking-[0.3em] text-cyan-400">
              KEY FEATURES
            </span>
            <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-[-0.04em] sm:text-4xl md:mt-4 md:text-5xl">
              Powerful tools for
              <span className="text-slate-500"> design optimization</span>
            </h2>
          </motion.div>

          <Carousel
            items={keyFeatures}
            desktopCols={3}
            renderCard={(feat) => {
              const Icon = feat.icon;
              return (
                <div className="flex h-full flex-col rounded-2xl border border-white/[0.07] bg-[#05080d] p-5 transition-all duration-300 hover:border-cyan-400/20 hover:bg-cyan-400/[0.02] sm:p-6">
                  <div className="mb-4 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/[0.06] text-cyan-400">
                    <Icon size={19} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-sm font-semibold sm:text-base">
                    {feat.title}
                  </h3>
                  <p className="mt-2.5 text-xs leading-6 text-slate-500 sm:text-sm sm:leading-7">
                    {feat.description}
                  </p>
                </div>
              );
            }}
          />
        </div>
      </section>
    </main>
  );
};

export default CAESES;
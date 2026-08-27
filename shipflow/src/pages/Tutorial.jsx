import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Ship,
  Layers,
  BookOpen,
  ExternalLink,
  Search,
  GraduationCap,
  Rocket,
  Wrench,
  FileText,
  HelpCircle,
  PlayCircle,
  Clock,
  BarChart3,
  ArrowUpRight,
  Filter,
  ChevronRight,
  X,
  ArrowRight,

} from "lucide-react";
import { useNavigate } from "react-router-dom";

const platforms = [
  {
    id: "shipflow",
    label: "SHIPFLOW",
    icon: Ship,
    vendor: "FLOWTECH International",
    tagline: "Official training documentation for SHIPFLOW CFD software",
    description:
      "SHIPFLOW is a comprehensive CFD software suite for maritime applications, specializing in ship hull design and optimization, resistance and propulsion analysis, seakeeping and maneuvering predictions, and free surface flow simulations.",
    docsUrl: "https://shipflow.se/pub/site/index.html",
    docsLabel: "Open SHIPFLOW Tutorials",
    stats: [
      { value: "30 min", label: "First tutorial", icon: Clock },
      { value: "Beginner", label: "Entry level", icon: BarChart3 },
      { value: "Video", label: "Walkthroughs included", icon: PlayCircle },
    ],
    tracks: [
      {
        id: "sf-start",
        icon: Rocket,
        level: "Start here",
        title: "Getting Started",
        description:
          "Install SHIPFLOW, license the suite, and confirm the example files are reachable before running your first case.",
        url: "https://shipflow.se/pub/site/getting-started/installation/index.html",
        linkLabel: "Installation Guide",
      },
      {
        id: "sf-basic",
        icon: GraduationCap,
        level: "Basic",
        title: "Tutorial 1 — Potential Free Surface Analysis",
        description:
          "Free surface flow analysis with the XPAN module on a KCS container ship and a RoPax vessel. Covers the Design interface, IGES import, solver configuration and wave pattern post-processing.",
        url: "https://shipflow.se/pub/site/tutorials/basic/tutorial-1-xpan.html",
        linkLabel: "Start Tutorial 1",
        topics: [
          "Free surface computations with potential flow",
          "Creating design variants",
          "Automatic generation of offset files",
          "Boundary layer calculations",
          "Grid generation for viscous flow computations",
        ],
      },
      {
        id: "sf-advanced",
        icon: Wrench,
        level: "Advanced",
        title: "Advanced Techniques",
        description:
          "For experienced users: manual grid generation, advanced post-processing with the XCHAP viscous solver, and full optimization workflows.",
        url: "https://shipflow.se/pub/site/index.html",
        linkLabel: "Browse Advanced Topics",
        topics: [
          "Manual grid generation techniques",
          "Advanced post-processing with XCHAP",
          "Optimization workflows",
        ],
      },
    ],
    quickLinks: [
      {
        icon: FileText,
        label: "User Manual",
        url: "https://shipflow.se/pub/site/usermanual/introduction.html",
      },
      {
        icon: BookOpen,
        label: "Glossary",
        url: "https://shipflow.se/pub/site/reference/glossary.html",
      },
      {
        icon: HelpCircle,
        label: "FAQ",
        url: "https://shipflow.se/pub/site/reference/faq.html",
      },
    ],
  },
  {
    id: "caeses",
    label: "CAESES",
    icon: Layers,
    vendor: "FRIENDSHIP SYSTEMS · now part of Maya HTT",
    tagline: "Flexible CAD platform for design studies with simulation tools",
    description:
      "CAESES bridges the gap between traditional CAD and simulation. It provides intelligent geometry models for robust variation of the shape, and CFD automation to conduct design explorations and optimization — with a focus on simulation-ready, variable CAD.",
    docsUrl: "https://docs.caeses.com/docs/what-is-CAESES/",
    docsLabel: "Open CAESES Documentation",
    stats: [
      { value: "Dependency", label: "Based modeling", icon: Layers },
      { value: "Batch", label: "Headless automation", icon: Wrench },
      {
        value: "Plug-ins",
        label: "ANSYS · Optimus · optiSLang",
        icon: Rocket,
      },
    ],
    tracks: [
      {
        id: "cs-what-is",
        icon: Rocket,
        level: "Start here",
        title: "What is CAESES?",
        description:
          "Platform overview covering the CAD capabilities, process automation, and shape optimization that make CAESES an all-in-one design tool for simulation engineers.",
        url: "https://docs.caeses.com/docs/what-is-CAESES/",
        linkLabel: "Read the Overview",
      },
      {
        id: "cs-geometry",
        icon: GraduationCap,
        level: "Fundamentals",
        title: "Parametric Geometry Modeling",
        description:
          "Create objects through the CAD menu, then set their properties. Dependency-based modeling means models can be varied robustly during automated optimization without breaking or failing to regenerate.",
        url: "https://docs.caeses.com/docs/geometry-modeling/basics/",
        linkLabel: "Geometry Basics",
        topics: [
          "Dependency-based modeling vs. history-based CAD",
          "Types, commands, and the object hierarchy",
          "Creating dependencies by drag and drop",
          "Expressions and global commands",
          "Geometry constraints for feasible designs",
        ],
      },
      {
        id: "cs-shipflow",
        icon: Ship,
        level: "Integration",
        title: "SHIPFLOW Connection Tutorial",
        description:
          "Run SHIPFLOW from within CAESES: import an IGES hull, build a surface group, configure xflow and XPAN, then launch and monitor the computation and visualize wave patterns in the 3D view.",
        url: "https://docs.caeses.com/tutorials/maritime/software-connection/shipflow/",
        linkLabel: "Open Connection Tutorial",
        topics: [
          "Surface group assembly from imported IGES",
          "SHIPFLOW configuration — offset, lpp, xaxdir, ysign",
          "Main settings — mono hull, fsflow, coarse mesh",
          "Adding XPAN with iteration and core count",
          "Running and monitoring via the TaskMonitor",
        ],
      },
      {
        id: "cs-optimization",
        icon: Wrench,
        level: "Advanced",
        title: "Optimization & Automation",
        description:
          "Connect external meshing and analysis tools, run design explorations and formal shape optimization, then browse results through the variant management system with charts and PDF reports.",
        url: "https://docs.caeses.com/docs/optimization/overview/",
        linkLabel: "Optimization Guide",
        topics: [
          "Software connection and batch-mode automation",
          "Single- and multi-objective constrained problems",
          "Sampling with response-surface strategies",
          "Variant management, charts and reports",
        ],
      },
    ],
    quickLinks: [
      {
        icon: FileText,
        label: "Software Connection",
        url: "https://docs.caeses.com/docs/software-connection/overview/",
      },
      {
        icon: BookOpen,
        label: "Features",
        url: "https://docs.caeses.com/docs/features/introduction/",
      },
      {
        icon: Wrench,
        label: "Batch Mode",
        url: "https://docs.caeses.com/docs/batch-mode/",
      },
    ],
  },
];

const levelColors = {
  "Start here":
    "from-emerald-500/20 to-emerald-500/5 text-emerald-400 border-emerald-500/20",
  Basic: "from-blue-500/20 to-blue-500/5 text-blue-400 border-blue-500/20",
  Fundamentals:
    "from-violet-500/20 to-violet-500/5 text-violet-400 border-violet-500/20",
  Integration:
    "from-amber-500/20 to-amber-500/5 text-amber-400 border-amber-500/20",
  Advanced: "from-rose-500/20 to-rose-500/5 text-rose-400 border-rose-500/20",
};

const getLevelColor = (level) => levelColors[level] || levelColors["Basic"];

export default function TutorialsPage() {
  const navigate = useNavigate();
  const [activeId, setActiveId] = useState(platforms[0].id);
  const [query, setQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

  const active = platforms.find((p) => p.id === activeId) || platforms[0];
  const ActiveIcon = active.icon;

  const visibleTracks = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return active.tracks;
    return active.tracks.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.level.toLowerCase().includes(q) ||
        (t.topics || []).some((topic) => topic.toLowerCase().includes(q))
    );
  }, [active, query]);

  return (
    <main className="min-h-screen overflow-hidden bg-[#05080d] text-white">
      {/* =====================================================
          HERO — compact
      ===================================================== */}
      <section className="relative py-8 md:py-20 lg:py-30">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(34,211,238,.6) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34,211,238,.6) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
        <div className="pointer-events-none absolute left-1/2 top-1/3 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/[0.03] blur-[120px]" />

        <div className="relative mx-auto max-w-[1300px] px-5 sm:px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-5 flex items-center gap-3"
          >
            <span className="h-px w-8 bg-cyan-400" />
            <span className="text-[9px] font-medium tracking-[0.3em] text-cyan-400">
              TUTORIALS
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="text-2xl font-semibold leading-[1.1] tracking-[-0.03em] sm:text-3xl md:text-4xl lg:text-[2.75rem]">
              Software Tutorials{" "}
              <span className="text-cyan-400">
                &amp;&nbsp;Documentation
              </span>
            </h1>

            <p className="mt-4 max-w-2xl text-xs leading-6 text-slate-400 sm:text-sm sm:leading-7">
              Official training material for the simulation platforms we
              support. Every link opens the vendor&rsquo;s own documentation, so
              you always work from the current version.
            </p>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          PLATFORM SWITCHER + SEARCH — compact
      ===================================================== */}
      <section className="relative border-y border-white/[0.06] bg-[#071019]/50">
        <div className="mx-auto max-w-[1300px] px-5 sm:px-6 md:px-10">
          <div className="flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
            {/* Tabs */}
            <div className="flex gap-1.5">
              {platforms.map((p) => {
                const Icon = p.icon;
                const isActive = p.id === activeId;
                return (
                  <motion.button
                    key={p.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setActiveId(p.id);
                      setQuery("");
                    }}
                    className={`group relative flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition-all duration-300 sm:px-4 ${
                      isActive
                        ? "bg-cyan-400/[0.1] text-cyan-400 shadow-[0_0_16px_rgba(34,211,238,0.05)]"
                        : "text-slate-500 hover:bg-white/[0.03] hover:text-slate-300"
                    }`}
                  >
                    <Icon
                      size={13}
                      className={`transition-colors duration-300 ${
                        isActive
                          ? "text-cyan-400"
                          : "text-slate-600 group-hover:text-slate-400"
                      }`}
                    />
                    <span>{p.label}</span>
                    <span
                      className={`flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold transition-all duration-300 ${
                        isActive
                          ? "bg-cyan-400/20 text-cyan-400"
                          : "bg-white/[0.06] text-slate-600"
                      }`}
                    >
                      {p.tracks.length}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="platform-indicator"
                        className="absolute -bottom-[13px] left-1/2 h-[2px] w-6 -translate-x-1/2 bg-cyan-400"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 32,
                        }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Search */}
            <div
              className={`relative flex items-center rounded-lg border transition-all duration-300 ${
                searchFocused
                  ? "border-cyan-400/30 bg-cyan-400/[0.03] shadow-[0_0_16px_rgba(34,211,238,0.04)]"
                  : "border-white/[0.08] bg-white/[0.02]"
              }`}
            >
              <Search
                size={13}
                className={`ml-3 shrink-0 transition-colors duration-300 ${
                  searchFocused ? "text-cyan-400" : "text-slate-600"
                }`}
              />
              <input
                type="text"
                placeholder={`Search ${active.label} tutorials...`}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className="w-full bg-transparent px-2.5 py-2 text-xs text-white placeholder-slate-600 outline-none sm:w-56"
              />
              <AnimatePresence>
                {query && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={() => setQuery("")}
                    className="mr-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-white/[0.08] text-slate-400 transition-colors hover:bg-white/[0.12] hover:text-white"
                  >
                    <X size={10} />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          PLATFORM BANNER — compact
      ===================================================== */}
      <section className="py-6 md:py-10">
        <div className="mx-auto max-w-[1300px] px-5 sm:px-6 md:px-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="relative overflow-hidden rounded-xl border border-white/[0.07] bg-gradient-to-br from-[#081019] via-[#0a1420] to-[#071019] p-5 sm:rounded-2xl sm:p-6 md:p-7"
            >
              {/* Background glow */}
              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-cyan-500/[0.04] blur-[80px]" />
              <div className="pointer-events-none absolute -bottom-12 -left-12 h-32 w-32 rounded-full bg-violet-500/[0.03] blur-[60px]" />

              <div className="relative grid gap-6 lg:grid-cols-[1fr_auto] lg:gap-10">
                {/* Main content */}
                <div>
                  <div className="mb-3 flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-md border border-cyan-400/20 bg-cyan-400/[0.06] text-cyan-400">
                      <ActiveIcon size={12} strokeWidth={1.5} />
                    </div>
                    <span className="text-[10px] font-medium tracking-[0.15em] text-slate-500">
                      {active.vendor}
                    </span>
                  </div>

                  <h2 className="text-base font-semibold tracking-[-0.02em] sm:text-lg md:text-xl">
                    {active.tagline}
                  </h2>

                  <p className="mt-2.5 max-w-2xl text-xs leading-6 text-slate-400 sm:text-sm sm:leading-7">
                    {active.description}
                  </p>

                  <a
                    href={active.docsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-4 inline-flex items-center gap-1.5 rounded-lg bg-cyan-400 px-4 py-2 text-xs font-medium text-[#05080d] transition-all duration-300 hover:bg-cyan-300 hover:shadow-[0_0_24px_rgba(34,211,238,0.15)]"
                  >
                    {active.docsLabel}
                    <ArrowUpRight
                      size={13}
                      className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </a>
                </div>

                {/* Stats */}
                <div className="flex flex-wrap gap-2 sm:gap-2.5 lg:flex-col lg:gap-2">
                  {active.stats.map((s) => {
                    const Icon = s.icon;
                    return (
                      <div
                        key={s.label}
                        className="flex items-center gap-2.5 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 transition-all duration-300 hover:border-cyan-400/15 hover:bg-cyan-400/[0.02]"
                      >
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-white/[0.04] text-cyan-400">
                          <Icon size={12} strokeWidth={1.5} />
                        </div>
                        <div>
                          <span className="block text-xs font-semibold text-white">
                            {s.value}
                          </span>
                          <span className="block text-[9px] text-slate-500">
                            {s.label}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* =====================================================
          LEARNING PATH — compact
      ===================================================== */}
      <section className="border-t border-white/[0.06] bg-[#071019]/30 py-6 md:py-10">
        <div className="mx-auto max-w-[1300px] px-5 sm:px-6 md:px-10">
          {/* Section head */}
          <div className="mb-6 flex items-center gap-2.5 md:mb-8">
            <div className="flex h-6 w-6 items-center justify-center rounded-md border border-cyan-400/20 bg-cyan-400/[0.06] text-cyan-400">
              <Filter size={11} strokeWidth={1.5} />
            </div>
            <h3 className="text-xs font-semibold tracking-[-0.02em] sm:text-sm">
              Learning Path
            </h3>
            <span className="h-px flex-1 bg-white/[0.06]" />
            <span className="rounded-full border border-white/[0.08] bg-white/[0.02] px-2.5 py-0.5 font-mono text-[9px] text-slate-500">
              {visibleTracks.length} of {active.tracks.length}
            </span>
          </div>

          {/* Track cards */}
          <AnimatePresence mode="wait">
            {visibleTracks.length > 0 ? (
              <motion.div
                key={`${active.id}-${query}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid gap-3 sm:grid-cols-2 lg:gap-4 xl:grid-cols-2"
              >
                {visibleTracks.map((track, i) => {
                  const Icon = track.icon;
                  const colorClass = getLevelColor(track.level);

                  return (
                    <motion.article
                      key={track.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: i * 0.06 }}
                      className="group relative flex flex-col overflow-hidden rounded-xl border border-white/[0.07] bg-[#05080d] transition-all duration-500 hover:border-cyan-400/20 hover:shadow-[0_0_32px_rgba(34,211,238,0.03)]"
                    >
                      {/* Top accent line */}
                      <div className="h-[1.5px] w-full bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                      <div className="flex flex-1 flex-col p-4 sm:p-5">
                        {/* Header */}
                        <div className="mb-3 flex items-start justify-between">
                          <div className="flex items-center gap-2.5">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-cyan-400/15 bg-cyan-400/[0.05] text-cyan-400 transition-all duration-300 group-hover:border-cyan-400/30 group-hover:bg-cyan-400/[0.1]">
                              <Icon size={14} strokeWidth={1.5} />
                            </div>
                            <div className="flex flex-col gap-0.5">
                              <span
                                className={`inline-flex w-fit items-center rounded-full border bg-gradient-to-r px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.12em] ${colorClass}`}
                              >
                                {track.level}
                              </span>
                              <span className="font-mono text-[9px] text-slate-600">
                                Step {String(i + 1).padStart(2, "0")}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Title & description */}
                        <h4 className="text-sm font-semibold tracking-[-0.01em] text-white transition-colors duration-300 group-hover:text-cyan-50 sm:text-[15px]">
                          {track.title}
                        </h4>
                        <p className="mt-2 text-[11px] leading-5 text-slate-500 sm:text-xs sm:leading-6">
                          {track.description}
                        </p>

                        {/* Topics */}
                        {track.topics && (
                          <div className="mt-3 flex flex-col gap-1">
                            {track.topics.map((t) => (
                              <div
                                key={t}
                                className="flex items-start gap-1.5 text-[10px] text-slate-500 sm:text-[11px]"
                              >
                                <ChevronRight
                                  size={9}
                                  className="mt-[2px] shrink-0 text-cyan-400/50"
                                />
                                <span className="transition-colors duration-300 group-hover:text-slate-400">
                                  {t}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Spacer */}
                        <div className="flex-1" />

                        {/* Link */}
                        <a
                          href={track.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 inline-flex items-center gap-1.5 self-start rounded-lg border border-white/[0.08] px-3 py-1.5 text-[11px] font-medium text-slate-400 transition-all duration-300 hover:border-cyan-400/30 hover:bg-cyan-400/[0.04] hover:text-cyan-400 sm:text-xs"
                        >
                          {track.linkLabel}
                          <ExternalLink size={11} />
                        </a>
                      </div>
                    </motion.article>
                  );
                })}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center justify-center rounded-xl border border-white/[0.07] bg-[#05080d] px-5 py-12 text-center sm:rounded-2xl"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.02]">
                  <BookOpen size={22} className="text-slate-600" />
                </div>
                <h4 className="text-sm font-semibold">
                  No tutorials match &ldquo;{query}&rdquo;
                </h4>
                <p className="mt-1.5 max-w-sm text-xs text-slate-500">
                  Try a different keyword, or browse the full documentation.
                </p>
                <button
                  onClick={() => setQuery("")}
                  className="mt-5 flex items-center gap-1.5 rounded-lg bg-cyan-400/10 px-4 py-2 text-xs font-medium text-cyan-400 transition-all duration-300 hover:bg-cyan-400/20"
                >
                  Clear Search
                  <X size={12} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* =====================================================
          QUICK REFERENCE — compact
      ===================================================== */}
      <section className="py-6 md:py-10">
        <div className="mx-auto max-w-[1300px] px-5 sm:px-6 md:px-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id + "-quick"}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-start justify-between gap-4 rounded-xl border border-white/[0.07] bg-[#071019] p-5 sm:flex-row sm:items-center sm:rounded-2xl sm:p-6"
            >
              <div>
                <div className="mb-1.5 flex items-center gap-1.5">
             
                  <span className="text-[9px] font-medium tracking-[0.2em] text-cyan-400">
                    QUICK REFERENCE
                  </span>
                </div>
                <h3 className="text-sm font-semibold sm:text-base">
                  {active.label} Quick Reference
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  Manuals, glossaries and reference material from the vendor.
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {active.quickLinks.map((l) => {
                  const Icon = l.icon;
                  return (
                    <a
                      key={l.url}
                      href={l.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.02] px-3 py-2 text-xs font-medium text-slate-400 transition-all duration-300 hover:border-cyan-400/25 hover:bg-cyan-400/[0.04] hover:text-cyan-400"
                    >
                      <Icon
                        size={12}
                        className="text-slate-600 transition-colors duration-300 group-hover:text-cyan-400"
                      />
                      {l.label}
                      <ArrowRight
                        size={11}
                        className="opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
                      />
                    </a>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}
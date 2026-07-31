import { motion } from "framer-motion";
import { Workflow, ScanSearch, Sparkles } from "lucide-react";
import guiImage from "../../../assets/images/simulation/motor.png";

const features = [
  {
    id: "01",
    icon: Workflow,
    title: "Automated Workflows",
    description: "From geometry import to final report generation",
  },
  {
    id: "02",
    icon: ScanSearch,
    title: "Pre- & Post-Processing",
    description: "Streamlined setup and visualization tools",
  },
  {
    id: "03",
    icon: Sparkles,
    title: "Parametric CAD & Optimization",
    description: "Automated hull form variations and design space exploration.",
    badge: "Requires CAESES License",
  },
];

const pins = [
  {
    label: "Geometry",
    position: "left-[18%] top-[28%]",
  },
  {
    label: "Solver",
    position: "right-[12%] top-[22%]",
  },
  {
    label: "Optimization",
    position: "bottom-[18%] left-[36%]",
  },
];

export default function InterfaceResults() {
  return (
    <section className="relative overflow-hidden bg-[#02070D] py-20 sm:py-28 lg:py-36">

      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_40%,rgba(56,189,248,.08),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(111,195,223,.05),transparent_50%)]" />
      <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(rgba(111,195,223,.15)_1px,transparent_1px),linear-gradient(90deg,rgba(111,195,223,.15)_1px,transparent_1px)] [background-size:70px_70px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 sm:mb-20 text-center"
        >
          <p className="mb-4 text-xs uppercase tracking-[0.4em] text-cyan-300">
            Intuitive Interface
          </p>
          <h2 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            Powerful{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-cyan-400 to-cyan-300 bg-clip-text text-transparent">
              Results
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
            SHIPFLOW GUI and CAESES integration provide seamless workflows 
            from design to optimization.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-16 xl:gap-24">

          {/* LEFT — Image */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true }}
            className="relative flex-1"
          >
            {/* Glow */}
            <div className="absolute -inset-8 rounded-full bg-cyan-400/8 blur-[100px]" />

            {/* Floating Window */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative overflow-hidden rounded-[28px] border border-cyan-300/20 bg-[#07111d] shadow-[0_30px_80px_rgba(0,0,0,.5)]"
            >
              {/* Window Title Bar */}
              <div className="flex items-center justify-between border-b border-cyan-300/10 bg-[#04101F]/80 px-5 py-3.5">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                    <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                    <div className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
                  </div>
                  <span className="text-xs text-slate-400">SHIPFLOW Interface</span>
                </div>
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="h-1.5 w-1.5 rounded-full bg-green-400"
                  />
                  <span className="text-[10px] text-slate-400">Running</span>
                </div>
              </div>

              {/* Image */}
              <div className="relative">
                <img
                  src={guiImage}
                  alt="SHIPFLOW User Interface"
                  className="w-full"
                />

                {/* Reflection */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/8 via-transparent to-transparent" />

                {/* Pins */}
                {pins.map((pin, i) => (
                  <motion.div
                    key={pin.label}
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.2 }}
                    className={`absolute ${pin.position}`}
                  >
                    <div className="flex items-center gap-2 rounded-full border border-cyan-300/25 bg-[#06111E]/90 px-3 py-1.5 backdrop-blur-xl shadow-lg">
                      <motion.span
                        animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                        transition={{ repeat: Infinity, duration: 2, delay: i * 0.3 }}
                        className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_6px_rgba(111,195,223,.8)]"
                      />
                      <span className="text-xs font-medium text-white">
                        {pin.label}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Status Bar */}
              <div className="border-t border-cyan-300/10 bg-[#04101F]/80 px-5 py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] text-slate-500">SHIPFLOW GUI</span>
                    <span className="text-[10px] text-slate-500">+</span>
                    <span className="text-[10px] text-slate-500">CAESES Integration</span>
                  </div>
                  <span className="text-[10px] text-cyan-300">Professional</span>
                </div>
              </div>
            </motion.div>

            {/* Side Accent */}
            <div className="absolute -right-3 top-1/4 h-24 w-px bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent hidden lg:block" />
          </motion.div>

          {/* RIGHT — Features */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true }}
            className="flex-1 space-y-5"
          >
            {features.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.6 }}
                  whileHover={{
                    x: 8,
                    borderColor: "rgba(56,189,248,.35)",
                  }}
                  className="group relative overflow-hidden rounded-[24px] border border-white/8 bg-white/[0.03] p-6 sm:p-7 backdrop-blur-xl transition-all duration-500 hover:bg-white/[0.05]"
                >
                  {/* Hover scan effect */}
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-cyan-400/5 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                  <div className="relative flex items-start gap-5 sm:gap-6">
                    {/* Icon */}
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-400/10 sm:h-14 sm:w-14"
                    >
                      <Icon className="h-5 w-5 text-cyan-300 sm:h-6 sm:w-6" />
                    </motion.div>

                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-[10px] font-medium tracking-[0.35em] text-cyan-300">
                          {item.id}
                        </span>
                        <div className="h-px flex-1 bg-gradient-to-r from-cyan-400/20 to-transparent" />
                      </div>

                      <h3 className="text-xl font-bold text-white sm:text-2xl">
                        {item.title}
                      </h3>

                      <p className="mt-3 text-sm leading-7 text-slate-400 sm:text-base">
                        {item.description}
                      </p>

                      {item.badge && (
                        <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-400/8 px-4 py-1.5">
                          <div className="h-1 w-1 rounded-full bg-cyan-300" />
                          <span className="text-[10px] uppercase tracking-[0.25em] text-cyan-300 font-medium">
                            {item.badge}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Bottom accent */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + 0.3, duration: 0.8 }}
                    className="absolute bottom-0 left-0 h-px w-full origin-left bg-gradient-to-r from-cyan-400/30 via-cyan-400/10 to-transparent"
                  />
                </motion.div>
              );
            })}

            {/* Bottom Note */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="rounded-2xl border border-cyan-400/10 bg-[#06111E]/40 p-5 backdrop-blur-xl"
            >
              <div className="flex items-start gap-4">
                <div className="mt-0.5 h-5 w-5 shrink-0 rounded-full border border-cyan-400/30 bg-cyan-400/10 flex items-center justify-center">
                  <div className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                </div>
                <p className="text-sm leading-6 text-slate-400">
                  CAESES provides parametric CAD capabilities and design optimization.
                  SHIPFLOW seamlessly integrates with CAESES for automated hull form 
                  variations and design space exploration — enabling engineers to 
                  evaluate hundreds of designs efficiently.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
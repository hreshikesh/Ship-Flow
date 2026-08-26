import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

function CaesesWhy() {
    const features = [
        {
            number: "01",
            title: "Hull Form Parametrization",
            text: "Model and morph complex ship hulls, bulbous bows, stern shapes, and appendages with absolute CAD robustness. Generate 100% defect-free shapes while strictly respecting hydrostatic constraints.",
        },
        {
            number: "02",
            title: "Propeller & Appendage Design",
            text: "Design high-efficiency marine propulsion systems, rudders, and energy-saving devices (ESDs). Easily control complex distributions of pitch, rake, skew, chord length, and camber.",
        },
        {
            number: "03",
            title: "Closed-Loop CFD Automation",
            text: "Seamlessly integrate with marine CFD solvers (such as SHIPFLOW, Star-CCM+, and FINE/Marine). Automate the simulation pipeline to run design explorations and shape optimization unattended.",
        },
    ];

    return (
        <section className="relative overflow-hidden bg-[#02080d] py-28 text-white md:py-36">

            {/* Background Details */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/[0.025] blur-[120px]" />

                <div
                    className="absolute inset-0 opacity-[0.08]"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(6,182,212,0.04) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(6,182,212,0.04) 1px, transparent 1px)
                        `,
                        backgroundSize: "60px 60px",
                    }}
                />
            </div>

            <div className="relative mx-auto max-w-[1380px] px-6 lg:px-10">

                {/* Heading Block */}
                <div className="grid items-end gap-10 lg:grid-cols-[1fr_0.7fr]">

                    <motion.div
                        initial={{ opacity: 0, y: 35 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-xs font-bold tracking-[0.25em] text-cyan-400 uppercase">
                            HYDRODYNAMIC EXCELLENCE
                        </span>

                        <h2 className="mt-5 max-w-4xl text-4xl font-extrabold leading-[1.02] tracking-tight sm:text-5xl lg:text-7xl">
                            From Complex Shapes
                            <span className="block text-white/30">
                                to Optimal Performance.
                            </span>
                        </h2>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ delay: 0.15, duration: 0.7 }}
                        className="max-w-lg pb-1 text-sm leading-7 text-slate-400 md:text-base font-light"
                    >
                        CAESES is the maritime standard for simulation-ready parametric CAD. It bridges the gap between raw hull/propeller design and automated numerical CFD solvers to produce highly optimized hulls.
                    </motion.p>

                </div>

                {/* Feature Cards Grid */}
                <div className="mt-20 grid border-y border-white/[0.08] md:grid-cols-3">

                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.number}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{
                                delay: index * 0.12,
                                duration: 0.7,
                            }}
                            className={`group relative min-h-[300px] p-7 md:p-9 transition-colors duration-500 hover:bg-cyan-500/[0.01] ${
                                index !== 0
                                    ? "border-t border-white/[0.08] md:border-l md:border-t-0"
                                    : ""
                            }`}
                        >
                            {/* Card Header Info */}
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold tracking-[0.2em] text-cyan-400/80">
                                    {feature.number}
                                </span>

                               
                            </div>

                            {/* Card Body */}
                            <div className="mt-16">
                                <h3 className="text-xl font-bold tracking-wide text-white group-hover:text-cyan-100 transition-colors duration-300">
                                    {feature.title}
                                </h3>

                                <p className="mt-4 max-w-sm text-xs sm:text-sm leading-6 text-slate-400 font-light group-hover:text-slate-300 transition-colors duration-300">
                                    {feature.text}
                                </p>
                            </div>

                            {/* Neon Dynamic Underline Accent */}
                            <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-cyan-500 via-sky-400 to-transparent transition-all duration-700 group-hover:w-full" />
                        </motion.div>
                    ))}

                </div>

                {/* Bottom Footnote Statement */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="mt-14 flex flex-col justify-between gap-5 md:flex-row md:items-center"
                >
                    <p className="max-w-2xl text-xs sm:text-sm leading-6 text-slate-500 font-light">
                        Leverage robust geometry variation pipelines to find lower resistance hulls, minimize cavitation on propellers, and improve fuel efficiency faster.
                    </p>

                    <span className="text-[10px] font-bold tracking-[0.25em] text-slate-500 uppercase">
                        CAESES × MARITIME SUITE
                    </span>
                </motion.div>

            </div>
        </section>
    );
}

export default CaesesWhy;
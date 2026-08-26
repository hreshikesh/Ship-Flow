import { motion } from "framer-motion";
import { ArrowRight, MoveUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

function EngineeringContactCTA() {
  const navigate = useNavigate();

  return (
    <section className="relative isolate overflow-hidden bg-[#02080d] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-32">
      
      {/* Background radial glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/[0.07] blur-[100px] sm:h-[500px] sm:w-[500px]" />
      </div>

      {/* Technical grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34,211,238,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34,211,238,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "45px 45px",
          maskImage:
            "radial-gradient(circle at center, black 0%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(circle at center, black 0%, transparent 70%)",
        }}
      />

      {/* Technical orbit graphics */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full border border-cyan-400/10 sm:-right-20 sm:-top-20 sm:h-[420px] sm:w-[420px]">
        <div className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)]" />
      </div>

      <div className="pointer-events-none absolute -bottom-40 -left-40 h-80 w-80 rounded-full border border-cyan-400/[0.07] sm:-bottom-48 sm:-left-32 sm:h-[420px] sm:w-[420px]" />

      {/* Floating nodes */}
      <motion.div
        className="pointer-events-none absolute left-[12%] top-[25%] h-1.5 w-1.5 rounded-full bg-cyan-400"
        animate={{
          opacity: [0.2, 1, 0.2],
          scale: [0.8, 1.4, 0.8],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="pointer-events-none absolute right-[18%] bottom-[25%] h-1.5 w-1.5 rounded-full bg-cyan-300"
        animate={{
          opacity: [1, 0.2, 1],
          scale: [1.4, 0.8, 1.4],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 mx-auto max-w-5xl text-center">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="mb-5 flex items-center justify-center gap-3"
        >
          <span className="h-px w-8 bg-cyan-400/50 sm:w-12" />

          <span className="text-[10px] font-semibold tracking-[0.3em] text-cyan-400 sm:text-xs">
            LET'S ENGINEER WHAT'S NEXT
          </span>

          <span className="h-px w-8 bg-cyan-400/50 sm:w-12" />
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mx-auto max-w-4xl text-3xl font-medium leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl"
        >
          Turn Complex Engineering
          <span className="block bg-gradient-to-r from-cyan-300 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Challenges Into Better Designs.
          </span>
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-400 sm:mt-7 sm:text-base sm:leading-8"
        >
          From hydrodynamic simulation with SHIPFLOW to parametric
          optimization with CAESES, SandebTech helps engineering teams make
          faster, smarter design decisions.
        </motion.p>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          {/* Primary */}
          <a
            href="https://sandebtech.com/meeting"
            className="group flex w-full items-center justify-center gap-3 rounded-full bg-cyan-400 px-7 py-3.5 text-sm font-semibold text-[#021018] transition-all duration-300 hover:bg-cyan-300 hover:shadow-[0_0_35px_rgba(34,211,238,0.3)] sm:w-auto"
          >
            Talk to Our Experts

            <ArrowRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>

          {/* Secondary */}
          <a
            href="https://sandebtech.com/contact"
            target="_blank"
            
            className="group flex w-full items-center justify-center gap-2 rounded-full border border-white/10 px-7 py-3.5 text-sm font-medium text-slate-300 transition-all duration-300 hover:border-cyan-400/30 hover:bg-white/[0.03] hover:text-white sm:w-auto"
          >
           Contact Us

            <MoveUpRight
              size={16}
              className="text-slate-500 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan-400"
            />
          </a>
        </motion.div>
      </div>

      {/* Bottom technical line */}
      <div className="relative z-10 mx-auto mt-16 flex max-w-5xl items-center justify-center gap-3 sm:mt-20">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-cyan-400/20" />

        <div className="flex items-center gap-2">
          <span className="h-1 w-1 rounded-full bg-cyan-400" />
          <span className="h-1 w-1 rounded-full bg-cyan-400/40" />
          <span className="h-1 w-1 rounded-full bg-cyan-400/20" />
        </div>

        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-cyan-400/20" />
      </div>
    </section>
  );
}

export default EngineeringContactCTA;
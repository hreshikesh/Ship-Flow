import { motion } from "framer-motion";
import { ArrowLeft, Home, Compass } from "lucide-react";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#02080d] px-5 py-20 text-white sm:px-8">

      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/[0.08] blur-[100px] sm:h-[500px] sm:w-[500px]" />
      </div>

      {/* Engineering grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34,211,238,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34,211,238,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "45px 45px",
          maskImage:
            "radial-gradient(circle at center, black 0%, transparent 72%)",
          WebkitMaskImage:
            "radial-gradient(circle at center, black 0%, transparent 72%)",
        }}
      />

      {/* Decorative orbit */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/10 sm:h-[420px] sm:w-[420px]"
        animate={{ rotate: 360 }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)]" />
      </motion.div>

      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-400/[0.08] sm:h-[310px] sm:w-[310px]"
        animate={{ rotate: -360 }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <span className="absolute -right-1 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-blue-400" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-3xl text-center">

        {/* Status */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-5 flex items-center justify-center gap-3"
        >
          <span className="h-px w-8 bg-cyan-400/40 sm:w-12" />

          <span className="text-[10px] font-semibold tracking-[0.3em] text-cyan-400 sm:text-xs">
            SYSTEM RESPONSE · 404
          </span>

          <span className="h-px w-8 bg-cyan-400/40 sm:w-12" />
        </motion.div>

        {/* 404 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="relative"
        >
          <h1 className="select-none text-[110px] font-bold leading-none tracking-[-0.08em] text-white sm:text-[170px] lg:text-[210px]">
            4
            <span className="bg-gradient-to-b from-cyan-300 via-cyan-400 to-blue-600 bg-clip-text text-transparent">
              0
            </span>
            4
          </h1>

          {/* Center scanning line */}
          <motion.div
            className="pointer-events-none absolute left-1/2 top-1/2 h-px w-[80%] -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"
            animate={{
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-5 text-2xl font-medium tracking-tight text-white sm:text-3xl"
        >
          The page you're looking for
          <span className="text-cyan-400"> doesn't exist.</span>
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-400 sm:text-base sm:leading-8"
        >
          The requested route may have been moved, removed, or never existed.
          Let's get you back to the SandebTech experience.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <button
            onClick={() => navigate("/")}
            className="group flex w-full items-center justify-center gap-2 rounded-full bg-cyan-400 px-7 py-3.5 text-sm font-semibold text-[#021018] transition-all duration-300 hover:bg-cyan-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.25)] sm:w-auto"
          >
            <Home size={17} />

            Back to Home

            <ArrowLeft
              size={16}
              className="order-first transition-transform duration-300 group-hover:-translate-x-1"
            />
          </button>

          <button
            onClick={() => navigate(-1)}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-7 py-3.5 text-sm font-medium text-slate-300 transition-all duration-300 hover:border-cyan-400/30 hover:bg-white/[0.05] hover:text-white sm:w-auto"
          >
            <Compass size={17} />

            Go Back
          </button>
        </motion.div>

        {/* Technical status */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mx-auto mt-12 flex max-w-md items-center justify-center gap-3"
        >
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />

          <div className="flex items-center gap-2 text-[9px] font-medium tracking-[0.2em] text-slate-600">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400/60" />
            ROUTE NOT FOUND
          </div>

          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
        </motion.div>
      </div>
    </main>
  );
}

export default NotFound;
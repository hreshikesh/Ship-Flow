// FeatureCard.jsx
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1];

export default function FeatureCard({ feature, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease,
      }}
      whileHover={{
        y: -8,
        scale: 1.02,
        transition: { duration: 0.3 },
      }}
      className="group relative overflow-hidden rounded-xl
        border border-[#6FC3DF]/20
        bg-gradient-to-br from-[#071A2F] via-[#04101F] to-[#020A14]
        p-5
        shadow-[0_15px_50px_rgba(0,0,0,.4)]
        backdrop-blur-xl
        transition-shadow duration-500
        hover:shadow-[0_20px_60px_rgba(111,195,223,.2)]
        sm:p-6 lg:p-5"
    >
      {/* Sweep glow effect */}
      <div className={`absolute -left-20 top-0 h-full w-20 rotate-12 bg-gradient-to-r ${feature.gradient} blur-[60px] transition-all duration-700 group-hover:left-full`} />

      {/* Scan line */}
      <div className="absolute inset-0 overflow-hidden rounded-xl">
        <motion.div
          animate={{ x: ["-150%", "150%"] }}
          transition={{
            repeat: Infinity,
            duration: 5,
            ease: "linear",
            delay: index * 0.5,
          }}
          className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-white/8 to-transparent skew-x-12"
        />
      </div>

      {/* Fine grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.05] group-hover:opacity-[0.08] transition-opacity duration-500"
        style={{
          backgroundImage: `
            linear-gradient(rgba(111,195,223,.35) 1px, transparent 1px),
            linear-gradient(90deg, rgba(111,195,223,.35) 1px, transparent 1px)
          `,
          backgroundSize: "28px 28px",
        }}
      />

      {/* Corner brackets - smaller */}
      <span className="absolute left-3 top-3 h-4 w-4 border-l-2 border-t-2 border-[#6FC3DF]/50 transition-all duration-300 group-hover:h-5 group-hover:w-5" />
      <span className="absolute right-3 top-3 h-4 w-4 border-r-2 border-t-2 border-[#6FC3DF]/50 transition-all duration-300 group-hover:h-5 group-hover:w-5" />
      <span className="absolute bottom-3 left-3 h-4 w-4 border-b-2 border-l-2 border-[#6FC3DF]/50 transition-all duration-300 group-hover:h-5 group-hover:w-5" />
      <span className="absolute bottom-3 right-3 h-4 w-4 border-b-2 border-r-2 border-[#6FC3DF]/50 transition-all duration-300 group-hover:h-5 group-hover:w-5" />

      {/* Content */}
      <div className="relative z-20">
        {/* Icon with animated rings - compact */}
        <div className="flex items-center justify-between gap-3">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="relative grid h-14 w-14 shrink-0 place-items-center"
          >
            <div className="absolute inset-0 rounded-full border-2 border-[#6FC3DF]/25" />
            <div className="absolute inset-1.5 rounded-full border border-[#6FC3DF]/20" />
            
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.7, 0, 0.7],
              }}
              transition={{
                repeat: Infinity,
                duration: 2.5,
              }}
              className="absolute inset-3 rounded-full border-2 border-[#6FC3DF]/50"
            />

            <div className="relative grid h-10 w-10 place-items-center rounded-full border-2 border-[#6FC3DF]/40 bg-gradient-to-br from-[#6FC3DF]/20 to-[#38BDF8]/10 text-lg shadow-[inset_0_2px_8px_rgba(111,195,223,.2)]">
              {feature.icon}
            </div>
          </motion.div>

          {/* Value badge - compact */}
          <div className="text-right">
            <p className="text-[9px] font-medium uppercase tracking-[0.3em] text-[#6FC3DF]/80">
              Performance
            </p>
            <motion.h4
              whileHover={{ scale: 1.05 }}
              className="mt-1 bg-gradient-to-r from-white to-[#6FC3DF] bg-clip-text text-sm font-bold text-transparent"
            >
              {feature.value}
            </motion.h4>
          </div>
        </div>

        {/* Title and description - compact */}
        <div className="mt-5">
          <p className="text-[9px] font-medium uppercase tracking-[0.32em] text-[#6FC3DF]/90">
            Module
          </p>

          <h3 className="mt-2 text-lg font-bold tracking-[-0.02em] text-white sm:text-xl">
            {feature.title}
          </h3>

          <div className="mt-1.5 h-0.5 w-12 rounded-full bg-gradient-to-r from-[#6FC3DF] to-transparent" />

          <p className="mt-3 text-sm leading-6 text-[#AFC4D8]">
            {feature.description}
          </p>
        </div>
      </div>

      {/* Bottom accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: index * 0.1 }}
        className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-gradient-to-r from-[#6FC3DF]/50 via-[#38BDF8]/30 to-transparent"
      />
    </motion.div>
  );
}
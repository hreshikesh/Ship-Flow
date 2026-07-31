// AboutHeader.jsx
import { motion } from "framer-motion";

export default function AboutHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto max-w-5xl text-center"
    >
      {/* Marine badge */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-6 inline-flex items-center gap-3 rounded-full border border-[#6FC3DF]/30 bg-[#6FC3DF]/5 px-5 py-2 backdrop-blur-sm"
      >
        <span className="text-xl">⚓</span>
        <p className="uppercase tracking-[0.35em] text-[#6FC3DF] text-xs font-medium">
          Engineering Confidence
        </p>
      </motion.div>

      <h2 className="font-semibold leading-[0.95] tracking-[-0.06em] text-white
        text-[clamp(2.5rem,7vw,6rem)]
        sm:text-[clamp(3rem,8vw,6rem)]">
        The
        <br />
        <motion.span
          initial={{ backgroundPosition: "0% 50%" }}
          animate={{ backgroundPosition: "100% 50%" }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
          className="bg-gradient-to-r from-[#6FC3DF] via-[#38BDF8] to-[#6FC3DF] bg-[length:200%_auto] bg-clip-text text-transparent"
        >
          SHIPFLOW
        </motion.span>{" "}
        Platform
      </h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.4 }}
        className="mx-auto mt-8 max-w-3xl text-base leading-7 text-[#9FB4C8] 
          sm:text-lg sm:leading-8 
          md:mt-10"
      >
        SHIPFLOW is a specialised multi-fidelity CFD solution for resistance,
        propulsion, seakeeping and manoeuvring — designed to be fast,
        accurate and exceptionally easy to use throughout the complete
        vessel development process.
      </motion.p>

      {/* Wave decoration */}
      <motion.div
        animate={{ x: [0, 20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="mx-auto mt-8 h-1 w-32 overflow-hidden rounded-full bg-gradient-to-r from-transparent via-[#6FC3DF]/50 to-transparent"
      />
    </motion.div>
  );
}
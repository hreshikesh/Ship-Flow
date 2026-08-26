import { motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import DepthCarousel from "./DepthCarousel"; // Make sure to save the DepthCarousel component in the same folder
import hero1 from "../../../../assets/images/shipflow/hero/hero1.webp";
import hero2 from "../../../../assets/images/shipflow/hero/hero2.webp";
import hero3 from "../../../../assets/images/shipflow/hero/hero3.webp";
import hero4 from "../../../../assets/images/shipflow/hero/hero4.webp";

const carouselItems = [
  { image: hero1, alt: "Resistance & Propulsion" },
  { image: hero2, alt: "Hull Form Optimization" },
  { image: hero3, alt: "Seakeeping Analysis" },
    { image: hero4, alt: "Shipflow" }
];

const ShipflowHero = ({ image }) => {
  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-[#03080d] text-white flex flex-col justify-center">

      {/* ================= BACKGROUND ================= */}

      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 1.8,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <img
          src={image}
          alt="ShipFlow marine CFD"
          className="h-full w-full object-conatin object-center opacity-40"
        />
      </motion.div>

      {/* Dark cinematic overlays */}
      <div className="absolute inset-0 bg-black/40" />

      <div
        className="
          absolute inset-0
          bg-gradient-to-r
          from-[#02070b]/95
          via-[#02070b]/75
          to-transparent
        "
      />

      <div
        className="
          absolute inset-x-0 bottom-0 h-[40%]
          bg-gradient-to-t
          from-[#03080d]
          via-[#03080d]/65
          to-transparent
        "
      />

      {/* ================= CONTENT & CAROUSEL ================= */}

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1400px] flex-col lg:flex-row lg:items-center px-5 py-24 md:px-10 lg:py-0">
        
        {/* LEFT COLUMN: Copy */}
        <div className="w-full pt-10 lg:w-[50%] lg:pt-0 lg:pr-10 xl:pr-16">
          
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7 }}
            className="mb-5 flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.25em] text-white/70 md:text-xs"
          >
            <span className="h-px w-8 bg-cyan-400/70 md:w-12" />
            <span>SHIPFLOW®</span>
            <span className="text-white/30">/</span>
            <span className="text-cyan-300/80">MARINE CFD</span>
          </motion.div>

          {/* Official Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 45 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.4,
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="
              text-[clamp(2.5rem,2vw,4.5rem)]
              font-bold
              leading-[1.05]
              tracking-[-0.03em]
              lg:leading-[0.95]
            "
          >
            ShipFlow <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-white via-cyan-100 to-cyan-300 bg-clip-text text-transparent">
              from FLOWTECH International AB, Sweden
            </span>
          </motion.h1>

          {/* Official Description */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.65,
              duration: 0.8,
            }}
            className="
              mt-6
              max-w-[500px]
              text-sm
              leading-relaxed
              text-slate-400
              md:text-base
            "
          >
            Dedicated CFD software developed by naval architects. 
            Highly specialized for resistance, propulsion, manoeuvring, 
            and seakeeping predictions to optimize modern hull forms and energy-saving devices.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.85,
              duration: 0.7,
            }}
            className="mt-8"
          >
            <button
              onClick={scrollToNext}
              className="
                group
                inline-flex
                items-center
                gap-3
                rounded-full
                border
                border-cyan-400/30
                bg-cyan-500/10
                px-6
                py-3.5
                text-xs
                font-semibold
                uppercase
                tracking-wider
                text-cyan-100
                backdrop-blur-md
                transition-all
                duration-300
                hover:border-cyan-300/60
                hover:bg-cyan-400/20
                hover:shadow-[0_0_20px_rgba(6,182,212,0.2)]
              "
            >
              Explore Capabilities
              <ArrowRight
                size={16}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />
            </button>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: Depth Carousel */}
        <motion.div 
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ delay: 0.8, duration: 1 }}
          className="relative mt-12 h-[350px] w-full sm:h-[450px] lg:mt-0 lg:h-[600px] lg:w-[50%]"
        >
          {/* Faded glow behind the carousel */}
          <div className="absolute left-1/2 top-1/2 -z-10 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[80px]" />
          
          <DepthCarousel
            items={carouselItems}
            cardWidth={300}
            cardHeight={400}
            depth={200}
            spread={75}
            tilt={20}
            tiltDirection="left"
            perspective={1200}
            visibleCards={3}
            autoplay={true}
            autoplayDelay={3500}
            showIndicators={false} // Clean up UI for hero section
          />
        </motion.div>

      </div>

      {/* ================= BOTTOM INFO ================= */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="
          absolute
          bottom-6
          left-5
          z-20
          flex
          items-center
          gap-2
          text-[8px]
          font-bold
          uppercase
          tracking-[0.2em]
          text-white/40
          md:left-10
          md:text-[9px]
        "
      >
        <span>FLOWTECH INTERNATIONAL AB</span>
        <span className="text-white/20">•</span>
        <span>SWEDEN</span>
      </motion.div>

      {/* ================= SCROLL HINT ================= */}

      <motion.button
        onClick={scrollToNext}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="
          absolute
          bottom-6
          right-5
          z-20
          hidden
          items-center
          gap-3
          text-[8px]
          font-bold
          uppercase
          tracking-[0.2em]
          text-cyan-400/60
          transition-colors
          hover:text-cyan-300
          md:flex
          md:right-10
        "
      >
        <span>SCROLL TO EXPLORE</span>
        <motion.span
          animate={{ y: [0, 5, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <ArrowDown size={15} />
        </motion.span>
      </motion.button>

    </section>
  );
};

export default ShipflowHero;
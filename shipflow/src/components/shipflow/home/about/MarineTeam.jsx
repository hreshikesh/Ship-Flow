import { motion } from "framer-motion";

import debasisImage from "../../../../assets/team/debasis.webp";
import michalImage from "../../../../assets/team/mitchel.webp";
import mikeImage from "../../../../assets/team/mike.webp";
import sandebLogo from "../../../../assets/images/logo/logo1.webp";

const TEAM = [
  {
    name: "Mr. Debasis Panda",
    designation: "Director",
    image: debasisImage,
    linkedin: "https://www.linkedin.com/in/debasis-panda-a87a245",
  },
  {
    name: "Dr. Michal Orych",
    designation: "Managing Director, FLOWTECH International AB",
    image: michalImage,
    linkedin: "https://www.linkedin.com/in/michal-orych-663735b9/",
  },
  {
    name: "Mike Saroch",
    designation: "Adviser",
    image: mikeImage,
    linkedin: "https://www.linkedin.com/in/msaroch/",
  },
];

function LinkedInIcon({ className = "h-3.5 w-3.5" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export default function MarineTeam() {
  return (
    <section className="relative overflow-hidden bg-[#02070d] py-8 sm:py-8 lg:py-8">
      <div
        className="
          pointer-events-none absolute left-1/2 top-1/2
          h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2
          rounded-full bg-cyan-400/[0.035] blur-[120px]
          sm:h-[500px] sm:w-[500px]
        "
      />

      <div className="relative z-10 mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-2xl sm:mb-14 lg:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[8px] uppercase tracking-[0.28em] text-cyan-300/70 sm:text-[9px]"
          >
            The Team
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-3 text-2xl font-semibold tracking-tight text-white sm:mt-4 sm:text-4xl lg:text-5xl"
          >
            OUR TEAM
          </motion.h2>

        </div>

        {/* Always 3 per row */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:gap-5">
          {TEAM.map((member, index) => (
            <TeamCard key={member.name + index} member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TeamCard({ member, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: 0.65,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group"
    >
      <div
        className="
          relative aspect-[3/4] overflow-hidden
          rounded-xl border border-white/[0.08] bg-[#07111a]
          sm:aspect-[4/5] sm:rounded-2xl
        "
      >
        <img
          src={member.image}
          alt={member.name}
          loading="lazy"
          className="
            h-full w-full object-cover object-top
            grayscale-[15%]
            transition-transform duration-700 ease-out
            group-hover:scale-[1.045]
          "
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#02070d] via-[#02070d]/25 to-transparent opacity-95" />
        <div className="pointer-events-none absolute inset-0 bg-cyan-400/[0.04] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* LinkedIn — SVG only */}
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`LinkedIn profile of ${member.name}`}
          className="
            absolute left-1.5 top-1.5 z-20
            flex h-7 w-7 items-center justify-center
            rounded-full border border-white/15
            bg-[#02070d]/75 text-white backdrop-blur-md
            transition-all duration-300
            hover:scale-105 hover:border-[#0A66C2]/50 hover:bg-[#0A66C2]/20 hover:text-[#0A66C2]
            sm:left-3 sm:top-3 sm:h-9 sm:w-9
            sm:opacity-0 sm:group-hover:opacity-100
          "
        >
          <LinkedInIcon className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
        </a>

        {/* SandebTech logo */}
        <div className="absolute right-1.5 top-1.5 z-20 sm:right-3 sm:top-3">
          <div
            className="
              flex h-7 w-7 items-center justify-center rounded-full
              border border-cyan-300/20 bg-[#02070d]/70 p-1
              backdrop-blur-md
              sm:h-9 sm:w-9 sm:p-1.5
            "
          >
            <img
              src={sandebLogo}
              alt="SandebTech"
              className="h-full w-full object-contain opacity-90"
            />
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-10 p-2 sm:p-4 lg:p-5">
          <div className="mb-1.5 h-px w-5 bg-cyan-300/60 transition-all duration-500 group-hover:w-10 sm:mb-3 sm:w-8 sm:group-hover:w-14" />

          <h3 className="text-[10px] font-semibold leading-snug tracking-tight text-white sm:text-base lg:text-xl">
            {member.name}
          </h3>

          <p className="mt-0.5 line-clamp-2 text-[7px] uppercase leading-tight tracking-[0.12em] text-cyan-300/70 sm:mt-1.5 sm:text-[9px] sm:tracking-[0.16em] lg:text-[10px]">
            {member.designation}
          </p>
        </div>
      </div>
    </motion.article>
  );
}
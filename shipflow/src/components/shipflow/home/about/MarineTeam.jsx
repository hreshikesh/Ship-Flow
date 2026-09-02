import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import debasisImage from "../../../../assets/team/debasis.webp";
import michalImage from "../../../../assets/team/mitchel.webp";
import shipflow from "../../../../assets/images/logo/shipflowlogo.webp";
import sandebLogo from "../../../../assets/images/logo/logo1.webp";

const TEAM = [
  {
    name: "Mr. Debasis Panda",
    designation: "Director, SandebTech Pvt Ltd.",
    image: debasisImage,
    linkedin: "https://www.linkedin.com/in/debasis-panda-a87a245",
    logo: sandebLogo,
    company: "SandebTech",
    contactLabel: "Contact SandebTech",
    contactUrl: "https://sandebtech.com/contact",
    logoClass: "opacity-95 drop-shadow-[0_2px_8px_rgba(0,0,0,0.65)]",
  },
  {
    name: "Dr. Michal Orych",
    designation: "Managing Director, FLOWTECH International AB",
    image: michalImage,
    linkedin: "https://www.linkedin.com/in/michal-orych-663735b9/",
    logo: shipflow,
    company: "FLOWTECH",
    contactLabel: "FLOWTECH Support",
    contactUrl: "https://shipflow.se/support-center/",
    logoClass:
      "brightness-0 invert opacity-95 drop-shadow-[0_2px_10px_rgba(0,0,0,0.75)]",
  },
];

function LinkedInIcon({ className = "h-3.5 w-3.5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export default function MarineTeam() {
  return (
    <section className="relative overflow-hidden bg-[#02070d] py-10 sm:py-14 lg:py-16">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/[0.04] blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-14">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[8px] uppercase tracking-[0.28em] text-cyan-300/70 sm:text-[9px]"
          />

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="mt-3 text-2xl font-semibold tracking-tight text-white sm:mt-4 sm:text-4xl lg:text-5xl"
          >
            CONNECT WITH US
          </motion.h2>
        </div>

        <div className="mx-auto grid w-full max-w-[720px] grid-cols-2 gap-3 sm:max-w-[840px] sm:gap-5 lg:max-w-[920px] lg:gap-6">
          {TEAM.map((member, index) => (
            <TeamCard key={member.name} member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TeamCard({ member, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group w-full"
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-white/[0.08] bg-[#07111a] sm:aspect-[4/5] sm:rounded-2xl">
        <img
          src={member.image}
          alt={member.name}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />

        {/* Minimal gradient strictly for text legibility at the bottom */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-[#02070d] via-[#02070d]/60 to-transparent" />

        {/* LinkedIn */}
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`LinkedIn profile of ${member.name}`}
          className="
            absolute left-2 top-2 z-20 flex h-8 w-8 items-center justify-center
            rounded-full border border-white/10 bg-black/25 text-white/90
            backdrop-blur-[2px] transition-all duration-300
            hover:border-[#0A66C2]/50 hover:bg-[#0A66C2]/25 hover:text-[#70b5f9]
            sm:left-3 sm:top-3 sm:h-9 sm:w-9
            sm:opacity-0 sm:group-hover:opacity-100
          "
        >
          <LinkedInIcon className="h-3.5 w-3.5" />
        </a>

        {/* Brand block */}
        <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col p-3 sm:p-4 lg:p-5">
          <div className="mb-3 flex items-end sm:mb-4">
            <img
              src={member.logo}
              alt=""
              aria-hidden
              className={`
                h-8 w-auto max-w-[72%] object-cover object-left
                sm:h-10 md:h-11 lg:h-8
                ${member.logoClass}
              `}
            />
          </div>

          <div className="h-px w-8 bg-cyan-300/50 transition-all duration-500 group-hover:w-14 sm:w-10" />

          <h3 className="mt-2 text-[11px] font-semibold leading-snug tracking-tight text-white sm:mt-2.5 sm:text-base lg:text-xl">
            {member.name}
          </h3>

          <p className="mt-1 line-clamp-2 text-[7px] uppercase leading-snug tracking-[0.12em] text-white/55 sm:text-[9px] sm:tracking-[0.14em] lg:text-[10px]">
            {member.designation}
          </p>

          <div
            className="
              mt-2.5 transition-all duration-300
              sm:mt-0 sm:max-h-0 sm:translate-y-1 sm:opacity-0
              sm:group-hover:mt-3 sm:group-hover:max-h-14 sm:group-hover:translate-y-0 sm:group-hover:opacity-100
            "
          >
            <a
              href={member.contactUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center gap-1.5
                text-[8px] font-semibold uppercase tracking-[0.16em] text-cyan-200/90
                transition-colors hover:text-cyan-100
                sm:text-[10px]
              "
            >
              <span className="border-b border-cyan-300/40 pb-0.5 group-hover:border-cyan-200/70">
                {member.contactLabel}
              </span>
              <ArrowUpRight className="h-3 w-3 shrink-0 opacity-80" />
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
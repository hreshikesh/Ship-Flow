// FlipBack.jsx
import { Check, ArrowRight, Ship, Gauge } from "lucide-react";

export default function FlipBack({ module, flipped }) {
  const linkUrl = module.button || module.href || "#";

  return (
    <div
      className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-2xl border border-[#6FC3DF]/20 bg-[#03111E] p-4 sm:p-5"
      style={{
        transform: "rotateY(180deg)",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
      }}
    >
      <div>
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="flex items-center gap-1.5">
              <Ship size={10} className="text-[#6FC3DF]" />
              <span className="text-[8px] font-bold uppercase tracking-[0.18em] text-[#6FC3DF]/80">
                Capabilities
              </span>
            </div>
            <h3 className="mt-1 text-base font-bold text-white sm:text-lg">
              {module.title}
            </h3>
          </div>
          <span className="text-[7px] font-bold tracking-wider text-[#6FC3DF]/50">
            ACTIVE
          </span>
        </div>

        <div className="my-3 h-px bg-gradient-to-r from-[#6FC3DF]/25 to-transparent" />

        <div className="space-y-2">
          {module.points.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-2"
              style={{
                opacity: flipped ? 1 : 0.4,
                transform: flipped ? "none" : "translateX(-6px)",
                transition: "opacity .25s ease, transform .25s ease",
                transitionDelay: flipped ? `${i * 40}ms` : "0ms",
              }}
            >
              <div className="grid h-4 w-4 shrink-0 place-items-center rounded-full border border-[#6FC3DF]/25 bg-[#6FC3DF]/10">
                <Check size={9} className="text-[#6FC3DF]" strokeWidth={3} />
              </div>
              <span className="text-[11px] text-[#D3E3EF]">{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <div className="rounded-xl border border-[#6FC3DF]/15 bg-[#071A2F]/90 p-3">
          <div className="flex items-center gap-1">
            <Gauge size={10} className="text-[#6FC3DF]" />
            <span className="text-[8px] font-bold uppercase tracking-wider text-[#6FC3DF]/70">
              Avg Runtime
            </span>
          </div>
          <p className="mt-0.5 text-base font-extrabold text-white">
            {module.result}
          </p>
        </div>

        <a
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex items-center justify-between rounded-xl border border-[#6FC3DF]/20 bg-[#04101F] px-4 py-2.5 transition-colors hover:border-[#38BDF8]/40"
        >
          <span className="text-xs font-bold text-white">Explore Module</span>
          <ArrowRight size={12} className="text-[#6FC3DF]" />
        </a>
      </div>
    </div>
  );
}
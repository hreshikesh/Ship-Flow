// FlipFront.jsx
import { useState } from "react";

export default function FlipFront({ module }) {
  const Icon = module.icon;
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className="absolute inset-0 overflow-hidden rounded-2xl border border-[#6FC3DF]/20 bg-[#04101F]"
      style={{
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        transform: "rotateY(0deg)",
      }}
    >
      <div className="relative h-[52%] bg-[#03101C]">
        {!loaded && (
          <div className="absolute inset-0 animate-pulse bg-[#071A2F]" />
        )}

        <img
          src={module.image}
          alt=""
          width={400}
          height={240}
          decoding="async"
          // section is small (3 images) — eager helps LCP of this block
          loading="eager"
          fetchPriority="low"
          onLoad={() => setLoaded(true)}
          className={`h-full w-full object-contain transition-opacity duration-300 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#04101F] via-transparent to-transparent" />
      </div>

      <div className="flex h-[48%] flex-col justify-between p-4 sm:p-5">
        <div>
          <div className="flex items-center gap-2">
            <div className="grid h-6 w-6 place-items-center rounded-full border border-[#6FC3DF]/25 bg-[#6FC3DF]/10">
              <Icon size={12} className="text-[#6FC3DF]" />
            </div>
            <span className="text-[8px] font-bold uppercase tracking-[0.22em] text-[#6FC3DF]/80">
              SHIPFLOW
            </span>
          </div>

          <h3 className="mt-2 text-base font-bold text-white sm:text-lg">
            {module.title}
          </h3>
          <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-[#AFC4D8]">
            {module.subtitle}
          </p>
        </div>

        <div className="flex items-center justify-between border-t border-[#6FC3DF]/10 pt-2">
          <span className="text-[10px] font-semibold text-[#6FC3DF]">
            Tap for details
          </span>
          <span className="text-xs text-[#6FC3DF]">→</span>
        </div>
      </div>
    </div>
  );
}
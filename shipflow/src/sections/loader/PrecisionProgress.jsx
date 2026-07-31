import { SYSTEMS } from "../../libs/systems";

/**
 * Not a rounded rectangle. A thin, precision line with a glowing pulse
 * that travels across it. Reports "N / M Systems Ready" instead of
 * arbitrary percentages.
 */
export default function PrecisionProgress({
  readyCount,
  totalCount,
  activeVerb,
  activeLabel,
}) {
  const fraction = readyCount / totalCount;

  return (
    <div className="w-full font-mono">
      {/* Meta row */}
      <div className="mb-3 flex items-baseline justify-between text-[10px] uppercase tracking-[0.35em] text-[color:var(--ink-steel)]">
        <span>
          {activeVerb && activeLabel ? (
            <>
              <span className="text-[color:var(--ink-cyan)]">{activeVerb}</span>
              <span className="mx-2 opacity-40">·</span>
              <span className="text-[color:var(--ink-off)]/70">{activeLabel}</span>
            </>
          ) : (
            <span className="text-[color:var(--ink-cyan)]">Systems Online</span>
          )}
        </span>
        <span className="text-[color:var(--ink-off)]/80">
          {readyCount.toString().padStart(2, "0")}{" "}
          <span className="opacity-40">/</span>{" "}
          {totalCount.toString().padStart(2, "0")}{" "}
          <span className="ml-2 opacity-40">Systems Ready</span>
        </span>
      </div>

      {/* The precision line */}
      <div
        className="relative h-px w-full overflow-hidden"
        style={{ background: "rgba(230,236,242,0.08)" }}
      >
        {/* Filled portion */}
        <div
          className="absolute inset-y-0 left-0"
          style={{
            width: `${fraction * 100}%`,
            background:
              "linear-gradient(90deg, rgba(127,216,229,0.4), rgba(127,216,229,0.95))",
            boxShadow: "0 0 10px rgba(127,216,229,0.6)",
            transition: "width 600ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />
        {/* Traveling pulse */}
        <div
          className="absolute inset-y-0 left-0 w-1/4"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent)",
            animation: "pulseTravel 2.2s cubic-bezier(0.7,0,0.3,1) infinite",
          }}
        />
      </div>

      {/* Tick marks — one per system */}
      <div className="mt-2 flex w-full justify-between">
        {SYSTEMS.map((s, i) => {
          const passed = i < readyCount;
          return (
            <div
              key={s.id}
              className="h-1 w-px transition-colors duration-500"
              style={{
                background: passed
                  ? "rgba(127,216,229,0.9)"
                  : "rgba(230,236,242,0.12)",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

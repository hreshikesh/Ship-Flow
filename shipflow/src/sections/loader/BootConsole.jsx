import { SYSTEMS } from "../../libs/systems";

/**
 * The engineering console. Feels like modern naval simulation software,
 * not sci-fi. Each row appears individually with a subtle pulse when
 * it transitions from "active" to "ready".
 */
export default function BootConsole({ state, dissolving }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none relative z-30 w-full max-w-[560px] font-mono"
      style={{
        opacity: dissolving ? 0 : 1,
        transform: dissolving ? "translateY(-6px)" : "translateY(0)",
        filter: dissolving ? "blur(4px)" : "blur(0)",
        transition:
          "opacity 900ms ease-out, transform 900ms ease-out, filter 900ms ease-out",
      }}
    >
      {/* Header */}
      <div className="mb-6 flex items-center justify-between text-[10px] uppercase tracking-[0.45em] text-[color:var(--ink-steel)]">
        <span>
          <span className="text-[color:var(--ink-cyan)]">SHIPFLOW</span>
          <span className="mx-3 opacity-40">/</span>
          <span>SYSTEM INITIALIZATION</span>
        </span>
        <span className="tabular-nums text-[color:var(--ink-off)]/60">
          SESSION · {String(Math.floor(state.elapsed / 100)).padStart(5, "0")}
        </span>
      </div>

      {/* Rows */}
      <div className="space-y-[10px]">
        {SYSTEMS.map((sys, i) => {
          const isReady = state.readyIds.has(sys.id);
          const isActive = state.activeId === sys.id;
          const isPending = !isReady && !isActive;
          const revealAt = 100 + i * 180;
          const revealed = state.elapsed > revealAt;

          return (
            <div
              key={sys.id}
              className="grid grid-cols-[18px_1fr_auto] items-center gap-4 py-[6px] pl-2 pr-2 text-[11px]"
              style={{
                opacity: revealed ? 1 : 0,
                transform: revealed ? "translateY(0)" : "translateY(4px)",
                transition:
                  "opacity 500ms ease-out, transform 500ms ease-out",
                animation: isReady
                  ? "rowPulse 700ms ease-out"
                  : undefined,
                borderLeft: isActive
                  ? "1px solid rgba(127,216,229,0.6)"
                  : "1px solid transparent",
              }}
            >
              {/* Status indicator — a pulse of light instead of a checkmark */}
              <div className="relative flex h-2 w-2 items-center justify-center">
                {isReady ? (
                  <span
                    className="block h-[3px] w-[10px]"
                    style={{
                      background: "var(--ink-cyan)",
                      boxShadow: "0 0 8px rgba(127,216,229,0.9)",
                    }}
                  />
                ) : isActive ? (
                  <span
                    className="block h-[6px] w-[6px] rounded-full"
                    style={{
                      background: "var(--ink-cyan)",
                      boxShadow: "0 0 10px rgba(127,216,229,0.9)",
                      animation: "breathe 1.2s ease-in-out infinite",
                    }}
                  />
                ) : (
                  <span
                    className="block h-[2px] w-[6px]"
                    style={{ background: "rgba(230,236,242,0.18)" }}
                  />
                )}
              </div>

              {/* Label + verb */}
              <div className="flex items-baseline gap-3 truncate uppercase tracking-[0.22em]">
                <span
                  className={
                    isReady
                      ? "text-[color:var(--ink-off)]"
                      : isActive
                      ? "text-[color:var(--ink-off)]/90"
                      : "text-[color:var(--ink-steel)]/60"
                  }
                >
                  {sys.label}
                </span>
                <span className="text-[9px] tracking-[0.3em] opacity-50">
                  {sys.detail}
                </span>
              </div>

              {/* Right side status word */}
              <div className="text-right text-[10px] uppercase tracking-[0.3em]">
                {isReady ? (
                  <span className="text-[color:var(--ink-cyan)]">Ready</span>
                ) : isActive ? (
                  <span className="text-[color:var(--ink-off)]/80 caret">
                    {sys.verb}
                  </span>
                ) : isPending ? (
                  <span className="text-[color:var(--ink-steel)]/50">
                    Queued
                  </span>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>

      {/* Divider */}
      <div
        className="my-6 h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(230,236,242,0.12), transparent)",
        }}
      />
    </div>
  );
}

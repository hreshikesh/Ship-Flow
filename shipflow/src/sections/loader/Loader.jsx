import { useLoaderSequence } from "../../hooks/useLoaderSequence";
import { SYSTEMS, TIMINGS } from "../../libs/systems";
import BlueprintGrid from "./BlueprintGrid";
import CFDStreamlines from "./CFDStreamlines";
import HorizonLine from "./HorizonLine";
import InitLabel from "./InitLabel";
import BootConsole from "./BootConsole";
import PrecisionProgress from "./PrecisionProgress";

/**
 * CHAPTER 0 — "Entering SHIPFLOW"
 *
 * This is not a spinner. It is the first chapter of the experience.
 * The interface literally transforms into the world — never a cut.
 */
export default function Loader({ onComplete }) {
  const state = useLoaderSequence();

  // Report completion once we've fully arrived — parent will hand-off
  // to the homepage without any hard cut.
  if (state.done && onComplete) {
    queueMicrotask(onComplete);
  }

  const showConsole =
    state.phase === "boot" || state.phase === "freeze";

  const dissolving =
    state.phase === "transition" ||
    state.phase === "arrival" ||
    state.phase === "settled";

  const streamlineMorph =
    state.phase === "darkness" || state.phase === "awaken"
      ? 0
      : state.phase === "boot"
      ? Math.min(1, (state.elapsed - TIMINGS.bootStart) / (TIMINGS.freezeAt - TIMINGS.bootStart)) * 0.15
      : state.phase === "freeze"
      ? 0.2
      : state.phase === "transition"
      ? 0.65
      : 1;

  const streamlinesVisible = state.phase !== "darkness";
  const gridFading = dissolving;

  const active = SYSTEMS.find((s) => s.id === state.activeId) ?? null;

  return (
    <div
      className="relative isolate h-screen w-screen overflow-hidden bg-[color:var(--ink-void)]"
      style={{
        // Subtle camera "breathing" — the world is alive from moment one
        animation: "breathe 6s ease-in-out infinite",
      }}
    >
      {/* Barely-visible atmosphere */}
      <div className="grain absolute inset-0" />
      <BlueprintGrid fading={gridFading} />
      <CFDStreamlines morph={streamlineMorph} visible={streamlinesVisible} />

      {/* The calibration line → ocean horizon */}
      <HorizonLine phase={state.phase} />
      <InitLabel phase={state.phase} />

      {/* Console layout — top / center / bottom */}
      <div
        className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-between px-8 py-10 md:px-14 md:py-14"
        style={{
          opacity: showConsole ? 1 : 0,
          transition: "opacity 700ms ease-out",
          pointerEvents: "none",
        }}
      >
        {/* Top corner meta */}
        <div className="flex items-start justify-between font-mono text-[10px] uppercase tracking-[0.4em] text-[color:var(--ink-steel)]">
          <div>
            <span className="text-[color:var(--ink-cyan)]">SHIPFLOW</span>
            <span className="mx-2 opacity-40">·</span>
            <span>v4.2 · engine</span>
          </div>
          <div className="text-right">
            <div>Node · North Atlantic</div>
            <div className="opacity-50">06:12 · dawn preset</div>
          </div>
        </div>

        {/* Center — the boot console */}
        <div className="flex justify-center">
          <BootConsole state={state} dissolving={dissolving} />
        </div>

        {/* Bottom — precision progress line */}
        <div
          style={{
            opacity: dissolving ? 0 : 1,
            transform: dissolving ? "translateY(6px)" : "translateY(0)",
            transition:
              "opacity 700ms ease-out, transform 700ms ease-out",
          }}
        >
          <PrecisionProgress
            readyCount={state.readyCount}
            totalCount={state.totalCount}
            activeVerb={active?.verb ?? null}
            activeLabel={active?.label ?? null}
          />
        </div>
      </div>
    </div>
  );
}

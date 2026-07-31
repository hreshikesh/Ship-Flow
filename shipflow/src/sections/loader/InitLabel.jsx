/**
 * The whisper that appears just after the calibration line — small,
 * technical, no marketing. Fades out once the console takes over.
 */
export default function InitLabel({ phase }) {
  const visible = phase === "awaken";

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-1/2 z-30 -translate-x-1/2 translate-y-6 text-center font-mono"
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 700ms ease-out",
      }}
    >
      <div className="text-[10px] uppercase tracking-[0.55em] text-[color:var(--ink-cyan)]">
        SHIPFLOW · ENGINE
      </div>
      <div className="mt-3 text-[10px] uppercase tracking-[0.3em] text-[color:var(--ink-steel)]">
        <span className="caret">Initializing</span>
      </div>
    </div>
  );
}

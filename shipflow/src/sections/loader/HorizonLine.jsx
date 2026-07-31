/**
 * The single thin horizontal line that awakens first — and later
 * *becomes* the ocean horizon. It is never removed; it transforms.
 */
export default function HorizonLine({ phase }) {
  const awake = phase !== "darkness";
  const expanding =
    phase === "transition" || phase === "arrival" || phase === "settled";

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-1/2 z-20 h-px w-[68vw] max-w-[900px] -translate-x-1/2 -translate-y-1/2"
    >
      {/* the calibration line itself */}
      <div
        className="relative h-px w-full origin-center"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(127,216,229,0.9) 50%, transparent 100%)",
          boxShadow: "0 0 12px rgba(127,216,229,0.55)",
          transform: awake ? "scaleX(1)" : "scaleX(0)",
          transition: "transform 1400ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      />

      {/* the expansion — line thickens into the ocean plane */}
      <div
        className="absolute left-0 right-0 top-0 h-px origin-center"
        style={{
          background:
            "linear-gradient(180deg, rgba(127,216,229,0.4) 0%, rgba(11,58,92,0.9) 40%, rgba(4,7,13,0) 100%)",
          transform: expanding ? "scaleY(140)" : "scaleY(1)",
          opacity: expanding ? 1 : 0,
          transition:
            "transform 1100ms cubic-bezier(0.7, 0, 0.3, 1), opacity 700ms ease-out",
        }}
      />
    </div>
  );
}

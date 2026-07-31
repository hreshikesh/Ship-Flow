export default function BlueprintGrid({ fading }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 transition-opacity duration-[1200ms] ease-out"
      style={{
        opacity: fading ? 0 : 1,
        backgroundImage:
          "linear-gradient(rgba(127,216,229,0.05) 1px, transparent 1px)," +
          "linear-gradient(90deg, rgba(127,216,229,0.05) 1px, transparent 1px)," +
          "radial-gradient(circle at 50% 50%, rgba(11,58,92,0.35), transparent 65%)",
        backgroundSize: "56px 56px, 56px 56px, 100% 100%",
        maskImage:
          "radial-gradient(circle at 50% 50%, black 40%, transparent 85%)",
      }}
    />
  );
}

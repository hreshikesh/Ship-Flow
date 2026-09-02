export default function SectionFallback({ height = 320 }) {
  return (
    <div
      className="w-full bg-[#02070d]"
      style={{ height: typeof height === "number" ? `${height}px` : height }}
      aria-hidden
    />
  );
}
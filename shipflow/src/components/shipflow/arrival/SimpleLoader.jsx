import logo from "../../../assets/images/logo/logo1.webp";

export default function SimpleLoader({ fullScreen = true }) {
  return (
    <div
      className={`
        z-[100]
        flex items-center justify-center
        bg-[#02070d]
        ${fullScreen ? "fixed inset-0" : "absolute inset-0"}
      `}
      role="status"
      aria-label="Loading"
    >
      <div className="relative flex h-20 w-20 items-center justify-center sm:h-24 sm:w-24">
        {/* Spinning ring */}
        <div
          className="
            absolute inset-0 rounded-full
            border-2 border-cyan-300/15
            border-t-cyan-300 border-r-cyan-300/40
            animate-spin
          "
          style={{ animationDuration: "0.85s" }}
        />
        <div className="absolute inset-1.5 rounded-full border border-cyan-300/10" />

        {/* Logo */}
        <img
          src={logo}
          alt="SandebTech"
          className="relative z-10 h-9 w-auto object-contain sm:h-11"
        />
      </div>
    </div>
  );
}
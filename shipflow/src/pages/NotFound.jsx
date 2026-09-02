import { ArrowLeft, Home, Compass } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#02080d] px-5 py-20 text-white sm:px-8">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/[0.08] blur-[100px] sm:h-[500px] sm:w-[500px]" />
      </div>

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34,211,238,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34,211,238,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "45px 45px",
          maskImage:
            "radial-gradient(circle at center, black 0%, transparent 72%)",
          WebkitMaskImage:
            "radial-gradient(circle at center, black 0%, transparent 72%)",
        }}
      />

      {/* static rings — no infinite JS animation */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/10 sm:h-[420px] sm:w-[420px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-400/[0.08] sm:h-[310px] sm:w-[310px]" />

      <div className="relative z-10 mx-auto w-full max-w-3xl text-center">
        <div className="mb-5 flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-cyan-400/40 sm:w-12" />
          <span className="text-[10px] font-semibold tracking-[0.3em] text-cyan-400 sm:text-xs">
            SYSTEM RESPONSE · 404
          </span>
          <span className="h-px w-8 bg-cyan-400/40 sm:w-12" />
        </div>

        <h1 className="select-none text-[110px] font-bold leading-none tracking-[-0.08em] text-white sm:text-[170px] lg:text-[210px]">
          4
          <span className="bg-gradient-to-b from-cyan-300 via-cyan-400 to-blue-600 bg-clip-text text-transparent">
            0
          </span>
          4
        </h1>

        <h2 className="mt-5 text-2xl font-medium tracking-tight text-white sm:text-3xl">
          The page you're looking for
          <span className="text-cyan-400"> doesn't exist.</span>
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-400 sm:text-base sm:leading-8">
          The requested route may have been moved, removed, or never existed.
          Let's get you back to the SandebTech experience.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            onClick={() => navigate("/")}
            className="group flex w-full items-center justify-center gap-2 rounded-full bg-cyan-400 px-7 py-3.5 text-sm font-semibold text-[#021018] transition-all duration-300 hover:bg-cyan-300 sm:w-auto"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            <Home size={17} />
            Back to Home
          </button>

          <button
            onClick={() => navigate(-1)}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-7 py-3.5 text-sm font-medium text-slate-300 transition-all duration-300 hover:border-cyan-400/30 hover:text-white sm:w-auto"
          >
            <Compass size={17} />
            Go Back
          </button>
        </div>

        <div className="mx-auto mt-12 flex max-w-md items-center justify-center gap-3">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
          <div className="flex items-center gap-2 text-[9px] font-medium tracking-[0.2em] text-slate-600">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400/60" />
            ROUTE NOT FOUND
          </div>
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
        </div>
      </div>
    </main>
  );
}
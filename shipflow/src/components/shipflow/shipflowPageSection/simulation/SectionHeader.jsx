// SectionHeader.jsx
import { Anchor } from "lucide-react";

export default function SectionHeader() {
  return (
    <div className="mx-auto max-w-4xl text-center">
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#6FC3DF]/25 bg-[#6FC3DF]/5 px-4 py-2">
        <Anchor size={14} className="text-[#6FC3DF]" />
        <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#6FC3DF]">
          Simulation Platform
        </p>
      </div>

      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[3.25rem]">
        What{" "}
        <span className="bg-gradient-to-r from-[#6FC3DF] via-[#38BDF8] to-[#6FC3DF] bg-clip-text text-transparent">
          SHIPFLOW
        </span>{" "}
        Does
      </h2>

      <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#9CB7C9] sm:text-base sm:leading-8">
        Multi-fidelity CFD solution designed to analyse every stage of ship
        hydrodynamics—from rapid concept evaluation to advanced viscous flow
        simulation and motion prediction.
      </p>

      <div className="mx-auto mt-6 h-0.5 w-20 rounded-full bg-gradient-to-r from-transparent via-[#6FC3DF]/50 to-transparent" />
    </div>
  );
}
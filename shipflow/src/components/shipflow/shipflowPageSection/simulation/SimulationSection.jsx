// SimulationSection.jsx
import SectionHeader from "./SectionHeader";
import SimulationGrid from "./SimulationGrid";

export default function SimulationSection() {
  return (
    <section className="relative overflow-hidden bg-[#02070D] py-10 sm:py-14 lg:py-18">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(111,195,223,.05),transparent_60%)]" />

      <div className="relative z-10 mx-auto max-w-7xl sm:px-6 lg:px-10">
        <div className="px-4 sm:px-0">
          <SectionHeader />
        </div>
        <SimulationGrid />
      </div>

      <style>{`
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}
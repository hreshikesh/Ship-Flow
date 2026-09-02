// SimulationGrid.jsx
import { simulationModules } from "./simulationData";
import FlipCard from "./FlipCard";

export default function SimulationGrid() {
  return (
    <div className="mt-8 sm:mt-12 lg:mt-16">
      {/* Mobile: carousel — all 3 reachable, peek next card */}
      <div
        className="flex gap-3 overflow-x-auto px-4 pb-4 snap-x snap-mandatory scrollbar-none sm:hidden"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {simulationModules.map((module) => (
          <div
            key={module.id}
            className="w-[min(78vw,300px)] shrink-0 snap-center"
          >
            <FlipCard module={module} compact />
          </div>
        ))}
        {/* end spacer so last card can center */}
        <div className="w-2 shrink-0" aria-hidden />
      </div>

      {/* sm+: always 3 per row */}
      <div className="hidden sm:grid sm:grid-cols-3 sm:gap-4 lg:gap-6 px-0">
        {simulationModules.map((module) => (
          <FlipCard key={module.id} module={module} />
        ))}
      </div>
    </div>
  );
}
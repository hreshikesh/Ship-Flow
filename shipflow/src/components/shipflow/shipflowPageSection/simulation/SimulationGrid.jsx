// SimulationGrid.jsx
import { simulationModules } from "./simulationData";
import FlipCard from "./FlipCard";

export default function SimulationGrid() {
  return (
    <div className="mt-16 grid gap-6 
      sm:mt-20 sm:gap-8
      md:grid-cols-2 md:gap-6
      lg:mt-28 lg:grid-cols-3 lg:gap-8">
      {simulationModules.map((module, index) => (
        <FlipCard
          key={module.id}
          module={module}
          index={index}
        />
      ))}
    </div>
  );
}
import ShipflowArrival from "../components/shipflow/arrival/ShipflowArrival";
import About from "../components/shipflow/aboutPreview/About";
import SimulationSection from "../components/shipflow/simulation/SimulationSection";
export default function Home() {
  return (
    <main className="bg-[#02070d]">
      <ShipflowArrival />
      <About />
      <SimulationSection/>
    </main>
  );
}

import ShipflowHero from "../components/shipflow/shipflowPageSection/hero/ShipflowHero";
import PublicationSection from "../components/shipflow/shipflowPageSection/PublicationSection/PublicationSection";
import ShipflowServicesSection from "../components/shipflow/shipflowPageSection/service/ShipflowServicesSection";
import SimulationSection from "../components/shipflow/shipflowPageSection/simulation/SimulationSection";
export default function Shipflow() {
  return (
    <main className="relative min-h-screen bg-[#02070d] text-white">
     <ShipflowHero/>
     <SimulationSection/>
     <ShipflowServicesSection/>
     <PublicationSection/>

    </main>
  );
}
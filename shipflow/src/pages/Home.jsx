import ShipflowArrival from "../components/shipflow/arrival/ShipflowArrival";
import About from "../components/shipflow/aboutPreview/About";
import SimulationSection from "../components/shipflow/simulation/SimulationSection";

import NavalArchitects from "../components/shipflow/naval-architect/NavalArchitects";
import InterfaceResults from "../components/shipflow/InterfaceResults/InterfaceResults";

export default function Home() {
    return (
        <main className="bg-[#02070d]">
            <ShipflowArrival />
            <About />
            <SimulationSection />
            <NavalArchitects />
            <InterfaceResults />
        </main>
    );
}
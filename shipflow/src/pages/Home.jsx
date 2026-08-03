import ShipflowArrival from "../components/shipflow/arrival/ShipflowArrival";
import About from "../components/shipflow/aboutPreview/About";
import SimulationSection from "../components/shipflow/simulation/SimulationSection";
import NavalArchitects from "../components/shipflow/naval-architect/NavalArchitects";
import InterfaceResults from "../components/shipflow/InterfaceResults/InterfaceResults";
import GlobalPresence from "../components/shipflow/GlobalPresence/GlobalPresence";
import ServiceSection from "../components/shipflow/ServiceSection/ServiceSection";
import PublicationSection from "../components/shipflow/PublicationSection/PublicationSection";
import NewsSection from "../components/shipflow/news/NewsSection";
import Contact from "../components/shipflow/contact/Contact";
import WaterMark from "../components/shipflow/watermark/WaterMark";
export default function Home() {
  return (
    <main className="bg-[#02070d]">
      <ShipflowArrival />


      <div className="relative z-30 bg-[#02070d]">

        <About />
        <WaterMark />
        <SimulationSection />
        <NavalArchitects />
        <InterfaceResults />
        <GlobalPresence />
        <ServiceSection />
        <PublicationSection />
        <NewsSection />
        <Contact />

      </div>
    </main>
  );
}
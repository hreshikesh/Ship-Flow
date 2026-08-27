
import ShipflowHero from "../components/shipflow/shipflowPageSection/hero/ShipflowHero";
import PublicationSection from "../components/shipflow/shipflowPageSection/PublicationSection/PublicationSection";
import ShipflowServicesSection from "../components/shipflow/shipflowPageSection/service/ShipflowServicesSection";
import SimulationSection from "../components/shipflow/shipflowPageSection/simulation/SimulationSection";
import SEO from "../components/seo/SEO";
import { seoPages } from "../components/seo/seoConfig";
export default function Shipflow() {
  return (
    <main className="relative min-h-screen bg-[#02070d] text-white">
       <SEO {...seoPages.shipflow} />
     <ShipflowHero/>
     <SimulationSection/>
     <ShipflowServicesSection/>
     <PublicationSection/>

    </main>
  );
}
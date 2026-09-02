import { lazy, Suspense } from "react";
import ShipflowHero from "../components/shipflow/shipflowPageSection/hero/ShipflowHero";
import SEO from "../components/seo/SEO";
import { seoPages } from "../components/seo/seoConfig";
import DeferredSection from "../components/common/DeferredSection";
import SectionFallback from "../components/common/SectionFallback";

const SimulationSection = lazy(() =>
  import(
    "../components/shipflow/shipflowPageSection/simulation/SimulationSection"
  )
);
const ShipflowServicesSection = lazy(() =>
  import(
    "../components/shipflow/shipflowPageSection/service/ShipflowServicesSection"
  )
);
const PublicationSection = lazy(() =>
  import(
    "../components/shipflow/shipflowPageSection/PublicationSection/PublicationSection"
  )
);

export default function Shipflow() {
  return (
    <main className="relative min-h-screen bg-[#02070d] text-white">
      <SEO {...seoPages.shipflow} />

      <ShipflowHero />

      <DeferredSection index={0} eager minHeight={520}>
        <Suspense fallback={<SectionFallback height={520} />}>
          <SimulationSection />
        </Suspense>
      </DeferredSection>

      <DeferredSection index={1} minHeight={500}>
        <Suspense fallback={<SectionFallback height={500} />}>
          <ShipflowServicesSection />
        </Suspense>
      </DeferredSection>

      <DeferredSection index={2} minHeight={420}>
        <Suspense fallback={<SectionFallback height={420} />}>
          <PublicationSection />
        </Suspense>
      </DeferredSection>
    </main>
  );
}
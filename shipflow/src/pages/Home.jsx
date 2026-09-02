import { lazy, Suspense } from "react";
import ShipflowArrival from "../components/shipflow/arrival/ShipflowArrival";
import DeferredSection from "../components/common/DeferredSection";
import SectionFallback from "../components/common/SectionFallback";

const MarineSystem = lazy(() =>
  import("../components/shipflow/home/about/MarineSystem")
);
const Watermark = lazy(() =>
  import("../components/shipflow/watermark/WaterMark")
);
const MarineTeam = lazy(() =>
  import("../components/shipflow/home/about/MarineTeam")
);
const MarineContactBanner = lazy(() =>
  import("../components/shipflow/home/about/MarineContactBanner")
);

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#02070d] text-white">
      <ShipflowArrival />

         <div
        id="main-content"
        data-page-content
        className="relative z-30 w-full bg-[#02070d]"
      >
        <DeferredSection index={0} eager minHeight={500}>
          <Suspense fallback={<SectionFallback height={500} />}>
            <MarineSystem />
          </Suspense>
        </DeferredSection>

        <DeferredSection index={1} minHeight={200}>
          <Suspense fallback={<SectionFallback height={200} />}>
            <Watermark />
          </Suspense>
        </DeferredSection>

        <DeferredSection index={2} minHeight={500}>
          <Suspense fallback={<SectionFallback height={500} />}>
            <MarineTeam />
          </Suspense>
        </DeferredSection>

        <DeferredSection index={3} minHeight={300}>
          <Suspense fallback={<SectionFallback height={300} />}>
            <MarineContactBanner />
          </Suspense>
        </DeferredSection>
      </div>
    </main>
  );
}
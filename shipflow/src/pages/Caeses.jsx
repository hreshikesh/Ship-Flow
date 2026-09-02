import { lazy, Suspense } from "react";
import CaesesHero from "../components/caeses/CaesesHero";
import SEO from "../components/seo/SEO";
import { seoPages } from "../components/seo/seoConfig";
import DeferredSection from "../components/common/DeferredSection";
import SectionFallback from "../components/common/SectionFallback";

const CaesesWhy = lazy(() => import("../components/caeses/CaesesWhy"));
const CaesesApplications = lazy(() =>
  import("../components/caeses/CaesesApplications")
);
const CaesesCaseStudies = lazy(() =>
  import("../components/caeses/CaesesCaseStudies")
);
const CaesesDownloadBanner = lazy(() =>
  import("../components/caeses/CaesesDownloadBanner")
);

export default function Caeses() {
  return (
    <main className="relative min-h-screen bg-[#02070d] text-white">
      <SEO {...seoPages.caeses} />

      <CaesesHero />

      {/* ONE Suspense per section + index/eager */}
      <DeferredSection index={0} eager minHeight={420}>
        <Suspense fallback={<SectionFallback height={420} />}>
          <CaesesWhy />
        </Suspense>
      </DeferredSection>

      <DeferredSection index={1} minHeight={420}>
        <Suspense fallback={<SectionFallback height={420} />}>
          <CaesesApplications />
        </Suspense>
      </DeferredSection>

      <DeferredSection index={2} minHeight={520}>
        <Suspense fallback={<SectionFallback height={520} />}>
          <CaesesCaseStudies />
        </Suspense>
      </DeferredSection>

      <DeferredSection index={3} minHeight={280}>
        <Suspense fallback={<SectionFallback height={280} />}>
          <CaesesDownloadBanner />
        </Suspense>
      </DeferredSection>
    </main>
  );
}
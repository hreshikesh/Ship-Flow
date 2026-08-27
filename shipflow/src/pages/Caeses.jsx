import CaesesApplications from "../components/caeses/CaesesApplications";
import CaesesCaseStudies from "../components/caeses/CaesesCaseStudies";
import CaesesDownloadBanner from "../components/caeses/CaesesDownloadBanner";
import CaesesHero from "../components/caeses/CaesesHero";
import CaesesWhy from "../components/caeses/CaesesWhy";


export default function Caeses() {
  return (
    <main className="relative min-h-screen bg-[#02070d] text-white">
      <CaesesHero />
      <CaesesWhy />
      <CaesesApplications />
      <CaesesCaseStudies/>
      <CaesesDownloadBanner />

    </main>
  );
}
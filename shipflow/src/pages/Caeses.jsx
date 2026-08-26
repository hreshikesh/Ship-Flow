import CaesesApplications from "../components/caeses/CaesesApplications";
import CaesesHero from "../components/caeses/CaesesHero";
import CaesesWhy from "../components/caeses/CaesesWhy";
import EngineeringContactCTA from "../components/contact/EngineeringContactCTA";

export default function Caeses() {
  return (
    <main className="relative min-h-screen bg-[#02070d] text-white">
    <CaesesHero/>
    <CaesesWhy/>
    <CaesesApplications/>
    <EngineeringContactCTA/>
    </main>
  );
}
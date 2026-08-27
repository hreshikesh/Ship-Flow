import ShipflowArrival from "../components/shipflow/arrival/ShipflowArrival"; // Adjust path to match your folder
import MarineSystem from "../components/shipflow/home/about/MarineSystem";
import MarineTeam from "../components/shipflow/home/about/MarineTeam";
import MarineContactBanner from "../components/shipflow/home/about/MarineContactBanner";
import Watermark from "../components/shipflow/watermark/WaterMark";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#02070d] text-white">
    
      <ShipflowArrival />

      {/* Page Content */}
      <div className="relative z-30 w-full bg-[#02070d]">
        <MarineSystem />
        <Watermark/>
        <MarineTeam/>
        <MarineContactBanner/>
      </div>
    </main>
  );
}
import "./GlobalPresence.css";
import BackgroundEffects from "./BackgroundEffects";
import SectionHeader from "./SectionHeader";
import StatsCard from "./StatsCard";
import RegionCard from "./RegionCard";
import GlobeSection from "./GlobeSection";
import { regions } from "./regions";

function GlobalPresence() {
  return (
    <section className="globalPresence">
      <BackgroundEffects />

      <div className="gp-wrapper">
        <SectionHeader />

        <div className="gpContent">
          <div className="gpLeft">
            <StatsCard />

            <div className="regionGrid">
              {regions.map((region, index) => (
                <RegionCard key={index} region={region} index={index} />
              ))}
            </div>
          </div>

          <div className="gpRight">
            <GlobeSection />
          </div>
        </div>

        <div className="gp-since">
          <p>
            <strong>SHIPFLOW</strong> has been the trusted CFD solution for 
            naval architects at leading shipyards, design offices, and 
            universities across <strong>3 continents</strong> and{" "}
            <strong>20+ countries</strong> since <strong>1992</strong>.
          </p>
        </div>
      </div>
    </section>
  );
}

export default GlobalPresence;
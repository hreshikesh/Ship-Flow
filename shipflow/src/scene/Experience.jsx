// Experience.jsx
import { useMemo } from "react";
import { OrbitControls } from "@react-three/drei";

import Atmosphere from "./Atmosphere";
import Lighting from "./Lighting";
import SceneEnvironment from "./SceneEnvironment";
import ArrivalDirector from "./ArrivalDirector";
import Ocean from "./Ocean";
import OceanDetails from "./OceanDetails";
import Ship from "./Ship";
import Sky from "./Sky";
import Clouds from "./Clouds";
import Seagulls from "./Seagulls";
import PostEffects from "./PostEffects";
import { CONFIG } from "./config";
import ShipWake from "./ShipWake";

export default function Experience({ quality = "desktop" }) {
  const orbit = CONFIG.DEBUG_ORBIT;

  // Auto-detect mobile if quality isn't explicitly passed
  const isMobile = useMemo(() => {
    if (quality === "mobile") return true;
    if (typeof window !== "undefined") {
      return window.innerWidth < 768;
    }
    return false;
  }, [quality]);

  return (
    <>
      <Atmosphere />
      <SceneEnvironment />
      <Lighting isMobile={isMobile} />

      {!orbit && <ArrivalDirector />}

      {orbit && (
        <OrbitControls
          makeDefault
          enablePan={false}
          target={CONFIG.camera.lookAt}
          maxPolarAngle={Math.PI / 2.1}
          minDistance={8}
          maxDistance={90}
        />
      )}

      <Sky />
      
      {/* 🚀 CRITICAL MOBILE OPTIMIZATIONS:
          Strip heavy particle systems, secondary meshes & post-processing on mobile */}
      {!isMobile && <Clouds />}
      
      <Ocean isMobile={isMobile} />

      {!isMobile && <ShipWake />}
      {!isMobile && <OceanDetails />}
      
      <Ship isMobile={isMobile} />
      
      {!isMobile && <Seagulls />}

      {/* ❌ NEVER load PostEffects on mobile */}
      {!isMobile && <PostEffects />}
    </>
  );
}
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

export default function Experience() {
  const orbit = CONFIG.DEBUG_ORBIT;

  return (
    <>
      <Atmosphere />
      <SceneEnvironment />
      <Lighting />

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
      <Clouds />
      <Ocean />

      <ShipWake/>
      <OceanDetails />
      <Ship />
      <Seagulls />

      <PostEffects />
    </>
  );
}
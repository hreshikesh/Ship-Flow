import { useEffect } from "react";

import SceneCanvas from "../../../scene/SceneCanvas";
import ArrivalRuntime, { HERO_SCROLL_DISTANCE } from "./ArrivalRuntime";
import ShipflowCinematicUI from "./ShipflowCinematicUI";
import { resetArrivalState, useArrivalState } from "./arrivalStore";

export default function ShipflowArrival() {
  const { heroComplete } = useArrivalState();

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    // 🔑 Resets to the initial stage (Shows ONLY brand intro logo, hides headline & cards until scroll)
    resetArrivalState();
    window.scrollTo(0, 0);
  }, []);

  return (
    <section
      id="shipflow-arrival"
      className="relative min-h-screen bg-[#02070d]"
    >
      <ArrivalRuntime />

      {/* 3D WebGL Canvas Layer */}
      <div
        className="fixed inset-0 z-10 transition-opacity duration-700"
        style={{
          opacity: heroComplete ? 0 : 1,
          pointerEvents: "none",
        }}
      >
        <SceneCanvas />
      </div>

      {/* Cinematic Overlays (Brand intro logo -> scroll -> left headline + right cards) */}
      <ShipflowCinematicUI />

      <div
        className="pointer-events-none relative z-20"
        style={{
          height: HERO_SCROLL_DISTANCE,
          minHeight: "100vh",
        }}
      />
    </section>
  );
}
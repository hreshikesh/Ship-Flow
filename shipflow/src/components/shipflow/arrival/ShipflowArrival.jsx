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

    resetArrivalState();

    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    });
  }, []);

  return (
    <section
      id="shipflow-arrival"
      className="
        relative min-h-[100dvh] bg-[#02070d]
        touch-pan-y overscroll-y-contain
      "
      style={{
        WebkitOverflowScrolling: "touch",
      }}
    >
      <ArrivalRuntime />

      {/* WebGL must never capture touch gestures but allow native scroll through */}
      <div
        className="pointer-events-none fixed inset-0 z-10 transition-opacity duration-700"
        style={{
          opacity: heroComplete ? 0 : 1,
          touchAction: "pan-y",
        }}
      >
        <SceneCanvas />
      </div>

      <ShipflowCinematicUI />

      {/* This is the real native scroll area */}
      <div
        aria-hidden="true"
        className="pointer-events-none relative z-20 touch-pan-y"
        style={{
          height: HERO_SCROLL_DISTANCE,
        }}
      />
    </section>
  );
}
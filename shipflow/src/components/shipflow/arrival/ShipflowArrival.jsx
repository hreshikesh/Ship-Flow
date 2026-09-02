import React, { useEffect } from "react";
import SceneCanvas from "../../../scene/SceneCanvas";
import ArrivalRuntime, { HERO_SCROLL_DISTANCE } from "./ArrivalRuntime";
import ShipflowCinematicUI from "./ShipflowCinematicUI";
import {
  resetArrivalState,
  useArrivalState,
  setArrivalState,
} from "./arrivalStore";

class WebGLErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return <div className="absolute inset-0 bg-[#02070d]" />;
    }
    return this.props.children;
  }
}

export default function ShipflowArrival() {
  const { heroComplete, loaderDone } = useArrivalState();

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    resetArrivalState();
    setArrivalState({ loaderDone: true, phase: "ready", heroComplete: false });
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    });
  }, []);

  return (
    <section
      id="shipflow-arrival"
      className="relative bg-[#02070d] touch-pan-y"
    >
      <div className="absolute inset-0 bg-[#02070d]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(56,189,248,0.08),transparent_55%)]" />

      <ArrivalRuntime />

      {/* 3D stays mounted while in hero band; fades when complete */}
      <div
        className="pointer-events-none fixed inset-0 z-10 transition-opacity duration-500"
        style={{
          opacity: heroComplete ? 0 : loaderDone ? 1 : 0.85,
          visibility: heroComplete ? "hidden" : "visible",
        }}
      >
        <WebGLErrorBoundary>
          <SceneCanvas />
        </WebGLErrorBoundary>
      </div>

      <ShipflowCinematicUI />

      {/* ✅ ALWAYS keep scroll distance — never collapse to 0 */}
      <div
        aria-hidden
        className="pointer-events-none relative z-20"
        style={{ height: HERO_SCROLL_DISTANCE }}
      />
    </section>
  );
}
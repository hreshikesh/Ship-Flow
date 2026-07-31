import React, { Suspense, useEffect } from "react";
import { Environment } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

import { CONFIG } from "./config";

function SceneTuning() {
  const scene = useThree((state) => state.scene);

  useEffect(() => {
    if ("backgroundIntensity" in scene) {
      scene.backgroundIntensity = CONFIG.env.backgroundIntensity;
    }

    if ("backgroundBlurriness" in scene) {
      scene.backgroundBlurriness = CONFIG.env.backgroundBlur;
    }

    if ("environmentIntensity" in scene) {
      scene.environmentIntensity = CONFIG.env.intensity;
    }

    if (scene.backgroundRotation) {
      scene.backgroundRotation.y = CONFIG.env.rotationY;
    }

    if (scene.environmentRotation) {
      scene.environmentRotation.y = CONFIG.env.rotationY;
    }

    return () => {
      if ("backgroundIntensity" in scene) scene.backgroundIntensity = 1;
      if ("backgroundBlurriness" in scene) scene.backgroundBlurriness = 0;
      if ("environmentIntensity" in scene) scene.environmentIntensity = 1;
    };
  }, [scene]);

  return null;
}

class EnvBoundary extends React.Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error) {
    console.warn("[Environment] HDR failed:", error?.message);
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

function HdrEnvironment() {
  return (
    <Environment
      files={CONFIG.env.hdrUrl}
      background={CONFIG.env.background}
      resolution={256}
    />
  );
}

export default function SceneEnvironment() {
  return (
    <>
      <SceneTuning />

      <EnvBoundary
        fallback={
          <Environment
            preset={CONFIG.env.fallbackPreset}
            background={CONFIG.env.background}
            resolution={128}
          />
        }
      >
        <Suspense fallback={null}>
          <HdrEnvironment />
        </Suspense>
      </EnvBoundary>
    </>
  );
}
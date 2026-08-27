import { Suspense, useEffect, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  AdaptiveDpr,
  AdaptiveEvents,
  Html,
  PerformanceMonitor,
  Preload,
} from "@react-three/drei";
import {
  ACESFilmicToneMapping,
  PCFShadowMap,
  SRGBColorSpace,
} from "three";

import Experience from "./Experience";
import { CONFIG } from "./config";
import ErrorOverlay from "../ErrorOverlay";

function getDeviceProfile() {
  if (typeof window === "undefined") return "desktop";
  const width = window.innerWidth;
  if (width < 768) return "mobile";
  if (width < 1180) return "tablet";
  return "desktop";
}

function getResponsiveDpr(multiplier = 1) {
  if (typeof window === "undefined") return 1.1;

  const width = window.innerWidth;
  const deviceDpr = window.devicePixelRatio || 1;

  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1180;

  const maxDpr = isMobile ? 1.05 : isTablet ? 1.35 : 1.75;
  const minDpr = isMobile ? 0.75 : 0.9;

  return Math.min(maxDpr, Math.max(minDpr, deviceDpr * multiplier));
}

function getResponsiveCamera() {
  const profile = getDeviceProfile();

  if (profile === "mobile") {
    return {
      position: [-16.2, 5.55, 32],
      fov: 38,
      near: 0.5,
      far: 2500,
    };
  }

  if (profile === "tablet") {
    return {
      position: [-15.3, 5.15, 28],
      fov: 35,
      near: 0.5,
      far: 2500,
    };
  }

  return {
    position: CONFIG.camera.base,
    fov: CONFIG.camera.fov,
    near: 0.5,
    far: 2500,
  };
}

function LoadingFallback() {
  return (
    <Html center>
      <div
        style={{
          color: "white",
          fontFamily: "Inter, system-ui, sans-serif",
          fontSize: 14,
          padding: "10px 14px",
          borderRadius: 999,
          background: "rgba(7, 26, 47, 0.55)",
          border: "1px solid rgba(255,255,255,0.12)",
          backdropFilter: "blur(10px)",
          whiteSpace: "nowrap",
        }}
      >
        Loading 3D Experience...
      </div>
    </Html>
  );
}

export default function SceneCanvas() {
  const [dpr, setDpr] = useState(() => getResponsiveDpr(0.9));
  const [cameraVersion, setCameraVersion] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setDpr(getResponsiveDpr(0.9));
      setCameraVersion((value) => value + 1);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const camera = useMemo(() => {
    return getResponsiveCamera();
  }, [cameraVersion]);

  return (
    <ErrorOverlay>
      <div
        style={{
          width: "100%",
          height: "100dvh",
          minHeight: 420,
          overflow: "hidden",
          touchAction: "pan-y", /* 🚀 CHANGED FROM "none" TO "pan-y" */
          background: CONFIG.background,
        }}
      >
        <Canvas
          shadows
          dpr={dpr}
          camera={camera}
          gl={{
            antialias: false,
            alpha: false,
            powerPreference: "high-performance",
            stencil: false,
            depth: true,
          }}
          onCreated={({ gl }) => {
            gl.toneMapping = ACESFilmicToneMapping;
            gl.toneMappingExposure = 0.48;
            gl.outputColorSpace = SRGBColorSpace;
            gl.shadowMap.enabled = true;
            gl.shadowMap.type = PCFShadowMap;
          }}
        >
          <PerformanceMonitor
            onIncline={() => setDpr(getResponsiveDpr(1))}
            onDecline={() => setDpr(getResponsiveDpr(0.65))}
          />

          <Suspense fallback={<LoadingFallback />}>
            <Experience />
            <Preload all />
          </Suspense>

          <AdaptiveDpr pixelated />
          <AdaptiveEvents />
        </Canvas>
      </div>
    </ErrorOverlay>
  );
}
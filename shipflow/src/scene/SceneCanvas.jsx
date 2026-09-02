import { Suspense, useEffect, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  AdaptiveDpr,
  AdaptiveEvents,
  Html,
  PerformanceMonitor,
} from "@react-three/drei";
import {
  ACESFilmicToneMapping,
  SRGBColorSpace,
  NoToneMapping,
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
  if (typeof window === "undefined") return 1;

  const width = window.innerWidth;
  const deviceDpr = window.devicePixelRatio || 1;
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1180;

  // Much stricter on mobile for PageSpeed + battery
  const maxDpr = isMobile ? 0.85 : isTablet ? 1.15 : 1.5;
  const minDpr = isMobile ? 0.6 : 0.8;

  return Math.min(maxDpr, Math.max(minDpr, deviceDpr * multiplier));
}

function getResponsiveCamera() {
  const profile = getDeviceProfile();

  if (profile === "mobile") {
    return {
      position: [-16.2, 5.55, 32],
      fov: 38,
      near: 1,
      far: 800, // smaller far plane = cheaper depth work
    };
  }

  if (profile === "tablet") {
    return {
      position: [-15.3, 5.15, 28],
      fov: 35,
      near: 0.8,
      far: 1200,
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
          fontSize: 13,
          padding: "8px 12px",
          borderRadius: 999,
          background: "rgba(7, 26, 47, 0.55)",
          border: "1px solid rgba(255,255,255,0.12)",
          whiteSpace: "nowrap",
        }}
      >
        Loading 3D...
      </div>
    </Html>
  );
}

export default function SceneCanvas() {
  const [profile, setProfile] = useState(getDeviceProfile);
  const [dpr, setDpr] = useState(() => getResponsiveDpr(0.75));
  const [cameraVersion, setCameraVersion] = useState(0);
  const [shouldMountCanvas, setShouldMountCanvas] = useState(false);
  const [isPageVisible, setIsPageVisible] = useState(true);

  const isMobile = profile === "mobile";

  // 1) Defer WebGL mount until browser is idle (huge PageSpeed win)
  useEffect(() => {
    let timeoutId;
    let idleId;

    const mount = () => setShouldMountCanvas(true);

    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(mount, { timeout: 1200 });
    } else {
      timeoutId = setTimeout(mount, 600);
    }

    return () => {
      if (idleId && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  // 2) Pause rendering when tab is hidden
  useEffect(() => {
    const onVisibility = () => setIsPageVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setProfile(getDeviceProfile());
      setDpr(getResponsiveDpr(isMobile ? 0.7 : 0.85));
      setCameraVersion((v) => v + 1);
    };

    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile]);

  const camera = useMemo(() => getResponsiveCamera(), [cameraVersion]);

  // Lightweight placeholder so layout doesn't jump before WebGL boots
  if (!shouldMountCanvas) {
    return (
      <div
        style={{
          width: "100%",
          height: "100dvh",
          minHeight: 420,
          background: CONFIG.background,
        }}
      />
    );
  }

  return (
    <ErrorOverlay>
      <div
        style={{
          width: "100%",
          height: "100dvh",
          minHeight: 420,
          overflow: "hidden",
          touchAction: "pan-y",
          background: CONFIG.background,
        }}
      >
        <Canvas
          // 3) Shadows OFF on mobile (massive FPS + TBT win)
          shadows={!isMobile}
          dpr={dpr}
          camera={camera}
          // 4) Stop rendering when tab hidden
          frameloop={isPageVisible ? "always" : "never"}
          gl={{
            antialias: false,
            alpha: false,
            powerPreference: isMobile ? "low-power" : "high-performance",
            stencil: false,
            depth: true,
            // Avoid preserveDrawingBuffer (can be expensive)
            preserveDrawingBuffer: false,
            failIfMajorPerformanceCaveat: false,
          }}
          onCreated={({ gl }) => {
            // Cheaper tone mapping on mobile
            gl.toneMapping = isMobile ? NoToneMapping : ACESFilmicToneMapping;
            gl.toneMappingExposure = isMobile ? 1 : 0.48;
            gl.outputColorSpace = SRGBColorSpace;

            // Only enable shadows on desktop/tablet
            gl.shadowMap.enabled = !isMobile;
          }}
        >
          {!isMobile && (
            <PerformanceMonitor
              onIncline={() => setDpr(getResponsiveDpr(1))}
              onDecline={() => setDpr(getResponsiveDpr(0.7))}
            />
          )}

          <Suspense fallback={<LoadingFallback />}>
            {/* Pass profile so Experience can strip heavy meshes/effects */}
            <Experience quality={profile} />
            {/* 5) NEVER Preload all on mobile */}
            {/* <Preload all /> */}
          </Suspense>

          <AdaptiveDpr pixelated />
          <AdaptiveEvents />
        </Canvas>
      </div>
    </ErrorOverlay>
  );
}
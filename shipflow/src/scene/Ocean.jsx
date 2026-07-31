import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Color, MeshPhysicalMaterial } from "three";

import { CONFIG } from "./config";
import { sampleOceanHeight } from "./waves";

function getDeviceProfile() {
  if (typeof window === "undefined") return "desktop";

  const width = window.innerWidth;

  if (width < 768) return "mobile";
  if (width < 1180) return "tablet";

  return "desktop";
}

function getOceanSettings(profile) {
  if (profile === "mobile") {
    return {
      segments: 80,
      amplitude: 0.5,
      normalEvery: 3,
    };
  }

  if (profile === "tablet") {
    return {
      segments: 120,
      amplitude: 0.62,
      normalEvery: 2,
    };
  }

  return {
    segments: CONFIG.ocean.segments ?? 170,
    amplitude: CONFIG.ocean.amplitude ?? 0.72,
    normalEvery: 2,
  };
}

export default function Ocean() {
  const meshRef = useRef(null);
  const geometryRef = useRef(null);
  const basePositionsRef = useRef(null);
  const frameRef = useRef(0);

  const [profile, setProfile] = useState(() => getDeviceProfile());

  useEffect(() => {
    const handleResize = () => {
      setProfile(getDeviceProfile());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const settings = useMemo(() => getOceanSettings(profile), [profile]);

  const material = useMemo(() => {
    return new MeshPhysicalMaterial({
      color: new Color(CONFIG.ocean.colorMid ?? "#063b57"),

      // Production water: not mirror-like, not plastic
      roughness: 0.38,
      metalness: 0,
      clearcoat: 0.24,
      clearcoatRoughness: 0.44,
      envMapIntensity: 0.36,
      reflectivity: 0.12,
      ior: 1.333,
    });
  }, []);

  useEffect(() => {
    const geometry = geometryRef.current;
    if (!geometry) return;

    const position = geometry.attributes.position;
    basePositionsRef.current = new Float32Array(position.array);
  }, [settings.segments]);

  useFrame(({ clock }) => {
    const geometry = geometryRef.current;
    const mesh = meshRef.current;

    if (!geometry || !mesh || !basePositionsRef.current) return;

    const t = clock.elapsedTime;
    const amplitude = settings.amplitude;

    const position = geometry.attributes.position;
    const base = basePositionsRef.current;

    for (let i = 0; i < position.count; i++) {
      const ix = i * 3;

      const x = base[ix + 0];
      const y = base[ix + 1];

      // Domain warp breaks repeated wave-line pattern
      const warpX =
        Math.sin(y * 0.015 + t * 0.14) * 5.2 +
        Math.sin((x + y) * 0.009 - t * 0.08) * 2.4;

      const warpY =
        Math.cos(x * 0.014 - t * 0.12) * 4.8 +
        Math.sin((x - y) * 0.008 + t * 0.07) * 2.2;

      const wave = sampleOceanHeight(x + warpX, y + warpY, t, amplitude);

      const micro =
        Math.sin(x * 0.117 + y * 0.061 + t * 0.9) * 0.006 +
        Math.sin(x * 0.041 - y * 0.153 - t * 0.72) * 0.005;

      const distance = Math.sqrt(x * x + y * y);
      const farFade = 1 - Math.min(1, Math.max(0, (distance - 150) / 520));

      position.array[ix + 2] = wave * (0.5 + farFade * 0.5) + micro;
    }

    position.needsUpdate = true;

    frameRef.current += 1;

    if (frameRef.current % settings.normalEvery === 0) {
      geometry.computeVertexNormals();
    }
  });

  return (
    <mesh
      ref={meshRef}
      rotation={[-Math.PI / 2, 0, 0]}
      receiveShadow
      frustumCulled={false}
    >
      <planeGeometry
        key={`${settings.segments}-${profile}`}
        ref={geometryRef}
        args={[
          CONFIG.ocean.size,
          CONFIG.ocean.size,
          settings.segments,
          settings.segments,
        ]}
      />

      <primitive object={material} attach="material" />
    </mesh>
  );
}
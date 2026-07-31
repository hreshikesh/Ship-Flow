import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  AdditiveBlending,
  CanvasTexture,
  DoubleSide,
  LinearFilter,
} from "three";

import { CONFIG } from "./config";
import { sampleOceanHeight } from "./waves";

function createFoamTexture() {
  const size = 256;
  const canvas = document.createElement("canvas");

  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext("2d");
  const gradient = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2
  );

  gradient.addColorStop(0.0, "rgba(230,245,250,0.8)");
  gradient.addColorStop(0.35, "rgba(190,220,230,0.32)");
  gradient.addColorStop(0.7, "rgba(190,220,230,0.08)");
  gradient.addColorStop(1.0, "rgba(190,220,230,0)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  const tex = new CanvasTexture(canvas);
  tex.minFilter = LinearFilter;
  tex.magFilter = LinearFilter;
  tex.needsUpdate = true;

  return tex;
}

function WakePlane({
  offset = [0, 0, 0],
  rotation = 0,
  scale = [1, 1, 1],
  opacity = 0.22,
  phase = 0,
}) {
  const ref = useRef(null);
  const matRef = useRef(null);

  useFrame(({ clock }) => {
    const mesh = ref.current;
    const mat = matRef.current;

    if (!mesh || !mat) return;

    const t = clock.elapsedTime;

    const shipX = CONFIG.ship.heroPosition?.[0] ?? 4.8;
    const shipZ = CONFIG.ship.heroPosition?.[2] ?? 0;

    const x = shipX + offset[0];
    const z = shipZ + offset[2];

    const y = sampleOceanHeight(
      x,
      z,
      t,
      CONFIG.ocean.amplitude ?? 1
    );

    mesh.position.set(x, y + 0.035, z);

    mat.opacity =
      opacity + Math.sin(t * 0.8 + phase) * 0.035;
  });

  const texture = useMemo(() => {
    if (typeof document === "undefined") return null;
    return createFoamTexture();
  }, []);

  if (!texture) return null;

  return (
    <mesh
      ref={ref}
      rotation={[-Math.PI / 2, 0, rotation]}
      scale={scale}
      renderOrder={2}
    >
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial
        ref={matRef}
        map={texture}
        transparent
        opacity={opacity}
        depthWrite={false}
        side={DoubleSide}
        blending={AdditiveBlending}
      />
    </mesh>
  );
}

export default function ShipWake() {
  return (
    <>
      {/* Main trailing wake behind the ship */}
      <WakePlane
        offset={[-3.2, 0, 0]}
        scale={[7.5, 0.55, 1]}
        rotation={0}
        opacity={0.16}
        phase={0}
      />

      {/* V-shaped wake arms */}
      <WakePlane
        offset={[-2.1, 0, 1.55]}
        scale={[5.6, 0.32, 1]}
        rotation={0.18}
        opacity={0.12}
        phase={1.2}
      />

      <WakePlane
        offset={[-2.1, 0, -1.55]}
        scale={[5.6, 0.32, 1]}
        rotation={-0.18}
        opacity={0.12}
        phase={2.1}
      />

      {/* Bow disturbance */}
      <WakePlane
        offset={[3.8, 0, 0.95]}
        scale={[1.8, 0.28, 1]}
        rotation={-0.28}
        opacity={0.18}
        phase={1.8}
      />

      <WakePlane
        offset={[3.8, 0, -0.95]}
        scale={[1.8, 0.28, 1]}
        rotation={0.28}
        opacity={0.18}
        phase={2.4}
      />
    </>
  );
}
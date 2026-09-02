// ShipWake.jsx
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

let sharedFoamTexture = null;

function getFoamTexture() {
  if (typeof document === "undefined") return null;
  if (sharedFoamTexture) return sharedFoamTexture;

  const size = 128; // was 256
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext("2d");
  const g = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2
  );
  g.addColorStop(0, "rgba(230,245,250,0.75)");
  g.addColorStop(0.4, "rgba(190,220,230,0.28)");
  g.addColorStop(1, "rgba(190,220,230,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);

  sharedFoamTexture = new CanvasTexture(canvas);
  sharedFoamTexture.minFilter = LinearFilter;
  sharedFoamTexture.magFilter = LinearFilter;
  return sharedFoamTexture;
}

function WakePlane({
  offset = [0, 0, 0],
  rotation = 0,
  scale = [1, 1, 1],
  opacity = 0.16,
  phase = 0,
  texture,
}) {
  const ref = useRef(null);
  const matRef = useRef(null);
  const frame = useRef(0);

  useFrame(({ clock }) => {
    // Update every 2nd frame — wakes don't need 60fps precision
    frame.current++;
    if (frame.current % 2 !== 0) return;

    const mesh = ref.current;
    const mat = matRef.current;
    if (!mesh || !mat) return;

    const t = clock.elapsedTime;
    const shipX = CONFIG.ship.heroPosition?.[0] ?? 4.8;
    const shipZ = CONFIG.ship.heroPosition?.[2] ?? 0;
    const x = shipX + offset[0];
    const z = shipZ + offset[2];
    const y = sampleOceanHeight(x, z, t, CONFIG.ocean.amplitude ?? 1);

    mesh.position.set(x, y + 0.035, z);
    mat.opacity = opacity + Math.sin(t * 0.8 + phase) * 0.03;
  });

  if (!texture) return null;

  return (
    <mesh
      ref={ref}
      rotation={[-Math.PI / 2, 0, rotation]}
      scale={scale}
      renderOrder={2}
      frustumCulled
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
  const texture = useMemo(() => getFoamTexture(), []);

  // 3 planes instead of 5
  return (
    <>
      <WakePlane
        offset={[-3.2, 0, 0]}
        scale={[7.5, 0.55, 1]}
        opacity={0.15}
        phase={0}
        texture={texture}
      />
      <WakePlane
        offset={[-2.1, 0, 1.55]}
        scale={[5.4, 0.3, 1]}
        rotation={0.18}
        opacity={0.11}
        phase={1.2}
        texture={texture}
      />
      <WakePlane
        offset={[-2.1, 0, -1.55]}
        scale={[5.4, 0.3, 1]}
        rotation={-0.18}
        opacity={0.11}
        phase={2.1}
        texture={texture}
      />
    </>
  );
}
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  DoubleSide,
  MathUtils,
  Shape,
  ShapeGeometry,
} from "three";

function GullMesh() {
  const geometry = useMemo(() => {
    const shape = new Shape();
    // Sleeker, more organic low-poly seagull wing shape
    shape.moveTo(0, 0);
    shape.quadraticCurveTo(0.35, 0.22, 0.9, 0.05);
    shape.quadraticCurveTo(0.4, -0.04, 0, 0);
    return new ShapeGeometry(shape, 8);
  }, []);

  return (
    <>
      {/* Left Wing */}
      <mesh geometry={geometry} position={[-0.02, 0, 0]}>
        <meshBasicMaterial color="#f4f2ee" side={DoubleSide} />
      </mesh>

      {/* Right Wing (Mirrored) */}
      <mesh geometry={geometry} position={[0.02, 0, 0]} scale={[-1, 1, 1]}>
        <meshBasicMaterial color="#f4f2ee" side={DoubleSide} />
      </mesh>
    </>
  );
}

function createGull(seed) {
  const rng = (salt = 1) => {
    return Math.sin(seed * 127.1 + salt * 311.7) * 0.5 + 0.5;
  };

  return {
    radius: MathUtils.lerp(10, 32, rng(1)),
    height: MathUtils.lerp(6, 18, rng(2)),
    speed: MathUtils.lerp(0.12, 0.32, rng(3)) * (rng(4) > 0.4 ? 1 : -1),
    phase: rng(5) * Math.PI * 2,
    flapSpeed: MathUtils.lerp(4.0, 7.5, rng(6)),
    flapAmp: MathUtils.lerp(0.35, 0.75, rng(7)),
    bobAmp: MathUtils.lerp(0.4, 1.2, rng(8)),
    bobPhase: rng(9) * Math.PI * 2,
    cx: MathUtils.lerp(-8, 8, rng(10)),
    cz: MathUtils.lerp(-8, 8, rng(11)),
    scale: MathUtils.lerp(0.38, 0.62, rng(12)),
    glideFactor: rng(13), // Adds natural variety so some gulls glide periodically
  };
}

const FLOCK_SIZE = 16;

export default function Seagulls() {
  const refs = useRef([]);

  const gulls = useMemo(
    () => Array.from({ length: FLOCK_SIZE }, (_, i) => createGull(i + 1)),
    []
  );

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;

    gulls.forEach((gull, i) => {
      const ref = refs.current[i];
      if (!ref) return;

      const angle = t * gull.speed + gull.phase;

      // Circular/Eliptical flight path
      ref.position.x = gull.cx + Math.cos(angle) * gull.radius;
      ref.position.z = gull.cz + Math.sin(angle) * gull.radius * 0.7;
      ref.position.y =
        gull.height + Math.sin(t * 0.35 + gull.bobPhase) * gull.bobAmp;

      // Face direction of movement
      ref.rotation.y = -angle + (gull.speed < 0 ? Math.PI : 0);
      
      // Dynamic banking tilt when turning through the circle
      ref.rotation.z = Math.cos(angle) * 0.28 * Math.sign(gull.speed);
      ref.rotation.x = Math.sin(t * 0.5 + gull.phase) * 0.08;

      // Natural flapping with intermittent gliding phases
      const isGliding = Math.sin(t * 0.8 + gull.glideFactor * 10) > 0.6;
      const flapMultiplier = isGliding ? 0.2 : 1.0;
      const flap = Math.sin(t * gull.flapSpeed) * gull.flapAmp * flapMultiplier;

      const leftWing = ref.children[0];
      const rightWing = ref.children[1];

      // Flap wings up/down cleanly along the local Z/Y axis
      if (leftWing) leftWing.rotation.z = flap;
      if (rightWing) rightWing.rotation.z = -flap;
    });
  });

  return (
    <>
      {gulls.map((gull, i) => (
        <group
          key={i}
          ref={(el) => {
            if (el) refs.current[i] = el;
          }}
          scale={[gull.scale, gull.scale, gull.scale]}
        >
          <GullMesh />
        </group>
      ))}
    </>
  );
}
// Seagulls.jsx
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { DoubleSide, MathUtils, Shape, ShapeGeometry } from "three";

const FLOCK_SIZE = 6; // was 16

function GullMesh({ geometry }) {
  return (
    <>
      <mesh geometry={geometry} position={[-0.02, 0, 0]}>
        <meshBasicMaterial color="#f4f2ee" side={DoubleSide} />
      </mesh>
      <mesh geometry={geometry} position={[0.02, 0, 0]} scale={[-1, 1, 1]}>
        <meshBasicMaterial color="#f4f2ee" side={DoubleSide} />
      </mesh>
    </>
  );
}

function createGull(seed) {
  const rng = (salt = 1) => Math.sin(seed * 127.1 + salt * 311.7) * 0.5 + 0.5;

  return {
    radius: MathUtils.lerp(12, 28, rng(1)),
    height: MathUtils.lerp(7, 16, rng(2)),
    speed: MathUtils.lerp(0.12, 0.28, rng(3)) * (rng(4) > 0.4 ? 1 : -1),
    phase: rng(5) * Math.PI * 2,
    flapSpeed: MathUtils.lerp(4, 7, rng(6)),
    flapAmp: MathUtils.lerp(0.35, 0.7, rng(7)),
    bobAmp: MathUtils.lerp(0.35, 1.0, rng(8)),
    bobPhase: rng(9) * Math.PI * 2,
    cx: MathUtils.lerp(-6, 6, rng(10)),
    cz: MathUtils.lerp(-6, 6, rng(11)),
    scale: MathUtils.lerp(0.4, 0.58, rng(12)),
    glideFactor: rng(13),
  };
}

export default function Seagulls() {
  const refs = useRef([]);
  const geometry = useMemo(() => {
    const shape = new Shape();
    shape.moveTo(0, 0);
    shape.quadraticCurveTo(0.35, 0.22, 0.9, 0.05);
    shape.quadraticCurveTo(0.4, -0.04, 0, 0);
    return new ShapeGeometry(shape, 6); // fewer curve segments
  }, []);

  const gulls = useMemo(
    () => Array.from({ length: FLOCK_SIZE }, (_, i) => createGull(i + 1)),
    []
  );

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;

    for (let i = 0; i < gulls.length; i++) {
      const gull = gulls[i];
      const ref = refs.current[i];
      if (!ref) continue;

      const angle = t * gull.speed + gull.phase;

      ref.position.x = gull.cx + Math.cos(angle) * gull.radius;
      ref.position.z = gull.cz + Math.sin(angle) * gull.radius * 0.7;
      ref.position.y =
        gull.height + Math.sin(t * 0.35 + gull.bobPhase) * gull.bobAmp;

      ref.rotation.y = -angle + (gull.speed < 0 ? Math.PI : 0);
      ref.rotation.z = Math.cos(angle) * 0.28 * Math.sign(gull.speed);

      const isGliding = Math.sin(t * 0.8 + gull.glideFactor * 10) > 0.6;
      const flap =
        Math.sin(t * gull.flapSpeed) *
        gull.flapAmp *
        (isGliding ? 0.2 : 1);

      const left = ref.children[0];
      const right = ref.children[1];
      if (left) left.rotation.z = flap;
      if (right) right.rotation.z = -flap;
    }
  });

  return (
    <>
      {gulls.map((gull, i) => (
        <group
          key={i}
          ref={(el) => {
            if (el) refs.current[i] = el;
          }}
          scale={gull.scale}
          frustumCulled
        >
          <GullMesh geometry={geometry} />
        </group>
      ))}
    </>
  );
}
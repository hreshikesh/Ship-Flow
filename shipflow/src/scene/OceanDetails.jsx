import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  AdditiveBlending,
  DoubleSide,
  MathUtils,
  Shape,
  ShapeGeometry,
} from "three";

import { CONFIG } from "./config";
import { sampleOceanHeight } from "./waves";
import { getArrivalState } from "../components/shipflow/arrival/arrivalStore";

function FloatingObject({ position, children, phase = 0, lift = 0.1 }) {
  const ref = useRef(null);

  useFrame(({ clock }) => {
    const group = ref.current;
    if (!group) return;

    const t = clock.elapsedTime;
    const x = position[0];
    const z = position[2];

    const waterY = sampleOceanHeight(
      x,
      z,
      t,
      CONFIG.ocean.amplitude ?? 1
    );

    group.position.y = MathUtils.lerp(group.position.y, waterY + lift, 0.06);

    group.rotation.x = Math.sin(t * 0.42 + phase) * 0.018;
    group.rotation.z = Math.cos(t * 0.38 + phase) * 0.018;
  });

  return (
    <group ref={ref} position={position}>
      {children}
    </group>
  );
}

function HorizonHills({
  position = [0, 0, -130],
  scale = [1, 1, 1],
  opacity = 0.35,
  color = "#102637",
}) {
  const geometry = useMemo(() => {
    const shape = new Shape();

    shape.moveTo(-120, 0);
    shape.lineTo(-120, 3.2);

    shape.bezierCurveTo(-100, 7, -84, 2.5, -68, 5.8);
    shape.bezierCurveTo(-52, 8.2, -38, 3.5, -20, 7);
    shape.bezierCurveTo(-4, 9.5, 12, 3.8, 28, 7.6);
    shape.bezierCurveTo(46, 11.2, 62, 4.6, 82, 6.6);
    shape.bezierCurveTo(98, 8.2, 110, 4.8, 120, 5.4);

    shape.lineTo(120, 0);
    shape.lineTo(-120, 0);

    return new ShapeGeometry(shape);
  }, []);

  return (
    <mesh
      geometry={geometry}
      position={position}
      scale={scale}
      renderOrder={-3}
      frustumCulled={false}
    >
      <meshBasicMaterial
        color={color}
        transparent
        opacity={opacity}
        depthWrite={false}
        side={DoubleSide}
        fog
      />
    </mesh>
  );
}

function FarIsland({ position = [38, -0.1, -62], scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.02, 0]} scale={[4.6, 0.36, 1.05]}>
        <dodecahedronGeometry args={[1.1, 0]} />
        <meshStandardMaterial color="#152d3d" roughness={0.86} metalness={0} />
      </mesh>

      <mesh position={[3.1, 0.04, -0.28]} scale={[2.4, 0.3, 0.75]}>
        <dodecahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#102635" roughness={0.88} metalness={0} />
      </mesh>
    </group>
  );
}

function FarLighthouse({ position = [39, 0, -62], scale = 0.42 }) {
  const lightRef = useRef(null);

  useFrame(({ clock }) => {
    const mat = lightRef.current;
    if (!mat) return;

    const t = clock.elapsedTime;
    mat.opacity = 0.12 + Math.max(0, Math.sin(t * 1.8)) * 0.35;
  });

  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 1.0, 0]} castShadow>
        <cylinderGeometry args={[0.12, 0.19, 1.9, 14]} />
        <meshStandardMaterial color="#b9c5ca" roughness={0.62} />
      </mesh>

      <mesh position={[0, 2.06, 0]}>
        <cylinderGeometry args={[0.18, 0.18, 0.2, 14]} />
        <meshStandardMaterial color="#5d2a2a" roughness={0.58} />
      </mesh>

      <mesh position={[0, 2.25, 0]}>
        <sphereGeometry args={[0.06, 14, 14]} />
        <meshBasicMaterial
          ref={lightRef}
          color="#FFD9A8"
          transparent
          opacity={0.3}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

function DistantShip({ position, scale = 1, phase = 0, color = "#0b2837" }) {
  return (
    <FloatingObject position={position} phase={phase} lift={0.035}>
      <group scale={scale}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[3.2, 0.2, 0.45]} />
          <meshStandardMaterial color={color} roughness={0.72} metalness={0.04} />
        </mesh>

        <mesh position={[0.82, 0.28, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.52, 0.34, 0.3]} />
          <meshStandardMaterial color="#9eafb7" roughness={0.68} />
        </mesh>
      </group>
    </FloatingObject>
  );
}

function MarkerPost({ position, color = "#9fb2bb", phase = 0 }) {
  const beaconRef = useRef(null);

  useFrame(({ clock }) => {
    const mat = beaconRef.current;
    if (!mat) return;

    const t = clock.elapsedTime;
    mat.opacity = 0.1 + Math.max(0, Math.sin(t * 2.8 + phase)) * 0.35;
  });

  return (
    <FloatingObject position={position} phase={phase} lift={0.48}>
      <mesh castShadow scale={[0.65, 0.65, 0.65]}>
        <cylinderGeometry args={[0.022, 0.03, 1.0, 8]} />
        <meshStandardMaterial color={color} roughness={0.62} metalness={0.12} />
      </mesh>

      <mesh position={[0, 0.54, 0]} scale={[0.65, 0.65, 0.65]}>
        <sphereGeometry args={[0.045, 12, 12]} />
        <meshBasicMaterial
          ref={beaconRef}
          color="#6FC3DF"
          transparent
          opacity={0.32}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </FloatingObject>
  );
}

function SubtleBuoy({ position, color = "#6f2f2c", phase = 0 }) {
  const lightMatRef = useRef(null);

  useFrame(({ clock }) => {
    const mat = lightMatRef.current;
    if (!mat) return;

    const t = clock.elapsedTime;
    mat.opacity = 0.14 + Math.max(0, Math.sin(t * 2.2 + phase)) * 0.28;
  });

  return (
    <FloatingObject position={position} phase={phase} lift={0.11}>
      <mesh castShadow receiveShadow scale={[0.52, 0.52, 0.52]}>
        <cylinderGeometry args={[0.12, 0.18, 0.42, 14]} />
        <meshStandardMaterial color={color} roughness={0.68} metalness={0.05} />
      </mesh>

      <mesh position={[0, 0.2, 0]} scale={[0.52, 0.52, 0.52]}>
        <sphereGeometry args={[0.05, 12, 12]} />
        <meshBasicMaterial
          ref={lightMatRef}
          color="#FFD9A8"
          transparent
          opacity={0.3}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </FloatingObject>
  );
}

function FoamPatch({ position, scale = [1, 1, 1], opacity = 0.035, phase = 0 }) {
  const matRef = useRef(null);
  const meshRef = useRef(null);

  useFrame(({ clock }) => {
    const mat = matRef.current;
    const mesh = meshRef.current;

    if (!mat || !mesh) return;

    const t = clock.elapsedTime;
    const y = sampleOceanHeight(
      position[0],
      position[2],
      t,
      CONFIG.ocean.amplitude ?? 1
    );

    mesh.position.y = y + 0.018;
    mat.opacity = opacity + Math.sin(t * 0.4 + phase) * 0.012;
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={[-Math.PI / 2, 0, phase]}
      scale={scale}
    >
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial
        ref={matRef}
        color="#d7e6ec"
        transparent
        opacity={opacity}
        depthWrite={false}
        side={DoubleSide}
        blending={AdditiveBlending}
      />
    </mesh>
  );
}

export default function OceanDetails() {
  const arrival = getArrivalState();
  const showDetails = arrival.phase !== "brand";

  return (
    <>
      {/* Premium far horizon */}
      <HorizonHills
        position={[0, -0.35, -128]}
        scale={[1.25, 1, 1]}
        opacity={0.34}
      />

      <HorizonHills
        position={[-26, -0.15, -152]}
        scale={[0.95, 0.72, 1]}
        opacity={0.2}
        color="#0c2030"
      />

      <FarIsland position={[38, -0.13, -62]} scale={0.68} />
      <FarLighthouse position={[39.5, 0, -62.5]} scale={0.38} />

      <DistantShip position={[-36, 0, -32]} scale={0.42} phase={1.2} />
      <DistantShip position={[34, 0, -36]} scale={0.34} phase={2.2} color="#102c3a" />

      {showDetails && (
        <>
          {/* Subtle, production-scale marine markers */}
          <SubtleBuoy position={[-11.5, 0, -6.8]} color="#7a3531" phase={0.3} />
          <SubtleBuoy position={[14.5, 0, -9.5]} color="#2d6652" phase={1.4} />

          <MarkerPost position={[16, 0, 4.2]} phase={0.4} />
          <MarkerPost position={[-15, 0, -13]} phase={1.8} color="#c2aa68" />

          <DistantShip position={[-30, 0, -23]} scale={0.62} phase={0.4} />
          <DistantShip position={[28, 0, -25]} scale={0.46} phase={2.2} />
          <DistantShip position={[44, 0, 13]} scale={0.32} phase={3.1} color="#102F3F" />
          <DistantShip position={[-46, 0, 19]} scale={0.35} phase={2.7} color="#0B2635" />

          <FoamPatch
            position={[-5, 0.03, 4.2]}
            scale={[2.8, 0.26, 1]}
            opacity={0.032}
            phase={0.2}
          />

          <FoamPatch
            position={[10, 0.03, -3.2]}
            scale={[2.2, 0.24, 1]}
            opacity={0.03}
            phase={1.2}
          />
        </>
      )}
    </>
  );
}
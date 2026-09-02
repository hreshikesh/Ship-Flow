// OceanDetails.jsx
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
  const frame = useRef(0);

  useFrame(({ clock }) => {
    frame.current++;
    if (frame.current % 2 !== 0) return; // half-rate update

    const group = ref.current;
    if (!group) return;

    const t = clock.elapsedTime;
    const waterY = sampleOceanHeight(
      position[0],
      position[2],
      t,
      CONFIG.ocean.amplitude ?? 1
    );

    group.position.y = MathUtils.lerp(group.position.y, waterY + lift, 0.06);
    group.rotation.x = Math.sin(t * 0.42 + phase) * 0.016;
    group.rotation.z = Math.cos(t * 0.38 + phase) * 0.016;
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
        <meshStandardMaterial color="#152d3d" roughness={0.9} metalness={0} />
      </mesh>
    </group>
  );
}

function DistantShip({ position, scale = 1, phase = 0, color = "#0b2837" }) {
  return (
    <FloatingObject position={position} phase={phase} lift={0.035}>
      <group scale={scale}>
        <mesh>
          <boxGeometry args={[3.2, 0.2, 0.45]} />
          <meshStandardMaterial color={color} roughness={0.8} metalness={0} />
        </mesh>
        <mesh position={[0.82, 0.28, 0]}>
          <boxGeometry args={[0.52, 0.34, 0.3]} />
          <meshStandardMaterial color="#9eafb7" roughness={0.75} />
        </mesh>
      </group>
    </FloatingObject>
  );
}

export default function OceanDetails() {
  const arrival = getArrivalState();
  const showDetails = arrival.phase !== "brand";

  return (
    <>
      <HorizonHills position={[0, -0.35, -128]} scale={[1.25, 1, 1]} opacity={0.34} />
      <HorizonHills
        position={[-26, -0.15, -152]}
        scale={[0.95, 0.72, 1]}
        opacity={0.2}
        color="#0c2030"
      />

      <FarIsland position={[38, -0.13, -62]} scale={0.68} />

      {/* Keep only 2 distant ships (was many + buoys + markers + foam) */}
      {showDetails && (
        <>
          <DistantShip position={[-36, 0, -32]} scale={0.42} phase={1.2} />
          <DistantShip position={[34, 0, -36]} scale={0.34} phase={2.2} color="#102c3a" />
        </>
      )}
    </>
  );
}
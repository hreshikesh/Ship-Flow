import React, { Suspense, useEffect, useMemo, useRef } from "react";
import { Html, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Box3, MathUtils, Vector3 } from "three";

import { playShipHorn, playSonarPing } from "../components/shipflow/arrival/sound";
import {
  getArrivalState,
  setArrivalState,
} from "../components/shipflow/arrival/arrivalStore";

import { CONFIG } from "./config";
import { sampleOceanHeight, sampleOceanNormal } from "./waves";

function getDeviceProfile() {
  if (typeof window === "undefined") return "desktop";

  const width = window.innerWidth;

  if (width < 768) return "mobile";
  if (width < 1180) return "tablet";

  return "desktop";
}

function getResponsiveShipConfig() {
  const profile = getDeviceProfile();

  if (profile === "mobile") {
    return {
      targetLength: 11.4,
      heroPosition: [4.45, 0, 0],
      draft: CONFIG.ship.draft,
    };
  }

  if (profile === "tablet") {
    return {
      targetLength: 12.7,
      heroPosition: [4.6, 0, 0],
      draft: CONFIG.ship.draft,
    };
  }

  return {
    targetLength: CONFIG.ship.targetLength ?? 13.8,
    heroPosition: CONFIG.ship.heroPosition ?? [4.8, 0, 0],
    draft: CONFIG.ship.draft ?? 0.46,
  };
}

function cloneMaterial(material) {
  if (Array.isArray(material)) {
    return material.map((mat) => mat.clone());
  }

  return material?.clone?.() ?? material;
}

function tuneMaterial(material) {
  if (!material) return;

  const materials = Array.isArray(material) ? material : [material];

  materials.forEach((mat) => {
    if (!mat) return;

    if ("envMapIntensity" in mat) {
      mat.envMapIntensity = 0.82;
    }

    if ("roughness" in mat && typeof mat.roughness === "number") {
      mat.roughness = MathUtils.clamp(mat.roughness, 0.38, 0.72);
    }

    if ("metalness" in mat && typeof mat.metalness === "number") {
      mat.metalness = MathUtils.clamp(mat.metalness, 0, 0.35);
    }

    mat.needsUpdate = true;
  });
}

function ShipPlaceholder() {
  const responsive = getResponsiveShipConfig();
  const position = responsive.heroPosition;

  return (
    <group position={[position[0], -0.35, position[2]]} scale={0.9}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[10.5, 1.05, 2.65]} />
        <meshStandardMaterial color="#111827" roughness={0.58} metalness={0.12} />
      </mesh>

      <mesh position={[0, -0.65, 0]} castShadow receiveShadow>
        <boxGeometry args={[10.2, 0.45, 2.45]} />
        <meshStandardMaterial color="#5f1f24" roughness={0.62} metalness={0.08} />
      </mesh>

      <group position={[-0.8, 0.95, 0]}>
        {["#cf5b43", "#4088c9", "#78a85f", "#d3b84c"].map((color, i) => (
          <mesh
            key={color}
            position={[i * 1.4 - 2.1, 0, 0]}
            castShadow
            receiveShadow
          >
            <boxGeometry args={[1.25, 0.75, 2.2]} />
            <meshStandardMaterial color={color} roughness={0.55} metalness={0.1} />
          </mesh>
        ))}
      </group>

      <mesh position={[3.25, 1.15, -0.15]} castShadow receiveShadow>
        <boxGeometry args={[2.1, 1.55, 1.75]} />
        <meshStandardMaterial color="#d8d5cc" roughness={0.52} metalness={0.05} />
      </mesh>
    </group>
  );
}

function ShipLoading() {
  return (
    <group>
      <ShipPlaceholder />

      <Html center position={[4.2, 3.5, 0]}>
        <div
          style={{
            color: "white",
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: 12,
            padding: "8px 12px",
            borderRadius: 999,
            background: "rgba(7, 26, 47, 0.56)",
            border: "1px solid rgba(255,255,255,0.12)",
            backdropFilter: "blur(12px)",
            whiteSpace: "nowrap",
          }}
        >
          Loading vessel...
        </div>
      </Html>
    </group>
  );
}

class ShipErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error) {
    console.warn("[Ship] Failed to load model:", error?.message || error);
  }

  render() {
    if (this.state.failed) {
      return (
        <group>
          <ShipPlaceholder />

          <Html center position={[4.2, 3.5, 0]}>
            <div
              style={{
                color: "white",
                fontFamily: "Inter, system-ui, sans-serif",
                fontSize: 12,
                padding: "8px 12px",
                borderRadius: 999,
                background: "rgba(130, 35, 25, 0.72)",
                border: "1px solid rgba(255,255,255,0.16)",
                backdropFilter: "blur(12px)",
                whiteSpace: "nowrap",
              }}
            >
              Ship model failed. Check /public/models/cargo_ship_loaded.glb
            </div>
          </Html>
        </group>
      );
    }

    return this.props.children;
  }
}

function ShipModel() {
  const rootRef = useRef(null);
  const modelReadyRef = useRef(false);
  const targetYRef = useRef(0);

  const clickCountRef = useRef(0);
  const clickTimerRef = useRef(null);

  const responsive = getResponsiveShipConfig();

  const gltf = useGLTF(CONFIG.ship.url, CONFIG.ship.useDraco ? true : false);

  const model = useMemo(() => {
    const cloned = gltf.scene.clone(true);

    cloned.traverse((child) => {
      if (!child.isMesh) return;

      child.castShadow = true;
      child.receiveShadow = true;
      child.frustumCulled = false;

      child.material = cloneMaterial(child.material);
      tuneMaterial(child.material);
    });

    return cloned;
  }, [gltf.scene]);

  useEffect(() => {
    if (!model) return;

    const currentResponsive = getResponsiveShipConfig();

    model.position.set(0, 0, 0);
    model.rotation.set(0, 0, 0);
    model.scale.set(1, 1, 1);

    const initialBox = new Box3().setFromObject(model);
    const initialSize = new Vector3();

    initialBox.getSize(initialSize);

    const originalLength = Math.max(initialSize.x, initialSize.z, 0.001);
    const targetLength = currentResponsive.targetLength;
    const extraScale = CONFIG.ship.extraScale ?? 1;
    const finalScale = (targetLength / originalLength) * extraScale;

    model.scale.setScalar(finalScale);

    const scaledBox = new Box3().setFromObject(model);
    const scaledCenter = new Vector3();

    scaledBox.getCenter(scaledCenter);

    model.position.x -= scaledCenter.x;
    model.position.z -= scaledCenter.z;

    const bottomBox = new Box3().setFromObject(model);
    model.position.y -= bottomBox.min.y;

    model.rotation.y = CONFIG.ship.rotationY ?? Math.PI;

    modelReadyRef.current = true;

    console.info("[Ship] SHIPFLOW vessel ready", {
      url: CONFIG.ship.url,
      originalLength,
      targetLength,
      finalScale,
      heroPosition: currentResponsive.heroPosition,
      draft: currentResponsive.draft,
    });
  }, [model]);

  const handleShipClick = (event) => {
    event.stopPropagation();

    playShipHorn();

    window.dispatchEvent(
      new CustomEvent("shipflow:horn", {
        detail: { source: "ship" },
      })
    );

    clickCountRef.current += 1;

    if (clickTimerRef.current) {
      clearTimeout(clickTimerRef.current);
    }

    clickTimerRef.current = setTimeout(() => {
      clickCountRef.current = 0;
    }, 2800);

    if (clickCountRef.current >= 5) {
      clickCountRef.current = 0;

      if (clickTimerRef.current) {
        clearTimeout(clickTimerRef.current);
        clickTimerRef.current = null;
      }

      const current = getArrivalState();
      const nextSonarState = !current.sonarMode;

      setArrivalState({
        sonarMode: nextSonarState,
      });

      playSonarPing();

      window.dispatchEvent(
        new CustomEvent("shipflow:sonar", {
          detail: {
            active: nextSonarState,
          },
        })
      );
    }
  };

  useFrame(({ clock }) => {
    if (!rootRef.current || !modelReadyRef.current) return;

    const t = clock.elapsedTime;
    const arrival = getArrivalState?.() ?? {};
    const currentResponsive = getResponsiveShipConfig();

    const amplitude =
      getDeviceProfile() === "mobile"
        ? 0.72
        : getDeviceProfile() === "tablet"
          ? 0.82
          : CONFIG.ocean?.amplitude ?? 1;

    const draft = currentResponsive.draft ?? 0.46;

    const baseX = currentResponsive.heroPosition[0];
    const baseZ = currentResponsive.heroPosition[2];

    /*
      Subtle forward surge — makes the vessel feel alive.
      Tiny enough to keep camera composition stable.
    */
    const surge = Math.sin(t * 0.18) * 0.035;

    rootRef.current.position.x = baseX + surge;
    rootRef.current.position.z = baseZ;

    const waterY = sampleOceanHeight(
      rootRef.current.position.x,
      rootRef.current.position.z,
      t,
      amplitude
    );

    const normal = sampleOceanNormal(
      rootRef.current.position.x,
      rootRef.current.position.z,
      t,
      amplitude
    );

    const cinematicSink = arrival.phase === "brand" ? 0.08 : 0;
    targetYRef.current = waterY - draft - cinematicSink;

    rootRef.current.position.y = MathUtils.lerp(
      rootRef.current.position.y,
      targetYRef.current,
      0.075
    );

    const idlePitch = Math.sin(t * 0.36) * 0.0045;
    const idleRoll = Math.sin(t * 0.31 + 1.7) * 0.007;

    const pitchStrength = CONFIG.ship.pitchStrength ?? 0.42;
    const rollStrength = CONFIG.ship.rollStrength ?? 0.5;

    rootRef.current.rotation.x = MathUtils.lerp(
      rootRef.current.rotation.x,
      normal.pitch * pitchStrength + idlePitch,
      0.045
    );

    rootRef.current.rotation.z = MathUtils.lerp(
      rootRef.current.rotation.z,
      normal.roll * rollStrength + idleRoll,
      0.045
    );

    rootRef.current.rotation.y = 0;
  });

  const heroPosition = responsive.heroPosition;

  return (
    <group
      ref={rootRef}
      position={heroPosition}
      name="SHIPFLOW_Hero_Vessel"
      onClick={handleShipClick}
      onPointerOver={() => {
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        document.body.style.cursor = "default";
      }}
    >
      <primitive object={model} />
    </group>
  );
}

export default function Ship() {
  return (
    <ShipErrorBoundary>
      <Suspense fallback={<ShipLoading />}>
        <ShipModel />
      </Suspense>
    </ShipErrorBoundary>
  );
}

useGLTF.preload(CONFIG.ship.url);
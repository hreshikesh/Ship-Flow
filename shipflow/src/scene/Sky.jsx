import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { BackSide, Color, Vector3 } from "three";

import { CONFIG } from "./config";

function SkyDome() {
  const matRef = useRef(null);

  const sunDirection = useMemo(() => {
    return new Vector3(...CONFIG.sun.position).normalize();
  }, []);

  const shader = useMemo(
    () => ({
      uniforms: {
        uZenith: { value: new Color("#061529") },
        uUpper: { value: new Color("#102b43") },
        uHorizon: { value: new Color("#8ea7b4") },
        uWarm: { value: new Color("#FFD9A8") },
        uSunDir: { value: sunDirection },
        uTime: { value: 0 },
      },

      vertexShader: /* glsl */ `
        varying vec3 vDir;

        void main() {
          vec4 wp = modelMatrix * vec4(position, 1.0);
          vDir = normalize(wp.xyz);
          gl_Position = projectionMatrix * viewMatrix * wp;
        }
      `,

      fragmentShader: /* glsl */ `
        uniform vec3 uZenith;
        uniform vec3 uUpper;
        uniform vec3 uHorizon;
        uniform vec3 uWarm;
        uniform vec3 uSunDir;
        uniform float uTime;

        varying vec3 vDir;

        void main() {
          vec3 dir = normalize(vDir);
          float h = dir.y * 0.5 + 0.5;

          vec3 color = uHorizon;
          color = mix(color, uUpper, smoothstep(0.08, 0.42, h));
          color = mix(color, uZenith, smoothstep(0.48, 0.95, h));

          // soft horizon haze
          float horizonMist = exp(-abs(h - 0.13) * 9.0);
          color = mix(color, uHorizon, horizonMist * 0.26);

          // atmospheric sun glow only, no physical sprite
          float sunDot = max(dot(dir, normalize(uSunDir)), 0.0);

          float wideGlow = pow(sunDot, 3.5);
          float innerGlow = pow(sunDot, 24.0);
          float tinyCore = pow(sunDot, 650.0);

          color += uWarm * wideGlow * 0.055;
          color += vec3(1.0, 0.56, 0.28) * innerGlow * 0.085;
          color += uWarm * tinyCore * 0.22;

          // darken zenith slightly
          color = mix(
            color,
            color * vec3(0.76, 0.86, 1.0),
            smoothstep(0.55, 1.0, h) * 0.22
          );

          color = clamp(color, 0.0, 1.0);

          gl_FragColor = vec4(color, 1.0);
        }
      `,

      side: BackSide,
      depthWrite: false,
      depthTest: false,
    }),
    [sunDirection]
  );

  useFrame(({ clock }) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = clock.elapsedTime;
    }
  });

  return (
    <mesh scale={[1200, 1200, 1200]} renderOrder={-100} frustumCulled={false}>
      <sphereGeometry args={[1, 64, 40]} />
      <shaderMaterial ref={matRef} {...shader} fog={false} />
    </mesh>
  );
}

export default function Sky() {
  return <SkyDome />;
}
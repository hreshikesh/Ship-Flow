import { useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { CONFIG } from "./config";

const vertexShader = /* glsl */ `
  varying vec3 vDir;

  void main() {
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vDir = wp.xyz - cameraPosition;
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`;

const fragmentShader = /* glsl */ `
  varying vec3 vDir;

  uniform float uTime;
  uniform vec3 uSunDir;
  uniform float uCoverage;
  uniform float uExposure;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;

    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p = p * 2.03 + vec2(17.3, 9.1);
      a *= 0.5;
    }

    return v;
  }

  vec3 acesApprox(vec3 x) {
    const float a = 2.51;
    const float b = 0.03;
    const float c = 2.43;
    const float d = 0.59;
    const float e = 0.14;

    return clamp((x * (a * x + b)) / (x * (c * x + d) + e), 0.0, 1.0);
  }

  void main() {
    vec3 d = normalize(vDir);
    float h = d.y;

    vec2 uv = d.xz / max(h + 0.16, 0.08) * 0.35;
    vec2 wind = vec2(uTime, uTime * 0.35);

    float n = fbm(uv * 1.4 + wind);
    float detail = fbm(uv * 4.0 - wind * 1.7);

    float mask = smoothstep(uCoverage, uCoverage + 0.25, n);
    mask *= smoothstep(0.25, 0.6, detail + 0.35);

    float altitude = smoothstep(0.015, 0.12, h) * (1.0 - smoothstep(0.45, 0.85, h));
    float alpha = mask * altitude;

    if (alpha < 0.01) discard;

    float sunAmount = pow(max(dot(d, normalize(uSunDir)), 0.0), 6.0);

    vec3 shade = mix(
      vec3(0.3, 0.32, 0.4),
      vec3(0.95, 0.93, 0.9),
      0.45 + 0.55 * detail
    );

    shade = mix(shade, vec3(1.0, 0.72, 0.48), sunAmount * 0.75);
    shade += vec3(1.0, 0.8, 0.55) * pow(sunAmount, 3.0) * mask * 0.8;

    vec3 mapped = acesApprox(shade * uExposure);
    mapped = pow(mapped, vec3(1.0 / 2.2));

    gl_FragColor = vec4(mapped, alpha * 0.9);
  }
`;

export default function Clouds() {
  const sunDir = useMemo(() => {
    return new THREE.Vector3(...CONFIG.sun.direction).normalize();
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSunDir: { value: sunDir },
      uCoverage: { value: CONFIG.clouds.coverage },
      uExposure: { value: 1.1 },
    }),
    [sunDir]
  );

  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.elapsedTime * CONFIG.clouds.speed;
  });

  return (
    <mesh frustumCulled={false} renderOrder={-15}>
      <sphereGeometry args={[CONFIG.clouds.radius, 48, 32]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        side={THREE.BackSide}
        transparent
        depthWrite={false}
        depthTest={false}
        toneMapped={false}
        fog={false}
      />
    </mesh>
  );
}
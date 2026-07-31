import { CONFIG } from "./config";

export default function Lighting() {
  return (
    <>
      <ambientLight intensity={0.16} />

      <hemisphereLight
        intensity={0.52}
        color="#C9D6DF"
        groundColor="#071A2F"
      />


      {/* Cool marine fill */}
      <directionalLight
        position={[-80, 22, 90]}
        intensity={0.34}
        color="#7EA8C6"
      />

      {/* Soft water bounce */}
      <directionalLight
        position={[0, -8, 0]}
        intensity={0.13}
        color="#1E4966"
      />
    </>
  );
}
import { Environment } from "@react-three/drei";

export default function SceneEnvironment() {
  return (
    <Environment
      files="/hdr/sunrise.hdr"
      background
      backgroundBlurriness={0.15}
      environmentIntensity={1.2}
    />
  );
}
import { CONFIG } from "./config";

export default function Atmosphere() {
  return (
    <>
      <color attach="background" args={[CONFIG.background]} />
      <fogExp2 attach="fog" args={[CONFIG.fog.color, CONFIG.fog.density]} />
    </>
  );
}
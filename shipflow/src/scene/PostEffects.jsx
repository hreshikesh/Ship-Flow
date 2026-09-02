// PostEffects.jsx
import {
  Bloom,
  ChromaticAberration,
  EffectComposer,
  SMAA,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction, KernelSize } from "postprocessing";
import { useMemo } from "react";
import { useThree } from "@react-three/fiber";
import { Vector2 } from "three";

export default function PostEffects() {
  const width = useThree((s) => s.size.width);

  // Hard exit — never mount composer on mobile
  if (width < 768) return null;

  const chromaticOffset = useMemo(
    () => new Vector2(0.00004, 0.00004),
    []
  );

  return (
    <EffectComposer multisampling={0} disableNormalPass>
      <Bloom
        mipmapBlur
        intensity={0.014}
        luminanceThreshold={1.75}
        luminanceSmoothing={0.08}
        kernelSize={KernelSize.SMALL}
      />
      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL}
        offset={chromaticOffset}
      />
      <Vignette
        offset={0.52}
        darkness={0.14}
        blendFunction={BlendFunction.NORMAL}
      />
      {/* SMAA is expensive — keep only on wide desktop */}
      {width >= 1280 && <SMAA />}
    </EffectComposer>
  );
}
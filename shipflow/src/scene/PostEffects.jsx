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
    const size = useThree((state) => state.size);
    const isSmall = size.width < 768;

    const chromaticOffset = useMemo(() => {
        return new Vector2(
            isSmall ? 0.00002 : 0.00005,
            isSmall ? 0.00002 : 0.00005
        );
    }, [isSmall]);

    return (
        <EffectComposer multisampling={0} disableNormalPass>
            <Bloom
                mipmapBlur
                intensity={0.018}
                luminanceThreshold={1.7}
                luminanceSmoothing={0.06}
                kernelSize={KernelSize.SMALL}
            />

            <ChromaticAberration
                blendFunction={BlendFunction.NORMAL}
                offset={chromaticOffset}
            />

            <Vignette
                offset={0.52}
                darkness={isSmall ? 0.1 : 0.16}
                blendFunction={BlendFunction.NORMAL}
            />

            <SMAA />
        </EffectComposer>
    );
}
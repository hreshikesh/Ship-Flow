import { useFrame, useThree } from "@react-three/fiber";
import { MathUtils, Vector3 } from "three";

import { CONFIG } from "./config";
import { getArrivalState } from "../components/shipflow/arrival/arrivalStore";

const lookTarget = new Vector3();

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

function mixVec3(a, b, t) {
  return new Vector3(
    MathUtils.lerp(a[0], b[0], t),
    MathUtils.lerp(a[1], b[1], t),
    MathUtils.lerp(a[2], b[2], t)
  );
}

export default function CameraRig({ enabled = true }) {
  const { camera, pointer, viewport } = useThree();

  useFrame(({ clock }) => {
    if (!enabled) return;

    const t = clock.elapsedTime;
    const arrival = getArrivalState();

    const elapsed = arrival.elapsed;
    const scroll = arrival.scrollProgress;

    const isSmall = viewport.width < 8;

    const mouseX = arrival.mouseEnabled ? pointer.x : 0;
    const mouseY = arrival.mouseEnabled ? pointer.y : 0;

    const parallaxX = isSmall ? 0.35 : CONFIG.camera.parallax[0];
    const parallaxY = isSmall ? 0.2 : CONFIG.camera.parallax[1];

    /**
     * STORYBOARD CAMERA POSITIONS
     *
     * A: silence / darkness
     * B: horizon appears
     * C: dolly begins
     * D: ship reveal / hero composition
     */
    const silencePos = [-27, 6.8, 34];
    const horizonPos = [-24, 6.4, 31];
    const revealPos = [-20, 6.0, 27];
    const heroPos = CONFIG.camera.base;

    const silenceLook = [0, 1.2, 0];
    const horizonLook = [1.2, 1.35, 0];
    const revealLook = [2.0, 1.55, 0];
    const heroLook = CONFIG.camera.lookAt;

    let basePosition;
    let baseLook;

    if (arrival.userTookControl) {
      /**
       * SCENE 9 — FIRST SCROLL
       *
       * Camera does not leave the ship.
       * It starts travelling toward it.
       * Later this path can continue through containers.
       */
      const p = easeOutCubic(scroll);

      const journeyA = CONFIG.camera.base;
      const journeyB = [-8, 4.4, 14];
      const journeyC = [-2.4, 3.1, 7.5];
      const journeyD = [2.2, 2.4, 3.2];

      const lookA = CONFIG.camera.lookAt;
      const lookB = [2.8, 1.9, 0];
      const lookC = [3.6, 2.0, 0];
      const lookD = [4.3, 1.9, 0];

      if (p < 0.33) {
        const local = p / 0.33;
        basePosition = mixVec3(journeyA, journeyB, local);
        baseLook = mixVec3(lookA, lookB, local);
      } else if (p < 0.66) {
        const local = (p - 0.33) / 0.33;
        basePosition = mixVec3(journeyB, journeyC, local);
        baseLook = mixVec3(lookB, lookC, local);
      } else {
        const local = (p - 0.66) / 0.34;
        basePosition = mixVec3(journeyC, journeyD, local);
        baseLook = mixVec3(lookC, lookD, local);
      }
    } else {
      /**
       * AUTO ARRIVAL TIMELINE
       */
      const horizonT = easeOutCubic(
        MathUtils.clamp((elapsed - 3.4) / 1.4, 0, 1)
      );

      const dollyT = easeOutCubic(
        MathUtils.clamp((elapsed - 4.6) / 3.2, 0, 1)
      );

      const firstPos = mixVec3(silencePos, horizonPos, horizonT);
      const firstLook = mixVec3(silenceLook, horizonLook, horizonT);

      const secondPos = mixVec3(revealPos, heroPos, dollyT);
      const secondLook = mixVec3(revealLook, heroLook, dollyT);

      const blend = easeOutCubic(
        MathUtils.clamp((elapsed - 4.6) / 2.8, 0, 1)
      );

      basePosition = firstPos.lerp(secondPos, blend);
      baseLook = firstLook.lerp(secondLook, blend);
    }

    /**
     * IDLE BREATHING
     */
    const breathing = Math.sin(t * 0.22) * 0.16;
    const microDrift = Math.sin(t * 0.11 + 2.0) * 0.12;

    const targetX = basePosition.x + mouseX * parallaxX + microDrift;
    const targetY = basePosition.y + mouseY * parallaxY + breathing * 0.22;
    const targetZ = basePosition.z + breathing;

    camera.position.x = MathUtils.lerp(camera.position.x, targetX, 0.035);
    camera.position.y = MathUtils.lerp(camera.position.y, targetY, 0.035);
    camera.position.z = MathUtils.lerp(camera.position.z, targetZ, 0.032);

    lookTarget.set(
      baseLook.x + mouseX * 0.16,
      baseLook.y + mouseY * 0.08,
      baseLook.z
    );

    camera.lookAt(lookTarget);
  });

  return null;
}
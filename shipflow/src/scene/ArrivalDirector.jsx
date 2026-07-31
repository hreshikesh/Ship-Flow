import { useLayoutEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { MathUtils, Vector3 } from "three";

import { CONFIG } from "./config";
import { getArrivalState } from "../components/shipflow/arrival/arrivalStore";

const lookTarget = new Vector3();

function clamp01(value) {
  return Math.min(1, Math.max(0, value));
}

function easeInOutCubic(t) {
  return t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function vecLerp(a, b, t) {
  return new Vector3(
    MathUtils.lerp(a[0], b[0], t),
    MathUtils.lerp(a[1], b[1], t),
    MathUtils.lerp(a[2], b[2], t)
  );
}

function getCameraSet(profile) {
  if (profile === "mobile") {
    return {
      brandCam: [-17.2, 6.0, 38],
      brandLook: [4.2, 1.15, 0],

      heroCam: [-16.2, 5.55, 32],
      heroLook: [4.25, 1.25, 0],

      routeCam: [-14.2, 5.2, 29],
      routeLook: [5.2, 1.35, 0],

      approachCam: [-12.4, 4.75, 25],
      approachLook: [5.2, 1.45, 0],

      containerCam: [-10.2, 4.2, 20],
      containerLook: [5.4, 1.55, 0],
    };
  }

  if (profile === "tablet") {
    return {
      brandCam: [-20, 6.0, 34],
      brandLook: [4.15, 1.15, 0],

      heroCam: [-15.3, 5.15, 28],
      heroLook: [4.15, 1.3, 0],

      routeCam: [-13.2, 4.75, 24.5],
      routeLook: [5.7, 1.35, 0.1],

      approachCam: [-10.2, 4.0, 18],
      approachLook: [5.4, 1.55, 0],

      containerCam: [-5.2, 2.9, 10],
      containerLook: [5.9, 1.7, 0],
    };
  }

  return {
    brandCam: [-22.5, 6.2, 34],
    brandLook: [4.2, 1.1, 0],

    heroCam: CONFIG.camera.base,
    heroLook: CONFIG.camera.lookAt,

    routeCam: [-11.2, 4.25, 20.2],
    routeLook: [6.2, 1.35, 0.2],

    approachCam: [-7.9, 3.55, 14.4],
    approachLook: [5.6, 1.65, 0],

    containerCam: [-3.1, 2.55, 8.0],
    containerLook: [5.9, 1.72, 0],
  };
}

export default function ArrivalDirector() {
  const { camera, pointer, viewport } = useThree();

  const isMobile = viewport.width < 8;
  const isTablet = !isMobile && viewport.width < 12;
  const profile = isMobile ? "mobile" : isTablet ? "tablet" : "desktop";

  useLayoutEffect(() => {
    const set = getCameraSet(profile);

    camera.position.set(...set.brandCam);
    camera.lookAt(...set.brandLook);
    camera.updateProjectionMatrix();
  }, [camera, profile]);

  useFrame(({ clock }) => {
    const arrival = getArrivalState();
    const t = clock.elapsedTime;

    const scroll = easeInOutCubic(clamp01(arrival.scrollProgress ?? 0));
    const set = getCameraSet(profile);

    const {
      brandCam,
      brandLook,
      heroCam,
      heroLook,
      routeCam,
      routeLook,
      approachCam,
      approachLook,
      containerCam,
      containerLook,
    } = set;

    let basePos;
    let baseLook;

    if (scroll < 0.08) {
      basePos = vecLerp(brandCam, brandCam, 0);
      baseLook = vecLerp(brandLook, brandLook, 0);
    } else if (scroll < 0.38) {
      const local = (scroll - 0.08) / 0.3;

      basePos = vecLerp(brandCam, heroCam, local);
      baseLook = vecLerp(brandLook, heroLook, local);
    } else if (scroll < 0.62) {
      const local = (scroll - 0.38) / 0.24;

      const heroPushCam = [
        heroCam[0] + (isMobile ? 0.1 : 0.25),
        heroCam[1] - 0.02,
        heroCam[2] - (isMobile ? 0.2 : 0.45),
      ];

      basePos = vecLerp(heroCam, heroPushCam, local);
      baseLook = vecLerp(heroLook, heroLook, local);
    } else if (scroll < 0.82) {
      const local = (scroll - 0.62) / 0.2;

      basePos = vecLerp(heroCam, routeCam, local);
      baseLook = vecLerp(heroLook, routeLook, local);
    } else if (scroll < 0.94) {
      const local = (scroll - 0.82) / 0.12;

      basePos = vecLerp(routeCam, approachCam, local);
      baseLook = vecLerp(routeLook, approachLook, local);
    } else {
      const local = (scroll - 0.94) / 0.06;

      basePos = vecLerp(approachCam, containerCam, local);
      baseLook = vecLerp(approachLook, containerLook, local);
    }

    const mouseEnabled = arrival.mouseEnabled;
    const mouseX = mouseEnabled ? pointer.x : 0;
    const mouseY = mouseEnabled ? pointer.y : 0;

    const parallaxX = isMobile
      ? 0.12
      : isTablet
        ? 0.22
        : CONFIG.camera.parallax[0];

    const parallaxY = isMobile
      ? 0.07
      : isTablet
        ? 0.11
        : CONFIG.camera.parallax[1];

    const breathY = Math.sin(t * 0.2) * (isMobile ? 0.03 : 0.045);
    const breathZ = Math.sin(t * 0.17 + 1.5) * (isMobile ? 0.045 : 0.07);
    const driftX = Math.sin(t * 0.1) * 0.022;

    camera.position.x = MathUtils.lerp(
      camera.position.x,
      basePos.x + mouseX * parallaxX + driftX,
      0.052
    );

    camera.position.y = MathUtils.lerp(
      camera.position.y,
      basePos.y + mouseY * parallaxY + breathY,
      0.052
    );

    camera.position.z = MathUtils.lerp(
      camera.position.z,
      basePos.z + breathZ,
      0.048
    );

    lookTarget.set(
      baseLook.x + mouseX * 0.06,
      baseLook.y + mouseY * 0.03,
      baseLook.z
    );

    camera.lookAt(lookTarget);
  });

  return null;
}
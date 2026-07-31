import { CONFIG } from "./config";

export function getDeviceType() {
  if (typeof window === "undefined") return "desktop";

  const width = window.innerWidth;

  if (width < 768) return "mobile";
  if (width < 1180) return "tablet";

  return "desktop";
}

export function getResponsiveSceneConfig() {
  const type = getDeviceType();

  return {
    type,
    camera:
      CONFIG.responsive?.[type]?.camera ??
      CONFIG.camera,

    ship: {
      ...CONFIG.ship,
      ...(CONFIG.responsive?.[type]?.ship ?? {}),
    },

    ocean: {
      ...CONFIG.ocean,
      ...(CONFIG.responsive?.[type]?.ocean ?? {}),
    },
  };
}
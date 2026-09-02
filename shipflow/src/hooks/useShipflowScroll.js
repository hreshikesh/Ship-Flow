// src/hooks/useShipflowScroll.js
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis/types";

/**
 * Desktop-only smooth scroll.
 * Skips entirely on mobile/touch to avoid Chrome freezes + low PageSpeed.
 */
export function useShipflowScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const isMobile =
      window.innerWidth < 768 ||
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0;

    // Native scroll on phones/tablets — do not init Lenis
    if (isMobile) {
      document.documentElement.classList.remove("shipflow-lenis", "lenis-smooth");
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1,
    });

    const html = document.documentElement;
    html.classList.add("shipflow-lenis", "lenis-smooth");

    let rafId = 0;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      html.classList.remove("shipflow-lenis", "lenis-smooth", "lenis-stopped");
    };
  }, []);
}

// Optional alias if anything else imports useLenis
export const useLenis = useShipflowScroll;
export default useShipflowScroll;
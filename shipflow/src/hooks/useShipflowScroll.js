// hooks/useShipflowScroll.js
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export function useShipflowScroll() {
  useEffect(() => {
    // ✅ Respect user's reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // ✅ Skip Lenis on mobile — native scroll is faster
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    if (prefersReducedMotion || isMobile) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.0,           // ✅ shorter (was likely 1.2+)
      easing: (t) => 1 - Math.pow(1 - t, 3),  // ✅ cheap easing
      smoothWheel: true,
      smoothTouch: false,       // ✅ NEVER smooth touch — kills mobile
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      infinite: false,
      autoResize: true,
    });

    document.documentElement.classList.add("shipflow-lenis", "lenis-smooth");

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      document.documentElement.classList.remove("shipflow-lenis", "lenis-smooth");
    };
  }, []);
}
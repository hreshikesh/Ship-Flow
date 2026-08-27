import { useEffect } from "react";
import { setArrivalFrameState, setArrivalState } from "./arrivalStore";

export const HERO_SCROLL_DISTANCE = "220dvh";

export default function ArrivalRuntime() {
  useEffect(() => {
    let frame = null;

    const updateArrival = () => {
      // 🚀 Mobile-friendly secure scroll calculation
      const scrollY = 
        window.pageYOffset || 
        document.documentElement.scrollTop || 
        window.scrollY || 
        0;
        
      const viewportHeight = 
        window.innerHeight || 
        document.documentElement.clientHeight || 
        800;

      const distance = viewportHeight * 1.2;
      const progress = Math.min(Math.max(scrollY / distance, 0), 1);

      setArrivalFrameState({
        scroll: scrollY,
        scrollLimit: distance,
        scrollProgress: progress,
        pageProgress: progress,
      });

      setArrivalState({
        introVisible: progress < 0.08,
        textVisible: progress >= 0.08 && progress < 0.95,
        routeVisible: progress >= 0.12 && progress < 0.95,
        ctaVisible: progress >= 0.2 && progress < 0.95,
        navVisible: progress >= 0.16,
        heroComplete: progress >= 0.98,
      });

      frame = null;
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(updateArrival);
    };

    // Ensure we handle scroll and orientation changes instantly
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    window.addEventListener("orientationchange", onScroll, { passive: true });

    updateArrival();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("orientationchange", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
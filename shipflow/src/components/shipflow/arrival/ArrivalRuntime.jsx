import { useEffect } from "react";
import {
  getArrivalState,
  setArrivalFrameState,
  setArrivalState,
  advanceFromIntro,
} from "./arrivalStore";

export const HERO_SCROLL_DISTANCE = "150dvh";

export default function ArrivalRuntime() {
  useEffect(() => {
    let frame = null;

    const updateArrival = () => {
      const current = getArrivalState();

      const scrollY =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        window.scrollY ||
        0;

      const viewportHeight =
        window.innerHeight || document.documentElement.clientHeight || 800;

      const distance = viewportHeight * 1.5;
      const progress = Math.min(Math.max(scrollY / distance, 0), 1);

      setArrivalFrameState({
        scroll: scrollY,
        scrollLimit: distance,
        scrollProgress: progress,
        pageProgress: progress,
      });

      // ─────────────────────────────────────────────
      // SCROLL BACK UP → re-enter hero
      // ─────────────────────────────────────────────
      if (progress < 0.92) {
        // Always restore cinematic layer when near/in hero range
        if (current.heroComplete) {
          setArrivalState({
            heroComplete: false,
            // keep userOverride if they already passed intro via click
          });
        }
      }

      // Finished hero zone (deep into page content)
      if (progress >= 0.98) {
        if (!current.heroComplete) {
          setArrivalState({
            heroComplete: true,
            aboutUnlocked: true,
            navVisible: true,
          });
        }
        frame = null;
        return;
      }

      // User clicked Enter / Skip — don't force intro back on
      if (current.userOverride) {
        setArrivalState({
          heroComplete: false,
          introVisible: false,
          textVisible: true,
          routeVisible: true,
          ctaVisible: true,
          navVisible: true,
        });
        frame = null;
        return;
      }

      // Pure scroll path (no click yet)
      if (progress >= 0.05 && current.introVisible) {
        advanceFromIntro();
        frame = null;
        return;
      }

      setArrivalState({
        introVisible: progress < 0.05,
        textVisible: progress >= 0.05,
        routeVisible: progress >= 0.08,
        ctaVisible: progress >= 0.12,
        navVisible: progress >= 0.1,
        heroComplete: false,
      });

      frame = null;
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(updateArrival);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    updateArrival();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
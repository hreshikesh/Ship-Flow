import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";

import { CONFIG } from "../../../scene/config";
import {
  getArrivalState,
  setArrivalFrameState,
  setArrivalState,
} from "./arrivalStore";

export const HERO_SCROLL_DISTANCE = 1800;
const LOADER_END = 10.5;

function clamp01(value) {
  return Math.min(1, Math.max(0, value));
}

function getPhase({ elapsed, progress }) {
  if (elapsed < LOADER_END) return "loader";
  if (progress < 0.08) return "brand";
  if (progress < 0.6) return "engineering";
  return "hero";
}

export default function ArrivalRuntime() {
  const startRef = useRef(performance.now());
  const rafRef = useRef(null);
  const lenisRef = useRef(null);
  const snappedRef = useRef(false);

  const heroEverCompletedRef = useRef(false);

  const lastUIStateRef = useRef({
    phase: "loader",
    loaderDone: false,
    introVisible: false,
    textVisible: false,
    ctaVisible: false,
    mouseEnabled: false,
    navVisible: false,
    routeVisible: false,
    heroComplete: false,
    aboutUnlocked: false,
  });

  useEffect(() => {
    window.scrollTo(0, 0);

    const html = document.documentElement;
    const body = document.body;

    html.classList.add("shipflow-lenis");
    body.classList.add("shipflow-lenis");

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => 1 - Math.pow(1 - t, 3.5),
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.2,
      infinite: false,
    });

    lenisRef.current = lenis;

    lenis.on("scroll", ({ scroll, limit }) => {
      const heroProgress = clamp01(scroll / HERO_SCROLL_DISTANCE);
      const pageProgress = clamp01(scroll / Math.max(limit, 1));
      const heroComplete = heroProgress >= 0.995;

      if (heroComplete) {
        heroEverCompletedRef.current = true;
      }

      setArrivalFrameState({
        scroll,
        scrollLimit: limit,
        scrollProgress: heroProgress,
        pageProgress,
        heroComplete,
        aboutUnlocked: heroComplete || heroEverCompletedRef.current,
      });
    });

    const tick = (time) => {
      const elapsed = (performance.now() - startRef.current) / 1000;

      lenis.raf(time);

      const current = getArrivalState();
      const progress = current.scrollProgress ?? 0;
      const phase = getPhase({ elapsed, progress });
      const heroComplete = progress >= 0.995;
      const loaderDone = elapsed >= LOADER_END;

      if (heroComplete) {
        heroEverCompletedRef.current = true;
      }

      setArrivalFrameState({
        elapsed,
        phase,
        loaderDone,
        heroComplete,
        aboutUnlocked: heroComplete || heroEverCompletedRef.current,
      });

      const introVisible =
        loaderDone &&
        elapsed > LOADER_END + 0.2 &&
        progress < 0.08 &&
        !heroComplete;

      const nextUIState = {
        phase,
        loaderDone,
        introVisible,

        textVisible: loaderDone && progress > 0.08 && !heroComplete,
        ctaVisible: loaderDone && progress > 0.2 && !heroComplete,
        mouseEnabled: loaderDone && progress > 0.2 && !heroComplete,

        // 🔑 FIXED: Nav appears ONLY after 100% (heroComplete OR ever completed)
        navVisible: heroComplete || heroEverCompletedRef.current,

        routeVisible: progress > 0.55 && progress < 0.95 && !heroComplete,

        heroComplete,
        aboutUnlocked: heroComplete || heroEverCompletedRef.current,
      };

      const last = lastUIStateRef.current;
      const changed =
        last.phase !== nextUIState.phase ||
        last.loaderDone !== nextUIState.loaderDone ||
        last.introVisible !== nextUIState.introVisible ||
        last.textVisible !== nextUIState.textVisible ||
        last.ctaVisible !== nextUIState.ctaVisible ||
        last.mouseEnabled !== nextUIState.mouseEnabled ||
        last.navVisible !== nextUIState.navVisible ||
        last.routeVisible !== nextUIState.routeVisible ||
        last.heroComplete !== nextUIState.heroComplete ||
        last.aboutUnlocked !== nextUIState.aboutUnlocked;

      if (changed) {
        lastUIStateRef.current = nextUIState;
        setArrivalState(nextUIState);
      }

      if (heroComplete && !snappedRef.current) {
        snappedRef.current = true;

        setTimeout(() => {
          const about = document.getElementById("about");
          if (about && lenisRef.current) {
            lenisRef.current.scrollTo(about, {
              offset: 0,
              duration: 1.2,
            });
          }
        }, 200);
      }

      if (progress < 0.9) {
        snappedRef.current = false;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    const preventLoaderScroll = (event) => {
      const current = getArrivalState();
      if (!current.loaderDone) {
        event.preventDefault();
      }
    };

    window.addEventListener("wheel", preventLoaderScroll, { passive: false });
    window.addEventListener("touchmove", preventLoaderScroll, { passive: false });

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("wheel", preventLoaderScroll);
      window.removeEventListener("touchmove", preventLoaderScroll);
      lenis.destroy();
      html.classList.remove("shipflow-lenis");
      body.classList.remove("shipflow-lenis");
    };
  }, []);

  return null;
}
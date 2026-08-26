// arrivalStore.js
import { useState, useEffect } from "react";

const INTRO_KEY = "sandeb-marine-intro-seen";
const hasSeenIntro =
  typeof window !== "undefined" && sessionStorage.getItem(INTRO_KEY) === "1";

const initialState = {
  elapsed: 0,
  phase: hasSeenIntro ? "ready" : "loader",

  loaderDone: hasSeenIntro,
  introVisible: true, // 🔑 At the top of page: ONLY Brand Intro logo is visible

  scroll: 0,
  scrollLimit: 1,
  scrollProgress: 0,
  pageProgress: 0,

  heroComplete: false,
  aboutUnlocked: hasSeenIntro,

  // 🔑 Left and right sections start as FALSE (Hidden until scroll)
  textVisible: false,
  ctaVisible: false,
  mouseEnabled: hasSeenIntro,
  navVisible: false,
  routeVisible: false,

  sonarMode: false,
};

const state = { ...initialState };
const listeners = new Set();

function hasChanged(patch) {
  for (const key in patch) {
    if (state[key] !== patch[key]) return true;
  }
  return false;
}

export function getArrivalState() {
  return state;
}

export function setArrivalState(patch) {
  if (!hasChanged(patch)) return;
  Object.assign(state, patch);
  listeners.forEach((listener) => listener({ ...state }));
}

export function setArrivalFrameState(patch) {
  Object.assign(state, patch);
}

// 🔑 Resets cleanly to top-of-hero (Logo only, text & cards hidden)
export function resetArrivalState() {
  const wasLoaderDone = state.loaderDone;
  const wasAboutUnlocked = state.aboutUnlocked;

  Object.assign(state, initialState);

  if (wasLoaderDone) {
    state.loaderDone = true;
    state.phase = "ready";
    state.introVisible = true;  // Logo intro is visible
    state.textVisible = false;   // Left text hidden
    state.routeVisible = false;  // Right cards hidden
    state.ctaVisible = false;
    state.navVisible = false;
    state.heroComplete = false;
  }
  if (wasAboutUnlocked) {
    state.aboutUnlocked = true;
  }

  listeners.forEach((listener) => listener({ ...state }));
}

// 🔑 Clears transient overlays safely on unmount
export function resetTransientOverlay() {
  setArrivalState({
    introVisible: false,
    textVisible: false,
    routeVisible: false,
    ctaVisible: false,
  });
}

// 🔑 EXPORT: Sets the exact top-of-page state (scroll = 0)
export function prepareHeroState() {
  setArrivalState({
    heroComplete: false,
    introVisible: true,   // Show brand intro logo first
    textVisible: false,   // Left copy hidden until scroll
    routeVisible: false,  // Right product cards hidden until scroll
    ctaVisible: false,
  });
}

export function subscribeArrival(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useArrivalState() {
  const [snapshot, setSnapshot] = useState(() => ({ ...state }));

  useEffect(() => {
    return subscribeArrival(setSnapshot);
  }, []);

  return snapshot;
}
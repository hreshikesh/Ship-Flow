// arrivalStore.js
import { useState, useEffect } from "react";

const INTRO_KEY = "sandeb-marine-intro-seen";
const hasSeenIntro = typeof window !== "undefined" && sessionStorage.getItem(INTRO_KEY) === "1";

const initialState = {
  elapsed: 0,
  phase: hasSeenIntro ? "ready" : "loader",

  loaderDone: hasSeenIntro,
  introVisible: false,

  scroll: 0,
  scrollLimit: 1,
  scrollProgress: 0,
  pageProgress: 0,

  heroComplete: false,
  aboutUnlocked: hasSeenIntro,

  // 🔑 Default setup represents the start of the page (scroll = 0)
  textVisible: hasSeenIntro,    // Left side visible immediately
  ctaVisible: hasSeenIntro,     // Scroll hint visible immediately
  mouseEnabled: hasSeenIntro,
  navVisible: hasSeenIntro,
  routeVisible: false,          // Right side hidden (only reveals on scroll)

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

export function resetArrivalState() {
  const wasLoaderDone = state.loaderDone;
  const wasAboutUnlocked = state.aboutUnlocked;

  Object.assign(state, initialState);

  if (wasLoaderDone) {
    state.loaderDone = true;
    state.phase = "ready";
    state.textVisible = true;
    state.routeVisible = false; // Hidden initially at top
    state.ctaVisible = true;
    state.navVisible = true;
  }
  if (wasAboutUnlocked) {
    state.aboutUnlocked = true;
  }

  listeners.forEach((listener) => listener({ ...state }));
}

// Clears overlays safely on unmount
export function resetTransientOverlay() {
  setArrivalState({
    introVisible: false,
    textVisible: false,
    routeVisible: false,
    ctaVisible: false,
  });
}

// 🔑 Initializes the exact top-of-page stage (scroll = 0) before fade-in
export function prepareHeroState() {
  setArrivalState({
    heroComplete: false,
    textVisible: true,     // Left copy visible
    routeVisible: false,   // Right product cards hidden
    ctaVisible: true,      // Scroll down hint visible
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
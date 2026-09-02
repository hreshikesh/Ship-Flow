import { useState, useEffect } from "react";

const INTRO_KEY = "sandeb-marine-intro-seen";

function readSeen() {
  try {
    return typeof window !== "undefined" && sessionStorage.getItem(INTRO_KEY) === "1";
  } catch {
    return false;
  }
}

const seen = readSeen();

const initialState = {
  elapsed: 0,
  phase: "ready",
  loaderDone: true,
  introVisible: true,
  scroll: 0,
  scrollLimit: 1,
  scrollProgress: 0,
  pageProgress: 0,
  heroComplete: false,
  aboutUnlocked: seen,
  textVisible: false,
  ctaVisible: false,
  mouseEnabled: true,
  navVisible: false,
  routeVisible: false,
  sonarMode: false,
  userOverride: false,
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
  listeners.forEach((l) => l({ ...state }));
}

export function setArrivalFrameState(patch) {
  Object.assign(state, patch);
}

export function advanceFromIntro() {
  setArrivalState({
    userOverride: true,
    introVisible: false,
    textVisible: true,
    ctaVisible: true,
    routeVisible: true,
    navVisible: true,
    heroComplete: false,
    loaderDone: true,
    phase: "ready",
    mouseEnabled: true,
  });
}

export function skipHeroToContent() {
  try {
    sessionStorage.setItem(INTRO_KEY, "1");
  } catch {}
  setArrivalState({
    userOverride: true,
    introVisible: false,
    textVisible: true,
    ctaVisible: true,
    routeVisible: true,
    navVisible: true,
    heroComplete: true,
    loaderDone: true,
    aboutUnlocked: true,
    phase: "ready",
    mouseEnabled: true,
  });
}

export function resetArrivalState() {
  Object.assign(state, {
    ...initialState,
    loaderDone: true,
    phase: "ready",
    introVisible: true,
    textVisible: false,
    routeVisible: false,
    ctaVisible: false,
    navVisible: false,
    heroComplete: false,
    userOverride: false,
  });
  listeners.forEach((l) => l({ ...state }));
}

export function resetTransientOverlay() {}

export function prepareHeroState() {
  if (state.heroComplete || state.userOverride) return;
  setArrivalState({
    loaderDone: true,
    phase: "ready",
  });
}

export function subscribeArrival(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useArrivalState() {
  const [snapshot, setSnapshot] = useState(() => ({ ...state }));
  useEffect(() => subscribeArrival(setSnapshot), []);
  return snapshot;
}
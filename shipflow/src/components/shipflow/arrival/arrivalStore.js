import { useEffect, useState } from "react";

const initialState = {
  elapsed: 10,
  phase: "loader",

  loaderDone: false,
  introVisible: false,

  scroll: 0,
  scrollLimit: 1,
  scrollProgress: 0,
  pageProgress: 0,

  heroComplete: false,
  aboutUnlocked: false,

  textVisible: false,
  ctaVisible: false,
  mouseEnabled: false,
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

  listeners.forEach((listener) => {
    listener({ ...state });
  });
}

export function setArrivalFrameState(patch) {
  Object.assign(state, patch);
}

export function resetArrivalState() {
  Object.assign(state, initialState);

  listeners.forEach((listener) => {
    listener({ ...state });
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
// The engineering "boot sequence" for SHIPFLOW.
// Each system uses precise engineering vocabulary — no generic "Loading...".

export const SYSTEMS = [
  {
    id: "core",
    label: "Core Engine",
    verb: "Initializing",
    detail: "kernel.v4.2 · 64-thread scheduler",
    completeAt: 2200,
  },
  {
    id: "pipeline",
    label: "Rendering Pipeline",
    verb: "Compiling",
    detail: "shader graph · 218 nodes",
    completeAt: 2900,
  },
  {
    id: "ocean",
    label: "Ocean Simulation",
    verb: "Synchronizing",
    detail: "spectral solver · 1024²",
    completeAt: 3700,
  },
  {
    id: "lighting",
    label: "Environment Lighting",
    verb: "Calibrating",
    detail: "HDRI · 06:12 dawn",
    completeAt: 4400,
  },
  {
    id: "cfd",
    label: "CFD Streamlines",
    verb: "Analyzing",
    detail: "Reynolds 2.4·10⁷",
    completeAt: 5100,
  },
  {
    id: "vessel",
    label: "Vessel Model",
    verb: "Generating",
    detail: "hull mesh · 1.8M polys",
    completeAt: 5900,
  },
];

// Overall sequence timing (ms)
export const TIMINGS = {
  darkness: 900,       // Phase 1 — pure black
  awaken: 1000,        // Phase 2 — calibration line + "SHIPFLOW ENGINE"
  bootStart: 1900,     // Phase 3 — console appears
  freezeAt: 6100,      // brief freeze after 100%
  transitionAt: 6600,  // horizon expands, interface dissolves
  arrivalAt: 7600,     // ocean visible
  typographyAt: 8600,  // final headline reveal
  totalDuration: 11000,
};

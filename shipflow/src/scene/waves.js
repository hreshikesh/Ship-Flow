export const WAVES = [
  // dx, dz, wavelength, amplitude, speed, steepness
  [1.0, 0.0, 62, 0.28, 0.62, 0.28],
  [0.78, 0.45, 42, 0.2, 0.82, 0.24],
  [0.25, 1.0, 28, 0.14, 1.12, 0.2],
  [-0.45, 0.8, 17, 0.075, 1.55, 0.15],
  [0.7, -0.55, 9, 0.04, 2.15, 0.1],
  [0.15, 0.65, 5.8, 0.018, 2.9, 0.07],
];

export function sampleOceanHeight(x, z, time, amplitude = 1) {
  let height = 0;

  for (const [dxRaw, dzRaw, wavelength, amp, speed] of WAVES) {
    const len = Math.hypot(dxRaw, dzRaw) || 1;
    const dx = dxRaw / len;
    const dz = dzRaw / len;

    const k = (Math.PI * 2) / wavelength;
    const phase = k * (dx * x + dz * z) - time * speed;

    height += Math.sin(phase) * amp * amplitude;
  }

  return height;
}

export function sampleOceanNormal(x, z, time, amplitude = 1) {
  const e = 0.85;

  const hL = sampleOceanHeight(x - e, z, time, amplitude);
  const hR = sampleOceanHeight(x + e, z, time, amplitude);
  const hD = sampleOceanHeight(x, z - e, time, amplitude);
  const hU = sampleOceanHeight(x, z + e, time, amplitude);

  const dx = hR - hL;
  const dz = hU - hD;

  return {
    pitch: dz * 0.075,
    roll: -dx * 0.075,
  };
}
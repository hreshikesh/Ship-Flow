import { useEffect, useRef } from "react";

/**
 * Hidden detail: during initialization, tiny CFD streamlines flow across
 * the screen. As `morph` rises toward 1, they slow, deepen in blue,
 * and settle horizontally — becoming the ocean surface itself.
 *
 * Same particles. No cut. The engineering data literally becomes the world.
 */
export default function CFDStreamlines({ morph, visible }) {
  const canvasRef = useRef(null);
  const morphRef = useRef(morph);
  morphRef.current = morph;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let width = 0;
    let height = 0;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // Seed particles along horizontal streamlines
    const COUNT = 140;
    const particles = [];
    for (let i = 0; i < COUNT; i++) {
      const baseY = height * (0.15 + Math.random() * 0.7);
      particles.push({
        x: Math.random() * width,
        y: baseY,
        baseY,
        speed: 0.4 + Math.random() * 1.2,
        life: Math.random(),
      });
    }

    const draw = (t) => {
      const m = morphRef.current; // 0..1
      // Fade trails — deeper fade as morph settles into ocean
      ctx.fillStyle = `rgba(4, 7, 13, ${0.18 + m * 0.12})`;
      ctx.fillRect(0, 0, width, height);

      // Horizon target Y — where all streamlines settle
      const horizonY = height * 0.5;

      for (const p of particles) {
        // Curved flow field — sinusoidal turbulence
        const turbulence = Math.sin((p.x * 0.008) + t * 0.0006 + p.baseY * 0.01) * (18 * (1 - m));
        const targetY = p.baseY * (1 - m) + horizonY * m + turbulence;
        p.y += (targetY - p.y) * 0.06;
        p.x += p.speed * (1 - m * 0.6);
        if (p.x > width + 20) p.x = -20;

        // Color shifts from cyan (data) → deep ocean blue
        const cyanR = 127, cyanG = 216, cyanB = 229;
        const oceanR = 40, oceanG = 90, oceanB = 130;
        const r = Math.round(cyanR + (oceanR - cyanR) * m);
        const g = Math.round(cyanG + (oceanG - cyanG) * m);
        const b = Math.round(cyanB + (oceanB - cyanB) * m);

        const len = 24 + (1 - m) * 18;
        const alpha = 0.35 * (1 - m * 0.4);
        const grad = ctx.createLinearGradient(p.x - len, p.y, p.x, p.y);
        grad.addColorStop(0, `rgba(${r},${g},${b},0)`);
        grad.addColorStop(1, `rgba(${r},${g},${b},${alpha})`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(p.x - len, p.y);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full transition-opacity duration-[1400ms] ease-out"
      style={{ opacity: visible ? 1 : 0 }}
    />
  );
}

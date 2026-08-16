"use client";

import { useEffect, useRef } from "react";

const SPECTRUM_VARS = [
  "--color-spectrum-accent1",
  "--color-spectrum-accent2",
  "--color-spectrum-accent3",
  "--color-spectrum-accent4",
  "--color-spectrum-accent5",
  "--color-spectrum-accent6",
] as const;

type Mote = {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  color: [number, number, number];
  baseAlpha: number;
  phase: number;
};

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace("#", "");
  return [
    parseInt(clean.slice(0, 2), 16) || 0,
    parseInt(clean.slice(2, 4), 16) || 0,
    parseInt(clean.slice(4, 6), 16) || 0,
  ];
}

/**
 * Slow-drifting, bloom-only light motes rendered behind the hero
 * (design-system spec: "Optional device-tiered hero particle layer").
 * Continuous drift and opacity bloom only — motion never strobes or flashes,
 * by construction. Only ever mounted once `HeroParticlesGate` has already
 * confirmed the device qualifies; pauses drawing (via IntersectionObserver)
 * when the hero scrolls out of view, so it doesn't spend CPU off-screen.
 */
export function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const colors = SPECTRUM_VARS.map((name) => {
      const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
      return hexToRgb(value || "#7db8ff");
    });

    let width = 0;
    let height = 0;
    let motes: Mote[] = [];
    let frame = 0;
    let raf = 0;
    let running = true;

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas!.width = Math.max(1, Math.round(width * dpr));
      canvas!.height = Math.max(1, Math.round(height * dpr));
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function seed() {
      const count = 9;
      motes = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 50 + Math.random() * 60,
        vx: (Math.random() - 0.5) * 3,
        vy: (Math.random() - 0.5) * 3,
        color: colors[i % colors.length],
        baseAlpha: 0.018 + Math.random() * 0.02,
        phase: Math.random() * Math.PI * 2,
      }));
    }

    function tick() {
      frame += 1;
      if (running) {
        ctx!.clearRect(0, 0, width, height);
        for (const mote of motes) {
          mote.x += mote.vx / 60;
          mote.y += mote.vy / 60;
          if (mote.x < -mote.r) mote.x = width + mote.r;
          if (mote.x > width + mote.r) mote.x = -mote.r;
          if (mote.y < -mote.r) mote.y = height + mote.r;
          if (mote.y > height + mote.r) mote.y = -mote.r;

          // Slow (~8s period), continuous bloom — never a discrete on/off flash.
          const bloom = mote.baseAlpha * (0.7 + 0.3 * Math.sin(frame / 240 + mote.phase));
          const [r, g, b] = mote.color;
          const gradient = ctx!.createRadialGradient(mote.x, mote.y, 0, mote.x, mote.y, mote.r);
          gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${bloom})`);
          gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
          ctx!.fillStyle = gradient;
          ctx!.fillRect(mote.x - mote.r, mote.y - mote.r, mote.r * 2, mote.r * 2);
        }
      }
      raf = requestAnimationFrame(tick);
    }

    resize();
    seed();
    raf = requestAnimationFrame(tick);

    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    const observer = new IntersectionObserver(
      ([entry]) => {
        running = entry?.isIntersecting ?? true;
      },
      { threshold: 0 },
    );
    observer.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{ filter: "blur(2px)" }}
    />
  );
}

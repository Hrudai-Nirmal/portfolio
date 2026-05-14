"use client";

import { useEffect, useRef } from "react";

type LightRaysBackgroundProps = {
  enabled: boolean;
  raysSpeed?: number;
  mouseInfluence?: number;
};

export default function LightRaysBackground({
  enabled,
  raysSpeed = 0.2,
  mouseInfluence = 0,
}: LightRaysBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId = 0;
    let mouseX = 0;
    let mouseY = 0;
    let t = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const draw = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      const originX = w / 2 + (mouseX - w / 2) * mouseInfluence;
      const originY = h + (mouseY - h / 2) * mouseInfluence * 0.25;

      const rayCount = 18;
      for (let i = 0; i < rayCount; i += 1) {
        const phase = t * raysSpeed + i * 0.42;
        const width = 40 + (i % 5) * 14;
        const x =
          originX + Math.sin(phase * 0.8 + i * 0.17) * (w * 0.45) + (i - rayCount / 2) * 8;
        const topY = -80;

        const gradient = ctx.createLinearGradient(x, originY, x, topY);
        gradient.addColorStop(0, "rgba(223, 208, 184, 0.0)");
        gradient.addColorStop(0.25, "rgba(223, 208, 184, 0.08)");
        gradient.addColorStop(0.6, "rgba(148, 137, 121, 0.14)");
        gradient.addColorStop(1, "rgba(223, 208, 184, 0.0)");

        ctx.beginPath();
        ctx.moveTo(x, originY);
        ctx.lineTo(x - width, topY);
        ctx.lineTo(x + width, topY);
        ctx.closePath();
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      t += 0.01;
      rafId = window.requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.cancelAnimationFrame(rafId);
    };
  }, [enabled, raysSpeed, mouseInfluence]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`fixed inset-0 pointer-events-none transition-opacity duration-300 ${
        enabled ? "opacity-100" : "opacity-0"
      }`}
      style={{ zIndex: 0 }}
    />
  );
}


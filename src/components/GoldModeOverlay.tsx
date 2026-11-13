import React, { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../engine';

/** Lightweight ambient gold dust particle layer active only during Fun Mode. */
export const GoldModeOverlay: React.FC<{ active: boolean }> = ({ active }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active || prefersReducedMotion()) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId = 0;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const particles = Array.from({ length: 28 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: 2 + Math.random() * 4,
      vy: 0.7 + Math.random() * 1.4,
      vx: (Math.random() - 0.5) * 0.6,
    }));

    const loop = () => {
      if (document.hidden) {
        rafId = requestAnimationFrame(loop);
        return;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.y += p.vy;
        p.x += p.vx;
        if (p.y > canvas.height) p.y = -8;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        ctx.fillStyle = '#FFAE00';
        ctx.strokeStyle = '#0A0A0A';
        ctx.lineWidth = 1;
        ctx.fillRect(p.x, p.y, p.size, p.size);
        ctx.strokeRect(p.x, p.y, p.size, p.size);
      }
      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener('resize', resize);
    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, [active]);

  if (!active || prefersReducedMotion()) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-40"
    />
  );
};


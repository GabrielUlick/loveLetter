"use client";

import React, { useEffect, useMemo, useRef, memo, useState } from "react";

type Decor = "none" | "hearts" | "petals" | "hearts+petals";
interface GalaxyBackgroundProps {
  variant?: "dark" | "light";
  decor?: Decor;
}

type Star = { x: number; y: number; r: number; a: number; tw: number; driftX: number; driftY: number };
type Heart = { key: string; left: string; delay: string; dur: string; size: string; amp: string };
type Petal = { key: string; left: string; delay: string; dur: string; rot: string; size: string; sway: string; tilt: string };

const GalaxyBackground = ({ variant = "dark", decor = "none" }: GalaxyBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => { 
    setMounted(true); 
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrame = 0;
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    const stars: Star[] = [];

    const maxStars = 900;
    const spawnPerSecond = 80;
    let lastSpawn = performance.now();

    const resize = () => {
      const { innerWidth: w, innerHeight: h } = window;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
    };
    resize();
    window.addEventListener("resize", resize);

    const rand = (min: number, max: number) => Math.random() * (max - min) + min;
    const spawnStar = () => {
      stars.push({
        x: rand(0, canvas.width),
        y: rand(0, canvas.height),
        r: rand(0.3, 1.8) * dpr,
        a: rand(0.3, 1.0),
        tw: rand(0.001, 0.006),
        driftX: rand(-0.03, 0.03) * dpr,
        driftY: rand(-0.03, 0.03) * dpr,
      });
    };

    for (let i = 0; i < Math.min(maxStars, 500); i++) spawnStar();

    function clamp(v: number, min: number, max: number) {
      if (v < min) return min;
      if (v > max) return max;
      return v;
    }
    function wrapX(x: number, w: number) { 
      if (x < 0) return x + w;
      if (x > w) return x - w;
      return x;
    }
    
    function wrapY(y: number, h: number) { 
      if (y < 0) return y + h;
      if (y > h) return y - h;
      return y;
    }

    const updateStar = (s: Star, w: number, h: number) => {
      s.a = clamp(s.a + s.tw * (Math.random() > 0.5 ? 1 : -1), 0.25, 1);
      s.x = wrapX(s.x + s.driftX, w);
      s.y = wrapY(s.y + s.driftY, h);
    };

    const drawStar = (s: Star) => {
      const grad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 2.2);
      grad.addColorStop(0, "rgba(255,255,255,0.95)");
      grad.addColorStop(0.5, "rgba(255,122,182,0.25)");
      grad.addColorStop(1, "rgba(255,255,255,0)");
      ctx.globalAlpha = s.a;
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r * 2, 0, Math.PI * 2);
      ctx.fill();
    };

    const draw = (now: number) => {
      animationFrame = requestAnimationFrame(draw);

      const elapsed = now - lastSpawn;
      const toSpawn = Math.min(100, Math.floor((elapsed / 1000) * spawnPerSecond));
      for (let i = 0; i < toSpawn && stars.length < maxStars; i++) spawnStar();
      if (toSpawn > 0) lastSpawn = now;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const s of stars) {
        updateStar(s, canvas.width, canvas.height);
        drawStar(s);
      }
      ctx.globalAlpha = 1;
    };

    animationFrame = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(animationFrame); window.removeEventListener("resize", resize); };
  }, []);

  const hearts = useMemo(() => {
    if (!mounted || !decor.includes("hearts")) return [] as Heart[];
    const count = 16;
    return Array.from({ length: count }, (_, i) => ({
      key: `h-${i}`,
      left: `${Math.round(Math.random() * 100)}%`,
      delay: `${(Math.random() * 6).toFixed(2)}s`,
      dur: `${(7 + Math.random() * 6).toFixed(2)}s`,
      size: `${12 + Math.round(Math.random() * 10)}px`,
      amp: `${Math.round(10 + Math.random() * 18)}px`,
    }));
  }, [decor, mounted]);

  const petals = useMemo(() => {
    if (!mounted || !decor.includes("petals")) return [] as Petal[];
    const count = 14;
    return Array.from({ length: count }, (_, i) => ({
      key: `p-${i}`,
      left: `${Math.round(Math.random() * 100)}%`,
      delay: `${(Math.random() * 5).toFixed(2)}s`,
      dur: `${(10 + Math.random() * 8).toFixed(2)}s`,
      rot: `${Math.round(Math.random() * 360)}deg`,
      size: `${14 + Math.round(Math.random() * 12)}px`,
      sway: `${Math.round(16 + Math.random() * 26)}px`,
      tilt: `${Math.round(10 + Math.random() * 16)}deg`,
    }));
  }, [decor, mounted]);

  return (
    <div className={`galaxy-background ${variant === "light" ? "light" : ""}`} aria-hidden>
      <div className={`nebula-layer ${variant === "light" ? "light" : ""}`} />

      <div className="stars-1" />
      <div className="stars-2" />
      <div className="stars-3" />
      <div className="stars-4" />
      <div className="stars-5" />

      <canvas ref={canvasRef} className="stars-canvas" />

      {hearts.length > 0 && (
        <div className="romance-hearts" aria-hidden>
          {hearts.map(({ key, left, delay, dur, size, amp }) => (
            <span 
              key={key} 
              className="r-heart" 
              style={{ 
                left,
                ['--delay' as string]: delay,
                ['--dur' as string]: dur,
                ['--amp' as string]: amp,
                ['--s' as string]: size
              }} 
            />
          ))}
        </div>
      )}

      {petals.length > 0 && (
        <div className="romance-petals" aria-hidden>
          {petals.map(({ key, left, delay, dur, rot, size, sway, tilt }) => (
            <span 
              key={key} 
              className="petal" 
              style={{ 
                left,
                width: size,
                height: `calc(${size} * 1.4)`,
                ['--delay' as string]: delay,
                ['--dur' as string]: dur,
                ['--rot' as string]: rot,
                ['--sway' as string]: sway,
                ['--tilt' as string]: tilt
              }} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default memo(GalaxyBackground);



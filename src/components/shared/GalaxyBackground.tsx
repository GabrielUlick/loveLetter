"use client";

import { useEffect, useRef } from "react";

const GalaxyBackground = () => {
		const canvasRef = useRef<HTMLCanvasElement | null>(null);
			// Meteors removed per request

		useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d", { alpha: true });
		if (!ctx) return;

		let animationFrame = 0;
		const dpr = Math.max(1, window.devicePixelRatio || 1);
		const stars: {
			x: number; y: number; r: number; a: number; 
			tw: number; driftX: number; driftY: number;
		}[] = [];

		const maxStars = 900; // denser field for desktop
		const spawnPerSecond = 80; // more random spawns
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

			const updateStar = (s: typeof stars[number], w: number, h: number) => {
				s.a = clamp(s.a + s.tw * (Math.random() > 0.5 ? 1 : -1), 0.25, 1);
				s.x = wrapX(s.x + s.driftX, w);
				s.y = wrapY(s.y + s.driftY, h);
			};

			const drawStar = (s: typeof stars[number]) => {
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

			// Spawn extra stars over time
			const elapsed = now - lastSpawn;
			const toSpawn = Math.min(100, Math.floor((elapsed / 1000) * spawnPerSecond));
			for (let i = 0; i < toSpawn && stars.length < maxStars; i++) spawnStar();
			if (toSpawn > 0) lastSpawn = now;

			// Clear with slight alpha to create trailing glow
			ctx.clearRect(0, 0, canvas.width, canvas.height);

				// Update and draw stars
				for (const s of stars) {
					updateStar(s, canvas.width, canvas.height);
					drawStar(s);
				}
			ctx.globalAlpha = 1;
		};

		animationFrame = requestAnimationFrame(draw);
		return () => {
			cancelAnimationFrame(animationFrame);
			window.removeEventListener("resize", resize);
		};
	}, []);

	return (
		<div className="galaxy-background" aria-hidden>
			{/* Soft drifting nebula clouds */}
			<div className="nebula-layer" />

			{/* Twinkling parallax starfields */}
			<div className="stars-1" />
			<div className="stars-2" />
			<div className="stars-3" />
			<div className="stars-4" />
			<div className="stars-5" />

			{/* Canvas-based random sparkle stars for extra density */}
			<canvas ref={canvasRef} className="stars-canvas" />

					{/* Meteors intentionally removed */}
		</div>
	);
};

export default GalaxyBackground;


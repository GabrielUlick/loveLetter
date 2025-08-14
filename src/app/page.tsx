"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import GalaxyBackground from "@/components/shared/GalaxyBackground";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleOpen = () => setIsOpen(true);

  const [isFading, setIsFading] = useState(false);
  const envelopeRef = useRef<HTMLDivElement | null>(null);
  const letterRef = useRef<HTMLDivElement | null>(null);
  const [heartSeeds, setHeartSeeds] = useState<Array<{ id: string; left: number; top: number; delay: number; dur: number; w: number; h: number }>>([]);

  useEffect(() => {
    if (!isOpen) return;

    // Generate heart seeds within the letter area
    const env = envelopeRef.current;
    const letEl = letterRef.current;
    if (!env || !letEl) return;
    const envRect = env.getBoundingClientRect();
    const letterRect = letEl.getBoundingClientRect();

    const seeds: Array<{ id: string; left: number; top: number; delay: number; dur: number; w: number; h: number }> = [];
    const count = 12;
    let guard = 0;
    while (seeds.length < count && guard < 200) {
      guard++;
      // spread across most of the letter width (randomized positions inside)
      const rx = letterRect.left + letterRect.width * (0.1 + Math.random() * 0.8);
      // spawn from the lower area of the letter (inside the envelope)
      const ry = letterRect.top + letterRect.height * (0.62 + Math.random() * 0.22);
      const left = rx - envRect.left; // relative to envelope
      const top = ry - envRect.top;   // relative to envelope
      // ensure minimum spacing so they don't overlap too much
      const minDx = 26; // px
      if (seeds.some(s => Math.abs(s.left - left) < minDx)) continue;
      const delay = Math.random() * 0.8; // seconds (staggered)
      const dur = 5.5 + Math.random() * 2.0; // seconds (slower)
      const size = 20 + Math.round(Math.random() * 14);
      seeds.push({ id: crypto.randomUUID(), left, top, delay, dur, w: size, h: Math.round(size * 1.6) });
    }
    setHeartSeeds(seeds);

    // schedule fade and redirect based on longest heart life
    const maxEndSec = seeds.reduce((m, s) => Math.max(m, s.delay + s.dur), 0);
    const fadeLeadMs = 1000; // fade-out duration ~1s
    const fadeAtMs = Math.max(0, (maxEndSec * 1000) - fadeLeadMs);

    const tFade = setTimeout(() => setIsFading(true), fadeAtMs);
    const tPush = setTimeout(() => router.push("/carta"), Math.ceil(maxEndSec * 1000));
    return () => {
      clearTimeout(tFade);
      clearTimeout(tPush);
    };
  }, [isOpen, router]);

  return (
    <main className="min-h-screen p-8 relative overflow-hidden text-pink-100">
      <GalaxyBackground />
      <div className="h-[380px]">
        <button
          onClick={handleOpen}
          aria-label="Envelope interativo"
          className="block w-full mx-auto bg-transparent p-0 border-0 outline-none focus:outline-none"
          style={{ WebkitTapHighlightColor: 'transparent' }}
        >
          <div
          id="envelope"
          ref={envelopeRef}
          className={`relative w-[280px] h-[180px] mx-auto top-[150px] bg-pink-900/70 rounded-b-[6px] shadow-lg cursor-pointer backdrop-blur-sm ${
            isOpen ? "envelope-open" : "envelope-close"
          }`}
        >
          <div className="front flap absolute w-0 h-0 z-10">
            <div
              className={`
              border-l-[140px] border-r-[140px] border-solid
              border-l-transparent border-r-transparent
              border-b-[82px] border-t-[98px]
              border-b-transparent border-t-pink-900
              origin-top ${isOpen ? "envelope-flap-open" : "envelope-flap-close"}
            `}
            ></div>
          </div>
          <div className="front pocket absolute w-0 h-0 z-30">
            <div className="border-l-[140px] border-r-[140px] border-solid border-l-pink-700 border-r-pink-700 border-b-[90px] border-t-[90px] border-b-pink-800 border-t-transparent rounded-b-[6px]"></div>
          </div>
          <div
            className={`
            letter relative bg-white w-[90%] mx-auto h-[90%] top-[5%] 
            rounded-[6px] shadow-md z-20 
            ${isOpen ? "envelope-letter-open" : "envelope-letter-close"}
            ${isFading ? 'fade-out-letter' : ''}
          `}
          ref={letterRef}
          >
            <div className="words line1 absolute left-[10%] w-[20%] h-[7%] bg-gray-100 top-[15%]"></div>
            <div className="words line2 absolute left-[10%] w-[80%] h-[14%] bg-gray-100 top-[30%]"></div>
            <div className="words line3 absolute left-[10%] w-[80%] h-[14%] bg-gray-100 top-[50%]"></div>
            <div className="words line4 absolute left-[10%] w-[80%] h-[14%] bg-gray-100 top-[70%]"></div>
          </div>
          <div className="hearts absolute inset-0 pointer-events-none" style={{ zIndex: 25 }}>
            <div
              className={`heart a1 absolute top-2 right-[10%] ${
                isOpen ? "animate-heart1" : "opacity-0"
              }`}
            ></div>
            <div
              className={`heart a2 absolute top-2 right-[10%] ${
                isOpen ? "animate-heart2" : "opacity-0"
              }`}
            ></div>
            <div
              className={`heart a3 absolute top-2 right-[10%] ${
                isOpen ? "animate-heart3" : "opacity-0"
              }`}
            ></div>

            {/* Extra burst of small hearts rising from letter */}
            {isOpen && heartSeeds.length > 0 && (
              <div className="absolute inset-0">
                {heartSeeds.map((h) => {
                  type HeartVars = React.CSSProperties & { ['--delay']?: string; ['--dur']?: string };
                  const styleVars: HeartVars = {
                    left: `${h.left}px`,
                    top: `${h.top}px`,
                    width: `${h.w}px`,
                    height: `${h.h}px`,
                    '--delay': `${h.delay}s`,
                    '--dur': `${h.dur}s`,
                  };
                  return <span key={h.id} className="heart-fx animate absolute" style={styleVars} />;
                })}
              </div>
            )}
          </div>
          </div>
        </button>
      </div>
      <div className="text-center">
        <button
          onClick={handleOpen}
          className="font-extrabold transition-all duration-200 bg-transparent border-2 border-pink-400 rounded-md 
                   text-pink-300 text-sm uppercase m-[5px] p-[10px] min-w-[120px] cursor-pointer
                   hover:bg-pink-400 hover:text-black backdrop-blur-sm shadow-[0_0_20px_rgba(255,122,182,0.3)]"
        >
          Abrir Carta
        </button>
      </div>
    </main>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import GalaxyBackground from "@/components/shared/GalaxyBackground";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleOpen = () => setIsOpen(true);

  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const t1 = setTimeout(() => {
      // after hearts animation, start fade sequence
      setTimeout(() => setIsFading(true), 2000);
      setTimeout(() => router.push("/carta"), 3000);
    }, 4000);
    return () => clearTimeout(t1);
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
          >
            <div className="words line1 absolute left-[10%] w-[20%] h-[7%] bg-gray-100 top-[15%]"></div>
            <div className="words line2 absolute left-[10%] w-[80%] h-[14%] bg-gray-100 top-[30%]"></div>
            <div className="words line3 absolute left-[10%] w-[80%] h-[14%] bg-gray-100 top-[50%]"></div>
            <div className="words line4 absolute left-[10%] w-[80%] h-[14%] bg-gray-100 top-[70%]"></div>
          </div>
          <div className="hearts absolute top-[90px] left-0 right-0 z-20">
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

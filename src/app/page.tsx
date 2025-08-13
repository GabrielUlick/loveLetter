"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const router = useRouter();

  const handleOpen = () => setIsOpen(true);

  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Espera a carta subir do envelope
      const timer = setTimeout(() => {
        // Inicia a transição da carta
        setIsTransitioning(true);
        
        // Inicia o fade out após a carta crescer
        setTimeout(() => {
          setIsFading(true);
          // Redireciona após o fade out
          setTimeout(() => {
            router.push("/carta");
          }, 1000); // Tempo do fade out
        }, 2000); // Tempo da carta crescer
      }, 4000); // Tempo para os corações subirem

      return () => clearTimeout(timer);
    }
  }, [isOpen, router]);

  return (
    <main className="min-h-screen p-8 relative overflow-hidden">
      <div className="galaxy-background">
        <div className="stars-1"></div>
        <div className="stars-2"></div>
        <div className="stars-3"></div>
      </div>
      <div className="h-[380px]">
        <div
          id="envelope"
          onClick={handleOpen}
          onKeyDown={(e) => e.key === "Enter" && handleOpen()}
          role="button"
          tabIndex={0}
          aria-label="Envelope interativo"
          className={`relative w-[280px] h-[180px] mx-auto top-[150px] bg-emerald-900/90 rounded-b-[6px] shadow-lg cursor-pointer backdrop-blur-sm ${
            isOpen ? "envelope-open" : "envelope-close"
          } ${isFading ? 'envelope-fade-out' : ''}`}
        >
          <div className="front flap absolute w-0 h-0 z-10">
            <div
              className={`
              border-l-[140px] border-r-[140px] border-solid
              border-l-transparent border-r-transparent
              border-b-[82px] border-t-[98px]
              border-b-transparent border-t-emerald-900
              origin-top ${isOpen ? "envelope-flap-open" : "envelope-flap-close"}
            `}
            ></div>
          </div>
          <div className="front pocket absolute w-0 h-0 z-30">
            <div className="border-l-[140px] border-r-[140px] border-solid border-l-emerald-700 border-r-emerald-700 border-b-[90px] border-t-[90px] border-b-emerald-800 border-t-transparent rounded-b-[6px]"></div>
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
      </div>
      <div className="text-center">
        <button
          onClick={handleOpen}
          className="font-extrabold transition-all duration-100 bg-transparent border-2 border-emerald-400 rounded-md 
                   text-emerald-400 text-sm uppercase m-[5px] p-[10px] min-w-[120px] cursor-pointer
                   hover:bg-emerald-400 hover:text-black backdrop-blur-sm"
        >
          Abrir Carta
        </button>
      </div>
    </main>
  );
}

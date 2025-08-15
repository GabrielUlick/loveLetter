"use client";

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import GalaxyBackground from '@/components/shared/GalaxyBackground';
import CartaDecor from '@/components/decor/CartaDecor';

// Hoist texto outside the component to keep it stable and avoid hook dependency warnings
const textoConst = [
  "Querida,",
  "Lorem",
  "ipsum",
  "dolor",
  "sit",
  "amet,",
  "consectetur",
  "adipiscing",
  "elit.",
  "Sed",
  "do",
  "eiusmod",
  "tempor",
  "incididunt",
  "ut",
  "labore",
  "et",
  "dolore",
  "magna",
  "aliqua.",
  "Ut",
  "enim",
  "ad",
  "minim",
  "veniam,",
  "quis",
  "nostrud",
  "exercitation",
  "ullamco",
  "laboris",
  "nisi",
  "ut",
  "aliquip",
  "ex",
  "ea",
  "commodo",
  "consequat.",
  "Com amor,",
  "Seu nome"
];

const Carta = () => {
  const [visibleWords, setVisibleWords] = useState<number[]>([]);
  const [showButton, setShowButton] = useState(false);
  const router = useRouter();
  
  const words = useMemo(() => textoConst.map((w, i) => ({ id: `w-${i}-${w}`, word: w })), []);

  // Switch to single-pass setup using CSS animation delays per word.
  useEffect(() => {
    // Reveal all at once with per-word CSS delays to avoid frequent re-renders
    setVisibleWords(textoConst.map((_, i) => i));
    const totalMs = textoConst.reduce((acc, w, i) => acc + (w.length * 50 + 100), 0) + 800;
    const t = setTimeout(() => setShowButton(true), totalMs);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen text-pink-100 p-8">
      <GalaxyBackground variant="light" decor="hearts+petals" />
  <CartaDecor />
      <div className="max-w-2xl mx-auto mt-16 relative z-10 fade-in-up">
        <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg shadow-xl aero-gloss">
          <div className="space-y-6 text-center">
            {words.map(({ id, word }, index) => {
              const isTitle = index === 0;
              const isSignature = index >= textoConst.length - 2;
              let fontSize = '1.1rem';
              if (isTitle) {
                fontSize = '2rem';
              } else if (isSignature) {
                fontSize = '1.25rem';
              }
              const fontWeight: 'bold' | 'normal' = isTitle || isSignature ? 'bold' : 'normal';
              const display: 'block' | 'inline' = isTitle || isSignature ? 'block' : 'inline';
              const delayMs = textoConst.slice(0, index).reduce((acc, w) => acc + (w.length * 50 + 100), 0);
              const styleVars: React.CSSProperties & { ['--type-delay']?: string; ['--type-dur']?: string } = {
                ['--type-delay']: `${500 + delayMs}ms`,
                ['--type-dur']: `${Math.max(100, word.length * 50)}ms`,
                fontSize, fontWeight, display,
              } as any;
              return (
                <span key={id} className="inline-block">
                <span 
                  className={`typing-text ${visibleWords.includes(index) ? 'visible' : ''}`}
                  style={styleVars}
                >
                  {word}
                </span>
                {/* Adiciona espaço após cada palavra, exceto em quebras de linha */}
                {index !== 0 && index < textoConst.length - 2 && (
                  <span className="mr-2">{" "}</span>
                )}
                {/* Adiciona quebras de linha após o título e antes da assinatura */}
                {(index === 0 || index === textoConst.length - 3) && (
                  <div className="my-8" />
                )}
                </span>
              );
            })}
          </div>
        </div>
        
    {showButton && (
          <div className="text-center mt-12 animate-fade-in">
            <button
              onClick={() => router.push('/cronometros')}
      className="font-extrabold transition-all duration-300 bg-transparent border-2 
           border-pink-300/80 rounded-md text-pink-200 text-lg uppercase 
           px-8 py-4 cursor-pointer hover:bg-pink-200 hover:text-black 
           backdrop-blur-sm shadow-lg transform hover:scale-105"
            >
              Nossa História em Números
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Carta;
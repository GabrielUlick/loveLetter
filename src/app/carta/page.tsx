"use client";

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import GalaxyBackground from '@/components/shared/GalaxyBackground';

const Carta = () => {
  const [visibleWords, setVisibleWords] = useState<number[]>([]);
  const [showButton, setShowButton] = useState(false);
  const router = useRouter();
  
  const texto = [
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

  const words = useMemo(() => texto.map((w, i) => ({ id: `w-${i}-${w}`, word: w })), []);

  useEffect(() => {
    const revealNextWord = (index: number) => {
      if (index < texto.length) {
        setVisibleWords(prev => [...prev, index]);
        const delay = texto[index].length * 50 + 100; // Ajuste o delay baseado no tamanho da palavra
        setTimeout(() => revealNextWord(index + 1), delay);
      }
    };

    // Começa a revelação das palavras após um pequeno delay inicial
    setTimeout(() => revealNextWord(0), 500);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#330021] to-black text-pink-100 p-8">
      <GalaxyBackground />
      <div className="max-w-2xl mx-auto mt-16 relative z-10 fade-in-up">
        <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg shadow-xl aero-gloss">
          <div className="space-y-6 text-center">
            {words.map(({ id, word }, index) => {
              const isTitle = index === 0;
              const isSignature = index >= texto.length - 2;
              let fontSize = '1.1rem';
              if (isTitle) {
                fontSize = '2rem';
              } else if (isSignature) {
                fontSize = '1.25rem';
              }
              const fontWeight: 'bold' | 'normal' = isTitle || isSignature ? 'bold' : 'normal';
              const display: 'block' | 'inline' = isTitle || isSignature ? 'block' : 'inline';
              return (
                <span key={id} className="inline-block">
                <span 
                  className={`typing-text ${visibleWords.includes(index) ? 'visible' : ''}`}
                  style={{ fontSize, fontWeight, display }}
                  onAnimationEnd={() => {
                    if (index === texto.length - 1) {
                      setTimeout(() => setShowButton(true), 1000);
                    }
                  }}
                >
                  {word}
                </span>
                {/* Adiciona espaço após cada palavra, exceto em quebras de linha */}
                {index !== 0 && index < texto.length - 2 && (
                  <span className="mr-2">{" "}</span>
                )}
                {/* Adiciona quebras de linha após o título e antes da assinatura */}
                {(index === 0 || index === texto.length - 3) && (
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
           border-pink-400 rounded-md text-pink-300 text-lg uppercase 
           px-8 py-4 cursor-pointer hover:bg-pink-400 hover:text-black 
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
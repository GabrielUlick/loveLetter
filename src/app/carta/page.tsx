"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

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
    <div className="min-h-screen bg-gradient-to-b from-emerald-900 to-black text-emerald-100 p-8">
      <div className="galaxy-background">
        <div className="stars-1"></div>
        <div className="stars-2"></div>
        <div className="stars-3"></div>
      </div>
      <div className="max-w-2xl mx-auto mt-16 relative z-10 fade-in-up">
        <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg shadow-xl">
          <div className="space-y-6 text-center">
            {texto.map((word, index) => (
              <span key={`word-${index}`} className="inline-block">
                <span 
                  className={`typing-text ${visibleWords.includes(index) ? 'visible' : ''}`}
                  style={{
                    fontSize: index === 0 ? '2rem' : // Título
                            index >= texto.length - 2 ? '1.25rem' : // Assinatura
                            '1.1rem', // Texto normal
                    fontWeight: index === 0 || index >= texto.length - 2 ? 'bold' : 'normal',
                    display: index === 0 || index >= texto.length - 2 ? 'block' : 'inline'
                  }}
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
            ))}
          </div>
        </div>
        
        {showButton && (
          <div className="text-center mt-12 animate-fade-in">
            <button
              onClick={() => router.push('/cronometros')}
              className="font-extrabold transition-all duration-300 bg-transparent border-2 
                       border-emerald-400 rounded-md text-emerald-400 text-lg uppercase 
                       px-8 py-4 cursor-pointer hover:bg-emerald-400 hover:text-black 
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
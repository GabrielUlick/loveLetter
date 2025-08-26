"use client";

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import GalaxyBackground from '@/components/shared/GalaxyBackground';
import CartaDecor from '@/components/decor/CartaDecor';

// Novo texto romântico, dividido em blocos para animação e formatação
const textoConst = [
  // Título
  "Para o amor da minha vida ❤️",
  // Parágrafo 1
  "Desde o primeiro momento em que te conheci, senti que havia algo diferente em você.",
  "Seu jeito, sua energia, seu sorriso… tudo em você me encantou e me fez querer estar cada vez mais perto.",
  "Hoje eu tenho a certeza de que foi a melhor escolha da minha vida: você.",
  // Parágrafo 2
  "Você é minha felicidade, minha paz, meu porto seguro.",
  "É nos seus braços que encontro descanso, é no seu olhar que encontro meu lar.",
  "Eu nunca tinha vivido algo tão intenso e verdadeiro… e agora sei o que realmente significa ser feliz: é ver você sorrindo, é ver você realizada, é ver você bem.",
  // Parágrafo 3
  "Meu amor, eu te amo de uma forma que nem as palavras conseguem explicar.",
  "Quero muitos e muitos anos ao seu lado, quero realizar todos os nossos sonhos: nossa casinha, nossas motinhas, nossos filhos… tudo aquilo que já imaginamos juntos.",
  "Eu te prometo: tudo isso vai se concretizar, porque meu coração já pertence a você para sempre.",
  // Parágrafo 4
  "Você é simplesmente maravilhosa, a melhor parte da minha vida.",
  "Hoje, completando nosso primeiro ano de namoro, quero que sinta o quanto cada segundo valeu a pena, o quanto tudo faz sentido quando estou ao seu lado.",
  "Você é o amor da minha vida, a pessoa que nasceu para mim, assim como eu nasci para você.",
  // Assinatura
  "Feliz 1 ano de namoro, meu amor! ❤️ Eu te amo mais do que tudo nesse mundo — e mal posso esperar por todos os anos que ainda vamos viver juntinhos."
];

const Carta = () => {
  const [visibleWords, setVisibleWords] = useState<number[]>([]);
  const [showButton, setShowButton] = useState(false);
  const router = useRouter();
  
  const words = useMemo(() => textoConst.map((w, i) => ({ id: `w-${i}-${w}`, word: w })), []);

  // Calculate typing animation delays outside component
  const calculateAnimationDelays = (words: string[]): number[] => {
    const charMs = 26; // ms per character
    const gapMs = 120; // short gap between words
    const baseDelay = 300; // initial delay before starting
    
    return words.reduce<number[]>((acc, word) => {
      const prev = acc[acc.length - 1] || baseDelay;
      const dur = Math.max(60, word.length * charMs);
      acc.push(prev + dur + gapMs);
      return acc;
    }, [baseDelay]);
  };

  // Reveal words one-by-one to simulate writing
  useEffect(() => {
    const timeouts: number[] = [];
    const delays = calculateAnimationDelays(textoConst);

    // Add word to visible list
    const showWord = (index: number) => {
      setVisibleWords(prev => [...prev, index]);
    };

    // Schedule all animations
    delays.forEach((delay, index) => {
      timeouts.push(window.setTimeout(() => showWord(index), delay));
    });

    // Show button after all words
    const finalDelay = delays[delays.length - 1] + 180;
    timeouts.push(window.setTimeout(() => setShowButton(true), finalDelay));

    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <div className="min-h-screen text-pink-100 p-8">
      <GalaxyBackground variant="light" decor="hearts+petals" />
  <CartaDecor />
  <div className="max-w-4xl mx-auto mt-16 relative z-10 fade-in-up">
        <div className="carta-paper aero-gloss mx-auto">
          <div className="space-y-4">
            {words.map(({ id, word }, index) => {
              const isTitle = index === 0;
              const isSignature = index === textoConst.length - 1;
              // Parágrafos: cada bloco de 3 linhas (exceto título e assinatura)
              const isParagraph = !isTitle && !isSignature;
              let fontSize = '1.1rem';
              if (isTitle) fontSize = '2rem';
              if (isSignature) fontSize = '1.25rem';
              const fontWeight: 'bold' | 'normal' = isTitle || isSignature ? 'bold' : 'normal';
              const display: 'block' | 'inline' = 'block';
              // Animation: speed up typing (was 50ms/char + 100ms, now 28ms/char + 60ms)
              const delayMs = textoConst.slice(0, index).reduce((acc, w) => acc + (w.length * 28 + 60), 0);
              const styleVars: React.CSSProperties & { 
                ['--type-delay']: string;
                ['--type-dur']: string;
              } = {
                ['--type-delay']: `${350 + delayMs}ms`,
                ['--type-dur']: `${Math.max(80, word.length * 28)}ms`,
                fontSize, 
                fontWeight, 
                display,
              };
              const getTextClass = () => {
                if (isTitle) return 'carta-title';
                if (isSignature) return 'carta-signature';
                return 'carta-paragraph';
              };
              
              return (
                <span key={id} className={isTitle ? "block text-center" : "block text-justify"}>
                    <span 
                      className={`typing-text ${visibleWords.includes(index) ? 'visible' : ''} ${getTextClass()}`}
                      style={styleVars}
                    >
                      {word}
                    </span>
                  {/* Espaço entre título, parágrafos e assinatura */}
                  {isTitle && <div className="my-6" />}
                  {/* Espaço entre parágrafos (cada 3 linhas) */}
                  {isParagraph && ((index - 1) % 3 === 2) && (
                    <>
                      <div className="heart-divider" aria-hidden>
                        <svg viewBox="0 0 100 90" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                          <path d="M50 83 L16 52 C6 43 0 34 0 24 C0 9 11 0 24 0 C33 0 41 5 50 13 C59 5 67 0 76 0 C89 0 100 9 100 24 C100 34 94 43 84 52 Z" fill="url(#g)" />
                        </svg>
                      </div>
                      <div className="my-6" />
                    </>
                  )}
                  {/* Espaço antes da assinatura */}
                  {isSignature && <div className="my-6" />}
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
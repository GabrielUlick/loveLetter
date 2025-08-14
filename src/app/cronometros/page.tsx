"use client";

import { useEffect, useState } from 'react';
import FlipDigit from '@/components/ui/FlipDigit';
import GalaxyBackground from "@/components/shared/GalaxyBackground";

interface TimeCount {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// Hoist dates so it is stable across renders
const dates = [
  { date: new Date('2024-07-04T19:30:00'), label: 'Primeiro Contato' },
  { date: new Date('2024-09-05T14:00:00'), label: 'Início do Namoro' },
  { date: new Date('2025-08-01T16:40:00'), label: 'Primeira Viagem' }
];

const Cronometros = () => {
  const [times, setTimes] = useState<TimeCount[]>([
    { years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 },
    { years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 },
    { years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 }
  ]);

  const calculateTime = (startDate: Date): TimeCount => {
    const now = new Date();
    const diff = now.getTime() - startDate.getTime();
    
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    let monthsTotal = (now.getFullYear() - startDate.getFullYear()) * 12;
    monthsTotal += now.getMonth() - startDate.getMonth();
    
    const years = Math.floor(monthsTotal / 12);
    const months = monthsTotal % 12;

    return {
      years,
      months,
      days: days % 30,
      hours: hours % 24,
      minutes: minutes % 60,
      seconds: seconds % 60
    };
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimes = dates.map(({ date }) => calculateTime(date));
      setTimes(newTimes);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#330021] to-black text-pink-100 p-2 sm:p-4 md:p-8">
      <GalaxyBackground />
      <div className="max-w-[1200px] mx-auto px-2 sm:px-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-12 sm:mb-16 md:mb-20 text-pink-300 drop-shadow-[0_0_20px_rgba(255,122,182,0.3)]">
          Nossa História em Números
        </h1>
        <div className="flex flex-col gap-6 sm:gap-8">
          {dates.map(({ label }, index) => (
            <div
              key={label}
              className="flip-clock"
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl font-light mb-8 sm:mb-10 md:mb-12 text-pink-200/80 text-center tracking-wider">{label}</h2>
              <div className="timer-row">
                <FlipDigit value={times[index].years} label="ANOS" />
                <FlipDigit value={times[index].months} label="MESES" />
                <FlipDigit value={times[index].days} label="DIAS" />
                <FlipDigit value={times[index].hours} label="HORAS" showSeparator />
                <FlipDigit value={times[index].minutes} label="MIN" showSeparator />
                <FlipDigit value={times[index].seconds} label="SEG" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cronometros;
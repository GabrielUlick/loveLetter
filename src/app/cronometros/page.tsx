"use client";

import { memo, useEffect, useState } from 'react';
import FlipDigit from '@/components/ui/FlipDigit';
import GalaxyBackground from "@/components/shared/GalaxyBackground";
import CronoDecor from "@/components/decor/CronoDecor";

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
  { date: new Date('2024-07-04T19:30:15'), label: 'Primeiro Contato' },
  { date: new Date('2024-09-05T14:00:20'), label: 'Início do Namoro' },
  { date: new Date('2025-08-01T16:40:13'), label: 'Primeira Viagem' }
];

const Cronometros = () => {
  const [times, setTimes] = useState<TimeCount[]>([
    { years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 },
    { years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 },
    { years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 }
  ]);

  const calculateTime = (startDate: Date): TimeCount => {
    const now = new Date();
    // If the start date is in the future, clamp to zero.
    if (now < startDate) {
      return { years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();

    // Adjust if month/day/time hasn't reached yet this year
    // Determine if we've passed the day/time within the current month
    const hasReachedDayTime = (
      now.getDate() > startDate.getDate() ||
      (
        now.getDate() === startDate.getDate() && (
          now.getHours() > startDate.getHours() ||
          (now.getHours() === startDate.getHours() && (
            now.getMinutes() > startDate.getMinutes() ||
            (now.getMinutes() === startDate.getMinutes() && now.getSeconds() >= startDate.getSeconds())
          ))
        )
      )
    );

    // Raw month difference
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    // If we haven't yet reached the day/time for this month, subtract one month
    if (!hasReachedDayTime) {
      months -= 1;
      if (months < 0) {
        months += 12;
        years -= 1;
      }
    }

    // Anchor date = startDate + years + months
    const anchor = new Date(startDate);
    anchor.setFullYear(startDate.getFullYear() + years);
    anchor.setMonth(startDate.getMonth() + months);

    const remainingMs = now.getTime() - anchor.getTime();
    const secTotal = Math.floor(remainingMs / 1000);
    const seconds = secTotal % 60;
    const minTotal = Math.floor(secTotal / 60);
    const minutes = minTotal % 60;
    const hourTotal = Math.floor(minTotal / 60);
    const hours = hourTotal % 24;
    const dayTotal = Math.floor(hourTotal / 24);
    const days = dayTotal; // days remaining after removing full months

    return { years, months, days, hours, minutes, seconds };
  };

  useEffect(() => {
    const tick = () => setTimes(dates.map(({ date }) => calculateTime(date)));
    tick(); // initial immediate update so it doesn't start at 0
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen text-pink-100 p-2 sm:p-4 md:p-8">
      {/* Background and decor are static; they render once and are not affected by timer state */}
      <GalaxyBackground variant="light" decor="petals" />
      <CronoDecor />
      <div className="max-w-[1200px] mx-auto px-2 sm:px-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-12 sm:mb-16 md:mb-20 text-pink-200 drop-shadow-[0_0_20px_rgba(255,212,220,0.35)]">
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

export default memo(Cronometros);
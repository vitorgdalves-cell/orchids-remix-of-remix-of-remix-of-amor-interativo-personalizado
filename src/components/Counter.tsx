"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";

interface CounterProps {
  mode: "light" | "dark";
  startDate: string;
}

export function Counter({ mode, startDate }: CounterProps) {
  const [timePassed, setTimePassed] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const start = new Date(startDate);
      const now = new Date();
      const diff = now.getTime() - start.getTime();

      const seconds = Math.floor((diff / 1000) % 60);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const daysTotal = Math.floor(diff / (1000 * 60 * 60 * 24));
      
      // Rough calculation for years and months
      const years = Math.floor(daysTotal / 365);
      const remainingDays = daysTotal % 365;
      const months = Math.floor(remainingDays / 30);
      const days = remainingDays % 30;

      setTimePassed({ years, months, days, hours, minutes, seconds });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [startDate]);

  const units = [
    { label: "Anos", value: timePassed.years },
    { label: "Meses", value: timePassed.months },
    { label: "Dias", value: timePassed.days },
    { label: "Horas", value: timePassed.hours },
    { label: "Min", value: timePassed.minutes },
    { label: "Seg", value: timePassed.seconds },
  ];

  return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`p-8 rounded-[2.5rem] shadow-xl border-2 transition-all duration-700 ${
          mode === "light"
            ? "bg-black/40 backdrop-blur-md border-purple-500/20 text-[#e9d5ff]"
            : "bg-zinc-900/50 border-[#FF1E1E]/20 text-[#FF1E1E]"
        }`}
      >
        <div className="flex items-center justify-center gap-2 mb-8 opacity-70 uppercase tracking-widest text-xs font-bold">
          <Clock size={14} />
          <span>Tempo Juntos</span>
        </div>

      <div className="grid grid-cols-3 gap-6">
        {units.map((unit) => (
          <div key={unit.label} className="flex flex-col items-center">
            <motion.span
              key={unit.value}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-3xl font-black mb-1"
            >
              {unit.value}
            </motion.span>
            <span className="text-[10px] uppercase font-bold opacity-60">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

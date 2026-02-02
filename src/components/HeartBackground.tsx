"use client";

import { motion } from "framer-motion";
import { Sparkles, Star } from "lucide-react";
import { useEffect, useState } from "react";

export function HeartBackground() {
  const [particles, setParticles] = useState<{ id: number; left: string; delay: number; size: number; color: string }[]>([]);

  useEffect(() => {
    const colors = ["#fbbf24", "#d8b4fe", "#e9d5ff", "#fcd34d"];
    // Reduced from 25 to 10 for better iPhone 16 performance
    const newParticles = Array.from({ length: 10 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 5,
      size: Math.random() * 12 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Optimized Background Gradient */}
      <div className="absolute inset-0 bg-[#0a0a0a]" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a0b2e]/50 via-[#0a0a0a] to-[#0a1a2e]/50" />
      
      {/* Simplified Animated Glow Layers with GPU Acceleration */}
      <motion.div 
        animate={{ 
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/20 blur-[100px] rounded-full will-change-opacity"
      />

      {/* Floating Particles - Simplified Animations */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: "110vh", opacity: 0 }}
          animate={{
            y: "-10vh",
            opacity: [0, 0.6, 0],
            rotate: [0, 180],
          }}
          transition={{
            duration: 12 + Math.random() * 8,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
          className="absolute will-change-transform"
          style={{ left: p.left, color: p.color }}
        >
          {Math.random() > 0.5 ? <Sparkles size={p.size} fill="currentColor" /> : <Star size={p.size} fill="currentColor" />}
        </motion.div>
      ))}
    </div>
  );
}

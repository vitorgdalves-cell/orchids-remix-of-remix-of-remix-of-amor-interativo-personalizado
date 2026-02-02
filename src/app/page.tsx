"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Flame, Lock } from "lucide-react";
import { Counter } from "../components/Counter";
import { MessageButton } from "../components/MessageButton";
import { HeartBackground } from "../components/HeartBackground";
import { ParticleBackground } from "../components/ParticleBackground";
import { Challenges } from "../components/Challenges";
import confetti from "canvas-confetti";

export default function Home() {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const [isLocked, setIsLocked] = useState(true);
  const [showPin, setShowPin] = useState(false);
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);

  const toggleMode = () => {
    if (mode === "light") {
      setShowPin(true);
    } else {
      setMode("light");
      setIsLocked(true);
      setPin("");
    }
  };

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === "6059") {
      setMode("dark");
      setIsLocked(false);
      setShowPin(false);
      setError(false);
      
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#FF1E1E", "#000000", "#ffffff"]
      });
    } else {
      setError(true);
      setPin("");
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <main className={`min-h-screen transition-colors duration-700 overflow-x-hidden relative pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)] ${
      mode === "light" 
        ? "bg-[#0a0a0a] text-[#c084fc]" 
        : "bg-black text-[#FF1E1E]"
    }`}>
      <AnimatePresence mode="wait">
        {mode === "light" ? (
          <HeartBackground key="hearts" />
        ) : (
          <ParticleBackground key="particles" />
        )}
      </AnimatePresence>

      <div className="relative z-10 max-w-lg mx-auto px-6 py-8 flex flex-col items-center gap-10 will-change-transform">
        <header className="w-full flex justify-between items-center pt-2">
          <motion.h1 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className={`text-xl font-black italic tracking-tighter ${
              mode === "light" ? "text-white" : "text-[#FF1E1E]"
            }`}
          >
            {mode === "light" ? "SELIX E NONO" : "ENTRE NÓS"}
          </motion.h1>
          
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggleMode}
            className={`w-12 h-12 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 ${
              mode === "light" 
                ? "bg-zinc-900 text-[#c084fc] border border-purple-500/20" 
                : "bg-[#FF1E1E] text-black"
            }`}
          >
            {mode === "light" ? <Flame size={20} /> : <Heart size={20} />}
          </motion.button>
        </header>

        <section className="w-full">
          <Counter mode={mode} startDate="2023-02-17" />
        </section>

        <section className="w-full flex flex-col items-center gap-6">
          <MessageButton mode={mode} />
        </section>

        {!isLocked && mode === "dark" && (
          <Challenges />
        )}

        <footer className="mt-8 opacity-30 text-[10px] font-black uppercase tracking-[0.3em]">
          <p>Para sempre, nós dois.</p>
        </footer>
      </div>

      <AnimatePresence>
        {showPin && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-zinc-950 border border-red-900/20 p-8 rounded-[3rem] w-full max-w-xs flex flex-col items-center gap-8 shadow-2xl"
            >
              <div className="w-16 h-16 bg-red-900/10 rounded-full flex items-center justify-center text-[#FF1E1E]">
                <Lock size={28} />
              </div>
              
              <div className="text-center">
                <h3 className="text-lg font-black italic text-white mb-1 uppercase tracking-wider">Acesso</h3>
                <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest">Introduz o código</p>
              </div>
              
              <form onSubmit={handlePinSubmit} className="w-full flex flex-col gap-6">
                <input
                  autoFocus
                  type="password"
                  inputMode="numeric"
                  maxLength={4}
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="••••"
                  className={`w-full bg-transparent border-b-2 text-center text-4xl tracking-[0.5em] py-2 outline-none transition-all ${
                    error ? "border-red-600 text-red-600 animate-shake" : "border-zinc-800 text-white focus:border-[#FF1E1E]"
                  }`}
                />
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowPin(false)}
                    className="flex-1 py-4 rounded-2xl bg-zinc-900 text-zinc-500 font-bold text-xs uppercase tracking-widest"
                  >
                    Sair
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-4 rounded-2xl bg-[#FF1E1E] text-black font-black text-xs uppercase tracking-widest"
                  >
                    Entrar
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-8px); }
          75% { transform: translateX(8px); }
        }
        .animate-shake {
          animation: shake 0.2s ease-in-out 0s 2;
        }
        @keyframes spin-once {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-once {
          animation: spin-once 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </main>
  );
}

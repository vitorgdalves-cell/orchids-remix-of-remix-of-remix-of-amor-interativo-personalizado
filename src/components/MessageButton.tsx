"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Sparkles, Flame } from "lucide-react";

const lightMessages = [
  "Só de saber que te tenho, tudo fica melhor.",
  "Não sabia que precisava tanto de ti até te conhecer.",
  "Gosto que sejas só minha… e não quero que olhes para mais ninguém sem ser eu!",
  "Não há nada neste mundo que me faça amar-te menos… és tudo para mim.",
  "Amo-te porque és genuína e única, ninguém se compara a ti.",
  "E a nossa história que quero contar para sempre, mesmo que ninguém mais leia.",
  "Se tiver a usar um acessório teu nos dias maus, é como se estivesse a dar-te a mão.",
  "Mesmo longe, sinto-te aqui ao meu lado.",
  "Não és só bonita… tens uma luz que ninguém mais tem.",
  "És a minha certeza em dias de dúvida.",
  "Não és só linda… és valiosa de um jeito que só eu posso ter.",
  "Contigo aprendo coisas novas sobre mim todos os dias.",
  "A tua coragem e bondade fazem-me querer ser melhor por ti.",
  "Não há vício que se compare ao efeito que tens sobre mim.",
  "Nenhuma droga me deixou tão cego quanto tu.",
  "Três anos a pensar em ti… e fico ciumento só de imaginar outro olhar para ti.",
  "A perfeição não existe… até eu te conhecer.",
];

const darkMessages = [
  "Se com roupa és irresistível, imagino o efeito sem nada.",
  "Há qualquer coisa na tua cintura que pede para ser marcada com beijos.",
  "Adoro ver-te quando puxo o cabelo e chupo-te o pescoço.",
  "Sinto que só de te olhar já me provocas mais do que devia.",
  "Cada gesto teu à distância deixa-me a pensar em como seria se não houvesse limites.",
  "Adoro provocar-te… mesmo sabendo que não podemos ir além.",
  "O lugar é irrelevante… o que importa é o que fazemos.",
  "Há palavras que só tu e eu percebemos… e que deixam a tensão subir.",
  "Fecha os olhos… e pensa em mim da forma que mais te excita.",
  "Gosto de ver até onde aguentas… sem poderes tocar em nada.",
  "Adoro provocar-te e ver-te a lutar contra o que queres.",
  "Gosto de pensar em ti… e no que faria contigo se pudesse.",
  "O teu olhar provoca-me mais do que qualquer toque.",
  "O pior é tentar agir normal quando a única coisa em que penso é em puxar-te para mais perto.",
  "Ficas tão sexy com essa roupa… e só eu te posso tocar, porque és minha.",
  "Não vou fazer nada que não queiras. Mas vou provocar até tu quereres fazer!",
  "Gosto de pensar em ti assim… a provocar-me, a deixar-me com tesão.",
  "Não sabia que alguém podia ter cara de santa mas ser tão atrevida.",
];

interface MessageButtonProps {
  mode: "light" | "dark";
}

export function MessageButton({ mode }: MessageButtonProps) {
  const [message, setMessage] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);

  const getRandomMessage = () => {
    setIsAnimating(true);
    const messages = mode === "light" ? lightMessages : darkMessages;
    let newMessage = messages[Math.floor(Math.random() * messages.length)];
    while (newMessage === message) {
      newMessage = messages[Math.floor(Math.random() * messages.length)];
    }
    setMessage(newMessage);
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <div className="w-full flex flex-col items-center gap-8">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={getRandomMessage}
        className={`group relative flex items-center gap-3 px-8 py-5 rounded-2xl font-bold text-lg shadow-xl transition-all duration-500 ${
          mode === "light"
            ? "bg-zinc-900 text-[#e9d5ff] border border-purple-500/30 hover:shadow-purple-500/20"
            : "bg-[#FF1E1E] text-black hover:shadow-red-600/50 animate-pulse-slow"
        }`}
      >
        {mode === "light" ? (
          <Sparkles className="group-hover:rotate-12 transition-transform text-purple-400" />
        ) : (
          <Flame className="group-hover:scale-125 transition-transform" />
        )}
        <span>{mode === "light" ? "Amo-te porque..." : "Provoca-me"}</span>
        
        {/* Subtle glow effect for dark mode */}
        {mode === "dark" && (
          <div className="absolute inset-0 rounded-2xl bg-[#FF1E1E] blur-xl opacity-20 -z-10 group-hover:opacity-40 transition-opacity" />
        )}
        {mode === "light" && (
          <div className="absolute inset-0 rounded-2xl bg-purple-500 blur-xl opacity-10 -z-10 group-hover:opacity-25 transition-opacity" />
        )}
      </motion.button>

      <AnimatePresence mode="wait">
        {message && (
          <motion.div
            key={message}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className={`w-full p-8 rounded-3xl text-center italic text-xl leading-relaxed shadow-inner ${
              mode === "light"
                ? "bg-black/40 text-[#e9d5ff] border border-purple-500/20 backdrop-blur-sm"
                : "bg-zinc-900/80 text-[#FF1E1E] border border-red-900/30"
            }`}
          >
            "{message}"
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .animate-pulse-slow {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.9; transform: scale(1.02); }
        }
      `}</style>
    </div>
  );
}

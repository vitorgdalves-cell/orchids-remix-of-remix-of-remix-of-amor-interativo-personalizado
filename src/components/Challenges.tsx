"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, UserCheck, Zap, RefreshCw, Star, Flame, Lock, Clock } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";

const dailyMessages = [
  "Hoje és tu que mandas... diz-me o que queres.",
  "Prepara-te para uma noite inesquecível.",
  "O meu desejo por ti só aumenta a cada segundo.",
  "És a minha tentação favorita.",
  "Não vejo a hora de te ter nos meus braços.",
  "Hoje o limite é a nossa imaginação.",
  "Cada detalhe teu me leva à loucura.",
  "Quero sentir o teu corpo colado ao meu.",
];

const eleDesafios = [
  "Dá um beijo no pescoço dela por 30 segundos.",
  "Diz-lhe ao ouvido o que lhe farias agora.",
  "Faz-lhe uma massagem provocadora.",
  "Morde-lhe o lábio inferior com suavidade.",
  "Tira uma peça de roupa dela... usando apenas os dentes.",
  "Sussurra algo atrevido enquanto a abraças por trás.",
  "Dá-lhe um beijo longo e intenso sem usar as mãos.",
];

const elaDesafios = [
  "Senta-te no colo dele e sussurra algo atrevido.",
  "Dá-lhe um beijo que o deixe sem fôlego.",
  "Faz um striptease improvisado de 1 minuto.",
  "Provoca-o sem lhe poderes tocar durante 2 minutos.",
  "Manda-lhe uma foto provocadora agora mesmo.",
  "Morde a orelha dele e diz o que queres que ele te faça.",
  "Usa as tuas mãos para o provocar onde ele mais gosta.",
];

const targetDate = new Date("2026-02-14T20:30:00");

export function Challenges() {
  const [isOpen, setIsOpen] = useState(false);
  const [selection, setSelection] = useState<"ele" | "ela" | null>(null);
  const [currentChallenge, setCurrentChallenge] = useState<string | null>(null);
  const [dailyMessage, setDailyMessage] = useState<string | null>(null);
  const [lastRaffleDate, setLastRaffleDate] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      
      if (difference <= 0) {
        setIsUnlocked(true);
        setTimeLeft(null);
        clearInterval(timer);
      } else {
        setIsUnlocked(false);
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const savedMessage = localStorage.getItem("dailyMessage");
    const savedDate = localStorage.getItem("lastRaffleDate");
    const today = new Date().toDateString();

    if (savedDate === today) {
      setDailyMessage(savedMessage);
      setLastRaffleDate(savedDate);
    }
  }, []);

  const raffleDailyMessage = () => {
    const today = new Date().toDateString();
    if (lastRaffleDate === today) return;

    const randomIndex = Math.floor(Math.random() * dailyMessages.length);
    const newMessage = dailyMessages[randomIndex];
    
    setDailyMessage(newMessage);
    setLastRaffleDate(today);
    localStorage.setItem("dailyMessage", newMessage);
    localStorage.setItem("lastRaffleDate", today);
  };

  const getRandomChallenge = useCallback((type: "ele" | "ela") => {
    const list = type === "ele" ? eleDesafios : elaDesafios;
    const randomIndex = Math.floor(Math.random() * list.length);
    setCurrentChallenge(list[randomIndex]);
  }, []);

  const handleSelect = (type: "ele" | "ela") => {
    setSelection(type);
    setCurrentChallenge(null);
  };

  const modalVariants = {
    hidden: { y: "100%" },
    visible: { 
      y: 0, 
      transition: { 
        type: "spring", 
        damping: 25, 
        stiffness: 200,
        mass: 1
      }
    },
    exit: { 
      y: "100%", 
      transition: { duration: 0.3, ease: "circIn" }
    }
  };

  return (
    <>
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed right-6 bottom-24 z-40 bg-[#FF1E1E] text-black w-16 h-16 rounded-full shadow-[0_8px_30px_rgba(255,30,30,0.4)] flex items-center justify-center border border-red-400/20 active:bg-red-600 transition-colors"
      >
        <Zap size={28} fill="currentColor" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end justify-center p-0"
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full max-w-lg bg-zinc-950 border-t border-red-900/20 rounded-t-[3rem] overflow-hidden flex flex-col max-h-[85svh] shadow-2xl will-change-transform"
            >
              <div className="w-10 h-1 bg-zinc-800 rounded-full mx-auto mt-4 mb-2" />

                <header className="px-8 py-2 flex flex-col items-center">
                    <Tabs defaultValue="sorteio" className="w-full">
                      <TabsList className="bg-zinc-900 border border-zinc-800 mx-auto flex w-fit">
                        <TabsTrigger value="sorteio" className="text-[10px] uppercase font-black tracking-widest px-4 sm:px-6">Sorteio</TabsTrigger>
                        <TabsTrigger value="desafios" className="text-[10px] uppercase font-black tracking-widest px-4 sm:px-6">Desafios</TabsTrigger>
                        <TabsTrigger value="texto" className="text-[10px] uppercase font-black tracking-widest px-4 sm:px-6">texto Restrita</TabsTrigger>
                      </TabsList>


                      <div className="mt-4">
                        <TabsContent value="sorteio">
                        <div className="flex flex-col items-center justify-center py-6 px-4 gap-8 min-h-[350px]">
                          <AnimatePresence mode="wait">
                            {dailyMessage ? (
                              <motion.div
                                key="result"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center gap-6 text-center"
                              >
                                <div className="bg-[#FF1E1E]/20 text-[#FF1E1E] p-4 rounded-full">
                                  <Star size={32} fill="currentColor" />
                                </div>
                                <h4 className="text-zinc-500 font-bold text-[10px] uppercase tracking-[0.3em]">Mensagem de Hoje</h4>
                                <p className="text-2xl sm:text-3xl font-black italic text-white leading-tight px-2">
                                  {dailyMessage}
                                </p>
                                <div className="mt-4 text-zinc-700 font-bold text-[10px] uppercase tracking-widest border border-zinc-900 px-4 py-2 rounded-full">
                                  Sorteio concluído hoje
                                </div>
                              </motion.div>
                            ) : (
                              <motion.div
                                key="raffle-button"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col items-center gap-8 w-full"
                              >
                                <div className="w-20 h-20 rounded-[2rem] bg-zinc-900 flex items-center justify-center text-zinc-700">
                                  <Flame size={40} />
                                </div>
                                <div className="text-center">
                                  <h3 className="text-white font-black italic text-xl uppercase tracking-tighter mb-2">Pronta para hoje?</h3>
                                  <p className="text-zinc-500 font-bold text-[10px] uppercase tracking-widest leading-loose">
                                    Clica no botão para veres a tua<br />mensagem especial de hoje.
                                  </p>
                                </div>
                                <button
                                  onClick={raffleDailyMessage}
                                  className="w-full py-6 rounded-3xl bg-[#FF1E1E] text-black font-black uppercase tracking-[0.2em] text-sm shadow-[0_10px_40px_rgba(255,30,30,0.3)] active:scale-95 transition-all"
                                >
                                  Sorteia a mensagem de hoje
                                </button>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </TabsContent>


                    <TabsContent value="desafios">
                      <div className="flex-1 overflow-y-auto pb-12 pt-2">
                        <AnimatePresence mode="wait">
                          {!selection ? (
                            <motion.div 
                              key="selection"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="grid grid-cols-1 gap-4 py-4 w-full"
                            >
                              <button
                                onClick={() => handleSelect("ele")}
                                className="flex items-center gap-6 p-6 rounded-[2rem] bg-zinc-900/50 border border-zinc-800 active:bg-zinc-800 transition-colors"
                              >
                                <div className="w-14 h-14 rounded-2xl bg-[#FF1E1E] text-black flex items-center justify-center">
                                  <User size={28} />
                                </div>
                                <div className="text-left">
                                  <span className="block text-2xl font-black italic text-white tracking-tight leading-none mb-1">ELE</span>
                                  <span className="text-zinc-500 font-bold text-[10px] uppercase tracking-widest">Desafios dele</span>
                                </div>
                              </button>

                              <button
                                onClick={() => handleSelect("ela")}
                                className="flex items-center gap-6 p-6 rounded-[2rem] bg-zinc-900/50 border border-zinc-800 active:bg-zinc-800 transition-colors"
                              >
                                <div className="w-14 h-14 rounded-2xl bg-[#FF1E1E] text-black flex items-center justify-center">
                                  <UserCheck size={28} />
                                </div>
                                <div className="text-left">
                                  <span className="block text-2xl font-black italic text-white tracking-tight leading-none mb-1">ELA</span>
                                  <span className="text-zinc-500 font-bold text-[10px] uppercase tracking-widest">Desafios dela</span>
                                </div>
                              </button>
                            </motion.div>
                          ) : (
                            <motion.div 
                              key="challenge"
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 1.05 }}
                              className="flex flex-col items-center gap-8 py-4 w-full"
                            >
                              <button 
                                onClick={() => {
                                  setSelection(null);
                                  setCurrentChallenge(null);
                                }}
                                className="text-zinc-500 font-bold text-[10px] uppercase tracking-widest flex items-center gap-2 mb-2"
                              >
                                ← Voltar
                              </button>

                              <div className="w-full bg-zinc-900/30 border border-red-900/10 rounded-[2.5rem] p-8 flex flex-col items-center text-center gap-8 min-h-[280px] justify-center">
                                <div className="bg-[#FF1E1E]/10 text-[#FF1E1E] px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.2em]">
                                  Missão para {selection === "ele" ? "Ele" : "Ela"}
                                </div>

                                <div className="flex-1 flex items-center justify-center px-2">
                                  <AnimatePresence mode="wait">
                                    {currentChallenge ? (
                                      <motion.p 
                                        key={currentChallenge}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="text-xl sm:text-2xl font-bold text-white leading-tight"
                                      >
                                        {currentChallenge}
                                      </motion.p>
                                    ) : (
                                      <motion.p
                                        key="empty"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-zinc-600 italic font-medium text-lg"
                                      >
                                        Pronto para o desafio?
                                      </motion.p>
                                    )}
                                  </AnimatePresence>
                                </div>

                                <button
                                  onClick={() => getRandomChallenge(selection!)}
                                  className="w-full flex items-center justify-center gap-3 bg-[#FF1E1E] text-black py-5 rounded-2xl font-black uppercase tracking-widest text-xs active:scale-95 transition-transform shadow-lg"
                                >
                                  <RefreshCw size={18} className={currentChallenge ? "animate-spin-once" : ""} />
                                  Sortear Desafio
                                </button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                        </TabsContent>

                        <TabsContent value="texto">
                          <div className="flex flex-col items-center justify-center py-6 px-4 gap-6 min-h-[400px]">
                            <AnimatePresence mode="wait">
                              {!isUnlocked ? (
                                <motion.div
                                  key="locked"
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 1.1 }}
                                  className="flex flex-col items-center text-center gap-8"
                                >
                                  <div className="w-20 h-20 bg-zinc-900 rounded-[2.5rem] flex items-center justify-center text-zinc-700 relative">
                                    <Lock size={40} />
                                    <motion.div 
                                      animate={{ rotate: 360 }}
                                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                      className="absolute inset-[-8px] border border-red-900/10 rounded-full"
                                    />
                                  </div>
                                  
                                  <div className="space-y-3">
                                    <h3 className="text-white font-black italic text-xl uppercase tracking-tight">Área Especial</h3>
                                    <p className="text-zinc-500 font-bold text-[10px] uppercase tracking-widest leading-relaxed">
                                      Olá! Esta área especial estará disponível<br />dia 14 às 20:30. Fica atenta !
                                    </p>
                                  </div>

                                  {timeLeft && (
                                    <div className="grid grid-cols-4 gap-3 w-full max-w-[280px]">
                                      {[
                                        { label: "Dias", value: timeLeft.days },
                                        { label: "Horas", value: timeLeft.hours },
                                        { label: "Min", value: timeLeft.minutes },
                                        { label: "Seg", value: timeLeft.seconds }
                                      ].map((item) => (
                                        <div key={item.label} className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-3 flex flex-col items-center">
                                          <span className="text-xl font-black text-white tabular-nums">{String(item.value).padStart(2, '0')}</span>
                                          <span className="text-[7px] font-black uppercase tracking-tighter text-zinc-600">{item.label}</span>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </motion.div>
                              ) : (
                                <motion.div
                                  key="unlocked"
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className="flex flex-col gap-6 w-full max-h-[500px] overflow-y-auto px-2 custom-scrollbar"
                                >
                                  <div className="text-center space-y-2 mb-4">
                                    <h3 className="text-[#FF1E1E] font-black italic text-2xl uppercase tracking-tighter">Bem-vindo à área restrita!</h3>
                                    <p className="text-zinc-400 font-medium text-xs">Aqui encontrarás o texto especial que preparei para ti.</p>
                                  </div>

                                  <div className="space-y-6 text-zinc-200 font-medium leading-relaxed text-sm sm:text-base italic">
                                    <p>Se te portas mal no nosso jogo, sabes que é porque queres ser provocada.</p>
                                    <p>E quando começo a provocar‑te, não consigo parar! Imagino‑te entregue, a ficar molhada com cada toque meu.</p>
                                    <p>Prendo‑te e começo a chupar o teu pescoço, devagar e depois mais fundo, para sentir cada pedaço teu!</p>
                                    
                                    <div className="py-2 border-l-2 border-[#FF1E1E]/30 pl-4 bg-red-900/5 rounded-r-2xl">
                                      <p>Desço até à tua cona e chupo cada canto como se não houvesse amanhã.</p>
                                      <p>Depois disso, quero-te sentir e ouvir-te gemer enquanto fudemos.</p>
                                    </div>

                                    <p className="text-[#FF1E1E] font-black uppercase tracking-[0.2em] text-[10px] mt-8">Mas…</p>

                                    <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-[2rem] space-y-4">
                                      <p className="text-white font-bold">Regra do jogo:</p>
                                      <p>Resistes quando eu te tocar ou provocar porque faz parte do jogo.</p>
                                      
                                      <p className="text-white font-bold pt-2">Se não…</p>
                                      <p>Em vez de te chupar a cona, puxo‑te pelo cabelo, controlo o teu corpo e levo o jogo para um sexo masoquista. Por isso, cada detalhe depende de ti.</p>
                                      
                                      <div className="h-px bg-zinc-800 my-4" />
                                      
                                      <p>Ou, se preferires, deixo‑te explorar a minha pila com a tua mão, mas sob o meu controlo, e para isso depende das tuas reações.</p>
                                      <p>Ou, se preferires, deixo‑te lamber a minha pila enquanto eu mando, eu decido!</p>
                                    </div>

                                    <p className="text-center text-zinc-500 font-bold text-xs pt-4 pb-8">Tu decides o que queres pelas tuas reações</p>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </TabsContent>
                      </div>
                    </Tabs>

                <button 
                  onClick={() => {
                    setIsOpen(false);
                    setSelection(null);
                    setCurrentChallenge(null);
                  }}
                  className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center text-zinc-400 active:scale-90 transition-transform mb-auto"
                >
                  <X size={20} />
                </button>
              </header>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

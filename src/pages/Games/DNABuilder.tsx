import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../../store/useAppStore';
import { ArrowLeft, CheckCircle2, RefreshCw, Dna, GripVertical, Trash2 } from 'lucide-react';

type Base = 'A' | 'T' | 'C' | 'G';

const BASES: Base[] = ['A', 'T', 'C', 'G'];

const COMPLEMENTS: Record<Base, Base> = {
  A: 'T',
  T: 'A',
  C: 'G',
  G: 'C',
};

const BASE_STYLES: Record<Base, { bg: string; border: string; text: string; glow: string }> = {
  A: { bg: 'bg-rose-500/20', border: 'border-rose-500/80', text: 'text-rose-400', glow: 'shadow-rose-500/30' },
  T: { bg: 'bg-indigo-500/20', border: 'border-indigo-500/80', text: 'text-indigo-400', glow: 'shadow-indigo-500/30' },
  C: { bg: 'bg-emerald-500/20', border: 'border-emerald-500/80', text: 'text-emerald-400', glow: 'shadow-emerald-500/30' },
  G: { bg: 'bg-amber-500/20', border: 'border-amber-500/80', text: 'text-amber-400', glow: 'shadow-amber-500/30' },
};

const generateRandomStrand = (length = 8): Base[] => {
  return Array.from({ length }, () => BASES[Math.floor(Math.random() * BASES.length)]);
};

export default function DNABuilder() {
  const { setActiveGame, unlockAchievement } = useAppStore();
  const [targetStrand, setTargetStrand] = useState<Base[]>([]);
  const [userStrand, setUserStrand] = useState<(Base | null)[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);

  // References to measure slot positions for drop detection
  const slotRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    initNewGame();
  }, []);

  const initNewGame = () => {
    const newTarget = generateRandomStrand(8);
    setTargetStrand(newTarget);
    setUserStrand(Array(newTarget.length).fill(null));
    setIsCompleted(false);
  };

  const handleRemoveSlot = (index: number) => {
    if (isCompleted) return;
    const newStrand = [...userStrand];
    newStrand[index] = null;
    setUserStrand(newStrand);
  };

  // Called when dragging ends (mouse release or finger lift)
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, base: Base) => {
    if (isCompleted) return;

    // Get drop coordinates (works for both mouse and touch)
    let clientX = 0;
    let clientY = 0;

    if ('changedTouches' in event && event.changedTouches.length > 0) {
      clientX = event.changedTouches[0].clientX;
      clientY = event.changedTouches[0].clientY;
    } else if ('clientX' in event) {
      clientX = (event as MouseEvent).clientX;
      clientY = (event as MouseEvent).clientY;
    }

    // Check if drop point intersects with any slot bounding box
    slotRefs.current.forEach((slot, idx) => {
      if (!slot) return;
      const rect = slot.getBoundingClientRect();

      if (
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom
      ) {
        // Drop detected into slot `idx`
        const newStrand = [...userStrand];
        newStrand[idx] = base;
        setUserStrand(newStrand);

        // Check if full strand is completed
        const allFilled = newStrand.every((s) => s !== null);
        if (allFilled) {
          const allCorrect = targetStrand.every(
            (target, i) => newStrand[i] === COMPLEMENTS[target]
          );

          if (allCorrect) {
            setIsCompleted(true);
            unlockAchievement('beat_all_games');
          }
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 flex flex-col items-center justify-center relative overflow-hidden select-none">
      
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Back Button */}
      <button
        onClick={() => setActiveGame(null)}
        className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2.5 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 rounded-xl text-slate-300 hover:text-white transition-all backdrop-blur-md cursor-pointer shadow-lg z-20"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Lab</span>
      </button>

      <div className="max-w-3xl w-full bg-slate-900/80 border border-slate-800 rounded-3xl p-6 md:p-10 backdrop-blur-xl shadow-2xl space-y-8 text-center relative z-10">
        
        {/* Header */}
        <div className="space-y-3">
          <div className="inline-flex p-3 rounded-2xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 text-pink-400 border border-pink-500/30 mb-1 shadow-lg shadow-pink-500/10">
            <Dna className="w-9 h-9 animate-pulse" />
          </div>
          <h1 className="text-3xl font-black tracking-tight text-white flex items-center justify-center gap-2">
            DNA Strand Repair
          </h1>
          <p className="text-slate-400 text-xs md:text-sm max-w-md mx-auto leading-relaxed">
            Grab nucleotides with your mouse/finger and drop them into the empty slots:
            <span className="text-pink-400 font-mono font-semibold ml-1">A ↔ T</span>,{' '}
            <span className="text-emerald-400 font-mono font-semibold">C ↔ G</span>
          </p>
        </div>

        {/* DNA Strand Board */}
        <div className="p-6 md:p-8 bg-slate-950/90 rounded-2xl border border-slate-800/80 space-y-6 shadow-inner relative">
          
          {/* Top Strand */}
          <div className="space-y-1">
            <div className="flex items-center justify-between px-4 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
              <span>Template Strand (5')</span>
              <span>(3')</span>
            </div>
            <div className="flex items-center justify-center gap-2 md:gap-3.5">
              {targetStrand.map((base, idx) => {
                const style = BASE_STYLES[base];
                return (
                  <div
                    key={`target-${idx}`}
                    className={`w-10 h-12 md:w-12 md:h-14 rounded-xl border ${style.border} ${style.bg} ${style.text} ${style.glow} font-mono font-black text-xl flex items-center justify-center shadow-lg`}
                  >
                    {base}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Hydrogen Bonds */}
          <div className="flex items-center justify-center gap-2 md:gap-3.5 my-2">
            {targetStrand.map((_, idx) => {
              const userBase = userStrand[idx];
              const isCorrect = userBase === COMPLEMENTS[targetStrand[idx]];
              return (
                <div key={`bond-${idx}`} className="w-10 md:w-12 flex justify-center">
                  <div
                    className={`w-1 h-6 rounded-full transition-all duration-300 ${
                      userBase !== null
                        ? isCorrect
                          ? 'bg-gradient-to-b from-pink-500 to-rose-500 shadow-md shadow-pink-500/50'
                          : 'bg-rose-600'
                        : 'bg-slate-800/60'
                    }`}
                  />
                </div>
              );
            })}
          </div>

          {/* Player Strand Drop Slots */}
          <div className="space-y-1">
            <div className="flex items-center justify-between px-4 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
              <span>Complementary Strand (3')</span>
              <span>(5')</span>
            </div>
            <div className="flex items-center justify-center gap-2 md:gap-3.5">
              {userStrand.map((base, idx) => {
                const style = base ? BASE_STYLES[base] : null;

                return (
                  <div
                    key={`slot-${idx}`}
                    ref={(el) => {
                        slotRefs.current[idx] = el;
                    }}
                    className={`w-10 h-12 md:w-12 md:h-14 rounded-xl border transition-all flex items-center justify-center font-mono font-black text-xl relative group ${
                      base
                        ? `${style?.border} ${style?.bg} ${style?.text} ${style?.glow} shadow-lg`
                        : 'border-dashed border-slate-700 bg-slate-900/40 text-slate-600'
                    }`}
                  >
                    {base ? (
                      <>
                        <span>{base}</span>
                        {!isCompleted && (
                          <button
                            onClick={() => handleRemoveSlot(idx)}
                            className="absolute -top-1.5 -right-1.5 bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white p-1 rounded-full border border-slate-600 cursor-pointer shadow-md transition-all"
                            title="Remove Base"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        )}
                      </>
                    ) : (
                      <span className="text-[10px] text-slate-700 font-mono">SLOT</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Free Floating Draggable Nucleotides Tray */}
        {!isCompleted ? (
          <div className="space-y-4 pt-2">
            <p className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              🖐️ Drag any nucleotide to a slot:
            </p>

            <div className="flex items-center justify-center gap-4 max-w-md mx-auto pt-2">
              {BASES.map((base) => {
                const style = BASE_STYLES[base];
                return (
                  <motion.div
                    key={base}
                    drag
                    dragSnapToOrigin
                    onDragEnd={(event) => handleDragEnd(event, base)}
                    whileDrag={{ scale: 1.25, zIndex: 50 }}
                    whileHover={{ scale: 1.08 }}
                    className={`w-14 h-16 rounded-2xl border-2 ${style.border} ${style.bg} ${style.text} font-mono font-black text-2xl flex flex-col items-center justify-center cursor-grab active:cursor-grabbing shadow-xl transition-shadow relative touch-none`}
                  >
                    <GripVertical className="w-3 h-3 text-slate-400/80 mb-0.5" />
                    <span>{base}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ) : (
          /* Completion State Banner */
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-emerald-500/20 border border-emerald-500/40 rounded-2xl space-y-4 shadow-xl"
            >
              <div className="flex items-center justify-center gap-2 text-emerald-400 font-bold text-xl">
                <CheckCircle2 className="w-6 h-6 animate-bounce" />
                <span>DNA Repaired. Relationship Stable!</span>
              </div>
              <p className="text-xs text-slate-300">
                Genetic binding completed with 100% complementarity.
              </p>
              <button
                onClick={initNewGame}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold rounded-xl shadow-lg transition-all cursor-pointer text-xs"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Sequence Next Strand 🧪</span>
              </button>
            </motion.div>
          </AnimatePresence>
        )}

      </div>
    </div>
  );
}
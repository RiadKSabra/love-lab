import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../../store/useAppStore';
import { ArrowLeft, Sparkles, Eye, CheckCircle2, RefreshCw, Telescope } from 'lucide-react';

interface StarPoint {
  id: number;
  x: number; // Percentage relative to sky box
  y: number;
}

interface Constellation {
  id: string;
  name: string;
  latinName: string;
  description: string;
  stars: StarPoint[];
  message: string;
}

const CONSTELLATIONS: Constellation[] = [
  {
    id: 'dna-helix',
    name: 'The Helix',
    latinName: 'Biologia Aeterna',
    description: 'A structural alignment representing our complementary strands.',
    stars: [
      { id: 1, x: 20, y: 30 },
      { id: 2, x: 40, y: 70 },
      { id: 3, x: 60, y: 30 },
      { id: 4, x: 80, y: 70 },
      { id: 5, x: 80, y: 30 },
      { id: 6, x: 60, y: 70 },
      { id: 7, x: 40, y: 30 },
      { id: 8, x: 20, y: 70 },
    ],
    message: 'Just as nucleotides form unbreakable bonds in DNA, every variable in the universe pointed me directly to you. Our chemistry was written in the stars.',
  },
  {
    id: 'cor-heart',
    name: 'The Heart',
    latinName: 'Cor Resonance',
    description: 'An orbital cluster emitting high-frequency emotional energy.',
    stars: [
      { id: 1, x: 50, y: 75 },
      { id: 2, x: 25, y: 45 },
      { id: 3, x: 30, y: 25 },
      { id: 4, x: 50, y: 38 },
      { id: 5, x: 70, y: 25 },
      { id: 6, x: 75, y: 45 },
    ],
    message: 'Observational data confirms: whenever you are near, my heart rate spikes beyond standard laboratory parameters. You are my favorite celestial event.',
  },
  {
    id: 'infinity',
    name: 'The Eternal Loop',
    latinName: 'Infinitum Love',
    description: 'A continuous orbit with no starting or ending point.',
    stars: [
      { id: 1, x: 30, y: 50 },
      { id: 2, x: 20, y: 30 },
      { id: 3, x: 35, y: 30 },
      { id: 4, x: 50, y: 50 },
      { id: 5, x: 65, y: 70 },
      { id: 6, x: 80, y: 70 },
      { id: 7, x: 70, y: 50 },
      { id: 8, x: 50, y: 50 },
    ],
    message: 'Through every experiment, every trip, every late-night conversation, and every chapter ahead—I love you to infinity and beyond.',
  },
];

export default function StarObservatory() {
  const { setActiveGame, unlockAchievement } = useAppStore();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [connectedStars, setConnectedStars] = useState<number[]>([]);
  const [completedConstellations, setCompletedConstellations] = useState<string[]>([]);
  const [activeMessage, setActiveMessage] = useState<string | null>(null);

  const activeConstellation = CONSTELLATIONS[currentIdx];

  const handleStarClick = (starId: number) => {
    // If clicking the expected next star in sequence
    const nextExpectedStar = activeConstellation.stars[connectedStars.length]?.id;

    if (starId === nextExpectedStar) {
      const updated = [...connectedStars, starId];
      setConnectedStars(updated);

      // Check if constellation completed
      if (updated.length === activeConstellation.stars.length) {
        if (!completedConstellations.includes(activeConstellation.id)) {
          const newCompleted = [...completedConstellations, activeConstellation.id];
          setCompletedConstellations(newCompleted);

          if (newCompleted.length === CONSTELLATIONS.length) {
            unlockAchievement('stargazer');
          }
        }
        setActiveMessage(activeConstellation.message);
      }
    }
  };

  const resetCurrent = () => {
    setConnectedStars([]);
    setActiveMessage(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 flex flex-col items-center justify-center relative overflow-hidden select-none">
      
      {/* Background Starry Sky FX */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-950/60 via-slate-950 to-slate-950 pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Back Button */}
      <button
        onClick={() => setActiveGame(null)}
        className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2.5 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 rounded-xl text-slate-300 hover:text-white transition-all backdrop-blur-md cursor-pointer shadow-lg z-20"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Lab</span>
      </button>

      <div className="max-w-4xl w-full space-y-6 relative z-10 my-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-1 shadow-lg shadow-indigo-500/10">
            <Telescope className="w-8 h-8 animate-pulse" />
          </div>
          <h1 className="text-3xl font-black tracking-tight text-white">
            Star Observatory
          </h1>
          <p className="text-slate-400 text-xs md:text-sm max-w-md mx-auto leading-relaxed">
            Click stars in numerical order to map out relationship constellations in the night sky.
          </p>
        </div>

        {/* Constellation Selector Tabs */}
        <div className="flex items-center justify-center gap-3">
          {CONSTELLATIONS.map((item, idx) => {
            const isDone = completedConstellations.includes(item.id);
            const isActive = idx === currentIdx;

            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentIdx(idx);
                  setConnectedStars([]);
                  setActiveMessage(isDone ? item.message : null);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-mono border transition-all flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white border-indigo-400 shadow-lg shadow-indigo-500/20'
                    : isDone
                    ? 'bg-slate-900/90 text-emerald-400 border-emerald-500/40'
                    : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:border-slate-700'
                }`}
              >
                {isDone && <CheckCircle2 className="w-3.5 h-3.5" />}
                <span>{item.name}</span>
              </button>
            );
          })}
        </div>

        {/* Observatory Canvas Window */}
        <div className="relative w-full h-[400px] md:h-[450px] bg-slate-950/90 border border-indigo-500/30 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl flex flex-col justify-between p-6">
          
          {/* Top Info Overlay */}
          <div className="flex items-center justify-between z-10">
            <div>
              <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-2.5 py-1 rounded border border-indigo-500/20">
                {activeConstellation.latinName}
              </span>
              <h2 className="text-lg font-bold text-white mt-1">
                {activeConstellation.name}
              </h2>
            </div>
            
            <button
              onClick={resetCurrent}
              className="p-2 bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-400 hover:text-white rounded-xl transition-all cursor-pointer"
              title="Reset Lines"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          {/* SVG Line Connections */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {connectedStars.map((starId, i) => {
              if (i === 0) return null;
              const prevStar = activeConstellation.stars.find(
                (s) => s.id === connectedStars[i - 1]
              );
              const currStar = activeConstellation.stars.find((s) => s.id === starId);

              if (!prevStar || !currStar) return null;

              return (
                <line
                  key={`line-${i}`}
                  x1={`${prevStar.x}%`}
                  y1={`${prevStar.y}%`}
                  x2={`${currStar.x}%`}
                  y2={`${currStar.y}%`}
                  stroke="#818cf8"
                  strokeWidth="2.5"
                  strokeDasharray="4 2"
                  className="animate-pulse"
                />
              );
            })}
          </svg>

          {/* Interactive Star Nodes */}
          <div className="absolute inset-0">
            {activeConstellation.stars.map((star) => {
              const isConnected = connectedStars.includes(star.id);
              const isNext =
                activeConstellation.stars[connectedStars.length]?.id === star.id;

              return (
                <motion.div
                  key={star.id}
                  style={{ top: `${star.y}%`, left: `${star.x}%` }}
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleStarClick(star.id)}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all ${
                    isConnected
                      ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/50 scale-110'
                      : isNext
                      ? 'bg-amber-400 text-slate-950 font-bold shadow-lg shadow-amber-400/50 animate-bounce'
                      : 'bg-slate-800/80 text-slate-400 border border-slate-700 hover:border-indigo-400'
                  }`}
                >
                  <span className="text-xs font-mono font-black">{star.id}</span>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom Prompt */}
          <div className="z-10 text-center">
            <p className="text-xs font-mono text-slate-400">
              {connectedStars.length === activeConstellation.stars.length
                ? '✨ Constellation complete!'
                : `Click Star #${connectedStars.length + 1} to align starlines`}
            </p>
          </div>

        </div>

      </div>

      {/* Secret Message Modal */}
      <AnimatePresence>
        {activeMessage && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="max-w-lg w-full bg-slate-900 border border-indigo-500/40 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl text-center relative"
            >
              <div className="inline-flex p-3 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                <Sparkles className="w-8 h-8 animate-spin" />
              </div>

              <div className="space-y-2">
                <p className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest">
                  Telescope Lens Decrypted
                </p>
                <h2 className="text-2xl font-black text-white">
                  {activeConstellation.name}
                </h2>
              </div>

              <p className="text-sm text-slate-200 leading-relaxed font-sans bg-slate-950/80 p-5 rounded-2xl border border-slate-800">
                &ldquo;{activeMessage}&rdquo;
              </p>

              <button
                onClick={() => setActiveMessage(null)}
                className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold rounded-xl transition-all cursor-pointer text-xs uppercase font-mono tracking-wider"
              >
                Close Telescope View
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
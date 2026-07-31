import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../../store/useAppStore';
import { Heart, Beaker } from 'lucide-react';

type AnimationType = 'jump' | 'spin' | 'fly' | 'teleport' | 'shrink' | 'bounce';
const ANIMATIONS: AnimationType[] = ['jump', 'spin', 'fly', 'teleport', 'shrink', 'bounce'];

export default function Chapter2Question() {
  const { setPhase, incrementNoAttempts } = useAppStore();
  const [animIndex, setAnimIndex] = useState(0);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);

  const handleNoInteraction = () => {
    incrementNoAttempts();
    const currentAnim = ANIMATIONS[animIndex % ANIMATIONS.length];
    const randomX = (Math.random() - 0.5) * 350;
    const randomY = (Math.random() - 0.5) * 350;

    switch (currentAnim) {
      case 'jump':
        setCoords({ x: randomX, y: -120 });
        break;
      case 'spin':
        setRotation((prev) => prev + 720);
        setCoords({ x: randomX, y: randomY });
        break;
      case 'fly':
        setCoords({ x: randomX > 0 ? 300 : -300, y: -200 });
        break;
      case 'teleport':
        setCoords({ x: randomX, y: randomY });
        break;
      case 'shrink':
        setScale((prev) => Math.max(prev * 0.7, 0.2));
        setCoords({ x: randomX, y: randomY });
        break;
      case 'bounce':
        setCoords({ x: randomX, y: 80 });
        break;
    }
    setAnimIndex((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-slate-100 p-6 overflow-hidden">
      <div className="max-w-md w-full bg-slate-900/80 border border-slate-800 rounded-2xl p-8 backdrop-blur-md shadow-2xl text-center space-y-6 relative">
        <div className="inline-flex p-3 rounded-xl bg-purple-500/10 text-purple-400 mb-2 border border-purple-500/20">
          <Beaker className="w-8 h-8" />
        </div>
        <div className="space-y-1">
          <p className="text-xs font-mono uppercase tracking-widest text-purple-400">Chapter 2</p>
          <h2 className="text-2xl font-bold text-white">Experiment #24</h2>
        </div>
        <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800">
          <p className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">Objective</p>
          <p className="text-lg text-slate-200 font-medium">Determine whether you still want to date me.</p>
        </div>
        <div className="flex items-center justify-center gap-4 pt-4 min-h-[80px] relative">
          <button
            onClick={() => setPhase('success')}
            className="py-3.5 px-8 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold rounded-xl shadow-lg shadow-pink-500/30 transition-all transform hover:scale-110 active:scale-95 flex items-center gap-2 cursor-pointer z-10"
          >
            <span>YES</span>
            <Heart className="w-5 h-5 fill-current text-white" />
          </button>
          <motion.button
            onMouseEnter={handleNoInteraction}
            onClick={handleNoInteraction}
            animate={{ x: coords.x, y: coords.y, rotate: rotation, scale: scale }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="py-3.5 px-8 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium rounded-xl border border-slate-700 cursor-pointer shadow-md"
          >
            No
          </motion.button>
        </div>
      </div>
    </div>
  );
}
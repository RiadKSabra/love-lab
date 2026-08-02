import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../../store/useAppStore';
import { Heart, Beaker, HelpCircle } from 'lucide-react';

type AnimationType = 'jump' | 'spin' | 'fly' | 'teleport' | 'shrink' | 'bounce';
const ANIMATIONS: AnimationType[] = ['jump', 'spin', 'fly', 'teleport', 'shrink', 'bounce'];

const FUNNY_MESSAGES = [
  'Really? 🥺',
  'Are you sure about that? 🔬',
  'Error 404: Option Not Found! 🚫',
  'Recalibrating lab metrics... 🧪',
  'Nice try, postdoc! 😉',
  'System override: YES is mandatory! ❤️',
];

export default function Chapter2Question() {
  const { setPhase } = useAppStore();
  const [animIndex, setAnimIndex] = useState(0);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleNoInteraction = (e: React.SyntheticEvent) => {
    e.stopPropagation();

    // Pick funny toast message
    const msg = FUNNY_MESSAGES[animIndex % FUNNY_MESSAGES.length];
    setToastMessage(msg);

    const currentAnim = ANIMATIONS[animIndex % ANIMATIONS.length];
    
    // Controlled offset ranges relative to its side-by-side starting spot
    const randomX = (Math.random() - 0.5) * 220;
    const randomY = (Math.random() - 0.5) * 220;

    switch (currentAnim) {
      case 'jump':
        setCoords({ x: randomX, y: -110 });
        break;
      case 'spin':
        setRotation((prev) => prev + 720);
        setCoords({ x: randomX, y: randomY });
        break;
      case 'fly':
        setCoords({ x: randomX > 0 ? 180 : -180, y: -120 });
        break;
      case 'teleport':
        setCoords({ x: randomX, y: randomY });
        break;
      case 'shrink':
        setScale((prev) => Math.max(prev * 0.7, 0.4));
        setCoords({ x: randomX, y: randomY });
        break;
      case 'bounce':
        setCoords({ x: randomX, y: 80 });
        break;
    }
    setAnimIndex((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-slate-100 p-6 overflow-hidden select-none relative">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Funny "Really?" Popup Toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-12 px-4 py-2 bg-purple-500/20 border border-purple-500/40 text-purple-300 font-mono text-xs rounded-full backdrop-blur-md shadow-lg shadow-purple-500/10 flex items-center gap-2 z-30"
          >
            <HelpCircle className="w-4 h-4 text-pink-400 animate-spin" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-md w-full bg-slate-900/80 border border-slate-800 rounded-2xl p-8 backdrop-blur-md shadow-2xl text-center space-y-6 relative z-10">
        
        {/* Header Icon */}
        <div className="inline-flex p-3 rounded-xl bg-purple-500/10 text-purple-400 mb-2 border border-purple-500/20 shadow-lg shadow-purple-500/10">
          <Beaker className="w-8 h-8 animate-pulse" />
        </div>
        
        <div className="space-y-1">
          <p className="text-xs font-mono uppercase tracking-widest text-purple-400">Chapter 2</p>
          <h2 className="text-2xl font-black text-white">Experiment #24</h2>
        </div>

        {/* Question Objective Box */}
        <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1">
          <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Objective</p>
          <p className="text-lg text-slate-200 font-medium leading-snug">
            Determine whether you still want to date me.
          </p>
        </div>

        {/* Side-by-Side Buttons Section */}
        <div className="flex items-center justify-center gap-4 pt-4 min-h-[80px] relative">
          
          {/* YES Button */}
          <button
            onClick={() => setPhase('success')}
            className="py-3.5 px-8 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold rounded-xl shadow-lg shadow-pink-500/30 transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer z-10"
          >
            <span>YES</span>
            <Heart className="w-5 h-5 fill-current text-white animate-bounce" />
          </button>

          {/* Slippery "NO" Button */}
          <motion.button
            onClick={handleNoInteraction}
            onTouchStart={handleNoInteraction}
            animate={{ x: coords.x, y: coords.y, rotate: rotation, scale: scale }}
            transition={{ type: 'spring', stiffness: 400, damping: 18 }}
            className="py-3.5 px-8 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium rounded-xl border border-slate-700 cursor-pointer shadow-md z-20"
          >
            No
          </motion.button>

        </div>

      </div>
    </div>
  );
}
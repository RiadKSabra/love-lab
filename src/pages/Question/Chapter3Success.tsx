import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useAppStore } from '../../store/useAppStore';
import { Sparkles } from 'lucide-react';

export default function Chapter3Success() {
  const { setPhase } = useAppStore();

  useEffect(() => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 7,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ec4899', '#f43f5e', '#a855f7'],
      });
      confetti({
        particleCount: 7,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ec4899', '#f43f5e', '#a855f7'],
      });

      if (Date.now() < animationEnd) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-slate-100 p-6">
      <div className="max-w-md w-full bg-slate-900/90 border border-pink-500/30 rounded-2xl p-8 backdrop-blur-md shadow-2xl text-center space-y-6">
        <div className="inline-flex p-4 rounded-full bg-pink-500/20 text-pink-400 border border-pink-500/40 animate-bounce">
          <Sparkles className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <p className="text-xs font-mono uppercase tracking-widest text-pink-400">Chapter 3</p>
          <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-400">
            Hypothesis Confirmed.
          </h1>
        </div>
        <p className="text-slate-300 font-medium">Data shows a 100% match rate. Preparing Laboratory Access...</p>
        <button
          onClick={() => setPhase('home')}
          className="w-full py-4 px-6 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg shadow-pink-500/20 transition-all cursor-pointer"
        >
          Enter Laboratory 🧪
        </button>
      </div>
    </div>
  );
}
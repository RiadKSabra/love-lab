import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { Microscope, ArrowRight } from 'lucide-react';

export default function Chapter1Intro() {
  const { setPhase } = useAppStore();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-slate-100 p-6">
      <div className="max-w-md w-full bg-slate-900/80 border border-slate-800 rounded-2xl p-8 backdrop-blur-md shadow-2xl text-center space-y-6">
        <div className="inline-flex p-4 rounded-full bg-pink-500/10 text-pink-400 mb-2 border border-pink-500/20">
          <Microscope className="w-10 h-10 animate-pulse" />
        </div>
        <div className="space-y-3">
          <p className="text-xs font-mono uppercase tracking-widest text-pink-400">Chapter 1</p>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">Hello, Doctor.</h1>
        </div>
        <p className="text-slate-300 text-lg leading-relaxed">
          I have an important experiment.
          <br />
          <span className="text-slate-400 font-medium">Would you participate?</span>
        </p>
        <button
          onClick={() => setPhase('question')}
          className="w-full py-4 px-6 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-pink-500/25 flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Continue</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
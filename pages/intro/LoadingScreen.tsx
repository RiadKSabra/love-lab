import React, { useEffect, useState } from 'react';
import { useAppStore } from '../../store/useAppStore';

export default function LoadingScreen() {
  const { setPhase } = useAppStore();
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setStep(1), 1000); // ❤️ Initializing Love.exe
    const timer2 = setTimeout(() => setStep(2), 2000); // Checking compatibility...

    // Fill progress bar
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 100);

    const timer3 = setTimeout(() => setStep(3), 4500); // Finding cutest biologist...
    const timer4 = setTimeout(() => setStep(4), 6000); // Found ✓ & Launching...

    const transitionTimer = setTimeout(() => {
      setPhase('intro');
    }, 7500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearInterval(interval);
      clearTimeout(transitionTimer);
    };
  }, [setPhase]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-green-400 font-mono p-6">
      <div className="w-full max-w-md space-y-4 text-left">
        {step >= 0 && <p className="animate-pulse">Loading...</p>}
        {step >= 1 && <p className="text-pink-400">❤️ Initializing Love.exe</p>}
        {step >= 2 && (
          <div>
            <p>Checking compatibility...</p>
            <div className="w-full bg-slate-800 rounded h-4 mt-2 overflow-hidden border border-slate-700">
              <div
                className="bg-pink-500 h-full transition-all duration-150 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-right text-xs mt-1 text-slate-400">{progress}%</p>
          </div>
        )}
        {step >= 3 && <p className="text-yellow-300">Finding cutest biologist...</p>}
        {step >= 4 && (
          <div className="text-emerald-400 font-bold space-y-1">
            <p>Found ✓</p>
            <p className="text-white animate-bounce mt-4">Launching...</p>
          </div>
        )}
      </div>
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../../store/useAppStore';
import { ArrowLeft, Gamepad2, Heart, Trophy, RefreshCw, Play, Sparkles } from 'lucide-react';

interface FallingItem {
  id: number;
  x: number;
  y: number;
  speed: number;
  type: 'heart' | 'flower' | 'virus';
  symbol: string;
}

export default function ArcadeSuite() {
  const { setActiveGame, unlockAchievement } = useAppStore();
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [basketX, setBasketX] = useState(50); // percentage
  const [items, setItems] = useState<FallingItem[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useState(0);

  // Game Loop
  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const interval = setInterval(() => {
      // Move items down
      setItems((prevItems) =>
        prevItems
          .map((item) => ({ ...item, y: item.y + item.speed }))
          .filter((item) => {
            // Check collision with basket (bottom of screen around y = 85 to 92)
            if (item.y >= 82 && item.y <= 92) {
              // Check if basketX (percentage) matches item x (percentage) within tolerance (e.g., ± 10%)
              if (Math.abs(item.x - basketX) < 10) {
                if (item.type === 'virus') {
                  setScore((s) => Math.max(0, s - 5));
                } else if (item.type === 'flower') {
                  setScore((s) => s + 3);
                } else {
                  setScore((s) => s + 1);
                }
                return false; // remove caught item
              }
            }
            return item.y < 100; // remove if hits bottom
          })
      );

      // Randomly spawn new items
      if (Math.random() < 0.3) {
        const randType = Math.random();
        let type: 'heart' | 'flower' | 'virus' = 'heart';
        let symbol = '❤️';

        if (randType > 0.75) {
          type = 'flower';
          symbol = '🌸';
        } else if (randType > 0.6) {
          type = 'virus';
          symbol = '🦠';
        }

        setItems((prev) => [
          ...prev,
          {
            id: Date.now() + Math.random(),
            x: Math.floor(Math.random() * 85) + 5,
            y: 0,
            speed: Math.random() * 1.5 + 1.2,
            type,
            symbol,
          },
        ]);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [isPlaying, gameOver, basketX]);

  // Check Win Condition (Score >= 15)
  useEffect(() => {
    if (score >= 15 && isPlaying) {
      setIsPlaying(false);
      setGameOver(true);
      unlockAchievement('beat_all_games');
      if (score > highScore) setHighScore(score);
    }
  }, [score, isPlaying, highScore, unlockAchievement]);

  const startGame = () => {
    setScore(0);
    setItems([]);
    setGameOver(false);
    setIsPlaying(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPos = ((e.clientX - rect.left) / rect.width) * 100;
    setBasketX(Math.max(5, Math.min(95, xPos)));
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const xPos = ((e.touches[0].clientX - rect.left) / rect.width) * 100;
    setBasketX(Math.max(5, Math.min(95, xPos)));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 flex flex-col items-center justify-center relative overflow-hidden select-none">
      
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Back Button */}
      <button
        onClick={() => setActiveGame(null)}
        className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2.5 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 rounded-xl text-slate-300 hover:text-white transition-all backdrop-blur-md cursor-pointer shadow-lg z-20"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Lab</span>
      </button>

      <div className="max-w-2xl w-full space-y-6 relative z-10 my-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-1 shadow-lg shadow-cyan-500/10">
            <Gamepad2 className="w-8 h-8 animate-pulse" />
          </div>
          <h1 className="text-3xl font-black tracking-tight text-white">
            Arcade Suite: Catch the Love
          </h1>
          <p className="text-slate-400 text-xs md:text-sm max-w-md mx-auto leading-relaxed">
            Catch 15 Hearts & Flowers with your lab beaker. Avoid the bug viruses (<span className="text-rose-400 font-mono">🦠</span>)!
          </p>
        </div>

        {/* Game Arena */}
        <div
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          className="relative w-full h-[380px] md:h-[420px] bg-slate-950/90 border border-cyan-500/30 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl cursor-none"
        >
          {/* Top Score Tracker */}
          <div className="absolute top-4 left-6 right-6 flex items-center justify-between z-20 font-mono text-xs">
            <span className="bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-lg text-cyan-400">
              SCORE: <strong className="text-white text-sm">{score} / 15</strong>
            </span>
            <span className="bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-lg text-yellow-400">
              HIGH SCORE: <strong className="text-white text-sm">{highScore}</strong>
            </span>
          </div>

          {/* Falling Items */}
          {isPlaying &&
            items.map((item) => (
              <div
                key={item.id}
                style={{ top: `${item.y}%`, left: `${item.x}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 text-2xl md:text-3xl transition-all pointer-events-none"
              >
                {item.symbol}
              </div>
            ))}

          {/* Lab Beaker / Basket */}
          {isPlaying && (
            <div
              style={{ left: `${basketX}%` }}
              className="absolute bottom-4 -translate-x-1/2 w-20 h-10 bg-gradient-to-t from-cyan-500/40 to-blue-500/20 border-2 border-cyan-400/80 rounded-b-2xl flex items-center justify-center shadow-lg shadow-cyan-500/30 backdrop-blur-sm"
            >
              <span className="text-[10px] font-mono font-bold text-cyan-200 tracking-wider">
                BEAKER
              </span>
            </div>
          )}

          {/* Start Screen Overlay */}
          {!isPlaying && !gameOver && (
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center space-y-4 z-30 p-6 text-center">
              <h2 className="text-2xl font-black text-white">Ready for Calibration?</h2>
              <p className="text-xs text-slate-400 max-w-xs">
                Move your mouse or finger across the screen to guide the beaker and collect relationship metrics.
              </p>
              <button
                onClick={startGame}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold rounded-xl shadow-lg transition-all cursor-pointer text-xs uppercase font-mono tracking-wider flex items-center gap-2"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Start Experiment 🧪</span>
              </button>
            </div>
          )}

          {/* Win / Game Over Screen Overlay */}
          {gameOver && (
            <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center space-y-4 z-30 p-6 text-center">
              <div className="p-3 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-2xl">
                <Sparkles className="w-8 h-8 animate-bounce" />
              </div>
              <h2 className="text-2xl font-black text-white">Experiment Successful!</h2>
              <p className="text-xs text-slate-300 max-w-xs">
                You collected enough data points. Relationship stability verified at 100%!
              </p>
              <button
                onClick={startGame}
                className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold rounded-xl shadow-lg transition-all cursor-pointer text-xs uppercase font-mono tracking-wider flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Play Again 🎮</span>
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
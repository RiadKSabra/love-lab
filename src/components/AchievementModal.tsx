import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../store/useAppStore';
import { Trophy, CheckCircle2, Lock, Sparkles, X, HeartHandshake } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function AchievementModal({ isOpen, onClose }: Props) {
  const { achievements } = useAppStore();
  const achievementList = Object.values(achievements);
  const unlockedCount = achievementList.filter((a) => a.unlocked).length;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="max-w-xl w-full bg-slate-900 border border-yellow-500/30 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl relative max-h-[85vh] overflow-y-auto select-none"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 rounded-2xl">
                  <Trophy className="w-7 h-7 animate-pulse" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white">Laboratory Badges</h2>
                  <p className="text-xs font-mono text-slate-400">
                    {unlockedCount} / {achievementList.length} Unlocked
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Achievement Grid */}
            <div className="space-y-3">
              {achievementList.map((badge) => (
                <div
                  key={badge.id}
                  className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                    badge.unlocked
                      ? 'bg-slate-950/80 border-yellow-500/30 text-slate-200 shadow-lg shadow-yellow-500/5'
                      : badge.secret
                      ? 'bg-gradient-to-r from-purple-950/40 to-slate-950/60 border-purple-500/40 text-purple-300'
                      : 'bg-slate-950/40 border-slate-800/80 text-slate-500 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2.5 rounded-xl text-xl ${
                        badge.unlocked
                          ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                          : badge.secret
                          ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30 animate-pulse'
                          : 'bg-slate-900 border border-slate-800 text-slate-600'
                      }`}
                    >
                      {badge.unlocked ? (
                        '🏆'
                      ) : badge.secret ? (
                        <HeartHandshake className="w-5 h-5" />
                      ) : (
                        <Lock className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white flex items-center gap-2">
                        {badge.title}
                        {badge.unlocked && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        )}
                      </h3>
                      <p className="text-xs text-slate-400">{badge.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Vault Hint Footer */}
            <div className="p-4 bg-slate-950/90 border border-purple-500/30 rounded-2xl text-center space-y-1">
              <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest flex items-center justify-center gap-1">
                <Sparkles className="w-3 h-3 animate-spin" /> Vault #99 Access Protocol
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                Vault #99 is still locked.  Complete all achievements to decrypt the master key!
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
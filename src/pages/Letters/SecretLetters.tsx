import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../../store/useAppStore';
import { ArrowLeft, Mail, FileText, Lock, Unlock, Sparkles, Heart } from 'lucide-react';

interface Letter {
  id: string;
  codeName: string;
  title: string;
  date: string;
  classification: string;
  excerpt: string;
  content: string;
  read: boolean;
}

const INITIAL_LETTERS: Letter[] = [
  {
    id: 'report-01',
    codeName: 'EXP-01',
    title: 'Long-Term Effects of Exposure to Riad',
    date: 'Lab Log #001',
    classification: 'TOP SECRET / EYES ONLY',
    excerpt: 'Initial observations suggest irreversible heart rate spikes and elevated serotonin levels upon close proximity...',
    content: `Abstract:
This paper documents the longitudinal study of Subject riri when exposed to continuous doses of riri's presence.

Key Findings:
1. Cardiac Response: Immediate 40% increase in heart rate when scratching the back.
2. Neurological Impact: Laughter levels exceed normal laboratory parameters.
3. Conclusion: The subject has zero desire to seek a antidote. Exposure will continue indefinitely.

Personal Note:
From the very first day we met, you became my favorite experiment. I love watching you do your research, but my favorite discovery will always be you.`,
    read: false,
  },
  {
    id: 'report-02',
    codeName: 'EXP-02',
    title: 'Biochemical Analysis of Her Smile',
    date: 'Lab Log #042',
    classification: 'RESTRICTED ACCESS',
    excerpt: 'Spectrometric analysis confirms a 100% reduction in stress and instant mood elevation...',
    content: `Subject Observation:
Whenever you smile at me after a long day in the lab, all my stress instantly vanishes.

Data Analysis:
- Dopamine Release: Maximum
- Oxytocin Levels: Off the charts
- Mood Improvement: Immediate

You work so hard every day as a postdoc, and I am so ridiculously proud of everything you accomplish. Never forget how brilliant and loved you are.`,
    read: false,
  },
  {
    id: 'report-03',
    codeName: 'EXP-03',
    title: 'Hypothesis on Our Future Together',
    date: 'Lab Log #100',
    classification: 'CLASSIFIED LOVE NOTE',
    excerpt: 'Predictive modeling indicates a 100% probability of lifelong happiness, and endless coffee in the morning, accompanied with forced water drinking and arguile..',
    content: `Future Trajectory Model:
All computational simulations point to a single deterministic outcome: a life filled with endless late-night chats, favorite meals, and unconditional love.

Hypothesis:
No matter where life or research takes us, as long as I am with you, I am home.

Thank you for being my partner, my best friend, and my favorite scientist. I love you more than words or data can ever measure!`,
    read: false,
  },
];

export default function SecretLetters() {
  const { setActiveGame, unlockAchievement } = useAppStore();
  const [letters, setLetters] = useState<Letter[]>(INITIAL_LETTERS);
  const [activeLetter, setActiveLetter] = useState<Letter | null>(null);

  const handleOpenLetter = (letter: Letter) => {
    setActiveLetter(letter);

    // Mark as read
    const updated = letters.map((l) =>
      l.id === letter.id ? { ...l, read: true } : l
    );
    setLetters(updated);

    // Check if all letters are read to unlock achievement
    if (updated.every((l) => l.read)) {
      unlockAchievement('read_all_letters');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 flex flex-col items-center justify-center relative overflow-hidden select-none">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Back Button */}
      <button
        onClick={() => setActiveGame(null)}
        className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2.5 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 rounded-xl text-slate-300 hover:text-white transition-all backdrop-blur-md cursor-pointer shadow-lg z-20"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Lab</span>
      </button>

      <div className="max-w-4xl w-full space-y-8 relative z-10 my-12">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex p-3 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-1 shadow-lg shadow-amber-500/10">
            <Mail className="w-9 h-9 animate-pulse" />
          </div>
          <h1 className="text-3xl font-black tracking-tight text-white">
            Classified Secret Letters
          </h1>
          <p className="text-slate-400 text-xs md:text-sm max-w-md mx-auto leading-relaxed">
            Encrypted lab reports and confidential love notes. Click any file to decrypt and read.
          </p>
        </div>

        {/* Letters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {letters.map((letter) => (
            <motion.div
              key={letter.id}
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleOpenLetter(letter)}
              className={`p-6 rounded-2xl border backdrop-blur-md transition-all cursor-pointer flex flex-col justify-between h-72 relative ${
                letter.read
                  ? 'bg-slate-900/70 border-rose-500/40 shadow-rose-500/10'
                  : 'bg-slate-900/90 border-amber-500/40 shadow-amber-500/10'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    {letter.codeName}
                  </span>
                  {letter.read ? (
                    <Unlock className="w-4 h-4 text-rose-400" />
                  ) : (
                    <Lock className="w-4 h-4 text-amber-400" />
                  )}
                </div>

                <h2 className="text-lg font-bold text-white mb-1 line-clamp-2">
                  {letter.title}
                </h2>
                <p className="text-[10px] font-mono text-slate-500 mb-3">{letter.date}</p>
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                  {letter.excerpt}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
                <span className={letter.read ? 'text-rose-400 font-semibold' : 'text-amber-400 font-semibold'}>
                  {letter.read ? 'UNLOCKED ✓' : 'DECRYPT FILE'}
                </span>
                <FileText className="w-4 h-4 text-slate-500" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Expanded Letter Modal */}
      <AnimatePresence>
        {activeLetter && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="max-w-2xl w-full bg-slate-900 border border-amber-500/30 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl relative max-h-[85vh] overflow-y-auto"
            >
              {/* Header Badge */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <p className="text-[10px] font-mono text-amber-400 tracking-widest uppercase">
                    {activeLetter.classification}
                  </p>
                  <h2 className="text-2xl font-black text-white mt-1">
                    {activeLetter.title}
                  </h2>
                </div>
                <button
                  onClick={() => setActiveLetter(null)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-mono cursor-pointer"
                >
                  CLOSE [X]
                </button>
              </div>

              {/* Letter Content */}
              <div className="text-slate-300 text-sm leading-relaxed font-sans whitespace-pre-line space-y-4 bg-slate-950/60 p-6 rounded-2xl border border-slate-800">
                {activeLetter.content}
              </div>

              {/* Lab Seal Footer */}
              <div className="flex items-center justify-between pt-2 text-xs font-mono text-slate-500">
                <span className="flex items-center gap-1 text-rose-400">
                  <Heart className="w-4 h-4 fill-current" /> Thèse de doctorat
                </span>
                <span>  Soutenue à Aix-Marseille Univeristé le 23 Nov 2023 (Spécialité : Maladies infectueuses)</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
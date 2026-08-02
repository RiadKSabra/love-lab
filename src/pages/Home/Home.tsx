import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../../store/useAppStore';
import AchievementModal from '../../components/AchievementModal';
import {
  Dna,
  Camera,
  Gamepad2,
  Mail,
  Sparkles,
  Lock,
  Trophy,
  Flower2,
  Atom,
} from 'lucide-react';

interface LabDoor {
  id: string;
  title: string;
  category: string;
  icon: React.ElementType;
  color: string;
  borderColor: string;
  locked: boolean;
  description: string;
}

const LAB_DOORS: LabDoor[] = [
  {
    id: 'dna-builder',
    title: 'DNA Builder',
    category: 'MINI-GAME',
    icon: Dna,
    color: 'from-pink-500/20 to-rose-500/20 text-pink-400',
    borderColor: 'border-pink-500/30 hover:border-pink-500/60',
    locked: false,
    description: 'Repair the broken DNA strand to stabilize relationship metrics.',
  },
  {
    id: 'memories',
    title: 'Memory Gallery',
    category: 'ARCHIVE',
    icon: Camera,
    color: 'from-purple-500/20 to-indigo-500/20 text-purple-400',
    borderColor: 'border-purple-500/30 hover:border-purple-500/60',
    locked: false,
    description: 'Browse through documented timeline photo logs.',
  },
  {
    id: 'games',
    title: 'Arcade Suite',
    category: 'TESTING',
    icon: Gamepad2,
    color: 'from-cyan-500/20 to-blue-500/20 text-cyan-400',
    borderColor: 'border-cyan-500/30 hover:border-cyan-500/60',
    locked: false,
    description: 'Play Catch the Hearts & Flowers.',
  },
  {
    id: 'letters',
    title: 'Secret Letters',
    category: 'CLASSIFIED',
    icon: Mail,
    color: 'from-amber-500/20 to-rose-500/20 text-amber-400',
    borderColor: 'border-amber-500/30 hover:border-amber-500/60',
    locked: false,
    description: 'Encrypted lab notes and long-form love letters.',
  },
  {
    id: 'stars',
    title: 'Star Observatory',
    category: 'RESEARCH',
    icon: Sparkles,
    color: 'from-emerald-500/20 to-teal-500/20 text-emerald-400',
    borderColor: 'border-emerald-500/30 hover:border-emerald-500/60',
    locked: false,
    description: 'Map out love constellations in the night sky.',
  },
  {
    id: 'secret-ending',
    title: 'CLASSIFIED #99',
    category: 'VAULT',
    icon: Lock,
    color: 'from-purple-900/30 to-slate-900/40 text-purple-400',
    borderColor: 'border-purple-500/40 hover:border-purple-500/80',
    locked: true,
    description: 'Requires 100% achievement unlock rate to decrypt final proposal protocol.',
  },
];

export default function Home() {
  const { achievements, unlockAchievement, setActiveGame } = useAppStore();
  const [selectedDoor, setSelectedDoor] = useState<string | null>(null);
  const [flowerClicks, setFlowerClicks] = useState(0);
  const [isAchievementModalOpen, setIsAchievementModalOpen] = useState(false);
  const [showVaultAlert, setShowVaultAlert] = useState(false);

  const unlockedCount = Object.values(achievements).filter((a) => a.unlocked).length;
  const totalCount = Object.keys(achievements).length;

  const handleFlowerClick = () => {
    const nextCount = flowerClicks + 1;
    setFlowerClicks(nextCount);
    if (nextCount >= 3) {
      unlockAchievement('flower_clicker');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-10 relative z-10">
        
        {/* Top Laboratory Bar */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-slate-900/70 border border-slate-800 rounded-2xl backdrop-blur-md shadow-xl">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-pink-400 font-mono text-xs uppercase tracking-widest">
              <Atom className="w-4 h-4 animate-spin" />
              <span>Bio-Romantic Research Division</span>
            </div>
            <h1 className="text-3xl font-black text-white flex items-center gap-2">
              ❤️ Our Laboratory ❤️
            </h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Flower Easter Egg */}
            <button
              onClick={handleFlowerClick}
              className="p-2.5 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/80 rounded-xl text-pink-400 transition-all cursor-pointer relative"
              title="Click the lab flora"
            >
              <Flower2 className="w-5 h-5 animate-pulse" />
              {flowerClicks > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-[10px] font-mono px-1.5 py-0.5 rounded-full">
                  {flowerClicks}
                </span>
              )}
            </button>

            {/* Achievement Badge Button (Opens Modal!) */}
            <button
              onClick={() => setIsAchievementModalOpen(true)}
              className="flex items-center gap-3 px-4 py-2 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/80 rounded-xl transition-all cursor-pointer shadow-lg"
            >
              <Trophy className="w-5 h-5 text-yellow-400 animate-pulse" />
              <div className="text-left">
                <p className="text-[10px] font-mono text-slate-400 uppercase">Achievements</p>
                <p className="text-xs font-bold text-slate-200">
                  {unlockedCount} / {totalCount} Unlocked
                </p>
              </div>
            </button>
          </div>
        </header>

        {/* Laboratory Doors Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {LAB_DOORS.map((door) => {
            const Icon = door.icon;
            return (
              <motion.div
                key={door.id}
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  if (!door.locked) {
                    setSelectedDoor(door.id);
                    setActiveGame(door.id);
                  } else {
                    setShowVaultAlert(true);
                  }
                }}
                className={`p-6 rounded-2xl bg-gradient-to-br ${door.color} border ${door.borderColor} backdrop-blur-md shadow-lg transition-all flex flex-col justify-between h-56 cursor-pointer`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono font-semibold tracking-wider uppercase bg-slate-950/40 px-2.5 py-1 rounded-md border border-white/5">
                      {door.category}
                    </span>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h2 className="text-xl font-bold text-white mb-2">{door.title}</h2>
                  <p className="text-xs text-slate-300/80 leading-relaxed">
                    {door.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-medium">
                  {door.locked ? (
                    <span className="text-purple-300 font-mono flex items-center gap-1">
                      🔒 Classified Vault (Locked)
                    </span>
                  ) : (
                    <span className="text-white/90 hover:underline flex items-center gap-1">
                      Access Chamber &rarr;
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </section>

        {/* Floating Biology Love Note */}
        <footer className="p-4 bg-slate-900/40 border border-slate-800/80 rounded-xl text-center text-xs text-slate-400 font-mono">
          🧪 Hypothesis: Exposure to Riad produces 100% sustained happiness levels over long-term trials.
        </footer>

      </div>

      {/* Achievement List Popup Modal */}
      <AchievementModal
        isOpen={isAchievementModalOpen}
        onClose={() => setIsAchievementModalOpen(false)}
      />

      {/* Locked Vault Warning Alert */}
      <AnimatePresence>
        {showVaultAlert && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="max-w-md w-full bg-slate-900 border border-purple-500/40 rounded-3xl p-6 text-center space-y-4 shadow-2xl"
            >
              <div className="p-3 bg-purple-500/10 text-purple-400 rounded-full w-12 h-12 mx-auto flex items-center justify-center border border-purple-500/20">
                <Lock className="w-6 h-6 animate-pulse" />
              </div>
              <h2 className="text-xl font-black text-white">Vault #99 Encrypted</h2>
              <p className="text-xs text-slate-300 leading-relaxed font-mono">
                &ldquo;Master Access Token missing. Complete all laboratory experiments & decrypt the hidden secret badge to unlock this vault.&rdquo;
              </p>
              <button
                onClick={() => setShowVaultAlert(false)}
                className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-mono font-bold rounded-xl transition-all cursor-pointer"
              >
                Return to Experiments
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
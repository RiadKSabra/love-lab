import { create } from 'zustand';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
  secret?: boolean;
}

interface AppStore {
  phase: 'loading' | 'intro' | 'question' | 'success' | 'home';
  activeGameId: string | null;
  achievements: Record<string, Achievement>;
  setPhase: (phase: 'loading' | 'intro' | 'question' | 'success' | 'home') => void;
  setActiveGame: (gameId: string | null) => void;
  unlockAchievement: (id: string) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  phase: 'loading',
  activeGameId: null,
  achievements: {
    dna_fixed: {
      id: 'dna_fixed',
      title: 'Genetic Match',
      description: 'Stabilized relationship DNA mechanics.',
      unlocked: true,
    },
    read_all_letters: {
      id: 'read_all_letters',
      title: 'Hopeless Romantic',
      description: 'Decrypted all classified lab love letters.',
      unlocked: false,
    },
    stargazer: {
      id: 'stargazer',
      title: 'Stargazer',
      description: 'Mapped all 3 constellations in the night sky.',
      unlocked: false,
    },
    flower_clicker: {
      id: 'flower_clicker',
      title: 'Botanical Curiosity',
      description: 'Discovered the hidden flora Easter Egg in the lab.',
      unlocked: false,
    },
    beat_all_games: {
      id: 'beat_all_games',
      title: 'Lab Calibrator',
      description: 'Scored 15 points in the Arcade Suite.',
      unlocked: false,
    },
    secret_proposal: {
      id: 'secret_proposal',
      title: '??? Classified Master Key',
      description: 'Decrypt the heart\'s ultimate frequency to unlock Vault #99.',
      unlocked: false,
      secret: true,
    },
  },

  setPhase: (phase) => set({ phase }),
  setActiveGame: (activeGameId) => set({ activeGameId }),
  unlockAchievement: (id) =>
    set((state) => ({
      achievements: {
        ...state.achievements,
        [id]: { ...state.achievements[id], unlocked: true },
      },
    })),
}));
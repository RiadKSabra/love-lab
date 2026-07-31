import { create } from 'zustand';

export type AppPhase = 'loading' | 'intro' | 'question' | 'success' | 'home' | 'minigame';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
}

interface AppStore {
  // Phase & Navigation
  phase: AppPhase;
  activeGameId: string | null;
  setPhase: (phase: AppPhase) => void;
  setActiveGame: (gameId: string | null) => void;

  // Sound State
  isPlayingMusic: boolean;
  setIsPlayingMusic: (playing: boolean) => void;

  // Achievements State
  achievements: Record<string, Achievement>;
  unlockAchievement: (id: string) => void;
  noButtonAttempts: number;
  incrementNoAttempts: () => void;
}

export const useAppStore = create<AppStore>((set) => ({
  phase: 'loading',
  activeGameId: null,
  setPhase: (phase) => set({ phase }),
  setActiveGame: (activeGameId) => set({ activeGameId }),

  isPlayingMusic: false,
  setIsPlayingMusic: (isPlayingMusic) => set({ isPlayingMusic }),

  noButtonAttempts: 0,
  incrementNoAttempts: () =>
    set((state) => {
      const nextCount = state.noButtonAttempts + 1;
      if (nextCount >= 20 && state.achievements['no_20'] && !state.achievements['no_20'].unlocked) {
        // Automatically unlock achievement on 20 attempts
        return {
          noButtonAttempts: nextCount,
          achievements: {
            ...state.achievements,
            no_20: { ...state.achievements['no_20'], unlocked: true },
          },
        };
      }
      return { noButtonAttempts: nextCount };
    }),

  achievements: {
    flower_clicker: { id: 'flower_clicker', title: 'Botanist', description: 'Clicked every flower', unlocked: false },
    no_20: { id: 'no_20', title: 'Persistent', description: 'Tried clicking No 20 times', unlocked: false },
    time_10m: { id: 'time_10m', title: 'Lab Assistant', description: 'Stayed in the lab for 10 minutes', unlocked: false },
    hidden_heart: { id: 'hidden_heart', title: 'Eagle Eye', description: 'Found the hidden heart', unlocked: false },
    read_all_letters: { id: 'read_all_letters', title: 'Hopeless Romantic', description: 'Read every letter', unlocked: false },
    beat_all_games: { id: 'beat_all_games', title: 'Master Chemist', description: 'Beat every mini-game', unlocked: false },
  },

  unlockAchievement: (id) =>
    set((state) => ({
      achievements: {
        ...state.achievements,
        [id]: { ...state.achievements[id], unlocked: true },
      },
    })),
}));
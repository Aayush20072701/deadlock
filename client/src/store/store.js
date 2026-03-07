import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      user:  null,
      token: null,
      setAuth:   (user, token) => set({ user, token }),
      clearAuth: ()            => set({ user: null, token: null }),
    }),
    { name: 'deadlock-auth' }
  )
);

export const useBattleStore = create((set) => ({
  roomId: null, matchId: null, problem: null, opponent: null, endsAt: null,
  myCode: '', myLanguage: 'python', myScore: 0, myTestsPassed: 0, wrongSubmissions: 0, lastPowerupAt: null,
  opponentScore: 0, opponentTestsPassed: 0, opponentLastActivity: null,
  fogActive: false, freezeActive: false,
  isJudging: false, submitResult: null,
  battleStatus: 'idle', // idle | queuing | active | ended
  matchResult: null,

  setBattle:       (data)   => set(data),
  setCode:         (code)   => set({ myCode: code }),
  setLanguage:     (lang)   => set({ myLanguage: lang }),
  setFog:          (v)      => set({ fogActive: v }),
  setFreeze:       (v)      => set({ freezeActive: v }),
  setJudging:      (v)      => set({ isJudging: v }),
  setSubmitResult: (result) => set({ submitResult: result }),
  resetBattle: () => set({
    roomId: null, matchId: null, problem: null, opponent: null, endsAt: null,
    myCode: '', myScore: 0, myTestsPassed: 0, wrongSubmissions: 0, lastPowerupAt: null,
    opponentScore: 0, opponentTestsPassed: 0, opponentLastActivity: null,
    fogActive: false, freezeActive: false,
    isJudging: false, submitResult: null, battleStatus: 'idle', matchResult: null,
  }),
}));

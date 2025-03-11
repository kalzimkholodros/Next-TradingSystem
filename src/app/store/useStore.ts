import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UserCoin {
  coinId: string;
  amount: number;
}

interface User {
  id: string;
  name: string;
  email: string;
  balance: number;
  coins: UserCoin[];
}

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const useStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
    }),
    {
      name: 'auth-storage',
    }
  )
); 
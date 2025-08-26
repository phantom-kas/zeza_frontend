// src/store/auth.ts
import { create } from 'zustand'

interface AuthState {
  user: null | { id: string; name: string }
  login: (user: { id: string; name: string }) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
}))

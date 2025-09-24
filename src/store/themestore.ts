import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Theme = 'light' | 'dark'

interface ThemeState {
  theme: Theme
  toggleTheme: () => void
  isDark: () => boolean;
  setTheme: (theme: Theme) => void
}

export const useThemeStore = create<ThemeState>()(

  persist(

    (set, get) => ({
      isDark: () => get().theme === 'dark',
      theme: 'light',
      toggleTheme: () => {
        const next = get().theme === 'light' ? 'dark' : 'light'
        set({ theme: next })
        document.documentElement.classList.toggle('dark', next === 'dark')
      },
      setTheme: (theme) => {
        set({ theme })
        document.documentElement.classList.toggle('dark', theme === 'dark')
      },
    }),
    {
      name: 'theme-storage', // key in localStorage
    }
  )
)

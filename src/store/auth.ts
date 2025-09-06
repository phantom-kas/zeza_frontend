import { create } from 'zustand'
import axios from 'axios'

interface User {
  id: string
  name: string
}

interface AuthState {
  user: User | null
  login: (credentials: { email: string; password: string }) => Promise<void>
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,

  // ✅ Async login with Axios
  login: async (credentials) => {
    try {
      const res = await axios.post('/api/login', credentials)

      // Example: backend returns { user, token }
      const { user, token } = res.data

      // Save token (e.g., in localStorage)
      localStorage.setItem('token', token)

      // Update Zustand state
      set({ user })
    } catch (err: any) {
      console.error('Login failed:', err.response?.data || err.message)
      throw err // so the component can handle it
    }
  },

  logout: () => {
    // Clear token
    localStorage.removeItem('token')

    // Clear user
    set({ user: null })
  },
}))

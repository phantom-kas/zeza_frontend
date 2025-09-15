import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "../lib/axios";
// import { useToastStore } from "./toast";


interface User {
  id: string;
  name: string;
  image: string,
  email: string
}

interface AuthState {
  user: User | null;
  token: string | null;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  setToken: (token: string | null) => void;
  setUser: (user: User) => void
}


export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setToken: (token) => set({ token }),
      login: async (credentials) => {
        const res = await axios.post("/login", credentials, {
          _showAllMessages: true,
          _noRefresh: true,
        });

        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaa");
        console.log(res);
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaa");

        if (res.data.status !== "success") {
          // alerts.addToast("Error", "error", "s");
          return;
        }

        const { user, access_token } = res.data.data;

        // Save token in localStorage (manual)

        set({ token: access_token });

        // Update Zustand state (persist will also save this `user` to localStorage)
        set({ user });
      },

      logout: () => {
        set({ token: null });

        set({ user: null });
      },
      setUser: (user) => {
        set({ user });
      }
    }),

    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user, token: state.token }),
    }
  )
);

// src/store/uiStore.ts
import { create } from "zustand"

interface UIState {
  loading: boolean
  loading2: boolean
  isUploading: boolean
  uploadProgress: number
  duration: number
  min: string
  showSuccess: boolean

  // getters (as computed selectors)
  isLoading: () => boolean
  getIsUploading: () => boolean
  isLoading2: () => boolean
  getDuration: () => number

  // actions
  showUploading: () => void
  start: () => void
  start2: () => void
  stop: () => void
  stop2: () => void
  alertSuccess: () => void
}

export const useLoaderStore = create<UIState>((set, get) => ({
  loading: false,
  loading2: false,
  isUploading: false,
  uploadProgress: 0,
  duration: 200,
  min: "dsadas",
  showSuccess: false,

  // getters
  isLoading: () => get().loading,
  getIsUploading: () => get().isUploading,
  isLoading2: () => get().loading2,
  getDuration: () => get().duration,

  // actions
  showUploading: () => set({ isUploading: true }),

  start: () => set({ loading: true }),
  start2: () => set({ loading2: true }),

  stop: () => set({ loading: false }),
  stop2: () => set({ loading2: false }),

  alertSuccess: () => {
    set({ showSuccess: true })
    setTimeout(() => set({ showSuccess: false }), 2000)
  },
}))

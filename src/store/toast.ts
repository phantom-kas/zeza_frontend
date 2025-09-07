import { create } from "zustand";

export type ToastStatus = "success" | "error" | "info" | "warning";

export interface Toast {
  id: string;
  message: string;
  status: ToastStatus;
  duration?: number;
}

interface ToastState {
  toasts: Toast[];
  addToast: (message: string, status: ToastStatus, duration?: number) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;
}

export const useToastStore = create<ToastState>((set, get) => ({
  toasts: [
    // {
    //   id: "16",
    //   message: "Error",
    //   status: "error",
    // },
    // {
    //   id: "14",
    //   message: "Error",
    //   status: "warning",
    // },
    // {
    //   id: "11",
    //   message: "Error",
    //   status: "info",
    // },
    // {
    //   id: "12",
    //   message: "Error",
    //   status: "success",
    // },
  ],

  addToast: (message, status, duration = 3000) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: Toast = { id, message, status, duration };

    set((state) => ({
      toasts: [...state.toasts, newToast],
    }));

    if (duration > 0) {
      setTimeout(() => {
        get().removeToast(id);
      }, duration);
    }
  },

  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),

  clearToasts: () => set({ toasts: [] }),
}));

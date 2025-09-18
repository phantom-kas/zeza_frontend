// stores/cart.ts
import { create } from "zustand";

type settings = {
  call_to_action_text?: string;
  hero_text?: string;
  allow_checkout?:number

};


type ss = {
  settings: settings;
  setSettings: (count: settings) => void;
};

export const useSettingsStore = create<ss>((set) => ({
  settings: {allow_checkout:1},
  setSettings: (settings: any) => set({ settings }),
}));

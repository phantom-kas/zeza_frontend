// stores/cart.ts
import { create } from "zustand";





type CartStore = {
  categories: any[];
  brands: any[];
  setCategories: (categories: any[]) => void;
  setItemsBrands: (brands: any[]) => void;
};

export const useProductsPageStore = create<CartStore>((set) => ({
  categories: [],
  brands: [],
  setCategories: (categories: any[]) => set({ categories }),
  setItemsBrands: (brands: any[]) => set({ brands }),
}));

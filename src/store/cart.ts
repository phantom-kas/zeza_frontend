// stores/cart.ts
import { create } from "zustand";

type Product = {
  name: string;
  description: string;
  price: number;
  new?: boolean;
  image: { src: string; alt?: string };
};

type CartItem = {
  product: Product;
  quantity: number;
};

type CartStore = {
  items: CartItem[];
  itemsCount: number;
  setItems: (items: CartItem[]) => void;
  setItemsCount: (count: number) => void;
};

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  itemsCount: 0,
  setItems: (items: any) => set({ items }),
  setItemsCount: (count: number) => set({ itemsCount: count }),
}));

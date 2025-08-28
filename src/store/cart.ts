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
  increment: (product: Product, quantity: number) => void;
};

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  itemsCount: 0,

  increment: (product, quantity) => {
    set((state) => {
      // check if product already exists
      const existingIndex = state.items.findIndex(
        (item) => item.product.name === product.name
      );

      let newItems: CartItem[];
      if (existingIndex >= 0) {
        // update quantity
        newItems = [...state.items];
        newItems[existingIndex].quantity += quantity;
      } else {
        // add new product
        newItems = [...state.items, { product, quantity }];
      }

      return {
        items: newItems,
        itemsCount: newItems.reduce(
          (total, item) => total + item.quantity,
          0
        ),
      };
    });
  },
}));

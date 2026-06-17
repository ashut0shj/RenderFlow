import { create } from 'zustand';

export interface CartState {
  items: Record<string, number>;
  addItem: (id: string, quantity?: number) => void;
  removeItem: (id: string) => void;
  getQuantity: (id: string) => number;
  totalCount: number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: {},
  totalCount: 0,
  addItem: (id: string, quantity = 1) => {
    set((state) => {
      const currentQty = state.items[id] || 0;
      const newQty = currentQty + quantity;
      const newItems = { ...state.items, [id]: newQty };
      const newTotal = Object.values(newItems).reduce((sum, qty) => sum + qty, 0);
      return {
        items: newItems,
        totalCount: newTotal,
      };
    });
  },
  removeItem: (id: string) => {
    set((state) => {
      const currentQty = state.items[id] || 0;
      if (currentQty <= 0) return state;
      const newItems = { ...state.items };
      if (currentQty <= 1) {
        delete newItems[id];
      } else {
        newItems[id] = currentQty - 1;
      }
      const newTotal = Object.values(newItems).reduce((sum, qty) => sum + qty, 0);
      return {
        items: newItems,
        totalCount: newTotal,
      };
    });
  },
  getQuantity: (id: string) => {
    return get().items[id] || 0;
  },
}));

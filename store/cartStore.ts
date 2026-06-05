import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useEffect, useState } from 'react';

export interface Product {
  _id?: string;
  id?: string;
  name?: string;
  title?: string;
  price?: number;
  offerPrice?: number;
  quantity?: number;
  qty?: number;
  imageUrl?: string;
  image?: string; // 🚀 ADDED: Component compatibility ke liye
  images?: string[];
  brand?: string;
}

interface CartState {
  items: Product[];
  _hasHydrated: boolean;
  addItem: (item: Product) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  setHasHydrated: (state: boolean) => void;
  syncWithDb: () => Promise<void>;
  setCartFromServer: (serverCart: Product[]) => void;
}

// 🚀 THE ULTIMATE MASTER FIX: Bulletproof Normalizer
// Ye UI ke har crash ko rokega, chahe data kahin se bhi aaye
const normalizeItem = (item: any) => {
  const resolvedId = item.id || item._id;
  const resolvedPrice = Number(item.offerPrice || item.price || 0);
  const resolvedQty = Number(item.quantity || item.qty || 1);
  const resolvedImage = item.image || item.imageUrl || (item.images && item.images[0]) || '';
  const resolvedName = item.name || item.title || 'Essential Timepiece';

  return {
    ...item,
    id: resolvedId,
    _id: resolvedId,
    price: resolvedPrice,
    quantity: resolvedQty,
    qty: resolvedQty, // Double mapping taaki koi bhi UI component crash na ho
    imageUrl: resolvedImage,
    image: resolvedImage, // Double mapping for image formats
    name: resolvedName,
  };
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      _hasHydrated: false,

      addItem: (rawItem) => {
        const item = normalizeItem(rawItem);
        const currentItems = get().items || [];
        const existingItem = currentItems.find((i) => i.id === item.id);
        
        if (existingItem) {
          set({
            items: currentItems.map((i) =>
              i.id === item.id ? { ...i, quantity: (i.quantity || 1) + (item.quantity || 1), qty: (i.qty || 1) + (item.qty || 1) } : i
            ),
          });
        } else {
          set({ items: [...currentItems, item] });
        }
        get().syncWithDb(); 
      },

      removeItem: (id) => {
        const currentItems = get().items || [];
        set({ items: currentItems.filter((i) => i.id !== id && i._id !== id) });
        get().syncWithDb(); 
      },

      updateQty: (id, qty) => {
        if (qty < 1) return get().removeItem(id);
        set({ items: (get().items || []).map((i) => (i.id === id || i._id === id) ? { ...i, quantity: qty, qty: qty } : i) });
        get().syncWithDb();
      },

      clearCart: () => {
        set({ items: [] });
        get().syncWithDb();
      },

      setHasHydrated: (state) => set({ _hasHydrated: state }),

      setCartFromServer: (serverCart) => {
        if (serverCart && Array.isArray(serverCart)) {
            set({ items: serverCart.map(normalizeItem) });
        }
      },

      syncWithDb: async () => {
        try {
          const res = await fetch('/api/cart/sync', { 
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' }, 
            body: JSON.stringify({ items: get().items }) 
          });
          if (!res.ok && res.status !== 401) {
             console.warn("Cart sync non-critical failure.");
          }
        } catch (error) { 
           console.error("Cart sync failed - Check Network", error); 
        }
      },
    }),
    { 
        name: 'luxury_cart', 
        onRehydrateStorage: () => (state) => { 
            if (state) {
                // 🚨 GHOST BUSTER: Bina ID wale corrupted items ko filter out karo
                state.items = (state.items || [])
                    .filter((item) => item && (item.id || item._id))
                    .map(normalizeItem); // Ensure purane localstorage items bhi naye format mein aa jayein
                state.setHasHydrated(true); 
            }
        } 
    }
  )
);

// 🚀 MASTER INTEGRATION PILLAR 1: Absolute State Unification
export function useHydratedCart() {
  const store = useCartStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return {
    ...store,
    items: isMounted ? (store.items || []) : [],
    _hasHydrated: isMounted && store._hasHydrated,
  };
}
'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { ReactNode } from 'react';

import type { CartItem, Product } from '@/types';

const CART_STORAGE_KEY = 'foodhub-cart-items';

type CartContextValue = {
  items: CartItem[];
  cartCount: number;
  subtotal: number;
  isHydrated: boolean;
  addToCart: (product: Product) => void;
  incrementItem: (id: string) => void;
  decrementItem: (id: string) => void;
  removeItem: (id: string) => void;
  notification: CartNotification | null;
  clearNotification: () => void;
};

type CartNotification = {
  id: number;
  name: string;
  image: string;
  quantity: number;
  seq?: number;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

const loadCartFromStorage = (): CartItem[] => {
  // Always return empty array during SSR to prevent hydration mismatches
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as CartItem[];
      return Array.isArray(parsed) ? parsed : [];
    }
  } catch {
    // localStorage errors ignored; fall back to empty cart
  }

  return [];
};

const saveCartToStorage = (items: CartItem[]) => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch {
    // localStorage errors ignored
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [notification, setNotification] = useState<CartNotification | null>(
    null
  );
  const seqRef = useRef(0);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load cart from localStorage after initial mount to prevent hydration mismatch
  useEffect(() => {
    setItems(loadCartFromStorage());
    setIsHydrated(true);
  }, []);

  // Save cart to localStorage whenever items change (after hydration)
  useEffect(() => {
    if (isHydrated) {
      saveCartToStorage(items);
    }
  }, [items, isHydrated]);

  const addToCart = useCallback((product: Product) => {
    setItems(previousItems => {
      const existingItem = previousItems.find(item => item.id === product.id);

      if (existingItem) {
        const nextQuantity = existingItem.quantity + 1;
        seqRef.current += 1;
        setNotification({
          id: Date.now(),
          name: product.name,
          image: product.image,
          quantity: nextQuantity,
          seq: seqRef.current,
        });

        return previousItems.map(item => {
          if (item.id === product.id) {
            return { ...item, quantity: nextQuantity };
          }

          return item;
        });
      }

      const newItem: CartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      };

      seqRef.current += 1;
      setNotification({
        id: Date.now(),
        name: product.name,
        image: product.image,
        quantity: 1,
        seq: seqRef.current,
      });

      return [...previousItems, newItem];
    });
  }, []);

  const incrementItem = useCallback((id: string) => {
    setItems(previousItems =>
      previousItems.map(item => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + 1 };
        }

        return item;
      })
    );
  }, []);

  const decrementItem = useCallback((id: string) => {
    setItems(previousItems => {
      const target = previousItems.find(item => item.id === id);
      if (!target) {
        return previousItems;
      }

      if (target.quantity === 1) {
        return previousItems.filter(item => item.id !== id);
      }

      return previousItems.map(item => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity - 1 };
        }

        return item;
      });
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems(previousItems => previousItems.filter(item => item.id !== id));
  }, []);

  const clearNotification = useCallback(() => {
    setNotification(null);
  }, []);

  const cartCount = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items]
  );

  const subtotal = useMemo(
    () => items.reduce((total, item) => total + item.price * item.quantity, 0),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      cartCount,
      subtotal,
      isHydrated,
      addToCart,
      incrementItem,
      decrementItem,
      removeItem,
      notification,
      clearNotification,
    }),
    [
      items,
      cartCount,
      subtotal,
      isHydrated,
      addToCart,
      incrementItem,
      decrementItem,
      removeItem,
      notification,
      clearNotification,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextValue => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};

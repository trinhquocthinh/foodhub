'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import type { ReactNode } from 'react';

import { cartItems as initialCartItems } from '@/constants/layout';
import type { CartItem, Product } from '@/types';

type CartContextValue = {
  items: CartItem[];
  cartCount: number;
  subtotal: number;
  addToCart: (product: Product) => void;
  incrementItem: (id: string) => void;
  decrementItem: (id: string) => void;
  removeItem: (id: string) => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(
    initialCartItems.map(item => ({ ...item, quantity: item.quantity ?? 1 }))
  );

  const addToCart = useCallback((product: Product) => {
    setItems(previousItems => {
      const existingItem = previousItems.find(item => item.id === product.id);

      if (existingItem) {
        return previousItems.map(item => {
          if (item.id === product.id) {
            return { ...item, quantity: item.quantity + 1 };
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
      addToCart,
      incrementItem,
      decrementItem,
      removeItem,
    }),
    [
      items,
      cartCount,
      subtotal,
      addToCart,
      incrementItem,
      decrementItem,
      removeItem,
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

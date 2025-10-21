'use client';

import type { ReactNode } from 'react';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { CartProvider } from '@/context/CartContext';

export type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <CartProvider>
      <div className="container">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </CartProvider>
  );
};

export default Layout;

'use client';

import type { ReactNode } from 'react';

import Footer from '@/components/Footer';
import Header from '@/components/Header';

export type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="container">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;

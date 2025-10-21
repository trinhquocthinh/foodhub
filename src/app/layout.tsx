import { Monoton, Rubik } from 'next/font/google';
import type { ReactNode } from 'react';

import { Layout } from '@/components';
import { metadata as seoMetadata } from '@/config/seo';

import '../styles/globals.scss';

export const metadata = seoMetadata;

const rubik = Rubik({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-rubik',
  display: 'swap',
});
const monoton = Monoton({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display',
  display: 'swap',
});

type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => (
  <html lang="en">
    <body
      className={`${rubik.variable} ${monoton.variable}`}
      suppressHydrationWarning
    >
      <Layout>{children}</Layout>
    </body>
  </html>
);

export default RootLayout;

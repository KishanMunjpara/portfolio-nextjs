'use client';

import { ReactNode } from 'react';
import { MotionHydrationProvider } from '@/hooks/useMotionHydration';
import Header from './Header';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

export default function Layout({ children, className }: LayoutProps) {
  return (
    <MotionHydrationProvider>
      <div className={`min-h-screen flex flex-col ${className || ''}`}>
        <Header />
        <main className="flex-1 pt-16">
          {children}
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </MotionHydrationProvider>
  );
}

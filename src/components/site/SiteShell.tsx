import { ReactNode } from 'react';
import SiteNav from './SiteNav';
import SiteFooter from './SiteFooter';

interface SiteShellProps {
  children: ReactNode;
  /** Home uses full-bleed hero; inner pages use stone canvas */
  variant?: 'home' | 'page';
}

export default function SiteShell({ children, variant = 'page' }: SiteShellProps) {
  return (
    <div className="flex flex-col min-h-[100dvh] w-full min-w-0 overflow-x-hidden">
      <SiteNav />
      <main
        className={
          variant === 'home' ? 'flex-1 w-full min-w-0' : 'flex-1 w-full min-w-0 bg-stone-50'
        }
      >
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}

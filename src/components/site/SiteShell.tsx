import { ReactNode } from 'react';
import SiteNav from './SiteNav';
import SiteMobileNav from './SiteMobileNav';
import SiteFooter from './SiteFooter';

interface SiteShellProps {
  children: ReactNode;
  /** Home uses full-bleed hero; inner pages use stone canvas */
  variant?: 'home' | 'page';
}

export default function SiteShell({ children, variant = 'page' }: SiteShellProps) {
  return (
    <div className="flex flex-col min-h-[100dvh] w-full min-w-0 overflow-x-hidden pb-[calc(3.25rem+env(safe-area-inset-bottom))] lg:pb-0">
      <SiteNav />
      <main
        className={
          variant === 'home' ? 'flex-1 w-full min-w-0' : 'flex-1 w-full min-w-0 bg-stone-50'
        }
      >
        {children}
      </main>
      <SiteFooter />
      <SiteMobileNav />
    </div>
  );
}

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { personalInfo } from '@/data/personal';
import { navigationItems } from '@/data/navigation';
import { pagePadding, touchTarget } from '@/lib/siteClasses';
import { cn } from '@/lib/utils';

export default function SiteNav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 bg-harbour-950/95 backdrop-blur-md border-b border-white/10">
      <nav
        className={cn(
          'flex items-center justify-between gap-3 py-2.5 sm:py-3 lg:py-3.5',
          pagePadding
        )}
      >
        <Link
          href="/"
          className="min-w-0 text-sm sm:text-base font-bold text-white truncate lg:max-w-none max-w-[10rem] xs:max-w-[12rem] sm:max-w-none"
        >
          <span className="lg:hidden">{personalInfo.name.split(' ')[0]}</span>
          <span className="hidden lg:inline">{personalInfo.name}</span>
        </Link>

        {/* Mobile: resume only — pages live in bottom tab bar */}
        <a
          href={personalInfo.resumePdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'lg:hidden shrink-0 text-xs font-semibold text-harbour-950 bg-sand-400 hover:bg-sand-300 px-3 py-1.5 rounded-lg transition-colors',
            touchTarget
          )}
        >
          Resume
        </a>

        <div className="hidden lg:flex shrink-0 items-center gap-6 xl:gap-8">
          {navigationItems.slice(1).map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                'text-sm font-semibold transition-colors whitespace-nowrap',
                isActive(item.href)
                  ? 'text-sand-400'
                  : 'text-stone-300 hover:text-white'
              )}
            >
              {item.label}
            </Link>
          ))}
          <a
            href={personalInfo.resumePdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-harbour-950 bg-sand-400 hover:bg-sand-300 px-3.5 py-1.5 rounded-lg transition-colors"
          >
            Resume
          </a>
        </div>
      </nav>
    </header>
  );
}

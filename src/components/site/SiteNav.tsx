'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { personalInfo } from '@/data/personal';
import { navigationItems } from '@/data/navigation';
import { pagePadding, touchTarget } from '@/lib/siteClasses';
import { cn } from '@/lib/utils';

export default function SiteNav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 bg-harbour-950/95 backdrop-blur-md border-b border-white/10">
      <nav className={cn('flex items-center justify-between gap-3 py-3 sm:py-3.5', pagePadding)}>
        <Link
          href="/"
          className="min-w-0 text-sm sm:text-base font-bold text-white truncate max-w-[55%] sm:max-w-none"
          onClick={() => setMenuOpen(false)}
        >
          {personalInfo.name}
        </Link>

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

        <button
          type="button"
          className={cn(
            'lg:hidden shrink-0 flex flex-col gap-1.5 justify-center items-center w-11 h-11',
            touchTarget
          )}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span
            className={cn(
              'w-6 h-0.5 bg-white transition-all duration-300',
              menuOpen && 'translate-y-2 rotate-45'
            )}
          />
          <span
            className={cn(
              'w-6 h-0.5 bg-white transition-all duration-300',
              menuOpen && 'opacity-0'
            )}
          />
          <span
            className={cn(
              'w-6 h-0.5 bg-white transition-all duration-300',
              menuOpen && '-translate-y-2 -rotate-45'
            )}
          />
        </button>
      </nav>

      {menuOpen ? (
        <div className="lg:hidden border-t border-white/10 bg-harbour-900">
          <div className={cn('flex flex-col py-3', pagePadding)}>
            {navigationItems.slice(1).map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={cn(
                  'py-3 text-base font-semibold border-b border-white/5 last:border-0',
                  touchTarget,
                  isActive(item.href) ? 'text-sand-400' : 'text-stone-300'
                )}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={personalInfo.resumePdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn('py-3 text-sand-400 font-semibold', touchTarget)}
              onClick={() => setMenuOpen(false)}
            >
              Resume
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}

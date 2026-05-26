'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import {
  headerNavigationItems,
  mobileExtraNavigationItems,
  navigationItems,
} from '@/data/navigation';
import { useMotionInitial } from '@/hooks/useMotionHydration';
import { cn } from '@/lib/utils';

interface HeaderProps {
  className?: string;
}

export default function Header({ className }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      for (const item of navigationItems) {
        const section = item.href.slice(1);
        const element = document.getElementById(section);
        if (!element) continue;
        const rect = element.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom >= 120) {
          setActiveSection(section);
          return;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(href.slice(1));
    if (element) {
      const top = element.getBoundingClientRect().top + window.pageYOffset - 72;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const headerInitial = useMotionInitial({ y: -16, opacity: 0 });

  const navLinkClass = (href: string) => {
    const isActive = activeSection === href.slice(1);
    return cn(
      'relative py-1 text-sm font-medium transition-colors',
      isActive ? 'text-sand-400' : 'text-white/85 hover:text-white',
      isActive &&
        'after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-0.5 after:rounded-full after:bg-sand-400',
    );
  };

  const mobileLinkClass = (href: string) => {
    const isActive = activeSection === href.slice(1);
    return cn(
      'block rounded-lg px-3 py-3 text-base font-medium transition-colors',
      isActive ? 'bg-sand-400/15 text-sand-400' : 'text-white/90 hover:bg-white/8 hover:text-white',
    );
  };

  return (
    <>
      <motion.header
        initial={headerInitial}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-harbour-950 text-white',
          isScrolled && 'shadow-[0_8px_30px_-10px_rgba(0,0,0,0.5)]',
          className,
        )}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 sm:gap-4 px-4 sm:px-6 lg:px-8 safe-x">
          <Link
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#home');
            }}
            className="flex min-w-0 items-center gap-3"
          >
            <Image
              src="/assets/images/logo.png"
              alt=""
              width={40}
              height={40}
              className="h-9 w-9 shrink-0 rounded-full ring-1 ring-white/25"
              priority
            />
            <div className="hidden min-w-0 sm:block leading-tight">
              <span className="block truncate text-sm font-semibold tracking-tight text-white">
                Kishan Munjpara
              </span>
              <span className="block truncate text-[11px] font-medium uppercase tracking-wider text-harbourTeal-400">
                Sydney · AI Engineer
              </span>
            </div>
          </Link>

          <div className="hidden items-center gap-7 lg:flex">
            {headerNavigationItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className={navLinkClass(item.href)}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#contact');
              }}
              className="hidden sm:inline-flex items-center rounded-lg bg-sand-400 px-4 py-2 text-sm font-semibold text-harbour-950 transition-colors hover:bg-sand-300"
            >
              Contact
            </Link>

            <button
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 text-white transition-colors hover:bg-white/10 lg:hidden"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <XMarkIcon className="h-5 w-5" /> : <Bars3Icon className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] lg:hidden"
          >
            <button
              type="button"
              className="absolute inset-0 bg-harbour-950/80 backdrop-blur-sm"
              aria-label="Close menu"
              onClick={() => setIsMenuOpen(false)}
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 320 }}
              className="absolute right-0 top-0 flex h-full w-[min(100%,20rem)] flex-col border-l border-white/10 bg-harbour-950 text-white shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <p className="text-sm font-semibold text-white">Menu</p>
                <button
                  type="button"
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-lg p-2 text-white/85 transition-colors hover:bg-white/10 hover:text-white"
                  aria-label="Close menu"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-3 py-4">
                <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-widest text-harbourTeal-400">
                  Navigate
                </p>
                {headerNavigationItems.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    className={mobileLinkClass(item.href)}
                  >
                    {item.label}
                  </Link>
                ))}

                <p className="mt-6 px-3 pb-2 text-[10px] font-bold uppercase tracking-widest text-harbourTeal-400">
                  More
                </p>
                {mobileExtraNavigationItems.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    className="block rounded-lg px-3 py-2.5 text-sm text-white/85 transition-colors hover:bg-white/8 hover:text-white"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="border-t border-white/10 p-4">
                <Link
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('#contact');
                  }}
                  className="flex w-full items-center justify-center rounded-lg bg-sand-400 py-3 text-sm font-semibold text-harbour-950"
                >
                  Contact me
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  AcademicCapIcon,
  BeakerIcon,
  HomeIcon,
  Squares2X2Icon,
  TrophyIcon,
} from '@heroicons/react/24/outline';
import {
  AcademicCapIcon as AcademicCapSolid,
  BeakerIcon as BeakerSolid,
  HomeIcon as HomeSolid,
  Squares2X2Icon as Squares2X2Solid,
  TrophyIcon as TrophySolid,
} from '@heroicons/react/24/solid';
import { navigationItems } from '@/data/navigation';
import { cn } from '@/lib/utils';

const mobileTabs = [
  { item: navigationItems[0], Icon: HomeIcon, ActiveIcon: HomeSolid, label: 'Home' },
  { item: navigationItems[1], Icon: Squares2X2Icon, ActiveIcon: Squares2X2Solid, label: 'Projects' },
  { item: navigationItems[2], Icon: AcademicCapIcon, ActiveIcon: AcademicCapSolid, label: 'Work' },
  { item: navigationItems[3], Icon: TrophyIcon, ActiveIcon: TrophySolid, label: 'Certs' },
  { item: navigationItems[4], Icon: BeakerIcon, ActiveIcon: BeakerSolid, label: 'Research' },
] as const;

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  return pathname.startsWith(href);
}

export default function SiteMobileNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 lg:hidden border-t border-white/10 bg-harbour-950/95 backdrop-blur-md"
      aria-label="Mobile navigation"
    >
      <ul className="grid grid-cols-5 h-[3.25rem] pb-[env(safe-area-inset-bottom)]">
        {mobileTabs.map(({ item, Icon, ActiveIcon, label }) => {
          const active = isActive(pathname, item.href);
          const TabIcon = active ? ActiveIcon : Icon;

          return (
            <li key={item.id}>
              <Link
                href={item.href}
                className={cn(
                  'relative flex h-full flex-col items-center justify-center gap-0.5 px-1 transition-colors',
                  active ? 'text-sand-400' : 'text-stone-500 active:text-stone-300'
                )}
                aria-current={active ? 'page' : undefined}
              >
                {active ? (
                  <span
                    className="absolute top-0 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-sand-400"
                    aria-hidden
                  />
                ) : null}
                <TabIcon className="h-5 w-5 shrink-0" aria-hidden />
                <span className="text-[10px] font-semibold leading-none tracking-tight">{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

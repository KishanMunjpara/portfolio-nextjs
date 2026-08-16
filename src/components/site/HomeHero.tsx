import Image from 'next/image';
import Link from 'next/link';
import { personalInfo } from '@/data/personal';
import { heroPresentation } from '@/data/hero';
import NowFocus from '@/components/site/NowFocus';
import { contentMax, pagePadding } from '@/lib/siteClasses';
import { cn } from '@/lib/utils';

function FocusPanel({
  label,
  headline,
  items,
  variant,
}: {
  label: string;
  headline: string;
  items: string[];
  variant: 'teal' | 'sand';
}) {
  return (
    <div
      className={cn(
        'rounded-xl border p-4 min-w-0',
        variant === 'teal'
          ? 'border-harbourTeal-500/25 bg-harbourTeal-500/5'
          : 'border-sand-400/25 bg-sand-400/5'
      )}
    >
      <p
        className={cn(
          'text-[10px] font-bold uppercase tracking-widest mb-1.5',
          variant === 'teal' ? 'text-harbourTeal-400' : 'text-sand-400'
        )}
      >
        {label}
      </p>
      <p className="text-sm font-bold text-white mb-2">{headline}</p>
      <ul className="flex flex-wrap gap-1.5">
        {items.map((item) => (
          <li
            key={item}
            className={cn(
              'text-[11px] font-medium rounded-md px-2 py-0.5 border',
              variant === 'teal'
                ? 'border-harbourTeal-500/20 text-stone-300 bg-harbourTeal-500/10'
                : 'border-sand-400/20 text-stone-300 bg-sand-400/10'
            )}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

const quickLinks = [
  { href: '/projects', label: 'Projects', desc: 'Production AI & shipped work' },
  { href: '/work-and-study', label: 'Work & Study', desc: 'Experience & Macquarie MIT (AI)' },
  { href: '/research', label: 'Research', desc: 'IEEE publication & patent' },
];

export default function HomeHero() {
  return (
    <>
      <section className="relative bg-harbour-950 harbour-grain harbour-grid text-white overflow-hidden">
        <div className={cn(pagePadding, 'pt-5 sm:pt-6 pb-10 sm:pb-12 md:pb-14 relative z-[1]')}>
          <div className={cn(contentMax, 'grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-14 items-center')}>
            <div className="min-w-0 space-y-5">
              <p className="text-sm font-semibold text-harbourTeal-400 tracking-wide">
                {heroPresentation.locationLine} · {heroPresentation.university}
              </p>

              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white text-balance">
                  {personalInfo.name}
                </h1>
                <p className="mt-2 text-lg sm:text-xl font-semibold text-sand-400 text-pretty">
                  {personalInfo.title}
                </p>
                <p className="mt-4 text-stone-400 leading-relaxed max-w-xl text-pretty">
                  {personalInfo.subtitle}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {heroPresentation.credibilityBadges.map((badge) => (
                  <span
                    key={badge.label}
                    className="inline-flex flex-col rounded-lg border border-white/10 bg-white/5 px-3 py-2 min-w-[5.5rem]"
                  >
                    <span className="text-xs font-bold text-sand-400">{badge.label}</span>
                    <span className="text-[10px] text-stone-400 mt-0.5">{badge.detail}</span>
                  </span>
                ))}
              </div>

              <div className="grid sm:grid-cols-2 gap-3 pt-1">
                <FocusPanel
                  label={heroPresentation.studying.label}
                  headline={heroPresentation.studying.headline}
                  items={[...heroPresentation.studying.items]}
                  variant="teal"
                />
                <FocusPanel
                  label={heroPresentation.shipping.label}
                  headline={heroPresentation.shipping.headline}
                  items={[...heroPresentation.shipping.items]}
                  variant="sand"
                />
              </div>

              <NowFocus />

              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href="/projects"
                  className="inline-flex items-center rounded-lg bg-sand-400 text-harbour-950 font-bold text-sm px-5 py-2.5 hover:bg-sand-300 transition-colors"
                >
                  View Projects
                </Link>
                <Link
                  href="/research"
                  className="inline-flex items-center rounded-lg border border-white/20 text-white font-semibold text-sm px-5 py-2.5 hover:bg-white/5 transition-colors"
                >
                  Research
                </Link>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end w-full min-w-0">
              <div className="relative w-full max-w-[280px] sm:max-w-xs lg:max-w-sm">
                <div
                  className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-sand-400/35 via-harbourTeal-500/15 to-transparent"
                  aria-hidden
                />
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/15 shadow-harbour bg-harbour-800">
                  <Image
                    src={personalInfo.profileImage}
                    alt={`${personalInfo.name} — professional headshot`}
                    fill
                    className="object-cover object-top"
                    priority
                    sizes="(max-width: 640px) 280px, (max-width: 1024px) 320px, 384px"
                    quality={100}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-stone-100 border-y border-stone-200">
        <div className={cn(pagePadding, 'py-8 sm:py-10')}>
          <div className={cn(contentMax, 'grid grid-cols-1 sm:grid-cols-3 gap-4')}>
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group rounded-xl border border-stone-200 bg-white p-5 hover:border-harbourTeal-500/40 hover:shadow-md transition-all"
              >
                <p className="font-bold text-slate-900 group-hover:text-harbourTeal-600 transition-colors">
                  {link.label}
                </p>
                <p className="text-sm text-slate-500 mt-1">{link.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

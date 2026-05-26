'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDownIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { personalInfo } from '@/data/personal';
import { heroPresentation } from '@/data/hero';
import { Button } from '@/components/ui';
import { useMotionInitial } from '@/hooks/useMotionHydration';
import { smoothScrollTo } from '@/lib/utils';

function FocusCard({
  label,
  title,
  subtitle,
  items,
  accent,
}: {
  label: string;
  title: string;
  subtitle?: string;
  items: string[];
  accent: 'teal' | 'sand';
}) {
  const accentStyles =
    accent === 'teal'
      ? 'border-harbourTeal-500/30 bg-harbourTeal-500/5'
      : 'border-sand-400/30 bg-sand-400/5';
  const labelStyles = accent === 'teal' ? 'text-harbourTeal-400' : 'text-sand-400';
  const chipStyles =
    accent === 'teal'
      ? 'border-harbourTeal-500/20 bg-harbourTeal-500/10 text-stone-300'
      : 'border-sand-400/20 bg-sand-400/10 text-stone-300';

  return (
    <div className={`min-w-0 rounded-xl border p-4 sm:p-5 ${accentStyles}`}>
      <p className={`text-[10px] font-bold uppercase tracking-widest ${labelStyles}`}>{label}</p>
      <h3 className="mt-1.5 text-sm xs:text-base sm:text-lg font-semibold text-white leading-snug text-balance">
        {title}
      </h3>
      {subtitle ? <p className="mt-1 text-xs text-stone-500 break-words">{subtitle}</p> : null}
      <ul className="mt-3 flex flex-wrap gap-1.5 sm:gap-2">
        {items.map((item) => (
          <li
            key={item}
            className={`list-none rounded-md border px-2.5 py-1 text-xs font-medium ${chipStyles}`}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function HeroSection() {
  const fadeUp = useMotionInitial({ opacity: 0, y: 24 });
  const fadeIn = useMotionInitial({ opacity: 0 });

  return (
    <section
      id="home"
      className="relative flex min-h-[100dvh] flex-col justify-center overflow-x-hidden bg-harbour-950 text-stone-100 harbour-grain"
    >
      <div className="absolute inset-0 harbour-grid opacity-40" aria-hidden />
      <div
        className="absolute inset-0 bg-gradient-to-br from-harbour-950 via-harbour-900/95 to-harbour-800/80"
        aria-hidden
      />
      <div
        className="absolute -top-20 right-0 h-48 w-48 sm:-top-40 sm:h-[28rem] sm:w-[28rem] rounded-full bg-harbourTeal-500/10 blur-3xl pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute bottom-0 left-0 h-40 w-40 sm:h-64 sm:w-64 rounded-full bg-sand-400/8 blur-3xl pointer-events-none"
        aria-hidden
      />

      <div className="container relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-12 xs:pt-24 xs:pb-14 sm:pt-24 sm:pb-16 lg:pt-28 lg:pb-20">
        <div className="grid min-w-0 grid-cols-1 gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-14 lg:items-center">
          <motion.div
            initial={fadeUp}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="min-w-0 space-y-5 sm:space-y-6"
          >
            <div className="flex flex-col gap-2 xs:flex-row xs:flex-wrap xs:items-center xs:gap-3">
              <span className="inline-flex w-fit max-w-full items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-stone-300 backdrop-blur-sm">
                <MapPinIcon className="h-3.5 w-3.5 shrink-0 text-sand-400" aria-hidden />
                <span className="truncate">{heroPresentation.locationLine}</span>
              </span>
              <span className="text-xs font-medium uppercase tracking-widest text-harbourTeal-400 break-words">
                {heroPresentation.university}
              </span>
            </div>

            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-medium text-sand-400 mb-2">{personalInfo.availability}</p>
              <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-[3.25rem] font-bold tracking-tight text-white leading-[1.1] text-balance">
                {personalInfo.name}
              </h1>
              <p className="mt-2 sm:mt-3 text-lg xs:text-xl sm:text-2xl font-semibold text-stone-200 text-balance">
                {personalInfo.title}
              </p>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base text-stone-400 max-w-xl leading-relaxed">
                {personalInfo.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 xs:flex xs:flex-wrap">
              {heroPresentation.credibilityBadges.map((badge) => (
                <div
                  key={badge.label}
                  className="min-w-0 rounded-lg border border-white/10 bg-white/5 px-2.5 py-2 sm:px-3 backdrop-blur-sm xs:flex-1 xs:min-w-[8.5rem]"
                >
                  <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wide text-sand-400">
                    {badge.label}
                  </p>
                  <p className="text-[10px] sm:text-[11px] text-stone-500 mt-0.5 leading-snug">{badge.detail}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col xs:flex-row gap-3">
              <Button href="#contact" variant="primaryDark" size="lg" className="w-full xs:w-auto">
                Contact me
              </Button>
              <Button href={personalInfo.resumePdfUrl} variant="outlineLight" size="lg" className="w-full xs:w-auto">
                Download resume
              </Button>
            </div>

            <div className="flex gap-3">
              {personalInfo.socialLinks.map((social) => (
                <Link
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="touch-target shrink-0 rounded-full border border-white/15 bg-white/5 text-stone-300 transition-colors hover:border-sand-400/50 hover:text-sand-400"
                  aria-label={`${social.platform} profile`}
                >
                  {social.platform === 'LinkedIn' && (
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  )}
                  {social.platform === 'GitHub' && (
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  )}
                </Link>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={fadeUp}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex justify-center sm:justify-center lg:justify-end"
          >
            <div className="relative w-36 xs:w-44 sm:w-52 md:w-56 lg:w-56 max-w-[70vw]">
              <div
                className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-sand-400/30 via-harbourTeal-500/20 to-transparent blur-md"
                aria-hidden
              />
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/15 bg-harbour-800 shadow-harbour">
                <Image
                  src={personalInfo.profileImage}
                  alt={`${personalInfo.name} — professional headshot`}
                  fill
                  className="object-cover object-top"
                  priority
                  sizes="(max-width: 475px) 144px, (max-width: 640px) 176px, (max-width: 1024px) 208px, 224px"
                />
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={fadeUp}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-8 sm:mt-10 lg:mt-12 grid w-full min-w-0 grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
        >
          <FocusCard
            label={heroPresentation.studying.label}
            title={heroPresentation.studying.headline}
            subtitle={heroPresentation.program}
            items={heroPresentation.studying.items}
            accent="teal"
          />
          <FocusCard
            label={heroPresentation.shipping.label}
            title={heroPresentation.shipping.headline}
            items={heroPresentation.shipping.items}
            accent="sand"
          />
        </motion.div>

        <motion.div
          initial={fadeIn}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex justify-center mt-12 lg:mt-14"
        >
          <button
            type="button"
            onClick={() => smoothScrollTo('about', 80)}
            className="touch-target flex-col text-stone-500 hover:text-sand-400 transition-colors text-xs tracking-wide uppercase"
            aria-label="Scroll to about section"
          >
            <span className="mb-1">Explore</span>
            <ChevronDownIcon className="h-5 w-5 animate-bounce" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}

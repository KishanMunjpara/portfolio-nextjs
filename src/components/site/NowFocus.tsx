'use client';

import { useEffect, useState } from 'react';
import { nowFocusItems } from '@/data/siteCopy';
import { touchTarget } from '@/lib/siteClasses';
import { cn } from '@/lib/utils';

const ROTATE_MS = 5500;

export default function NowFocus() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % nowFocusItems.length);
    }, ROTATE_MS);

    return () => clearInterval(timer);
  }, [paused]);

  return (
    <div
      className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4 sm:p-5 min-w-0"
      aria-live="polite"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      <div className="grid min-h-[5.75rem] sm:min-h-[5.25rem] min-w-0 [&>*]:col-start-1 [&>*]:row-start-1">
        {nowFocusItems.map((entry, i) => (
          <div
            key={entry.id}
            className={cn(
              'space-y-1 transition-opacity duration-500 min-w-0',
              i === index ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            )}
            aria-hidden={i !== index}
          >
            <p className="text-xs font-bold uppercase tracking-widest text-harbourTeal-400">
              {entry.label}
            </p>
            <p className="text-sm sm:text-base text-stone-200 font-medium leading-relaxed text-pretty">
              {entry.text}
            </p>
            <a
              href={entry.href}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={i === index ? 0 : -1}
              className={cn(
                'text-sm text-sand-400 hover:text-sand-300 font-semibold transition-colors',
                touchTarget
              )}
            >
              {entry.linkLabel} →
            </a>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-2" role="tablist" aria-label="Now, focus, and open to">
        {nowFocusItems.map((entry, i) => (
          <button
            key={entry.id}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={entry.label}
            onClick={() => setIndex(i)}
            className={cn(
              'h-2 rounded-full transition-all',
              i === index ? 'w-6 bg-sand-400' : 'w-2 bg-white/25 hover:bg-white/40'
            )}
          />
        ))}
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { nowFocusItems } from '@/data/siteCopy';
import ScrambleText from '@/components/site/ScrambleText';
import { touchTarget } from '@/lib/siteClasses';
import { cn } from '@/lib/utils';

const ROTATE_MS = 6000;

export default function NowFocus() {
  const [index, setIndex] = useState(0);
  const [cycleKey, setCycleKey] = useState(0);
  const [linkReady, setLinkReady] = useState(false);
  const item = nowFocusItems[index];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % nowFocusItems.length);
    }, ROTATE_MS);

    return () => clearInterval(timer);
  }, [cycleKey]);

  useEffect(() => {
    setLinkReady(false);
    const timer = setTimeout(() => setLinkReady(true), 850);
    return () => clearTimeout(timer);
  }, [index]);

  const selectSlide = (i: number) => {
    setIndex(i);
    setCycleKey((key) => key + 1);
  };

  return (
    <div
      className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4 sm:p-5 min-w-0"
      aria-live="polite"
    >
      <div className="relative min-h-[7.25rem] sm:min-h-[6.5rem]">
        <div className="space-y-1 min-w-0">
          <p
            key={`label-${index}`}
            className="text-xs font-bold uppercase tracking-widest text-harbourTeal-400 animate-[nowLabelIn_0.35s_ease-out]"
          >
            {item.label}
          </p>
          <p className="text-sm sm:text-base text-stone-200 font-medium leading-relaxed min-h-[3.25rem] sm:min-h-[2.75rem]">
            <ScrambleText key={`text-${index}`} text={item.text} duration={1000} />
          </p>
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'inline-flex text-sm text-sand-400 hover:text-sand-300 font-semibold transition-all duration-300 w-fit',
              touchTarget,
              linkReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
            )}
          >
            {item.linkLabel} →
          </a>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2" role="tablist" aria-label="Now, focus, and open to">
        {nowFocusItems.map((entry, i) => (
          <button
            key={entry.id}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={entry.label}
            onClick={() => selectSlide(i)}
            className={cn(
              'h-2 rounded-full transition-all duration-300',
              i === index ? 'w-6 bg-sand-400' : 'w-2 bg-white/25 hover:bg-white/40'
            )}
          />
        ))}
      </div>
    </div>
  );
}

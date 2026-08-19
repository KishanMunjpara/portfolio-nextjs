'use client';

import { useEffect, useState } from 'react';

const CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*';

interface ScrambleTextProps {
  text: string;
  className?: string;
  duration?: number;
}

export default function ScrambleText({
  text,
  className = '',
  duration = 1000,
}: ScrambleTextProps) {
  const [display, setDisplay] = useState(text);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setReduceMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      setDisplay(text);
      return;
    }

    let frame = 0;
    const totalFrames = duration / 30;

    const interval = setInterval(() => {
      if (frame >= totalFrames) {
        setDisplay(text);
        clearInterval(interval);
        return;
      }

      const progress = frame / totalFrames;
      let next = '';

      for (let i = 0; i < text.length; i++) {
        const charProgress = Math.max(0, progress - (i / text.length) * 0.3);
        const char = text[i];

        if (charProgress >= 0.7 || char === ' ' || char === '\n') {
          next += char;
        } else if (charProgress > 0.3) {
          next += Math.random() > 0.5 ? char : CHARSET[Math.floor(Math.random() * CHARSET.length)];
        } else {
          next += CHARSET[Math.floor(Math.random() * CHARSET.length)];
        }
      }

      setDisplay(next);
      frame += 1;
    }, 30);

    return () => clearInterval(interval);
  }, [text, duration, reduceMotion]);

  return (
    <span className={`relative block w-full ${className}`}>
      <span className="invisible whitespace-pre-wrap break-words" aria-hidden="true">
        {text}
      </span>
      <span className="absolute inset-0 whitespace-pre-wrap break-words">{display}</span>
    </span>
  );
}

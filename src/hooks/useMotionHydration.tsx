'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { TargetAndTransition } from 'framer-motion';

const MotionHydrationContext = createContext(false);

export function MotionHydrationProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <MotionHydrationContext.Provider value={mounted}>
      {children}
    </MotionHydrationContext.Provider>
  );
}

export function useHasMounted(): boolean {
  return useContext(MotionHydrationContext);
}

/** Avoid SSR/client mismatch: skip enter animations until after hydration. */
export function useMotionInitial(
  initial: TargetAndTransition | false | undefined
): TargetAndTransition | false | undefined {
  const mounted = useHasMounted();
  if (!mounted || initial === undefined) {
    return false;
  }
  return initial;
}

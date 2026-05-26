'use client';

import { forwardRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ButtonProps } from '@/types';
import { cn } from '@/lib/utils';

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      children,
      onClick,
      href,
      disabled = false,
      className,
      ...props
    },
    ref,
  ) => {
    const baseClasses =
      'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
      primary:
        'bg-sand-400 text-harbour-950 hover:bg-sand-300 focus:ring-sand-400 focus:ring-offset-harbour-950 shadow-sand font-semibold',
      secondary:
        'bg-harbourTeal-500 text-white hover:bg-harbourTeal-600 focus:ring-harbourTeal-400 shadow-md',
      outline:
        'border-2 border-stone-300 text-slate-800 hover:border-harbourTeal-500 hover:text-harbourTeal-600 focus:ring-harbourTeal-400 bg-white/80',
      ghost: 'text-harbourTeal-600 hover:bg-harbourTeal-500/10 focus:ring-harbourTeal-400',
      outlineLight:
        'border border-white/25 text-stone-100 hover:bg-white/10 focus:ring-sand-400 focus:ring-offset-harbour-950 bg-transparent',
      primaryDark:
        'bg-sand-400 text-harbour-950 hover:bg-sand-300 focus:ring-sand-400 focus:ring-offset-harbour-900 font-semibold',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm min-h-9',
      md: 'px-4 py-2 text-sm min-h-10 sm:min-h-11',
      lg: 'px-4 py-2.5 text-sm min-h-10 sm:px-5 sm:py-3 sm:text-base sm:min-h-11',
    };

    const classes = cn(baseClasses, variants[variant], sizes[size], className);

    const buttonContent = (
      <motion.span whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex items-center gap-2">
        {children}
      </motion.span>
    );

    if (href) {
      return (
        <Link href={href} className={classes} {...props}>
          {buttonContent}
        </Link>
      );
    }

    return (
      <button ref={ref} onClick={onClick} disabled={disabled} className={classes} {...props}>
        {buttonContent}
      </button>
    );
  },
);

Button.displayName = 'Button';

export default Button;

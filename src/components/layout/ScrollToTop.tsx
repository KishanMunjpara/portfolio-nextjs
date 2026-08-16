'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUpIcon } from '@heroicons/react/24/outline';
import { useHasMounted, useMotionInitial } from '@/hooks/useMotionHydration';

interface ScrollToTopProps {
  className?: string;
}

export default function ScrollToTop({ className }: ScrollToTopProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const mounted = useHasMounted();
  const buttonInitial = useMotionInitial({ opacity: 0, scale: 0.8 });
  const tooltipInitial = useMotionInitial({ opacity: 0, y: 10 });

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      
      setScrollProgress(scrollPercent);
      setIsVisible(scrollTop > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={buttonInitial}
          animate={{ opacity: 1, scale: 1 }}
          exit={mounted ? { opacity: 0, scale: 0.8 } : undefined}
          transition={{ duration: 0.3 }}
          className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 ${className || ''}`}
        >
          {/* Progress Ring */}
          <div className="relative">
            <svg
              className="w-10 h-10 sm:w-12 sm:h-12 transform -rotate-90"
              viewBox="0 0 48 48"
            >
              {/* Background Circle */}
              <circle
                cx="24"
                cy="24"
                r="20"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                className="text-gray-300"
              />
              {/* Progress Circle */}
              <circle
                cx="24"
                cy="24"
                r="20"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 20}`}
                strokeDashoffset={`${2 * Math.PI * 20 * (1 - scrollProgress / 100)}`}
                className="text-harbourTeal-600 transition-all duration-300"
                strokeLinecap="round"
              />
            </svg>
            
            {/* Button */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="absolute inset-0 flex items-center justify-center bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow min-h-[44px] min-w-[44px]"
              aria-label="Scroll to top"
            >
              <ChevronUpIcon className="w-4 h-4 sm:w-5 sm:h-5 text-harbourTeal-600" />
            </motion.button>
          </div>

          {/* Tooltip */}
          <motion.div
            initial={tooltipInitial}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-full right-0 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap hidden sm:block"
          >
            Scroll to top
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

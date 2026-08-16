'use client';

import { useState, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useHasMounted, useMotionInitial } from '@/hooks/useMotionHydration';
import { cn } from '@/lib/utils';

interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
}

interface TabsProps {
  items: TabItem[];
  defaultTab?: string;
  className?: string;
}

export default function Tabs({ items, defaultTab, className }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || items[0]?.id);
  const mounted = useHasMounted();
  const tabContentInitial = useMotionInitial({ opacity: 0, x: 20 });

  const activeItem = items.find(item => item.id === activeTab);

  return (
    <div className={cn('w-full', className)}>
      {/* Tab Headers */}
      <div className="mb-3 flex border-b border-gray-200 sm:mb-4">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              'relative flex-1 sm:flex-none px-4 sm:px-6 py-3 text-sm font-medium transition-colors min-h-11',
              activeTab === item.id
                ? 'text-harbourTeal-600'
                : 'text-gray-500 hover:text-gray-700'
            )}
            role="tab"
            aria-selected={activeTab === item.id}
            aria-controls={`tabpanel-${item.id}`}
            id={`tab-${item.id}`}
          >
            {item.label}
            {activeTab === item.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-harbour-900"
                initial={false}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div
        role="tabpanel"
        id={`tabpanel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
        className="min-h-[200px]"
      >
        <motion.div
          key={activeTab}
          initial={tabContentInitial}
          animate={{ opacity: 1, x: 0 }}
          exit={mounted ? { opacity: 0, x: -20 } : undefined}
          transition={{ duration: 0.2 }}
        >
          {activeItem?.content}
        </motion.div>
      </div>
    </div>
  );
}

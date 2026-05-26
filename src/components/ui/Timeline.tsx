'use client';

import { motion } from 'framer-motion';
import { Experience } from '@/types';
import { useMotionInitial } from '@/hooks/useMotionHydration';
import { cn } from '@/lib/utils';

interface TimelineProps {
  items: Experience[];
  className?: string;
}

export default function Timeline({ items, className }: TimelineProps) {
  const itemInitial = useMotionInitial({ opacity: 0, x: -20 });

  return (
    <div className={cn('relative', className)}>
      {/* Timeline Line */}
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-harbourTeal-200" />
      
      <div className="space-y-4 sm:space-y-5 md:space-y-6">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={itemInitial}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="relative flex min-w-0 items-start gap-3 sm:gap-4"
          >
            {/* Timeline Dot */}
            <div className="relative z-10 flex-shrink-0">
              <div className="w-8 h-8 bg-harbour-900 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full" />
              </div>
            </div>

            {/* Content */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="min-w-0 flex-1 rounded-lg bg-white p-3 shadow-sm transition-shadow hover:shadow-md sm:p-4"
            >
              <div className="mb-1.5 flex flex-col gap-0.5 sm:mb-2 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
                <h3 className="text-sm font-semibold text-gray-900 text-balance sm:text-base">
                  {item.title}
                </h3>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <span>{item.startDate}</span>
                  {item.endDate && (
                    <>
                      <span>•</span>
                      <span>{item.endDate}</span>
                    </>
                  )}
                  {!item.endDate && (
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                      Current
                    </span>
                  )}
                </div>
              </div>

              <div className="mb-3">
                <h4 className="text-md font-medium text-harbourTeal-600">
                  {item.company}
                </h4>
                <p className="text-sm text-gray-600">{item.location}</p>
              </div>

              <p className="text-gray-700 text-sm leading-relaxed">
                {item.description}
              </p>

              <div className="mt-3">
                <span className={cn(
                  'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                  item.type === 'work' 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-green-100 text-green-800'
                )}>
                  {item.type === 'work' ? 'Work Experience' : 'Education'}
                </span>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useMotionInitial } from '@/hooks/useMotionHydration';
import { CardProps } from '@/types';
import { cn } from '@/lib/utils';

export default function Card({ 
  title, 
  description, 
  image, 
  children, 
  className,
  onClick
}: CardProps) {
  const cardInitial = useMotionInitial({ opacity: 0, y: 20 });

  return (
    <motion.div
      initial={cardInitial}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      viewport={{ once: true }}
      onClick={onClick}
      className={cn(
        'bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden',
        onClick && 'cursor-pointer',
        className
      )}
    >
      {image && (
        <div className="relative h-48 sm:h-56 md:h-64 lg:h-80 w-full overflow-hidden bg-gray-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
          <Image
            src={image}
            alt={title ?? 'Card Image'}
            width={500}
            height={400}
            className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </div>
      )}
      
      <div className="p-4 sm:p-6">
        {title && (
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
            {title}
          </h3>
        )}
        
        {description && (
          <p className="text-sm sm:text-base text-gray-600 mb-4 line-clamp-3">
            {description}
          </p>
        )}
        
        {children}
      </div>
    </motion.div>
  );
}

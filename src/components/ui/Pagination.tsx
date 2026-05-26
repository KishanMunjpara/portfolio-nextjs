'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export default function Pagination({ 
  totalItems, 
  itemsPerPage, 
  currentPage: externalCurrentPage,
  onPageChange, 
  className 
}: PaginationProps) {
  const [internalCurrentPage, setInternalCurrentPage] = useState(1);
  const currentPage = externalCurrentPage ?? internalCurrentPage;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  useEffect(() => {
    if (externalCurrentPage) {
      setInternalCurrentPage(externalCurrentPage);
    }
  }, [externalCurrentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      if (externalCurrentPage !== undefined) {
        onPageChange(page);
      } else {
        setInternalCurrentPage(page);
        onPageChange(page);
      }
    }
  };

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  if (totalPages <= 1) return null;

  return (
    <div className={cn('flex items-center justify-center space-x-2', className)}>
      {/* Previous Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          'p-2 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center',
          currentPage === 1
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
        )}
        aria-label="Previous page"
      >
        <ChevronLeftIcon className="w-5 h-5" />
      </motion.button>

      {/* Page Numbers */}
      <div className="flex items-center space-x-1 sm:space-x-2">
        {getVisiblePages().map((page, index) => (
          <div key={index}>
            {page === '...' ? (
              <span className="px-3 py-2 text-gray-500">...</span>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handlePageChange(page as number)}
                className={cn(
                  'px-2 sm:px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center',
                  currentPage === page
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                )}
                aria-label={`Go to page ${page}`}
                aria-current={currentPage === page ? 'page' : undefined}
              >
                {page}
              </motion.button>
            )}
          </div>
        ))}
      </div>

      {/* Next Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          'p-2 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center',
          currentPage === totalPages
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
        )}
        aria-label="Next page"
      >
        <ChevronRightIcon className="w-5 h-5" />
      </motion.button>
    </div>
  );
}

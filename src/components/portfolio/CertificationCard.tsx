'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import type { Certification } from '@/types';
import { useMotionInitial } from '@/hooks/useMotionHydration';

interface CertificationCardProps {
  certification: Certification;
  index: number;
  onSelect: (cert: Certification) => void;
}

export default function CertificationCard({
  certification,
  index,
  onSelect,
}: CertificationCardProps) {
  const fadeUp = useMotionInitial({ opacity: 0, y: 12 });

  return (
    <motion.li
      initial={fadeUp}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.02 }}
      viewport={{ once: true, margin: '-24px' }}
      className="list-none"
    >
      <button
        type="button"
        onClick={() => onSelect(certification)}
        className="group flex h-full w-full min-w-0 flex-col rounded-xl border border-stone-200/90 bg-white p-3.5 text-left transition-shadow hover:border-harbourTeal-500/30 hover:shadow-md sm:p-4"
      >
        <div className="flex items-start gap-3">
          <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg border border-stone-100 bg-stone-50 p-1 sm:h-12 sm:w-12">
            <Image
              src={certification.image}
              alt=""
              fill
              className="object-contain"
              sizes="48px"
            />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-semibold leading-snug text-harbour-900 line-clamp-2 sm:text-[15px]">
              {certification.title}
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              <span className="font-medium text-harbourTeal-600">{certification.issuer}</span>
              <span className="mx-1 text-stone-300">·</span>
              {certification.issueDate}
            </p>
          </div>
        </div>

        <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-harbourTeal-600 group-hover:text-harbour-900">
          <MagnifyingGlassIcon className="h-3.5 w-3.5" aria-hidden />
          View certificate
        </span>
      </button>
    </motion.li>
  );
}

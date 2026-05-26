'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import type { Project, ProjectLink } from '@/types';
import { projectSummary } from '@/lib/projectSummary';
import { getProjectThumbStyle } from '@/lib/projectThumb';
import { useMotionInitial } from '@/hooks/useMotionHydration';
import { cn } from '@/lib/utils';

const MAX_TECH_TAGS = 4;

function LinkIcon({ type }: { type: ProjectLink['type'] }) {
  if (type === 'github') {
    return (
      <svg className="h-3.5 w-3.5 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    );
  }
  if (type === 'chrome') {
    return (
      <svg className="h-3.5 w-3.5 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6.5 7.5c-.276 0-.5.224-.5.5s.224.5.5.5.5-.224.5-.5-.224-.5-.5-.5zm-13 0c-.276 0-.5.224-.5.5s.224.5.5.5.5-.224.5-.5-.224-.5-.5-.5zM12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2z" />
      </svg>
    );
  }
  if (type === 'pdf') {
    return (
      <svg className="h-3.5 w-3.5 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
      </svg>
    );
  }
  return <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5 shrink-0" aria-hidden />;
}

interface ProjectCardProps {
  project: Project;
  index: number;
  highlight?: boolean;
}

export default function ProjectCard({ project, index, highlight = false }: ProjectCardProps) {
  const fadeUp = useMotionInitial({ opacity: 0, y: 16 });
  const visibleTech = project.technologies.slice(0, MAX_TECH_TAGS);
  const extraTech = project.technologies.length - visibleTech.length;
  const primaryLink = project.links[0];
  const thumb = getProjectThumbStyle(project);

  return (
    <motion.article
      initial={fadeUp}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.03 }}
      viewport={{ once: true, margin: '-24px' }}
      className={cn(
        'flex h-full min-w-0 gap-2.5 rounded-lg border bg-white p-2.5 transition-shadow hover:shadow-md sm:gap-3 sm:rounded-xl sm:p-3 md:gap-3.5 md:p-3.5',
        highlight ? 'border-sand-400/40' : 'border-stone-200/90',
      )}
    >
      <div className={thumb.containerClass}>
        <Image
          src={project.image}
          alt=""
          fill
          className={thumb.imageClass}
          sizes={thumb.sizes}
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-semibold leading-snug text-harbour-900 sm:text-base text-balance">
            {project.title}
          </h3>
          {highlight ? (
            <span className="shrink-0 rounded border border-sand-400/30 bg-sand-400/10 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-amber-800">
              Prod
            </span>
          ) : null}
        </div>

        <p className="mt-1 text-xs leading-relaxed text-slate-600 line-clamp-2 sm:text-sm">
          {projectSummary(project.description)}
        </p>

        <ul className="mt-2 flex flex-wrap gap-1" aria-label="Technologies">
          {visibleTech.map((tech) => (
            <li
              key={tech}
              className="list-none rounded bg-stone-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-600 sm:text-xs"
            >
              {tech}
            </li>
          ))}
          {extraTech > 0 ? (
            <li className="list-none rounded bg-stone-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-500 sm:text-xs">
              +{extraTech}
            </li>
          ) : null}
        </ul>

        <div className="mt-auto flex flex-wrap gap-1.5 pt-2.5">
          {project.links.map((link) => {
            const isExternal = link.type === 'github' || link.type === 'chrome' || link.type === 'external';
            const isPrimary = link === primaryLink;

            return (
              <Link
                key={`${link.type}-${link.url}`}
                href={link.url}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                className={cn(
                  'inline-flex min-h-8 items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium transition-colors sm:text-xs',
                  isPrimary
                    ? 'bg-harbour-900 text-white hover:bg-harbour-800'
                    : 'text-harbourTeal-600 hover:bg-harbourTeal-500/10',
                )}
              >
                <LinkIcon type={link.type} />
                <span className="truncate max-w-[9rem] sm:max-w-[11rem]">
                  {isPrimary ? link.label : link.type === 'github' ? 'Code' : link.label.split(' ')[0]}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </motion.article>
  );
}

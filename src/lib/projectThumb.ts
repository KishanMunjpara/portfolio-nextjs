import type { Project } from '@/types';

export interface ProjectThumbStyle {
  containerClass: string;
  imageClass: string;
  sizes: string;
}

const SQUARE_THUMB =
  'relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border p-2 sm:h-16 sm:w-16';

/** Square thumbnails; background tuned for logo assets. */
export function getProjectThumbStyle(project: Project): ProjectThumbStyle {
  switch (project.id) {
    case 'project-smartvalyou':
      return {
        containerClass: `${SQUARE_THUMB} border-stone-200/90 bg-white`,
        imageClass: 'object-contain object-center',
        sizes: '64px',
      };
    case 'project-phenomenal':
      return {
        containerClass: `${SQUARE_THUMB} border-stone-800 bg-black`,
        imageClass: 'object-contain object-center',
        sizes: '64px',
      };
    default:
      return {
        containerClass: `${SQUARE_THUMB} border-stone-200/90 bg-stone-50`,
        imageClass: 'object-contain object-center',
        sizes: '64px',
      };
  }
}

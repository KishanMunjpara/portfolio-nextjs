/** Public site URL — set at build time (GitHub Pages, Cloudflare, etc.). */
const raw =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
  'https://kishanmunjpara.github.io';

export const SITE_URL = raw;

/** Subpath when hosted as a GitHub project page, e.g. /portfolio-nextjs */
export const SITE_BASE_PATH =
  process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, '') || '';

export const absoluteUrl = (path = '') => {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${SITE_BASE_PATH}${normalized === '/' ? '' : normalized}`;
};

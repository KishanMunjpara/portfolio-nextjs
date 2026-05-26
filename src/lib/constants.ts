// Application Constants
export const APP_NAME = 'Kishan Portfolio';
export const APP_DESCRIPTION = 'Machine Learning Engineer & AI Researcher Portfolio';
export const APP_URL = 'https://kishanmunjpara.dev';
export const APP_AUTHOR = 'Kishan Munjpara';

// SEO Constants
export const SEO_DEFAULTS = {
  title: 'Kishan Munjpara - Machine Learning Engineer',
  description: 'AI enthusiast and software engineer with expertise in machine learning, deep learning, and software development. Explore projects, research, and achievements.',
  keywords: [
    'Machine Learning',
    'Artificial Intelligence',
    'Deep Learning',
    'Software Engineer',
    'Data Science',
    'Python',
    'Research',
    'Portfolio',
  ],
  ogImage: '/assets/images/og-image.jpg',
  twitterHandle: '@KishanMunjpara',
};

// Navigation Constants
export const NAVIGATION_HEIGHT = 80;
export const MOBILE_BREAKPOINT = 768;
export const TABLET_BREAKPOINT = 1024;
export const DESKTOP_BREAKPOINT = 1280;

// Animation Constants
export const ANIMATION_DURATION = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
};

export const ANIMATION_EASING = {
  easeInOut: 'ease-in-out',
  easeOut: 'ease-out',
  easeIn: 'ease-in',
};

// Pagination Constants
export const ITEMS_PER_PAGE = {
  mobile: 1,
  tablet: 2,
  desktop: 3,
};

// Contact Form Constants
export const CONTACT_FORM_LIMITS = {
  name: { min: 2, max: 50 },
  email: { max: 100 },
  purpose: { min: 5, max: 100 },
  message: { min: 10, max: 1000 },
};

// Social Media Links
export const SOCIAL_LINKS = {
  linkedin: 'https://linkedin.com/in/KishanMunjpara',
  github: 'https://github.com/KishanMunjpara',
  email: 'mailto:kishan.students@gmail.com',
  phone: 'tel:+919265923371',
};

// File Paths
export const ASSET_PATHS = {
  images: '/assets/images',
  pdfs: '/assets/pdfs',
  icons: '/assets/icons',
};

// Theme Colors (matching original design)
export const THEME_COLORS = {
  primary: '#8B5CF6', // Purple
  secondary: '#A78BFA', // Light Purple
  accent: '#C4B5FD', // Very Light Purple
  background: '#F8FAFC', // Light Gray
  surface: '#FFFFFF', // White
  text: '#1F2937', // Dark Gray
  textSecondary: '#6B7280', // Medium Gray
  border: '#E5E7EB', // Light Border
  success: '#10B981', // Green
  warning: '#F59E0B', // Orange
  error: '#EF4444', // Red
};

// Breakpoints for responsive design
export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// Z-index values
export const Z_INDEX = {
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
};

// API Endpoints (if needed in future)
export const API_ENDPOINTS = {
  contact: '/api/contact',
  analytics: '/api/analytics',
};

// External URLs
export const EXTERNAL_URLS = {
  ieee: 'https://ieeexplore.ieee.org/document/10461753',
  chromeStore: 'https://chrome.google.com/webstore/detail/cline-clickbait-news-dete/bcbooidlhpmjncblopcnechegopiamil',
  github: 'https://github.com/KishanMunjpara',
  linkedin: 'https://linkedin.com/in/KishanMunjpara',
};

// Performance Constants
export const PERFORMANCE = {
  imageQuality: 85,
  lazyLoadOffset: 100,
  debounceDelay: 300,
  throttleDelay: 100,
};

// Accessibility Constants
export const A11Y = {
  focusVisible: 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
  skipLink: 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded',
};

// Animation Variants
export const ANIMATION_VARIANTS = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slideUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  slideDown: {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
};

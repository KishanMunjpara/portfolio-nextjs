import { NavItem } from '@/types';

export const navigationItems: NavItem[] = [
  {
    id: 'nav-home',
    label: 'Home',
    href: '#home',
    icon: 'home',
  },
  {
    id: 'nav-about',
    label: 'About',
    href: '#about',
    icon: 'user',
  },
  {
    id: 'nav-qualification',
    label: 'Qualification',
    href: '#qualification',
    icon: 'briefcase',
  },
  {
    id: 'nav-portfolio',
    label: 'Portfolio',
    href: '#portfolio',
    icon: 'scenery',
  },
  {
    id: 'nav-research',
    label: 'Research',
    href: '#research',
    icon: 'flask',
  },
  {
    id: 'nav-certificate',
    label: 'Certificate',
    href: '#certificate',
    icon: 'blogger',
  },
  {
    id: 'nav-open-to',
    label: 'Open To',
    href: '#open-to',
    icon: 'award',
  },
  {
    id: 'nav-contact',
    label: 'Contact',
    href: '#contact',
    icon: 'message',
  },
];

/** Primary links shown in the header (keeps the bar clean). */
export const headerNavigationItems: NavItem[] = [
  { id: 'nav-about', label: 'About', href: '#about', icon: 'user' },
  { id: 'nav-qualification', label: 'Experience', href: '#qualification', icon: 'briefcase' },
  { id: 'nav-portfolio', label: 'Projects', href: '#portfolio', icon: 'scenery' },
  { id: 'nav-research', label: 'Research', href: '#research', icon: 'flask' },
  { id: 'nav-open-to', label: 'Open to', href: '#open-to', icon: 'award' },
];

/** Extra links for mobile menu only. */
export const mobileExtraNavigationItems: NavItem[] = [
  { id: 'nav-home', label: 'Home', href: '#home', icon: 'home' },
  { id: 'nav-certificate', label: 'Certificates', href: '#certificate', icon: 'blogger' },
];

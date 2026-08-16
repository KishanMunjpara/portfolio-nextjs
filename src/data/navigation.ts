import { NavItem } from '@/types';

export const navigationItems: NavItem[] = [
  { id: 'nav-home', label: 'Home', href: '/', icon: 'home' },
  { id: 'nav-projects', label: 'Projects', href: '/projects', icon: 'scenery' },
  { id: 'nav-work-study', label: 'Work & Study', href: '/work-and-study', icon: 'briefcase' },
  { id: 'nav-certifications', label: 'Certifications', href: '/certifications', icon: 'blogger' },
  { id: 'nav-research', label: 'Research', href: '/research', icon: 'flask' },
];

export const headerNavigationItems = navigationItems.filter((item) => item.href !== '/');
export const mobileExtraNavigationItems: NavItem[] = [];

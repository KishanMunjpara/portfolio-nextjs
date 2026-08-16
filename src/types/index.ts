// Personal Information Types
export interface PersonalInfo {
  name: string;
  title: string;
  subtitle: string;
  availability: string;
  description: string;
  email: string;
  phone: string;
  location: string;
  socialLinks: SocialLink[];
  profileImage: string;
  resumePdfUrl: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

// Experience Types
export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string | null; // null for current position
  description: string;
  type: 'work' | 'education';
}

// Project Types
export interface Project {
  id: string;
  title: string;
  description: string;
  impact?: string;
  image: string;
  technologies: string[];
  links: ProjectLink[];
  featured: boolean;
}

export interface ProjectLink {
  type: 'github' | 'demo' | 'pdf' | 'chrome' | 'external';
  url: string;
  label: string;
}

// Research Types
export interface Publication {
  id: string;
  title: string;
  journal: string;
  authors: string[];
  link: string;
  description: string;
  year: string;
}

export interface Patent {
  id: string;
  title: string;
  authors: string[];
  link: string;
  description: string;
  year: string;
}

// Certification Types
export interface Certification {
  id: string;
  title: string;
  issuer: string;
  image: string;
  certificateUrl: string;
  issueDate: string;
  description?: string;
}

// Open-to / opportunities
export interface Opportunity {
  id: string;
  title: string;
  description: string;
}

// Navigation Types
export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon?: string;
}

// Contact Form Types
export interface ContactFormData {
  name: string;
  email: string;
  purpose: string;
  message: string;
}

// Component Props Types
export interface SectionProps {
  id: string;
  className?: string;
}

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'outlineLight' | 'primaryDark';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export interface CardProps {
  title?: string;
  description?: string;
  image?: string;
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

// Animation Types
export interface AnimationVariants {
  hidden: {
    opacity: number;
    y?: number;
    x?: number;
    scale?: number;
  };
  visible: {
    opacity: number;
    y?: number;
    x?: number;
    scale?: number;
    transition?: {
      duration?: number;
      delay?: number;
      ease?: string;
    };
  };
}

// SEO Types
export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
  canonicalUrl: string;
}

// Theme Types
export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
}

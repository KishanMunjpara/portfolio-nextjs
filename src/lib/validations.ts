import { z } from 'zod';

// Personal Information Schema
export const personalInfoSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  title: z.string().min(1, 'Title is required'),
  subtitle: z.string().min(1, 'Subtitle is required'),
  availability: z.string().min(1, 'Availability is required'),
  description: z.string().min(1, 'Description is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  location: z.string().min(1, 'Location is required'),
  socialLinks: z.array(z.object({
    platform: z.string(),
    url: z.string().url('Invalid URL'),
    icon: z.string(),
  })),
  profileImage: z.string().min(1, 'Profile image is required'),
  resumePdfUrl: z.string().min(1, 'Resume PDF URL is required'),
});

// Experience Schema
export const experienceSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Title is required'),
  company: z.string().min(1, 'Company is required'),
  location: z.string().min(1, 'Location is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().nullable(),
  description: z.string().min(1, 'Description is required'),
  type: z.enum(['work', 'education']),
});

// Project Schema
export const projectSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  image: z.string().min(1, 'Image is required'),
  technologies: z.array(z.string()),
  links: z.array(z.object({
    type: z.enum(['github', 'demo', 'pdf', 'chrome']),
    url: z.string().url('Invalid URL'),
    label: z.string(),
  })),
  featured: z.boolean(),
});

// Publication Schema
export const publicationSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Title is required'),
  journal: z.string().min(1, 'Journal is required'),
  authors: z.array(z.string()),
  link: z.string().url('Invalid URL'),
  description: z.string().min(1, 'Description is required'),
  year: z.string(),
});

// Patent Schema
export const patentSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Title is required'),
  authors: z.array(z.string()),
  link: z.string().min(1, 'Link is required'),
  description: z.string().min(1, 'Description is required'),
  year: z.string(),
});

// Certification Schema
export const certificationSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Title is required'),
  issuer: z.string().min(1, 'Issuer is required'),
  image: z.string().min(1, 'Image is required'),
  certificateUrl: z.string().min(1, 'Certificate URL is required'),
  issueDate: z.string(),
  description: z.string().optional(),
});

// Opportunity Schema
export const opportunitySchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
});

// Contact Form Schema
export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  purpose: z.string().min(5, 'Purpose must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

// Navigation Schema
export const navigationSchema = z.object({
  id: z.string(),
  label: z.string().min(1, 'Label is required'),
  href: z.string().min(1, 'Href is required'),
  icon: z.string().optional(),
});

// Type exports for use in components
export type PersonalInfoInput = z.infer<typeof personalInfoSchema>;
export type ExperienceInput = z.infer<typeof experienceSchema>;
export type ProjectInput = z.infer<typeof projectSchema>;
export type PublicationInput = z.infer<typeof publicationSchema>;
export type PatentInput = z.infer<typeof patentSchema>;
export type CertificationInput = z.infer<typeof certificationSchema>;
export type OpportunityInput = z.infer<typeof opportunitySchema>;
export type ContactFormInput = z.infer<typeof contactFormSchema>;
export type NavigationInput = z.infer<typeof navigationSchema>;

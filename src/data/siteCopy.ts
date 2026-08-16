/** Site copy — derived from synced profile data where possible. */

import { heroPresentation } from './hero';
import { personalInfo } from './personal';

const linkedInUrl =
  personalInfo.socialLinks.find((link) => link.icon === 'linkedin')?.url ??
  'https://linkedin.com/in/KishanMunjpara';

export const nowFocusItems = [
  {
    id: 'studying',
    label: 'Now',
    text: `${heroPresentation.program} at ${heroPresentation.university}`,
    href: 'https://www.mq.edu.au/',
    linkLabel: heroPresentation.university,
  },
  {
    id: 'focus',
    label: 'Focus',
    text: heroPresentation.studying.items.join(', '),
    href: 'https://www.mq.edu.au/study/find-a-course/courses/master-of-information-technology-in-artificial-intelligence',
    linkLabel: 'MIT (AI) program',
  },
  {
    id: 'open',
    label: 'Open to',
    text: personalInfo.availability,
    href: linkedInUrl,
    linkLabel: 'LinkedIn',
  },
] as const;

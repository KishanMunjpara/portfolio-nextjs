import { personalInfo } from '@/data/personal';
import { SITE_URL } from '@/data/site';

const siteUrl = SITE_URL;

export default function JsonLd() {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: personalInfo.name,
    jobTitle: personalInfo.title,
    email: personalInfo.email,
    telephone: personalInfo.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Sydney',
      addressCountry: 'AU',
    },
    url: siteUrl,
    image: `${siteUrl}${personalInfo.profileImage}`,
    sameAs: personalInfo.socialLinks.map((link) => link.url),
    description: personalInfo.description,
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Macquarie University',
    },
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: `${personalInfo.name} — Portfolio`,
    url: siteUrl,
    description: personalInfo.description,
    author: {
      '@type': 'Person',
      name: personalInfo.name,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}

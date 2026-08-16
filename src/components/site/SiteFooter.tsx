import Link from 'next/link';
import { personalInfo } from '@/data/personal';
import { navigationItems } from '@/data/navigation';
import { pagePadding } from '@/lib/siteClasses';
import { cn } from '@/lib/utils';

const footerLink =
  'text-sm text-stone-300 hover:text-sand-400 transition-colors w-fit';

const footerHeading =
  'text-xs font-bold uppercase tracking-widest text-harbourTeal-400 mb-3';

export default function SiteFooter() {
  const linkedIn = personalInfo.socialLinks.find((link) => link.icon === 'linkedin');
  const github = personalInfo.socialLinks.find((link) => link.icon === 'github');

  const exploreLinks = navigationItems.filter((item) => item.href !== '/');

  return (
    <footer className="bg-harbour-950 border-t border-white/10 text-stone-400 mt-auto w-full min-w-0">
      <div
        className={cn(
          'py-10 sm:py-12 grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10',
          pagePadding
        )}
      >
        <div className="min-w-0 xs:col-span-2 lg:col-span-1">
          <p className="text-white font-bold mb-2">{personalInfo.name}</p>
          <p className="text-sm text-stone-400 leading-relaxed">{personalInfo.location}</p>
          <p className="text-sm mt-2 text-stone-500 leading-relaxed max-w-xs">
            {personalInfo.availability}
          </p>
        </div>

        <div className="min-w-0">
          <p className={footerHeading}>Contact</p>
          <ul className="flex flex-col gap-2">
            <li>
              <a href={`mailto:${personalInfo.email}`} className={cn(footerLink, 'break-all')}>
                {personalInfo.email}
              </a>
            </li>
            <li>
              <a href={`tel:${personalInfo.phone}`} className={footerLink}>
                {personalInfo.phone}
              </a>
            </li>
          </ul>
        </div>

        <div className="min-w-0">
          <p className={footerHeading}>Connect</p>
          <ul className="flex flex-col gap-2">
            {linkedIn ? (
              <li>
                <a
                  href={linkedIn.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={footerLink}
                >
                  LinkedIn
                </a>
              </li>
            ) : null}
            {github ? (
              <li>
                <a
                  href={github.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={footerLink}
                >
                  GitHub
                </a>
              </li>
            ) : null}
            <li>
              <a
                href={personalInfo.resumePdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={footerLink}
              >
                Resume
              </a>
            </li>
          </ul>
        </div>

        <div className="min-w-0">
          <p className={footerHeading}>Explore</p>
          <ul className="flex flex-col gap-2">
            {exploreLinks.map((item) => (
              <li key={item.id}>
                <Link href={item.href} className={footerLink}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-2 mt-1 border-t border-white/10">
              <Link href="/privacy" className={footerLink}>
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/terms" className={footerLink}>
                Terms
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

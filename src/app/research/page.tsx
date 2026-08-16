import type { Metadata } from 'next';
import SiteShell from '@/components/site/SiteShell';
import { publications, patents } from '@/data/research';
import {
  contentMax,
  linkInline,
  listEntry,
  listEntryTitle,
  mutedText,
  pageLead,
  pageShellCompact,
  pageTitle,
  sectionGap,
  sectionLabel,
  touchTarget,
} from '@/lib/siteClasses';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Research — Kishan Munjpara',
  description: 'IEEE publications and patent work in machine learning and computer vision.',
};

function ResearchEntry({
  title,
  meta,
  description,
  href,
  linkLabel,
}: {
  title: string;
  meta: string;
  description: string;
  href: string;
  linkLabel: string;
}) {
  return (
    <article className={listEntry}>
      <h3 className={listEntryTitle}>{title}</h3>
      <p className="text-sm font-semibold text-harbourTeal-700">{meta}</p>
      <p className={mutedText}>{description}</p>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(linkInline, 'text-sm', touchTarget)}
      >
        {linkLabel}
      </a>
    </article>
  );
}

export default function ResearchPage() {
  return (
    <SiteShell>
      <div className={pageShellCompact}>
        <div className={contentMax}>
          <p className={sectionLabel}>Research & ship</p>
          <h1 className={pageTitle}>Publications & patent</h1>
          <p className={pageLead}>
            Bridging applied engineering with peer-reviewed and patented work in machine learning
            and computer vision.
          </p>

          <section className={sectionGap}>
            <h2 className={sectionLabel}>Publications</h2>
            <div className="space-y-2">
              {publications.map((pub) => (
                <ResearchEntry
                  key={pub.id}
                  title={pub.title}
                  meta={`${pub.journal} · ${pub.year}`}
                  description={pub.description}
                  href={pub.link}
                  linkLabel="View paper →"
                />
              ))}
            </div>
          </section>

          <section className={`${sectionGap} pt-4`}>
            <h2 className={sectionLabel}>Patents</h2>
            <div className="space-y-2">
              {patents.map((patent) => (
                <ResearchEntry
                  key={patent.id}
                  title={patent.title}
                  meta={patent.year}
                  description={patent.description}
                  href={patent.link}
                  linkLabel="View certificate →"
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </SiteShell>
  );
}

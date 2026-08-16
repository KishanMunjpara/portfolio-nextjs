import type { Metadata } from 'next';
import SiteShell from '@/components/site/SiteShell';
import { certifications } from '@/data/certifications';
import {
  cardShell,
  cardTitle,
  contentMax,
  linkInline,
  listGrid,
  pageLead,
  pageShellCompact,
  pageTitle,
  sectionLabel,
  touchTarget,
} from '@/lib/siteClasses';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Certifications — Kishan Munjpara',
  description: 'Professional certifications in machine learning, data science, and cloud.',
};

export default function CertificationsPage() {
  return (
    <SiteShell>
      <div className={pageShellCompact}>
        <div className={contentMax}>
          <p className={sectionLabel}>Credentials</p>
          <h1 className={pageTitle}>Certifications</h1>
          <p className={pageLead}>
            ML, statistics, cloud, and engineering programs from NPTEL, Coursera, Amazon, IEEE, and
            others.
          </p>

          <div className={listGrid}>
            {certifications.map((cert) => (
              <article key={cert.id} className={cardShell}>
                <h2 className={cardTitle}>{cert.title}</h2>
                <p className="text-sm font-semibold text-harbourTeal-700">
                  {cert.issuer} · {cert.issueDate}
                </p>
                {cert.description ? (
                  <p className="text-sm text-slate-600 leading-relaxed text-pretty">{cert.description}</p>
                ) : null}
                {cert.certificateUrl ? (
                  <a
                    href={cert.certificateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(linkInline, 'text-sm', touchTarget)}
                  >
                    View certificate →
                  </a>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </div>
    </SiteShell>
  );
}

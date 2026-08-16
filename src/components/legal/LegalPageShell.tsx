import Link from 'next/link';
import { ReactNode } from 'react';
import SiteShell from '@/components/site/SiteShell';
import { personalInfo } from '@/data/personal';
import { LEGAL_LAST_UPDATED, SITE_URL } from '@/data/legal';
import { contentMax, linkInline, pagePadding } from '@/lib/siteClasses';

interface LegalPageShellProps {
  title: string;
  children: ReactNode;
}

export function LegalContactBlock() {
  return (
    <div className="bg-stone-100 p-4 rounded-lg not-prose border border-stone-200">
      <p className="text-slate-700 text-sm">
        <strong>Email:</strong>{' '}
        <a href={`mailto:${personalInfo.email}`} className={linkInline}>
          {personalInfo.email}
        </a>
        <br />
        <strong>Phone:</strong>{' '}
        <a href={`tel:${personalInfo.phone}`} className={linkInline}>
          {personalInfo.phone}
        </a>
        <br />
        <strong>Location:</strong> {personalInfo.location}
        <br />
        <strong>Website:</strong>{' '}
        <a href={SITE_URL} className={linkInline}>
          {SITE_URL}
        </a>
      </p>
    </div>
  );
}

export default function LegalPageShell({ title, children }: LegalPageShellProps) {
  return (
    <SiteShell>
      <div className={`pt-5 sm:pt-6 pb-8 sm:pb-10 ${pagePadding}`}>
        <div className={`${contentMax} max-w-3xl`}>
          <Link href="/" className={`${linkInline} text-sm inline-flex mb-8`}>
            ← Back home
          </Link>

          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2 text-balance">{title}</h1>
          <p className="text-slate-500 mb-8 text-sm">Last updated: {LEGAL_LAST_UPDATED}</p>

          <div className="prose prose-slate max-w-none text-slate-600">{children}</div>
        </div>
      </div>
    </SiteShell>
  );
}

import type { Metadata } from 'next';
import SiteShell from '@/components/site/SiteShell';
import { aboutInfo, personalInfo } from '@/data/personal';
import { opportunities } from '@/data/opportunities';
import { workExperience, education } from '@/data/experience';
import {
  contentMax,
  listEntry,
  listEntryTitle,
  mutedText,
  pageLead,
  pageShellCompact,
  pageTitle,
  sectionGap,
  sectionLabel,
} from '@/lib/siteClasses';

export const metadata: Metadata = {
  title: 'Work & Study — Kishan Munjpara',
  description: 'Industry experience and education in AI, data engineering, and machine learning.',
};

function formatDates(start: string, end: string | null) {
  return end ? `${start} — ${end}` : `${start} — present`;
}

function BackgroundEntry({
  title,
  subtitle,
  dates,
  description,
}: {
  title: string;
  subtitle: string;
  dates: string;
  description: string;
}) {
  return (
    <article className={listEntry}>
      <h3 className={listEntryTitle}>{title}</h3>
      <p className="text-sm font-semibold text-harbourTeal-700 text-pretty break-words">
        {subtitle} · {dates}
      </p>
      <p className={mutedText}>{description}</p>
    </article>
  );
}

export default function WorkAndStudyPage() {
  return (
    <SiteShell>
      <div className={pageShellCompact}>
        <div className={contentMax}>
          <p className={sectionLabel}>Background</p>
          <h1 className={pageTitle}>Work & study</h1>
          <p className={pageLead}>{personalInfo.description}</p>
          <p className="text-sm text-slate-500 mb-10">
            {aboutInfo.yearsExperience} years experience · {aboutInfo.completedProjects} projects ·{' '}
            {aboutInfo.companiesWorked} companies · IEEE published · patent filed
          </p>

          <section className={sectionGap}>
            <h2 className={sectionLabel}>Work</h2>
            <div className="space-y-2">
              {workExperience.map((role) => (
                <BackgroundEntry
                  key={role.id}
                  title={role.title}
                  subtitle={`${role.company}, ${role.location}`}
                  dates={formatDates(role.startDate, role.endDate)}
                  description={role.description}
                />
              ))}
            </div>
          </section>

          <section className={`${sectionGap} pt-4`}>
            <h2 className={sectionLabel}>Study</h2>
            <div className="space-y-2">
              {education.map((entry) => (
                <BackgroundEntry
                  key={entry.id}
                  title={entry.title}
                  subtitle={entry.company}
                  dates={formatDates(entry.startDate, entry.endDate)}
                  description={entry.description}
                />
              ))}
            </div>
          </section>

          <section className={`${sectionGap} pt-4`}>
            <h2 className={sectionLabel}>Open to</h2>
            <ul className="space-y-4">
              {opportunities.map((item) => (
                <li key={item.id} className="text-sm text-slate-600 leading-relaxed text-pretty">
                  <span className="font-bold text-slate-900">{item.title}</span>
                  {' — '}
                  {item.description}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </SiteShell>
  );
}

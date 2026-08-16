import type { Metadata } from 'next';
import SiteShell from '@/components/site/SiteShell';
import { projects } from '@/data/projects';
import { projectSummary } from '@/lib/projectSummary';
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
  title: 'Projects — Kishan Munjpara',
  description: 'Selected projects in AI, cloud backends, and production systems.',
};

export default function ProjectsPage() {
  return (
    <SiteShell>
      <div className={pageShellCompact}>
        <div className={contentMax}>
          <p className={sectionLabel}>Portfolio</p>
          <h1 className={pageTitle}>Shipped projects</h1>
          <p className={pageLead}>
            Production systems and research builds in Python, Azure, Neo4j, and GenAI — only work
            that is complete and deployable.
          </p>

          <div className={listGrid}>
            {projects.map((project) => (
              <article key={project.id} className={cardShell}>
                <h2 className={cardTitle}>{project.title}</h2>
                {project.impact ? (
                  <p className="text-sm font-semibold text-harbourTeal-700 leading-snug text-pretty">
                    {project.impact}
                  </p>
                ) : null}
                <p className="text-sm text-slate-600 leading-relaxed text-pretty">
                  {projectSummary(project.description, 160)}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.technologies.slice(0, 6).map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] font-medium text-slate-500 bg-stone-100 rounded px-2 py-0.5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                {project.links.length > 0 ? (
                  <div className="flex flex-wrap gap-4 pt-2">
                    {project.links.map((link) => (
                      <a
                        key={link.url}
                        href={link.url}
                        target={link.url.startsWith('http') ? '_blank' : undefined}
                        rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className={cn(linkInline, 'text-sm', touchTarget)}
                      >
                        {link.label} →
                      </a>
                    ))}
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </div>
    </SiteShell>
  );
}

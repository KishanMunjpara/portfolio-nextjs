'use client';

import { motion } from 'framer-motion';
import { projects } from '@/data/projects';
import ProjectCard from '@/components/portfolio/ProjectCard';
import { pageContainer, sectionHeader, sectionShell } from '@/lib/sectionClasses';
import { useMotionInitial } from '@/hooks/useMotionHydration';

const PRODUCTION_PROJECT_IDS = new Set(['project-smartvalyou', 'project-phenomenal']);

export default function PortfolioSection() {
  const fadeUp = useMotionInitial({ opacity: 0, y: 20 });
  const shippedProjects = projects.filter((p) => p.featured);

  return (
    <section id="portfolio" className={`${sectionShell} bg-stone-50`}>
      <div className={pageContainer}>
        <motion.div
          initial={fadeUp}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className={sectionHeader}
        >
          <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-harbourTeal-600 mb-1.5 sm:mb-2">
            Work
          </p>
          <h2 className="section-heading">Shipped projects</h2>
          <p className="section-subheading mt-2">
            Production work at a glance — details on request or in my resume.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3 md:gap-4">
          {shippedProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              highlight={PRODUCTION_PROJECT_IDS.has(project.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

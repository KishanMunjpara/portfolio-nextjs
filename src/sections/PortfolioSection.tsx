'use client';

import { motion } from 'framer-motion';
import { projects } from '@/data/projects';
import ProjectCard from '@/components/portfolio/ProjectCard';
import { useMotionInitial } from '@/hooks/useMotionHydration';

const PRODUCTION_PROJECT_IDS = new Set(['project-smartvalyou', 'project-phenomenal']);

export default function PortfolioSection() {
  const fadeUp = useMotionInitial({ opacity: 0, y: 20 });
  const shippedProjects = projects.filter((p) => p.featured);

  return (
    <section id="portfolio" className="py-14 sm:py-16 lg:py-20 bg-stone-50 overflow-x-hidden">
      <div className="container mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={fadeUp}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-10"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-harbourTeal-600 mb-2">Work</p>
          <h2 className="section-heading mb-3">Shipped projects</h2>
          <p className="section-subheading">
            Production work at a glance — details on request or in my resume.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
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

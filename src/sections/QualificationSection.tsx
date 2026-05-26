'use client';

import { motion } from 'framer-motion';
import { workExperience, education } from '@/data/experience';
import { Tabs, Timeline } from '@/components/ui';
import { pageContainer, sectionHeader, sectionShell } from '@/lib/sectionClasses';
import { useMotionInitial } from '@/hooks/useMotionHydration';

export default function QualificationSection() {
  const fadeUp = useMotionInitial({ opacity: 0, y: 20 });

  const tabItems = [
    {
      id: 'work',
      label: 'Work',
      content: (
        <Timeline 
          items={workExperience} 
          className="max-w-4xl mx-auto"
        />
      ),
    },
    {
      id: 'education',
      label: 'Education',
      content: (
        <Timeline 
          items={education} 
          className="max-w-4xl mx-auto"
        />
      ),
    },
  ];

  return (
    <section id="qualification" className={`${sectionShell} border-y border-stone-200/80 bg-white`}>
      <div className={pageContainer}>
        <motion.div
          initial={fadeUp}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className={sectionHeader}
        >
          <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-harbourTeal-600 mb-1.5 sm:mb-2">
            Experience
          </p>
          <h2 className="section-heading">Qualification</h2>
          <p className="section-subheading mt-2">My personal journey</p>
        </motion.div>

        <motion.div
          initial={fadeUp}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <Tabs
            items={tabItems}
            defaultTab="work"
            className="overflow-hidden rounded-lg bg-white p-3 shadow-md sm:rounded-xl sm:p-4 md:p-5"
          />
        </motion.div>
      </div>
    </section>
  );
}

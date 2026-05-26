'use client';

import { motion } from 'framer-motion';
import { workExperience, education } from '@/data/experience';
import { Tabs, Timeline } from '@/components/ui';
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
    <section id="qualification" className="py-16 sm:py-20 bg-white border-y border-stone-200/80 overflow-x-hidden">
      <div className="container mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={fadeUp}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-harbourTeal-600 mb-2">Experience</p>
          <h2 className="section-heading">Qualification</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            My personal journey
          </p>
        </motion.div>

        {/* Tabs */}
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
            className="bg-white rounded-xl shadow-lg p-4 sm:p-6 overflow-hidden"
          />
        </motion.div>
      </div>
    </section>
  );
}

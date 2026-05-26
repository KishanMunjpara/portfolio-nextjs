'use client';

import { motion } from 'framer-motion';
import { opportunities } from '@/data/opportunities';
import { personalInfo } from '@/data/personal';
import { pageContainer, sectionHeader, sectionShell } from '@/lib/sectionClasses';
import { useMotionInitial } from '@/hooks/useMotionHydration';
import { Button } from '@/components/ui';

export default function GoalsSection() {
  const fadeUp = useMotionInitial({ opacity: 0, y: 20 });
  const fadeLeft = useMotionInitial({ opacity: 0, x: -20 });

  return (
    <section id="open-to" className={`${sectionShell} bg-gradient-to-br from-stone-100 to-stone-50`}>
      <div className={pageContainer}>
        <motion.div
          initial={fadeUp}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className={sectionHeader}
        >
          <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-harbourTeal-600 mb-1.5 sm:mb-2">
            Opportunities
          </p>
          <h2 className="section-heading">Open to</h2>
          <p className="section-subheading mt-2">{personalInfo.availability}</p>
        </motion.div>

        <motion.div
          initial={fadeUp}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="space-y-2.5 rounded-xl bg-white p-3 shadow-md sm:space-y-3 sm:rounded-2xl sm:p-4 md:p-5">
            {opportunities.map((item, index) => (
              <motion.div
                key={item.id}
                initial={fadeLeft}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="min-w-0 rounded-lg border border-stone-200 bg-gradient-to-r from-white to-stone-50 p-3 sm:rounded-xl sm:p-4"
              >
                <h3 className="text-sm font-semibold text-gray-900 mb-1 text-balance sm:text-base sm:mb-1.5">
                  {item.title}
                </h3>
                <p className="text-xs leading-relaxed text-gray-700 sm:text-sm">{item.description}</p>
              </motion.div>
            ))}

            <div className="flex justify-center pt-1">
              <Button href="#contact" variant="primary" size="md" className="w-full sm:w-auto">
                Get in touch
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

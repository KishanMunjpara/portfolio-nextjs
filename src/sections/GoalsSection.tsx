'use client';

import { motion } from 'framer-motion';
import { opportunities } from '@/data/opportunities';
import { personalInfo } from '@/data/personal';
import { useMotionInitial } from '@/hooks/useMotionHydration';
import { Button } from '@/components/ui';

export default function GoalsSection() {
  const fadeUp = useMotionInitial({ opacity: 0, y: 20 });
  const fadeLeft = useMotionInitial({ opacity: 0, x: -20 });

  return (
    <section id="open-to" className="py-16 sm:py-20 bg-gradient-to-br from-stone-100 to-stone-50 overflow-x-hidden">
      <div className="container mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={fadeUp}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-harbourTeal-600 mb-2">Opportunities</p>
          <h2 className="section-heading mb-4">Open to</h2>
          <p className="section-subheading">
            {personalInfo.availability}
          </p>
        </motion.div>

        <motion.div
          initial={fadeUp}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-8 space-y-4 sm:space-y-6">
            {opportunities.map((item, index) => (
              <motion.div
                key={item.id}
                initial={fadeLeft}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-4 sm:p-6 bg-gradient-to-r from-white to-stone-100 rounded-xl border border-stone-200 min-w-0"
              >
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 text-balance">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}

            <div className="pt-2 flex justify-center">
              <Button href="#contact" variant="primary" size="lg" className="w-full sm:w-auto">
                Get in touch
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

'use client';

import { motion } from 'framer-motion';
import { aboutInfo } from '@/data/personal';
import { heroPresentation } from '@/data/hero';
import { Button } from '@/components/ui';
import { pageContainer, sectionGridGap, sectionHeader, sectionShell, sectionStack } from '@/lib/sectionClasses';
import { useMotionInitial } from '@/hooks/useMotionHydration';

export default function AboutSection() {
  const fadeUp = useMotionInitial({ opacity: 0, y: 20 });

  const stats = [
    { number: aboutInfo.yearsExperience, label: 'Years experience' },
    { number: aboutInfo.completedProjects, label: 'Shipped projects' },
    { number: aboutInfo.companiesWorked, label: 'Companies' },
  ];

  return (
    <section id="about" className={`${sectionShell} bg-stone-50`}>
      <div className={pageContainer}>
        <motion.div
          initial={fadeUp}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className={sectionHeader}
        >
          <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-harbourTeal-600 mb-1.5 sm:mb-2">
            {heroPresentation.locationLine}
          </p>
          <h2 className="section-heading">About</h2>
          <p className="section-subheading mt-2">
            Research depth and production engineering — from Macquarie to startup shipping.
          </p>
        </motion.div>

        <div className={`max-w-6xl mx-auto ${sectionStack}`}>
          <motion.div
            initial={fadeUp}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:justify-center sm:gap-3"
          >
            {heroPresentation.credibilityBadges.map((badge) => (
              <div
                key={badge.label}
                className="glass-card-light min-w-0 rounded-xl px-2.5 py-2 sm:px-3 sm:py-2.5 text-center sm:min-w-[8.5rem] border-t-2 border-t-sand-400"
              >
                <p className="text-xs font-bold uppercase tracking-wide text-harbour-900">{badge.label}</p>
                <p className="text-xs text-slate-500 mt-1">{badge.detail}</p>
              </div>
            ))}
          </motion.div>

          <div className={`grid grid-cols-1 lg:grid-cols-2 ${sectionGridGap}`}>
            <motion.div
              initial={fadeUp}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="space-y-3 sm:space-y-4"
            >
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed whitespace-pre-line">
                {aboutInfo.description}
              </p>

              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-lg border border-stone-200 bg-white p-2.5 text-center shadow-sm min-w-0 sm:rounded-xl sm:p-3"
                  >
                    <div className="text-base sm:text-lg font-bold text-harbour-900">{stat.number}</div>
                    <div className="text-xs text-slate-500 mt-1 leading-snug">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={fadeUp}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              viewport={{ once: true }}
              className="space-y-3 sm:space-y-4"
            >
              <div className="rounded-xl border border-harbourTeal-500/20 bg-harbour-900 p-3.5 text-stone-100 sm:rounded-2xl sm:p-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-harbourTeal-400">
                  {heroPresentation.studying.label}
                </p>
                <p className="font-semibold text-base mt-1 sm:text-lg">{heroPresentation.studying.headline}</p>
                <p className="text-xs text-stone-400 mt-0.5 sm:text-sm">{heroPresentation.university}</p>
                <ul className="mt-2 space-y-1 sm:mt-2.5">
                  {heroPresentation.studying.items.map((item) => (
                    <li key={item} className="text-xs text-stone-300 flex gap-1.5 sm:text-sm">
                      <span className="text-sand-400">·</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-sand-400/30 bg-white p-3.5 shadow-sm sm:rounded-2xl sm:p-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-sand-500">
                  {heroPresentation.shipping.label}
                </p>
                <p className="font-semibold text-base text-harbour-900 mt-1 sm:text-lg">
                  {heroPresentation.shipping.headline}
                </p>
                <ul className="mt-2 space-y-1 sm:mt-2.5">
                  {heroPresentation.shipping.items.map((item) => (
                    <li key={item} className="text-xs text-slate-600 flex gap-1.5 sm:text-sm">
                      <span className="text-harbourTeal-500">·</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="glass-card-light rounded-xl p-3.5 sm:p-4">
                <h3 className="text-sm font-semibold text-slate-900 mb-2 sm:text-base sm:mb-3">Technical skills</h3>
                <div className="space-y-2 text-sm sm:space-y-2.5">
                  {[
                    { label: 'Programming', skills: ['Python', 'FastAPI', 'SQL', 'Cypher'] },
                    { label: 'AI / ML', skills: ['PyTorch', 'LangChain', 'LLMs', 'Computer vision'] },
                    { label: 'Cloud & data', skills: ['Azure', 'Neo4j', 'MongoDB', 'Docker'] },
                  ].map((group) => (
                    <div key={group.label}>
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                        {group.label}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {group.skills.map((skill) => (
                          <span
                            key={skill}
                            className="rounded-md bg-stone-100 px-2 py-0.5 text-xs font-medium text-slate-700"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={fadeUp}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="rounded-xl bg-harbour-900 px-3.5 py-4 text-center text-stone-100 sm:rounded-2xl sm:px-5 sm:py-6"
          >
            <h3 className="text-base font-semibold mb-1.5 sm:text-lg sm:mb-2">Let&apos;s work together</h3>
            <p className="text-stone-400 text-xs sm:text-sm max-w-lg mx-auto mb-3 sm:mb-4 px-1">
              Internships, graduate roles, or research collaborations — based in Sydney, open to remote across AU.
            </p>
            <Button href="#contact" variant="primaryDark" size="md" className="w-full sm:w-auto">
              Start a conversation
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

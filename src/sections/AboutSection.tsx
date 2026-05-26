'use client';

import { motion } from 'framer-motion';
import { aboutInfo } from '@/data/personal';
import { heroPresentation } from '@/data/hero';
import { Button } from '@/components/ui';
import { useMotionInitial } from '@/hooks/useMotionHydration';

export default function AboutSection() {
  const fadeUp = useMotionInitial({ opacity: 0, y: 20 });

  const stats = [
    { number: aboutInfo.yearsExperience, label: 'Years experience' },
    { number: aboutInfo.completedProjects, label: 'Shipped projects' },
    { number: aboutInfo.companiesWorked, label: 'Companies' },
  ];

  return (
    <section id="about" className="py-16 sm:py-20 lg:py-24 bg-stone-50 overflow-x-hidden">
      <div className="container mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={fadeUp}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-harbourTeal-600 mb-2">
            {heroPresentation.locationLine}
          </p>
          <h2 className="section-heading">About</h2>
          <p className="section-subheading mt-3">
            Research depth and production engineering — from Macquarie to startup shipping.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto space-y-8">
          <motion.div
            initial={fadeUp}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:justify-center"
          >
            {heroPresentation.credibilityBadges.map((badge) => (
              <div
                key={badge.label}
                className="glass-card-light min-w-0 px-3 py-3 sm:px-4 text-center sm:min-w-[140px] border-t-2 border-t-sand-400"
              >
                <p className="text-xs font-bold uppercase tracking-wide text-harbour-900">{badge.label}</p>
                <p className="text-xs text-slate-500 mt-1">{badge.detail}</p>
              </div>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={fadeUp}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <p className="text-slate-700 leading-relaxed whitespace-pre-line">{aboutInfo.description}</p>

              <div className="grid grid-cols-1 xs:grid-cols-3 gap-3">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-stone-200 bg-white p-4 text-center shadow-sm min-w-0"
                  >
                    <div className="text-lg sm:text-xl font-bold text-harbour-900">{stat.number}</div>
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
              className="space-y-4"
            >
              <div className="rounded-2xl border border-harbourTeal-500/20 bg-harbour-900 p-5 text-stone-100">
                <p className="text-[10px] font-bold uppercase tracking-widest text-harbourTeal-400">
                  {heroPresentation.studying.label}
                </p>
                <p className="font-semibold text-lg mt-1">{heroPresentation.studying.headline}</p>
                <p className="text-sm text-stone-400 mt-1">{heroPresentation.university}</p>
                <ul className="mt-3 space-y-1.5">
                  {heroPresentation.studying.items.map((item) => (
                    <li key={item} className="text-sm text-stone-300 flex gap-2">
                      <span className="text-sand-400">·</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-sand-400/30 bg-white p-5 shadow-sm">
                <p className="text-[10px] font-bold uppercase tracking-widest text-sand-500">
                  {heroPresentation.shipping.label}
                </p>
                <p className="font-semibold text-lg text-harbour-900 mt-1">
                  {heroPresentation.shipping.headline}
                </p>
                <ul className="mt-3 space-y-1.5">
                  {heroPresentation.shipping.items.map((item) => (
                    <li key={item} className="text-sm text-slate-600 flex gap-2">
                      <span className="text-harbourTeal-500">·</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="glass-card-light p-5">
                <h3 className="text-base font-semibold text-slate-900 mb-3">Technical skills</h3>
                <div className="space-y-3 text-sm">
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
            className="rounded-2xl bg-harbour-900 px-4 py-6 sm:px-6 sm:py-8 text-center text-stone-100"
          >
            <h3 className="text-lg sm:text-xl font-semibold mb-2">Let&apos;s work together</h3>
            <p className="text-stone-400 text-sm sm:text-base max-w-lg mx-auto mb-5 px-1">
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

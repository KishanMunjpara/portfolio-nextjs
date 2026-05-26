'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { publications, patents } from '@/data/research';
import { Modal } from '@/components/ui';
import { pageContainer, sectionGridGap, sectionHeader, sectionShell } from '@/lib/sectionClasses';
import { useMotionInitial } from '@/hooks/useMotionHydration';

export default function ResearchSection() {
  const fadeUp = useMotionInitial({ opacity: 0, y: 20 });
  const fadeLeft = useMotionInitial({ opacity: 0, x: -50 });
  const fadeRight = useMotionInitial({ opacity: 0, x: 50 });

  const [selectedPublication, setSelectedPublication] = useState<typeof publications[0] | null>(null);
  const [selectedPatent, setSelectedPatent] = useState<typeof patents[0] | null>(null);

  return (
    <section id="research" className={`${sectionShell} bg-stone-50`}>
      <div className={pageContainer}>
        <motion.div
          initial={fadeUp}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className={sectionHeader}
        >
          <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-harbourTeal-600 mb-1.5 sm:mb-2">
            Credibility
          </p>
          <h2 className="section-heading">Research & patent</h2>
        </motion.div>

        <div className={`mx-auto grid max-w-4xl grid-cols-1 md:grid-cols-2 ${sectionGridGap}`}>
          {/* Publications */}
          <motion.div
            initial={fadeLeft}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedPublication(publications[0])}
              className="relative h-44 w-full overflow-hidden rounded-xl shadow-lg transition-all duration-300 sm:h-52 sm:rounded-2xl md:h-56"
            >
              <Image
                src="/assets/images/publication_bg.jpg"
                alt="Publications background"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-harbour-900/90 to-harbour-800/90 flex items-center justify-center">
                <div className="text-center p-6">
                  <h3 className="text-2xl font-bold mb-4 text-white drop-shadow-lg">Publications</h3>
                  <p className="text-lg text-white drop-shadow-md">
                    IEEE Research Papers
                  </p>
                </div>
              </div>
            </motion.button>
          </motion.div>

          {/* Patents */}
          <motion.div
            initial={fadeRight}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedPatent(patents[0])}
              className="relative h-44 w-full overflow-hidden rounded-xl shadow-lg transition-all duration-300 sm:h-52 sm:rounded-2xl md:h-56"
            >
              <Image
                src="/assets/images/patent_bg.jpg"
                alt="Patents background"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-harbourTeal-600/90 to-harbour-900/90 flex items-center justify-center">
                <div className="text-center p-6">
                  <h3 className="text-2xl font-bold mb-4 text-white drop-shadow-lg">Patents</h3>
                  <p className="text-lg text-white drop-shadow-md">
                    Intellectual Property
                  </p>
                </div>
              </div>
            </motion.button>
          </motion.div>
        </div>

        {/* Publication Modal */}
        {selectedPublication && (
          <Modal
            isOpen={!!selectedPublication}
            onClose={() => setSelectedPublication(null)}
            title={selectedPublication.title}
          >
            <div className="space-y-3 sm:space-y-4">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Journal: {selectedPublication.journal}
                </h4>
                <p className="text-gray-600 mb-4">
                  <strong>Link:</strong>{' '}
                  <a
                    href={selectedPublication.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-harbourTeal-600 hover:text-harbourTeal-700 underline"
                  >
                    {selectedPublication.link}
                  </a>
                </p>
                <p className="text-gray-600 mb-4">
                  <strong>Authors:</strong> {selectedPublication.authors.join(', ')}
                </p>
              </div>
              
              <div>
                <h5 className="text-md font-semibold text-gray-900 mb-2">
                  Abstract
                </h5>
                <p className="text-gray-700 leading-relaxed">
                  {selectedPublication.description}
                </p>
              </div>
            </div>
          </Modal>
        )}

        {/* Patent Modal */}
        {selectedPatent && (
          <Modal
            isOpen={!!selectedPatent}
            onClose={() => setSelectedPatent(null)}
            title={selectedPatent.title}
          >
            <div className="space-y-3 sm:space-y-4">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Patent Information
                </h4>
                <p className="text-gray-600 mb-4">
                  <strong>Link:</strong>{' '}
                  <a
                    href={selectedPatent.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-harbourTeal-600 hover:text-harbourTeal-700 underline"
                  >
                    Patent Certificate
                  </a>
                </p>
                <p className="text-gray-600 mb-4">
                  <strong>Inventors:</strong> {selectedPatent.authors.join(', ')}
                </p>
              </div>
              
              <div>
                <h5 className="text-md font-semibold text-gray-900 mb-2">
                  Description
                </h5>
                <p className="text-gray-700 leading-relaxed">
                  {selectedPatent.description}
                </p>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </section>
  );
}

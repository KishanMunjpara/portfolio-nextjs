'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { publications, patents } from '@/data/research';
import { Modal } from '@/components/ui';
import { useMotionInitial } from '@/hooks/useMotionHydration';

export default function ResearchSection() {
  const fadeUp = useMotionInitial({ opacity: 0, y: 20 });
  const fadeLeft = useMotionInitial({ opacity: 0, x: -50 });
  const fadeRight = useMotionInitial({ opacity: 0, x: 50 });

  const [selectedPublication, setSelectedPublication] = useState<typeof publications[0] | null>(null);
  const [selectedPatent, setSelectedPatent] = useState<typeof patents[0] | null>(null);

  return (
    <section id="research" className="py-16 sm:py-20 bg-stone-50 overflow-x-hidden">
      <div className="container mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={fadeUp}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-harbourTeal-600 mb-2">Credibility</p>
          <h2 className="section-heading">Research & patent</h2>
        </motion.div>

        {/* Research Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
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
              className="w-full h-64 relative rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300"
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
              className="w-full h-64 relative rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300"
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
            <div className="space-y-6">
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
            <div className="space-y-6">
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

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { certifications } from '@/data/certifications';
import CertificationCard from '@/components/portfolio/CertificationCard';
import { Modal } from '@/components/ui';
import { useMotionInitial } from '@/hooks/useMotionHydration';
import type { Certification } from '@/types';

export default function CertificateSection() {
  const fadeUp = useMotionInitial({ opacity: 0, y: 20 });
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openCert = (cert: Certification) => {
    setSelectedCert(cert);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCert(null);
  };

  return (
    <section id="certificate" className="py-14 sm:py-16 lg:py-20 bg-white overflow-x-hidden">
      <div className="container mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={fadeUp}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-10"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-harbourTeal-600 mb-2">
            Learning
          </p>
          <h2 className="section-heading">Certifications</h2>
        </motion.div>

        <motion.ul
          initial={fadeUp}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mx-auto grid max-w-5xl grid-cols-1 gap-3 xs:grid-cols-2 sm:gap-4 lg:grid-cols-3"
          aria-label="Certifications"
        >
          {certifications.map((cert, index) => (
            <CertificationCard
              key={cert.id}
              certification={cert}
              index={index}
              onSelect={openCert}
            />
          ))}
        </motion.ul>
      </div>

      {selectedCert ? (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={selectedCert.title}
          className="max-w-3xl"
        >
          <div className="space-y-4">
            <div className="flex flex-col gap-1 text-sm text-slate-600 xs:flex-row xs:items-center xs:justify-between">
              <span className="font-medium text-harbourTeal-600">{selectedCert.issuer}</span>
              <span>{selectedCert.issueDate}</span>
            </div>

            <div className="relative w-full aspect-[4/3] max-h-[min(70vh,28rem)] rounded-lg overflow-hidden bg-stone-100 border border-stone-200">
              <Image
                src={selectedCert.certificateUrl}
                alt={selectedCert.title}
                fill
                className="object-contain p-2"
                sizes="(max-width: 768px) 100vw, 720px"
              />
            </div>

            {selectedCert.description ? (
              <p className="text-sm text-slate-600">{selectedCert.description}</p>
            ) : null}

            <div className="flex justify-center pt-2">
              <a
                href={selectedCert.certificateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-harbour-900 px-4 py-2 text-sm font-medium text-white hover:bg-harbour-800 transition-colors"
              >
                Open full size
              </a>
            </div>
          </div>
        </Modal>
      ) : null}
    </section>
  );
}

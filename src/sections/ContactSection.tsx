'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { PhoneIcon, MapPinIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { personalInfo } from '@/data/personal';
import { contactFormSchema, ContactFormInput } from '@/lib/validations';
import { Button, Modal } from '@/components/ui';
import { pageContainer, sectionGridGap, sectionHeader, sectionShell } from '@/lib/sectionClasses';
import { useMotionInitial } from '@/hooks/useMotionHydration';
export default function ContactSection() {
  const fadeUp = useMotionInitial({ opacity: 0, y: 20 });
  const fadeLeft = useMotionInitial({ opacity: 0, x: -50 });
  const fadeRight = useMotionInitial({ opacity: 0, x: 50 });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormInput>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormInput) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      // Create email content
      const subject = `Contact from ${data.name} - ${data.purpose}`;
      const body = `Name: ${data.name}
Email: ${data.email}
Purpose: ${data.purpose}

Message:
${data.message}

---
This message was sent from your portfolio contact form.`;

      // Create Gmail compose URL with auto-focus on send button
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${personalInfo.email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      // Open Gmail in new tab
      if (typeof window !== 'undefined') {
        window.open(gmailUrl, '_blank');
      }
      
      // Show success message
      setSubmitStatus('success');
      reset();
      
      // Close modal after 2 seconds
      setTimeout(() => {
        setIsModalOpen(false);
        setSubmitStatus('idle');
      }, 2000);
      
    } catch (error) {
      console.error('Error opening email client:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: PhoneIcon,
      title: 'Call Me',
      value: personalInfo.phone,
      href: `tel:${personalInfo.phone}`,
    },
    {
      icon: MapPinIcon,
      title: 'Location',
      value: personalInfo.location,
    },
    {
      icon: EnvelopeIcon,
      title: 'Email',
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
    },
  ];

  return (
    <section id="contact" className={`${sectionShell} bg-white`}>
      <div className={pageContainer}>
        <motion.div
          initial={fadeUp}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className={sectionHeader}
        >
          <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-harbourTeal-600 mb-1.5 sm:mb-2">
            Sydney · AU
          </p>
          <h2 className="section-heading">Contact</h2>
          <p className="section-subheading mt-2">
            Send a message — we&apos;ll open Gmail with your details pre-filled.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className={`grid grid-cols-1 lg:grid-cols-2 ${sectionGridGap}`}>
            <motion.div
              initial={fadeLeft}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-2.5 sm:space-y-3"
            >
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={fadeUp}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex min-w-0 items-center gap-2.5 rounded-lg border border-stone-100 bg-white p-3 shadow-sm transition-shadow hover:shadow-md sm:gap-3 sm:rounded-xl sm:p-3.5"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-harbourTeal-500/15 sm:h-10 sm:w-10">
                    <info.icon className="h-4 w-4 text-harbourTeal-600 sm:h-5 sm:w-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-gray-900 sm:text-base">
                      {info.title}
                    </h3>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="block text-sm sm:text-base text-gray-600 hover:text-harbourTeal-600 transition-colors break-all"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-gray-600">{info.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Contact Form Button */}
              <motion.div
                initial={fadeUp}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="pt-2 sm:pt-3"
              >
                <Button
                  onClick={() => setIsModalOpen(true)}
                  variant="primary"
                  size="md"
                  className="w-full"
                >
                  Send Message
                </Button>
              </motion.div>
            </motion.div>

            {/* Contact Form Modal */}
            <Modal
              isOpen={isModalOpen}
              onClose={() => {
                setIsModalOpen(false);
                setSubmitStatus('idle');
              }}
              title="Contact Me"
            >
              {submitStatus === 'success' ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Gmail Opened!</h3>
                  <p className="text-gray-600 mb-4">Your email is ready to send. Please click "Send" in Gmail to complete the process.</p>
                  <div className="bg-harbourTeal-500/10 border border-harbourTeal-500/20 rounded-lg p-4">
                    <p className="text-sm text-harbour-900">
                      <strong>Next step:</strong> Click the "Send" button in the Gmail window that opened.
                    </p>
                  </div>
                </div>
              ) : submitStatus === 'error' ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Failed to Send Message</h3>
                  <p className="text-gray-600 mb-4">There was an error sending your message. Please try again.</p>
                  <Button
                    onClick={() => setSubmitStatus('idle')}
                    variant="primary"
                    size="md"
                  >
                    Try Again
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    {...register('name')}
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-harbourTeal-500 focus:border-transparent transition-colors"
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-harbourTeal-500 focus:border-transparent transition-colors"
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>

                {/* Purpose Field */}
                <div>
                  <label htmlFor="purpose" className="block text-sm font-medium text-gray-700 mb-2">
                    Purpose *
                  </label>
                  <input
                    {...register('purpose')}
                    type="text"
                    id="purpose"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-harbourTeal-500 focus:border-transparent transition-colors"
                    placeholder="What's this about?"
                  />
                  {errors.purpose && (
                    <p className="mt-1 text-sm text-red-600">{errors.purpose.message}</p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    {...register('message')}
                    id="message"
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-harbourTeal-500 focus:border-transparent transition-colors resize-none"
                    placeholder="Enter your message"
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                  )}
                </div>

                <p className="text-sm text-gray-500" id="contact-form-note">
                  Submitting opens Gmail in a new tab with your message ready to send.
                </p>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full"
                  aria-describedby="contact-form-note"
                >
                  {isSubmitting ? 'Opening Gmail...' : 'Compose in Gmail'}
                </Button>
              </form>
              )}
            </Modal>

            {/* Decorative Image */}
            <motion.div
              initial={fadeRight}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="hidden justify-center lg:flex lg:justify-end"
            >
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 rounded-full bg-sand-400/10 blur-3xl"
                />
                <Image
                  src="/assets/images/contact2.png"
                  alt="Contact illustration"
                  width={280}
                  height={280}
                  className="relative h-auto w-full max-w-[14rem] object-contain xl:max-w-[16rem]"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

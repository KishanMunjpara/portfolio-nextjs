import Layout from '@/components/layout/Layout';
import {
  HeroSection,
  AboutSection,
  QualificationSection,
  PortfolioSection,
  ResearchSection,
  CertificateSection,
  GoalsSection,
  ContactSection,
} from '@/sections';

export default function HomePage() {
  return (
    <Layout>
      <HeroSection />
      <AboutSection />
      <QualificationSection />
      <PortfolioSection />
      <ResearchSection />
      <CertificateSection />
      <GoalsSection />
      <ContactSection />
    </Layout>
  );
}
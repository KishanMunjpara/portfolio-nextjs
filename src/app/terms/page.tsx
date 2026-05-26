import type { Metadata } from 'next';
import Link from 'next/link';
import LegalPageShell, { LegalContactBlock } from '@/components/legal/LegalPageShell';
import { OPERATOR_NAME, SITE_URL } from '@/data/legal';

export const metadata: Metadata = {
  title: 'Terms & Conditions — Kishan Munjpara',
  description: 'Terms and conditions for using Kishan Munjpara\'s portfolio website.',
};

export default function TermsConditions() {
  return (
    <LegalPageShell title="Terms & Conditions">
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Agreement</h2>
        <p className="mb-4">
          By accessing or using {SITE_URL} (the &quot;Site&quot;), you agree to these Terms &amp;
          Conditions (&quot;Terms&quot;). The Site is operated by {OPERATOR_NAME} (&quot;I&quot;,
          &quot;me&quot;, or &quot;my&quot;). If you do not agree, please do not use the Site.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Nature of the Site</h2>
        <p className="mb-4">
          The Site is a personal portfolio for professional and academic purposes. Content describes
          my experience, education, projects, research, and availability for opportunities. Nothing
          on the Site constitutes a binding job offer, contract, or legal advice unless we agree
          separately in writing.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Permitted use</h2>
        <p className="mb-4">You may use the Site to:</p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>View my portfolio and professional information</li>
          <li>Contact me about roles, collaborations, or enquiries</li>
          <li>Follow links to external resources (GitHub, LinkedIn, demos, papers) where provided</li>
        </ul>
        <p className="mb-4">You agree not to:</p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Use the Site for unlawful, harmful, or fraudulent purposes</li>
          <li>Attempt to disrupt, scrape excessively, or gain unauthorized access to the Site or its hosting</li>
          <li>Upload malware or send abusive, defamatory, or harassing communications</li>
          <li>Misrepresent your identity or affiliation when contacting me</li>
          <li>Copy, republish, or commercially exploit Site content without my prior written permission</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Intellectual property</h2>
        <p className="mb-4">
          Unless stated otherwise, content on the Site — including text, layout, images, logos, and
          design — is owned by or licensed to me and protected by copyright and other intellectual
          property laws. Project names, employer logos, and third-party trademarks belong to their
          respective owners.
        </p>
        <p className="mb-4">
          Open-source or public repositories linked from the Site may be subject to their own
          licences. You may view and download materials only for personal, non-commercial reference
          unless I or the rights holder gives written permission for other uses.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Portfolio projects and accuracy</h2>
        <p className="mb-4">
          Project descriptions reflect work completed or substantially delivered at the time of
          publication. I aim to keep information accurate but do not guarantee that every detail is
          current or complete. Employers, dates, and technologies may be updated without notice.
          Only shipped or completed work is presented in the portfolio section unless clearly
          labelled otherwise.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Contact form and communications</h2>
        <p className="mb-4">
          The contact form prepares an email draft and may open Gmail in your browser. You are
          responsible for reviewing and sending that message. I am not obligated to respond to
          every enquiry. I may decline or ignore messages that are spam, abusive, or unrelated to
          legitimate professional contact.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Third-party links</h2>
        <p className="mb-4">
          The Site links to external websites (for example GitHub, LinkedIn, research publishers, or
          live demos). I do not control those sites and am not responsible for their content,
          availability, or practices. Your use of third-party services is at your own risk and
          subject to their terms.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Disclaimer</h2>
        <p className="mb-4">
          The Site and all materials are provided on an &quot;as is&quot; and &quot;as available&quot;
          basis. To the fullest extent permitted by law, I disclaim all warranties, express or
          implied, including fitness for a particular purpose and non-infringement. Views expressed
          are my own and do not necessarily represent any university or past employer.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Limitation of liability</h2>
        <p className="mb-4">
          To the fullest extent permitted by law, I am not liable for any indirect, incidental,
          special, or consequential damages arising from your use of the Site, reliance on its
          content, or inability to access it — including loss of data, profit, or opportunity.
        </p>
        <p className="mb-4">
          Nothing in these Terms excludes, restricts, or modifies rights or remedies you may have
          under the Australian Consumer Law or other non-excludable laws.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Privacy</h2>
        <p className="mb-4">
          Your use of the Site is also governed by my{' '}
          <Link href="/privacy" className="text-purple-600 hover:text-purple-800">
            Privacy Policy
          </Link>
          , which explains how I handle personal information.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Governing law</h2>
        <p className="mb-4">
          These Terms are governed by the laws of New South Wales, Australia. You submit to the
          non-exclusive jurisdiction of the courts of New South Wales for disputes arising in
          connection with the Site, subject to any mandatory consumer protections in your place of
          residence.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Changes to these Terms</h2>
        <p className="mb-4">
          I may update these Terms at any time. The &quot;Last updated&quot; date will reflect the
          latest version. Your continued use of the Site after changes constitutes acceptance of the
          revised Terms.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Contact</h2>
        <p className="mb-4">Questions about these Terms:</p>
        <LegalContactBlock />
        <p className="mt-4">
          See also my{' '}
          <Link href="/privacy" className="text-purple-600 hover:text-purple-800">
            Privacy Policy
          </Link>
          .
        </p>
      </section>
    </LegalPageShell>
  );
}

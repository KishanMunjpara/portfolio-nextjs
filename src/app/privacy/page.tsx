import type { Metadata } from 'next';
import Link from 'next/link';
import LegalPageShell, { LegalContactBlock } from '@/components/legal/LegalPageShell';
import { OPERATOR_NAME, SITE_URL } from '@/data/legal';

export const metadata: Metadata = {
  title: 'Privacy Policy — Kishan Munjpara',
  description: 'How this portfolio website collects, uses, and protects your information.',
};

export default function PrivacyPolicy() {
  return (
    <LegalPageShell title="Privacy Policy">
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Who operates this site</h2>
        <p className="mb-4">
          This Privacy Policy applies to {SITE_URL} (the &quot;Site&quot;), a personal portfolio
          website operated by {OPERATOR_NAME} (&quot;I&quot;, &quot;me&quot;, or &quot;my&quot;). The
          Site showcases my professional background, projects, research, and contact details. It is
          not a commercial online store and does not create user accounts.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Information I collect</h2>
        <p className="mb-4">I may collect or receive the following categories of information:</p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>
            <strong>Contact details you choose to send:</strong> If you use the contact form, you
            may enter your name, email address, purpose, and message. The form runs in your browser
            and opens Gmail (Google) with those fields pre-filled. I do not operate a server-side
            database that stores form submissions on this Site.
          </li>
          <li>
            <strong>Direct communications:</strong> If you email or call me using details on the
            Site, I receive whatever information you include in that communication.
          </li>
          <li>
            <strong>Technical and usage data:</strong> My hosting provider (Vercel) and your browser
            may automatically process data such as IP address, request timestamps, browser type,
            device type, and pages requested. This is typical for static websites and helps operate
            and secure the Site.
          </li>
        </ul>
        <p className="mb-4">
          I do not intentionally collect sensitive information (such as health or government ID
          numbers) through the Site. Please do not include sensitive information in the contact form
          unless it is necessary for your enquiry.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How I use information</h2>
        <p className="mb-4">I use information to:</p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Respond to enquiries about work, study, research, or collaboration</li>
          <li>Maintain and improve the Site (including security and performance)</li>
          <li>Understand general traffic patterns through hosting logs where available</li>
          <li>Comply with legal obligations if required</li>
        </ul>
        <p className="mb-4">
          I do not sell your personal information. I do not use your contact details for unrelated
          marketing lists.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Contact form and Gmail</h2>
        <p className="mb-4">
          When you submit the contact form, your message is prepared locally and Gmail may open in a
          new tab. You must review and send the email yourself. Google&apos;s handling of your data
          in Gmail is governed by{' '}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-600 hover:text-purple-800"
          >
            Google&apos;s Privacy Policy
          </a>
          . I only receive information you actually send to me.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Third-party services and links</h2>
        <p className="mb-4">The Site may link to or embed content from third parties, including:</p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>
            <strong>Vercel</strong> — website hosting and delivery (
            <a
              href="https://vercel.com/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 hover:text-purple-800"
            >
              Vercel Privacy Policy
            </a>
            )
          </li>
          <li>
            <strong>Google / Gmail</strong> — optional email composition when you contact me
          </li>
          <li>
            <strong>LinkedIn, GitHub, and project/demo URLs</strong> — when you click outbound links
          </li>
        </ul>
        <p className="mb-4">
          Those services have their own privacy practices. I am not responsible for third-party
          websites you visit after leaving the Site.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Cookies and local storage</h2>
        <p className="mb-4">
          The Site is a mostly static portfolio. I do not run first-party advertising cookies or
          sell data to ad networks. Your browser may store standard session or preference data.
          Hosting infrastructure may set technical cookies or similar identifiers required for
          security, caching, or performance. You can manage cookies through your browser settings.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Storage, retention, and security</h2>
        <p className="mb-4">
          Emails and messages you send me are kept only as long as needed for the conversation and
          my reasonable records. Hosting logs are retained according to Vercel&apos;s practices. I
          take reasonable steps to protect information, but no internet transmission is completely
          secure.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Overseas disclosure</h2>
        <p className="mb-4">
          I am based in Australia. Hosting and some linked services may process data in other
          countries (for example, the United States). Where applicable, I take reasonable steps to
          ensure overseas recipients handle personal information in a way consistent with this
          Policy and Australian privacy standards.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Your rights</h2>
        <p className="mb-4">
          Depending on where you live, you may have rights to access, correct, or delete personal
          information I hold about you, or to withdraw consent where processing is consent-based.
          In Australia, you may also complain to the Office of the Australian Information
          Commissioner (OAIC) if you believe I have mishandled your information.
        </p>
        <p className="mb-4">
          To exercise your rights, contact me using the details below. I will respond within a
          reasonable time.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Children</h2>
        <p className="mb-4">
          The Site is intended for a general professional audience and is not directed at children
          under 16. I do not knowingly collect personal information from children.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Changes to this policy</h2>
        <p className="mb-4">
          I may update this Privacy Policy from time to time. The &quot;Last updated&quot; date at
          the top will change when I do. Continued use of the Site after changes means you accept
          the revised Policy.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Contact me</h2>
        <p className="mb-4">Questions about this Privacy Policy or your information:</p>
        <LegalContactBlock />
        <p className="mt-4">
          See also my{' '}
          <Link href="/terms" className="text-purple-600 hover:text-purple-800">
            Terms &amp; Conditions
          </Link>
          .
        </p>
      </section>
    </LegalPageShell>
  );
}

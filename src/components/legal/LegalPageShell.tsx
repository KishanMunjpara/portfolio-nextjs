import Link from 'next/link';
import { ReactNode } from 'react';
import { personalInfo } from '@/data/personal';
import { LEGAL_LAST_UPDATED, SITE_URL } from '@/data/legal';

interface LegalPageShellProps {
  title: string;
  children: ReactNode;
}

export function LegalContactBlock() {
  return (
    <div className="bg-gray-50 p-4 rounded-lg not-prose">
      <p className="text-gray-700">
        <strong>Email:</strong>{' '}
        <a
          href={`mailto:${personalInfo.email}`}
          className="text-purple-600 hover:text-purple-800"
        >
          {personalInfo.email}
        </a>
        <br />
        <strong>Phone:</strong>{' '}
        <a href={`tel:${personalInfo.phone}`} className="text-purple-600 hover:text-purple-800">
          {personalInfo.phone}
        </a>
        <br />
        <strong>Location:</strong> {personalInfo.location}
        <br />
        <strong>Website:</strong>{' '}
        <a href={SITE_URL} className="text-purple-600 hover:text-purple-800">
          {SITE_URL}
        </a>
      </p>
    </div>
  );
}

export default function LegalPageShell({ title, children }: LegalPageShellProps) {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-purple-600 hover:text-purple-800 mb-6"
          >
            ← Back to portfolio
          </Link>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
          <p className="text-gray-600 mb-8">
            <strong>Last updated:</strong> {LEGAL_LAST_UPDATED}
          </p>

          <div className="prose prose-lg max-w-none text-gray-700">{children}</div>
        </div>
      </div>
    </div>
  );
}

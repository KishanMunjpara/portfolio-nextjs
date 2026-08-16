import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import JsonLd from "@/components/seo/JsonLd";
import { SITE_URL } from "@/data/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Kishan Munjpara — MIT (AI) Student & Data & AI Engineer",
  description: "MIT (AI) student at Macquarie University, Sydney. Data & AI engineer with 2+ years shipping cloud and AI systems in Python. Open to internships, graduate roles, and research collaborations.",
  keywords: [
    "Kishan Munjpara",
    "Data Engineer",
    "AI Engineer",
    "Machine Learning Engineer",
    "Python Developer",
    "Azure Functions",
    "Neo4j",
    "LangChain",
    "Docker",
    "Macquarie University",
    "Sydney",
    "Portfolio",
    "IEEE Researcher",
    "Deep Learning",
    "NLP",
    "Computer Vision",
  ],
  authors: [{ name: "Kishan Munjpara" }],
  creator: "Kishan Munjpara",
  publisher: "Kishan Munjpara",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Kishan Munjpara — MIT (AI) Student & Data & AI Engineer",
    description: "MIT (AI) student at Macquarie University. Data & AI engineer building production Python systems. Open to internships, roles, and research collaborations in Sydney and remote AU.",
    url: SITE_URL,
    siteName: "Kishan Munjpara — Portfolio",
    images: [
      {
        url: "/assets/images/profile-og.jpg",
        width: 1200,
        height: 630,
        alt: "Kishan Munjpara — MIT (AI) Student & Data & AI Engineer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kishan Munjpara — MIT (AI) Student & Data & AI Engineer",
    description: "MIT (AI) student at Macquarie University. Open to internships, graduate roles, and research collaborations.",
    images: ["/assets/images/profile-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <JsonLd />
      </head>
      <body className="font-sans antialiased bg-stone-50 text-slate-900" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

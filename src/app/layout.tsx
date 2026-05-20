import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk, Newsreader, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const hanken = Hanken_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const newsreader = Newsreader({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

const SITE_URL = "https://bretdubois.github.io";
const SITE_TITLE = "Bret DuBois · Solutions Engineering · Infrastructure · Automation";
const SITE_DESCRIPTION =
  "Portfolio of Bret DuBois, Solutions Engineer and technical consultant specializing in network infrastructure, systems automation, API integration, and pre-sales technical advisory. Based in Redwood City, CA.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  authors: [{ name: "Bret DuBois", url: "https://www.linkedin.com/in/bretdubois/" }],
  creator: "Bret DuBois",
  keywords: [
    "Bret DuBois",
    "solutions engineer",
    "customer engineer",
    "technical consultant",
    "pre-sales engineering",
    "network infrastructure",
    "Ubiquiti UniFi",
    "systems automation",
    "API integration",
    "B2B SaaS",
    "IoT",
    "technical advisory",
    "infrastructure design",
  ],
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Bret DuBois",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#E5E8EE" },
    { media: "(prefers-color-scheme: dark)", color: "#1A2030" },
  ],
  width: "device-width",
  initialScale: 1,
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Bret DuBois",
  url: SITE_URL,
  jobTitle: "Solutions Engineer",
  description: SITE_DESCRIPTION,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Redwood City",
    addressRegion: "CA",
    addressCountry: "US",
  },
  sameAs: ["https://www.linkedin.com/in/bretdubois/"],
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "UC San Diego" },
    { "@type": "CollegeOrUniversity", name: "College of San Mateo" },
  ],
};

// Prevents FOUC: applies .dark before first paint based on stored or system preference.
const themeInitScript = `
try {
  const t = localStorage.getItem('theme');
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (t === 'dark' || (!t && systemDark)) {
    document.documentElement.classList.add('dark');
  }
} catch (_) {}
`.trim();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${hanken.variable} ${newsreader.variable} ${plexMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <a href="#main" className="skip-link">Skip to main content</a>
        {children}
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter, JetBrains_Mono } from "next/font/google";
import LenisProvider from "@/providers/LenisProvider";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://bretdubois.github.io";
const SITE_TITLE = "Bret DuBois — Solutions Engineering · Infrastructure · Automation";
const SITE_DESCRIPTION =
  "Portfolio of Bret DuBois — Solutions Engineer and technical consultant specializing in network infrastructure, systems automation, API integration, and pre-sales technical advisory. Based in Redwood City, CA.";

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
    { media: "(prefers-color-scheme: light)", color: "#FAF7F2" },
    { media: "(prefers-color-scheme: dark)", color: "#18110E" },
  ],
  width: "device-width",
  initialScale: 1,
};

// Person schema for rich search results
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

// Prevents a flash of the wrong theme on first paint. Must run synchronously
// before React hydrates so the `.dark` class is set before the body paints.
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
      className={`${playfair.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
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
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-[var(--accent)] focus:text-white focus:font-medium focus:shadow-lg"
        >
          Skip to main content
        </a>
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}

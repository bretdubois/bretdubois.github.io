import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  axes: ["opsz"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jbmono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://brdubois.com";
const SITE_TITLE = "Bret DuBois";
const SITE_DESCRIPTION =
  "Solutions engineering candidate with a technical sales background who builds and runs his own infrastructure: a self-hosted Docker stack, a broker-integrated trading system, indoor-positioning hardware, and the automation that operates it all.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s · Bret DuBois",
  },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  authors: [{ name: "Bret DuBois", url: "https://www.linkedin.com/in/bretdubois/" }],
  creator: "Bret DuBois",
  keywords: [
    "Bret DuBois",
    "solutions engineer",
    "sales engineer",
    "technical account manager",
    "pre-sales engineering",
    "infrastructure",
    "homelab",
    "network engineering",
    "AI tooling",
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
  themeColor: "#fbfaf7",
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
  sameAs: [
    "https://www.linkedin.com/in/bretdubois/",
    "https://github.com/bretdubois",
  ],
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "UC San Diego" },
    { "@type": "CollegeOrUniversity", name: "College of San Mateo" },
  ],
};

function Header() {
  return (
    <header className="no-print" style={{ borderBottom: "2px solid var(--rule-strong)" }}>
      <div className="shell flex items-baseline justify-between py-5">
        <Link
          href="/"
          className="font-semibold tracking-tight"
          style={{ color: "var(--ink)", textDecoration: "none", fontSize: "0.9375rem" }}
        >
          Bret DuBois
          <span aria-hidden style={{ color: "var(--accent)" }}>
            .
          </span>
        </Link>
        <nav className="meta flex gap-5">
          <Link href="/#projects" className="hover:text-[var(--accent)]">
            projects
          </Link>
          <Link href="/resume/" className="hover:text-[var(--accent)]">
            résumé
          </Link>
          <a
            href="https://github.com/bretdubois"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--accent)]"
          >
            github
          </a>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="no-print mt-24" style={{ borderTop: "2px solid var(--rule-strong)" }}>
      <div className="shell meta flex flex-wrap items-baseline justify-between gap-2 py-6">
        <span>© {new Date().getFullYear()} Bret DuBois · Redwood City, CA</span>
        <span className="flex gap-5">
          <a href="mailto:bretdubois1@gmail.com" className="hover:text-[var(--accent)]">
            email
          </a>
          <a
            href="https://www.linkedin.com/in/bretdubois/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--accent)]"
          >
            linkedin
          </a>
          <Link href="/colophon/" className="hover:text-[var(--accent)]">
            colophon
          </Link>
          <a
            href="https://github.com/bretdubois/bretdubois.github.io"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--accent)]"
          >
            source
          </a>
        </span>
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-[var(--ink)] focus:px-3 focus:py-1.5 focus:text-sm focus:text-white"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Bret DuBois — Technical Sales × Maker × Designer",
  description:
    "Multidisciplinary professional bridging technical depth and human connection. B2B SaaS, IoT, networking, AI, and HCI design—all in one place.",
  keywords: [
    "Bret DuBois",
    "technical sales",
    "B2B SaaS",
    "portfolio",
    "product management",
    "HCI",
    "networking",
    "IoT",
    "FPV drones",
  ],
  authors: [{ name: "Bret DuBois" }],
  openGraph: {
    title: "Bret DuBois — Technical Sales × Maker × Designer",
    description:
      "Bridging technical depth and human connection. Explore my work in B2B SaaS, IoT, networking, and design.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bret DuBois — Technical Sales × Maker × Designer",
    description:
      "Bridging technical depth and human connection. Explore my work in B2B SaaS, IoT, networking, and design.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

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
      <body className="min-h-full flex flex-col">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}

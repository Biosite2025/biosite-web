import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { TopNav } from "../src/components/layout/TopNav";
import React from "react";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const DESCRIPTION = "Transforming healthcare through advanced diagnostic and medical supplies. Explore our comprehensive range of premium laboratory tools, diagnostic devices, and medical equipment in the Philippines.";
const LOGO = "/asset/favicon/web-app-manifest-512x512.png";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
  description: DESCRIPTION,
  authors: [{ name: "Biosite Philippines" }],
  icons: {
    // favicon.svg is a 384 KB embedded bitmap, so browsers get the small ICO/PNG icons instead.
    icon: [
      { url: "/asset/favicon/favicon.ico", sizes: "any" },
      { url: "/asset/favicon/favicon-96x96.png", type: "image/png", sizes: "96x96" },
      { url: "/asset/favicon/web-app-manifest-192x192.png", type: "image/png", sizes: "192x192" },
    ],
    shortcut: "/asset/favicon/favicon.ico",
    apple: { url: "/asset/favicon/apple-touch-icon.png", sizes: "180x180" },
  },
  manifest: "/asset/favicon/site.webmanifest",
  openGraph: {
    type: "website",
    siteName: "Biosite Philippines",
    title: SITE_NAME,
    description: DESCRIPTION,
    images: [{ url: LOGO, width: 512, height: 512, type: "image/png" }],
  },
  twitter: { card: "summary", title: SITE_NAME, description: DESCRIPTION, images: [LOGO] },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

const office = (streetAddress: string, addressLocality: string, postalCode: string) => ({
  "@type": "PostalAddress",
  streetAddress,
  addressLocality,
  postalCode,
  addressCountry: "PH",
});

// Offices, phone and social links match the Contact page and the site footer.
const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  alternateName: "Biosite Philippines",
  url: SITE_URL,
  logo: `${SITE_URL}${LOGO}`,
  description: "Leading provider of advanced diagnostic and medical supplies in the Philippines",
  telephone: "+63 917 111 5008",
  address: [
    office("305 Col. Bonny Serrano Ave", "San Juan City, Metro Manila", "1500"),
    office("Block 2 Lot 2 Guadalupe Heights Village, Guadalupe", "Cebu City", "6000"),
    office("555 Manga St., Juna Subd, Matina", "Davao City", "8000"),
  ],
  sameAs: [
    "https://www.facebook.com/bmibiosite",
    "https://www.linkedin.com/company/biosite-medical-instruments-inc/",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        {/* Laptop/desktop scale-to-fit: the desktop layout is designed at 1920px
            wide. On screens >= 1024px the whole page is zoomed so every laptop
            shows the same composition, just scaled to its width (a 1280px
            laptop renders at 2/3). --vh / --vw carry the real viewport size in
            the zoomed coordinate space, so full-screen sections still fill the
            screen. Phones and tablets keep their own responsive layouts.
            Inline + before paint to avoid a flash of the unscaled layout. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var D=1920,M=1024,MAX=1.5,r=document.documentElement;function fit(){var w=window.innerWidth,h=window.innerHeight,z=w>=M?Math.min(w/D,MAX):1;if(Math.abs(z-1)<0.01){r.style.zoom='';r.style.removeProperty('--vh');r.style.removeProperty('--vw');r.removeAttribute('data-fit');return}r.style.zoom=String(z);r.style.setProperty('--vh',(h/z/100)+'px');r.style.setProperty('--vw',(w/z/100)+'px');r.setAttribute('data-fit','')}fit();window.addEventListener('resize',fit)})();`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
        />

        <TopNav />

        <main className="relative z-10 min-h-[calc(var(--vh,1vh)*100)] bg-white">
          {children}
        </main>
      </body>
    </html>
  );
}

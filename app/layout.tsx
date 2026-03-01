import type { ReactNode } from "react";
import type { Metadata } from "next";
import { profile } from "@/data/profile";
import "./globals.css";

export const metadata: Metadata = {
  title: `${profile.name} | ${profile.title}`,
  description: profile.summary,
  openGraph: {
    title: `${profile.name} | ${profile.title}`,
    description: profile.positioning,
    type: "website",
    url: "https://ilyas-portfolio.dev"
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} | ${profile.title}`,
    description: profile.positioning
  }
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: `${profile.title} / ${profile.subtitle}`,
  address: { "@type": "PostalAddress", addressCountry: "MA" },
  sameAs: [profile.contact.linkedin, profile.contact.github],
  email: `mailto:${profile.contact.email}`
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: `${profile.name} Portfolio`,
  url: "https://ilyas-portfolio.dev"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
        {children}
      </body>
    </html>
  );
}

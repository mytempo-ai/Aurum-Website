import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";
import CustomCursor from "@/components/ui/CustomCursor";
import LenisProvider from "@/components/layout/LenisProvider";
import StructuredData from "@/components/seo/StructuredData";

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#C8933A',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://aurum.events'),
  title: {
    default: 'Aurum Events & Catering — Freehold NJ Premier Event Venue',
    template: '%s | Aurum Events & Catering',
  },
  description: 'Freehold NJ\'s premiere event space. Weddings, Sweet 16s, Bar/Bat Mitzvahs, Corporate Events, and more. NYC loft ambiance with Executive Chef Aaron Hode. Call (732) 294-0031.',
  keywords: [
    // Brand
    'Aurum Events',
    'Aurum Events and Catering',
    'Aurum Events & Caterers',
    'Aurum Events Freehold NJ',
    // Primary — Homepage
    'event venue Freehold NJ',
    'event space Freehold NJ',
    'Freehold NJ premiere event space',
    'catering hall NJ',
    'modern catering venue NJ',
    'catering hall Freehold NJ',
    'reception hall NJ',
    'banquet hall Freehold NJ',
    // Wedding
    'wedding venue Freehold NJ',
    'wedding venue NJ',
    'wedding venue Monmouth County NJ',
    'wedding catering NJ',
    'wedding reception venue NJ',
    'all inclusive wedding venue NJ',
    // Sweet 16
    'Sweet 16 venue NJ',
    'sweet sixteen venue NJ',
    'sweet 16 venue Freehold NJ',
    'Sweet 16 party venue NJ',
    'Sweet 16 catering NJ',
    // Mitzvah
    'bar mitzvah venue NJ',
    'bat mitzvah venue NJ',
    'Bar Bat Mitzvah catering NJ',
    'Mitzvah venue Freehold NJ',
    'bat mitzvah venue New Jersey',
    // Corporate
    'corporate event venue NJ',
    'corporate catering Freehold NJ',
    'corporate meetings NJ',
    'trade show venue NJ',
    // Quinceañera
    'quinceañera venue New Jersey',
    'Quinceanera venue Freehold NJ',
    // Social / Private
    'social event venue NJ',
    'private party venue NJ',
    'engagement party venue NJ',
    'communion party venue NJ',
    'birthday party venue Freehold NJ',
    // Holiday / Fundraiser
    'holiday party venue NJ',
    'fundraiser venue NJ',
    // Catering
    'event catering NJ',
    'catering services Freehold NJ',
    'gourmet catering NJ',
    'full service catering NJ',
    // Geo / Location
    'event space Monmouth County',
    'party venue Manalapan NJ',
    'party venue Marlboro NJ',
    'party venue Howell NJ',
    // Differentiators
    'NYC loft event venue NJ',
    'catering hall near me Freehold NJ',
    'outdoor event space NJ',
    'Spanish speaking event venue NJ',
    'bilingual event venue NJ',
    'event planning Freehold NJ',
    // Enhancements
    'event enhancements NJ',
    'white dance floor event NJ',
    'photo booth event NJ',
    'dancing on clouds wedding NJ',
  ],
  authors: [{ name: 'Aurum Events & Catering', url: 'https://aurum.events' }],
  creator: 'Aurum Events & Catering',
  publisher: 'Aurum Events & Catering',
  category: 'Event Venue, Catering',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Aurum Events & Catering',
    title: 'Aurum Events & Catering | Premier Event Venue Freehold NJ',
    description: 'Premier event venue in Freehold, NJ specializing in weddings, sweet sixteens, bar/bat mitzvahs, and corporate events. Serving all of Monmouth County, NJ.',
    url: 'https://aurum.events',
    images: [
      {
        url: '/images/hero-bg.jpg',
        width: 1200,
        height: 630,
        alt: 'Aurum Events & Catering — Premier Event Venue in Freehold, NJ',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aurum Events & Catering | Premier Event Venue Freehold NJ',
    description: 'Premier event venue in Freehold, NJ. Weddings, sweet sixteens, mitzvahs, corporate events. Serving Monmouth County, NJ.',
    images: ['/images/hero-bg.jpg'],
  },
  alternates: {
    canonical: 'https://aurum.events',
  },
  icons: {
    icon: '/images/footer-logo.png',
    apple: '/images/footer-logo.png',
    shortcut: '/images/footer-logo.png',
  },
  verification: {
    google: 'your-google-search-console-verification-token',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-US">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Oswald:wght@400;500;600;700&family=Barlow:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
        {/* Geo meta tags for local search engines & crawlers */}
        <meta name="geo.region" content="US-NJ" />
        <meta name="geo.placename" content="Freehold, New Jersey" />
        <meta name="geo.position" content="40.2643;-74.2738" />
        <meta name="ICBM" content="40.2643, -74.2738" />
        {/* JSON-LD structured data for SEO and GEO */}
        <StructuredData />
      </head>
      <body>
        <LenisProvider>
          <CustomCursor />
          <ScrollProgress />
          <Nav />
          <main>{children}</main>
          <Footer />
        </LenisProvider>
        <Script
          id="retell-widget"
          src="https://dashboard.retellai.com/retell-widget.js"
          strategy="lazyOnload"
          type="module"
          data-public-key="public_key_791aa9fa55765bfd1776d"
          data-agent-id="agent_d70716fca0fc829b07bb93c056"
          data-agent-version="Aurum Concierge"
          data-title="Aurum Concierge"
          data-logo-url="NOTHING"
          data-color="#C8933A"
          data-popup-message="How may I help you? Interested in booking an event?"
          data-show-ai-popup="true"
          data-show-ai-popup-time="1"
          data-auto-open="false"
        />
      </body>
    </html>
  );
}

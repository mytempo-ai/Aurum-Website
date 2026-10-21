import type { Metadata, Viewport } from "next";
import { Inter, Oswald, Barlow, Playfair_Display } from "next/font/google";
import "./globals.css";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";
import CustomCursor from "@/components/ui/CustomCursor";
import LenisProvider from "@/components/layout/LenisProvider";
import ChatWidget from "@/components/ui/ChatWidget";
import { RETELL_WIDGET_SRC } from "@/lib/site";
import { EVENTS } from "@/lib/eventData";

const FOOTER_EVENT_LINKS = EVENTS.map((e) => ({ href: `/events/${e.slug}`, label: e.seoTitle.replace(" in Freehold, NJ", "") }));

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const oswald = Oswald({ subsets: ['latin'], variable: '--font-oswald', display: 'swap' });
// Barlow and Playfair are only used below the first screen: no <link rel=preload>,
// so their 10 files don't compete with the hero on first load (still display: swap)
const barlow = Barlow({ 
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  subsets: ['latin'], 
  variable: '--font-barlow', 
  display: 'swap',
  preload: false,
});
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair', display: 'swap', weight: ['400', '700'], style: ['normal', 'italic'], preload: false });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#C8933A',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://aurum.events'),
  // Page titles supply only the search phrase; the brand is appended once here
  title: {
    default: 'Aurum Events & Catering — Event Venue in Freehold, NJ',
    template: '%s | Aurum Events',
  },
  description: "Freehold NJ's NYC loft-style event venue with in-house catering for weddings, Sweet 16s, mitzvahs and corporate events. From $65–$120 per person.",
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
        url: '/images/slide1.jpg',
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
    images: ['/images/slide1.jpg'],
  },
  alternates: {
    canonical: 'https://aurum.events',
  },
  icons: {
    icon: [
      { url: '/images/icon-48.png', sizes: '48x48', type: 'image/png' },
      { url: '/images/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: { url: '/images/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    shortcut: '/images/icon-48.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-US" className={`${inter.variable} ${oswald.variable} ${barlow.variable} ${playfair.variable}`}>
      <head>
        {/* Geo meta tags for local search engines & crawlers */}
        <meta name="geo.region" content="US-NJ" />
        <meta name="geo.placename" content="Freehold, New Jersey" />
        <meta name="geo.position" content="40.2643;-74.2738" />
        <meta name="ICBM" content="40.2643, -74.2738" />
        {/* Chat widget: download Retell's script during page load and open the API
            connection early, so the widget starts as soon as the page is interactive */}
        <link rel="modulepreload" href={RETELL_WIDGET_SRC} />
        <link rel="preconnect" href="https://api.retellai.com" crossOrigin="anonymous" />
      </head>
      <body>
        <LenisProvider>
          <CustomCursor />
          <ScrollProgress />
          <Nav />
          <main>{children}</main>
          <Footer eventLinks={FOOTER_EVENT_LINKS} />
        </LenisProvider>
        <ChatWidget />
      </body>
    </html>
  );
}

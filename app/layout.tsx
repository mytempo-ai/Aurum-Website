import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";
import CustomCursor from "@/components/ui/CustomCursor";
import LenisProvider from "@/components/layout/LenisProvider";

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#C8933A',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://aurum.events'),
  title: 'Aurum Events & Catering | Freehold NJ Premiere Event Space',
  description: 'Aurum Events & Catering is a premiere event space in Freehold, NJ specializing in weddings, sweet sixteens, bar/bat mitzvahs, and corporate events.',
  keywords:
    "event venue Freehold NJ, wedding venue NJ, sweet 16 venue NJ, bar mitzvah venue NJ, catering hall Freehold, Aurum Events",
  openGraph: {
    title: 'Aurum Events & Catering | Freehold NJ Premiere Event Space',
    description: 'Aurum Events & Catering is a premiere event space in Freehold, NJ specializing in weddings, sweet sixteens, bar/bat mitzvahs, and corporate events.',
    images: [{ url: '/images/hero-bg.jpg', width: 1200, height: 630, alt: 'Aurum Events & Catering' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Barlow:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
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

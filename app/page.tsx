import type { Metadata } from 'next'
import Hero from '@/components/sections/Hero'
import Stats from '@/components/sections/Stats'
import Venue from '@/components/sections/Venue'
import Events from '@/components/sections/Events'
import Reviews from '@/components/sections/Reviews'
import Instagram from '@/components/sections/Instagram'
import Contact from '@/components/sections/Contact'
import GeoContent from '@/components/seo/GeoContent'

export const metadata: Metadata = {
  title: "Aurum Events & Catering — Freehold NJ's Premiere Event Space",
  description: "Freehold NJ's most unique event venue. Weddings, Sweet 16s, Bar Mitzvahs, Corporate Events & more in a stunning NYC loft setting. Executive Chef Aaron Hode. Call (732) 294-0031.",
  keywords: [
    'Aurum Events',
    'Aurum Events & Caterers',
    'Aurum Events Freehold NJ',
    'event venue Freehold NJ',
    'event space Freehold NJ',
    'Freehold NJ premiere event space',
    'catering hall NJ',
    'modern catering venue NJ',
    'catering hall near me Freehold NJ',
    'NYC loft event venue NJ',
    'wedding venue NJ',
    'Sweet 16 venue NJ',
    'Bar Mitzvah venue NJ',
    'reception hall NJ',
    'event planning Freehold NJ',
  ],
  alternates: {
    canonical: 'https://aurum.events',
  },
  openGraph: {
    title: "Aurum Events & Catering — Freehold NJ's Premiere Event Space",
    description: "Freehold NJ's most unique event venue. Weddings, Sweet 16s, Bar Mitzvahs, Corporate Events & more in a stunning NYC loft setting. Executive Chef Aaron Hode.",
    url: 'https://aurum.events',
    images: [{ url: '/images/hero-bg.jpg', width: 1200, height: 630, alt: 'Aurum Events & Catering ballroom — Freehold NJ premiere event venue' }],
  },
}

export default function Home() {
  return (
    <main>
      <Hero />
      <Stats />
      <Venue />
      <Events />
      <Reviews />
      <Instagram />
      <GeoContent />
      <Contact />
    </main>
  )
}

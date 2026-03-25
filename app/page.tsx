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
  title: 'Aurum Events & Catering | Premier Event Venue Freehold NJ',
  description: 'Aurum Events & Catering — Freehold NJ\'s most elegant event venue. Award-winning catering, breathtaking ballroom, and luxury enhancements for weddings, sweet sixteens, bar/bat mitzvahs, and corporate events in Monmouth County, NJ.',
  alternates: {
    canonical: 'https://aurum.events',
  },
  openGraph: {
    title: 'Aurum Events & Catering | Premier Event Venue Freehold NJ',
    description: 'Freehold NJ\'s premier event venue. Weddings, sweet sixteens, bar/bat mitzvahs, corporate events. In-house catering & luxury enhancements. Serving all of Monmouth County.',
    url: 'https://aurum.events',
    images: [{ url: '/images/hero-bg.jpg', width: 1200, height: 630, alt: 'Aurum Events & Catering Ballroom — Freehold NJ' }],
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

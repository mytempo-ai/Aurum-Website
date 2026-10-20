import type { Metadata } from 'next'
import Hero from '@/components/sections/Hero'
import Stats from '@/components/sections/Stats'
import Venue from '@/components/sections/Venue'
import Events from '@/components/sections/Events'
import Reviews from '@/components/sections/Reviews'
import Instagram from '@/components/sections/Instagram'
import Contact from '@/components/sections/Contact'
import GeoContent from '@/components/seo/GeoContent'
import StructuredData from '@/components/seo/StructuredData'
import { EVENTS } from '@/lib/eventData'

const EVENT_CARDS = EVENTS.map((e) => ({ name: e.name, image: e.heroImage, href: `/events/${e.slug}`, desc: e.cardDesc }))

export const metadata: Metadata = {
  // `absolute` so the layout template doesn't append the brand a second time
  title: { absolute: 'Aurum Events & Catering — Event Venue in Freehold, NJ' },
  description: "Freehold NJ's NYC loft-style event venue for weddings, Sweet 16s, mitzvahs & corporate events. In-house catering from $65–$120 per person.",
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
    title: 'Aurum Events & Catering — Event Venue in Freehold, NJ',
    description: "Freehold NJ's NYC loft-style event venue for weddings, Sweet 16s, mitzvahs & corporate events. In-house catering from $65–$120 per person.",
    url: 'https://aurum.events',
    images: [{ url: '/images/slide1.jpg', width: 1200, height: 630, alt: 'Aurum Events & Catering ballroom — Freehold NJ premiere event venue' }],
  },
}

export default function Home() {
  return (
    <>
      <StructuredData />
      <Hero />
      <Stats />
      <Venue />
      <Events cards={EVENT_CARDS} />
      <Reviews />
      <Instagram />
      <GeoContent />
      <Contact />
    </>
  )
}

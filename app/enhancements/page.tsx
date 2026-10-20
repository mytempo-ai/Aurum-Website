import type { Metadata } from 'next'
import EnhancementsPage from '@/components/sections/EnhancementsPage'
import JsonLd, { breadcrumbSchema } from '@/components/seo/JsonLd'
import { EVENTS } from '@/lib/eventData'

export const metadata: Metadata = {
  title: 'Event Enhancements & Add-Ons in Freehold, NJ',
  description:
    'Upgrade your event at Aurum in Freehold, NJ: all-white dance floor, photo booth, dancing on clouds, CO2 blasts, custom monogram gobos, game tables and more.',
  keywords: [
    'event enhancements NJ',
    'catering upgrades NJ',
    'event add-ons Freehold NJ',
    'party enhancements NJ',
    'wedding upgrades NJ',
    'white dance floor event NJ',
    'photo booth event NJ',
    'dancing on clouds wedding NJ',
    'CO2 blast party NJ',
    'wall of roses backdrop NJ',
    'custom gobo lighting NJ',
    'event enhancements Freehold NJ',
    'luxury event upgrades Monmouth County',
  ],
  alternates: {
    canonical: 'https://aurum.events/enhancements',
  },
  openGraph: {
    title: 'Event Enhancements & Add-Ons in Freehold, NJ | Aurum Events',
    description: 'Transform your event with premium enhancements at Aurum Events & Catering in Freehold, NJ — LED dance floors, dancing on clouds, CO2 cannons, custom gobos, and more.',
    url: 'https://aurum.events/enhancements',
    images: [{ url: '/images/enhancements/enhancements-featured.jpg', width: 1200, height: 630, alt: 'Event Enhancements at Aurum Events Freehold NJ' }],
  },
}

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'Enhancements', path: '/enhancements' }])} />
      <EnhancementsPage eventLinks={EVENTS.map((e) => ({ href: `/events/${e.slug}`, label: e.seoTitle.replace(' in Freehold, NJ', '') }))} />
    </>
  )
}

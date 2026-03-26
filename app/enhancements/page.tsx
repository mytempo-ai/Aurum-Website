import type { Metadata } from 'next'
import EnhancementsPage from '@/components/sections/EnhancementsPage'

export const metadata: Metadata = {
  title: 'Event Enhancements & Add-Ons | Aurum Events & Catering — Freehold, NJ',
  description:
    'Elevate your event at Aurum Events & Catering with luxury enhancements — all-white LED dance floor, photo booth, dancing on clouds, CO2 blast cannons, custom monogram gobos, foosball, and more. Available in Freehold, NJ.',
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
    title: 'Event Enhancements & Add-Ons | Aurum Events & Catering',
    description: 'Transform your event with premium enhancements at Aurum Events & Catering in Freehold, NJ — LED dance floors, dancing on clouds, CO2 cannons, custom gobos, and more.',
    url: 'https://aurum.events/enhancements',
    images: [{ url: '/images/hero-bg.jpg', width: 1200, height: 630, alt: 'Event Enhancements at Aurum Events Freehold NJ' }],
  },
}

export default function Page() {
  return <EnhancementsPage />
}

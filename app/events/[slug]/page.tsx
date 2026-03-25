import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { EVENTS, getEventBySlug } from '@/lib/eventData'
import EventDetailPage from '@/components/sections/EventDetailPage'

interface Props {
  params: { slug: string }
}

export function generateStaticParams() {
  return EVENTS.map((event) => ({ slug: event.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const event = getEventBySlug(params.slug)
  if (!event) return {}
  return {
    title: `${event.name} Venue Freehold NJ | Aurum Events & Catering`,
    description: `${event.name} at Aurum Events & Catering in Freehold, NJ. ${event.tagline}. Serving Monmouth County and all of Central NJ. Call (732) 294-0031 to book your event.`,
    keywords: [
      `${event.name} venue Freehold NJ`,
      `${event.name} venue Monmouth County NJ`,
      `${event.name} venue New Jersey`,
      `${event.name} catering NJ`,
      'event venue Freehold NJ',
      'Aurum Events Freehold',
    ],
    alternates: {
      canonical: `https://aurum.events/events/${params.slug}`,
    },
    openGraph: {
      title: `${event.name} Venue Freehold NJ | Aurum Events & Catering`,
      description: `${event.name} at Aurum Events & Catering, Freehold NJ. ${event.tagline}. Serving all of Monmouth County, NJ.`,
      url: `https://aurum.events/events/${params.slug}`,
      images: [{ url: '/images/hero-bg.jpg', width: 1200, height: 630, alt: `${event.name} at Aurum Events Freehold NJ` }],
    },
  }
}

export default function EventPage({ params }: Props) {
  const event = getEventBySlug(params.slug)
  if (!event) notFound()
  return <EventDetailPage event={event} />
}

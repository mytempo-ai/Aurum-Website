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
    title: `${event.name} | Aurum Events & Catering — Freehold, NJ`,
    description: `${event.name} at Aurum Events & Catering in Freehold, NJ. ${event.tagline}. Call (732) 294-0031 to book.`,
  }
}

export default function EventPage({ params }: Props) {
  const event = getEventBySlug(params.slug)
  if (!event) notFound()
  return <EventDetailPage event={event} />
}

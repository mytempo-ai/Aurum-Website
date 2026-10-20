import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { EVENTS, getEventBySlug } from '@/lib/eventData'
import { getAllPosts, slugToUrl } from '@/lib/contentful'
import { getMenuBySlug } from '@/lib/menuData'
import { PRICING, SITE_URL } from '@/lib/site'
import EventDetailPage from '@/components/sections/EventDetailPage'
import JsonLd, { breadcrumbSchema, BUSINESS_REF } from '@/components/seo/JsonLd'

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
    title: event.seoTitle,
    description: event.metaDescription,
    keywords: event.seoKeywords || [
      `${event.name} venue Freehold NJ`,
      `${event.name} venue Monmouth County NJ`,
      `${event.name} venue New Jersey`,
      `${event.name} catering NJ`,
      'event venue Freehold NJ',
      'Aurum Events Freehold',
    ],
    alternates: {
      canonical: `${SITE_URL}/events/${params.slug}`,
    },
    openGraph: {
      title: `${event.seoTitle} | Aurum Events`,
      description: event.metaDescription,
      url: `${SITE_URL}/events/${params.slug}`,
      images: [{ url: event.heroImage || '/images/slide1.jpg', width: 1200, height: 630, alt: `${event.name} at Aurum Events Freehold NJ` }],
    },
  }
}

export default async function EventPage({ params }: Props) {
  const event = getEventBySlug(params.slug)
  if (!event) notFound()

  // Blog articles on the same topic, linked from the page
  const posts = await getAllPosts()
  const relatedPosts = posts
    .map(({ post }) => ({ title: post.fields.title, slug: slugToUrl(post.fields.slug) }))
    .filter((p) => event.blogTopics.some((t) => p.slug.includes(t)))
    .slice(0, 5)

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: event.seoTitle,
    serviceType: `${event.name} venue and catering`,
    description: event.metaDescription,
    url: `${SITE_URL}/events/${event.slug}`,
    image: `${SITE_URL}${event.heroImage}`,
    provider: BUSINESS_REF,
    areaServed: { '@type': 'AdministrativeArea', name: 'Monmouth County, New Jersey' },
    offers: {
      '@type': 'Offer',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        minPrice: PRICING.min,
        maxPrice: PRICING.max,
        priceCurrency: PRICING.currency,
        unitText: 'per person',
      },
    },
  }

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Events', path: '/events' },
            { name: event.name, path: `/events/${event.slug}` },
          ]),
          serviceSchema,
        ]}
      />
      <EventDetailPage
        event={event}
        menus={event.menus.flatMap((slug) => {
          const menu = getMenuBySlug(slug)
          return menu ? [{ href: `/menus/${menu.slug}`, label: menu.title }] : []
        })}
        otherEvents={EVENTS.filter((e) => e.slug !== event.slug).map((e) => ({ href: `/events/${e.slug}`, label: e.seoTitle }))}
        relatedPosts={relatedPosts}
      />
    </>
  )
}

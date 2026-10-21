import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { EVENTS } from '@/lib/eventData'
import { MENU_PAGES } from '@/lib/menuData'
import { PRICING, SITE_URL } from '@/lib/site'
import JsonLd, { breadcrumbSchema, BUSINESS_REF } from '@/components/seo/JsonLd'
import SectionLabel from '@/components/ui/SectionLabel'

export const metadata: Metadata = {
  title: 'Events We Host — Freehold, NJ Venue',
  description: `Weddings, Sweet 16s, bar & bat mitzvahs, corporate events, fundraisers and parties at Aurum in Freehold, NJ. Catering from ${PRICING.display}.`,
  alternates: { canonical: `${SITE_URL}/events` },
  openGraph: {
    title: 'Events We Host — Freehold, NJ Venue | Aurum Events',
    description: 'Every celebration, perfectly executed: weddings, Sweet 16s, mitzvahs, corporate events and more at Aurum Events & Catering in Freehold, NJ.',
    url: `${SITE_URL}/events`,
    images: [{ url: '/images/slide1.jpg', width: 1200, height: 630, alt: 'Events at Aurum Events & Catering, Freehold NJ' }],
  },
}

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Events hosted at Aurum Events & Catering',
  itemListElement: EVENTS.map((e, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    url: `${SITE_URL}/events/${e.slug}`,
    name: e.name,
  })),
  about: BUSINESS_REF,
}

export default function EventsHubPage() {
  return (
    <div className="pt-[60px] lg:pt-[72px]">
      <JsonLd data={[breadcrumbSchema([{ name: 'Events', path: '/events' }]), itemListSchema]} />

      {/* ── HERO ── */}
      <section className="relative h-[320px] md:h-[420px] overflow-hidden flex items-center justify-center">
        <Image src="/images/slide1.jpg" alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(20,10,2,0.62)' }} />
        <div className="relative z-10 text-center px-6 max-w-[820px] mx-auto">
          <nav aria-label="Breadcrumb" className="font-barlow text-[12px] uppercase tracking-[4px] text-white/70 mb-6">
            <Link href="/" className="hover:text-[var(--hero-gold)] transition-colors">Home</Link>
            <span className="mx-2" aria-hidden="true">·</span>
            <span style={{ color: 'var(--hero-gold)' }}>Events</span>
          </nav>
          <h1 className="font-oswald font-bold text-[clamp(36px,6vw,72px)] uppercase tracking-[5px] leading-[1.05] mb-5" style={{ color: 'var(--hero-text)' }}>
            Events We Host
          </h1>
          <p className="font-barlow text-[16px] md:text-[18px] text-white/85 max-w-[640px] mx-auto">
            One NYC loft-style venue in downtown Freehold, NJ, with a ballroom, an intimate loft, a cocktail patio and a rooftop deck — and an in-house kitchen led by Executive Chef Aaron Hode.
          </p>
        </div>
      </section>

      {/* ── EVENT TYPES ── */}
      <section className="section-warm py-16 md:py-24">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <SectionLabel>WHAT WE HOST</SectionLabel>
            <h2 className="heading-section">Every Celebration, Perfectly Executed</h2>
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {EVENTS.map((event) => (
              <li key={event.slug} className="bg-white border border-[var(--border)] rounded-sm overflow-hidden flex flex-col">
                <Link href={`/events/${event.slug}`} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={event.heroImage}
                      alt={event.heroAlt}
                      fill
                      sizes="(min-width: 1024px) 285px, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-oswald font-bold text-[20px] uppercase tracking-[1px] text-[var(--text-brown)] mb-2 group-hover:text-[var(--gold-text)] transition-colors">
                      {event.name}
                    </h3>
                    <p className="font-barlow text-[14px] leading-[1.7] text-[var(--text-muted)] mb-3">{event.cardDesc}</p>
                    <span className="font-barlow font-semibold text-[11px] uppercase tracking-[2px] text-[var(--gold-text)]">
                      {event.seoTitle} →
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── PRICING + MENUS ── */}
      <section className="py-16 md:py-24 bg-[var(--bg)]">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 text-center">
          <SectionLabel>PRICING</SectionLabel>
          <h2 className="heading-section mb-5">{PRICING.display}</h2>
          <p className="font-barlow text-[16px] leading-[1.8] text-[var(--text-muted)] max-w-[680px] mx-auto mb-8">
            {PRICING.summary} Every package is built around your guest list and your menu — book a tour and our team will put together a detailed quote.
          </p>
          <p className="font-barlow text-[15px] text-[var(--text-muted)] mb-10">
            Explore our menus:{' '}
            {MENU_PAGES.map((m, i) => (
              <span key={m.slug}>
                <Link href={`/menus/${m.slug}`} className="inline-block py-1 text-[var(--gold-text)] underline underline-offset-4 hover:text-[var(--gold-dark)]">
                  {m.title}
                </Link>
                {i < MENU_PAGES.length - 1 ? ' · ' : ''}
              </span>
            ))}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/book-a-tour" className="btn-gold-filled">BOOK A TOUR</Link>
            <a href="tel:+17322940031" className="btn-gold-outline">CALL (732) 294-0031</a>
          </div>
        </div>
      </section>
    </div>
  )
}

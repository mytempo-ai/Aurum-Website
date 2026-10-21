import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { MENU_PAGES } from '@/lib/menuData'
import { EVENTS } from '@/lib/eventData'
import { PRICING } from '@/lib/site'
import JsonLd, { breadcrumbSchema } from '@/components/seo/JsonLd'

export const metadata: Metadata = {
  title: 'Catering Menus in Freehold, NJ',
  description: "Hors d'oeuvres, action stations, plated dinners, children's menus and desserts from Aurum's in-house kitchen in Freehold, NJ. From $65–$120 per person.",
  keywords: [
    'catering menus NJ',
    'event catering menu',
    'gourmet catering NJ',
    'catering services Freehold NJ',
    'modern catering NJ',
    'American cuisine catering NJ',
    'event food catering NJ',
    'full service catering NJ',
    'catering menu Freehold NJ',
    'event catering Monmouth County NJ',
    'hors doeuvres catering NJ',
    'wedding catering New Jersey',
    'banquet menu NJ',
    'action stations catering NJ',
  ],
  alternates: {
    canonical: 'https://aurum.events/menus',
  },
  openGraph: {
    title: 'Catering Menus in Freehold, NJ | Aurum Events',
    description: 'Passed hors d\'oeuvres, action stations, plated dinners, and spectacular dessert displays. In-house catering excellence at Aurum Events & Catering, Freehold NJ.',
    url: 'https://aurum.events/menus',
    images: [{ url: '/images/menu-header.png', width: 1200, height: 630, alt: 'Catering Menus at Aurum Events Freehold NJ' }],
  },
}

export default function MenusPage() {
  return (
    <div className="pt-[72px]">
      <JsonLd data={breadcrumbSchema([{ name: 'Menus', path: '/menus' }])} />
      <div className="relative h-[300px] md:h-[400px] overflow-hidden">
        <div className="absolute inset-0 bg-[var(--hero-bg)]">
          <Image
            src="/images/menu-header.png"
            alt="Aurum Events & Catering full-service menus — Freehold NJ"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <h1 className="font-oswald font-bold text-white text-5xl md:text-6xl uppercase tracking-[4px] mb-4">
            Our Menus
          </h1>
          <p className="font-barlow text-lg text-white/80 max-w-2xl">
            From passed hors d&apos;oeuvres to interactive action stations and dramatic desserts, our culinary team delivers unforgettable dining experiences in Freehold, NJ.
          </p>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MENU_PAGES.map((cat) => (
            <Link key={cat.slug} href={`/menus/${cat.slug}`} className="group block h-[320px] relative overflow-hidden rounded bg-[var(--surface)]">
              <Image
                src={cat.image}
                alt={`${cat.title} — Aurum Events catering Freehold NJ`}
                fill
                sizes="(min-width: 1024px) 368px, (min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300" />
              <div className="absolute inset-x-8 bottom-8 z-10 border-t border-[var(--gold)]/50 pt-4">
                <h2 className="font-oswald font-bold text-white text-2xl uppercase tracking-[2px] mb-2">{cat.title}</h2>
                <p className="font-barlow text-white/80 italic">{cat.desc}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Pricing & planning */}
        <section className="mt-20 grid gap-10 md:grid-cols-2 border-t border-[var(--border)] pt-14">
          <div>
            <h2 className="font-oswald font-bold text-[26px] uppercase tracking-[1.5px] text-[var(--text-brown)] mb-4">
              Catering Pricing
            </h2>
            <p className="font-barlow text-[16px] leading-[1.8] text-[var(--text-muted)] mb-4">
              Event packages with in-house catering range from{' '}
              <strong className="text-[var(--text-brown)]">{PRICING.display}</strong>. Where you land in that range depends on the
              courses, action stations and enhancements you choose; market-priced items such as dry-aged steaks, Chilean sea bass
              and halibut are quoted at the time of booking.
            </p>
            <p className="font-barlow text-[16px] leading-[1.8] text-[var(--text-muted)]">
              Have dietary needs or want a tasting? Call{' '}
              <a href="tel:+17322940031" className="text-[var(--gold-text)] underline underline-offset-4">(732) 294-0031</a> or{' '}
              <Link href="/book-a-tour" className="text-[var(--gold-text)] underline underline-offset-4">book a tour</Link>{' '}
              and our team will build a menu around your guests.
            </p>
          </div>
          <div>
            <h2 className="font-oswald font-bold text-[26px] uppercase tracking-[1.5px] text-[var(--text-brown)] mb-4">
              Menus for Every Event
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 font-barlow text-[15px]">
              {EVENTS.map((e) => (
                <li key={e.slug}>
                  <Link href={`/events/${e.slug}`} className="inline-block py-1 text-[var(--gold-text)] underline underline-offset-4 hover:text-[var(--gold-dark)]">
                    {e.seoTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}

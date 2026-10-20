import Link from 'next/link'
import Image from 'next/image'
import { MENU_PAGES, eventsForMenu } from '@/lib/menuData'
import { MenuContentAnimator, MenuSidebarNav } from './MenuChrome'
import { PRICING } from '@/lib/site'
import JsonLd, { breadcrumbSchema } from '@/components/seo/JsonLd'

const MENU_LINKS = MENU_PAGES.map((m) => ({ label: m.title, href: `/menus/${m.slug}` }))

interface MenuLayoutProps {
  title: string
  /** Menu slug under /menus — drives breadcrumbs and the "Perfect for" event links */
  slug: string
  heroImage?: string
  children: React.ReactNode
}

// Server component: only the sidebar highlight and entrance animation run on the client
export default function MenuLayout({ title, slug, heroImage, children }: MenuLayoutProps) {
  const pathname = `/menus/${slug}`
  const suitedEvents = eventsForMenu(slug)

  return (
    <div className="pt-[72px]">
      <JsonLd data={breadcrumbSchema([{ name: 'Menus', path: '/menus' }, { name: title, path: pathname }])} />
      {/* Hero Banner */}
      <div className="relative h-[300px] md:h-[360px] overflow-hidden">
        <div className="absolute inset-0 bg-[var(--hero-bg)]">
          {heroImage && (
            <Image src={heroImage} alt={title} fill priority sizes="100vw" className="object-cover opacity-60" />
          )}
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <h1 className="font-oswald font-bold text-white text-4xl md:text-5xl uppercase tracking-[3px] mb-3">
            {title}
          </h1>
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-barlow text-sm text-white/75">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/menus" className="hover:text-white transition-colors">Menus</Link>
            <span aria-hidden="true">/</span>
            <span className="text-[var(--hero-gold)]">{title}</span>
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1200px] mx-auto px-6 py-20 max-md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-12">
          {/* Sidebar */}
          <aside className="lg:sticky lg:top-[100px] lg:self-start">
            <h2 className="font-oswald font-semibold text-sm uppercase tracking-[2px] text-[var(--text-brown)] mb-4">
              Our Menus
            </h2>
            <MenuSidebarNav links={MENU_LINKS} />
          </aside>

          {/* Menu Items */}
          <MenuContentAnimator>
            {children}

            {/* Pricing + matching events */}
            <section className="mt-16 pt-12 border-t border-[var(--border)] grid gap-10 md:grid-cols-2">
              <div>
                <h2 className="font-oswald font-semibold text-[18px] uppercase tracking-[1.5px] text-[var(--text-brown)] mb-3">
                  Catering Pricing
                </h2>
                <p className="font-barlow text-[16px] leading-[1.8] text-[var(--text-muted)]">
                  Packages range from <strong className="text-[var(--text-brown)]">{PRICING.display}</strong>, depending on your menu selections, action stations and enhancements. Items marked market pricing are quoted at the time of booking.
                </p>
              </div>
              {suitedEvents.length > 0 && (
                <div>
                  <h2 className="font-oswald font-semibold text-[18px] uppercase tracking-[1.5px] text-[var(--text-brown)] mb-3">
                    Perfect For
                  </h2>
                  <ul className="flex flex-col gap-1 font-barlow text-[15px]">
                    {suitedEvents.map((e) => (
                      <li key={e.slug}>
                        <Link href={`/events/${e.slug}`} className="inline-block py-1 text-[var(--gold-text)] underline underline-offset-4 hover:text-[var(--gold-dark)]">
                          {e.seoTitle}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>

            {/* Bottom CTA */}
            <div className="mt-16 pt-12 border-t border-[var(--border)] text-center">
              <p className="font-barlow text-lg text-[var(--text-muted)] mb-6">
                Ready to create your perfect menu?
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link href="/book-a-tour" className="btn-gold-filled">
                  BOOK A TOUR
                </Link>
                <a href="tel:+17322940031" className="btn-gold-outline">
                  CALL (732) 294-0031
                </a>
              </div>
            </div>
          </MenuContentAnimator>
        </div>
      </div>
    </div>
  )
}

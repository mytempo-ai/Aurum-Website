'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const MENU_LINKS = [
  { label: "Hors d'Oeuvres", href: '/menus/hors-doeuvres' },
  { label: 'Action Stations', href: '/menus/stations' },
  { label: 'First Course', href: '/menus/first-course' },
  { label: 'Dinner Selections', href: '/menus/dinner' },
  { label: "Children's Menu", href: '/menus/childrens-menu' },
  { label: 'Desserts', href: '/menus/desserts' },
]

interface MenuLayoutProps {
  title: string
  heroImage?: string
  children: React.ReactNode
}

export default function MenuLayout({ title, heroImage, children }: MenuLayoutProps) {
  const pathname = usePathname()
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!contentRef.current) return
    const items = contentRef.current.querySelectorAll('.menu-item')
    gsap.from(items, {
      y: 20, duration: 0.4, stagger: 0.05, ease: 'power2.out', immediateRender: false,
    })
  }, [])

  return (
    <div className="pt-[72px]">
      {/* Hero Banner */}
      <div className="relative h-[300px] md:h-[360px] overflow-hidden">
        <div className="absolute inset-0 bg-[var(--hero-bg)]">
          {heroImage && (
            <img src={heroImage} alt={title} className="w-full h-full object-cover opacity-60" />
          )}
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <h1 className="font-oswald font-bold text-white text-4xl md:text-5xl uppercase tracking-[3px] mb-3">
            {title}
          </h1>
          <nav className="flex items-center gap-2 font-barlow text-sm text-white/60">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/menus" className="hover:text-white transition-colors">Menus</Link>
            <span>/</span>
            <span className="text-[var(--hero-gold)]">{title}</span>
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1200px] mx-auto px-6 py-20 max-md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-12">
          {/* Sidebar */}
          <aside className="lg:sticky lg:top-[100px] lg:self-start">
            <h3 className="font-oswald font-semibold text-sm uppercase tracking-[2px] text-[var(--text-brown)] mb-4">
              Our Menus
            </h3>
            <nav className="flex flex-col gap-1">
              {MENU_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-barlow text-[15px] py-2 px-3 rounded transition-all duration-200 ${
                    pathname === link.href
                      ? 'text-[var(--gold-dark)] bg-[var(--gold-pale)] font-medium'
                      : 'text-[var(--text-muted)] hover:text-[var(--gold)] hover:bg-[var(--surface-warm)]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </aside>

          {/* Menu Items */}
          <div ref={contentRef}>
            {children}

            {/* Bottom CTA */}
            <div className="mt-16 pt-12 border-t border-[var(--border)] text-center">
              <p className="font-barlow text-lg text-[var(--text-muted)] mb-6">
                Ready to create your perfect menu?
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link href="/book-a-tour" className="btn-gold-filled">
                  BOOK A TOUR
                </Link>
                <a href="tel:7322940031" className="btn-gold-outline">
                  CALL (732) 294-0031
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

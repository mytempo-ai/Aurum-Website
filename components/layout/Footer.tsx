'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const QUICK_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'The Venue', href: '#venue' },
  { label: 'Events', href: '#events' },
  { label: 'Menus', href: '/menus' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
  { label: 'Book a Tour', href: '/book-a-tour' },
]

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const footer = footerRef.current
    if (!footer) return
    const ctx = gsap.context(() => {
      gsap.from(footer.querySelectorAll('.footer-col'), {
        y: 30, opacity: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out', immediateRender: false,
        scrollTrigger: { trigger: footer, start: 'top bottom', toggleActions: 'play none none none' },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <footer ref={footerRef} className="bg-[#F0E8D8] pt-12 md:pt-[60px] pb-7">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-10">
          {/* Col 1: Logo + Tagline */}
          <div className="footer-col">
            <img
              src="/images/footer-logo.png"
              alt="Aurum Events"
              className="w-[120px] mb-4"
            />
            <p className="font-barlow font-light text-[13px] text-[var(--text-muted)]">
              Aurum — Latin for Gold & New Beginnings
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div className="footer-col">
            <h4 className="font-oswald font-semibold text-sm uppercase tracking-[2px] text-[var(--text-brown)] mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith('http') ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-barlow text-sm text-[var(--text-muted)] hover:text-[var(--gold)] transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  ) : link.href.startsWith('/') ? (
                    <Link
                      href={link.href}
                      className="font-barlow text-sm text-[var(--text-muted)] hover:text-[var(--gold)] transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="font-barlow text-sm text-[var(--text-muted)] hover:text-[var(--gold)] transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Connect */}
          <div className="footer-col">
            <h4 className="font-oswald font-semibold text-sm uppercase tracking-[2px] text-[var(--text-brown)] mb-4">
              Connect
            </h4>
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/Aurum_events/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-[1.15] transition-transform duration-200"
                aria-label="Instagram"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28">
                  <defs>
                    <radialGradient id="ig-footer" cx="30%" cy="107%" r="150%">
                      <stop offset="0%" stopColor="#fdf497" />
                      <stop offset="45%" stopColor="#fd5949" />
                      <stop offset="60%" stopColor="#d6249f" />
                      <stop offset="90%" stopColor="#285AEB" />
                    </radialGradient>
                  </defs>
                  <path
                    fill="url(#ig-footer)"
                    d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                  />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/Aurum-Events-and-Catering-269053676619639/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-[1.15] transition-transform duration-200"
                aria-label="Facebook"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28">
                  <path
                    fill="#1877F2"
                    d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-[var(--gold)] mb-6" />

        {/* Bottom Bar — NAP structured data for local SEO */}
        <div
          className="text-center"
          itemScope
          itemType="https://schema.org/LocalBusiness"
        >
          <meta itemProp="name" content="Aurum Events & Catering" />
          <p className="font-barlow font-light text-[12px] text-[var(--text-light)]">
            © 2025{' '}
            <span itemProp="name">Aurum Events &amp; Catering</span>. All Rights Reserved
            {' '}·{' '}
            <span
              itemProp="address"
              itemScope
              itemType="https://schema.org/PostalAddress"
            >
              <span itemProp="streetAddress">17 South Street</span>,{' '}
              <span itemProp="addressLocality">Freehold</span>,{' '}
              <span itemProp="addressRegion">NJ</span>{' '}
              <span itemProp="postalCode">07728</span>
            </span>
            {' '}·{' '}
            <a
              href="tel:+17322940031"
              itemProp="telephone"
              className="hover:text-[var(--gold)] transition-colors"
            >
              (732) 294-0031
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

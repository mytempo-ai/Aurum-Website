'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { gsap } from 'gsap'

const NAV_LINKS = [
  { label: 'Home', href: '#hero', type: 'scroll' },
  { label: 'The Venue', href: '#venue', type: 'scroll' },
  { label: 'Events', href: '#events', type: 'scroll' },
  { label: 'Menus', href: '/menus', type: 'route' },
  { label: 'Blog', href: '/blog', type: 'route' },
  { label: 'Reviews', href: '#reviews', type: 'scroll' },
  { label: 'Contact', href: '#contact', type: 'scroll' },
]

export default function Nav() {
  const pathname = usePathname()
  const isHomePage = pathname === '/'
  const navRef = useRef<HTMLElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.classList.add('menu-open')
    } else {
      document.body.classList.remove('menu-open')
    }
    return () => document.body.classList.remove('menu-open')
  }, [mobileOpen])

  // Page load animation
  useEffect(() => {
    const nav = navRef.current
    if (!nav) return
    const logo = nav.querySelector('.nav-logo')
    const links = nav.querySelectorAll('.nav-link')
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()
      tl.from(logo, { scale: 0.85, opacity: 0, duration: 0.6, ease: 'back.out(1.4)', delay: 0.15 })
      tl.from(links, { y: -10, opacity: 0, duration: 0.4, stagger: 0.07, ease: 'power2.out' }, 0.45)
    })
    return () => ctx.revert()
  }, [])

  const closeMobile = () => setMobileOpen(false)

  const handleNavClick = (e: React.MouseEvent, href: string, type: string) => {
    closeMobile()
    if (type === 'scroll' && isHomePage) {
      e.preventDefault()
      const el = document.querySelector(href)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
    // If not home page, the default <a> behavior with /#id will work
  }

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-300 h-[60px] lg:h-[72px] ${
        scrolled || !isHomePage
          ? 'bg-white/[0.97] backdrop-blur-[12px] border-b border-[var(--border)]'
          : 'bg-transparent'
      }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 h-full flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="nav-logo flex-shrink-0">
            <img
              src="/images/logo.png"
              alt="Aurum Events"
              className="h-[44px] sm:h-[52px] lg:h-[60px] w-auto"
            />
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={isHomePage ? link.href : `/${link.href}`}
                onClick={(e) => handleNavClick(e, link.href, link.type)}
                className={`nav-link text-nav-link relative group ${
                  scrolled || !isHomePage ? 'text-[var(--text)]' : 'text-white'
                } hover:text-[var(--gold)] transition-colors duration-200`}
                style={{ textShadow: (scrolled || !isHomePage) ? 'none' : '0 2px 4px rgba(0,0,0,0.3)' }}
              >
                {link.label}
                <span className="absolute bottom-[-4px] left-0 w-full h-[1.5px] bg-[var(--gold)] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
              </a>
            ))}
          </div>

          {/* Phone + CTA */}
          <div className="hidden lg:flex items-center gap-5 xl:gap-6">
            <a
              href="tel:7322940031"
              className={`font-barlow text-[13px] ${
                scrolled || !isHomePage ? 'text-[var(--text-muted)]' : 'text-white/70'
              } hover:text-[var(--gold)] transition-colors duration-200`}
            >
              (732) 294-0031
            </a>
            <Link
              href="/book-a-tour"
              className="text-button px-4 xl:px-5 py-2.5 border-2 border-[var(--gold)] text-[var(--gold)] hover:bg-[var(--gold)] hover:text-white transition-all duration-200 rounded-sm"
            >
              Book a Tour
            </Link>
          </div>

          {/* Mobile Hamburger — min 44×44 touch target */}
          <button
            className="lg:hidden flex flex-col justify-center items-center gap-[5px] w-11 h-11 z-[1100] -mr-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            <span className={`w-6 h-[2px] transition-all duration-300 origin-center ${
              mobileOpen ? 'rotate-45 translate-y-[7px] bg-[var(--text)]'
                : (scrolled || !isHomePage) ? 'bg-[var(--text)]' : 'bg-white'
            }`} />
            <span className={`w-6 h-[2px] transition-all duration-300 ${
              mobileOpen ? 'opacity-0 scale-x-0' : (scrolled || !isHomePage) ? 'bg-[var(--text)]' : 'bg-white'
            }`} />
            <span className={`w-6 h-[2px] transition-all duration-300 origin-center ${
              mobileOpen ? '-rotate-45 -translate-y-[7px] bg-[var(--text)]'
                : (scrolled || !isHomePage) ? 'bg-[var(--text)]' : 'bg-white'
            }`} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-white z-[999] flex flex-col items-center justify-center lg:hidden transition-all duration-300 ${
          mobileOpen ? 'opacity-100 visible pointer-events-auto' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        {/* Close button top-right */}
        <button
          onClick={closeMobile}
          className="absolute top-5 right-4 w-11 h-11 flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--gold)] transition-colors"
          aria-label="Close menu"
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 4l12 12M16 4L4 16" />
          </svg>
        </button>

        {/* Links */}
        <nav className="flex flex-col items-center gap-5 mb-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={isHomePage ? link.href : `/${link.href}`}
              onClick={(e) => handleNavClick(e, link.href, link.type)}
              className="font-oswald font-bold text-[clamp(26px,7vw,36px)] uppercase text-[var(--text)] hover:text-[var(--gold)] transition-colors duration-200 py-1"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Bottom actions */}
        <div className="flex flex-col items-center gap-4 w-full max-w-[260px]">
          <a
            href="tel:7322940031"
            className="font-barlow text-[15px] text-[var(--text-muted)] hover:text-[var(--gold)] transition-colors py-2"
          >
            (732) 294-0031
          </a>
          <Link
            href="/book-a-tour"
            onClick={closeMobile}
            className="btn-gold-filled w-full text-center"
          >
            Book a Tour
          </Link>
        </div>

        {/* Gold divider at bottom */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-10 h-px bg-[var(--gold)] opacity-40" />
      </div>
    </>
  )
}

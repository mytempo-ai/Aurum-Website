'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionLabel from '@/components/ui/SectionLabel'

gsap.registerPlugin(ScrollTrigger)

const FEATURED = [
  {
    name: 'ALL WHITE DANCE FLOOR',
    image: '/images/enhancements/enhancements-featured.jpg',
    objectPosition: 'center top',
    desc: "Continue Aurum's NYC trendy decor with a stunning all white dance floor that transforms the entire room and creates an unforgettable visual centerpiece.",
  },
  {
    name: 'AURUM CHOICE PHOTO BOOTH',
    image: '/images/enhancements/photo-booth.jpg',
    objectPosition: 'center center',
    desc: 'A unique, classy photo booth for all types of events — fast, easy, and absolutely fabulous. Your guests will love it all night long.',
  },
]

const ENHANCEMENTS = [
  {
    name: 'Foosball Table',
    desc: 'Keep the energy going between courses with a full-size foosball table — guaranteed fun for guests of every age.',
    image: '/images/enhancements/foosball.jpg',
  },
  {
    name: 'Pop-O-Shot Basketball',
    desc: 'Guests love it — a crowd-pleasing basketball shooting game that brings out the competitive spirit in everyone.',
    image: '/images/enhancements/basketball.jpg',
  },
  {
    name: 'Air Hockey Table',
    desc: 'Fast-paced fun for guests of all ages — our LED air hockey table is always a hit and keeps the party going.',
    image: '/images/enhancements/air-hockey.jpg',
  },
  {
    name: 'Vinyl Entrance',
    desc: 'Make a grand first impression with a custom vinyl-wrapped entrance featuring your event branding, names, or theme.',
    image: '/images/enhancements/vinyl-entrance.jpg',
  },
  {
    name: 'Wall of Roses',
    desc: 'A breathtaking floral backdrop — perfect for photos and an instant Instagram moment your guests will share everywhere.',
    image: '/images/enhancements/wall-of-roses.jpg',
  },
  {
    name: 'Custom Banners',
    desc: 'Personalize your event with custom-designed banners featuring names, logos, monograms, or any design you can imagine.',
    image: '/images/enhancements/custom-banners.jpg',
  },
  {
    name: 'Dancing on Clouds',
    desc: 'Create a magical low-lying fog effect on the dance floor — stunning for first dances, grand entrances, and unforgettable moments.',
    image: '/images/enhancements/dancing-on-clouds.jpg',
  },
  {
    name: 'Black Light Party',
    desc: 'Transform the venue with UV black lights for a neon glow experience that guests absolutely will not forget.',
    image: '/images/enhancements/black-light.jpg',
  },
  {
    name: 'CO2 Super Blast',
    desc: 'A dramatic burst of CO2 jets that electrifies the dance floor at the peak moments of your celebration.',
    image: '/images/enhancements/co2-blast.jpg',
  },
  {
    name: 'Custom Gobo',
    desc: 'Project your name, monogram, or logo anywhere in the venue using a custom gobo light pattern — elegant and personalized.',
    image: '/images/enhancements/custom-gobo.jpg',
  },
]

function animateHeading(container: Element) {
  const label = container.querySelector('.section-label-el')
  const heading = container.querySelector('.enhance-heading')
  const goldLine = container.querySelector('.gold-line-anim')

  if (label) {
    gsap.from(label, {
      y: 15, opacity: 0, duration: 0.6, ease: 'power2.out', immediateRender: false,
      scrollTrigger: { trigger: label, start: 'top 90%', toggleActions: 'play none none none' },
    })
  }
  if (goldLine) {
    gsap.from(goldLine, {
      width: 0, duration: 0.45, ease: 'power2.out', immediateRender: false,
      scrollTrigger: { trigger: goldLine, start: 'top 90%', toggleActions: 'play none none none' },
    })
  }
  if (heading) {
    const words = (heading.textContent || '').split(' ')
    heading.innerHTML = words
      .map((w) => `<span class="inline-block overflow-hidden"><span class="hw inline-block">${w}</span></span>`)
      .join(' ')
    gsap.from(heading.querySelectorAll('.hw'), {
      y: 40, opacity: 0, duration: 0.7, stagger: 0.05, ease: 'power2.out', immediateRender: false,
      scrollTrigger: { trigger: heading, start: 'top 90%', toggleActions: 'play none none none' },
    })
  }
}

export default function EnhancementsPage() {
  const introRef = useRef<HTMLDivElement>(null)
  const featuredRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro
      if (introRef.current) {
        animateHeading(introRef.current)
        gsap.from(introRef.current.querySelector('.intro-para'), {
          y: 20, opacity: 0, duration: 0.6, ease: 'power2.out', immediateRender: false,
          scrollTrigger: { trigger: introRef.current.querySelector('.intro-para'), start: 'top 90%', toggleActions: 'play none none none' },
        })
      }

      // Featured cards
      if (featuredRef.current) {
        animateHeading(featuredRef.current)
        const cards = featuredRef.current.querySelectorAll('.featured-card')
        gsap.from(cards, {
          y: 50, opacity: 0, duration: 0.7, stagger: 0.18, ease: 'power2.out', immediateRender: false,
          scrollTrigger: { trigger: cards[0], start: 'top 90%', toggleActions: 'play none none none' },
        })
      }

      // Grid
      if (gridRef.current) {
        animateHeading(gridRef.current)
        const cards = gridRef.current.querySelectorAll('.enhance-card')
        gsap.from(cards, {
          y: 40, opacity: 0, duration: 0.5, stagger: 0.07, ease: 'power2.out', immediateRender: false,
          scrollTrigger: { trigger: gridRef.current, start: 'top 85%', toggleActions: 'play none none none' },
        })
      }

      // CTA
      if (ctaRef.current) {
        const items = ctaRef.current.querySelectorAll('.cta-el')
        gsap.from(items, {
          y: 25, opacity: 0, duration: 0.6, stagger: 0.12, ease: 'power2.out', immediateRender: false,
          scrollTrigger: { trigger: ctaRef.current, start: 'top 85%', toggleActions: 'play none none none' },
        })
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative w-full flex items-center justify-center overflow-hidden h-[300px] md:h-[60vh] md:min-h-[420px]">
        <img
          src="/images/slide2.jpg"
          alt="Aurum Events enhancements"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(20,10,2,0.68)' }} />
        <div className="relative z-10 text-center px-6">
          <span className="block font-barlow font-light text-[11px] uppercase tracking-[5px] mb-5" style={{ color: 'var(--hero-gold)' }}>
            ADD-ONS & UPGRADES
          </span>
          <h1
            className="font-oswald font-bold uppercase leading-[1.05] mb-5"
            style={{
              color: 'var(--hero-text)',
              fontSize: 'clamp(52px,9vw,110px)',
              letterSpacing: '6px',
              textShadow: '0 4px 30px rgba(0,0,0,0.5)',
            }}
          >
            ENHANCEMENTS
          </h1>
          <div className="mx-auto mb-5" style={{ width: '80px', height: '1.5px', backgroundColor: 'var(--hero-gold)' }} />
          <p className="font-barlow font-light italic text-[14px] uppercase tracking-[4px]" style={{ color: 'var(--hero-gold)' }}>
            Elevate Every Moment
          </p>
        </div>
      </section>

      {/* ── INTRO ── */}
      <section className="py-[100px] max-md:py-16 bg-[var(--bg)]">
        <div className="max-w-[700px] mx-auto px-6 text-center" ref={introRef}>
          <div className="gold-line-anim w-[40px] h-[2px] bg-[var(--gold)] mx-auto mb-6" />
          <h2 className="enhance-heading font-oswald font-bold text-[clamp(30px,4vw,44px)] uppercase tracking-[2px] text-[var(--text-brown)] mb-7 leading-tight">
            Take Your Event to the Next Level
          </h2>
          <p className="intro-para font-barlow text-[16px] leading-[1.85] text-[var(--text-muted)]">
            At Aurum Events &amp; Catering, we offer a range of premium enhancements to make your celebration truly unforgettable. From stunning dance floors to immersive entertainment options, each add-on is designed to elevate your event and wow your guests.
          </p>
        </div>
      </section>

      {/* ── FEATURED CARDS ── */}
      <section className="py-[100px] max-md:py-16 bg-[var(--surface-warm)]">
        <div className="max-w-[1100px] mx-auto px-6" ref={featuredRef}>
          <div className="text-center mb-14">
            <SectionLabel>FEATURED ADD-ONS</SectionLabel>
            <div className="gold-line-anim w-[40px] h-[2px] bg-[var(--gold)] mx-auto mt-4 mb-6" />
            <h2 className="enhance-heading heading-section text-[var(--text-brown)]">
              Signature Enhancements
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {FEATURED.map((item, i) => (
              <div
                key={i}
                className="featured-card bg-white rounded border-t-[3px] border-[var(--gold)] overflow-hidden transition-all duration-300 hover:-translate-y-2"
                style={{ boxShadow: '0 2px 16px rgba(200,147,58,0)' }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 40px rgba(200,147,58,0.22)'
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 16px rgba(200,147,58,0)'
                }}
              >
                <div className="overflow-hidden" style={{ height: '300px' }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    style={{ objectPosition: item.objectPosition }}
                  />
                </div>
                <div className="p-10">
                  <h3 className="font-oswald font-bold text-[24px] tracking-[2px] text-[var(--gold-dark)] mb-4">
                    {item.name}
                  </h3>
                  <p className="font-barlow font-light italic text-[15px] text-[var(--text-muted)] leading-[1.75] mb-6">
                    {item.desc}
                  </p>
                  <a
                    href="/#contact"
                    className="font-oswald font-semibold text-[12px] uppercase tracking-[2px] text-[var(--gold)] hover:text-[var(--gold-dark)] transition-colors duration-200 flex items-center gap-2 group"
                  >
                    Ask About This
                    <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ALL ENHANCEMENTS GRID ── */}
      <section className="py-[100px] max-md:py-16 bg-[var(--bg)]">
        <div className="max-w-[1200px] mx-auto px-6" ref={gridRef}>
          <div className="text-center mb-14">
            <SectionLabel>ALL ENHANCEMENTS</SectionLabel>
            <div className="gold-line-anim w-[40px] h-[2px] bg-[var(--gold)] mx-auto mt-4 mb-6" />
            <h2 className="enhance-heading heading-section text-[var(--text-brown)]">
              Something for Every Celebration
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ENHANCEMENTS.map((item, i) => (
              <div
                key={i}
                className="enhance-card group bg-white rounded border border-[var(--border)] overflow-hidden transition-all duration-300 hover:-translate-y-1 cursor-default"
                style={{ borderTop: '2px solid transparent' }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderTop = '2px solid var(--gold)'
                  el.style.boxShadow = '0 6px 30px rgba(200,147,58,0.15)'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderTop = '2px solid transparent'
                  el.style.boxShadow = 'none'
                }}
              >
                <div className="overflow-hidden" style={{ height: '220px', borderRadius: '4px 4px 0 0' }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="px-5 pt-4 pb-5">
                  <h3 className="font-oswald font-semibold text-[18px] uppercase tracking-[1px] text-[var(--text)] mb-2">
                    {item.name}
                  </h3>
                  <p className="font-barlow font-light text-[14px] text-[var(--text-muted)] leading-[1.7]">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Note */}
          <p className="mt-12 text-center font-barlow font-light italic text-[14px] text-[var(--text-muted)]">
            Additional enhancements available — contact us for the full list and custom options.
          </p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-[100px] max-md:py-16" style={{ backgroundColor: 'var(--gold)' }}>
        <div className="max-w-[760px] mx-auto px-6 text-center" ref={ctaRef}>
          <h2 className="cta-el font-oswald font-bold text-[clamp(28px,4vw,44px)] uppercase tracking-[2px] text-white leading-tight mb-4">
            Ready to Elevate Your Event?
          </h2>
          <p className="cta-el font-barlow font-light italic text-[16px] text-white/85 mb-10">
            Contact us to customize your perfect package
          </p>
          <div className="cta-el flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/book-a-tour"
              className="inline-flex items-center justify-center font-oswald font-semibold text-[12px] uppercase tracking-[2px] bg-white text-[var(--gold-dark)] px-8 py-4 transition-all duration-200 hover:bg-[var(--gold-pale)] hover:-translate-y-0.5"
            >
              BOOK A TOUR
            </Link>
            <a
              href="tel:7322940031"
              className="inline-flex items-center justify-center font-oswald font-semibold text-[12px] uppercase tracking-[2px] bg-transparent text-white border-2 border-white px-8 py-4 transition-all duration-200 hover:bg-white/10 hover:-translate-y-0.5"
            >
              CALL (732) 294-0031
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

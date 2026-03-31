'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionLabel from '@/components/ui/SectionLabel'
import GoldButton from '@/components/ui/GoldButton'
import type { EventData } from '@/lib/eventData'

gsap.registerPlugin(ScrollTrigger)

const WHY_CHOOSE = [
  {
    title: 'The Iconic Venue',
    desc: "A 150-year-old building reborn as a trendy NYC loft. Exposed brick, LED-lit walls, recycled wood shelving, and multiple unique spaces — a backdrop that makes every event feel cinematic.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M3 21h18M3 10.5V21M21 10.5V21M3 10.5L12 3l9 7.5M9 21v-6h6v6" />
      </svg>
    ),
  },
  {
    title: 'World-Class Cuisine',
    desc: "Executive Chef Aaron Hode leads a kitchen dedicated to innovation and excellence. From elegantly passed hors d'oeuvres to showstopping dessert displays — every bite is a highlight.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M12 2v20M4.5 8.5h15M8 2v4M16 2v4M4 13h16M4 18h16" />
      </svg>
    ),
  },
  {
    title: 'A Dedicated Team',
    desc: "Dave, Jay, and Ryan bring years of genuine passion to every event. From your first site visit to the final song, our team is present, attentive, and completely committed to your vision.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
]

export default function EventDetailPage({ event }: { event: EventData }) {
  const descRef = useRef<HTMLDivElement>(null)
  const highlightsRef = useRef<HTMLDivElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)
  const whyRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Helper: section label + heading word reveal
      const animateHeading = (container: Element) => {
        const label = container.querySelector('.section-label-el')
        const heading = container.querySelector('.section-heading')
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
            .map((w) => `<span class="inline-block overflow-hidden"><span class="heading-word inline-block">${w}</span></span>`)
            .join(' ')
          gsap.from(heading.querySelectorAll('.heading-word'), {
            y: 40, opacity: 0, duration: 0.7, stagger: 0.05, ease: 'power2.out', immediateRender: false,
            scrollTrigger: { trigger: heading, start: 'top 90%', toggleActions: 'play none none none' },
          })
        }
      }

      // Description section
      if (descRef.current) {
        animateHeading(descRef.current)
        const paras = descRef.current.querySelectorAll('.desc-para')
        gsap.from(paras, {
          y: 25, opacity: 0, duration: 0.6, stagger: 0.12, ease: 'power2.out', immediateRender: false,
          scrollTrigger: { trigger: paras[0], start: 'top 90%', toggleActions: 'play none none none' },
        })
      }

      // Highlights section
      if (highlightsRef.current) {
        animateHeading(highlightsRef.current)
        const items = highlightsRef.current.querySelectorAll('.highlight-item')
        gsap.from(items, {
          x: -20, opacity: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out', immediateRender: false,
          scrollTrigger: { trigger: items[0], start: 'top 90%', toggleActions: 'play none none none' },
        })
      }

      // Gallery section
      if (galleryRef.current) {
        animateHeading(galleryRef.current)
        const imgs = galleryRef.current.querySelectorAll('.gallery-img')
        gsap.from(imgs, {
          y: 40, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out', immediateRender: false,
          scrollTrigger: { trigger: imgs[0], start: 'top 90%', toggleActions: 'play none none none' },
        })
      }

      // Why Choose section
      if (whyRef.current) {
        animateHeading(whyRef.current)
        const cards = whyRef.current.querySelectorAll('.why-card')
        gsap.from(cards, {
          y: 50, opacity: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out', immediateRender: false,
          scrollTrigger: { trigger: cards[0], start: 'top 90%', toggleActions: 'play none none none' },
        })
      }

      // CTA section
      if (ctaRef.current) {
        gsap.from(ctaRef.current.querySelectorAll('.cta-item'), {
          y: 25, opacity: 0, duration: 0.6, stagger: 0.12, ease: 'power2.out', immediateRender: false,
          scrollTrigger: { trigger: ctaRef.current, start: 'top 90%', toggleActions: 'play none none none' },
        })
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative w-full h-[350px] md:h-[70vh] md:min-h-[480px] overflow-hidden flex items-center justify-center">
        <img
          src={event.heroImage}
          alt={event.heroAlt}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(20,10,2,0.62)' }} />
        <div className="relative z-10 text-center px-6 max-w-[800px] mx-auto">
          {/* Breadcrumb */}
          <p className="font-barlow text-[12px] uppercase tracking-[4px] text-white/50 mb-6">
            <a href="/" className="hover:text-[var(--hero-gold)] transition-colors">Home</a>
            <span className="mx-2">·</span>
            <a href="/#events" className="hover:text-[var(--hero-gold)] transition-colors">Events</a>
            <span className="mx-2">·</span>
            <span style={{ color: 'var(--hero-gold)' }}>{event.name}</span>
          </p>
          <h1 className="font-oswald font-bold text-[clamp(42px,7vw,88px)] uppercase tracking-[6px] leading-[1.05] mb-5"
            style={{ color: 'var(--hero-text)', textShadow: '0 4px 30px rgba(0,0,0,0.5)' }}>
            {event.name}
          </h1>
          <div className="mx-auto mb-5" style={{ width: '80px', height: '1.5px', backgroundColor: 'var(--hero-gold)' }} />
          <p className="font-barlow font-light italic text-[14px] uppercase tracking-[4px]"
            style={{ color: 'var(--hero-gold)' }}>
            {event.tagline}
          </p>
        </div>
      </section>

      {/* ── DESCRIPTION ── */}
      <section className="py-[100px] max-md:py-16 bg-[var(--bg)]" ref={descRef}>
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-14">
            <SectionLabel>ABOUT THIS EVENT</SectionLabel>
            <div className="gold-line-anim w-[40px] h-[2px] bg-[var(--gold)] mx-auto mt-4 mb-6" />
            <h2 className="section-heading heading-section">What We Offer</h2>
          </div>
          <div className="max-w-[820px] mx-auto space-y-6">
            {event.description.map((para, i) => (
              <p key={i} className="desc-para font-barlow text-[16px] leading-[1.85] text-[var(--text-muted)]">
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ── HIGHLIGHTS ── */}
      <section className="py-[100px] max-md:py-16 bg-[var(--surface-warm)]" ref={highlightsRef}>
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-14">
            <SectionLabel>KEY HIGHLIGHTS</SectionLabel>
            <div className="gold-line-anim w-[40px] h-[2px] bg-[var(--gold)] mx-auto mt-4 mb-6" />
            <h2 className="section-heading heading-section">What Sets Us Apart</h2>
          </div>
          <div className="max-w-[760px] mx-auto grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-5">
            {event.highlights.map((item, i) => (
              <div key={i} className="highlight-item flex items-start gap-4">
                <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-[var(--gold)] flex items-center justify-center">
                  <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3">
                    <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <p className="font-barlow text-[15px] leading-[1.7] text-[var(--text-brown)]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section className="py-[100px] max-md:py-16 bg-[var(--bg)]" ref={galleryRef}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-14">
            <SectionLabel>THE EXPERIENCE</SectionLabel>
            <div className="gold-line-anim w-[40px] h-[2px] bg-[var(--gold)] mx-auto mt-4 mb-6" />
            <h2 className="section-heading heading-section">See It for Yourself</h2>
          </div>
          <div className={`grid gap-3 ${event.gallery.length === 2 ? 'grid-cols-1 md:grid-cols-2 max-w-[900px] mx-auto' : 'grid-cols-2 lg:grid-cols-4'}`}>
            {event.gallery.map((img, i) => (
              <div
                key={i}
                className={`gallery-img overflow-hidden rounded-sm ${event.gallery.length !== 2 && i === 0 ? 'col-span-2 row-span-2 lg:col-span-2' : ''}`}
                style={{ aspectRatio: event.gallery.length === 2 ? '4/3' : (i === 0 ? '1/1' : '4/3') }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE AURUM ── */}
      <section className="py-[100px] max-md:py-16 bg-[var(--surface-warm)]" ref={whyRef}>
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-14">
            <SectionLabel>WHY AURUM</SectionLabel>
            <div className="gold-line-anim w-[40px] h-[2px] bg-[var(--gold)] mx-auto mt-4 mb-6" />
            <h2 className="section-heading heading-section">Why Choose Aurum</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {WHY_CHOOSE.map((card, i) => (
              <div
                key={i}
                className="why-card bg-white border border-[var(--border)] rounded p-8 flex flex-col gap-4 hover:-translate-y-1 hover:border-[var(--border-strong)] hover:shadow-md transition-all duration-200"
              >
                <div className="text-[var(--gold)]">{card.icon}</div>
                <div className="w-8 h-[1.5px] bg-[var(--gold)]" />
                <h3 className="font-oswald font-semibold text-[20px] uppercase tracking-[1.5px] text-[var(--text-brown)]">
                  {card.title}
                </h3>
                <p className="font-barlow text-[15px] leading-[1.75] text-[var(--text-muted)]">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="py-[100px] max-md:py-16 bg-[var(--bg)]" ref={ctaRef}>
        <div className="max-w-[760px] mx-auto px-6 text-center">
          <div className="cta-item">
            <SectionLabel>GET STARTED</SectionLabel>
          </div>
          <div className="cta-item gold-line-anim w-[40px] h-[2px] bg-[var(--gold)] mx-auto mt-4 mb-6" />
          <h2 className="cta-item heading-section text-[var(--text-brown)] mb-4">
            Ready to Plan Your {event.name} Event?
          </h2>
          <p className="cta-item font-barlow text-[16px] leading-[1.8] text-[var(--text-muted)] mb-10">
            Contact our team today to schedule a personal tour of our venue and start planning the celebration of a lifetime. We&apos;re here to make your vision a reality.
          </p>
          <div className="cta-item flex flex-wrap items-center justify-center gap-4">
            <GoldButton href="/book-a-tour" variant="filled">
              BOOK A TOUR
            </GoldButton>
            <GoldButton href="tel:7322940031" variant="outline">
              CALL (732) 294-0031
            </GoldButton>
          </div>
          <p className="cta-item mt-8 font-barlow text-[13px] text-[var(--text-light)] tracking-[1px]">
            17 South Street, Freehold, NJ 07728 · English &amp; Spanish Spoken
          </p>
        </div>
      </section>
    </>
  )
}

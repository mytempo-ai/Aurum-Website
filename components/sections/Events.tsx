'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionLabel from '@/components/ui/SectionLabel'

gsap.registerPlugin(ScrollTrigger)

const EVENTS = [
  {
    name: 'Weddings',
    image: '/images/wedding.jpg',
    href: '/events/weddings',
    desc: "Say 'I do' in our stunning indoor & outdoor spaces. Customizable packages, exquisite catering, flawless service.",
  },
  {
    name: 'Sweet Sixteens',
    image: '/images/sweet16.jpg',
    href: '/events/sweet-sixteens',
    desc: 'An unforgettable milestone. Stylish decor, spacious rooms, gourmet catering & entertainment packages.',
  },
  {
    name: 'Bar & Bat Mitzvahs',
    image: '/images/mitzvah.jpg',
    href: '/events/bar-bat-mitzvahs',
    desc: 'Celebrate tradition in style. Our team honors every tradition beautifully.',
  },
  {
    name: 'Corporate Events',
    image: '/images/corporate.jpg',
    href: '/events/corporate-events',
    desc: 'State-of-the-art facilities for meetings, galas, product launches, and celebrations.',
  },
  {
    name: 'Holiday Parties',
    image: '/images/holiday.jpg',
    href: '/events/holiday-parties',
    desc: 'Make the season magical with a fully private bespoke holiday experience.',
  },
  {
    name: 'Fundraisers',
    image: '/images/fundraiser.jpg',
    href: '/events/fundraisers',
    desc: 'Impactful fundraising events with flawless hospitality and catering.',
  },
  {
    name: 'Trade Shows',
    image: '/images/tradeshow.jpg',
    href: '/events/trade-shows',
    desc: 'Spacious, tech-equipped venues for showcasing your brand.',
  },
  {
    name: 'Social Events',
    image: '/images/private.jpg',
    href: '/events/social-events',
    desc: 'Completely exclusive. Fully customizable. Entirely yours.',
  },
]

export default function Events() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      // Label + Heading
      const label = section.querySelector('.section-label-el')
      const heading = section.querySelector('.section-heading')

      if (label) {
        gsap.from(label, {
          y: 15, duration: 0.6, ease: 'power2.out', immediateRender: false,
          scrollTrigger: { trigger: label, start: 'top bottom', toggleActions: 'play none none none' },
        })
      }

      if (heading) {
        const text = heading.textContent || ''
        const words = text.split(' ')
        heading.innerHTML = words
          .map((w: string) => `<span class="inline-block overflow-hidden"><span class="heading-word inline-block">${w}</span></span>`)
          .join(' ')
        const wordSpans = heading.querySelectorAll('.heading-word')
        gsap.from(wordSpans, {
          y: 40, duration: 0.7, stagger: 0.05, ease: 'power2.out', immediateRender: false,
          scrollTrigger: { trigger: heading, start: 'top bottom', toggleActions: 'play none none none' },
        })
      }

      // Cards stagger
      const cards = section.querySelectorAll('.event-card')
      gsap.from(cards, {
        y: 60, duration: 0.6, stagger: 0.08, ease: 'power2.out', immediateRender: false,
        scrollTrigger: { trigger: cards[0], start: 'top bottom', toggleActions: 'play none none none' },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="events"
      ref={sectionRef}
      className="section-warm py-16 md:py-24 lg:py-[140px]"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-16">
          <SectionLabel text="WHAT WE HOST" />
          <h2 className="section-heading heading-section heading-serif">
            Every Celebration, Perfectly Executed
          </h2>
        </div>

        {/* 4x2 Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[3px]">
          {EVENTS.map((event, i) => (
            <Link
              key={i}
              href={event.href}
              className="event-card relative overflow-hidden group cursor-pointer block"
              style={{ height: 'clamp(220px, 40vw, 340px)' }}
            >
              {/* Image */}
              <img
                src={event.image}
                alt={event.name}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[350ms] group-hover:scale-105"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-[rgba(26,26,26,0.50)] group-hover:bg-[rgba(26,26,26,0.70)] transition-colors duration-[350ms]" />

              {/* Gold bottom border on hover */}
              <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[var(--gold)] scale-x-0 group-hover:scale-x-100 transition-transform duration-[350ms] origin-left" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-5 z-10">
                <h3 className="font-oswald font-bold text-xl uppercase text-white tracking-[1px] transition-transform duration-[350ms] group-hover:-translate-y-5">
                  {event.name}
                </h3>
                <p className="font-barlow font-light italic text-[13px] text-white/0 group-hover:text-white/80 transition-all duration-[350ms] mt-2 max-w-[240px]">
                  {event.desc}
                </p>
                <span className="font-oswald font-semibold text-[11px] uppercase tracking-[2px] text-[var(--gold-light)] opacity-0 group-hover:opacity-100 transition-all duration-[350ms] mt-4">
                  EXPLORE →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

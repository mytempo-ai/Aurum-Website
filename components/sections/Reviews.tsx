'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionLabel from '@/components/ui/SectionLabel'

gsap.registerPlugin(ScrollTrigger)

const REVIEWS = [
  {
    name: 'Callen Figarola',
    event: 'Wedding',
    quote:
      'My wife and I got married here and had the most amazing wedding. Jay and Dave were super accommodating. Ryan made the night perfect. You will not find better cooks than Aaron & Rosa.',
  },
  {
    name: 'Jake Khaleel',
    event: 'Sweet Sixteen',
    quote:
      "We had our daughter's sweet 16 at Aurum. We can't say enough wonderful things. The venue is beautiful. Jay & Dave made the planning completely effortless.",
  },
  {
    name: 'Danielle Walters',
    event: 'Private Event',
    quote:
      "I had my son's communion party here and everything was amazing! Ryan was so helpful and attentive. Thank you so much to owner Dave and his incredible staff!",
  },
  {
    name: 'Xplosive Entertainment',
    event: 'Industry Partner',
    quote:
      "LOVE THIS VENUE! As the in-house entertainment company, it's a pleasure working at a modern, upscale venue with a sophisticated level of attention to detail.",
  },
]

export default function Reviews() {
  const sectionRef = useRef<HTMLElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const marquee = marqueeRef.current
    if (!section || !marquee) return

    // Marquee clone (DOM mutation, outside gsap.context)
    const inner = marquee.querySelector('.marquee-track') as HTMLElement
    if (!inner) return
    const clone = inner.cloneNode(true) as HTMLElement
    marquee.appendChild(clone)
    const totalWidth = inner.scrollWidth

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

      // Marquee animation
      const tl = gsap.to(marquee.children, {
        x: `-=${totalWidth}`,
        duration: totalWidth / 50,
        ease: 'none',
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x: number) => parseFloat(String(x)) % totalWidth),
        },
      })

      // Pause on hover
      marquee.addEventListener('mouseenter', () => tl.pause())
      marquee.addEventListener('mouseleave', () => tl.resume())
    })

    return () => {
      // Remove cloned node and revert GSAP
      if (clone.parentNode === marquee) marquee.removeChild(clone)
      ctx.revert()
    }
  }, [])

  return (
    <section
      id="reviews"
      ref={sectionRef}
      className="section-surface py-16 md:py-24 lg:py-[140px]"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 mb-10 md:mb-12">
        {/* Section Header */}
        <div className="text-center">
          <SectionLabel text="WHAT GUESTS SAY" />
          <h2 className="section-heading heading-section">
            Straight From Our Guests
          </h2>
        </div>
      </div>

      {/* Marquee */}
      <div
        ref={marqueeRef}
        className="overflow-hidden whitespace-nowrap flex cursor-grab active:cursor-grabbing"
      >
        <div className="marquee-track flex gap-6 px-3 flex-shrink-0">
          {REVIEWS.map((review, i) => (
            <div
              key={i}
              className="review-card w-[300px] sm:w-[360px] md:w-[380px] flex-shrink-0 whitespace-normal card-gold-top p-6 sm:p-8"
            >
              {/* Decorative Quote Mark */}
              <span className="font-oswald font-bold text-[100px] leading-none text-[var(--gold)] opacity-[0.08] absolute -top-4 left-4 select-none pointer-events-none">
                &ldquo;
              </span>

              {/* Stars */}
              <div className="text-[var(--gold)] text-[16px] mb-3 tracking-wider">
                ★★★★★
              </div>

              {/* Quote */}
              <p className="font-barlow font-normal italic text-[15px] text-[var(--text-muted)] leading-[1.7] mb-5">
                &ldquo;{review.quote}&rdquo;
              </p>

              {/* Name */}
              <p className="font-oswald font-semibold text-[16px] text-[var(--text-brown)]">
                {review.name}
              </p>

              {/* Event Badge */}
              <span className="inline-block mt-2 px-3 py-1 font-barlow font-light text-[10px] uppercase tracking-[1px] text-[var(--gold)] bg-[var(--gold-pale)] rounded-sm">
                {review.event}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Review Links */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 mt-10 md:mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
        <a
          href="https://www.google.com/search?q=aurum+events+freehold+nj#lrd=0x89c3d45d8240f6c7:0x9b7876c8b43f728c,1"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-2.5 border border-[var(--border)] rounded-full font-barlow text-sm text-[var(--text-muted)] hover:border-[var(--gold)] hover:text-[var(--gold)] transition-all duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Read Google Reviews
        </a>
        <a
          href="https://www.facebook.com/pg/aurumfreehold/reviews/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-2.5 border border-[var(--border)] rounded-full font-barlow text-sm text-[var(--text-muted)] hover:border-[var(--gold)] hover:text-[var(--gold)] transition-all duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
            <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          Read Facebook Reviews
        </a>
      </div>
    </section>
  )
}

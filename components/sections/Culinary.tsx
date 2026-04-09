'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionLabel from '@/components/ui/SectionLabel'
import GoldButton from '@/components/ui/GoldButton'

gsap.registerPlugin(ScrollTrigger)

const DISHES = [
  {
    badge: '★ MOST POPULAR STATION',
    name: 'Skirt Steak Grill',
    desc: 'Wild mushrooms, pearl onions, peppers, garlic mashed potatoes, creamed spinach',
    image: '/images/steak-dish.jpg',
  },
  {
    badge: '★ FAN FAVORITE',
    name: 'Beef Short Rib On Polenta',
    desc: "Teriyaki BBQ — most requested hors d'oeuvre",
    image: '/images/shortrib.jpg',
  },
  {
    badge: '★ MOST REQUESTED DESSERT',
    name: "S'Mores & Hot Cookie Dough",
    desc: 'Graham, marshmallows, chocolate — pure crowd pleaser',
    image: '/images/smores.jpg',
  },
]

export default function Culinary() {
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

      // Chef name char reveal
      const chefName = section.querySelector('.chef-name')
      if (chefName) {
        const text = chefName.textContent || ''
        chefName.innerHTML = text
          .split('')
          .map((char: string) => `<span class="inline-block">${char === ' ' ? '&nbsp;' : char}</span>`)
          .join('')
        const charSpans = chefName.querySelectorAll('span')
        gsap.from(charSpans, {
          y: 60, duration: 0.6, stagger: 0.025, ease: 'power2.out', immediateRender: false,
          scrollTrigger: { trigger: chefName, start: 'top bottom', toggleActions: 'play none none none' },
        })
      }

      // Gold line
      const goldLine = section.querySelector('.gold-line')
      if (goldLine) {
        gsap.from(goldLine, {
          width: 0, duration: 0.45, ease: 'power2.out', immediateRender: false,
          scrollTrigger: { trigger: goldLine, start: 'top bottom', toggleActions: 'play none none none' },
        })
      }

      // Dish cards slide in
      const dishCards = section.querySelectorAll('.dish-card')
      gsap.from(dishCards, {
        x: 40, duration: 0.6, stagger: 0.15, ease: 'power2.out', immediateRender: false,
        scrollTrigger: { trigger: dishCards[0], start: 'top bottom', toggleActions: 'play none none none' },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="culinary"
      ref={sectionRef}
      className="section-white py-16 md:py-24 lg:py-[140px]"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-16">
          <SectionLabel text="THE KITCHEN" />
          <h2 className="section-heading heading-section">A Cut Above</h2>
        </div>

        {/* Two Column (42 / 58) */}
        <div className="grid grid-cols-1 lg:grid-cols-[42fr_58fr] gap-10 lg:gap-16 items-start">
          {/* LEFT: Chef Spotlight */}
          <div>
            <div className="gold-line mb-6" />

            <p className="font-barlow font-normal text-[10px] uppercase tracking-[4px] text-[var(--gold)] mb-2">
              EXECUTIVE CHEF
            </p>

            <h3 className="chef-name font-oswald font-bold text-[44px] text-[var(--text)] mb-4 leading-tight max-md:text-3xl">
              Aaron Hode
            </h3>

            {/* Gold divider */}
            <div className="w-10 h-[1.5px] bg-[var(--gold)] mb-6" />

            <p className="font-barlow text-base leading-[1.8] text-[var(--text-muted)] mb-10">
              Chef Aaron Hode leads a kitchen dedicated to bringing the freshest, most innovative cuisine
              to the catering world. Using cutting-edge techniques and the finest ingredients,
              Aurum&apos;s kitchen delivers unforgettable dining — from passed hors d&apos;oeuvres to
              showstopping desserts. Backed by the incredible Aaron & Rosa, our kitchen is the heart
              of every event.
            </p>

            <GoldButton href="/menus" variant="outline">
              EXPLORE OUR MENUS →
            </GoldButton>
          </div>

          {/* RIGHT: Dish Cards */}
          <div className="space-y-4">
            {DISHES.map((dish, i) => (
              <div
                key={i}
                className="dish-card card-gold-top overflow-hidden flex items-stretch gap-0"
              >
                {/* Image */}
                <div className="w-[100px] sm:w-[130px] lg:w-[140px] flex-shrink-0 overflow-hidden">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>

                {/* Text */}
                <div className="flex-1 p-5 flex flex-col justify-center">
                  <span className="inline-block self-start px-2.5 py-1 mb-3 text-[9px] font-oswald font-semibold uppercase tracking-[2px] text-[var(--gold-dark)] bg-[var(--gold-pale)] border border-[var(--gold)]/30">
                    {dish.badge}
                  </span>
                  <h4 className="menu-item-name mb-1.5">{dish.name}</h4>
                  <p className="menu-item-desc">{dish.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

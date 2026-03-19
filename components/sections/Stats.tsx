'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { number: 150, label: 'Years of History', prefix: '', suffix: '' },
  { number: 4, label: 'Unique Event Spaces', prefix: '', suffix: '' },
  { number: 5, label: '5-Star Rated', prefix: '', suffix: '', isStars: true },
  { number: 2, label: 'Languages Spoken', prefix: '', suffix: '' },
]

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      const numbers = section.querySelectorAll('.stat-number')

      numbers.forEach((el, i) => {
        const stat = STATS[i]
        if (stat.isStars) return // stars are static

        const target = stat.number
        const obj = { val: 0 }

        gsap.to(obj, {
          val: target,
          duration: 1.8,
          delay: i * 0.2,
          ease: 'power2.out',
          immediateRender: false,
          onUpdate: () => {
            el.textContent = `${stat.prefix}${Math.round(obj.val)}${stat.suffix}`
          },
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            toggleActions: 'play none none none',
          },
        })
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="stats"
      ref={sectionRef}
      className="section-gold py-10"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {STATS.map((stat, i) => (
            <div key={i} className="text-center relative py-5 px-2">
              {/* Vertical divider on md+ */}
              {i > 0 && (
                <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-12 bg-[rgba(26,26,26,0.18)]" />
              )}
              {/* Horizontal divider on mobile bottom row */}
              {i < 2 && (
                <div className="md:hidden absolute bottom-0 left-4 right-4 h-px bg-[rgba(26,26,26,0.15)]" />
              )}
              {i === 1 && (
                <div className="md:hidden absolute left-0 top-4 bottom-4 w-px bg-[rgba(26,26,26,0.15)]" />
              )}
              {i === 3 && (
                <div className="md:hidden absolute left-0 top-4 bottom-4 w-px bg-[rgba(26,26,26,0.15)]" />
              )}
              <div
                className="stat-number text-[#1A1A1A]"
                style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, lineHeight: 1, marginBottom: 4, fontSize: 'clamp(32px, 8vw, 62px)' }}
              >
                {stat.isStars ? '★★★★★' : '0'}
              </div>
              <div className="text-stat-label mt-1" style={{ color: 'rgba(26,26,26,0.6)', letterSpacing: '2px', fontSize: '9px' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface VenueClientProps {
  mediaFiles: string[]
}

const SPACES = [
  { id: '01', name: 'Main Ballroom', desc: 'Full-scale hall with LED lighting & sound' },
  { id: '02', name: 'The Loft', desc: 'Unique intimate loft inside the ballroom' },
  { id: '03', name: 'Cocktail Patio', desc: 'Outdoor space perfect for cocktail hour' },
  { id: '04', name: 'Rooftop Deck', desc: '400 sq ft deck off the ballroom' },
]

export default function VenueClient({ mediaFiles }: VenueClientProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const stripRef = useRef<HTMLDivElement>(null)
  const topImageRef = useRef<HTMLDivElement>(null)

  const getLabel = (fileName: string) => {
    const lowerName = fileName.toLowerCase();
    if (lowerName.includes('23.21.26')) return "Main Ballroom"
    if (lowerName.includes('23.21.33')) return "The Loft"
    if (lowerName.includes('23.21.41')) return "Cocktail Patio"
    if (lowerName.includes('23.21.35')) return "Rooftop Deck"
    if (lowerName.includes('23.21.37')) return "Aurum Events"
    if (lowerName.includes('slide2')) return "Ballroom Setup"
    return "Aurum Events"
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      // --- Part 1: Ken Burns Animation ---
      if (topImageRef.current) {
        gsap.to(topImageRef.current.querySelector('img'), {
          scale: 1.06,
          duration: 6,
          ease: 'power1.inOut',
          repeat: -1,
          yoyo: true,
        })
      }

      // --- Part 2: Infinite Scrolling Strip ---
      const strip = stripRef.current
      if (strip) {
        const totalWidth = strip.scrollWidth / 2
        const tween = gsap.to(strip, {
          x: -totalWidth,
          duration: totalWidth / 60, // Slower speed as requested (lowering multiplier makes it slower)
          ease: 'none',
          repeat: -1,
        })

        strip.addEventListener('mouseenter', () => tween.pause())
        strip.addEventListener('mouseleave', () => tween.resume())
      }

      // --- Scroll Reveal Animations ---
      const section = sectionRef.current
      if (section) {
        // Gold line reveal
        gsap.from('.venue-gold-line', {
          width: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.venue-gold-line',
            start: 'top 95%',
          }
        })

        // Label fade in
        gsap.from('.venue-small-label', {
          y: 20,
          opacity: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: '.venue-small-label',
            start: 'top 90%',
          }
        })

        // Heading reveal word by word
        const heading = section.querySelector('.venue-big-heading')
        if (heading) {
          const words = (heading.textContent || '').split(' ')
          heading.innerHTML = words.map(w => `<span class="inline-block overflow-hidden"><span class="inline-block w-rev">${w}</span></span>`).join(' ')
          gsap.from('.w-rev', {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: heading,
              start: 'top 85%',
            }
          })
        }

        // Space items stagger
        gsap.from('.space-item', {
          x: 30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.spaces-list',
            start: 'top 80%',
          }
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="venue" ref={sectionRef} className="bg-[#FAF6EE] overflow-hidden">
      
      {/* PART 1 — Top split layout */}
      <div className="flex flex-col lg:flex-row min-h-[600px]">
        {/* Left Column (55%) */}
        <div className="relative w-full lg:w-[55%] h-[350px] md:h-[500px] lg:h-auto overflow-hidden" ref={topImageRef}>
          <Image
            src={`/images/venue-images/${mediaFiles[0]}`}
            alt="Aurum Venue Hero"
            fill
            className="object-cover"
            priority
          />
          {/* Dark Overlay & Gradient for Visibility */}
          <div className="absolute inset-0 bg-[rgba(28,15,6,0.3)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          {/* Text Overlaid Bottom-Left */}
          <div className="absolute bottom-16 left-8 lg:bottom-24 lg:left-12 text-white z-10 w-full pr-8">
            <span className="venue-small-label block font-barlow font-light text-[11px] text-[#C8933A] uppercase tracking-[3px] mb-3">
              Aurum Events · Freehold NJ
            </span>
            <h2 className="venue-big-heading font-oswald font-bold text-[32px] md:text-[48px] leading-[1.1] uppercase tracking-[3px] text-white drop-shadow-lg">
              A Space Born to Celebrate
            </h2>
          </div>
        </div>

        {/* Right Column (45%) */}
        <div className="w-full lg:w-[45%] bg-white p-12 lg:p-[48px_40px] flex flex-col justify-center">
          <div className="venue-gold-line h-[1.5px] bg-[#C8933A] mb-8" style={{ width: '40px' }} />
          
          <p className="font-barlow font-normal text-[14px] leading-[1.9] text-[#4A3828] mb-8">
            Built nearly 150 years ago and reborn after two years of breathtaking renovation. 
            Step inside and discover a trendy NYC loft in the heart of downtown Freehold. 
            If you can dream it, we can do it.
          </p>

          <span className="block font-barlow font-normal text-[10px] text-[#C8933A] tracking-[4px] uppercase mb-6">
            OUR SPACES
          </span>

          <div className="spaces-list">
            {SPACES.map((space) => (
              <div key={space.id} className="space-item flex items-center py-4 border-b border-[#F5ECD7] last:border-b-0">
                <span className="font-oswald font-bold text-[22px] text-[#C8933A] opacity-30 mr-6 w-8">
                  {space.id}
                </span>
                <div className="flex flex-col">
                  <span className="font-oswald font-semibold text-[13px] text-[#1A1A1A] uppercase tracking-[1px]">
                    {space.name}
                  </span>
                  <span className="font-barlow font-light text-[11px] text-[#9A7A50]">
                    {space.desc}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PART 2 — Auto-rotating media strip */}
      <div className="relative border-y border-[#F5ECD7] overflow-hidden bg-white">
        <div 
          ref={stripRef}
          className="flex whitespace-nowrap cursor-pointer hover:pause-animation"
          style={{ width: 'max-content' }}
        >
          {/* Create original and clone for infinite loop */}
          {[...mediaFiles, ...mediaFiles].map((file, index) => {
            const isVideo = /\.(mp4|mov)$/i.test(file);
            const label = getLabel(file);
            
            return (
              <div 
                key={`${file}-${index}`}
                className="group relative w-[320px] h-[220px] flex-shrink-0 transition-transform duration-300 hover:scale-[1.03] hover:z-10 hover:border-b-[3px] hover:border-[#C8933A]"
              >
                {isVideo ? (
                  <video
                    src={`/images/venue-images/${file}`}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="relative w-full h-full">
                    <Image
                      src={`/images/venue-images/${file}`}
                      alt={label}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                
                {/* Label */}
                <span className="absolute bottom-4 left-4 font-oswald font-medium text-[12px] text-white uppercase tracking-wider bg-black/30 px-2 py-1 backdrop-blur-sm">
                  {label}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* PART 3 — Gold CTA bar */}
      <div className="bg-[#C8933A] p-6 lg:p-[20px_48px] flex flex-col md:flex-row items-center justify-between text-white">
        <span className="font-oswald font-semibold text-[14px] uppercase tracking-[2px] mb-4 md:mb-0">
          Ready to see the space in person?
        </span>
        <a 
          href="/book-a-tour"
          className="border-[1.5px] border-white px-6 py-[10px] font-oswald font-semibold text-[11px] uppercase tracking-[2px] transition-all hover:bg-white hover:text-[#C8933A]"
        >
          SCHEDULE A TOUR →
        </a>
      </div>

    </section>
  )
}

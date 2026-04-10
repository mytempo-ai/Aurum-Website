'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const VIDEO_CONFIG = [
  { src: '/videos/ballroom.mp4', duration: 5, speed: 1 },
  { src: '/videos/first-dance.mp4', duration: 4, speed: 1 },
  { src: '/videos/champagne.mp4', duration: 4, speed: 2.5 }, // Fast motion
  { src: '/videos/chef-plating.mp4', duration: 5, speed: 1 },
]

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    // Video crossfade with custom durations
    const videos = section.querySelectorAll<HTMLVideoElement>('.hero-vid')
    let current = 0
    let timeoutId: NodeJS.Timeout

    // Initialize playback speeds and add ended-event seamless restart
    videos.forEach((vid, i) => {
      if (VIDEO_CONFIG[i]) {
        vid.playbackRate = VIDEO_CONFIG[i].speed
      }
      // Restart only the ACTIVE clip when it ends — prevents visible freeze
      vid.addEventListener('ended', () => {
        if (i === current) {
          vid.currentTime = 0
          vid.play().catch(() => {})
        }
      })
    })

    if (videos[0]) {
      gsap.set(videos[0], { opacity: 1 })
      videos[0].play().catch(() => {})
    }

    const playNext = () => {
      const config = VIDEO_CONFIG[current]
      timeoutId = setTimeout(() => {
        const prev = current
        current = (current + 1) % videos.length
        
        // Prepare and play the next video
        videos[current].currentTime = 0
        const playPromise = videos[current].play()
        if (playPromise !== undefined) {
          playPromise.catch(() => {})
        }

        gsap.to(videos[prev], { 
          opacity: 0, 
          duration: 1, 
          ease: 'power1.inOut',
          onComplete: () => {
            videos[prev].pause()
            videos[prev].currentTime = 0
          }
        })
        gsap.to(videos[current], { opacity: 1, duration: 1, ease: 'power1.inOut' })
        
        playNext()
      }, config.duration * 1000)
    }

    // Delay the start slightly to ensure the first video has time to load
    timeoutId = setTimeout(() => {
        playNext()
    }, 100)

    const ctx = gsap.context(() => {
      // Content entrance animation
      const content = contentRef.current
      if (content) {
        const logo = content.querySelector('.hero-logo')
        const title = content.querySelector('.hero-title')
        const line = content.querySelector('.hero-line')
        const tagline = content.querySelector('.hero-tagline')
        const buttons = content.querySelectorAll('.hero-btn')
        const arrow = content.querySelector('.hero-arrow')

        const tl = gsap.timeline({ delay: 0.6 })

        if (logo) {
          tl.from(logo, {
            y: -20,
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out',
          }, 0)
        }

        // Title character reveal (free SplitText alternative)
        if (title) {
          const rowSpans = title.querySelectorAll('.title-row')
          const allCharSpans: HTMLSpanElement[] = []

          rowSpans.forEach((row) => {
            const text = row.textContent || ''
            const chars = text.split('')
            row.innerHTML = chars
              .map(
                (char) =>
                  `<span class="inline-block">${char === ' ' ? '&nbsp;' : char}</span>`
              )
              .join('')
            row.querySelectorAll('span').forEach((s) => allCharSpans.push(s))
          })

          if (allCharSpans.length > 0) {
            tl.from(allCharSpans, {
              y: 60,
              opacity: 0,
              duration: 0.5,
              stagger: 0.03,
              ease: 'power2.out',
            }, 0)
          } else {
            // Fallback in case there are no title-row elements
            tl.from(title, {
              y: 60,
              opacity: 0,
              duration: 0.5,
              ease: 'power2.out',
            }, 0)
          }
        }

        if (tagline) {
          tl.from(tagline, {
            y: 20,
            opacity: 0,
            duration: 0.5,
            ease: 'power2.out',
          }, 0.4)
        }

        if (line) {
          tl.from(line, {
            width: 0,
            duration: 0.4,
            ease: 'power2.out',
          }, 0.5)
        }

        if (buttons.length) {
          tl.from(buttons, {
            y: 15,
            opacity: 0,
            duration: 0.4,
            stagger: 0.15,
            ease: 'power2.out',
          }, 0.65)
        }

        if (arrow) {
          tl.to(arrow, {
            opacity: 0.6,
            duration: 0.3,
          }, 0.9)

          // Infinite bounce
          gsap.to(arrow, {
            y: 10,
            duration: 1,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut',
            delay: 2,
          })
        }
      }

      // Parallax
      gsap.to('.hero-videos-container', {
        yPercent: -15,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      })

      gsap.to('.hero-content', {
        yPercent: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })
    })

    return () => {
      clearTimeout(timeoutId)
      ctx.revert()
    }
  }, [])

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative w-full h-screen h-[100svh] overflow-hidden"
      style={{ backgroundColor: 'var(--hero-bg)' }}
    >
      {/* Video Background */}
      {/* Container is 115% tall and offset -10% up so parallax (-15%) never exposes a gap */}
      <div className="hero-videos-container absolute inset-x-0 bg-black/50" style={{ top: '-10%', height: '120%' }}>
        {VIDEO_CONFIG.map((config, i) => (
          <video
            key={i}
            className="hero-vid absolute inset-0 w-full h-full object-cover"
            src={config.src}
            autoPlay={i === 0}
            muted
            playsInline
            preload={i === 0 ? "auto" : "none"}
            style={{ opacity: i === 0 ? 1 : 0, display: 'block' }}
          />
        ))}
        {/* Dark Overlay */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: 'var(--hero-overlay)' }}
        />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="hero-content relative z-10 flex flex-col items-center justify-center h-full text-center px-6"
      >


        <h1
          className="hero-title text-[var(--hero-text)] mb-4 sm:mb-6 uppercase text-center"
          style={{
            fontFamily: "'Oswald', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(28px, 7.5vw, 90px)',
            letterSpacing: 'clamp(2px, 0.8vw, 10px)',
            lineHeight: '1.15',
            textShadow: '0 2px 24px rgba(0,0,0,0.55)',
          }}
        >
          <span className="block whitespace-nowrap title-row">AURUM EVENTS</span>
          <span className="block whitespace-nowrap title-row" style={{ fontSize: '0.9em', marginTop: '2px' }}>&amp; CATERING</span>
        </h1>

        <div
          className="hero-line mx-auto mb-5 sm:mb-7"
          style={{ width: '56px', height: '1.5px', backgroundColor: 'var(--hero-gold)' }}
        />

        <p
          className="hero-tagline mb-8 sm:mb-12 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-center w-full px-4"
          style={{
            fontFamily: "'Inter', 'Barlow', sans-serif",
            fontWeight: 400,
            fontSize: 'clamp(11px, 1.3vw, 13px)',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            color: 'var(--hero-gold)',
            opacity: 0.9,
          }}
        >
          <span className="whitespace-nowrap">Freehold NJ</span>
          <span className="hidden sm:inline opacity-60">&middot;</span>
          <span className="whitespace-nowrap">Premiere Event Space</span>
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-[340px] sm:max-w-none px-6 sm:px-0">
          <Link
            href="/book-a-tour"
            className="hero-btn w-full sm:w-auto"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: "'Inter', 'Barlow', sans-serif",
              fontWeight: 600,
              fontSize: '11px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              backgroundColor: 'var(--hero-gold)',
              color: '#fff',
              padding: '16px 36px',
              border: '1.5px solid var(--hero-gold)',
              transition: 'all 0.3s',
            }}
          >
            BOOK A TOUR
          </Link>
          <a
            href="tel:7322940031"
            className="hero-btn w-full sm:w-auto"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: "'Inter', 'Barlow', sans-serif",
              fontWeight: 600,
              fontSize: '11px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              backgroundColor: 'transparent',
              color: '#fff',
              padding: '16px 36px',
              border: '1.5px solid rgba(255,255,255,0.75)',
              transition: 'all 0.3s',
            }}
          >
            CALL (732) 294-0031
          </a>
        </div>

        {/* Scroll Arrow */}
        <div className="hero-arrow absolute bottom-10 left-1/2 -translate-x-1/2 opacity-0">
          <svg
            width="24"
            height="24"
            fill="none"
            stroke="var(--hero-gold)"
            strokeWidth="2"
            className="mx-auto"
          >
            <path d="M12 4v16M5 13l7 7 7-7" />
          </svg>
        </div>
      </div>
    </section>
  )
}

'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Each clip ships in a phone (720p) and desktop (1080p) encode. Nothing is
// downloaded until the page has finished loading: the poster image below is what
// paints first, then the clips fade in on top of it.
const VIDEO_CONFIG = [
  { name: 'ballroom',     duration: 6, speed: 1   }, // Wide establishing shot
  { name: 'first-dance',  duration: 5, speed: 1   }, // Romantic energy
  { name: 'champagne',    duration: 3, speed: 2.5 }, // Punchy fast motion — 8s÷2.5=3.2s runtime, slot<runtime so clip never loops
  { name: 'chef-plating', duration: 5, speed: 1   }, // Premium finish
]

const videoSrc = (name: string, small: boolean) => `/videos/hero/${name}-${small ? 720 : 1080}.mp4`

/** One inline-block span per character for the title reveal; the h1 keeps a plain-text label */
const splitChars = (text: string) =>
  text.split('').map((char, i) => (
    <span key={i} className="inline-block" aria-hidden="true">
      {char === ' ' ? '\u00A0' : char}
    </span>
  ))

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const videos = section.querySelectorAll<HTMLVideoElement>('.hero-vid')
    let current = 0
    let timeoutId: ReturnType<typeof setTimeout> | undefined
    let cancelled = false

    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const small = window.matchMedia('(max-width: 767px)').matches
    // Data-saver and reduced-motion visitors keep the still poster
    const videoEnabled = !reduceMotion && !connection?.saveData

    const ensureSrc = (i: number) => {
      const vid = videos[i]
      if (vid && !vid.getAttribute('src')) {
        vid.src = videoSrc(VIDEO_CONFIG[i].name, small)
        vid.preload = 'auto'
      }
    }

    const play = (vid: HTMLVideoElement, i: number) => {
      vid.playbackRate = VIDEO_CONFIG[i].speed
      const p = vid.play()
      if (p !== undefined) p.catch(() => {})
    }

    const playNext = () => {
      const config = VIDEO_CONFIG[current]
      // Fetch the upcoming clip while the current one plays
      ensureSrc((current + 1) % videos.length)
      timeoutId = setTimeout(() => {
        const prev = current
        current = (current + 1) % videos.length

        videos[current].currentTime = 0
        play(videos[current], current)

        // Cinema crossfade — outgoing fades out, incoming fades in simultaneously
        gsap.to(videos[prev], {
          opacity: 0,
          duration: 1.2,
          ease: 'power2.inOut',
          onComplete: () => {
            videos[prev].pause()
            videos[prev].currentTime = 0
          }
        })
        gsap.to(videos[current], { opacity: 1, duration: 1.2, ease: 'power2.inOut' })

        playNext()
      }, config.duration * 1000)
    }

    const startVideos = () => {
      if (cancelled || !videos[0]) return
      ensureSrc(0)
      const first = videos[0]
      const begin = () => {
        if (cancelled) return
        play(first, 0)
        gsap.to(first, { opacity: 1, duration: 1.2, ease: 'power2.inOut' })
        playNext()
      }
      if (first.readyState >= 3) begin()
      else first.addEventListener('canplay', begin, { once: true })
    }

    const onLoad = () => {
      timeoutId = setTimeout(startVideos, small ? 1500 : 300)
    }

    if (videoEnabled) {
      if (document.readyState === 'complete') onLoad()
      else window.addEventListener('load', onLoad, { once: true })
    }

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

        // Title character reveal (free SplitText alternative). The letter spans are
        // server-rendered so the title is painted before any JavaScript runs.
        if (title) {
          const allCharSpans = title.querySelectorAll<HTMLSpanElement>('.title-row > span')

          if (allCharSpans.length > 0) {
            // Slide up from behind the row's overflow mask. No opacity fade: a letter
            // returning from opacity 0 counts as a fresh paint and delays LCP.
            tl.from(allCharSpans, {
              yPercent: 110,
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
      cancelled = true
      window.removeEventListener('load', onLoad)
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
        <Image
          src="/images/hero-poster.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          quality={70}
          className="object-cover"
        />
        {VIDEO_CONFIG.map((config) => (
          <video
            key={config.name}
            className="hero-vid absolute inset-0 w-full h-full object-cover"
            muted
            playsInline
            preload="none"
            aria-hidden="true"
            style={{ opacity: 0, display: 'block' }}
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
          aria-label="Aurum Events & Catering"
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
          <span className="block whitespace-nowrap title-row overflow-hidden">{splitChars('AURUM EVENTS')}</span>
          <span className="block whitespace-nowrap title-row overflow-hidden" style={{ fontSize: '0.9em', marginTop: '2px' }}>{splitChars('& CATERING')}</span>
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
              color: 'var(--on-gold)',
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

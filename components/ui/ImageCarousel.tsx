'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'

interface ImageCarouselProps {
  images: { src: string; alt: string }[]
  height?: string
  autoAdvance?: number
}

export default function ImageCarousel({
  images,
  height = '520px',
  autoAdvance = 4000,
}: ImageCarouselProps) {
  const [current, setCurrent] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const goTo = useCallback(
    (index: number) => {
      if (!containerRef.current) return
      const slides = containerRef.current.querySelectorAll('.carousel-slide')

      // Ken Burns reset on outgoing
      gsap.to(slides[current], { opacity: 0, scale: 1, duration: 0.6, ease: 'power1.inOut' })

      // Ken Burns zoom on incoming
      gsap.fromTo(
        slides[index],
        { opacity: 0, scale: 1 },
        { opacity: 1, scale: 1.05, duration: 4, ease: 'power1.out' }
      )

      setCurrent(index)
    },
    [current]
  )

  const next = useCallback(() => {
    goTo((current + 1) % images.length)
  }, [current, images.length, goTo])

  const prev = useCallback(() => {
    goTo((current - 1 + images.length) % images.length)
  }, [current, images.length, goTo])

  // Auto-advance
  useEffect(() => {
    intervalRef.current = setInterval(next, autoAdvance)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [next, autoAdvance])

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden rounded"
      style={{ height }}
    >
      {/* Slides */}
      {images.map((img, i) => (
        <div
          key={i}
          className="carousel-slide absolute inset-0 w-full h-full"
          style={{ opacity: i === 0 ? 1 : 0 }}
        >
          <img
            src={img.src}
            alt={img.alt}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* Arrow Controls */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/20 backdrop-blur-sm hover:bg-[var(--gold)] text-white rounded-sm transition-all duration-200 z-10"
        aria-label="Previous"
      >
        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M10 2L4 8l6 6" />
        </svg>
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/20 backdrop-blur-sm hover:bg-[var(--gold)] text-white rounded-sm transition-all duration-200 z-10"
        aria-label="Next"
      >
        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 2l6 6-6 6" />
        </svg>
      </button>

      {/* Counter */}
      <div className="absolute bottom-4 right-4 font-barlow text-[13px] text-white/80 bg-black/30 px-3 py-1 rounded-sm backdrop-blur-sm">
        {current + 1}/{images.length}
      </div>
    </div>
  )
}

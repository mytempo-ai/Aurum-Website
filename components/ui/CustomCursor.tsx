'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    // Only on desktop (pointer: fine)
    if (!window.matchMedia('(pointer: fine)').matches) {
      cursor.style.display = 'none'
      return
    }

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX - 6,
        y: e.clientY - 6,
        duration: 0.15,
        ease: 'power2.out',
      })
    }

    const handleMouseEnter = () => {
      gsap.to(cursor, { scale: 3, opacity: 0.5, duration: 0.2 })
    }

    const handleMouseLeave = () => {
      gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.2 })
    }

    document.addEventListener('mousemove', moveCursor)

    // Scale up on interactive elements
    const interactives = document.querySelectorAll('a, button, input, textarea, select, [role="button"]')
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    return () => {
      document.removeEventListener('mousemove', moveCursor)
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-3 h-3 rounded-full bg-[var(--gold)] pointer-events-none z-[9999] mix-blend-difference"
      style={{ transform: 'translate(-20px, -20px)' }}
    />
  )
}

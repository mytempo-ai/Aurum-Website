'use client'

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis()
    lenisRef.current = lenis

    // Official GSAP + Lenis integration
    // Proxy scroll position from Lenis to ScrollTrigger
    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (arguments.length && value !== undefined) {
          lenis.scrollTo(value, { immediate: true })
        }
        return lenis.scroll
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight }
      },
    })

    // Keep ScrollTrigger in sync with Lenis scroll events
    lenis.on('scroll', () => {
      ScrollTrigger.update()
    })

    // Drive Lenis via GSAP ticker for smooth sync
    const tickerFn = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tickerFn)
    gsap.ticker.lagSmoothing(0)

    // Refresh ScrollTrigger after everything mounts so all triggers calculate correctly
    const rafId = requestAnimationFrame(() => {
      ScrollTrigger.refresh()
    })

    return () => {
      cancelAnimationFrame(rafId)
      gsap.ticker.remove(tickerFn)
      ScrollTrigger.scrollerProxy(document.body, undefined as unknown as ScrollTrigger.ScrollerProxyVars)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}

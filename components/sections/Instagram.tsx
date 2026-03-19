'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionLabel from '@/components/ui/SectionLabel'

gsap.registerPlugin(ScrollTrigger)

const BASE = 'https://aurum.events/wp-content/uploads/sb-instagram-feed-images/'

const POSTS = [
  { type: 'photo', file: '641775678_18423884146143660_7124639696238382695_nfull.webp', url: 'https://www.instagram.com/p/DVCuOHQgHv9/' },
  { type: 'reel',  file: '624761391_1588659359120186_5390517285653405953_nfull.jpg',  url: 'https://www.instagram.com/reel/DUMz7yQgANo/' },
  { type: 'reel',  file: '488373572_18379659508143660_1740736176368063884_nfull.jpg', url: 'https://www.instagram.com/reel/DIF9spOAwco/' },
  { type: 'reel',  file: '485628774_18377992651143660_9191843937866981732_nfull.jpg', url: 'https://www.instagram.com/reel/DHhqKSxg_qg/' },
  { type: 'reel',  file: '476457381_18372153316143660_6510719533655092795_nfull.jpg', url: 'https://www.instagram.com/reel/DFrBoGiAPjB/' },
  { type: 'reel',  file: '476040860_18371783590143660_6659959953236131965_nfull.jpg', url: 'https://www.instagram.com/reel/DFjWxCLgu2K/' },
  { type: 'reel',  file: '474695929_18370372708143660_7569003980961049389_nfull.jpg', url: 'https://www.instagram.com/reel/DFEhaIdg_l9/' },
  { type: 'reel',  file: '473656565_18369359584143660_922076827287858104_nfull.jpg',  url: 'https://www.instagram.com/reel/DEvXIpKS5UF/' },
  { type: 'reel',  file: '472376702_18368188105143660_5110723557285678909_nfull.jpg', url: 'https://www.instagram.com/reel/DEYzVLeunre/' },
  { type: 'reel',  file: '472429487_18368180440143660_91865806970235756_nfull.jpg',   url: 'https://www.instagram.com/reel/DEYoAwOPHdX/' },
  { type: 'photo', file: '470943877_1227607498324079_663517388446584626_nfull.jpg',   url: 'https://www.instagram.com/p/DD64suoNGvC/' },
  { type: 'photo', file: '470476913_607003965134059_1429380753281832561_nfull.jpg',   url: 'https://www.instagram.com/p/DDo3HRRNbgM/' },
  { type: 'reel',  file: '469956943_18364855282143660_5046369155099418735_nfull.jpg', url: 'https://www.instagram.com/reel/DDclVuJxC1L/' },
  { type: 'reel',  file: '503332651_974898877888060_5306795854252155778_nfull.jpg',   url: 'https://www.instagram.com/reel/DDb_LNbvAFI/' },
  { type: 'photo', file: '469745382_472926099153212_2630329756832065807_nfull.jpg',   url: 'https://www.instagram.com/p/DDW1jR_t4rc/' },
  { type: 'photo', file: '469333812_950225843832711_7491679502884325735_nfull.jpg',   url: 'https://www.instagram.com/p/DDJ9mM5tCr9/' },
  { type: 'reel',  file: '503799787_1021075360133057_5105976194675013402_nfull.jpg',  url: 'https://www.instagram.com/reel/DDE0AYFNmts/' },
  { type: 'reel',  file: '503318631_730284006145977_2824138164720755760_nfull.jpg',   url: 'https://www.instagram.com/reel/DCy3uZxC4RC/' },
  { type: 'photo', file: '467649302_1087440759453450_1193643974268039443_nfull.jpg',  url: 'https://www.instagram.com/p/DCgw23UtbKF/' },
  { type: 'photo', file: '466808195_604950755190478_1054270311156290960_nfull.jpg',   url: 'https://www.instagram.com/p/DCT46W3tDKI/' },
  { type: 'photo', file: '466427268_910356313992608_4754537237157216951_nfull.jpg',   url: 'https://www.instagram.com/p/DCOvTJft8mn/' },
  { type: 'photo', file: '465753003_3806418176237519_396176272165127369_nfull.jpg',   url: 'https://www.instagram.com/p/DCB3U1GNd0d/' },
  { type: 'reel',  file: '503813161_690262160429461_3324004663808498333_nfull.jpg',   url: 'https://www.instagram.com/reel/DB8twA1o6Kc/' },
  { type: 'reel',  file: '497693658_579245264745051_1700443005066549255_nfull.jpg',   url: 'https://www.instagram.com/reel/C-E6IWNMZBL/' },
] as const

export default function Instagram() {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!gridRef.current) return
    const grid = gridRef.current

    const ctx = gsap.context(() => {
      const label = sectionRef.current?.querySelector('.section-label-el')
      const heading = sectionRef.current?.querySelector('.ig-heading')

      if (label) {
        gsap.from(label, {
          y: 15, opacity: 0, duration: 0.6, ease: 'power2.out', immediateRender: false,
          scrollTrigger: { trigger: label, start: 'top 90%', toggleActions: 'play none none none' },
        })
      }

      if (heading) {
        gsap.from(heading, {
          y: 20, opacity: 0, duration: 0.6, ease: 'power2.out', immediateRender: false,
          scrollTrigger: { trigger: heading, start: 'top 90%', toggleActions: 'play none none none' },
        })
      }

      const items = grid.querySelectorAll('.ig-item')
      gsap.from(items, {
        y: 30, opacity: 0, duration: 0.45, stagger: 0.04,
        ease: 'power2.out', immediateRender: false,
        scrollTrigger: { trigger: grid, start: 'top 85%', toggleActions: 'play none none none' },
      })

      const cta = sectionRef.current?.querySelector('.ig-cta')
      if (cta) {
        gsap.from(cta, {
          y: 20, opacity: 0, duration: 0.6, ease: 'power2.out', immediateRender: false,
          scrollTrigger: { trigger: cta, start: 'top 90%', toggleActions: 'play none none none' },
        })
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="instagram"
      ref={sectionRef}
      className="section-white py-14 md:py-20 lg:py-[120px] px-4 sm:px-6"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <SectionLabel>FOLLOW ALONG</SectionLabel>
          <h2 className="ig-heading heading-section text-[var(--text-brown)] mt-3">
            <a
              href="https://www.instagram.com/Aurum_events/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--gold)] transition-colors duration-200"
            >
              @aurum_events
            </a>
          </h2>
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-[2px] md:gap-[3px] mb-12"
        >
          {POSTS.map((post, i) => (
            <a
              key={i}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="ig-item relative block overflow-hidden group"
              style={{ aspectRatio: '1 / 1' }}
            >
              {/* Thumbnail */}
              <img
                src={`${BASE}${post.file}`}
                alt={`Aurum Events Instagram ${post.type === 'reel' ? 'reel' : 'post'} ${i + 1}`}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[400ms] group-hover:scale-105"
                loading="lazy"
              />

              {/* Reel play icon (always visible) */}
              {post.type === 'reel' && (
                <div className="absolute top-2.5 right-2.5 z-10 pointer-events-none">
                  <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6 sm:w-5 sm:h-5 drop-shadow-md">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              )}

              {/* Hover overlay — gold tint */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-[350ms]"
                style={{ backgroundColor: 'rgba(200,147,58,0.35)' }}
              />

              {/* Hover Instagram icon — centered */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-[350ms] z-10">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36">
                  <defs>
                    <radialGradient id={`ig-hover-${i}`} cx="30%" cy="107%" r="150%">
                      <stop offset="0%" stopColor="#fdf497" />
                      <stop offset="45%" stopColor="#fd5949" />
                      <stop offset="60%" stopColor="#d6249f" />
                      <stop offset="90%" stopColor="#285AEB" />
                    </radialGradient>
                  </defs>
                  <path
                    fill={`url(#ig-hover-${i})`}
                    d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                  />
                </svg>
              </div>
            </a>
          ))}
        </div>

        {/* Follow CTA */}
        <div className="ig-cta text-center">
          <a
            href="https://www.instagram.com/Aurum_events/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 font-oswald font-semibold text-[12px] uppercase tracking-[2px] text-[var(--text-brown)] hover:text-[var(--gold)] transition-colors duration-200 group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="28"
              height="28"
              className="transition-transform duration-300 group-hover:scale-110"
            >
              <defs>
                <radialGradient id="ig-cta-grad" cx="30%" cy="107%" r="150%">
                  <stop offset="0%" stopColor="#fdf497" />
                  <stop offset="45%" stopColor="#fd5949" />
                  <stop offset="60%" stopColor="#d6249f" />
                  <stop offset="90%" stopColor="#285AEB" />
                </radialGradient>
              </defs>
              <path
                fill="url(#ig-cta-grad)"
                d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
              />
            </svg>
            FOLLOW US ON INSTAGRAM
          </a>
        </div>
      </div>
    </section>
  )
}

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

/** Sidebar menu links with the current page highlighted */
export function MenuSidebarNav({ links }: { links: { label: string; href: string }[] }) {
  const pathname = usePathname()
  return (
    <nav className="flex flex-col gap-1">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`font-barlow text-[15px] py-2 px-3 rounded transition-all duration-200 ${
            pathname === link.href
              ? 'text-[var(--gold-text)] bg-[var(--gold-pale)] font-medium'
              : 'text-[var(--text-muted)] hover:text-[var(--gold-text)] hover:bg-[var(--surface-warm)]'
          }`}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  )
}

/** Staggered entrance for `.menu-item` blocks */
export function MenuContentAnimator({ children }: { children: React.ReactNode }) {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!contentRef.current) return
    const items = contentRef.current.querySelectorAll('.menu-item')
    gsap.from(items, {
      y: 20, duration: 0.4, stagger: 0.05, ease: 'power2.out', immediateRender: false,
    })
  }, [])

  return <div ref={contentRef}>{children}</div>
}

'use client'

import { ReactNode } from 'react'

interface SectionLabelProps {
  text?: string
  children?: ReactNode
  className?: string
}

export default function SectionLabel({ text, children, className = '' }: SectionLabelProps) {
  return (
    <span
      className={`section-label-el block mb-3 heading-serif text-[11px] uppercase tracking-[5px] text-[var(--gold)] ${className}`}
    >
      {text ?? children}
    </span>
  )
}

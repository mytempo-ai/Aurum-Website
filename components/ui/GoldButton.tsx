'use client'

import Link from 'next/link'

interface GoldButtonProps {
  href: string
  children: React.ReactNode
  variant?: 'filled' | 'outline'
  external?: boolean
  fullWidth?: boolean
  className?: string
  type?: 'button' | 'submit'
  onClick?: () => void
}

export default function GoldButton({
  href,
  children,
  variant = 'filled',
  external = false,
  fullWidth = false,
  className = '',
  type,
  onClick,
}: GoldButtonProps) {
  const classes = [
    variant === 'filled' ? 'btn-gold-filled' : 'btn-gold-outline',
    fullWidth ? 'w-full' : '',
    className,
  ].filter(Boolean).join(' ')

  if (type === 'submit') {
    return (
      <button type="submit" className={classes} onClick={onClick}>
        {children}
      </button>
    )
  }

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  )
}

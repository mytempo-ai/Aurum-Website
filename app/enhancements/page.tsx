import type { Metadata } from 'next'
import EnhancementsPage from '@/components/sections/EnhancementsPage'

export const metadata: Metadata = {
  title: 'Enhancements & Add-Ons | Aurum Events & Catering — Freehold, NJ',
  description:
    'Elevate your event at Aurum Events & Catering with premium enhancements — all white dance floor, photo booth, foosball, dancing on clouds, CO2 blasts, custom gobos, and more.',
}

export default function Page() {
  return <EnhancementsPage />
}

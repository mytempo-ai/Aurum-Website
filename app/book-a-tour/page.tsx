import type { Metadata } from 'next'
import BookATourForm from './BookATourForm'

export const metadata: Metadata = {
    title: 'Book a Private Tour | Aurum Events & Catering — Freehold, NJ',
    description: 'Schedule a private tour of Aurum Events & Catering in Freehold, NJ. Experience our elegant ballroom and explore our full-service catering and event options in person. Serving all of Monmouth County, NJ.',
    keywords: [
        'book event venue Freehold NJ',
        'tour event hall NJ',
        'wedding venue tour New Jersey',
        'Monmouth County event venue tour',
        'Aurum Events contact',
        'Aurum Events tour booking',
    ],
    alternates: {
        canonical: 'https://aurum.events/book-a-tour',
    },
    openGraph: {
        title: 'Book a Private Tour | Aurum Events & Catering — Freehold, NJ',
        description: 'Experience Aurum Events & Catering in person. Schedule your private venue tour today — Freehold, NJ\'s premier event space.',
        url: 'https://aurum.events/book-a-tour',
        images: [{ url: '/images/hero-bg.jpg', width: 1200, height: 630, alt: 'Book a Tour at Aurum Events Freehold NJ' }],
    },
}

export default function BookATourPage() {
    return <BookATourForm />
}

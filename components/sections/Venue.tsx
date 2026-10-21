import VenueClient, { type VenueMedia } from './VenueClient'

// Photos and short clips shown in the venue strip. Clips are small (640px)
// encodes with a poster frame; they only download once scrolled into view.
const VENUE_MEDIA: VenueMedia[] = [
  { type: 'video', src: '/images/venue-images/clips/rooftop-deck.mp4', poster: '/images/venue-images/clips/rooftop-deck-poster.jpg', label: 'Rooftop Deck' },
  { type: 'video', src: '/images/venue-images/clips/venue-walkthrough.mp4', poster: '/images/venue-images/clips/venue-walkthrough-poster.jpg', label: 'Aurum Events' },
  { type: 'image', src: '/images/venue-images/venue-1.jpeg', label: 'Aurum Events' },
  { type: 'image', src: '/images/venue-images/venue-2.jpeg', label: 'Aurum Events' },
  { type: 'image', src: '/images/venue-images/venue-3.jpeg', label: 'Aurum Events' },
]

export default function Venue() {
  return <VenueClient media={VENUE_MEDIA} heroImage="/images/venue-images/venue-1.jpeg" />
}

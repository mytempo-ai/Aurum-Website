import fs from 'fs'
import path from 'path'
import VenueClient from './VenueClient'

export default function Venue() {
  const venueDir = path.join(process.cwd(), 'public/images/venue-images')
  
  // Ensure directory exists to avoid build errors
  if (!fs.existsSync(venueDir)) {
    console.warn('Venue directory not found:', venueDir)
    return null
  }

  const files = fs.readdirSync(venueDir)
    .filter(f => /\.(jpg|jpeg|png|webp|mp4|mov)$/i.test(f))
    .sort() // Ensure consistent order for labeling

  return <VenueClient mediaFiles={files} />
}

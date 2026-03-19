import Hero from '@/components/sections/Hero'
import Stats from '@/components/sections/Stats'
import Venue from '@/components/sections/Venue'
import Events from '@/components/sections/Events'
import Reviews from '@/components/sections/Reviews'
import Instagram from '@/components/sections/Instagram'
import Contact from '@/components/sections/Contact'

export default function Home() {
  return (
    <main>
      <Hero />
      <Stats />
      <Venue />
      <Events />
      <Reviews />
      <Instagram />
      <Contact />
    </main>
  )
}


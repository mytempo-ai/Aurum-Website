import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Catering Menus | Aurum Events & Catering — Freehold, NJ',
  description: 'Explore Aurum Events & Catering\'s full menus — passed hors d\'oeuvres, action stations, plated dinners, children\'s selections, and elaborate dessert displays. Premier catering in Freehold, Monmouth County NJ.',
  keywords: [
    'catering menus NJ',
    'event catering menu',
    'gourmet catering NJ',
    'catering services Freehold NJ',
    'modern catering NJ',
    'American cuisine catering NJ',
    'event food catering NJ',
    'full service catering NJ',
    'catering menu Freehold NJ',
    'event catering Monmouth County NJ',
    'hors doeuvres catering NJ',
    'wedding catering New Jersey',
    'banquet menu NJ',
    'action stations catering NJ',
  ],
  alternates: {
    canonical: 'https://aurum.events/menus',
  },
  openGraph: {
    title: 'Catering Menus | Aurum Events & Catering — Freehold, NJ',
    description: 'Passed hors d\'oeuvres, action stations, plated dinners, and spectacular dessert displays. In-house catering excellence at Aurum Events & Catering, Freehold NJ.',
    url: 'https://aurum.events/menus',
    images: [{ url: '/images/menu-header.png', width: 1200, height: 630, alt: 'Catering Menus at Aurum Events Freehold NJ' }],
  },
}

const CATEGORIES = [
  { id: 'hors-doeuvres', title: "Hors d'Oeuvres", desc: "Passed & stationary appetizers to start the evening", image: "/images/menu/hors-doeuvres-1.png" },
  { id: 'stations', title: "Action Stations", desc: "Interactive dining experiences in every corner", image: "/images/menu/stations-1.png" },
  { id: 'first-course', title: "First Course", desc: "Fresh greens and elegant starters", image: "/images/menu/first-course-1.png" },
  { id: 'dinner', title: "Dinner Selections", desc: "Expertly crafted mains and sides", image: "/images/menu/dinner-1.png" },
  { id: 'childrens-menu', title: "Children's Menu", desc: "Kid-friendly favorites", image: "/images/menu/kids-1.png" },
  { id: 'desserts', title: "Desserts", desc: "Sweet finales to remember", image: "/images/menu/dessert-1.png" },
]

export default function MenusPage() {
  return (
    <div className="pt-[72px]">
      <div className="relative h-[300px] md:h-[400px] overflow-hidden">
        <div className="absolute inset-0 bg-[var(--hero-bg)]">
          <img
            src="/images/menu-header.png"
            alt="Aurum Events & Catering full-service menus — Freehold NJ"
            className="w-full h-full object-cover opacity-60"
            width={1600}
            height={900}
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <h1 className="font-oswald font-bold text-white text-5xl md:text-6xl uppercase tracking-[4px] mb-4">
            Our Menus
          </h1>
          <p className="font-barlow text-lg text-white/80 max-w-2xl">
            From passed hors d&apos;oeuvres to interactive action stations and dramatic desserts, our culinary team delivers unforgettable dining experiences in Freehold, NJ.
          </p>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CATEGORIES.map((cat) => (
            <Link key={cat.id} href={`/menus/${cat.id}`} className="group block h-[320px] relative overflow-hidden rounded bg-[var(--surface)]">
              <img
                src={cat.image}
                alt={`${cat.title} — Aurum Events catering Freehold NJ`}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                width={600}
                height={320}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300" />
              <div className="absolute inset-x-8 bottom-8 z-10 border-t border-[var(--gold)]/50 pt-4">
                <h2 className="font-oswald font-bold text-white text-2xl uppercase tracking-[2px] mb-2">{cat.title}</h2>
                <p className="font-barlow text-white/80 italic">{cat.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

import { EVENTS } from './eventData'

export type MenuPage = {
  slug: string
  title: string
  desc: string
  image: string
}

export const MENU_PAGES: MenuPage[] = [
  { slug: 'hors-doeuvres', title: "Hors d'Oeuvres", desc: 'Passed & stationary appetizers to start the evening', image: '/images/menu/hors-doeuvres-1.jpg' },
  { slug: 'stations', title: 'Action Stations', desc: 'Interactive dining experiences in every corner', image: '/images/menu/stations-1.jpg' },
  { slug: 'first-course', title: 'First Course', desc: 'Fresh greens and elegant starters', image: '/images/menu/first-course-1.jpg' },
  { slug: 'dinner', title: 'Dinner Selections', desc: 'Expertly crafted mains and sides', image: '/images/menu/dinner-1.jpg' },
  { slug: 'childrens-menu', title: "Children's Menu", desc: 'Kid-friendly favorites', image: '/images/menu/kids-1.jpg' },
  { slug: 'desserts', title: 'Desserts', desc: 'Sweet finales to remember', image: '/images/menu/dessert-1.jpg' },
]

export function getMenuBySlug(slug: string): MenuPage | undefined {
  return MENU_PAGES.find((m) => m.slug === slug)
}

/** Event types whose page lists this menu as a match */
export function eventsForMenu(slug: string) {
  return EVENTS.filter((e) => e.menus.includes(slug))
}

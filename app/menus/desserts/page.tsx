import type { Metadata } from 'next'
import MenuLayout from '@/components/layout/MenuLayout'
import MenuGallery from '@/components/ui/MenuGallery'

export const metadata: Metadata = {
  title: 'Dessert Catering NJ — S\'mores, Cannolis & More',
  description: "Showstopping desserts for events in Freehold NJ. S'mores station, hot cookie dough, cannolis, custom Bar Mitzvah cakes & more by Aurum Events.",
  keywords: [
    'dessert catering NJ',
    'event desserts Freehold NJ',
    'wedding desserts NJ',
    "s'mores catering",
    'hot cookie dough desserts',
    'Bar Mitzvah cake NJ',
    'passed desserts catering NJ',
    'sundae bar catering NJ',
  ],
  alternates: { canonical: 'https://aurum.events/menus/desserts' },
  openGraph: {
    title: 'Dessert Catering NJ — S\'mores, Cannolis & More | Aurum Events',
    description: "Showstopping desserts for events in Freehold NJ. S'mores station, hot cookie dough, cannolis, custom Bar Mitzvah cakes & more.",
    url: 'https://aurum.events/menus/desserts',
    images: [{ url: '/images/menu/dessert-1.png', width: 1200, height: 630, alt: 'Dessert catering at Aurum Events Freehold NJ' }],
  },
}
export default function DessertsMenu() {
  const CARTS = [
    { name: "Flourless Chocolate Cake", desc: "Gluten-free, rich chocolate ganache, raspberry coulis" },
    { name: "Fruit Tarte", desc: "Seasonal fruits, vanilla pastry cream, buttery shortbread" },
    { name: "Oreo Cake", desc: "Cookies and cream layers, dark chocolate drip" },
    { name: "Crème Brûlée Cheesecake", desc: "Torched sugar crust, creamy New York style base" },
    { name: "Mousse & Brûlée Cups", desc: "Assorted flavors: Chocolate, Espresso, Berry" },
    { name: "Hot Hazelnut Pastry", desc: "Warm nutella filling, flaky crust, powdered sugar" },
    { name: "Hot Cookie Dough", desc: "Freshly baked, served warm with vanilla bean ice cream" },
    { name: "Sundae Bar", desc: "Premium ice creams, assorted toppings, syrups and whipped cream" }
  ]

  const PASSED = [
    { name: "S’mores", desc: "Toasted marshmallow, graham cracker, melted chocolate" },
    { name: "Mousse Cups", desc: "Salted caramel, dark chocolate, white chocolate raspberry" },
    { name: "Cannolis", desc: "Traditional ricotta filling, mini chocolate chips, pistachios" },
    { name: "Pastries", desc: "Petite fours, macarons, eclairs, cream puffs" },
    { name: "Brownies", desc: "Double chocolate fudge, walnuts, sea salt" },
    { name: "Cake Pops", desc: "Red velvet, birthday cake, chocolate peanut butter" },
    { name: "Churros", desc: "Cinnamon sugar, dulce de leche dipping sauce" },
    { name: "Stuffed Cookies", desc: "Chocolate chip with molten center, peanut butter" }
  ]

  return (
    <MenuLayout title="Desserts" heroImage="/images/menu-header.png">
      <div className="flex flex-col gap-12">
        <div className="menu-item">
          <h3 className="font-oswald font-bold text-2xl text-[var(--text-brown)] border-b-2 border-[var(--gold)] pb-3 mb-6 uppercase tracking-[1px]">
            Dessert Carts
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CARTS.map((item, i) => (
              <div key={i}>
                <h4 className="font-oswald font-semibold text-[18px] text-[var(--gold-dark)] uppercase">{item.name}</h4>
                <p className="font-barlow text-[14px] text-[var(--text-muted)] italic mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="menu-item">
          <h3 className="font-oswald font-bold text-2xl text-[var(--text-brown)] border-b-2 border-[var(--gold)] pb-3 mb-6 uppercase tracking-[1px]">
            Passed Desserts
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PASSED.map((item, i) => (
              <div key={i}>
                <h4 className="font-oswald font-semibold text-[18px] text-[var(--gold-dark)] uppercase">{item.name}</h4>
                <p className="font-barlow text-[14px] text-[var(--text-muted)] italic mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="menu-item p-8 bg-[var(--surface-warm)] border border-[var(--gold)]/30 rounded text-center">
          <h3 className="font-oswald font-bold text-xl text-[var(--gold-dark)] uppercase tracking-[2px] mb-2">
            Custom Celebrations
          </h3>
          <p className="font-barlow text-[16px] text-[var(--text)] italic">
            Fondant, pastillage, figurines — any flavor, any filling, any design, any dream!
          </p>
        </div>
      </div>

      <MenuGallery images={[
        '/images/menu/dessert-1.png',
        '/images/menu/kids-1.png',
        '/images/menu/hors-doeuvres-1.png'
      ]} />
    </MenuLayout>
  )
}

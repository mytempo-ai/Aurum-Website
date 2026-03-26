import type { Metadata } from 'next'
import MenuLayout from '@/components/layout/MenuLayout'
import MenuGallery from '@/components/ui/MenuGallery'

export const metadata: Metadata = {
  title: "Children's Catering Menu NJ",
  description: "Kid-friendly catering menu for events in NJ. Pizza, chicken tenders, sliders, pasta & more. Perfect for Sweet 16s, Mitzvahs, and family events.",
  keywords: [
    "children's catering menu NJ",
    'kids menu event catering',
    "children's party food NJ",
  ],
  alternates: { canonical: 'https://aurum.events/menus/childrens-menu' },
  openGraph: {
    title: "Children's Catering Menu NJ | Aurum Events",
    description: "Kid-friendly catering menu for events in NJ. Pizza, chicken tenders, sliders, pasta & more.",
    url: 'https://aurum.events/menus/childrens-menu',
    images: [{ url: '/images/menu/kids-1.png', width: 1200, height: 630, alt: "Children's catering menu at Aurum Events Freehold NJ" }],
  },
}
export default function ChildrensMenu() {
  const CATEGORIES = [
    {
      title: "Fresh Starters",
      items: ["Caesar Salad", "Baby Field Greens", "Greek Salad"]
    },
    {
      title: "Italian Favorites",
      items: [
        "Mozzarella Sticks", "Penne Vodka", "Mini Pizza", "Chicken Parmigiana",
        "Linguini & Broccoli", "Tortellini Alfredo", "Meatballs & Spaghetti",
        "Baked Manicotti", "Sausage & Broccoli Rabe Pasta"
      ]
    },
    {
      title: "All-American Classics",
      items: [
        "Buffalo Wings", "Corn Dogs", "Chicken Cutlets", "Chicken Tenders",
        "Mac & Cheese", "Popcorn Chicken", "Hot Dogs", "Cheeseburgers",
        "French Fries", "Onion Rings"
      ]
    },
    {
       title: "Asian & Latin Fusion",
       items: [
         "Chicken & Vegetable Lo Mein", "Chicken Fried Rice", "Vegetable Egg Rolls",
         "Beef & Broccoli", "General Tso Chicken", "Fried Potstickers",
         "Taquitos", "Cheese Quesadillas", "Mini Chicken Tacos", "Beef Empanadas", "Jalapeño Poppers"
       ]
    },
    {
      title: "Seafood & Sides",
      items: [
        "Fried Calamari", "Battered Fried Cod", "Mashed Potatoes",
        "Fried Potato Wedges", "Sausage & Peppers"
      ]
    }
  ]

  return (
    <MenuLayout title="Children&apos;s Menu" heroImage="/images/menu-header.png">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
        {CATEGORIES.map((cat, i) => (
          <div key={i} className="menu-item">
            <h3 className="font-oswald font-bold text-2xl text-[var(--text-brown)] border-b-2 border-[var(--gold)] pb-3 mb-6 uppercase tracking-[1px]">
              {cat.title}
            </h3>
            <ul className="flex flex-col gap-3">
              {cat.items.map((item, j) => (
                <li key={j} className="font-barlow text-[16px] text-[var(--text)] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] inline-block" /> {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <MenuGallery images={[
        '/images/menu/kids-1.png',
        '/images/menu/hors-doeuvres-1.png',
        '/images/menu/stations-1.png'
      ]} />
    </MenuLayout>
  )
}


import type { Metadata } from 'next'
import MenuLayout from '@/components/layout/MenuLayout'
import MenuGallery from '@/components/ui/MenuGallery'

export const metadata: Metadata = {
  title: 'Action Stations Catering NJ',
  description: "Interactive action stations for events in Freehold NJ. Skirt Steak Grill, Sushi Bar, Brazilian Rodízio & more. A la carte catering options.",
  keywords: [
    'action stations catering NJ',
    'a la carte catering NJ',
    'catering stations NJ',
    'interactive catering NJ',
    'skirt steak grill station',
    'sushi bar catering NJ',
    'food stations event NJ',
    'live cooking stations NJ',
  ],
  alternates: { canonical: 'https://aurum.events/menus/stations' },
  openGraph: {
    title: 'Action Stations Catering NJ | Aurum Events',
    description: "Interactive action stations for events in Freehold NJ. Skirt Steak Grill, Sushi Bar, Brazilian Rodízio & more.",
    url: 'https://aurum.events/menus/stations',
    images: [{ url: '/images/menu/stations-1.png', width: 1200, height: 630, alt: 'Action stations catering at Aurum Events Freehold NJ' }],
  },
}
export default function StationsMenu() {
  const STATIONS = [
    { 
      name: 'Italian', 
      items: 'Ravioli, Rainbow Tortellini, Penne',
      sauces: 'Pesto, Bolognese, Carbonara',
      sides: 'Focaccia, Eggplant Rollatine, Antipasto, Chicken Marsala' 
    },
    { 
      name: 'Hibachi Grill', 
      items: 'Teriyaki Chicken, Shrimp, Beef',
      sides: 'Vegetables, Sticky Rice, Dumplings'
    },
    { 
      name: 'Sliders', 
      items: 'Beef, Grilled Chicken, Fried Chicken',
      sides: 'Fries, Onion Rings, Toppings'
    },
    { 
      name: 'Brazilian Rodízio', 
      items: 'Steak & Lamb Roast',
      sides: 'Spanish Potatoes, Plantains, Grilled Pineapple'
    },
    { 
      name: 'Skirt Steak Station', 
      items: 'Steak with Mushrooms, Fries, Spinach'
    },
    { 
      name: 'Rib Eye Carving', 
      items: 'Ribeye, Croquettes, Bacon, Sweet Potato Fries',
      badge: '★ PREMIUM'
    },
    { 
      name: 'Cheesesteak', 
      items: 'Steak/Chicken, Cheese Options, Hoagies'
    },
    { 
      name: 'Greek', 
      items: 'Souvlaki, Orzo, Stuffed Grape Leaves',
      sides: 'Spanakopita, Moussaka'
    },
    { 
      name: 'Charcuterie', 
      items: 'Cured Meats, Cheeses, Crackers, Fruits'
    },
    { 
      name: 'Portuguese', 
      items: 'Seafood Paella, Cod Fritters, Octopus'
    },
    { 
      name: 'Chic Fil Aurum', 
      items: 'Chicken Sandwiches, Waffle Fries, Mac & Cheese'
    },
    { 
      name: 'Raw Bar', 
      items: 'Clams, Shrimp, Crab, Lobster, Oysters',
      sides: 'Tuna, Salmon, Seaweed Salad',
      badge: '★ PREMIUM'
    },
    { 
      name: 'Cuban', 
      items: 'Ropa Vieja, Chicken Fried Steak',
      sides: 'Rice, Beans, Cubanos'
    },
    { 
      name: 'Korean BBQ', 
      items: 'BBQ Pork, Dumplings, Slaw'
    },
    { 
      name: 'Sushi', 
      items: 'Maki, Nigiri, Sashimi',
      badge: '★ PREMIUM'
    },
    { 
      name: 'Tacos', 
      items: 'Carnitas, Chicken, Shrimp',
      sides: 'Nachos, Quesadilla, Empanadas'
    },
    { 
      name: 'Shrimp Cocktail'
    },
    { 
      name: 'Cold Display', 
      items: 'Fruits, Crudités, Grilled Vegetables, Thai Noodles'
    }
  ]

  return (
    <MenuLayout title="Action Stations" heroImage="/images/menu-header.png">
      <div className="flex flex-col gap-6">
        {STATIONS.map((station, i) => (
          <div key={i} className="menu-item border-b border-[var(--border)] pb-6 last:border-b-0">
            <div className="flex items-center gap-3">
              <h4 className="font-oswald font-semibold text-[18px] text-[var(--gold-dark)] uppercase tracking-wide">
                {station.name}
              </h4>
              {station.badge && (
                 <span className="bg-[var(--gold-pale)] text-[var(--gold-dark)] text-[10px] font-bold uppercase tracking-[1px] px-2 py-0.5 rounded-sm border border-[var(--gold)]/30">
                   {station.badge}
                 </span>
              )}
            </div>
            <div className="font-barlow text-[14px] text-[var(--text-muted)] mt-1 space-y-1">
              {station.items && <p><span className="text-[var(--text-brown)] font-medium">Includes:</span> {station.items}</p>}
              {station.sauces && <p><span className="text-[var(--text-brown)] font-medium">Sauces:</span> {station.sauces}</p>}
              {station.sides && <p><span className="text-[var(--text-brown)] font-medium">Featured Sides:</span> {station.sides}</p>}
            </div>
          </div>
        ))}
      </div>

      <MenuGallery images={[
        '/images/menu/stations-1.png',
        '/images/menu/stations-2.png',
        '/images/menu/stations-3.png'
      ]} />
    </MenuLayout>
  )
}


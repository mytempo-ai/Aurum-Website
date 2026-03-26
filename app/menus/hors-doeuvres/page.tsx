import type { Metadata } from 'next'
import MenuLayout from '@/components/layout/MenuLayout'
import MenuGallery from '@/components/ui/MenuGallery'

export const metadata: Metadata = {
  title: "Passed Hors d'Oeuvres Catering NJ",
  description: "Elegant passed hors d'oeuvres for weddings, Sweet 16s, and events in NJ. Short Rib & Polenta, Lamb Chops, Tuna Tartare & more. Freehold NJ.",
  keywords: [
    "passed hors d'oeuvres catering NJ",
    'cocktail hour food NJ',
    'event appetizers Freehold NJ',
    'short rib polenta catering',
    'lamb chops catering NJ',
    'wedding appetizers NJ',
    'cocktail hour catering NJ',
  ],
  alternates: { canonical: 'https://aurum.events/menus/hors-doeuvres' },
  openGraph: {
    title: "Passed Hors d'Oeuvres Catering NJ | Aurum Events",
    description: "Elegant passed hors d'oeuvres for weddings & events in Freehold NJ. Short Rib & Polenta, Lamb Chops, Tuna Tartare & more.",
    url: 'https://aurum.events/menus/hors-doeuvres',
    images: [{ url: '/images/menu/hors-doeuvres-1.png', width: 1200, height: 630, alt: "Passed hors d'oeuvres at Aurum Events Freehold NJ" }],
  },
}
const ITEMS = [
  { name: 'Sesame & Flax Seed Crusted Chicken', desc: 'Sriracha honey glaze' },
  { name: 'Hot Dog Sliders', desc: 'Spicy mustard, caramelized onions' },
  { name: 'Reuben', desc: 'Corned beef, sauerkraut, swiss, russian dressing' },
  { name: 'Crispy Duck Purses', desc: 'Apricot ginger sauce' },
  { name: 'Beef Short Rib on Polenta', desc: 'Red wine reduction' },
  { name: 'Wild Mushroom & Crab Fritter', desc: 'Lemon herb aioli' },
  { name: 'Portabello Phyllo Purse', desc: 'Balsamic glaze' },
  { name: 'Cheesesteak Egg Rolls', desc: 'Spiced ketchup' },
  { name: 'Chicken & Waffles', desc: 'Maple bourbon syrup' },
  { name: 'Spanakopita', desc: 'Spinach and feta in phyllo' },
  { name: 'Portobello & Red Pepper Danish', desc: 'Roasted red pepper coulis' },
  { name: 'Risotto Cakes', desc: 'Pesto drizzle' },
  { name: 'Artichoke & Cheese Stuffed Mushroom', desc: 'Garlic herb crust' },
  { name: 'Tomato Bisque & Grilled Cheese Shots', desc: 'Miniature comfort classic' },
  { name: 'Samosa', desc: 'Spiced vegetable filling, mint chutney' },
  { name: 'Rock Shrimp "Cocktail"', desc: 'Bloody Mary shooters' },
  { name: 'Cheeseburger Bites', desc: 'Angus beef, cheddar, pickle' },
  { name: 'Bulgogi Bao Bun', desc: 'Korean BBQ beef, pickled slaw' },
  { name: 'Cuban Flank Steak', desc: 'Chimichurri sauce' },
  { name: 'Shrimp Fritter', desc: 'Sweet chili dipping sauce' },
  { name: 'Buffalo Chicken Egg Rolls', desc: 'Blue cheese dip' },
  { name: 'Chicken Parmigiana Slider', desc: 'Marinara, fresh mozzarella' },
  { name: 'Tuna Tartare', desc: 'Avocado, soy ginger, wonton crisp' },
  { name: 'Gyro', desc: 'Lamb & beef, tzatziki, pita' },
  { name: 'Short Rib Grilled Cheese', desc: 'Slow braised rib, sourdough' },
  { name: 'Prosciutto & Melon', desc: 'Balsamic pearls' },
  { name: 'Quiche Lorraine', desc: 'Bacon, onions, gruyère' },
  { name: 'Chicken & Cheese Quesadilla', desc: 'Cilantro lime crema' },
  { name: 'Herb & Balsamic Glazed Lamb Chops', desc: 'Market pricing', badge: '★ PREMIUM' },
  { name: 'BBQ Chicken Flatbread', desc: 'Red onion, cilantro' },
  { name: 'Korean Pork Tostada', desc: 'Kimchi slaw, gochujang aiole' },
  { name: 'Chicken & Cornbread', desc: 'Honey butter drizzle' },
  { name: 'Filet Toast', desc: 'Horseradish cream' },
  { name: 'Shrimp & Grits', desc: 'Cajun spice, creamy grits' },
  { name: 'Crab & Shrimp Rangoon', desc: 'Lump crab and shrimp, cream cheese' },
  { name: 'Grilled Chicken Tacos', desc: 'Radish, lime, salsa verde' },
  { name: 'Crab & Ricotta Hand-Pie', desc: 'Old Bay seasoning' },
] 

export default function HorsDoeuvresPage() {
  return (
    <MenuLayout title="Passed Hors d'Oeuvres" heroImage="/images/menu-header.png">
      <div className="space-y-0">
        {ITEMS.map((item, i) => (
          <div key={i} className="menu-item py-5 border-b border-[var(--border)] last:border-b-0">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h4 className="menu-item-name">{item.name}</h4>
                <p className="menu-item-desc mt-1">{item.desc}</p>
              </div>
              {item.badge && (
                <span className="flex-shrink-0 px-2 py-1 text-[9px] font-oswald font-medium uppercase tracking-[1.5px] text-[var(--gold-dark)] bg-[var(--gold-pale)] rounded-sm whitespace-nowrap">
                  {item.badge}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-6 font-barlow font-light italic text-sm text-[var(--gold)]">
        ★ Items available at additional cost — premium selection
      </p>

      <MenuGallery images={[
        '/images/menu/hors-doeuvres-1.png',
        '/images/menu/stations-1.png', // Reusing some high quality images
        '/images/menu/first-course-1.png'
      ]} />
    </MenuLayout>
  )
}


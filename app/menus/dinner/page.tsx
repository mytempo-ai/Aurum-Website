import MenuLayout from '@/components/layout/MenuLayout'
import MenuGallery from '@/components/ui/MenuGallery'

const CATEGORIES = [
  {
    title: "Meat Selection",
    items: [
      "Ribeye", "Filet", "NY Strip", "Braised Short Rib", 
      "Grilled Pork Loin", "Grilled Skirt Steak"
    ],
    premiumItems: [
      { name: "Dry Aged Bone-in NY Strip", price: "Market" },
      { name: "Dry Aged Ribeye", price: "Market" }
    ]
  },
  {
    title: "Chicken Specialties",
    items: [
      "Chicken Milanese", "Chicken Roulade", "Garlic Herb Roasted Chicken",
      "Dijon Herb Chicken", "Parmesan Crusted Chicken"
    ]
  },
  {
    title: "Seafood Selections",
    items: [
       "Sesame Teriyaki Salmon", "Pistachio Crusted Salmon", "Miso Glazed Salmon",
       "Herb Roasted Cod", "Cod Loin Puttanesca", "Mahi"
    ],
    premiumItems: [
      { name: "Chilean Seabass", price: "Market" },
      { name: "Halibut", price: "Market" },
      { name: "Lump Crab Cake", price: "Market" }
    ]
  },
  {
    title: "Vegetarian Entrees",
    items: [
      "Grilled Mushroom & Polenta", "Sun-dried Tomato & Zucchini Risotto", "Eggplant Rollettine"
    ]
  }
]

export default function DinnerMenu() {
  return (
    <MenuLayout title="Dinner Selections" heroImage="/images/menu-header.png">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
        {CATEGORIES.map((cat, i) => (
          <div key={i} className="menu-item">
            <h3 className="font-oswald font-bold text-2xl text-[var(--text-brown)] border-b-2 border-[var(--gold)] pb-3 mb-6 uppercase tracking-[1px]">
              {cat.title}
            </h3>
            <ul className="flex flex-col gap-3">
              {cat.items.map((item, j) => (
                <li key={j} className="font-barlow text-[16px] text-[var(--text)]">{item}</li>
              ))}
              {cat.premiumItems && cat.premiumItems.map((item, j) => (
                <li key={j} className="font-barlow text-[16px] text-[var(--text)]">
                  {item.name} <span className="text-[var(--gold)] text-[13px] ml-1 tracking-normal italic font-normal">★ {item.price} pricing</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <MenuGallery images={[
        '/images/menu/dinner-1.png',
        '/images/menu/stations-2.png',
        '/images/menu/first-course-1.png'
      ]} />
    </MenuLayout>
  )
}


import MenuLayout from '@/components/layout/MenuLayout'

export default function FirstCourseMenu() {
  return (
    <MenuLayout title="First Course" heroImage="/images/menu-header.png">
      <div className="mb-8 p-4 bg-[var(--surface-warm)] border border-[var(--border)] rounded">
        <p className="font-barlow text-[15px] italic text-[var(--text-brown)] text-center">
          First course is served with assorted fresh artisan breads, herbed butter, hummus, and olive oil.
        </p>
      </div>
      <div className="flex flex-col gap-6">
        {[
          { name: "Chop Salad", desc: "heirloom tomato, cucumber, field greens, red onion, balsamic glaze, toasted baguette" },
          { name: "Israeli Cous Cous", desc: "toasted pine nuts, black olives, sun-dried tomato, pesto, baby arugula, grazini" },
          { name: "Tomato Panzanella", desc: "grilled baguette, red & yellow beefsteak tomatoes, olive tapenade, micro greens, fresh mozzarella, broken balsamic vinaigrette, baby arugula" },
          { name: "Red Wine Poached Pear", desc: "mandarin oranges, baby frisee, candied pecans, balsamic reduction, dried cranberries, honey raspberry vinaigrette, blue cheese" },
          { name: "Roasted Carrot & Avocado", desc: "baby greens, roasted pumpkin seeds, citrus vinaigrette, grazini" },
          { name: "Asian Toasted Sesame", desc: "tossed baby greens, toasted sesame dressing, wasabi peas, sesame crisps, shredded carrot, toasted peanut" },
          { name: "Roasted Beet Salad", desc: "gold & red beets, red onion, mandarin orange vinaigrette, ricotta cheese, baby arugula" },
          { name: "Rustic Italian", desc: "radicchio, endive, frisee, roasted asparagus, olive oil, toasted pine nuts, fried onion crisps, shaved romano" },
          { name: "Caprese", desc: "fresh mozzarella, tomato, aged balsamic, basil, olive oil" },
          { name: "Grilled Fennel & Apricot", desc: "fennel, dried apricot, arugula, feta, toasted pine nuts, toasted kalamata baguette, citrus vinaigrette" },
          { name: "Greek", desc: "baby spinach, kalamata olives, sliced tomato, feta cheese, red onion, cucumber, toasted chick peas, toasted baguette" },
        ].map((item, i) => (
          <div key={i} className="menu-item border-b border-[var(--border)] pb-6">
            <h4 className="font-oswald font-semibold text-[18px] text-[var(--gold-dark)] uppercase">{item.name}</h4>
            <p className="font-barlow text-[14px] text-[var(--text-muted)] italic mt-1">{item.desc}</p>
          </div>
        ))}
      </div>
    </MenuLayout>
  )
}

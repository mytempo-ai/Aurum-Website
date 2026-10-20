/**
 * Single source of truth for business facts shown on the page and repeated
 * in structured data / llms.txt. Anything published in JSON-LD must also be
 * visible on the page, so keep these values in sync with the UI that uses them.
 */

export const SITE_URL = 'https://aurum.events'
export const BRAND = 'Aurum Events & Catering'

export const CONTACT = {
  phone: '+17322940031',
  phoneDisplay: '(732) 294-0031',
  phoneHref: 'tel:+17322940031',
  email: 'info@aurum.events',
  address: {
    streetAddress: '17 South Street',
    addressLocality: 'Freehold',
    addressRegion: 'NJ',
    postalCode: '07728',
    addressCountry: 'US',
  },
  addressDisplay: '17 South Street, Freehold, NJ 07728',
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=Aurum+Events+%26+Catering+17+South+Street+Freehold+NJ+07728',
  geo: { latitude: 40.2643, longitude: -74.2738 },
  instagram: 'https://www.instagram.com/Aurum_events/',
  facebook: 'https://www.facebook.com/Aurum-Events-and-Catering-269053676619639/',
}

/** Office hours — shown on /book-a-tour and published in the LocalBusiness schema. */
export const OPENING_HOURS = [
  { label: 'Monday – Friday', days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '10:00', closes: '18:00', display: '10:00 AM – 6:00 PM' },
  { label: 'Saturday – Sunday', days: ['Saturday', 'Sunday'], opens: '10:00', closes: '17:00', display: '10:00 AM – 5:00 PM' },
]

/** Per-person pricing range for event packages with in-house catering. */
export const PRICING = {
  min: 65,
  max: 120,
  currency: 'USD',
  display: '$65–$120 per person',
  short: '$65–$120',
  summary:
    'Event packages with in-house catering range from $65 to $120 per person, depending on your menu selections, action stations and enhancements.',
}

export const FAQ_ITEMS = [
  {
    q: 'Where is Aurum Events located?',
    a: 'We are located at 17 South Street, Freehold, NJ 07728 — in the heart of Freehold, Monmouth County, easily accessible from Route 9, Route 33, and the Garden State Parkway.',
  },
  {
    q: 'How much does an event at Aurum cost?',
    a: `${PRICING.summary} Market-priced items such as dry-aged steaks and Chilean sea bass are quoted separately. Call (732) 294-0031 or book a tour for a detailed quote.`,
  },
  {
    q: 'What types of events does Aurum Events host?',
    a: 'We specialize in weddings, sweet sixteens, bar and bat mitzvahs, quinceañeras, corporate events, holiday parties, birthday milestones, and any special celebration. Our team handles every detail from start to finish.',
  },
  {
    q: 'Does Aurum provide in-house catering?',
    a: "Yes — our full-service in-house culinary team offers cocktail hour, action stations, plated dinners, children's menus, and stunning dessert displays. No outside caterers needed.",
  },
  {
    q: 'Which areas near Freehold NJ does Aurum serve?',
    a: 'We serve all of Monmouth County, Ocean County, and Middlesex County — including Manalapan, Marlboro, Howell, Jackson, Holmdel, Red Bank, Colts Neck, Eatontown, Rumson, Long Branch, and Asbury Park.',
  },
  {
    q: 'How do I book a tour or get a quote?',
    a: 'Visit our Book a Tour page to submit your request, call us at (732) 294-0031, email info@aurum.events, or simply talk to our AI chatbot right here on the website! Our dedicated events team will schedule a personalized walkthrough and discuss your vision.',
  },
  {
    q: 'Is Aurum Events a full-service venue?',
    a: 'Absolutely. From the venue itself to in-house catering, event coordination, and premium enhancements, Aurum is a one-stop luxury event destination in Central New Jersey.',
  },
  {
    q: 'What is the capacity at Aurum Events?',
    a: 'Our flexible ballroom accommodates events of various sizes — from intimate celebrations to large galas. Contact us at (732) 294-0031 for specific capacity details based on your preferred layout.',
  },
]

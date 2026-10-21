// Server Component — homepage JSON-LD only.
// Other pages render their own breadcrumbs / page-specific schema and point at
// the business entity below by its @id (see BUSINESS_REF in ./JsonLd).
// Every value here must also be visible on the homepage.

import JsonLd from './JsonLd'
import { BRAND, CONTACT, FAQ_ITEMS, OPENING_HOURS, PRICING, SITE_URL } from '@/lib/site'

const towns = ['Freehold', 'Manalapan', 'Marlboro', 'Howell', 'Jackson', 'Holmdel', 'Rumson', 'Red Bank', 'Eatontown', 'Colts Neck']
const counties = ['Monmouth County', 'Ocean County', 'Middlesex County']

/** LocalBusiness + EventVenue schema */
const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'EventVenue', 'FoodEstablishment'],
    '@id': `${SITE_URL}/#business`,
    name: BRAND,
    url: SITE_URL,
    logo: `${SITE_URL}/images/icon-512.png`,
    image: `${SITE_URL}/images/slide1.jpg`,
    telephone: CONTACT.phone,
    email: CONTACT.email,
    description:
        'Aurum Events & Catering is a premier event venue in Freehold, NJ, serving Monmouth County and Central New Jersey. We specialize in weddings, sweet sixteens, bar and bat mitzvahs, corporate events, and milestone celebrations with in-house catering and luxury enhancements.',
    address: { '@type': 'PostalAddress', ...CONTACT.address },
    geo: { '@type': 'GeoCoordinates', ...CONTACT.geo },
    hasMap: CONTACT.mapUrl,
    openingHoursSpecification: OPENING_HOURS.map((h) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: h.days,
        opens: h.opens,
        closes: h.closes,
    })),
    areaServed: [
        ...towns.map((name) => ({ '@type': 'City', name, containedInPlace: { '@type': 'State', name: 'New Jersey' } })),
        ...counties.map((name) => ({ '@type': 'AdministrativeArea', name, containedInPlace: { '@type': 'State', name: 'New Jersey' } })),
    ],
    servesCuisine: ['American', 'Mediterranean', 'Continental', 'International'],
    priceRange: PRICING.display,
    sameAs: [CONTACT.instagram, CONTACT.facebook],
    makesOffer: {
        '@type': 'Offer',
        name: 'Event packages with in-house catering',
        priceSpecification: {
            '@type': 'UnitPriceSpecification',
            minPrice: PRICING.min,
            maxPrice: PRICING.max,
            priceCurrency: PRICING.currency,
            unitText: 'per person',
        },
    },
}

/** WebSite schema — tells Google the site name */
const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: BRAND,
    url: SITE_URL,
    publisher: { '@id': `${SITE_URL}/#business` },
}

/** FAQPage — mirrors the FAQ accordion rendered on the homepage */
const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
}

export default function StructuredData() {
    return <JsonLd data={[localBusinessSchema, websiteSchema, faqSchema]} />
}

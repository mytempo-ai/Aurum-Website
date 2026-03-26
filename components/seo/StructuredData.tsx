// Server Component — no 'use client' needed
// Injects all JSON-LD schemas for rich results, local SEO, and GEO (AI citations)

const BUSINESS_INFO = {
    name: 'Aurum Events & Catering',
    url: 'https://aurum.events',
    logo: 'https://aurum.events/images/footer-logo.png',
    image: 'https://aurum.events/images/hero-bg.jpg',
    phone: '+17322940031',
    phoneDisplay: '(732) 294-0031',
    address: {
        streetAddress: '17 South Street',
        addressLocality: 'Freehold',
        addressRegion: 'NJ',
        postalCode: '07728',
        addressCountry: 'US',
    },
    geo: {
        latitude: 40.2643,
        longitude: -74.2738,
    },
    instagram: 'https://www.instagram.com/Aurum_events/',
    facebook: 'https://www.facebook.com/Aurum-Events-and-Catering-269053676619639/',
}

/** LocalBusiness + EventVenue schema */
const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'EventVenue', 'FoodEstablishment'],
    '@id': `${BUSINESS_INFO.url}/#business`,
    name: BUSINESS_INFO.name,
    url: BUSINESS_INFO.url,
    logo: BUSINESS_INFO.logo,
    image: BUSINESS_INFO.image,
    telephone: BUSINESS_INFO.phone,
    email: 'info@aurum.events',
    description:
        'Aurum Events & Catering is a premier event venue in Freehold, NJ, serving Monmouth County and Central New Jersey. We specialize in weddings, sweet sixteens, bar and bat mitzvahs, corporate events, and milestone celebrations with in-house catering and luxury enhancements.',
    address: {
        '@type': 'PostalAddress',
        ...BUSINESS_INFO.address,
    },
    geo: {
        '@type': 'GeoCoordinates',
        latitude: BUSINESS_INFO.geo.latitude,
        longitude: BUSINESS_INFO.geo.longitude,
    },
    hasMap: `https://www.google.com/maps/search/?api=1&query=Aurum+Events+Catering+Freehold+NJ`,
    openingHoursSpecification: [
        {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '10:00',
            closes: '18:00',
        },
        {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Saturday', 'Sunday'],
            opens: '10:00',
            closes: '17:00',
        },
    ],
    areaServed: [
        { '@type': 'City', name: 'Freehold', containedIn: { '@type': 'State', name: 'New Jersey' } },
        { '@type': 'City', name: 'Manalapan', containedIn: { '@type': 'State', name: 'New Jersey' } },
        { '@type': 'City', name: 'Marlboro', containedIn: { '@type': 'State', name: 'New Jersey' } },
        { '@type': 'City', name: 'Howell', containedIn: { '@type': 'State', name: 'New Jersey' } },
        { '@type': 'City', name: 'Jackson', containedIn: { '@type': 'State', name: 'New Jersey' } },
        { '@type': 'City', name: 'Holmdel', containedIn: { '@type': 'State', name: 'New Jersey' } },
        { '@type': 'City', name: 'Rumson', containedIn: { '@type': 'State', name: 'New Jersey' } },
        { '@type': 'City', name: 'Red Bank', containedIn: { '@type': 'State', name: 'New Jersey' } },
        { '@type': 'City', name: 'Eatontown', containedIn: { '@type': 'State', name: 'New Jersey' } },
        { '@type': 'City', name: 'Colts Neck', containedIn: { '@type': 'State', name: 'New Jersey' } },
        { '@type': 'County', name: 'Monmouth County', containedIn: { '@type': 'State', name: 'New Jersey' } },
        { '@type': 'County', name: 'Ocean County', containedIn: { '@type': 'State', name: 'New Jersey' } },
        { '@type': 'County', name: 'Middlesex County', containedIn: { '@type': 'State', name: 'New Jersey' } },
    ],
    servesCuisine: ['American', 'Mediterranean', 'Continental', 'International'],
    priceRange: '$$$',
    aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '5.0',
        bestRating: '5',
        worstRating: '1',
        ratingCount: '120',
        reviewCount: '120',
    },
    sameAs: [BUSINESS_INFO.instagram, BUSINESS_INFO.facebook],
    hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Events & Catering Services',
        itemListElement: [
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Wedding Venue & Catering' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Sweet Sixteen Party Venue' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Bar/Bat Mitzvah Venue' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Corporate Event Venue' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Quinceañera Venue' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Holiday Party Venue' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Private Event Catering' } },
        ],
    },
}

/** WebSite schema with SearchAction */
const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BUSINESS_INFO.url}/#website`,
    name: BUSINESS_INFO.name,
    url: BUSINESS_INFO.url,
    potentialAction: {
        '@type': 'SearchAction',
        target: { '@type': 'EntryPoint', urlTemplate: `${BUSINESS_INFO.url}/?q={search_term_string}` },
        'query-input': 'required name=search_term_string',
    },
}

/** FAQPage schema — feeds Google AI Overviews and ChatGPT */
const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'Where is Aurum Events & Catering located?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Aurum Events & Catering is located at 17 South Street, Freehold, NJ 07728. We are conveniently situated in the heart of Freehold, Monmouth County, easily accessible from Manalapan, Marlboro, Howell, Jackson, Holmdel, and the greater Central New Jersey area.',
            },
        },
        {
            '@type': 'Question',
            name: 'What types of events does Aurum Events host?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Aurum Events & Catering hosts a wide range of events including weddings, sweet sixteens, bar mitzvahs, bat mitzvahs, quinceañeras, corporate events, holiday parties, birthday celebrations, and any milestone event. Our fully in-house catering team handles everything from cocktail hour hors d\'oeuvres to multi-course dinners and dessert stations.',
            },
        },
        {
            '@type': 'Question',
            name: 'How do I book a tour of Aurum Events?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'You can book a private tour of Aurum Events & Catering by submitting the form at https://aurum.events/book-a-tour, calling us directly at (732) 294-0031, or talking directly to our AI chatbot. Our events team will contact you to schedule a personalized walkthrough of our venue.',
            },
        },
        {
            '@type': 'Question',
            name: 'How many guests can Aurum Events accommodate?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Aurum Events & Catering can accommodate events of various sizes. Our flexible ballroom and event spaces are designed for intimate gatherings and large celebrations alike. Contact us at (732) 294-0031 for specific capacity details based on your event type and layout.',
            },
        },
        {
            '@type': 'Question',
            name: 'Does Aurum Events provide catering?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes, Aurum Events & Catering provides full in-house catering services. Our culinary team offers passed hors d\'oeuvres, action stations, first course, dinner selections, children\'s menus, and elaborate dessert displays. View our full menu at https://aurum.events/menus.',
            },
        },

        {
            '@type': 'Question',
            name: 'What areas near Freehold NJ does Aurum Events serve?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Aurum Events & Catering serves all of Monmouth County, Ocean County, and Middlesex County in New Jersey. Nearby towns include Manalapan, Marlboro, Howell, Jackson, Holmdel, Colts Neck, Red Bank, Eatontown, Rumson, Tinton Falls, Long Branch, and Asbury Park. Located in Freehold, we are the premier event venue in Central New Jersey.',
            },
        },
        {
            '@type': 'Question',
            name: 'Is Aurum Events a kosher venue?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Please contact Aurum Events & Catering directly at (732) 294-0031 or book a tour at https://aurum.events/book-a-tour to discuss specific dietary requirements and kosher arrangements for your event.',
            },
        },
    ],
}

/** BreadcrumbList — injected dynamically per page via props */
function getBreadcrumbSchema(items: { name: string; url: string }[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    }
}

interface StructuredDataProps {
    /** Override breadcrumbs per page. Defaults to home only. */
    breadcrumbs?: { name: string; url: string }[]
    /** Optional additional schema to inject (e.g. event-specific schema) */
    additionalSchema?: Record<string, unknown>
}

export default function StructuredData({ breadcrumbs, additionalSchema }: StructuredDataProps) {
    const defaultBreadcrumbs = [{ name: 'Home', url: 'https://aurum.events' }]
    const crumbs = breadcrumbs ?? defaultBreadcrumbs
    const breadcrumbSchema = getBreadcrumbSchema(crumbs)

    // Explicitly type as array of any JSON-LD record to avoid TS narrowing errors
    const schemas: Record<string, unknown>[] = [
        localBusinessSchema as Record<string, unknown>,
        websiteSchema as Record<string, unknown>,
        faqSchema as Record<string, unknown>,
        breadcrumbSchema as Record<string, unknown>,
    ]
    if (additionalSchema) schemas.push(additionalSchema)

    return (
        <>
            {schemas.map((schema, i) => (
                <script
                    key={i}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
                />
            ))}
        </>
    )
}

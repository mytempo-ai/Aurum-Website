import { SITE_URL } from '@/lib/site'

type Schema = Record<string, unknown>

/** Renders one or more JSON-LD blocks. Safe to use from server or client components. */
export default function JsonLd({ data }: { data: Schema | Schema[] }) {
  const items = Array.isArray(data) ? data : [data]
  return (
    <>
      {items.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          // Escape "<" so content strings can never close the script tag
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}
        />
      ))}
    </>
  )
}

export type Crumb = { name: string; path: string }

/** BreadcrumbList for a page. Pass the trail after Home, e.g. [{ name: 'Events', path: '/events' }]. */
export function breadcrumbSchema(trail: Crumb[]): Schema {
  const crumbs = [{ name: 'Home', path: '' }, ...trail]
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: `${SITE_URL}${c.path}`,
    })),
  }
}

/** Reference to the business entity that is fully described on the homepage. */
export const BUSINESS_REF = { '@id': `${SITE_URL}/#business` }

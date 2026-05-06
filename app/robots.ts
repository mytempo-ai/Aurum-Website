import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/data/', '/_next/static/chunks/'],
      },
    ],
    sitemap: 'https://aurum.events/sitemap.xml',
  }
}

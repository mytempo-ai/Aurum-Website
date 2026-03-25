import type { MetadataRoute } from 'next'

const BASE_URL = 'https://aurum.events'
const NOW = new Date('2026-03-25')

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: BASE_URL,
            lastModified: NOW,
            changeFrequency: 'monthly',
            priority: 1.0,
        },
        {
            url: `${BASE_URL}/book-a-tour`,
            lastModified: NOW,
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/menus`,
            lastModified: NOW,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/menus/hors-doeuvres`,
            lastModified: NOW,
            changeFrequency: 'monthly',
            priority: 0.6,
        },
        {
            url: `${BASE_URL}/menus/stations`,
            lastModified: NOW,
            changeFrequency: 'monthly',
            priority: 0.6,
        },
        {
            url: `${BASE_URL}/menus/first-course`,
            lastModified: NOW,
            changeFrequency: 'monthly',
            priority: 0.6,
        },
        {
            url: `${BASE_URL}/menus/dinner`,
            lastModified: NOW,
            changeFrequency: 'monthly',
            priority: 0.6,
        },
        {
            url: `${BASE_URL}/menus/childrens-menu`,
            lastModified: NOW,
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${BASE_URL}/menus/desserts`,
            lastModified: NOW,
            changeFrequency: 'monthly',
            priority: 0.6,
        },
        {
            url: `${BASE_URL}/enhancements`,
            lastModified: NOW,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        // Event detail pages
        {
            url: `${BASE_URL}/events/weddings`,
            lastModified: NOW,
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/events/sweet-sixteen`,
            lastModified: NOW,
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/events/bar-bat-mitzvah`,
            lastModified: NOW,
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/events/corporate-events`,
            lastModified: NOW,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/events/quinceanera`,
            lastModified: NOW,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
    ]
}

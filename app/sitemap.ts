import type { MetadataRoute } from 'next'
import { EVENTS } from '@/lib/eventData'
import { MENU_PAGES } from '@/lib/menuData'
import { getAllPosts, slugToUrl } from '@/lib/contentful'
import { SITE_URL } from '@/lib/site'

// Rebuilt hourly so new or edited blog posts appear with their real dates
export const revalidate = 3600

type Entry = MetadataRoute.Sitemap[number]

// Static pages carry no lastmod: a date stamped at build time on every URL
// teaches search engines to ignore the field. Blog posts use Contentful's
// updatedAt, which is accurate.
const page = (path: string, priority: number, changeFrequency: Entry['changeFrequency'] = 'monthly'): Entry => ({
    url: `${SITE_URL}${path}`,
    changeFrequency,
    priority,
})

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const posts = await getAllPosts()
    const postEntries: MetadataRoute.Sitemap = posts.map(({ post }) => ({
        url: `${SITE_URL}/blog/${slugToUrl(post.fields.slug)}`,
        lastModified: new Date(post.sys.updatedAt),
        changeFrequency: 'monthly',
        priority: 0.6,
    }))
    const newestPost = posts.reduce<Date | undefined>((latest, { post }) => {
        const d = new Date(post.sys.updatedAt)
        return !latest || d > latest ? d : latest
    }, undefined)

    return [
        page('', 1.0),
        page('/book-a-tour', 0.9),
        page('/events', 0.9),
        ...EVENTS.map((e) => page(`/events/${e.slug}`, 0.8)),
        page('/menus', 0.8),
        ...MENU_PAGES.map((m) => page(`/menus/${m.slug}`, 0.6)),
        page('/enhancements', 0.7),
        { ...page('/blog', 0.7, 'weekly'), ...(newestPost ? { lastModified: newestPost } : {}) },
        ...postEntries,
    ]
}

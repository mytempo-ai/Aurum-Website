/**
 * Contentful CDN API helpers for Aurum Blog
 *
 * Environment variables required in .env.local:
 *   CONTENTFUL_SPACE_ID=your_space_id
 *   CONTENTFUL_ACCESS_TOKEN=your_delivery_api_token
 *
 * Content type: blogPost
 * Fields: title, longText (HTML), slug, featuredimage (Media)
 */

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID ?? 'aev88ri4pikz'
const ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN ?? 'FhXFrolSAtlOhcTUelYJCIhO5VlY8OhwkE_3BK_WfUQ'
const BASE_URL = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master`

// ─── Types ────────────────────────────────────────────────────────────────────

export interface BlogPostFields {
  title: string
  longText: string        // Raw HTML content from Contentful
  slug: string
  feautredimage: {        // Note: field API id has typo in Contentful ('feautred' not 'featured')
    sys: { id: string }
  }
}

export interface BlogPost {
  sys: { id: string; createdAt: string; updatedAt: string }
  fields: BlogPostFields
}

export interface ContentfulAsset {
  sys: { id: string }
  fields: {
    title: string
    description?: string
    file: {
      url: string
      contentType: string
      details: { size: number; image?: { width: number; height: number } }
    }
  }
}

export interface ContentfulResponse {
  items: BlogPost[]
  includes?: {
    Asset?: ContentfulAsset[]
  }
  total: number
  skip: number
  limit: number
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function resolveAssetUrl(includes: ContentfulAsset[] | undefined, assetId: string): string {
  if (!includes) return ''
  const asset = includes.find((a) => a.sys.id === assetId)
  if (!asset) return ''
  const url = asset.fields.file.url
  // Contentful returns protocol-relative URLs (//images.ctfassets.net/...)
  return url.startsWith('//') ? `https:${url}` : url
}

function resolveAssetDimensions(
  includes: ContentfulAsset[] | undefined,
  assetId: string
): { width: number; height: number } {
  if (!includes) return { width: 1200, height: 630 }
  const asset = includes.find((a) => a.sys.id === assetId)
  const img = asset?.fields?.file?.details?.image
  return img ? { width: img.width, height: img.height } : { width: 1200, height: 630 }
}

function decodeEntities(text: string): string {
  return text
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&nbsp;/gi, ' ')
    .replace(/&apos;/gi, "'")
    .replace(/&#(\d+);/gi, (_, code) => String.fromCharCode(Number(code)))
}

function toPlainText(html: string): string {
  return decodeEntities(html.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim()
}

/** Shorten text to `max` chars, preferring a sentence end, then a word boundary */
function truncate(text: string, max: number): string {
  if (text.length <= max) return text
  const head = text.slice(0, max)
  const sentenceEnd = Math.max(head.lastIndexOf('. '), head.lastIndexOf('! '), head.lastIndexOf('? '))
  if (sentenceEnd >= max * 0.5) return head.slice(0, sentenceEnd + 1)
  const wordEnd = head.slice(0, max - 1).lastIndexOf(' ')
  return head.slice(0, wordEnd > 0 ? wordEnd : max - 1).replace(/[\s,;:—–-]+$/, '') + '…'
}

/** Strip HTML tags and decode entities */
export function stripHtml(html: string, maxLength = 140): string {
  return truncate(toPlainText(html), maxLength)
}

const isByline = (text: string) => /^by\s+aurum\b/i.test(text) || /^(written\s+)?by\s+\S+.*·/i.test(text)

/**
 * Summary for meta descriptions and blog cards: the article's first real
 * paragraph, skipping the repeated title and the "By Aurum Events · date" byline.
 */
export function postDescription(html: string, title: string, max = 155): string {
  const normalizedTitle = title.trim().toLowerCase()
  const paragraphs = Array.from(html.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi))
    .map((m) => toPlainText(m[1]))
    .filter((t) => t.length >= 60 && !isByline(t) && t.toLowerCase() !== normalizedTitle)

  if (paragraphs.length) return truncate(paragraphs[0], max)

  // No usable <p>: fall back to the plain text with the title and byline removed
  let text = toPlainText(html.replace(/<h1\b[^>]*>[\s\S]*?<\/h1>/gi, ' '))
  if (text.toLowerCase().startsWith(normalizedTitle)) text = text.slice(title.trim().length).trim()
  text = text.replace(/^by\s+aurum[^·]*(·[^·]*){0,2}?\b(19|20)\d{2}\b/i, '').trim()
  return text ? truncate(text, max) : `${title} — event planning guide from Aurum Events & Catering in Freehold, NJ.`
}

/**
 * Normalise CMS article HTML before rendering:
 * - the page already renders the post title as its only <h1>, so an <h1> that
 *   repeats the title is dropped and any other <h1> becomes an <h2>
 * - internal links lose their trailing slash (/menus/ → /menus) to skip a 308 hop
 */
export function prepareArticleHtml(html: string, title: string): string {
  const normalizedTitle = title.trim().toLowerCase()
  return html
    .replace(/<h1\b([^>]*)>([\s\S]*?)<\/h1>/gi, (_, attrs: string, inner: string) =>
      toPlainText(inner).toLowerCase() === normalizedTitle ? '' : `<h2${attrs}>${inner}</h2>`
    )
    .replace(
      /href=(["'])(?:https?:\/\/(?:www\.)?aurum\.events)?(\/[^"'#?\s]+?)\/+(?=[#?"'])/gi,
      (_, quote: string, path: string) => `href=${quote}https://aurum.events${path}`
    )
}

/** Contentful Images API URL — resized and served as WebP */
export function contentfulImage(url: string, width: number, quality = 75): string {
  if (!url || !url.includes('ctfassets.net')) return url
  const sep = url.includes('?') ? '&' : '?'
  return `${url}${sep}w=${width}&fm=webp&q=${quality}`
}

/** Convert a Contentful slug (may have spaces) to a clean URL slug with hyphens */
export function slugToUrl(slug: string): string {
  return slug.trim().toLowerCase().replace(/\s+/g, '-')
}

/** Convert a URL slug (hyphens) back to Contentful slug (spaces) for API lookup */
export function slugToContentful(urlSlug: string): string {
  return urlSlug.trim().replace(/-/g, ' ')
}

/** Format ISO date → "April 16, 2026" */
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// ─── API Calls ────────────────────────────────────────────────────────────────

/**
 * Fetch all blog posts (sorted newest first).
 * Used on /blog listing page.
 */
export async function getAllPosts(): Promise<
  { post: BlogPost; imageUrl: string; imageDimensions: { width: number; height: number } }[]
> {

  const url = `${BASE_URL}/entries?access_token=${ACCESS_TOKEN}&content_type=aurumBlogs&include=2&order=-sys.createdAt&limit=200`

  try {
    const res = await fetch(url, { next: { revalidate: 60 } }) // ISR: revalidate every 60s
    if (!res.ok) {
      console.error('[Contentful] Failed to fetch posts:', res.status, res.statusText)
      return []
    }

    const data: ContentfulResponse = await res.json()
    const assets = data.includes?.Asset

    return data.items.map((post) => {
      const assetId = post.fields.feautredimage?.sys?.id ?? ''
      return {
        post,
        imageUrl: resolveAssetUrl(assets, assetId),
        imageDimensions: resolveAssetDimensions(assets, assetId),
      }
    })
  } catch (err) {
    console.error('[Contentful] Error fetching posts:', err)
    return []
  }
}

/**
 * Fetch a single blog post by slug.
 * The URL slug uses hyphens (e.g. 'wedding-venues-in-freehold-nj')
 * but Contentful stores the slug with spaces ('wedding venues in freehold nj').
 * We try both the URL slug as-is AND the space-converted version.
 */
export async function getPostBySlug(urlSlug: string): Promise<{
  post: BlogPost
  imageUrl: string
  imageDimensions: { width: number; height: number }
} | null> {

  // Convert URL-safe slug back to the Contentful slug (spaces)
  const contentfulSlug = slugToContentful(urlSlug)

  // Try space-version first (matches Contentful), then original as fallback
  const slugsToTry = [contentfulSlug, urlSlug]

  for (const trySlug of slugsToTry) {
    const url = `${BASE_URL}/entries?access_token=${ACCESS_TOKEN}&content_type=aurumBlogs&fields.slug=${encodeURIComponent(trySlug)}&include=2&limit=1`

    try {
      const res = await fetch(url, { next: { revalidate: 60 } })
      if (!res.ok) continue

      const data: ContentfulResponse = await res.json()
      if (!data.items || data.items.length === 0) continue

      const post = data.items[0]
      const assets = data.includes?.Asset
      const assetId = post.fields.feautredimage?.sys?.id ?? ''

      return {
        post,
        imageUrl: resolveAssetUrl(assets, assetId),
        imageDimensions: resolveAssetDimensions(assets, assetId),
      }
    } catch (err) {
      console.error('[Contentful] Error fetching post by slug:', err)
    }
  }

  return null
}

/**
 * Fetch all slugs — used for generateStaticParams.
 * Returns URL-safe slugs (spaces converted to hyphens).
 */
export async function getAllSlugs(): Promise<string[]> {
  const url = `${BASE_URL}/entries?access_token=${ACCESS_TOKEN}&content_type=aurumBlogs&select=fields.slug&limit=200`

  try {
    const res = await fetch(url, { next: { revalidate: 3600 } })
    if (!res.ok) return []
    const data: ContentfulResponse = await res.json()
    return data.items
      .map((item) => slugToUrl(item.fields.slug))
      .filter(Boolean)
  } catch {
    return []
  }
}

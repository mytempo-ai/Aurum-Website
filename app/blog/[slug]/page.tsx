import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPostBySlug, getAllSlugs, postDescription, prepareArticleHtml, formatDate, contentfulImage } from '@/lib/contentful'
import { EVENTS } from '@/lib/eventData'
import JsonLd, { breadcrumbSchema, BUSINESS_REF } from '@/components/seo/JsonLd'
import { BRAND, PRICING, SITE_URL } from '@/lib/site'

/** Event pages whose topics appear in the article slug (falls back to the events hub only) */
function relatedEvents(slug: string) {
  return EVENTS.filter((e) => e.blogTopics.some((t) => slug.includes(t))).slice(0, 3)
}

// ─── Static generation ────────────────────────────────────────────────────────

export async function generateStaticParams() {
  const slugs = await getAllSlugs()
  return slugs.map((slug) => ({ slug }))
}

// ─── Per-page metadata ────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const { slug } = params
  const data = await getPostBySlug(slug)

  if (!data) return { title: 'Post Not Found' }

  const { post, imageUrl } = data
  const { title, longText } = post.fields
  const description = postDescription(longText, title)
  const ogImage = imageUrl ? contentfulImage(imageUrl, 1200, 80) : '/images/slide1.jpg'

  return {
    // Brand is appended once by the root layout's title template — unless the
    // CMS title is already long enough that the suffix would be cut off in results
    title: `${title} | Aurum Events`.length > 60 ? { absolute: title } : title,
    description,
    alternates: { canonical: `https://aurum.events/blog/${slug}` },
    openGraph: {
      title: `${title} | Aurum Events`,
      description,
      url: `https://aurum.events/blog/${slug}`,
      type: 'article',
      publishedTime: post.sys.createdAt,
      modifiedTime: post.sys.updatedAt,
      images: [{ url: ogImage, alt: title }],
    },
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function BlogArticlePage({
  params,
}: {
  params: { slug: string }
}) {
  const { slug } = params
  const data = await getPostBySlug(slug)

  if (!data) notFound()
  // TypeScript guard: notFound() throws, so data is non-null beyond this point
  const { post, imageUrl } = data!
  const { title, longText } = post.fields
  const dateStr = formatDate(post.sys.createdAt)
  const articleHtml = prepareArticleHtml(longText, title)
  const related = relatedEvents(slug)
  const url = `${SITE_URL}/blog/${slug}`

  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: postDescription(longText, title),
    datePublished: post.sys.createdAt,
    dateModified: post.sys.updatedAt,
    mainEntityOfPage: url,
    url,
    image: imageUrl ? [contentfulImage(imageUrl, 1200, 80)] : [`${SITE_URL}/images/slide1.jpg`],
    author: { '@type': 'Organization', name: BRAND, url: SITE_URL },
    publisher: { ...BUSINESS_REF, '@type': 'Organization', name: BRAND, logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/icon-512.png` } },
  }

  // Reading time estimate: ~200 words per minute
  const wordCount = articleHtml.replace(/<[^>]+>/g, ' ').trim().split(/\s+/).length
  const readingTime = Math.max(1, Math.ceil(wordCount / 200))

  return (
    <div className="pt-[60px] lg:pt-[72px]" style={{ background: 'var(--surface-warm)' }}>
      <JsonLd data={[blogPostingSchema, breadcrumbSchema([{ name: 'Blog', path: '/blog' }, { name: title, path: `/blog/${slug}` }])]} />

      {/* ── Breadcrumb ──────────────────────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 pb-0">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2">
          <Link
            href="/blog"
            className="font-barlow text-[11px] uppercase tracking-[3px] text-[var(--gold-text)] hover:text-[var(--gold-dark)] transition-colors duration-200 flex items-center gap-1.5"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Blog
          </Link>
          <span className="text-[var(--border-strong)] text-xs">/</span>
          <span className="font-barlow text-[11px] uppercase tracking-[3px] text-[var(--text-muted)] truncate max-w-[220px]">
            {title}
          </span>
        </nav>
      </div>

      {/* ── Article Header ──────────────────────────────────────────────────── */}
      <header className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 pb-8 text-center">
        {/* Eyebrow label */}
        <span className="section-label-el mb-5">Aurum Events &amp; Catering</span>

        {/* H1 title — tight tracking on mobile */}
        <h1
          className="font-oswald font-bold uppercase text-[var(--text-brown)] text-[clamp(24px,5vw,56px)] leading-[1.08] tracking-[1px] sm:tracking-[2px] mb-6 px-2"
        >
          {title}
        </h1>

        {/* Meta chips — date + reading time */}
        <div className="flex flex-col items-center gap-3">
          <div className="gold-line" />
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <time
              dateTime={post.sys.createdAt}
              className="inline-flex items-center gap-1.5 font-barlow text-[11px] uppercase tracking-[3px] text-[var(--text-light)]"
            >
              <svg className="w-3 h-3 opacity-50" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {dateStr}
            </time>
            <span className="w-px h-3 bg-[var(--border-strong)] opacity-60" />
            <span className="inline-flex items-center gap-1.5 font-barlow text-[11px] uppercase tracking-[3px] text-[var(--gold-text)]">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {readingTime} min read
            </span>
          </div>
        </div>
      </header>

      {/* ── Featured Image ── */}
      {imageUrl && (
        <div className="max-w-4xl mx-auto px-3 sm:px-6 pb-8 sm:pb-12">
          <div
            className="overflow-hidden rounded"
            style={{
              boxShadow:
                '0 4px 6px rgba(200,147,58,0.08), 0 20px 60px rgba(0,0,0,0.12), 0 0 0 1px rgba(200,147,58,0.18)',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={contentfulImage(imageUrl, 1200)}
              srcSet={`${contentfulImage(imageUrl, 640)} 640w, ${contentfulImage(imageUrl, 960)} 960w, ${contentfulImage(imageUrl, 1200)} 1200w, ${contentfulImage(imageUrl, 1800)} 1800w`}
              sizes="(min-width: 896px) 848px, 100vw"
              alt={title}
              width={data!.imageDimensions.width}
              height={data!.imageDimensions.height}
              fetchPriority="high"
              style={{
                display: 'block',
                width: '100%',
                height: 'auto',
                maxHeight: 'min(560px, 58vw)',
                objectFit: 'cover',
                objectPosition: 'center',
              }}
            />
            <div
              style={{
                height: '3px',
                background:
                  'linear-gradient(90deg, transparent, #C8933A 25%, #E8B86D 50%, #C8933A 75%, transparent)',
              }}
            />
          </div>
        </div>
      )}

      {/* ── Thin gold separator into article body ───────────────────────────── */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-4 mb-10">
          <div className="flex-1 h-px bg-[var(--border)]" />
          <div className="flex items-center gap-2 font-barlow text-[10px] uppercase tracking-[4px] text-[var(--text-light)]">
            <svg className="w-3 h-3 text-[var(--gold)]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {dateStr}
          </div>
          <div className="flex-1 h-px bg-[var(--border)]" />
        </div>
      </div>

      {/* ── Article Content ─────────────────────────────────────────────────── */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-20">
        <article
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: articleHtml }}
        />

        {/* End ornament */}
        <div className="mt-16 mb-12 flex items-center gap-4">
          <div className="flex-1 h-px bg-[var(--border)]" />
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rotate-45 inline-block" style={{ background: 'var(--gold)', opacity: 0.5 }} />
            <span className="w-2 h-2 rotate-45 inline-block" style={{ background: 'var(--gold)' }} />
            <span className="w-1.5 h-1.5 rotate-45 inline-block" style={{ background: 'var(--gold)', opacity: 0.5 }} />
          </div>
          <div className="flex-1 h-px bg-[var(--border)]" />
        </div>

        {/* Plan your event — links the article to the matching event pages */}
        <aside className="mb-12 bg-white border border-[var(--border)] rounded-sm p-6 sm:p-8">
          <h2 className="font-oswald font-semibold text-[18px] uppercase tracking-[1.5px] text-[var(--text-brown)] mb-4">
            Plan Your Event at Aurum
          </h2>
          <ul className="flex flex-col gap-1 font-barlow text-[15px]">
            {related.map((e) => (
              <li key={e.slug}>
                <Link href={`/events/${e.slug}`} className="inline-block py-1 text-[var(--gold-text)] underline underline-offset-4 hover:text-[var(--gold-dark)]">
                  {e.seoTitle}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/events" className="inline-block py-1 text-[var(--gold-text)] underline underline-offset-4 hover:text-[var(--gold-dark)]">
                All events we host in Freehold, NJ
              </Link>
            </li>
            <li>
              <Link href="/menus" className="inline-block py-1 text-[var(--gold-text)] underline underline-offset-4 hover:text-[var(--gold-dark)]">
                Catering menus — packages from {PRICING.display}
              </Link>
            </li>
          </ul>
        </aside>

        {/* Back button */}
        <div className="text-center">
          <Link href="/blog" className="btn-gold-outline inline-flex items-center gap-3">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to All Posts
          </Link>
        </div>
      </div>

      {/* ── CTA strip ───────────────────────────────────────────────────────── */}
      <section className="section-gold py-14 text-center">
        <div className="max-w-xl mx-auto px-6">
          <span className="block font-barlow text-[10px] uppercase tracking-[5px] text-white/60 mb-3">
            Ready to Create Something Unforgettable?
          </span>
          <h2 className="font-oswald font-bold text-white uppercase text-[clamp(22px,4vw,40px)] tracking-[2px] mb-7">
            Book a Tour Today
          </h2>
          <Link href="/book-a-tour" className="btn-gold-filled">
            Reserve Your Date
          </Link>
        </div>
      </section>

    </div>
  )
}

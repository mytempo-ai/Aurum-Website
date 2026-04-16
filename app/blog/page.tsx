import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts, stripHtml, formatDate, slugToUrl } from '@/lib/contentful'

export const metadata: Metadata = {
  title: 'Blog | Aurum Events & Catering — Freehold NJ',
  description:
    'Tips, inspiration, and behind-the-scenes stories from Aurum Events & Catering in Freehold, NJ. Wedding planning, event ideas, catering trends, and more.',
  keywords: [
    'Aurum Events blog',
    'event planning tips NJ',
    'wedding inspiration NJ',
    'catering blog Freehold NJ',
    'event venue blog',
    'Sweet 16 ideas NJ',
    'wedding venue tips New Jersey',
  ],
  alternates: { canonical: 'https://aurum.events/blog' },
  openGraph: {
    title: 'Blog | Aurum Events & Catering — Freehold NJ',
    description: "Tips, inspiration and stories from Aurum Events & Catering — Freehold NJ's premier event venue.",
    url: 'https://aurum.events/blog',
    images: [{ url: '/images/blog-hero-bg.jpg', width: 1200, height: 630, alt: 'Aurum Events Blog' }],
  },
}

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <div className="pt-[60px] lg:pt-[72px]">

      {/* ══════════════════════════════════════════════════════════════════════
          HERO — with generated background image
      ══════════════════════════════════════════════════════════════════════ */}
      <div className="relative h-[360px] md:h-[460px] overflow-hidden">
        {/* Background image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/blog-hero-bg.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: 'center 40%' }}
        />
        {/* Dark gradient overlay — heavier at top, bleeding to near-transparent at bottom */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to bottom, rgba(20,10,2,0.82) 0%, rgba(20,10,2,0.65) 50%, rgba(20,10,2,0.75) 100%)'
        }} />
        {/* Subtle gold diagonal texture */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: 'repeating-linear-gradient(-45deg, #C8933A, #C8933A 1px, transparent 1px, transparent 10px)'
        }} />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          {/* Decorative lines */}
          <div className="flex items-center gap-4 mb-5">
            <div className="w-12 h-px bg-[var(--gold)] opacity-60" />
            <span className="font-barlow text-[10px] uppercase tracking-[6px] text-[var(--gold)]">
              Aurum Events &amp; Catering
            </span>
            <div className="w-12 h-px bg-[var(--gold)] opacity-60" />
          </div>

          {/* Main heading */}
          <h1 className="font-oswald font-bold text-white uppercase tracking-[6px] text-[clamp(48px,8vw,90px)] leading-none mb-5">
            Blog
          </h1>

          {/* Gold underline */}
          <div className="w-16 h-[2px] mb-5" style={{ background: 'linear-gradient(90deg, transparent, #C8933A, transparent)' }} />

          <p className="font-barlow text-[15px] text-white/65 max-w-lg leading-relaxed">
            Stories, inspiration &amp; planning tips from the Aurum team
          </p>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          POSTS SECTION
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="section-warm py-16 md:py-24">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6">

          {/* Section header */}
          <div className="text-center mb-14">
            <span className="section-label-el">Latest Articles</span>
            <h2 className="heading-section mt-1">
              Event &amp; Wedding Inspiration
            </h2>
            <p className="sub-heading mt-4 max-w-xl mx-auto">
              Ideas, guides and highlights from Freehold NJ&apos;s premier event venue
            </p>
          </div>

          {/* ── Empty state ──────────────────────────────────────────────── */}
          {posts.length === 0 && (
            <div className="text-center py-24 border border-dashed border-[var(--border-gold)] rounded">
              <span className="font-oswald text-[var(--gold)] text-5xl block mb-4">✦</span>
              <p className="font-barlow italic text-[var(--text-muted)]">
                No posts yet — check back soon!
              </p>
            </div>
          )}

          {/* ── Posts grid ───────────────────────────────────────────────── */}
          {posts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map(({ post, imageUrl }) => {
                const { title, slug, longText } = post.fields
                const excerpt = stripHtml(longText, 120)
                const dateStr = formatDate(post.sys.createdAt)
                const urlSlug = slugToUrl(slug)

                return (
                  <Link
                    key={post.sys.id}
                    href={`/blog/${urlSlug}`}
                    className="card-premium group block overflow-hidden"
                    aria-label={`Read: ${title}`}
                  >
                    {/* Image */}
                    <div className="relative overflow-hidden bg-[var(--surface-gold)]"
                      style={{ height: '220px' }}
                    >
                      {imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={imageUrl}
                          alt={title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                          style={{ display: 'block' }}
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center"
                          style={{ background: 'linear-gradient(135deg, var(--surface-gold), var(--gold-pale))' }}
                        >
                          <span className="font-oswald text-[var(--gold)] text-3xl uppercase tracking-[8px] opacity-25">
                            Aurum
                          </span>
                        </div>
                      )}
                      {/* Bottom fade */}
                      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/20 to-transparent" />
                      {/* Date badge */}
                      <span className="absolute top-3 left-3 font-barlow text-[9px] uppercase tracking-[2.5px] text-white bg-[var(--gold)] px-2.5 py-1">
                        {dateStr}
                      </span>
                    </div>

                    {/* Card body */}
                    <div className="p-6 border-t-2 border-[var(--gold)]">
                      <h2 className="font-oswald font-bold text-[18px] uppercase text-[var(--text-brown)] tracking-[0.5px] leading-tight mb-3 group-hover:text-[var(--gold)] transition-colors duration-200 line-clamp-2">
                        {title}
                      </h2>

                      <p className="font-barlow text-[13px] text-[var(--text-muted)] leading-relaxed mb-5 line-clamp-3">
                        {excerpt}
                      </p>

                      <span className="inline-flex items-center gap-2 font-barlow font-semibold text-[10.5px] uppercase tracking-[3px] text-[var(--gold-dark)] group-hover:text-[var(--gold)] transition-colors duration-200">
                        Read Article
                        <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

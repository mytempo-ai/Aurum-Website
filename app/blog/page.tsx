import type { Metadata } from 'next'
import { getAllPosts, stripHtml, formatDate, slugToUrl } from '@/lib/contentful'
import BlogGrid from './BlogGrid'

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

  // Pre-process posts for the client component
  const processedPosts = posts.map(({ post, imageUrl }) => ({
    id: post.sys.id,
    title: post.fields.title,
    slug: slugToUrl(post.fields.slug),
    excerpt: stripHtml(post.fields.longText, 120),
    date: formatDate(post.sys.createdAt),
    imageUrl,
  }))

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
        {/* Dark gradient overlay */}
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
          POSTS SECTION — client component handles show more/all
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

          {/* BlogGrid — client component with View All logic */}
          <BlogGrid posts={processedPosts} />
        </div>
      </section>
    </div>
  )
}

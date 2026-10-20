import Link from 'next/link'
import { contentfulImage } from '@/lib/contentful'

interface PostCard {
  id: string
  title: string
  slug: string
  excerpt: string
  date: string
  imageUrl: string
}

// Server component: every article is a plain <a href> in the HTML so crawlers
// can reach the whole archive without running JavaScript.
export default function BlogGrid({ posts }: { posts: PostCard[] }) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-24 border border-dashed border-[var(--border-gold)] rounded">
        <span className="font-oswald text-[var(--gold)] text-5xl block mb-4">✦</span>
        <p className="font-barlow italic text-[var(--text-muted)]">
          No posts yet — check back soon!
        </p>
      </div>
    )
  }

  return (
    <>
      {/* Posts grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post, i) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="card-premium group block overflow-hidden"
          >
            {/* Image */}
            <div
              className="relative overflow-hidden bg-[var(--surface-gold)]"
              style={{ height: '220px' }}
            >
              {post.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={contentfulImage(post.imageUrl, 720)}
                  srcSet={`${contentfulImage(post.imageUrl, 400)} 400w, ${contentfulImage(post.imageUrl, 720)} 720w, ${contentfulImage(post.imageUrl, 1080)} 1080w`}
                  sizes="(min-width: 1024px) 345px, (min-width: 768px) 50vw, 100vw"
                  alt={post.title}
                  width={720}
                  height={440}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading={i < 3 ? 'eager' : 'lazy'}
                  decoding="async"
                  style={{ display: 'block' }}
                />
              ) : (
                <div
                  className="absolute inset-0 flex items-center justify-center"
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
              <span className="absolute top-3 left-3 font-barlow text-[9px] uppercase tracking-[2.5px] text-white bg-[var(--gold-text)] px-2.5 py-1">
                {post.date}
              </span>
            </div>

            {/* Card body */}
            <div className="p-6 border-t-2 border-[var(--gold)]">
              <h2 className="font-oswald font-bold text-[18px] uppercase text-[var(--text-brown)] tracking-[0.5px] leading-tight mb-3 group-hover:text-[var(--gold)] transition-colors duration-200 line-clamp-2">
                {post.title}
              </h2>

              <p className="font-barlow text-[13px] text-[var(--text-muted)] leading-relaxed mb-5 line-clamp-3">
                {post.excerpt}
              </p>

              <span className="inline-flex items-center gap-2 font-barlow font-semibold text-[10.5px] uppercase tracking-[3px] text-[var(--gold-text)] group-hover:text-[var(--gold-dark)] transition-colors duration-200">
                Read Article
                <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </Link>
        ))}
      </div>

    </>
  )
}

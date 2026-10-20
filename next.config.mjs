/** @type {import('next').NextConfig} */
const BUNNY_CDN = 'https://aurumsite.b-cdn.net'

// Bunny pulls /_next/static from the live site (aurum.events), so only production
// builds can use it: a Deploy Preview's new chunk hashes don't exist there yet and
// would 404. Netlify sets CONTEXT ('production', 'deploy-preview', 'branch-deploy').
const useCdn = process.env.NODE_ENV === 'production' && process.env.CONTEXT === 'production'

const nextConfig = {
  // Serve all /_next/static/ JS, CSS, and font chunks from Bunny CDN (production only)
  assetPrefix: useCdn ? BUNNY_CDN : '',

  // Allow next/image to load images hosted on Bunny CDN
  images: {
    // Serve AVIF where supported, WebP otherwise (originals in /public stay as masters)
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'aurumsite.b-cdn.net',
        pathname: '/**',
      },
      {
        // Contentful CDN — for blog featured images
        protocol: 'https',
        hostname: 'images.ctfassets.net',
        pathname: '/**',
      },
    ],
  },

  // Applied by Next.js itself, so they reach SSR/ISR responses as well as static files
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), geolocation=(), payment=(), usb=()' },
          // Restrictive directives only — scripts/styles are left open so the chat
          // widget, maps embed and analytics keep working
          { key: 'Content-Security-Policy', value: "frame-ancestors 'self'; base-uri 'self'; object-src 'none'; upgrade-insecure-requests" },
        ],
      },
    ]
  },
}

export default nextConfig

/** @type {import('next').NextConfig} */
const BUNNY_CDN = 'https://aurumsite.b-cdn.net'

const nextConfig = {
  // Serve all /_next/static/ JS, CSS, and font chunks from Bunny CDN
  assetPrefix: process.env.NODE_ENV === 'production' ? BUNNY_CDN : '',

  // Allow next/image to load images hosted on Bunny CDN
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'aurumsite.b-cdn.net',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig

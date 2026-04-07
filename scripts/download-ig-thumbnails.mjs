import { createWriteStream, mkdirSync, existsSync } from 'fs'
import { get } from 'https'
import { pipeline } from 'stream/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT_DIR = path.join(__dirname, '..', 'public', 'images', 'instagram')

if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true })

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    get(url, { headers: { 'User-Agent': 'curl/7.68.0' } }, res => {
      let data = ''
      res.on('data', chunk => data += chunk)
      res.on('end', () => {
        try { resolve(JSON.parse(data)) }
        catch (e) { reject(new Error(`Parse error for ${url}: ${e.message}\nRaw: ${data.slice(0, 200)}`)) }
      })
    }).on('error', reject)
  })
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = createWriteStream(dest)
    function doGet(targetUrl, redirectCount = 0) {
      if (redirectCount > 10) return reject(new Error('Too many redirects'))
      get(targetUrl, { headers: { 'User-Agent': 'curl/7.68.0', 'Accept': 'image/webp,image/jpg,image/*' } }, res => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return doGet(res.headers.location, redirectCount + 1)
        }
        if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode} for ${targetUrl}`))
        res.pipe(file)
        file.on('finish', () => { file.close(); resolve() })
      }).on('error', reject)
    }
    doGet(url)
  })
}

const POSTS = [
  { idx: 0,  file: 'ig_0.jpg',  url: 'https://www.instagram.com/p/DVCuOHQgHv9/' },
  { idx: 1,  file: 'ig_1.jpg',  url: 'https://www.instagram.com/reel/DUMz7yQgANo/' },
  { idx: 2,  file: 'ig_2.jpg',  url: 'https://www.instagram.com/reel/DIF9spOAwco/' },
  { idx: 3,  file: 'ig_3.jpg',  url: 'https://www.instagram.com/reel/DHhqKSxg_qg/' },
  { idx: 4,  file: 'ig_4.jpg',  url: 'https://www.instagram.com/reel/DFrBoGiAPjB/' },
  { idx: 5,  file: 'ig_5.jpg',  url: 'https://www.instagram.com/reel/DFjWxCLgu2K/' },
  { idx: 6,  file: 'ig_6.jpg',  url: 'https://www.instagram.com/reel/DFEhaIdg_l9/' },
  { idx: 7,  file: 'ig_7.jpg',  url: 'https://www.instagram.com/reel/DEvXIpKS5UF/' },
  { idx: 8,  file: 'ig_8.jpg',  url: 'https://www.instagram.com/reel/DEYzVLeunre/' },
  { idx: 9,  file: 'ig_9.jpg',  url: 'https://www.instagram.com/reel/DEYoAwOPHdX/' },
  { idx: 10, file: 'ig_10.jpg', url: 'https://www.instagram.com/p/DD64suoNGvC/' },
  { idx: 11, file: 'ig_11.jpg', url: 'https://www.instagram.com/p/DDo3HRRNbgM/' },
  { idx: 12, file: 'ig_12.jpg', url: 'https://www.instagram.com/reel/DDclVuJxC1L/' },
  { idx: 13, file: 'ig_13.jpg', url: 'https://www.instagram.com/reel/DDb_LNbvAFI/' },
  { idx: 14, file: 'ig_14.jpg', url: 'https://www.instagram.com/p/DDW1jR_t4rc/' },
  { idx: 15, file: 'ig_15.jpg', url: 'https://www.instagram.com/p/DDJ9mM5tCr9/' },
  { idx: 16, file: 'ig_16.jpg', url: 'https://www.instagram.com/reel/DDE0AYFNmts/' },
  { idx: 17, file: 'ig_17.jpg', url: 'https://www.instagram.com/reel/DCy3uZxC4RC/' },
  { idx: 18, file: 'ig_18.jpg', url: 'https://www.instagram.com/p/DCgw23UtbKF/' },
  { idx: 19, file: 'ig_19.jpg', url: 'https://www.instagram.com/p/DCT46W3tDKI/' },
  { idx: 20, file: 'ig_20.jpg', url: 'https://www.instagram.com/p/DCOvTJft8mn/' },
  { idx: 21, file: 'ig_21.jpg', url: 'https://www.instagram.com/p/DCB3U1GNd0d/' },
  { idx: 22, file: 'ig_22.jpg', url: 'https://www.instagram.com/reel/DB8twA1o6Kc/' },
  { idx: 23, file: 'ig_23.jpg', url: 'https://www.instagram.com/reel/C-E6IWNMZBL/' },
]

let successCount = 0
let failCount = 0
const results = []

for (const post of POSTS) {
  try {
    const dest = path.join(OUT_DIR, post.file)
    if (existsSync(dest)) {
      console.log(`[SKIP] ${post.file} already exists`)
      results.push({ idx: post.idx, file: post.file, ok: true })
      successCount++
      continue
    }

    // Instagram oEmbed gives us a thumbnail_url
    const oembedUrl = `https://graph.facebook.com/v18.0/instagram_oembed?url=${encodeURIComponent(post.url)}&access_token=&format=json`

    // Try the public (no-auth) oEmbed endpoint
    const publicOembed = `https://www.instagram.com/api/v1/oembed/?url=${encodeURIComponent(post.url)}`
    
    let thumbnailUrl = null
    try {
      const data = await fetchJson(publicOembed)
      thumbnailUrl = data.thumbnail_url
      console.log(`[oEmbed] ${post.idx}: ${thumbnailUrl ? '✓' : 'no thumbnail'}`)
    } catch (e) {
      console.log(`[oEmbed FAIL] ${post.idx}: ${e.message}`)
    }

    if (!thumbnailUrl) {
      // Try legacy endpoint
      const legacyOembed = `https://api.instagram.com/oembed/?url=${encodeURIComponent(post.url)}`
      try {
        const data = await fetchJson(legacyOembed)
        thumbnailUrl = data.thumbnail_url
        console.log(`[legacy oEmbed] ${post.idx}: ${thumbnailUrl ? '✓ got thumbnail' : 'no thumbnail'}`)
      } catch (e) {
        console.log(`[legacy oEmbed FAIL] ${post.idx}: ${e.message}`)
      }
    }

    if (thumbnailUrl) {
      await downloadFile(thumbnailUrl, dest)
      console.log(`[SAVED] ${post.file}`)
      results.push({ idx: post.idx, file: post.file, ok: true })
      successCount++
    } else {
      console.log(`[FAIL] No thumbnail found for ${post.url}`)
      results.push({ idx: post.idx, file: post.file, ok: false })
      failCount++
    }

    // Small delay to avoid rate limiting
    await new Promise(r => setTimeout(r, 800))
  } catch (err) {
    console.error(`[ERROR] ${post.file}: ${err.message}`)
    results.push({ idx: post.idx, file: post.file, ok: false })
    failCount++
  }
}

console.log(`\n✅ Done: ${successCount} saved, ❌ ${failCount} failed`)
console.log('\nFailed posts:')
results.filter(r => !r.ok).forEach(r => console.log(`  idx ${r.idx}: ${r.file}`))

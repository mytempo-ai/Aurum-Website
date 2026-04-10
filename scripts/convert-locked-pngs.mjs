import sharp from 'sharp'
import { statSync, writeFileSync } from 'fs'

const files = [
  'public/images/events/fundraiser_1_1774937843520.png',
  'public/images/events/fundraiser_2_1774937906768.png',
  'public/images/events/social_1_1774937859760.png',
  'public/images/events/social_2_1774937926623.png',
  'public/images/events/sweet_16_1_1774937824267.png',
  'public/images/events/sweet_16_2_1774937886509.png',
  'public/images/menu/dessert-1.png',
  'public/images/menu/dinner-1.png',
  'public/images/menu/first-course-1.png',
  'public/images/menu/hors-doeuvres-1.png',
  'public/images/menu/kids-1.png',
  'public/images/menu/stations-1.png',
  'public/images/menu/stations-2.png',
  'public/images/menu/stations-3.png',
]

let totalB = 0, totalA = 0

console.log('\n=== Converting locked PNGs → JPEG ===\n')

for (const f of files) {
  const before = statSync(f).size
  totalB += before
  const jpgPath = f.replace(/\.png$/i, '.jpg')
  const buf = await sharp(f).jpeg({ quality: 80, mozjpeg: true }).toBuffer()
  writeFileSync(jpgPath, buf)
  totalA += buf.length
  const saved = ((1 - buf.length / before) * 100).toFixed(0)
  console.log(`${f.split('/').pop().padEnd(48)} ${Math.round(before/1024).toString().padStart(5)} KB → ${Math.round(buf.length/1024).toString().padStart(4)} KB  (${saved}% saved)`)
}

console.log(`\nTOTAL: ${Math.round(totalB/1024)} KB → ${Math.round(totalA/1024)} KB  (${((1-totalA/totalB)*100).toFixed(0)}% saved)`)
console.log('\n✅ JPG versions created alongside originals.')
console.log('⚠️  Old .png files still exist but are unused — delete them manually or via git.')

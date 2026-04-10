import sharp from 'sharp'
import { readdirSync, statSync, renameSync, unlinkSync } from 'fs'
import { join, extname, basename } from 'path'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const IMAGES_DIR = join(__dirname, '..', 'public', 'images')

// Keep logos as PNG (they need transparency) — compress but don't convert
const KEEP_AS_PNG = ['logo.png', 'footer-logo.png', 'menu-header.png']

// Collect all image files recursively
function getImages(dir) {
  const results = []
  for (const name of readdirSync(dir)) {
    const full = join(dir, name)
    if (statSync(full).isDirectory()) {
      results.push(...getImages(full))
    } else if (/\.(jpg|jpeg|png|webp)$/i.test(name)) {
      results.push(full)
    }
  }
  return results
}

const files = getImages(IMAGES_DIR)

let totalBefore = 0
let totalAfter  = 0
let count = 0

console.log(`\n=== Aurum Images Compression (sharp) ===`)
console.log(`Found ${files.length} images\n`)

for (const file of files) {
  const ext  = extname(file).toLowerCase()
  const name = basename(file)
  const sizeBefore = statSync(file).size

  try {
    const tmp = file + '.tmp'

    if (ext === '.png') {
      if (KEEP_AS_PNG.includes(name)) {
        // Compress PNG but keep format
        await sharp(file).png({ quality: 85, compressionLevel: 9 }).toFile(tmp)
      } else {
        // Convert non-logo PNGs → JPEG (food/event photos have no transparency)
        const jpgFile = file.replace(/\.png$/i, '.jpg')
        await sharp(file)
          .jpeg({ quality: 80, mozjpeg: true })
          .toFile(jpgFile + '.tmp')
        // Overwrite the PNG with the JPEG, remove original PNG
        renameSync(jpgFile + '.tmp', jpgFile)
        unlinkSync(file)
        const sizeAfter = statSync(jpgFile).size
        const saved = ((1 - sizeAfter / sizeBefore) * 100).toFixed(1)
        totalBefore += sizeBefore
        totalAfter  += sizeAfter
        count++
        console.log(`[PNG→JPG] ${name.padEnd(45)} ${(sizeBefore/1024).toFixed(0).padStart(6)} KB → ${(sizeAfter/1024).toFixed(0).padStart(5)} KB  (${saved}% saved)`)
        continue
      }
    } else {
      // JPEG / WebP — compress in place
      await sharp(file).jpeg({ quality: 80, mozjpeg: true }).toFile(tmp)
    }

    const sizeAfter = statSync(tmp).size

    if (sizeAfter < sizeBefore) {
      renameSync(tmp, file)
      const saved = ((1 - sizeAfter / sizeBefore) * 100).toFixed(1)
      console.log(`[OK]      ${name.padEnd(45)} ${(sizeBefore/1024).toFixed(0).padStart(6)} KB → ${(sizeAfter/1024).toFixed(0).padStart(5)} KB  (${saved}% saved)`)
      totalBefore += sizeBefore
      totalAfter  += sizeAfter
    } else {
      // Compressed version is bigger — keep original
      unlinkSync(tmp)
      console.log(`[SKIP]    ${name.padEnd(45)} ${(sizeBefore/1024).toFixed(0).padStart(6)} KB  (already optimal)`)
      totalBefore += sizeBefore
      totalAfter  += sizeBefore
    }
    count++
  } catch (err) {
    console.error(`[ERR]     ${name}: ${err.message}`)
  }
}

const totalSaved = ((1 - totalAfter / totalBefore) * 100).toFixed(1)
console.log(`\n${'─'.repeat(70)}`)
console.log(`TOTAL: ${count} images  |  ${(totalBefore/1024/1024).toFixed(1)} MB → ${(totalAfter/1024/1024).toFixed(1)} MB  |  ${totalSaved}% saved`)
console.log(`\n⚠️  NOTE: PNG files that were converted to JPG — search & replace any`)
console.log(`   .png references in code to .jpg for those specific files.\n`)

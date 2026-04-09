'use client'

import React from 'react'

interface MenuGalleryProps {
  images: string[]
}

export default function MenuGallery({ images }: MenuGalleryProps) {
  return (
    <div className="mt-16 pt-12 border-t border-[var(--border)]">
      <h3 className="font-oswald font-semibold text-sm uppercase tracking-[2px] text-[var(--gold-dark)] mb-8 text-center">
        Culinary Gallery
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((src, i) => (
          <div key={i} className="aspect-[4/3] overflow-hidden rounded-sm border border-[var(--border)] shadow-sm">
            <img
              src={src}
              alt={`Menu items ${i + 1}`}
              loading="lazy"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

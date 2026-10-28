'use client';

import React from 'react';
import Image from 'next/image';
import { SectionHeading } from '@/components/ui/SectionHeading';

const GALLERY_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80',
    caption: '14-Hour Lamb Raan roasting over dying babool embers',
    span: 'col-span-1 md:col-span-2 row-span-2',
    height: 'h-96 md:h-full',
  },
  {
    src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    caption: 'The Royal Diwan intimate velvet banquettes by night',
    span: 'col-span-1',
    height: 'h-64 md:h-72',
  },
  {
    src: 'https://images.unsplash.com/photo-1533777857889-4be7c70e33f7?auto=format&fit=crop&w=800&q=80',
    caption: 'Tandoor fired Maine lobster brushed with cardamom cream',
    span: 'col-span-1',
    height: 'h-64 md:h-72',
  },
  {
    src: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80',
    caption: 'Open hearth fire trenches at Ember Rooftop',
    span: 'col-span-1',
    height: 'h-64 md:h-72',
  },
  {
    src: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
    caption: 'Pure 24-karat gold leaf applied to royal saffron rabri',
    span: 'col-span-1',
    height: 'h-64 md:h-72',
  },
];

export const AtmosphericGallery: React.FC = () => {
  return (
    <section className="relative py-24 sm:py-32 bg-obsidian border-t border-champagne-gold/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Sensory Vignettes"
          title="The Atmospheric Gallery"
          description="A visual study of smoke, gold leaf, glowing embers, and midnight banquets."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[220px]">
          {GALLERY_IMAGES.map((img, idx) => (
            <div
              key={idx}
              className={`group relative rounded-card overflow-hidden bg-charcoal border border-champagne-gold/20 ${img.span}`}
            >
              <Image
                src={img.src}
                alt={img.caption}
                fill
                loading="lazy"
                className="object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-95 group-hover:brightness-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                <p className="text-xs text-warm-ivory font-light leading-snug">
                  {img.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Flame, Sparkles, ArrowRight, Play, Compass, Shield } from 'lucide-react';
import { MENU_ITEMS } from '@/lib/menu-data';
import { MenuItem } from '@/types/menu';
import { MenuCard } from '@/components/menu/MenuCard';
import { DishDetailPanel } from '@/components/menu/DishDetailPanel';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';

export const CinematicBentoGrid: React.FC = () => {
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);

  const signatureDish = MENU_ITEMS[0]; // Sikandari Raan
  const lobsterDish = MENU_ITEMS[2]; // Tandoori Malai Lobster
  const biryaniDish = MENU_ITEMS[1]; // Shahi Dum Biryani
  const dalDish = MENU_ITEMS[3]; // Dal-e-Sultanat 36-hour

  return (
    <section id="cinematic-menu" className="relative py-24 sm:py-32 bg-obsidian">
      {/* Background radial lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-fire-amber/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-champagne-gold/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <SectionHeading
          eyebrow="Imperial Gastronomy"
          title="Cinematic Bento Grid"
          description="A curated selection of our finest slow-braised cuts, clay-fired crustacea, and 36-hour simmered treasures, crafted with elemental fire."
          align="center"
        />

        {/* Bento Grid Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {/* 1. Large Signature Dish Card (Span 2 cols, 2 rows) */}
          <MenuCard
            dish={biryaniDish}
            onInspect={setSelectedDish}
            featuredSize="large"
            displayName="Royal Awadhi Dum Biryani"
            priceLabel="₹1,598"
            heatClip
            videoSrc="https://videos.pexels.com/video-files/3195394/3195394-hd_1920_1080_25fps.mp4"
          />

          {/* 2. Cinematic Cooking Video / Live Flame Card (Span 2 cols) */}
          <div className="md:col-span-1 lg:col-span-2 rounded-card overflow-hidden bg-charcoal border border-champagne-gold/20 relative min-h-[300px] flex flex-col justify-end p-6 sm:p-8 group">
            {/* Background cinematic culinary video poster */}
            <Image
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80"
              alt="Live hearth cooking theatre"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105 brightness-[0.6]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <video className="absolute inset-0 h-full w-full object-cover opacity-65" autoPlay muted loop playsInline aria-hidden="true"><source src="https://videos.pexels.com/video-files/30044486/30044486-hd_1080_1920_30fps.mp4" type="video/mp4" /></video>
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent" />

            <div className="relative z-10">
              <div className="w-10 h-10 rounded-full bg-champagne-gold/20 backdrop-blur-md border border-champagne-gold/40 flex items-center justify-center mb-3 text-champagne-gold shadow-gold-glow">
                <Flame className="w-5 h-5 text-fire-amber animate-pulse" />
              </div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-champagne-gold font-medium block mb-1">
                Live Hearth Ritual
              </span>
              <h3 className="font-display text-2xl sm:text-3xl text-warm-ivory font-light mb-2">
                Live-Fire Tandoor
              </h3>
              <p className="text-xs sm:text-sm text-warm-ivory/70 font-light max-w-md mb-4 leading-relaxed">
                Watch our khansamas tend ancient babool wood coals, sealing royal clay handis with wholewheat dough to trap fleeting aromatic steam.
              </p>
              <Link href="/heritage" className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-champagne-gold hover:underline">
                <span>Discover the Heritage Philosophy</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* 3. Heritage & Rare Ingredient Story Card */}
          <div className="rounded-card bg-charcoal-light/60 border border-champagne-gold/20 p-6 flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-champagne-gold/80 block mb-2">
                Imperial Sourcing
              </span>
              <h4 className="font-display text-xl text-warm-ivory font-light mb-3">
                Grade-1 Pampore Saffron & 24k Pure Gold
              </h4>
              <p className="text-xs text-warm-ivory/70 font-light leading-relaxed mb-4">
                We fly hand-harvested Mongra saffron directly from Kashmir valleys. Each stamen is inspected before infusion into ghee broths.
              </p>
            </div>
            <div className="pt-3 border-t border-champagne-gold/15 flex items-center gap-2 text-[11px] text-champagne-gold">
              <Sparkles className="w-3.5 h-3.5 text-fire-amber" />
              <span>Uncompromised Purity</span>
            </div>
          </div>

          {/* 4. Second Signature Card (Lobster & Truffle) */}
          <MenuCard
            dish={lobsterDish}
            onInspect={setSelectedDish}
          />

          {/* 5. Shahi Dum Biryani */}
          <MenuCard
            dish={signatureDish}
            onInspect={setSelectedDish}
            displayName="Royal Kebabs"
            priceLabel="₹3,990"
            videoSrc="https://videos.pexels.com/video-files/30044486/30044486-hd_1080_1920_30fps.mp4"
          />

          {/* 6. Dal-e-Sultanat */}
          <MenuCard
            dish={dalDish}
            onInspect={setSelectedDish}
          />

        </div>

        {/* View Full Menu CTA Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-card glass-panel border border-champagne-gold/30 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <h4 className="font-display text-2xl text-warm-ivory font-light mb-1">
              Explore Our Complete 42-Dish Tasting Repertoire
            </h4>
            <p className="text-xs sm:text-sm text-warm-ivory/60 font-light">
              From clay pot curries and charcoal roasts to smoked botanical elixirs.
            </p>
          </div>

          <Link href="/menu">
            <Button variant="primary" size="md" className="shrink-0 flex items-center gap-2">
              <span>View Full Menu</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Dish Detail Inspection Modal */}
      <DishDetailPanel dish={selectedDish} onClose={() => setSelectedDish(null)} />
    </section>
  );
};

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, Flame } from 'lucide-react';
import { RoyalFireHero } from '@/components/hero/RoyalFireHero';
import { CinematicBentoGrid } from '@/components/menu/CinematicBentoGrid';
import { HeritageStory } from '@/components/sections/HeritageStory';
import { ChefsCollection } from '@/components/sections/ChefsCollection';
import { PrivateDiningSection } from '@/components/sections/PrivateDiningSection';
import { VisualReviews } from '@/components/sections/VisualReviews';
import { AtmosphericGallery } from '@/components/sections/AtmosphericGallery';
import { LocationSection } from '@/components/sections/LocationSection';
import { Button } from '@/components/ui/Button';

export default function HomePage() {
  return (
    <div className="w-full flex flex-col bg-obsidian">
      {/* 1. The Royal Fire Hero */}
      <RoyalFireHero />

      {/* 2. Cinematic Signature Bento Menu */}
      <CinematicBentoGrid />

      {/* 3. Featured Dish Customizer Callout Showcase */}
      <section className="relative py-20 bg-charcoal border-y border-champagne-gold/20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#f28c28_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-[1px] bg-champagne-gold/50" />
              <span className="text-[10px] uppercase tracking-[0.25em] text-champagne-gold font-medium">
                Digital Culinary Workbench
              </span>
            </div>
            <h3 className="font-display text-3xl sm:text-4xl text-warm-ivory font-light leading-tight mb-3">
              Become the Architect of Your Own Royal Feast
            </h3>
            <p className="text-sm text-warm-ivory/70 font-light leading-relaxed">
              Step into our interactive 3D brass thali workbench. Select rare Kashmiri saffron, wild deep-sea king prawns, and ancient pit methods. Your bespoke recipe carries seamlessly into your table reservation.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row items-center gap-4">
            <Link href="/craft-your-dish">
              <Button variant="fire" size="lg" className="shadow-fire-glow flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-warm-ivory" />
                <span>Launch Interactive Workbench</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Heritage Storytelling */}
      <HeritageStory />

      {/* 5. Chef's Table Collection */}
      <ChefsCollection />

      {/* 6. Private Dining */}
      <PrivateDiningSection />

      {/* 7. Visual Reviews */}
      <VisualReviews />

      {/* 8. Atmospheric Gallery */}
      <AtmosphericGallery />

      {/* 9. Location & Opening Hours */}
      <LocationSection />
    </div>
  );
}

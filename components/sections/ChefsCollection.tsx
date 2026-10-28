'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChefHat, Sparkles, ArrowRight, Flame } from 'lucide-react';
import { SAMPLE_CHEFS } from '@/lib/menu-data';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export const ChefsCollection: React.FC = () => {
  return (
    <section className="relative py-24 sm:py-32 bg-obsidian border-t border-champagne-gold/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="The Custodians of Flame"
          title="Masters of the Royal Kitchens"
          description="Led by culinary historians and generational fire masters dedicated to resurrecting lost court recipes with modern discipline."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SAMPLE_CHEFS.map((chef) => (
            <div
              key={chef.id}
              className="group rounded-card bg-charcoal border border-champagne-gold/20 hover:border-champagne-gold/50 transition-all duration-500 overflow-hidden flex flex-col justify-between"
            >
              {/* Chef Portrait */}
              <div className="relative w-full h-80 overflow-hidden bg-charcoal-light">
                <Image
                  src={chef.image}
                  alt={chef.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-95"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/30 to-transparent" />

                <div className="absolute top-3 right-3 z-10">
                  <Badge variant="charcoal" size="sm" className="text-[9px]">
                    Concept Profile
                  </Badge>
                </div>

                <div className="absolute bottom-4 left-4 right-4 z-10">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-champagne-gold font-medium block">
                    {chef.role}
                  </span>
                  <h3 className="font-display text-2xl text-warm-ivory font-light leading-snug">
                    {chef.name}
                  </h3>
                </div>
              </div>

              {/* Chef Details */}
              <div className="p-6 flex flex-col flex-grow justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-fire-amber mb-3">
                    <Flame className="w-3.5 h-3.5" />
                    <span>Speciality: {chef.speciality}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-warm-ivory/70 leading-relaxed font-light mb-4">
                    {chef.bio}
                  </p>
                </div>

                <div className="pt-4 border-t border-champagne-gold/15 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-warm-ivory/50 block">
                      Signature Creation
                    </span>
                    <span className="font-medium text-champagne-gold">{chef.featuredDish}</span>
                  </div>

                  <Link
                    href="/chefs-table"
                    className="p-2 rounded-full bg-charcoal-light hover:bg-champagne-gold hover:text-obsidian text-warm-ivory transition-colors"
                    aria-label={`View ${chef.name} profile`}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/chefs-table">
            <Button variant="secondary" size="md">
              <span>View Master Chef Tasting Schedule</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

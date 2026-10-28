'use client';

import React from 'react';
import Image from 'next/image';
import { Users, Calendar, Sparkles, MapPin, Check, Shield } from 'lucide-react';
import { SEATING_ZONES } from '@/lib/menu-data';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useReservation } from '@/hooks/useReservation';

export default function PrivateDiningPage() {
  const { openReservationModal, setFormField } = useReservation();

  const handleBookSanctum = (zoneId: string) => {
    setFormField('seatingZoneId', zoneId);
    openReservationModal();
  };

  return (
    <div className="pt-28 pb-24 bg-obsidian text-warm-ivory min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="text-xs uppercase tracking-[0.25em] text-champagne-gold font-medium mb-3 block">
            Bespoke Banquets & Seclusion
          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-warm-ivory font-light tracking-tight leading-[1.08] mb-4">
            Private Dining Sanctums
          </h1>
          <p className="text-warm-ivory/70 text-base sm:text-lg font-light leading-relaxed">
            Three distinct architectural environments designed for secluded celebrations, diplomatic banquets, and starlit open-fire dining.
          </p>
        </div>

        {/* Sanctums Deep Showcase */}
        <div className="space-y-16 mb-24">
          {SEATING_ZONES.map((zone, idx) => {
            const isReversed = idx % 2 === 1;
            return (
              <div
                key={zone.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center p-6 sm:p-8 rounded-card glass-panel border border-champagne-gold/25`}
              >
                {/* Media Image */}
                <div
                  className={`lg:col-span-6 relative h-72 sm:h-96 rounded-card overflow-hidden border border-champagne-gold/20 ${
                    isReversed ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <Image
                    src={zone.image}
                    alt={zone.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <Badge variant="gold" size="sm">
                      <Users className="w-3.5 h-3.5 mr-1" />
                      Capacity: Up to {zone.capacityMax} Guests
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div
                  className={`lg:col-span-6 space-y-5 ${
                    isReversed ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <span className="text-xs uppercase tracking-[0.2em] text-champagne-gold font-medium block">
                    {zone.tagline}
                  </span>
                  <h2 className="font-display text-3xl sm:text-4xl text-warm-ivory font-light">
                    {zone.name}
                  </h2>
                  <p className="text-sm sm:text-base text-warm-ivory/70 font-light leading-relaxed">
                    {zone.description}
                  </p>

                  <div className="p-4 rounded-lg bg-charcoal/70 border border-white/5 space-y-2 text-xs">
                    <div className="flex items-center gap-2 text-warm-ivory/80">
                      <strong className="text-champagne-gold">Atmosphere:</strong> {zone.ambience}
                    </div>
                    {zone.minimumSpendNotice && (
                      <div className="text-champagne-gold/80 italic">
                        {zone.minimumSpendNotice}
                      </div>
                    )}
                  </div>

                  <div className="pt-2">
                    <Button
                      variant="primary"
                      size="md"
                      onClick={() => handleBookSanctum(zone.id)}
                      className="shadow-gold-glow flex items-center gap-2"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Reserve {zone.name}</span>
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Private Banquet Inquiries */}
        <div className="glass-panel p-8 sm:p-12 rounded-card border border-champagne-gold/30 text-center max-w-3xl mx-auto">
          <h3 className="font-display text-3xl text-warm-ivory font-light mb-3">
            Bespoke Banquets & Entire Sanctum Buyouts
          </h3>
          <p className="text-sm text-warm-ivory/70 max-w-lg mx-auto font-light leading-relaxed mb-6">
            For bespoke wedding celebrations, corporate galas, or embassy gatherings requiring customized menus and private sommeliers.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              variant="fire"
              size="lg"
              onClick={() => openReservationModal()}
              className="shadow-fire-glow"
            >
              <span>Submit Banquet Inquiry</span>
            </Button>
            <a href="tel:+12128903473">
              <Button variant="outline" size="lg">
                <span>Call Concierge: +1 (212) 890-FIRE</span>
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

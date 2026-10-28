'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Users, Sparkles, Calendar, ArrowRight, Shield } from 'lucide-react';
import { SEATING_ZONES } from '@/lib/menu-data';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useReservation } from '@/hooks/useReservation';

export const PrivateDiningSection: React.FC = () => {
  const { openReservationModal, setFormField } = useReservation();

  const handleBookSanctum = (zoneId: string) => {
    setFormField('seatingZoneId', zoneId);
    openReservationModal();
  };

  return (
    <section className="relative py-24 sm:py-32 bg-obsidian border-t border-champagne-gold/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Bespoke Hospitality"
          title="Private Dining & Imperial Sanctums"
          description="Whether hosting an intimate royal celebration, a diplomatic dinner, or an open-air fire pit feast under the stars."
          align="center"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {SEATING_ZONES.map((zone) => (
            <div
              key={zone.id}
              className="group rounded-card bg-charcoal border border-champagne-gold/20 hover:border-champagne-gold/60 transition-all duration-500 overflow-hidden flex flex-col justify-between shadow-lg"
            >
              {/* Media Imagery */}
              <div className="relative w-full h-64 overflow-hidden bg-charcoal-light">
                <Image
                  src={zone.image}
                  alt={zone.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent" />

                <div className="absolute top-3 right-3 z-10">
                  <Badge variant="gold" size="sm">
                    <Users className="w-3 h-3 mr-1" />
                    Max {zone.capacityMax} Guests
                  </Badge>
                </div>
              </div>

              {/* Information */}
              <div className="p-6 sm:p-7 flex flex-col flex-grow justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-champagne-gold font-medium block mb-1">
                    {zone.tagline}
                  </span>
                  <h3 className="font-display text-2xl text-warm-ivory font-light mb-3">
                    {zone.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-warm-ivory/70 leading-relaxed font-light mb-4">
                    {zone.description}
                  </p>

                  <div className="p-3 rounded-lg bg-charcoal-light/70 border border-white/5 text-xs text-warm-ivory/60 mb-6">
                    <strong className="text-champagne-gold font-medium">Ambience:</strong> {zone.ambience}
                  </div>
                </div>

                <div className="pt-4 border-t border-champagne-gold/15 flex items-center justify-between gap-3">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleBookSanctum(zone.id)}
                    className="flex-1 justify-center"
                  >
                    <span>Reserve Sanctum</span>
                  </Button>

                  <Link href="/private-dining">
                    <Button variant="outline" size="sm" className="p-2.5">
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

'use client';

import React from 'react';
import { MapPin, Phone, Mail, Clock, Car, Compass, Calendar } from 'lucide-react';
import { RESTAURANT_CONFIG } from '@/lib/formatters';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { useReservation } from '@/hooks/useReservation';

export const LocationSection: React.FC = () => {
  const { openReservationModal } = useReservation();

  return (
    <section className="relative py-24 sm:py-32 bg-obsidian border-t border-champagne-gold/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Sanctuary Arrival"
          title="Location & Hearth Hours"
          description="Nestled within New York's historic Fire District, designed as an unhurried haven away from the city's haste."
          align="center"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Details Card */}
          <div className="lg:col-span-5 glass-panel p-6 sm:p-8 rounded-card border border-champagne-gold/30 flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-champagne-gold font-medium block mb-2">
                  Sanctuary Address
                </span>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-champagne-gold shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-display text-xl text-warm-ivory font-light mb-1">
                      {RESTAURANT_CONFIG.address}
                    </h3>
                    <p className="text-xs text-warm-ivory/60 font-light">
                      Valet parking service provided at the private porte-cochère entrance on Obsidian Way.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-champagne-gold/15">
                <span className="text-[10px] uppercase tracking-[0.25em] text-champagne-gold font-medium block mb-3">
                  Hours of Hearth Service
                </span>
                <ul className="space-y-2 text-xs text-warm-ivory/70 font-light">
                  <li className="flex justify-between">
                    <span className="text-warm-ivory">Tuesday – Thursday</span>
                    <span>{RESTAURANT_CONFIG.hours.tuesdayToThursday}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-warm-ivory">Friday – Sunday</span>
                    <span>{RESTAURANT_CONFIG.hours.fridayToSunday}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-warm-ivory">Monday</span>
                    <span className="text-champagne-gold/70">{RESTAURANT_CONFIG.hours.monday}</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-champagne-gold/15">
                <span className="text-[10px] uppercase tracking-[0.25em] text-champagne-gold font-medium block mb-2">
                  Concierge Direct
                </span>
                <div className="space-y-1.5 text-xs text-warm-ivory/80">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-champagne-gold" />
                    <span>{RESTAURANT_CONFIG.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-champagne-gold" />
                    <span>{RESTAURANT_CONFIG.email}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <Button
                variant="primary"
                size="md"
                onClick={() => openReservationModal()}
                className="w-full justify-center shadow-gold-glow"
              >
                <Calendar className="w-4 h-4 mr-2" />
                <span>Reserve a Table</span>
              </Button>
            </div>
          </div>

          {/* Right Stylized Architectural Map & Ambience Display */}
          <div className="lg:col-span-7 rounded-card overflow-hidden border border-champagne-gold/30 relative min-h-[360px] bg-charcoal flex flex-col justify-between p-8">
            <div className="absolute inset-0 bg-[radial-gradient(#d6b875_1px,transparent_1px)] [background-size:20px_20px] opacity-15" />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent" />

            {/* Stylized Architectural Floorplan Inset */}
            <div className="relative z-10">
              <span className="text-[10px] uppercase tracking-[0.25em] text-champagne-gold font-medium block mb-2">
                Arrival Guide
              </span>
              <h3 className="font-display text-2xl sm:text-3xl text-warm-ivory font-light mb-3">
                The Obsidian Gates
              </h3>
              <p className="text-xs sm:text-sm text-warm-ivory/70 max-w-md font-light leading-relaxed">
                Guests enter through the arched bronze gatehouse flanked by twin open charcoal hearths into the courtyard of water and live embers.
              </p>
            </div>

            <div className="relative z-10 pt-6 border-t border-champagne-gold/20 flex flex-wrap items-center gap-6 text-xs text-warm-ivory/70">
              <div className="flex items-center gap-2">
                <Car className="w-4 h-4 text-champagne-gold" />
                <span>Complimentary Imperial Valet</span>
              </div>
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-champagne-gold" />
                <span>Tribeca / Soho Historic Border</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

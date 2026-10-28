'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChefHat, Flame, Sparkles, Calendar, Clock, Wine, ArrowRight } from 'lucide-react';
import { SAMPLE_CHEFS } from '@/lib/menu-data';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useReservation } from '@/hooks/useReservation';

const TASTING_COURSES = [
  {
    course: 'Course 01 — Awakening',
    name: 'Elixir of Smoked Damascena Rose & Vetiver',
    description: 'Cold-distilled floral water infused over clove-charred embers with crystal lime.',
  },
  {
    course: 'Course 02 — The Clay Pit',
    name: 'Tandoori Malai Lobster & Périgord Truffle Shavings',
    description: 'Flash-cooked in 850°F terracotta pit with cardamom cream and wild garlic.',
  },
  {
    course: 'Course 03 — The Smoke Cloak',
    name: 'Paneer Rooh-Afza & Morel Mushroom Tikka',
    description: 'Artisanal buffalo curd stuffed with spring Kashmiri morels, smoked over rose petals.',
  },
  {
    course: 'Course 04 — The 14-Hour Seal',
    name: 'Nawab-e-Khaas Sikandari Raan & Saffron Warq',
    description: 'Slow pit-roasted spring lamb leg finished with 24k gold leaf and bone marrow glaze.',
  },
  {
    course: 'Course 05 — The Sealed Dum',
    name: 'Shahi Murgh Dum Pukht Biryani & Burnt Garlic Raita',
    description: 'Aged 3-year Basmati rice cooked under dough seal with French quail and saffron milk.',
  },
  {
    course: 'Course 06 — The Sweet Epilogue',
    name: 'Dastan-e-Shahi Shahi Tukda & 24k Gold Leaf',
    description: 'Ghee-crisped brioche steeped in saffron nectar with 8-hour condensed buffalo rabri.',
  },
];

export default function ChefsTablePage() {
  const { openReservationModal, setFormField } = useReservation();

  const handleBookChefsTable = () => {
    setFormField('seatingZoneId', 'chefs-table');
    openReservationModal();
  };

  return (
    <div className="pt-28 pb-24 bg-obsidian text-warm-ivory min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="text-xs uppercase tracking-[0.25em] text-champagne-gold font-medium mb-3 block">
            Front-Row Gastronomic Theatre
          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-warm-ivory font-light tracking-tight leading-[1.08] mb-4">
            The Master Chef&apos;s Hearth
          </h1>
          <p className="text-warm-ivory/70 text-base sm:text-lg font-light leading-relaxed">
            Only 10 counter seats facing the blazing copper hearths, live embers, and direct plating dialogue with our executive culinary custodians.
          </p>
        </div>

        {/* Counter Experience Showcase */}
        <div className="relative rounded-card overflow-hidden border border-champagne-gold/30 mb-20">
          <div className="relative w-full h-80 sm:h-96 md:h-[480px]">
            <Image
              src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1400&q=80"
              alt="Live Chef Table hearth counter"
              fill
              className="object-cover brightness-75"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent" />

            <div className="absolute bottom-8 left-8 right-8 max-w-2xl">
              <Badge variant="gold" size="sm" className="mb-3">
                <Sparkles className="w-3 h-3 mr-1" />
                Nightly Seating at 18:30 & 21:00
              </Badge>
              <h2 className="font-display text-3xl sm:text-4xl text-warm-ivory font-light mb-2">
                An Intimate Dialogue with Flame & Spice
              </h2>
              <p className="text-xs sm:text-sm text-warm-ivory/80 font-light leading-relaxed">
                Watch every dough seal cut open before your eyes. Experience the release of 14-hour captured aromas, paired with rare vintage elixirs and cellar reserves.
              </p>
            </div>
          </div>
        </div>

        {/* 6-Course Tasting Progression */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-[0.2em] text-champagne-gold font-medium block mb-2">
              The 2026 Tasting Journey
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-warm-ivory font-light">
              6-Act Hearth Progression
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TASTING_COURSES.map((course, idx) => (
              <div
                key={idx}
                className="glass-panel p-6 rounded-card border border-champagne-gold/20 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-champagne-gold font-medium block mb-1">
                    {course.course}
                  </span>
                  <h3 className="font-display text-xl text-warm-ivory font-light mb-2">
                    {course.name}
                  </h3>
                  <p className="text-xs text-warm-ivory/70 font-light leading-relaxed">
                    {course.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chef Profiles */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-[0.2em] text-champagne-gold font-medium block mb-2">
              Custodians of Flame
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-warm-ivory font-light">
              The Resident Masters
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SAMPLE_CHEFS.map((chef) => (
              <div
                key={chef.id}
                className="glass-panel p-6 rounded-card border border-champagne-gold/25 flex flex-col justify-between"
              >
                <div>
                  <div className="relative w-full h-56 rounded-lg overflow-hidden mb-4">
                    <Image
                      src={chef.image}
                      alt={chef.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-champagne-gold font-medium block mb-1">
                    {chef.role}
                  </span>
                  <h3 className="font-display text-2xl text-warm-ivory font-light mb-2">
                    {chef.name}
                  </h3>
                  <p className="text-xs text-warm-ivory/70 font-light leading-relaxed mb-4">
                    {chef.bio}
                  </p>
                </div>
                <div className="pt-3 border-t border-champagne-gold/15 text-[11px] text-warm-ivory/50 italic">
                  {chef.sampleNotice}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Booking Card */}
        <div className="glass-panel p-8 sm:p-12 rounded-card border border-champagne-gold/30 text-center max-w-3xl mx-auto">
          <h3 className="font-display text-3xl text-warm-ivory font-light mb-3">
            Reserve the 10-Seat Hearth Counter
          </h3>
          <p className="text-sm text-warm-ivory/70 max-w-lg mx-auto font-light leading-relaxed mb-6">
            Fixed seating at 18:30 and 21:00 nightly. Experience the live copper hearth front-row.
          </p>
          <Button
            variant="fire"
            size="lg"
            onClick={handleBookChefsTable}
            className="shadow-fire-glow"
          >
            <Calendar className="w-4 h-4 mr-2" />
            <span>Request Chef&apos;s Table Seating</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

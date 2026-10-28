'use client';

import React from 'react';
import Image from 'next/image';
import { Flame, Sparkles, Clock, ShieldCheck, ArrowRight, Calendar } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { useReservation } from '@/hooks/useReservation';

export default function HeritagePage() {
  const { openReservationModal } = useReservation();

  return (
    <div className="pt-28 pb-24 bg-obsidian text-warm-ivory min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="text-xs uppercase tracking-[0.25em] text-champagne-gold font-medium mb-3 block">
            The Living Chronicle
          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-warm-ivory font-light tracking-tight leading-[1.08] mb-4">
            Centuries of Flame & Earthenware
          </h1>
          <p className="text-warm-ivory/70 text-base sm:text-lg font-light leading-relaxed">
            The royal kitchens of Awadh and Rajputana were never rushed by time. Here, cooking was an unhurried, spiritual communion between elemental charcoal and patient clay.
          </p>
        </div>

        {/* 4 Sacred Fire Rituals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {/* 1. Dum Pukht */}
          <div className="glass-panel p-8 rounded-card border border-champagne-gold/25 space-y-4">
            <div className="w-12 h-12 rounded-full bg-champagne-gold/20 border border-champagne-gold/40 flex items-center justify-center text-champagne-gold mb-2">
              <Clock className="w-6 h-6 text-fire-amber" />
            </div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-champagne-gold font-medium block">
              Sacred Method I
            </span>
            <h3 className="font-display text-2xl sm:text-3xl text-warm-ivory font-light">
              Dum Pukht (The Sealed Breath)
            </h3>
            <p className="text-sm text-warm-ivory/70 font-light leading-relaxed">
              Derived from the Persian words &lsquo;dum&rsquo; (to breathe) and &lsquo;pukht&rsquo; (cooked). Food is placed inside an earthenware vessel, and the lid is hermetically sealed with spiced dough. As slow wood embers warm the base and glowing coals rest on the lid, steam circulates continuously, tenderizing marrow and bone without losing a single fragrant vapor.
            </p>
          </div>

          {/* 2. Sigri */}
          <div className="glass-panel p-8 rounded-card border border-champagne-gold/25 space-y-4">
            <div className="w-12 h-12 rounded-full bg-fire-amber/20 border border-fire-amber/40 flex items-center justify-center text-fire-amber mb-2">
              <Flame className="w-6 h-6 animate-pulse" />
            </div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-champagne-gold font-medium block">
              Sacred Method II
            </span>
            <h3 className="font-display text-2xl sm:text-3xl text-warm-ivory font-light">
              Sigri (Charcoal Grill & Glaze)
            </h3>
            <p className="text-sm text-warm-ivory/70 font-light leading-relaxed">
              Open-hearth iron grates fired solely with aged babool and tamarind woods. Unlike harsh gas flames, fruitwood coals deliver an ethereal, non-acrid warmth that caramelizes spice crusts into an intoxicating dark bark while preserving delicate interior juices.
            </p>
          </div>

          {/* 3. Tandoor */}
          <div className="glass-panel p-8 rounded-card border border-champagne-gold/25 space-y-4">
            <div className="w-12 h-12 rounded-full bg-ember-red/20 border border-ember-red/40 flex items-center justify-center text-warm-ivory mb-2">
              <Sparkles className="w-6 h-6 text-fire-amber" />
            </div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-champagne-gold font-medium block">
              Sacred Method III
            </span>
            <h3 className="font-display text-2xl sm:text-3xl text-warm-ivory font-light">
              The Radiant Clay Pit (850°F)
            </h3>
            <p className="text-sm text-warm-ivory/70 font-light leading-relaxed">
              Deep, bell-shaped earthenware chambers fortified with dried fenugreek and goat hair binders. High radiant thermal mass instantly flash-cooks delicate sea lobster tails and stretches multi-layered sourdough breads to blistered perfection.
            </p>
          </div>

          {/* 4. Dhungar */}
          <div className="glass-panel p-8 rounded-card border border-champagne-gold/25 space-y-4">
            <div className="w-12 h-12 rounded-full bg-champagne-gold/20 border border-champagne-gold/40 flex items-center justify-center text-champagne-gold mb-2">
              <ShieldCheck className="w-6 h-6 text-champagne-gold" />
            </div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-champagne-gold font-medium block">
              Sacred Method IV
            </span>
            <h3 className="font-display text-2xl sm:text-3xl text-warm-ivory font-light">
              Dhungar (Clove Smoke Infusion)
            </h3>
            <p className="text-sm text-warm-ivory/70 font-light leading-relaxed">
              A glowing silver coal is nestled in an onion cup inside the pot. Hot ghee and whole cloves are poured onto the coal, instantly erupting in sweet white smoke, then covered for three minutes to marry with rich gravies.
            </p>
          </div>
        </div>

        {/* Sourcing & Rare Ingredients Philosophy */}
        <div className="p-8 sm:p-12 rounded-card bg-charcoal border border-champagne-gold/30 mb-20">
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-[0.25em] text-champagne-gold font-medium mb-2 block">
              The Imperial Larder
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-warm-ivory font-light mb-4">
              Noble Sourcing Across the Silk Route
            </h2>
            <p className="text-sm sm:text-base text-warm-ivory/70 font-light leading-relaxed mb-6">
              True heritage gastronomy cannot exist on compromised ingredients. We commission multi-generational artisans for:
            </p>
            <ul className="space-y-3 text-sm text-warm-ivory/80 font-light">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-champagne-gold mt-2 shrink-0" />
                <span>
                  <strong className="text-warm-ivory">Mongra Saffron:</strong> Handpicked exclusively from the high plateaus of Pampore, Kashmir during the autumn blossom.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-champagne-gold mt-2 shrink-0" />
                <span>
                  <strong className="text-warm-ivory">Edible 24k Gold & Silver:</strong> Hammered between sheets of deer-skin paper by seventh-generation Varq artisans in old city lanes.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-champagne-gold mt-2 shrink-0" />
                <span>
                  <strong className="text-warm-ivory">Terracotta Cookware:</strong> Custom-thrown clay handis made from riverbed soil, cured with mustard oil before first fire.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Reservation CTA */}
        <div className="text-center py-12 glass-panel rounded-card border border-champagne-gold/30">
          <h3 className="font-display text-3xl text-warm-ivory font-light mb-3">
            Taste Centuries of Living Heritage
          </h3>
          <p className="text-sm text-warm-ivory/70 max-w-md mx-auto font-light mb-6">
            Reserve your seat at our hearth and let the aromas of slow braises transport you.
          </p>
          <Button
            variant="primary"
            size="lg"
            onClick={() => openReservationModal()}
            className="shadow-gold-glow"
          >
            <Calendar className="w-4 h-4 mr-2" />
            <span>Reserve an Imperial Table</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

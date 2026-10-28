'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Flame, Clock, MapPin, Phone, Mail, ArrowUpRight, Sparkles } from 'lucide-react';
import { RESTAURANT_CONFIG, formatRestaurantTime, formatRestaurantDate } from '@/lib/formatters';
import { useReservation } from '@/hooks/useReservation';

export const Footer: React.FC = () => {
  const { openReservationModal } = useReservation();
  const [restaurantTime, setRestaurantTime] = useState<string>('');
  const [restaurantDate, setRestaurantDate] = useState<string>('');

  useEffect(() => {
    // Initial format
    setRestaurantTime(formatRestaurantTime());
    setRestaurantDate(formatRestaurantDate());

    // Update interval
    const interval = setInterval(() => {
      setRestaurantTime(formatRestaurantTime());
      setRestaurantDate(formatRestaurantDate());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="relative bg-obsidian text-warm-ivory border-t border-champagne-gold/20 overflow-hidden pt-20 pb-12">
      {/* Subtle ambient ember particles background */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-fire-amber/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-ember-red/20 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Tier: Live Hearth Clock & Concierge Callout */}
        <div className="glass-panel p-6 sm:p-8 rounded-card mb-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-fire-amber/15 border border-fire-amber/40 flex items-center justify-center shrink-0 shadow-fire-glow">
              <Clock className="w-6 h-6 text-fire-amber animate-pulse" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-champagne-gold">
                Hearth Time · New York
              </div>
              <div className="font-display text-2xl sm:text-3xl text-warm-ivory font-light tracking-wide">
                {restaurantTime || 'Loading Hearth Clock...'}
              </div>
              <div className="text-xs text-warm-ivory/60 mt-0.5">
                {restaurantDate} · Serving Tasting Courses
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => openReservationModal()}
              className="px-6 py-3 rounded-pill bg-champagne-gold text-obsidian text-xs uppercase tracking-wider font-semibold hover:bg-warm-ivory transition-all shadow-gold-glow flex items-center gap-2"
            >
              <span>Reserve a Table</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Middle Tier: Grid of columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-champagne-gold/20 border border-champagne-gold/50 flex items-center justify-center">
                <Flame className="w-4 h-4 text-fire-amber" />
              </div>
              <span className="font-display text-lg tracking-[0.18em] uppercase text-warm-ivory">
                Anti-Gravity
              </span>
            </div>
            <p className="text-sm text-warm-ivory/70 leading-relaxed font-light">
              Royal culinary heritage meets experimental digital theatre. Dedicated to the elemental power of fire, slow clay braising, and rare imperial ingredients.
            </p>
            <div className="flex items-center gap-2 text-xs text-champagne-gold/80">
              <Sparkles className="w-3.5 h-3.5" />
              <span>An unhurried luxury culinary sanctuary</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-champagne-gold font-medium mb-4">
              Culinary Sanctum
            </h4>
            <ul className="space-y-2.5 text-sm text-warm-ivory/70">
              <li>
                <Link href="/menu" className="hover:text-champagne-gold transition-colors flex items-center gap-1.5">
                  The Imperial Menu
                </Link>
              </li>
              <li>
                <Link href="/craft-your-dish" className="hover:text-champagne-gold transition-colors flex items-center gap-1.5 text-champagne-gold">
                  <span>Interactive Dish Customizer</span>
                </Link>
              </li>
              <li>
                <Link href="/heritage" className="hover:text-champagne-gold transition-colors flex items-center gap-1.5">
                  Heritage & Philosophy
                </Link>
              </li>
              <li>
                <Link href="/chefs-table" className="hover:text-champagne-gold transition-colors flex items-center gap-1.5">
                  Chef&apos;s Table Experience
                </Link>
              </li>
              <li>
                <Link href="/private-dining" className="hover:text-champagne-gold transition-colors flex items-center gap-1.5">
                  The Royal Diwan & Rooftop
                </Link>
              </li>
            </ul>
          </div>

          {/* Operating Hours */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-champagne-gold font-medium mb-4">
              Hours of Hearth
            </h4>
            <ul className="space-y-2 text-sm text-warm-ivory/70 font-light">
              <li>
                <div className="text-warm-ivory font-normal">Tuesday – Thursday</div>
                <div className="text-xs text-warm-ivory/60">{RESTAURANT_CONFIG.hours.tuesdayToThursday}</div>
              </li>
              <li>
                <div className="text-warm-ivory font-normal">Friday – Sunday</div>
                <div className="text-xs text-warm-ivory/60">{RESTAURANT_CONFIG.hours.fridayToSunday}</div>
              </li>
              <li>
                <div className="text-warm-ivory font-normal">Monday</div>
                <div className="text-xs text-warm-ivory/60">{RESTAURANT_CONFIG.hours.monday}</div>
              </li>
            </ul>
          </div>

          {/* Contact & Location */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-champagne-gold font-medium mb-4">
              Concierge & Sanctuary
            </h4>
            <ul className="space-y-3 text-sm text-warm-ivory/70 font-light">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-champagne-gold shrink-0 mt-0.5" />
                <span>{RESTAURANT_CONFIG.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-champagne-gold shrink-0" />
                <a href={`tel:${RESTAURANT_CONFIG.phone}`} className="hover:text-champagne-gold transition-colors">
                  {RESTAURANT_CONFIG.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-champagne-gold shrink-0" />
                <a href={`mailto:${RESTAURANT_CONFIG.email}`} className="hover:text-champagne-gold transition-colors">
                  {RESTAURANT_CONFIG.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Tier: Copyright & Disclaimers */}
        <div className="pt-8 border-t border-champagne-gold/15 flex flex-col sm:flex-row items-center justify-between text-xs text-warm-ivory/50 gap-4">
          <div>
            &copy; {new Date().getFullYear()} Anti-Gravity — The Royal Fire. All Rights Reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Dark Luxury Dining</span>
            <span className="w-1 h-1 rounded-full bg-champagne-gold/40" />
            <span>Awadhi & Rajputana Heritage</span>
            <span className="w-1 h-1 rounded-full bg-champagne-gold/40" />
            <span>Experimental Theatre</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

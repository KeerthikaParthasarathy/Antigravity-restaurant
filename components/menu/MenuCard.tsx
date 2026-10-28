'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Flame, Sparkles, ArrowUpRight, Plus } from 'lucide-react';
import { MenuItem } from '@/types/menu';
import { formatPrice } from '@/lib/formatters';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface MenuCardProps {
  dish: MenuItem;
  onInspect: (dish: MenuItem) => void;
  featuredSize?: 'normal' | 'large' | 'wide';
  displayName?: string;
  priceLabel?: string;
  heatClip?: boolean;
  videoSrc?: string;
}

export const MenuCard: React.FC<MenuCardProps> = ({ dish, onInspect, featuredSize = 'normal', displayName, priceLabel, heatClip, videoSrc }) => {
  const isLarge = featuredSize === 'large';
  const isWide = featuredSize === 'wide';

  return (
    <div
      className={`group relative rounded-card overflow-hidden bg-charcoal border border-champagne-gold/20 hover:border-champagne-gold/60 transition-all duration-500 hover:shadow-gold-glow flex flex-col ${
        isLarge
          ? 'md:col-span-2 md:row-span-2 min-h-[480px]'
          : isWide
          ? 'md:col-span-2 min-h-[320px]'
          : 'min-h-[340px]'
      }`}
    >
      {/* Background Food Image with subtle zoom */}
      <div className="relative w-full h-48 sm:h-56 md:h-64 flex-shrink-0 overflow-hidden bg-charcoal-light">
        <Image
          src={dish.image}
          alt={dish.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {videoSrc && <video className="absolute inset-0 h-full w-full object-cover opacity-70" autoPlay muted loop playsInline poster={dish.videoPoster || dish.image} aria-hidden="true"><source src={videoSrc} type="video/mp4" /></video>}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {isLarge && <Badge variant="gold" size="sm">Oversized card</Badge>}
          {heatClip && <Badge variant="charcoal" size="sm">Heat-Gauge Clip</Badge>}
          {dish.featured && (
            <Badge variant="gold" size="sm">
              <Sparkles className="w-2.5 h-2.5 mr-1 text-fire-amber" />
              Imperial Signature
            </Badge>
          )}
          {dish.dietary.slice(0, 1).map((d) => (
            <Badge key={d} variant="charcoal" size="sm">
              {d}
            </Badge>
          ))}
        </div>

        {/* Price Pill */}
        <div className="absolute top-3 right-3 z-10">
          <span className="px-3 py-1 rounded-pill bg-obsidian/85 backdrop-blur-md border border-champagne-gold/30 font-display text-sm sm:text-base text-champagne-gold font-medium">
            {priceLabel || formatPrice(dish.price)}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between">
        <div>
          <span className="text-[10px] uppercase tracking-[0.2em] text-champagne-gold/70 block mb-1">
            {dish.royalTitle}
          </span>
          <h3 className="font-display text-xl sm:text-2xl text-warm-ivory group-hover:text-champagne-gold transition-colors font-light leading-snug mb-2">
            {displayName || dish.name}
          </h3>
          <p className="text-xs sm:text-sm text-warm-ivory/70 line-clamp-2 font-light leading-relaxed mb-4">
            {dish.description}
          </p>
        </div>

        {/* Tasting Notes snippet */}
        <div className="pt-3 border-t border-champagne-gold/15 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-xs text-warm-ivory/60">
            <Flame className="w-3.5 h-3.5 text-fire-amber" />
            <span>Spice {dish.spiceLevel}/5</span>
          </div>

          <div className="flex items-center gap-2">
            {dish.customizable && (
              <Link
                href="/craft-your-dish"
                className="text-[11px] uppercase tracking-wider text-champagne-gold hover:underline flex items-center gap-1"
                onClick={(e) => e.stopPropagation()}
              >
                <span>Customize</span>
              </Link>
            )}

            <button
              onClick={() => onInspect(dish)}
              className="p-1.5 rounded-full bg-charcoal-light hover:bg-champagne-gold hover:text-obsidian text-warm-ivory transition-all border border-champagne-gold/30"
              aria-label={`Inspect ${dish.name} details`}
            >
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

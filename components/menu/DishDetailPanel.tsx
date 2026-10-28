'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Flame, Clock, Wine, Sparkles, ChefHat, ArrowRight, ShieldCheck } from 'lucide-react';
import { MenuItem } from '@/types/menu';
import { formatPrice } from '@/lib/formatters';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useReservation } from '@/hooks/useReservation';

interface DishDetailPanelProps {
  dish: MenuItem | null;
  onClose: () => void;
}

export const DishDetailPanel: React.FC<DishDetailPanelProps> = ({ dish, onClose }) => {
  const { openReservationModal } = useReservation();

  if (!dish) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="dish-detail-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-obsidian/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-charcoal border border-champagne-gold/30 rounded-modal overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-obsidian/70 border border-white/20 text-warm-ivory hover:text-champagne-gold hover:border-champagne-gold flex items-center justify-center transition-all"
          aria-label="Close dish details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Media Image Column */}
        <div className="relative md:w-1/2 h-64 md:h-auto min-h-[260px] bg-charcoal-light">
          <Image
            src={dish.image}
            alt={dish.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-charcoal" />

          {/* Badges on image */}
          <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
            {dish.dietary.map((tag) => (
              <Badge key={tag} variant="gold" size="sm">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Dish Information Column */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col overflow-y-auto">
          {/* Eyebrow Royal Title */}
          <span className="text-[11px] uppercase tracking-[0.25em] text-champagne-gold font-medium mb-1 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-fire-amber" />
            {dish.royalTitle}
          </span>

          <h3
            id="dish-detail-title"
            className="font-display text-2xl sm:text-3xl text-warm-ivory font-light leading-tight mb-2"
          >
            {dish.name}
          </h3>

          <div className="flex items-center gap-4 mb-4">
            <span className="font-display text-2xl text-champagne-gold font-medium">
              {formatPrice(dish.price)}
            </span>
            <div className="flex items-center gap-1 text-xs text-fire-amber">
              <Flame className="w-3.5 h-3.5" />
              <span>Spice Level {dish.spiceLevel}/5</span>
            </div>
            {dish.calories && (
              <span className="text-xs text-warm-ivory/50">· {dish.calories}</span>
            )}
          </div>

          <p className="text-sm text-warm-ivory/80 leading-relaxed font-light mb-5">
            {dish.description}
          </p>

          {/* Heritage Story Quote */}
          <div className="bg-charcoal-light/70 p-3.5 rounded-card border-l-2 border-champagne-gold mb-5">
            <div className="text-[10px] uppercase tracking-wider text-champagne-gold/70 font-semibold mb-1">
              Royal Heritage Origin
            </div>
            <p className="text-xs text-warm-ivory/70 italic font-light leading-relaxed">
              &ldquo;{dish.story}&rdquo;
            </p>
          </div>

          {/* Culinary Specifications */}
          <div className="space-y-2.5 mb-6 text-xs text-warm-ivory/70">
            <div className="flex items-start gap-2">
              <ChefHat className="w-4 h-4 text-champagne-gold shrink-0 mt-0.5" />
              <span>
                <strong className="text-warm-ivory">Technique:</strong> {dish.cookingMethod}
              </span>
            </div>
            <div className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-champagne-gold shrink-0 mt-0.5" />
              <span>
                <strong className="text-warm-ivory">Preparation:</strong> {dish.preparationTime}
              </span>
            </div>
            {dish.pairingWine && (
              <div className="flex items-start gap-2">
                <Wine className="w-4 h-4 text-champagne-gold shrink-0 mt-0.5" />
                <span>
                  <strong className="text-warm-ivory">Suggested Pairing:</strong> {dish.pairingWine}
                </span>
              </div>
            )}
          </div>

          {/* Tasting Notes Pills */}
          <div className="mb-6">
            <div className="text-[10px] uppercase tracking-wider text-champagne-gold/80 mb-2">
              Tasting Notes Profile
            </div>
            <div className="flex flex-wrap gap-1.5">
              {dish.tastingNotes.map((note) => (
                <span
                  key={note}
                  className="text-[10px] px-2.5 py-1 rounded-pill bg-obsidian/70 border border-champagne-gold/20 text-warm-ivory/80"
                >
                  {note}
                </span>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-auto pt-4 border-t border-champagne-gold/15 flex flex-col sm:flex-row gap-3">
            {dish.customizable ? (
              <Link href="/craft-your-dish" className="flex-1">
                <Button variant="primary" size="sm" className="w-full justify-center">
                  <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                  <span>Customize Dish</span>
                </Button>
              </Link>
            ) : (
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  onClose();
                  openReservationModal();
                }}
                className="flex-1 justify-center"
              >
                <span>Reserve for this Dish</span>
              </Button>
            )}

            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                onClose();
                openReservationModal();
              }}
              className="justify-center"
            >
              Reserve Table
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Flame, Sparkles, RotateCcw, Calendar, ArrowRight } from 'lucide-react';
import { useDishConfiguration } from '@/hooks/useDishConfiguration';
import { COOKING_STYLES, PROTEINS, INGREDIENTS, ACCOMPANIMENTS } from '@/lib/menu-data';
import { CookingStyleSelector } from '@/components/customizer/CookingStyleSelector';
import { ProteinSelector } from '@/components/customizer/ProteinSelector';
import { IngredientLayer } from '@/components/customizer/IngredientLayer';
import { PriceSummary } from '@/components/customizer/PriceSummary';
import { formatPrice } from '@/lib/formatters';
import { Button } from '@/components/ui/Button';
import { useReservation } from '@/hooks/useReservation';

// Dynamic load 3D Brass Thali Scene
const BrassThaliScene = dynamic(
  () => import('@/components/customizer/BrassThaliScene').then((m) => m.BrassThaliScene),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[360px] flex items-center justify-center text-champagne-gold/60 text-xs uppercase tracking-widest">
        Polishing Imperial Brass Thali...
      </div>
    ),
  }
);

const SPICE_LEVELS: Array<'Gentle Royalty' | 'Aromatic Warmth' | 'Royal Zest' | 'Imperial Fire'> = [
  'Gentle Royalty',
  'Aromatic Warmth',
  'Royal Zest',
  'Imperial Fire',
];

export const DishCustomizer: React.FC = () => {
  const {
    config,
    calculated,
    toggleIngredient,
    toggleAccompaniment,
    setCookingStyle,
    setProtein,
    setSpiceLevel,
    resetToDefault,
  } = useDishConfiguration();

  const { openReservationModal } = useReservation();

  return (
    <div className="relative w-full">
      {/* 3-Column Desktop Culinary Workbench Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Interactive Recipe Crafting Controls (Col 1 to 4) */}
        <div className="lg:col-span-4 space-y-8 glass-panel p-6 sm:p-7 rounded-card border border-champagne-gold/25 max-h-[85vh] overflow-y-auto">
          {/* Section Eyebrow */}
          <div className="pb-4 border-b border-champagne-gold/20">
            <span className="text-[10px] uppercase tracking-[0.25em] text-champagne-gold font-medium block">
              Culinary Workbench
            </span>
            <h3 className="font-display text-2xl text-warm-ivory font-light">
              Compose Your Imperial Feast
            </h3>
            <p className="text-xs text-warm-ivory/60 font-light mt-1">
              Select rare marinades, prime proteins, and royal garnishes.
            </p>
          </div>

          {/* 1. Cooking Style */}
          <CookingStyleSelector
            styles={COOKING_STYLES}
            selectedId={config.cookingStyleId}
            onSelect={setCookingStyle}
          />

          {/* 2. Centerpiece Protein */}
          <ProteinSelector
            proteins={PROTEINS}
            selectedId={config.proteinId}
            onSelect={setProtein}
          />

          {/* 3 & 4. Ingredients & Accompaniments */}
          <IngredientLayer
            ingredients={INGREDIENTS}
            accompaniments={ACCOMPANIMENTS}
            selectedIngredientIds={config.ingredientIds}
            selectedAccompanimentIds={config.accompanimentIds}
            onToggleIngredient={toggleIngredient}
            onToggleAccompaniment={toggleAccompaniment}
          />

          {/* 5. Spice Level Selector */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <label className="text-xs uppercase tracking-[0.2em] text-champagne-gold font-medium">
                5. Spice Intensity
              </label>
              <span className="text-[11px] text-warm-ivory/50">Awadhi Calibration</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {SPICE_LEVELS.map((level) => {
                const isSelected = config.spiceLevel === level;
                return (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setSpiceLevel(level)}
                    className={`py-2 px-3 rounded-pill text-xs transition-all border text-center ${
                      isSelected
                        ? 'bg-fire-amber/20 border-fire-amber text-warm-ivory font-medium shadow-fire-glow'
                        : 'bg-charcoal/50 border-white/10 text-warm-ivory/70 hover:border-champagne-gold/40'
                    }`}
                  >
                    {level}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Center Column: 3D Brass Thali Visual Presentation (Col 5 to 8) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center min-h-[420px] lg:min-h-[600px] relative">
          <div className="w-full h-[400px] lg:h-[540px] relative">
            <BrassThaliScene config={config} />
          </div>

          <div className="text-center mt-2 pointer-events-none">
            <span className="text-[11px] uppercase tracking-[0.2em] text-champagne-gold/70 px-4 py-1.5 rounded-pill bg-obsidian/75 border border-champagne-gold/20">
              Interactive 3D Brass Thali · Drag to inspect plating
            </span>
          </div>
        </div>

        {/* Right Column: Itemized Live Bill & Reservation Bridge (Col 9 to 12) */}
        <div className="lg:col-span-3 h-full">
          <PriceSummary
            config={config}
            calculated={calculated}
            onReset={resetToDefault}
          />
        </div>
      </div>

      {/* Mobile Sticky Bottom Summary Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-obsidian/95 backdrop-blur-lg border-t border-champagne-gold/30 p-4 flex items-center justify-between shadow-2xl">
        <div>
          <span className="text-[10px] uppercase tracking-wider text-champagne-gold block">
            Custom Creation
          </span>
          <div className="font-display text-xl text-warm-ivory">
            {formatPrice(calculated.totalPrice)}
          </div>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() =>
            openReservationModal({
              dishId: config.dishId,
              dishName: config.dishName,
              configuration: config,
              calculatedPrice: calculated.totalPrice,
              servings: 1,
            })
          }
        >
          <Calendar className="w-4 h-4 mr-1.5" />
          <span>Reserve with Dish</span>
        </Button>
      </div>
    </div>
  );
};

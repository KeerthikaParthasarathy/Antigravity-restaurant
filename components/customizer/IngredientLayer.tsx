'use client';

import React from 'react';
import { Check, Sparkles } from 'lucide-react';
import { IngredientOption, AccompanimentOption } from '@/types/dish';
import { formatPrice } from '@/lib/formatters';

interface IngredientLayerProps {
  ingredients: IngredientOption[];
  accompaniments: AccompanimentOption[];
  selectedIngredientIds: string[];
  selectedAccompanimentIds: string[];
  onToggleIngredient: (id: string) => void;
  onToggleAccompaniment: (id: string) => void;
}

export const IngredientLayer: React.FC<IngredientLayerProps> = ({
  ingredients,
  accompaniments,
  selectedIngredientIds,
  selectedAccompanimentIds,
  onToggleIngredient,
  onToggleAccompaniment,
}) => {
  return (
    <div className="space-y-6">
      {/* Rare Spices & Imperial Accents */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs uppercase tracking-[0.2em] text-champagne-gold font-medium">
            3. Rare Spices & Imperial Finishes
          </label>
          <span className="text-[11px] text-warm-ivory/50">Select additions</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {ingredients.map((ing) => {
            const isChecked = selectedIngredientIds.includes(ing.id);
            return (
              <button
                key={ing.id}
                type="button"
                onClick={() => onToggleIngredient(ing.id)}
                className={`p-3 rounded-card border text-left transition-all duration-300 flex items-center justify-between gap-2 ${
                  isChecked
                    ? 'bg-champagne-gold/20 border-champagne-gold shadow-gold-glow'
                    : 'bg-charcoal/50 border-white/10 hover:border-champagne-gold/40'
                }`}
              >
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                      isChecked
                        ? 'bg-champagne-gold border-champagne-gold text-obsidian'
                        : 'border-white/30'
                    }`}
                  >
                    {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <div className="truncate">
                    <span className="text-xs text-warm-ivory font-medium block truncate">
                      {ing.name}
                    </span>
                    <span className="text-[10px] text-warm-ivory/50 block truncate">
                      {ing.description}
                    </span>
                  </div>
                </div>

                <span className="text-xs text-champagne-gold shrink-0 font-medium">
                  +{formatPrice(ing.priceDelta)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bread & Accompaniments */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs uppercase tracking-[0.2em] text-champagne-gold font-medium">
            4. Rice / Bases & Artisanal Sides
          </label>
          <span className="text-[11px] text-warm-ivory/50">Optional</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {accompaniments.map((acc) => {
            const isChecked = selectedAccompanimentIds.includes(acc.id);
            return (
              <button
                key={acc.id}
                type="button"
                onClick={() => onToggleAccompaniment(acc.id)}
                className={`p-3 rounded-card border text-left transition-all duration-300 flex items-center justify-between gap-2 ${
                  isChecked
                    ? 'bg-champagne-gold/20 border-champagne-gold shadow-gold-glow'
                    : 'bg-charcoal/50 border-white/10 hover:border-champagne-gold/40'
                }`}
              >
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                      isChecked
                        ? 'bg-champagne-gold border-champagne-gold text-obsidian'
                        : 'border-white/30'
                    }`}
                  >
                    {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <div className="truncate">
                    <span className="text-xs text-warm-ivory font-medium block truncate">
                      {acc.name}
                    </span>
                    <span className="text-[10px] text-warm-ivory/50 block truncate">
                      {acc.description}
                    </span>
                  </div>
                </div>

                <span className="text-xs text-champagne-gold shrink-0 font-medium">
                  +{formatPrice(acc.priceDelta)}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

'use client';

import React from 'react';
import { Flame, Sparkles, Zap, Shield } from 'lucide-react';
import { CookingStyle } from '@/types/dish';
import { formatPrice } from '@/lib/formatters';

interface CookingStyleSelectorProps {
  styles: CookingStyle[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export const CookingStyleSelector: React.FC<CookingStyleSelectorProps> = ({
  styles,
  selectedId,
  onSelect,
}) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Flame':
        return <Flame className="w-4 h-4" />;
      case 'Zap':
        return <Zap className="w-4 h-4" />;
      case 'Shield':
        return <Shield className="w-4 h-4" />;
      default:
        return <Sparkles className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs uppercase tracking-[0.2em] text-champagne-gold font-medium">
          1. Heritage Cooking Method
        </label>
        <span className="text-[11px] text-warm-ivory/50">Required</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {styles.map((style) => {
          const isSelected = selectedId === style.id;
          return (
            <button
              key={style.id}
              type="button"
              onClick={() => onSelect(style.id)}
              className={`p-3.5 rounded-card border text-left transition-all duration-300 flex flex-col justify-between ${
                isSelected
                  ? 'bg-champagne-gold/15 border-champagne-gold shadow-gold-glow'
                  : 'bg-charcoal/60 border-white/10 hover:border-champagne-gold/40 hover:bg-charcoal'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span
                    className={`${
                      isSelected ? 'text-fire-amber' : 'text-champagne-gold/70'
                    }`}
                  >
                    {getIcon(style.iconName)}
                  </span>
                  <span className="font-display text-base text-warm-ivory font-light">
                    {style.name}
                  </span>
                </div>
                {style.priceDelta > 0 && (
                  <span className="text-xs text-champagne-gold font-medium">
                    +{formatPrice(style.priceDelta)}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-warm-ivory/60 leading-tight">
                {style.tagline}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

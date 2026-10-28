'use client';

import React from 'react';
import { ProteinOption } from '@/types/dish';
import { formatPrice } from '@/lib/formatters';
import { Badge } from '@/components/ui/Badge';

interface ProteinSelectorProps {
  proteins: ProteinOption[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export const ProteinSelector: React.FC<ProteinSelectorProps> = ({
  proteins,
  selectedId,
  onSelect,
}) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs uppercase tracking-[0.2em] text-champagne-gold font-medium">
          2. Select Centerpiece Protein
        </label>
        <span className="text-[11px] text-warm-ivory/50">Required</span>
      </div>

      <div className="space-y-2">
        {proteins.map((protein) => {
          const isSelected = selectedId === protein.id;
          return (
            <button
              key={protein.id}
              type="button"
              onClick={() => onSelect(protein.id)}
              className={`w-full p-3.5 rounded-card border text-left transition-all duration-300 flex items-center justify-between gap-3 ${
                isSelected
                  ? 'bg-champagne-gold/15 border-champagne-gold shadow-gold-glow'
                  : 'bg-charcoal/60 border-white/10 hover:border-champagne-gold/40 hover:bg-charcoal'
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className="w-3.5 h-3.5 rounded-full shrink-0 border border-white/30"
                  style={{ backgroundColor: protein.color }}
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-display text-base text-warm-ivory font-light">
                      {protein.name}
                    </span>
                    <Badge variant="charcoal" size="sm">
                      {protein.dietary}
                    </Badge>
                  </div>
                  <span className="text-[11px] text-warm-ivory/60 line-clamp-1">
                    {protein.source}
                  </span>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="text-xs sm:text-sm text-champagne-gold font-medium">
                  +{formatPrice(protein.priceDelta)}
                </span>
                <span className="block text-[10px] text-warm-ivory/40">
                  {protein.caloriesEstimate}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

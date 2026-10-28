'use client';

import React, { useState } from 'react';
import { Calendar, BookmarkCheck, RotateCcw, Sparkles, Check, ArrowRight } from 'lucide-react';
import { DishConfiguration, CalculatedDishPrice } from '@/types/dish';
import { formatPrice } from '@/lib/formatters';
import { Button } from '@/components/ui/Button';
import { useReservation } from '@/hooks/useReservation';

interface PriceSummaryProps {
  config: DishConfiguration;
  calculated: CalculatedDishPrice;
  onReset: () => void;
}

export const PriceSummary: React.FC<PriceSummaryProps> = ({ config, calculated, onReset }) => {
  const { openReservationModal } = useReservation();
  const [savedLocally, setSavedLocally] = useState(false);

  const totalSelectedOptionsCount =
    (config.cookingStyleId ? 1 : 0) +
    (config.proteinId ? 1 : 0) +
    config.ingredientIds.length +
    config.accompanimentIds.length;

  const handleSaveCreation = () => {
    try {
      const savedList = JSON.parse(localStorage.getItem('royal_fire_saved_dishes') || '[]');
      savedList.unshift({
        config,
        calculated,
        savedAt: new Date().toISOString(),
      });
      localStorage.setItem('royal_fire_saved_dishes', JSON.stringify(savedList.slice(0, 5)));
      setSavedLocally(true);
      setTimeout(() => setSavedLocally(false), 3000);
    } catch {
      // storage fallback
    }
  };

  const handleReserveWithDish = () => {
    openReservationModal({
      dishId: config.dishId,
      dishName: config.dishName,
      configuration: config,
      calculatedPrice: calculated.totalPrice,
      servings: 1,
    });
  };

  return (
    <div className="glass-panel p-6 sm:p-7 rounded-card border border-champagne-gold/30 shadow-2xl flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-champagne-gold/20 mb-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-champagne-gold font-medium block">
              Culinary Bill
            </span>
            <h3 className="font-display text-xl text-warm-ivory font-light">
              {config.dishName}
            </h3>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-pill bg-champagne-gold/20 border border-champagne-gold/40 text-champagne-gold">
            {totalSelectedOptionsCount} Elements
          </span>
        </div>

        {/* Itemized Breakdown List */}
        <div className="space-y-2.5 my-4 text-xs max-h-56 overflow-y-auto pr-1">
          {calculated.itemizedBreakdown.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between text-warm-ivory/70">
              <span className="truncate pr-2 font-light">{item.label}</span>
              <span className="text-warm-ivory font-medium shrink-0">
                {formatPrice(item.amount)}
              </span>
            </div>
          ))}
        </div>

        {/* Spice Level Note */}
        <div className="p-2.5 rounded-lg bg-charcoal-light/70 border border-white/5 flex items-center justify-between text-xs my-4">
          <span className="text-warm-ivory/60">Spice Infusion:</span>
          <span className="text-fire-amber font-medium">{config.spiceLevel}</span>
        </div>
      </div>

      <div>
        {/* Total Price Bar */}
        <div className="pt-4 border-t border-champagne-gold/20 mb-6">
          <div className="flex items-baseline justify-between">
            <span className="text-xs uppercase tracking-[0.2em] text-champagne-gold">
              Grand Total
            </span>
            <span className="font-display text-3xl sm:text-4xl text-champagne-gold font-medium">
              {formatPrice(calculated.totalPrice)}
            </span>
          </div>
          <p className="text-[10px] text-warm-ivory/40 text-right mt-1">
            Inclusive of culinary mastercraft & gold garnish
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5">
          <Button
            variant="primary"
            size="md"
            onClick={handleReserveWithDish}
            className="w-full justify-center shadow-gold-glow"
          >
            <Calendar className="w-4 h-4 mr-2" />
            <span>Reserve with this Dish</span>
          </Button>

          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleSaveCreation}
              className="flex-1 justify-center text-xs"
            >
              {savedLocally ? (
                <>
                  <Check className="w-3.5 h-3.5 mr-1 text-champagne-gold" />
                  <span>Saved Locally</span>
                </>
              ) : (
                <>
                  <BookmarkCheck className="w-3.5 h-3.5 mr-1" />
                  <span>Save Creation</span>
                </>
              )}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={onReset}
              className="p-2.5"
              title="Reset to default recipe"
              aria-label="Reset configuration to default"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

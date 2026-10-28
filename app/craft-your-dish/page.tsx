import React from 'react';
import { Metadata } from 'next';
import { Sparkles } from 'lucide-react';
import { DishCustomizer } from '@/components/customizer/DishCustomizer';

export const metadata: Metadata = {
  title: 'Craft Your Dish | Anti-Gravity — The Royal Fire',
  description:
    'Step into our interactive 3D brass thali workbench. Customize rare cooking methods, proteins, Kashmiri spices, and accompaniments with instant pricing.',
};

export default function CraftYourDishPage() {
  return (
    <div className="pt-28 pb-28 bg-obsidian min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-pill bg-champagne-gold/15 border border-champagne-gold/30 text-champagne-gold text-xs uppercase tracking-widest font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5 text-fire-amber" />
            Interactive 3D Workbench
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-warm-ivory font-light tracking-tight leading-[1.1] mb-3">
            The Royal Thali Atelier
          </h1>
          <p className="text-warm-ivory/70 text-sm sm:text-base font-light leading-relaxed">
            Direct our master khansamas to tailor your feast. Plated virtually upon hand-hammered imperial brass with live pricing updates and instant reservation linkage.
          </p>
        </div>

        {/* Customizer Workbench Component */}
        <DishCustomizer />
      </div>
    </div>
  );
}

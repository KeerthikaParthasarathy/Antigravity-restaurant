'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Flame, Sparkles, Filter, Search, ArrowRight, Calendar } from 'lucide-react';
import { MENU_ITEMS, MENU_CATEGORIES } from '@/lib/menu-data';
import { MenuCategory, MenuItem } from '@/types/menu';
import { MenuCard } from '@/components/menu/MenuCard';
import { DishDetailPanel } from '@/components/menu/DishDetailPanel';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { useReservation } from '@/hooks/useReservation';

export default function MenuPage() {
  const { openReservationModal } = useReservation();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDietary, setSelectedDietary] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [inspectedDish, setInspectedDish] = useState<MenuItem | null>(null);

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;
      const matchesDietary =
        selectedDietary === 'all' || item.dietary.includes(selectedDietary);
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.royalTitle.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesDietary && matchesSearch;
    });
  }, [selectedCategory, selectedDietary, searchQuery]);

  return (
    <div className="pt-28 pb-24 bg-obsidian min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-champagne-gold font-medium mb-3 block">
            Awadhi & Imperial Repertoire
          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-warm-ivory font-light tracking-tight leading-[1.1] mb-4">
            The Royal Hearth Menu
          </h1>
          <p className="text-warm-ivory/70 text-base sm:text-lg font-light leading-relaxed">
            Every dish is prepared using generational slow-fire rituals, clay handis, and noble ingredients sourced from historical spice trade routes.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="glass-panel p-5 rounded-card border border-champagne-gold/25 mb-10 space-y-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-pill text-xs uppercase tracking-wider font-medium whitespace-nowrap transition-all border ${
                selectedCategory === 'all'
                  ? 'bg-champagne-gold text-obsidian border-champagne-gold shadow-gold-glow'
                  : 'bg-charcoal/50 text-warm-ivory/70 border-white/10 hover:border-champagne-gold/40 hover:text-champagne-gold'
              }`}
            >
              All Courses ({MENU_ITEMS.length})
            </button>
            {MENU_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-pill text-xs uppercase tracking-wider font-medium whitespace-nowrap transition-all border ${
                  selectedCategory === cat.id
                    ? 'bg-champagne-gold text-obsidian border-champagne-gold shadow-gold-glow'
                    : 'bg-charcoal/50 text-warm-ivory/70 border-white/10 hover:border-champagne-gold/40 hover:text-champagne-gold'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search & Dietary Filters row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-white/10">
            {/* Search */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-warm-ivory/40 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search ingredients, spice, dish..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-charcoal border border-champagne-gold/20 rounded-pill pl-9 pr-4 py-2 text-xs text-warm-ivory focus:outline-none focus:border-champagne-gold"
              />
            </div>

            {/* Dietary Tags */}
            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
              <span className="text-[11px] uppercase tracking-wider text-warm-ivory/50 shrink-0">
                Dietary:
              </span>
              {['all', 'Halal', 'Vegetarian', 'Gluten-Free', 'Seafood'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedDietary(tag)}
                  className={`text-[11px] px-3 py-1 rounded-pill transition-all border ${
                    selectedDietary === tag
                      ? 'bg-fire-amber/20 border-fire-amber text-warm-ivory'
                      : 'border-white/10 text-warm-ivory/60 hover:text-champagne-gold'
                  }`}
                >
                  {tag === 'all' ? 'Any' : tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Menu Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 glass-panel rounded-card border border-champagne-gold/20">
            <Flame className="w-10 h-10 text-champagne-gold/40 mx-auto mb-3" />
            <h3 className="font-display text-2xl text-warm-ivory font-light mb-1">
              No dishes match your selection
            </h3>
            <p className="text-xs text-warm-ivory/60 mb-4">
              Try adjusting your dietary filter or search query.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedCategory('all');
                setSelectedDietary('all');
                setSearchQuery('');
              }}
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((dish) => (
              <MenuCard
                key={dish.id}
                dish={dish}
                onInspect={setInspectedDish}
              />
            ))}
          </div>
        )}

        {/* Customizer Callout Banner */}
        <div className="mt-16 p-8 rounded-card glass-panel border border-champagne-gold/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-[10px] uppercase tracking-[0.25em] text-champagne-gold font-medium block">
              Bespoke Culinary Experience
            </span>
            <h3 className="font-display text-2xl sm:text-3xl text-warm-ivory font-light">
              Desire a Bespoke Royal Thali?
            </h3>
            <p className="text-xs sm:text-sm text-warm-ivory/70 font-light max-w-xl">
              Use our interactive 3D brass thali workbench to select your choice of marinade, centerpiece protein, and royal finishing spices.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link href="/craft-your-dish">
              <Button variant="primary" size="md">
                <Sparkles className="w-4 h-4 mr-2" />
                <span>Craft Your Dish</span>
              </Button>
            </Link>

            <Button
              variant="outline"
              size="md"
              onClick={() => openReservationModal()}
            >
              <Calendar className="w-4 h-4 mr-2" />
              <span>Reserve Table</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Dish Detail Inspection Modal */}
      <DishDetailPanel dish={inspectedDish} onClose={() => setInspectedDish(null)} />
    </div>
  );
}

'use client';

import React from 'react';
import { Star, Quote, Sparkles } from 'lucide-react';
import { SAMPLE_REVIEWS } from '@/lib/menu-data';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Badge } from '@/components/ui/Badge';

export const VisualReviews: React.FC = () => {
  return (
    <section className="relative py-24 sm:py-32 bg-obsidian border-t border-champagne-gold/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Guest Impressions"
          title="Echoes of the Imperial Banquet"
          description="Reflections from culinary travelers, critics, and guests who have experienced our live hearth theatre."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SAMPLE_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="glass-panel p-6 sm:p-8 rounded-card border border-champagne-gold/25 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-champagne-gold">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-champagne-gold" />
                    ))}
                  </div>
                  <Badge variant="charcoal" size="sm" className="text-[9px]">
                    Concept Review
                  </Badge>
                </div>

                <Quote className="w-8 h-8 text-champagne-gold/30 mb-2" />

                <h4 className="font-display text-xl text-warm-ivory font-light mb-3">
                  {rev.title}
                </h4>

                <p className="text-xs sm:text-sm text-warm-ivory/70 leading-relaxed font-light mb-6">
                  &ldquo;{rev.content}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-champagne-gold/15 flex items-center justify-between text-xs text-warm-ivory/60">
                <div>
                  <span className="font-medium text-warm-ivory block">{rev.author}</span>
                  <span className="text-[11px] text-champagne-gold/70">{rev.occasion}</span>
                </div>
                <span className="text-[11px] text-warm-ivory/40">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

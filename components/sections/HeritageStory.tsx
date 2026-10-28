'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Flame, Sparkles, ArrowRight, ShieldCheck, Clock } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';

export const HeritageStory: React.FC = () => {
  return (
    <section className="relative py-24 sm:py-32 bg-obsidian text-warm-ivory border-t border-champagne-gold/15 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-fire-amber/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          eyebrow="Elemental Heritage"
          title="The Ancient Artistry of Fire"
          description="In royal Awadh and Rajputana, fire was never merely a heating element—it was treated as a living collaborator, measured by smoke density, ash cooling, and earthenware breathe."
          align="center"
        />

        {/* Narrative Feature Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          {/* Left Imagery Composition */}
          <div className="lg:col-span-6 relative">
            <div className="relative w-full h-[420px] sm:h-[500px] rounded-card overflow-hidden border border-champagne-gold/30 shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80"
                alt="Clay Handi sealed with heritage dough"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent" />
            </div>

            {/* Overlapping Floating Inset Card */}
            <div className="absolute -bottom-8 -right-4 sm:right-6 glass-panel p-5 sm:p-6 rounded-card border border-champagne-gold/40 max-w-xs shadow-2xl">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-fire-amber" />
                <span className="text-[10px] uppercase tracking-widest text-champagne-gold font-medium">
                  Slow-Steam Philosophy
                </span>
              </div>
              <p className="text-xs text-warm-ivory/80 leading-relaxed font-light">
                &ldquo;When the pot is sealed with dough, not a single aroma molecule can escape into the air. It returns into the marrow.&rdquo;
              </p>
            </div>
          </div>

          {/* Right Narrative Text */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-champagne-gold block font-medium">
              Awadh · Rajputana · Silk Route
            </span>

            <h3 className="font-display text-3xl sm:text-4xl text-warm-ivory font-light leading-tight">
              Where Imperial Banquets Meet Living Culinary Alchemy
            </h3>

            <p className="text-sm sm:text-base text-warm-ivory/70 font-light leading-relaxed">
              Our culinary philosophy centers on four sacred methods: <strong>Dum Pukht</strong> (steam braising sealed under wholewheat dough in clay handis), <strong>Sigri</strong> (charcoal roasting over wild tamarind wood), <strong>Tandoor</strong> (radiant high heat in pit ovens fired to 850°F), and <strong>Dhungar</strong> (capturing aromatic clove-infused ghee smoke).
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-champagne-gold/20">
              <div className="p-4 rounded-lg bg-charcoal/50 border border-white/5">
                <div className="font-display text-xl text-champagne-gold font-light mb-1">
                  Clay & Copper
                </div>
                <p className="text-xs text-warm-ivory/60 font-light">
                  Hand-thrown unglazed terracotta pots and tin-lined beaten copper degs.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-charcoal/50 border border-white/5">
                <div className="font-display text-xl text-champagne-gold font-light mb-1">
                  Wood & Stone
                </div>
                <p className="text-xs text-warm-ivory/60 font-light">
                  Aged babool and applewood charcoal providing delicate, non-acrid smoke.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Link href="/heritage">
                <Button variant="outline" size="md" className="flex items-center gap-2">
                  <span>Explore The Full Heritage Chronicle</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

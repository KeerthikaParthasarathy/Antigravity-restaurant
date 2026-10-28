'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Sparkles, ArrowRight, Calendar, Compass } from 'lucide-react';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { HeatGaugeDial } from '@/components/hero/HeatGaugeDial';
import { FireFallback } from '@/components/hero/FireFallback';
import { useReservation } from '@/hooks/useReservation';
import { useHeatState } from '@/hooks/useHeatState';

// Dynamically load RoyalVesselScene with no SSR to protect WebGL contexts
const RoyalVesselScene = dynamic(
  () => import('@/components/hero/RoyalVesselScene').then((mod) => mod.RoyalVesselScene),
  {
    ssr: false,
    loading: () => <FireFallback />,
  }
);

export const RoyalFireHero: React.FC = () => {
  const { openReservationModal } = useReservation();
  const { heatValue } = useHeatState();
  const [hasWebGlError, setHasWebGlError] = useState(false);
  const [revealPhase, setRevealPhase] = useState<number>(1);

  // 5-Phase cinematic opening sequence (progresses smoothly over 3.5 seconds)
  useEffect(() => {
    const t1 = setTimeout(() => setRevealPhase(2), 500);
    const t2 = setTimeout(() => setRevealPhase(3), 1200);
    const t3 = setTimeout(() => setRevealPhase(4), 1800);
    const t4 = setTimeout(() => setRevealPhase(5), 2500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between pt-24 pb-12 sm:pb-16 overflow-hidden bg-obsidian">
      {/* Background Heat Atmosphere Glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full pointer-events-none transition-all duration-700 blur-[150px]"
        style={{
          background: `radial-gradient(circle, rgba(242, 140, 40, ${
            0.12 + (heatValue / 100) * 0.22
          }) 0%, rgba(168, 52, 32, ${0.08 + (heatValue / 100) * 0.15}) 50%, transparent 80%)`,
        }}
      />

      {/* Main Grid Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center z-10">
        
        {/* Left Editorial Narrative Column (Phase 4 reveal) */}
        <div className="lg:col-span-5 flex flex-col items-start order-2 lg:order-1 text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: revealPhase >= 4 ? 1 : 0, y: revealPhase >= 4 ? 0 : 20 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-2 mb-4"
          >
            <Badge variant="gold" size="sm">
              <Sparkles className="w-3 h-3 mr-1 text-fire-amber" />
              Royal Culinary Theatre
            </Badge>
            <span className="text-xs uppercase tracking-[0.2em] text-champagne-gold/70 font-sans">
              Awadh · Rajputana · Silk Route | The Art of Fire.
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: revealPhase >= 4 ? 1 : 0, y: revealPhase >= 4 ? 0 : 30 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-light text-warm-ivory tracking-tight leading-[1.08] mb-6"
          >
            BORN IN FIRE.
            <span className="block italic text-champagne-gold">
              SEALED IN FLAVOUR.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: revealPhase >= 4 ? 1 : 0, y: revealPhase >= 4 ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-warm-ivory/70 text-base sm:text-lg font-light leading-relaxed mb-8 max-w-lg"
          >
            Awadh · Rajputana · Silk Route | The Art of Fire.
          </motion.p>

          {/* Action CTAs (Phase 5) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: revealPhase >= 5 ? 1 : 0, y: revealPhase >= 5 ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 w-full sm:w-auto"
          >
            <Button
              variant="primary"
              size="lg"
              onClick={() => openReservationModal()}
              className="w-full sm:w-auto shadow-gold-glow flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Reserve a Table</span>
            </Button>

            <Link href="/menu" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full justify-center">
                <span>Explore the Menu</span>
                <ArrowRight className="w-4 h-4 ml-2 text-champagne-gold" />
              </Button>
            </Link>
          </motion.div>

          {/* Sensory metrics */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: revealPhase >= 5 ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 pt-6 border-t border-champagne-gold/20 grid grid-cols-3 gap-6 w-full max-w-md"
          >
            <div>
              <div className="font-display text-2xl text-champagne-gold">850°F</div>
              <div className="text-[10px] uppercase tracking-widest text-warm-ivory/60">Tandoor Clay</div>
            </div>
            <div>
              <div className="font-display text-2xl text-champagne-gold">36 Hrs</div>
              <div className="text-[10px] uppercase tracking-widest text-warm-ivory/60">Ember Braise</div>
            </div>
            <div>
              <div className="font-display text-2xl text-champagne-gold">24k</div>
              <div className="text-[10px] uppercase tracking-widest text-warm-ivory/60">Gold Infusion</div>
            </div>
          </motion.div>
        </div>

        {/* Center 3D Royal Vessel Scene Column (Phase 2 & 3 reveal) */}
        <div className="lg:col-span-4 h-[380px] sm:h-[460px] lg:h-[520px] flex items-center justify-center relative order-1 lg:order-2">
          {hasWebGlError ? (
            <FireFallback heatValue={heatValue} />
          ) : (
            <div className="w-full h-full relative">
              <RoyalVesselScene />
              <div className="vessel-steam" aria-hidden="true"><i /><i /><i /></div>
              {heatValue > 70 && <div className="vessel-flare" aria-hidden="true"><i /><i /><i /><i /><i /><i /></div>}
              {/* Interactive prompt overlay */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 pointer-events-none text-center">
                <span className="text-[10px] uppercase tracking-[0.2em] text-champagne-gold/60 font-sans px-3 py-1 rounded-pill bg-obsidian/70 border border-champagne-gold/20">
                  Drag to rotate vessel · Modulate heat below
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Right Rotary Heat Dial Column (Phase 5 reveal) */}
        <div className="lg:col-span-3 flex flex-col items-center justify-center order-3">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: revealPhase >= 5 ? 1 : 0, scale: revealPhase >= 5 ? 1 : 0.95 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="glass-panel p-6 sm:p-7 rounded-modal border border-champagne-gold/30 shadow-2xl flex flex-col items-center"
          >
            <div className="text-center mb-3">
              <div className="text-[11px] uppercase tracking-[0.25em] text-champagne-gold font-medium">
                Live Hearth Control
              </div>
              <p className="text-xs text-warm-ivory/60 font-light mt-0.5">
                Rotate dial to adjust hearth temperature
              </p>
            </div>

            <HeatGaugeDial />
          </motion.div>
        </div>

      </div>

      {/* Bottom Scroll Prompt */}
      <div className="relative z-10 flex flex-col items-center justify-center mt-6 text-center">
        <a
          href="#cinematic-menu"
          className="group flex flex-col items-center gap-1.5 text-warm-ivory/50 hover:text-champagne-gold transition-colors text-xs uppercase tracking-[0.2em]"
        >
          <span>Descend into the Menu</span>
          <div className="w-5 h-8 rounded-pill border border-champagne-gold/40 flex items-start justify-center p-1 group-hover:border-champagne-gold">
            <div className="w-1.5 h-2 bg-champagne-gold rounded-full animate-bounce" />
          </div>
        </a>
      </div>
    </section>
  );
};

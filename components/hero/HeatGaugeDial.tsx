'use client';

import React, { useRef, useCallback } from 'react';
import { RotateCcw, Flame, Sparkles } from 'lucide-react';
import { useHeatState } from '@/hooks/useHeatState';
import { HEAT_PRESETS, angleToHeat, heatToAngle } from '@/lib/heat-controller';

export const HeatGaugeDial: React.FC = () => {
  const { heatValue, activePresetId, setHeatValue, setPreset, resetHeat, setIsDragging } =
    useHeatState();
  const dialRef = useRef<HTMLDivElement>(null);

  const currentAngle = heatToAngle(heatValue);

  // Compute pointer angle from dial center
  const handlePointerUpdate = useCallback(
    (clientX: number, clientY: number) => {
      if (!dialRef.current) return;
      const rect = dialRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = clientX - centerX;
      const dy = clientY - centerY;

      // In math, atan2(dy, dx) returns angle in radians (-PI to PI) where 0 is right (+X), PI/2 is down (+Y).
      // Convert to degrees (0 to 360) clockwise from 3 o'clock
      let deg = (Math.atan2(dy, dx) * 180) / Math.PI;
      if (deg < 0) deg += 360;

      const calculatedHeat = angleToHeat(deg);
      setHeatValue(calculatedHeat);
    },
    [setHeatValue]
  );

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    setIsDragging(true);
    handlePointerUpdate(e.clientX, e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.buttons > 0) {
      handlePointerUpdate(e.clientX, e.clientY);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    setIsDragging(false);
  };

  // Keyboard accessibility
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      setHeatValue(heatValue + 2);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      setHeatValue(heatValue - 2);
    } else if (e.key === 'PageUp') {
      e.preventDefault();
      setHeatValue(heatValue + 10);
    } else if (e.key === 'PageDown') {
      e.preventDefault();
      setHeatValue(heatValue - 10);
    } else if (e.key === 'Home') {
      e.preventDefault();
      setHeatValue(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setHeatValue(100);
    }
  };

  return (
    <div className="flex flex-col items-center select-none">
      {/* Rotary Dial Container */}
      <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center">
        {/* Background Decorative Gold Ring */}
        <div className="absolute inset-0 rounded-full border border-champagne-gold/20 shadow-2xl" />

        {/* Dial SVG Arc Track */}
        <svg
          className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
          viewBox="0 0 100 100"
        >
          {/* Background arc track (270 degrees) */}
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke="rgba(214, 184, 117, 0.15)"
            strokeWidth="3.5"
            strokeDasharray="197.9 66"
            strokeDashoffset="-33"
            strokeLinecap="round"
          />
          {/* Active heat arc progress */}
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke="url(#heatGrad)"
            strokeWidth="4"
            strokeDasharray="197.9 66"
            strokeDashoffset={197.9 * (1 - heatValue / 100) - 33}
            strokeLinecap="round"
            className="transition-all duration-75"
          />
          <defs>
            <linearGradient id="heatGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D6B875" />
              <stop offset="50%" stopColor="#F28C28" />
              <stop offset="100%" stopColor="#A83420" />
            </linearGradient>
          </defs>
        </svg>

        {/* Interactive Rotary Disc */}
        <div
          ref={dialRef}
          role="slider"
          aria-label="Hearth Heat Control Dial"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={heatValue}
          tabIndex={0}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onKeyDown={handleKeyDown}
          className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-gradient-to-br from-charcoal-light via-charcoal to-obsidian border border-champagne-gold/40 shadow-gold-glow flex flex-col items-center justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-champagne-gold transition-transform active:scale-95"
        >
          {/* Radial Pointer Needle / Indicator Nub */}
          <div
            className="absolute inset-0 pointer-events-none flex justify-center"
            style={{ transform: `rotate(${currentAngle - 270}deg)` }}
          >
            <div className="w-2.5 h-6 bg-gradient-to-t from-champagne-gold to-fire-amber rounded-full mt-2 shadow-fire-glow border border-warm-ivory/60" />
          </div>

          {/* Center Digital Readout */}
          <div className="flex flex-col items-center justify-center pointer-events-none z-10 text-center">
            <span className="text-[10px] uppercase tracking-[0.25em] text-champagne-gold/80 font-medium">
              Hearth Heat
            </span>
            <div className="flex items-baseline gap-0.5">
              <span className="font-display text-3xl sm:text-4xl text-warm-ivory font-light">
                {heatValue}
              </span>
              <span className="text-xs text-champagne-gold/80 font-sans">%</span>
            </div>
            <span className="text-[10px] text-warm-ivory/60 uppercase tracking-widest mt-0.5">
              {heatValue < 30
                ? 'Gentle Ember'
                : heatValue < 75
                ? 'Royal Dum'
                : 'Inferno Flame'}
            </span>
          </div>
        </div>
      </div>

      {/* Preset Pills Selector */}
      <div className="mt-5 flex flex-wrap items-center justify-center gap-2 max-w-sm">
        {HEAT_PRESETS.map((preset) => {
          const isSelected = activePresetId === preset.id;
          return (
            <button
              key={preset.id}
              onClick={() => setPreset(preset.id)}
              className={`px-3 py-1.5 rounded-pill text-[11px] uppercase tracking-wider font-medium transition-all duration-300 border flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-champagne-gold/20 text-warm-ivory border-champagne-gold shadow-gold-glow'
                  : 'bg-charcoal/50 text-warm-ivory/70 border-white/10 hover:border-champagne-gold/50 hover:text-champagne-gold'
              }`}
            >
              <Flame
                className={`w-3 h-3 ${
                  isSelected ? 'text-fire-amber' : 'text-warm-ivory/40'
                }`}
              />
              <span>{preset.label}</span>
            </button>
          );
        })}

        {/* Reset Button */}
        <button
          onClick={resetHeat}
          className="p-1.5 rounded-full text-warm-ivory/50 hover:text-champagne-gold hover:bg-white/5 transition-colors"
          title="Reset Hearth Heat"
          aria-label="Reset heat to default"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Active Preset Description hint */}
      <div className="mt-2 text-center text-xs text-warm-ivory/60 max-w-xs font-light italic">
        {HEAT_PRESETS.find((p) => p.id === activePresetId)?.description ||
          'Custom flame modulation active.'}
      </div>
    </div>
  );
};

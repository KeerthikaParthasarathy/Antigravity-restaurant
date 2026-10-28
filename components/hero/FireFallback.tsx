'use client';

import React from 'react';
import { Flame } from 'lucide-react';

interface FireFallbackProps {
  heatValue?: number;
}

export const FireFallback: React.FC<FireFallbackProps> = ({ heatValue = 55 }) => {
  const intensity = heatValue / 100;

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-obsidian">
      {/* Background radial glow */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full blur-[140px] transition-all duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(circle, rgba(242, 140, 40, ${0.25 * intensity}) 0%, rgba(168, 52, 32, ${0.15 * intensity}) 60%, transparent 100%)`,
        }}
      />

      {/* Styled Artisanal Fallback Vessel Silhouette */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
          {/* Outer glowing aura */}
          <div
            className="absolute inset-0 rounded-full border border-champagne-gold/30 animate-pulse transition-opacity duration-500"
            style={{ opacity: 0.3 + intensity * 0.7 }}
          />

          {/* Handcrafted Vessel SVG */}
          <svg
            viewBox="0 0 200 200"
            className="w-full h-full drop-shadow-2xl transition-transform duration-700 hover:scale-105"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Base Glow */}
            <defs>
              <radialGradient id="vesselLid" cx="50%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#D6B875" />
                <stop offset="60%" stopColor="#8F7848" />
                <stop offset="100%" stopColor="#43351A" />
              </radialGradient>
              <linearGradient id="ceramicBody" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#252422" />
                <stop offset="50%" stopColor="#151413" />
                <stop offset="100%" stopColor="#0B0B0B" />
              </linearGradient>
              <radialGradient id="flameGlow" cx="50%" cy="80%" r="50%">
                <stop offset="0%" stopColor="#F28C28" stopOpacity={0.8 * intensity} />
                <stop offset="70%" stopColor="#A83420" stopOpacity={0.4 * intensity} />
                <stop offset="100%" stopColor="#090909" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Fire underglow */}
            <circle cx="100" cy="155" r="45" fill="url(#flameGlow)" />

            {/* Royal Ceramic Handi Body */}
            <path
              d="M40 95 C35 140, 55 165, 100 165 C145 165, 165 140, 160 95 C150 90, 50 90, 40 95 Z"
              fill="url(#ceramicBody)"
              stroke="#D6B875"
              strokeWidth="1.5"
              strokeOpacity="0.4"
            />

            {/* Royal Motifs Engraving Lines */}
            <path
              d="M60 120 Q100 135 140 120"
              stroke="#D6B875"
              strokeWidth="1"
              strokeDasharray="2 3"
              strokeOpacity="0.6"
            />
            <path
              d="M70 140 Q100 150 130 140"
              stroke="#D6B875"
              strokeWidth="0.8"
              strokeOpacity="0.5"
            />

            {/* Hammered Copper & Brass Lid */}
            <path
              d="M45 92 C45 65, 155 65, 155 92 Z"
              fill="url(#vesselLid)"
              stroke="#F4EFE5"
              strokeWidth="0.8"
              strokeOpacity="0.6"
            />

            {/* Finial / Crown Knob */}
            <circle cx="100" cy="55" r="8" fill="#D6B875" />
            <path d="M96 55 L100 42 L104 55 Z" fill="#F4EFE5" />

            {/* Brass Handles */}
            <path
              d="M38 100 C20 100, 20 120, 42 125"
              stroke="#D6B875"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M162 100 C180 100, 180 120, 158 125"
              stroke="#D6B875"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Floating Embers animation simulation */}
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-champagne-gold/70 mt-4">
          <Flame className="w-4 h-4 text-fire-amber animate-bounce" />
          <span>Hearth Embers Active · {heatValue}% Intensity</span>
        </div>
      </div>
    </div>
  );
};

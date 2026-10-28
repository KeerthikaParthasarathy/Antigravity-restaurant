import React from 'react';
import { Flame } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ message = 'Awakening the Royal Embers...' }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center min-h-[240px]">
      <div className="relative mb-6">
        <div className="w-16 h-16 rounded-full border border-champagne-gold/30 animate-ping absolute inset-0" />
        <div className="w-16 h-16 rounded-full bg-charcoal border border-champagne-gold/60 flex items-center justify-center shadow-gold-glow">
          <Flame className="w-8 h-8 text-fire-amber animate-pulse" />
        </div>
      </div>
      <p className="font-display text-xl text-warm-ivory tracking-wide">{message}</p>
      <span className="text-xs uppercase tracking-widest text-champagne-gold/70 mt-2">Anti-Gravity — The Royal Fire</span>
    </div>
  );
};

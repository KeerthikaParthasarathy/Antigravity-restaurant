import React from 'react';
import { clsx } from 'clsx';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'gold' | 'amber' | 'ember' | 'charcoal' | 'outline';
  className?: string;
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'gold',
  className,
  size = 'md',
}) => {
  const baseStyles = 'inline-flex items-center font-medium uppercase tracking-wider rounded-full transition-colors';

  const sizeStyles = {
    sm: 'text-[10px] px-2.5 py-0.5',
    md: 'text-xs px-3 py-1',
  };

  const variantStyles = {
    gold: 'bg-champagne-gold/15 text-champagne-gold border border-champagne-gold/30',
    amber: 'bg-fire-amber/15 text-fire-amber border border-fire-amber/30',
    ember: 'bg-ember-red/20 text-warm-ivory border border-ember-red/40',
    charcoal: 'bg-charcoal text-warm-ivory/80 border border-white/10',
    outline: 'border border-champagne-gold/40 text-champagne-gold/90 bg-transparent',
  };

  return (
    <span className={clsx(baseStyles, sizeStyles[size], variantStyles[variant], className)}>
      {children}
    </span>
  );
};

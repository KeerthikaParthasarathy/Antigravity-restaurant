import React from 'react';
import { clsx } from 'clsx';

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  intensity?: 'subtle' | 'medium' | 'deep';
  borderGlow?: boolean;
}

export const GlassPanel: React.FC<GlassPanelProps> = ({
  children,
  className,
  intensity = 'medium',
  borderGlow = false,
  ...props
}) => {
  const intensityStyles = {
    subtle: 'bg-charcoal/60 backdrop-blur-md border border-champagne-gold/15',
    medium: 'bg-charcoal/80 backdrop-blur-lg border border-champagne-gold/25',
    deep: 'bg-obsidian/90 backdrop-blur-xl border border-champagne-gold/30',
  };

  return (
    <div
      className={clsx(
        'rounded-card transition-all duration-300 relative',
        intensityStyles[intensity],
        borderGlow && 'hover:border-champagne-gold/60 hover:shadow-gold-glow',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

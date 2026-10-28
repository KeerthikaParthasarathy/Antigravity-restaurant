import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'fire' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, disabled, children, ...props }, ref) => {
    const baseStyles =
      'relative inline-flex items-center justify-center font-medium tracking-wider uppercase transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne-gold focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] select-none';

    const sizeStyles = {
      sm: 'text-xs px-4 py-2 rounded-pill gap-1.5',
      md: 'text-xs sm:text-sm px-6 py-3 rounded-pill gap-2',
      lg: 'text-sm sm:text-base px-8 py-4 rounded-pill gap-2.5',
    };

    const variantStyles = {
      primary:
        'bg-champagne-gold text-obsidian font-semibold hover:bg-warm-ivory shadow-gold-glow hover:shadow-lg',
      secondary:
        'bg-charcoal text-warm-ivory border border-champagne-gold/30 hover:border-champagne-gold hover:bg-charcoal-light',
      outline:
        'bg-transparent text-champagne-gold border border-champagne-gold/50 hover:bg-champagne-gold/10 hover:border-champagne-gold',
      fire:
        'bg-gradient-to-r from-fire-amber to-ember-red text-warm-ivory font-semibold shadow-fire-glow hover:brightness-110',
      ghost:
        'bg-transparent text-warm-ivory/80 hover:text-champagne-gold hover:bg-white/5',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={clsx(baseStyles, sizeStyles[size], variantStyles[variant], className)}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin text-current" />}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

import React from 'react';
import { clsx } from 'clsx';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  description,
  align = 'center',
  className,
}) => {
  const alignmentStyles = {
    left: 'text-left items-start',
    center: 'text-center items-center mx-auto',
    right: 'text-right items-end ml-auto',
  };

  return (
    <div className={clsx('flex flex-col max-w-3xl mb-12 sm:mb-16', alignmentStyles[align], className)}>
      {eyebrow && (
        <span className="text-xs uppercase tracking-[0.25em] text-champagne-gold/90 font-medium mb-3 flex items-center gap-2">
          <span className="w-6 h-[1px] bg-champagne-gold/50" />
          {eyebrow}
          <span className="w-6 h-[1px] bg-champagne-gold/50" />
        </span>
      )}
      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-warm-ivory tracking-tight leading-[1.1] font-light">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-warm-ivory/70 text-base sm:text-lg font-light leading-relaxed max-w-2xl">
          {description}
        </p>
      )}
    </div>
  );
};

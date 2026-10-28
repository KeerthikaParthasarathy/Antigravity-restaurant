'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Flame, Menu as MenuIcon, X, Calendar, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useReservation } from '@/hooks/useReservation';

const NAV_LINKS = [
  { href: '/', label: 'Experience' },
  { href: '/menu', label: 'The Menu' },
  { href: '/craft-your-dish', label: 'Craft Your Dish', highlight: true },
  { href: '/heritage', label: 'Heritage' },
  { href: '/chefs-table', label: "Chef's Table" },
  { href: '/private-dining', label: 'Private Dining' },
];

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openReservationModal } = useReservation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route transition
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'py-3.5 bg-obsidian/85 backdrop-blur-md border-b border-champagne-gold/20 shadow-2xl'
            : 'py-6 bg-gradient-to-b from-obsidian/90 via-obsidian/40 to-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Wordmark */}
          <Link href="/" className="group flex items-center gap-2.5 focus:outline-none">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-champagne-gold/20 to-ember-red/30 border border-champagne-gold/50 flex items-center justify-center transition-transform group-hover:scale-105">
              <Flame className="w-4 h-4 text-fire-amber transition-colors group-hover:text-champagne-gold" />
            </div>
            <div className="flex flex-col">
              <span className="font-display tracking-[0.2em] uppercase text-sm sm:text-base font-medium text-warm-ivory group-hover:text-champagne-gold transition-colors">
                Anti-Gravity
              </span>
              <span className="text-[9px] uppercase tracking-[0.35em] text-champagne-gold/70 -mt-1 font-sans">
                The Royal Fire
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xs uppercase tracking-[0.16em] transition-all duration-300 relative py-1 flex items-center gap-1.5 ${
                    isActive
                      ? 'text-champagne-gold font-medium'
                      : 'text-warm-ivory/80 hover:text-champagne-gold'
                  }`}
                >
                  {link.highlight && (
                    <Sparkles className="w-3 h-3 text-fire-amber animate-pulse" />
                  )}
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-champagne-gold to-transparent" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <Button
              variant="primary"
              size="sm"
              onClick={() => openReservationModal()}
              className="hidden sm:inline-flex items-center gap-1.5 shadow-gold-glow"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Reserve a Table</span>
            </Button>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-warm-ivory hover:text-champagne-gold focus:outline-none focus:ring-1 focus:ring-champagne-gold"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden bg-obsidian/95 backdrop-blur-2xl flex flex-col pt-24 px-6 pb-8 transition-opacity duration-300">
          <nav className="flex flex-col gap-5 my-auto text-center">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-display text-2xl tracking-wider transition-colors py-2 flex items-center justify-center gap-2 ${
                    isActive
                      ? 'text-champagne-gold font-normal'
                      : 'text-warm-ivory/80 hover:text-champagne-gold'
                  }`}
                >
                  {link.highlight && <Sparkles className="w-4 h-4 text-fire-amber" />}
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto pt-6 border-t border-champagne-gold/20 flex flex-col gap-3">
            <Button
              variant="primary"
              size="lg"
              onClick={() => {
                setMobileMenuOpen(false);
                openReservationModal();
              }}
              className="w-full justify-center"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Reserve a Table
            </Button>
            <p className="text-center text-xs text-warm-ivory/50 tracking-wider">
              Concierge: +1 (212) 890-FIRE
            </p>
          </div>
        </div>
      )}
    </>
  );
};

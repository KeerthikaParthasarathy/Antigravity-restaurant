'use client';

import React, { useEffect, useRef } from 'react';
import {
  X,
  Calendar,
  Clock,
  Users,
  MapPin,
  Flame,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Info,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';
import { useReservation } from '@/hooks/useReservation';
import { SEATING_ZONES } from '@/lib/menu-data';
import { formatPrice } from '@/lib/formatters';
import { Button } from '@/components/ui/Button';

const TIME_SLOTS = [
  '17:30',
  '18:00',
  '18:30',
  '19:00',
  '19:30',
  '20:00',
  '20:30',
  '21:00',
  '21:30',
  '22:00',
];

const OCCASIONS = [
  'Royal Anniversary',
  'Romantic Evening',
  'Diplomatic / Executive Banquet',
  'Milestone Celebration',
  'Culinary Exploration',
];

export const ReservationModal: React.FC = () => {
  const {
    isOpen,
    currentStep,
    form,
    errors,
    attachedDishes,
    isSubmitting,
    submissionResult,
    closeReservationModal,
    setFormField,
    removeDishPreference,
    nextStep,
    prevStep,
    goToStep,
    submitReservation,
    resetReservation,
  } = useReservation();

  const modalRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeReservationModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeReservationModal]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const selectedZone = SEATING_ZONES.find((z) => z.id === form.seatingZoneId) || SEATING_ZONES[0];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="reservation-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 md:p-6 bg-obsidian/85 backdrop-blur-xl animate-fadeIn"
      onClick={closeReservationModal}
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full h-full sm:h-auto sm:max-h-[92vh] sm:max-w-3xl bg-charcoal border sm:border-champagne-gold/30 sm:rounded-modal overflow-hidden shadow-2xl flex flex-col"
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-champagne-gold/20 flex items-center justify-between shrink-0 bg-obsidian/60">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-champagne-gold/20 border border-champagne-gold/40 flex items-center justify-center">
              <Flame className="w-4 h-4 text-fire-amber" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-champagne-gold font-medium block">
                Imperial Table Reservation
              </span>
              <h2
                id="reservation-modal-title"
                className="font-display text-xl sm:text-2xl text-warm-ivory font-light"
              >
                {currentStep === 4 ? 'Reservation Registered' : 'Secure Your Sanctum'}
              </h2>
            </div>
          </div>

          <button
            onClick={closeReservationModal}
            className="w-9 h-9 rounded-full bg-charcoal-light border border-white/10 text-warm-ivory hover:text-champagne-gold hover:border-champagne-gold flex items-center justify-center transition-all"
            aria-label="Close reservation modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator (Steps 1, 2, 3) */}
        {currentStep <= 3 && (
          <div className="px-6 py-3 bg-charcoal-light/60 border-b border-champagne-gold/15 flex items-center justify-between shrink-0 text-xs">
            <div className="flex items-center gap-2">
              <button
                onClick={() => goToStep(1)}
                className={`font-medium transition-colors ${
                  currentStep === 1
                    ? 'text-champagne-gold'
                    : currentStep > 1
                    ? 'text-warm-ivory hover:text-champagne-gold'
                    : 'text-warm-ivory/40'
                }`}
              >
                1. Your Visit
              </button>
              <ChevronRight className="w-3.5 h-3.5 text-warm-ivory/30" />
              <button
                onClick={() => currentStep >= 2 && goToStep(2)}
                className={`font-medium transition-colors ${
                  currentStep === 2
                    ? 'text-champagne-gold'
                    : currentStep > 2
                    ? 'text-warm-ivory hover:text-champagne-gold'
                    : 'text-warm-ivory/40'
                }`}
              >
                2. Experience
              </button>
              <ChevronRight className="w-3.5 h-3.5 text-warm-ivory/30" />
              <button
                onClick={() => currentStep >= 3 && goToStep(3)}
                className={`font-medium transition-colors ${
                  currentStep === 3 ? 'text-champagne-gold' : 'text-warm-ivory/40'
                }`}
              >
                3. Guest Details
              </button>
            </div>

            <span className="text-[11px] text-champagne-gold/70 hidden sm:inline">
              Step {currentStep} of 3
            </span>
          </div>
        )}

        {/* Scrollable Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-grow space-y-6">
          {/* STEP 1: VISIT DETAILS */}
          {currentStep === 1 && (
            <div className="space-y-6">
              {/* Date & Time Picker */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase tracking-wider text-champagne-gold block mb-2 font-medium">
                    Date of Visit
                  </label>
                  <input
                    type="date"
                    value={form.date}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setFormField('date', e.target.value)}
                    className="w-full bg-charcoal-light border border-champagne-gold/30 rounded-lg px-4 py-3 text-warm-ivory focus:outline-none focus:border-champagne-gold text-sm"
                  />
                  {errors.date && (
                    <p className="text-xs text-ember-red mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.date}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-champagne-gold block mb-2 font-medium">
                    Preferred Seating Time
                  </label>
                  <select
                    value={form.time}
                    onChange={(e) => setFormField('time', e.target.value)}
                    className="w-full bg-charcoal-light border border-champagne-gold/30 rounded-lg px-4 py-3 text-warm-ivory focus:outline-none focus:border-champagne-gold text-sm"
                  >
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot} — Hearth Service
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Guest Count Counter */}
              <div>
                <label className="text-xs uppercase tracking-wider text-champagne-gold block mb-2 font-medium">
                  Number of Guests
                </label>
                <div className="flex items-center gap-4 bg-charcoal-light p-3 rounded-lg border border-champagne-gold/30 max-w-xs">
                  <button
                    type="button"
                    onClick={() =>
                      setFormField('guestCount', Math.max(1, form.guestCount - 1))
                    }
                    className="w-9 h-9 rounded-full bg-charcoal border border-white/20 text-warm-ivory hover:border-champagne-gold flex items-center justify-center font-bold text-lg"
                    aria-label="Decrease guest count"
                  >
                    -
                  </button>
                  <div className="flex-1 text-center font-display text-2xl text-warm-ivory">
                    {form.guestCount}{' '}
                    <span className="text-xs font-sans text-warm-ivory/60">
                      {form.guestCount === 1 ? 'Guest' : 'Guests'}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setFormField('guestCount', Math.min(12, form.guestCount + 1))
                    }
                    className="w-9 h-9 rounded-full bg-charcoal border border-white/20 text-warm-ivory hover:border-champagne-gold flex items-center justify-center font-bold text-lg"
                    aria-label="Increase guest count"
                  >
                    +
                  </button>
                </div>
                {errors.guestCount && (
                  <p className="text-xs text-ember-red mt-1">{errors.guestCount}</p>
                )}
              </div>

              {/* Seating Zone Selector */}
              <div>
                <label className="text-xs uppercase tracking-wider text-champagne-gold block mb-2 font-medium">
                  Select Atmosphere & Seating Sanctum
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {SEATING_ZONES.map((zone) => {
                    const isSelected = form.seatingZoneId === zone.id;
                    return (
                      <button
                        key={zone.id}
                        type="button"
                        onClick={() => setFormField('seatingZoneId', zone.id)}
                        className={`p-4 rounded-card border text-left transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'bg-champagne-gold/20 border-champagne-gold shadow-gold-glow'
                            : 'bg-charcoal-light/50 border-white/10 hover:border-champagne-gold/40'
                        }`}
                      >
                        <div>
                          <div className="font-display text-lg text-warm-ivory font-light mb-1">
                            {zone.name}
                          </div>
                          <span className="text-[11px] text-warm-ivory/60 block line-clamp-2 leading-snug">
                            {zone.tagline}
                          </span>
                        </div>
                        <span className="text-[10px] text-champagne-gold/80 uppercase tracking-widest mt-3 block">
                          Up to {zone.capacityMax} Guests
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: EXPERIENCE & CUSTOM DISH ATTACHMENT */}
          {currentStep === 2 && (
            <div className="space-y-6">
              {/* Selected Sanctum Summary */}
              <div className="bg-charcoal-light/70 p-4 rounded-card border border-champagne-gold/20 flex items-start gap-3">
                <MapPin className="w-5 h-5 text-champagne-gold shrink-0 mt-0.5" />
                <div>
                  <div className="font-display text-lg text-warm-ivory font-light">
                    {selectedZone.name}
                  </div>
                  <p className="text-xs text-warm-ivory/70 leading-relaxed font-light mt-0.5">
                    {selectedZone.description}
                  </p>
                  {selectedZone.minimumSpendNotice && (
                    <div className="text-[11px] text-champagne-gold/90 mt-1 italic">
                      · {selectedZone.minimumSpendNotice}
                    </div>
                  )}
                </div>
              </div>

              {/* Attached Custom Dish Banner */}
              {attachedDishes.length > 0 && (
                <div className="p-4 rounded-card bg-champagne-gold/10 border border-champagne-gold/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs uppercase tracking-wider text-champagne-gold font-medium flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-fire-amber" />
                      Attached Custom Dish Preference
                    </span>
                  </div>
                  {attachedDishes.map((dish) => (
                    <div
                      key={dish.dishId}
                      className="flex items-center justify-between text-xs text-warm-ivory/80 pt-2 border-t border-champagne-gold/15"
                    >
                      <div>
                        <span className="font-medium text-warm-ivory">{dish.dishName}</span>
                        <span className="text-[11px] text-warm-ivory/50 block">
                          Spice: {dish.configuration.spiceLevel} · {dish.configuration.ingredientIds.length} Rare Additions
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-champagne-gold font-medium">
                          {formatPrice(dish.calculatedPrice)}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeDishPreference(dish.dishId)}
                          className="text-warm-ivory/40 hover:text-ember-red text-xs"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Occasion Selection */}
              <div>
                <label className="text-xs uppercase tracking-wider text-champagne-gold block mb-2 font-medium">
                  Celebrating a Special Occasion? (Optional)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {OCCASIONS.map((occ) => {
                    const isSelected = form.occasion === occ;
                    return (
                      <button
                        key={occ}
                        type="button"
                        onClick={() => setFormField('occasion', isSelected ? '' : occ)}
                        className={`p-2.5 rounded-lg border text-xs text-center transition-all ${
                          isSelected
                            ? 'bg-champagne-gold/20 border-champagne-gold text-warm-ivory font-medium'
                            : 'bg-charcoal-light border-white/10 text-warm-ivory/70 hover:border-champagne-gold/30'
                        }`}
                      >
                        {occ}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <label className="text-xs uppercase tracking-wider text-champagne-gold block mb-2 font-medium">
                  Special Dietary or Concierge Requests
                </label>
                <textarea
                  rows={3}
                  value={form.specialRequests}
                  onChange={(e) => setFormField('specialRequests', e.target.value)}
                  placeholder="Allergies, table preferences, wine pairing interests..."
                  className="w-full bg-charcoal-light border border-champagne-gold/30 rounded-lg p-3 text-warm-ivory text-sm focus:outline-none focus:border-champagne-gold resize-none"
                />
              </div>
            </div>
          )}

          {/* STEP 3: GUEST DETAILS & REVIEW */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="text-xs uppercase tracking-wider text-champagne-gold block mb-1 font-medium">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={form.fullName}
                    onChange={(e) => setFormField('fullName', e.target.value)}
                    placeholder="Lord / Lady / First and Last Name"
                    className="w-full bg-charcoal-light border border-champagne-gold/30 rounded-lg px-4 py-2.5 text-warm-ivory text-sm focus:outline-none focus:border-champagne-gold"
                  />
                  {errors.fullName && (
                    <p className="text-xs text-ember-red mt-1">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-champagne-gold block mb-1 font-medium">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setFormField('email', e.target.value)}
                    placeholder="concierge@estate.com"
                    className="w-full bg-charcoal-light border border-champagne-gold/30 rounded-lg px-4 py-2.5 text-warm-ivory text-sm focus:outline-none focus:border-champagne-gold"
                  />
                  {errors.email && (
                    <p className="text-xs text-ember-red mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-champagne-gold block mb-1 font-medium">
                    Telephone Number *
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setFormField('phone', e.target.value)}
                    placeholder="+1 (555) 019-2834"
                    className="w-full bg-charcoal-light border border-champagne-gold/30 rounded-lg px-4 py-2.5 text-warm-ivory text-sm focus:outline-none focus:border-champagne-gold"
                  />
                  {errors.phone && (
                    <p className="text-xs text-ember-red mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>

              {/* Review Itinerary Box */}
              <div className="bg-charcoal-light p-4 rounded-card border border-champagne-gold/20 space-y-2 text-xs">
                <div className="text-[10px] uppercase tracking-widest text-champagne-gold font-semibold mb-2">
                  Reservation Summary
                </div>
                <div className="flex justify-between text-warm-ivory/80">
                  <span>Sanctum:</span>
                  <span className="text-warm-ivory font-medium">{selectedZone.name}</span>
                </div>
                <div className="flex justify-between text-warm-ivory/80">
                  <span>Date & Time:</span>
                  <span className="text-warm-ivory font-medium">
                    {form.date} at {form.time}
                  </span>
                </div>
                <div className="flex justify-between text-warm-ivory/80">
                  <span>Party Size:</span>
                  <span className="text-warm-ivory font-medium">
                    {form.guestCount} {form.guestCount === 1 ? 'Guest' : 'Guests'}
                  </span>
                </div>
                {form.occasion && (
                  <div className="flex justify-between text-warm-ivory/80">
                    <span>Occasion:</span>
                    <span className="text-champagne-gold font-medium">{form.occasion}</span>
                  </div>
                )}
              </div>

              {errors.submission && (
                <div className="p-3 rounded-lg bg-ember-red/20 border border-ember-red/50 text-xs text-warm-ivory flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-ember-red shrink-0" />
                  <span>{errors.submission}</span>
                </div>
              )}
            </div>
          )}

          {/* STEP 4: SUBMISSION CONFIRMATION */}
          {currentStep === 4 && submissionResult && (
            <div className="py-8 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-champagne-gold/20 border border-champagne-gold/50 flex items-center justify-center mx-auto shadow-gold-glow">
                <CheckCircle2 className="w-8 h-8 text-champagne-gold animate-bounce" />
              </div>

              <div>
                <span className="text-xs uppercase tracking-[0.25em] text-champagne-gold font-medium block mb-1">
                  Request Reference: {submissionResult.reservationId}
                </span>
                <h3 className="font-display text-3xl text-warm-ivory font-light mb-2">
                  Hearth Sanctum Requested
                </h3>
                <p className="text-sm text-warm-ivory/70 font-light max-w-md mx-auto leading-relaxed">
                  {submissionResult.message}
                </p>
              </div>

              {/* Status Badge & Honest Demo Notice */}
              <div className="p-4 rounded-card bg-charcoal-light border border-champagne-gold/20 max-w-md mx-auto text-left space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-warm-ivory/60">Status:</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-fire-amber/20 text-fire-amber border border-fire-amber/40 font-medium uppercase text-[10px] tracking-wider">
                    Pending Concierge Review
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-warm-ivory/60">Sanctum:</span>
                  <span className="text-warm-ivory">{selectedZone.name}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-warm-ivory/60">Time:</span>
                  <span className="text-warm-ivory">
                    {form.date} at {form.time}
                  </span>
                </div>
                <div className="pt-2 border-t border-white/10 text-[11px] text-warm-ivory/50 italic">
                  {submissionResult.isDemoNotice}
                </div>
              </div>

              <div className="flex justify-center gap-3">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => {
                    resetReservation();
                    closeReservationModal();
                  }}
                >
                  Return to Sanctuary
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        {currentStep <= 3 && (
          <div className="p-4 sm:p-6 border-t border-champagne-gold/20 flex items-center justify-between shrink-0 bg-obsidian/60">
            {currentStep > 1 ? (
              <Button
                variant="outline"
                size="sm"
                onClick={prevStep}
                disabled={isSubmitting}
                className="flex items-center gap-1.5"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </Button>
            ) : (
              <div />
            )}

            {currentStep < 3 ? (
              <Button
                variant="primary"
                size="sm"
                onClick={nextStep}
                className="flex items-center gap-1.5 ml-auto"
              >
                <span>Continue</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                variant="fire"
                size="md"
                onClick={submitReservation}
                isLoading={isSubmitting}
                className="flex items-center gap-2 ml-auto shadow-fire-glow"
              >
                <Flame className="w-4 h-4" />
                <span>Submit Reservation Request</span>
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

import { create } from 'zustand';
import { ReservationDishPreference, SeatingZone } from '@/types/reservation';
import { SEATING_ZONES } from '@/lib/menu-data';
import { submitReservationRequest, SubmitReservationResponse } from '@/lib/reservation-service';
import { reservationStep1Schema, reservationStep2Schema, reservationStep3Schema } from '@/lib/reservation-schema';

export interface ReservationFormState {
  date: string;
  time: string;
  guestCount: number;
  seatingZoneId: string;
  occasion: string;
  specialRequests: string;
  fullName: string;
  email: string;
  phone: string;
  notes: string;
}

interface ReservationStore {
  isOpen: boolean;
  currentStep: 1 | 2 | 3 | 4; // 4 is confirmation/success
  form: ReservationFormState;
  errors: Record<string, string>;
  attachedDishes: ReservationDishPreference[];
  isSubmitting: boolean;
  submissionResult: SubmitReservationResponse | null;

  // Actions
  openReservationModal: (dishPreference?: ReservationDishPreference) => void;
  closeReservationModal: () => void;
  setFormField: <K extends keyof ReservationFormState>(key: K, value: ReservationFormState[K]) => void;
  attachDishPreference: (dishPreference: ReservationDishPreference) => void;
  removeDishPreference: (dishId: string) => void;
  nextStep: () => boolean;
  prevStep: () => void;
  goToStep: (step: 1 | 2 | 3) => void;
  submitReservation: () => Promise<boolean>;
  resetReservation: () => void;
}

const DEFAULT_FORM: ReservationFormState = {
  date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
  time: '19:30',
  guestCount: 2,
  seatingZoneId: SEATING_ZONES[0].id,
  occasion: '',
  specialRequests: '',
  fullName: '',
  email: '',
  phone: '',
  notes: '',
};

export const useReservation = create<ReservationStore>((set, get) => ({
  isOpen: false,
  currentStep: 1,
  form: DEFAULT_FORM,
  errors: {},
  attachedDishes: [],
  isSubmitting: false,
  submissionResult: null,

  openReservationModal: (dishPreference?: ReservationDishPreference) => {
    set((state) => ({
      isOpen: true,
      currentStep: 1,
      errors: {},
      attachedDishes: dishPreference
        ? [...state.attachedDishes.filter((d) => d.dishId !== dishPreference.dishId), dishPreference]
        : state.attachedDishes,
    }));
  },

  closeReservationModal: () => {
    set({ isOpen: false });
  },

  setFormField: (key, value) => {
    set((state) => ({
      form: { ...state.form, [key]: value },
      errors: { ...state.errors, [key]: '' },
    }));
  },

  attachDishPreference: (dishPreference) => {
    set((state) => ({
      attachedDishes: [
        ...state.attachedDishes.filter((d) => d.dishId !== dishPreference.dishId),
        dishPreference,
      ],
    }));
  },

  removeDishPreference: (dishId) => {
    set((state) => ({
      attachedDishes: state.attachedDishes.filter((d) => d.dishId !== dishId),
    }));
  },

  nextStep: () => {
    const { currentStep, form } = get();
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      const result = reservationStep1Schema.safeParse({
        date: form.date,
        time: form.time,
        guestCount: form.guestCount,
        seatingZoneId: form.seatingZoneId,
      });

      if (!result.success) {
        result.error.issues.forEach((issue) => {
          if (issue.path[0]) newErrors[issue.path[0] as string] = issue.message;
        });
        set({ errors: newErrors });
        return false;
      }
      set({ currentStep: 2, errors: {} });
      return true;
    }

    if (currentStep === 2) {
      const result = reservationStep2Schema.safeParse({
        occasion: form.occasion,
        specialRequests: form.specialRequests,
      });

      if (!result.success) {
        result.error.issues.forEach((issue) => {
          if (issue.path[0]) newErrors[issue.path[0] as string] = issue.message;
        });
        set({ errors: newErrors });
        return false;
      }
      set({ currentStep: 3, errors: {} });
      return true;
    }

    return true;
  },

  prevStep: () => {
    const { currentStep } = get();
    if (currentStep > 1 && currentStep <= 3) {
      set({ currentStep: (currentStep - 1) as 1 | 2 | 3, errors: {} });
    }
  },

  goToStep: (step: 1 | 2 | 3) => {
    set({ currentStep: step, errors: {} });
  },

  submitReservation: async () => {
    const { form, attachedDishes } = get();

    // Validate step 3 fields
    const result = reservationStep3Schema.safeParse({
      fullName: form.fullName,
      email: form.email,
      phone: form.phone,
      notes: form.notes,
    });

    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) newErrors[issue.path[0] as string] = issue.message;
      });
      set({ errors: newErrors });
      return false;
    }

    set({ isSubmitting: true, errors: {} });

    try {
      const response = await submitReservationRequest({
        date: form.date,
        time: form.time,
        guestCount: form.guestCount,
        seatingZoneId: form.seatingZoneId,
        occasion: form.occasion,
        specialRequests: form.specialRequests,
        contact: {
          fullName: form.fullName,
          email: form.email,
          phone: form.phone,
        },
        dishPreferences: attachedDishes,
      });

      set({
        isSubmitting: false,
        submissionResult: response,
        currentStep: 4,
      });
      return true;
    } catch {
      set({
        isSubmitting: false,
        errors: { submission: 'Concierge request service encountered a temporary error. Please try again or call concierge directly.' },
      });
      return false;
    }
  },

  resetReservation: () => {
    set({
      form: DEFAULT_FORM,
      currentStep: 1,
      errors: {},
      attachedDishes: [],
      submissionResult: null,
      isSubmitting: false,
    });
  },
}));

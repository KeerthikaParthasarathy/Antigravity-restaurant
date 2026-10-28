import { z } from 'zod';

export const reservationStep1Schema = z.object({
  date: z.string().min(1, 'Please select your preferred dining date')
    .refine((val) => {
      const selected = new Date(val);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selected >= today;
    }, 'Reservation date cannot be in the past'),
  time: z.string().min(1, 'Please select your preferred dining time'),
  guestCount: z.number().int().min(1, 'At least 1 guest is required').max(12, 'For parties larger than 12, please contact our private concierge directly'),
  seatingZoneId: z.string().min(1, 'Please select your dining atmosphere'),
});

export const reservationStep2Schema = z.object({
  occasion: z.string().optional(),
  specialRequests: z.string().max(500, 'Special requests cannot exceed 500 characters').optional(),
});

export const reservationStep3Schema = z.object({
  fullName: z.string().min(2, 'Please enter your full name (at least 2 characters)'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(7, 'Please provide a valid contact telephone number'),
  notes: z.string().max(300, 'Notes cannot exceed 300 characters').optional(),
});

export const completeReservationSchema = reservationStep1Schema
  .merge(reservationStep2Schema)
  .merge(reservationStep3Schema);

export type CompleteReservationFormValues = z.infer<typeof completeReservationSchema>;

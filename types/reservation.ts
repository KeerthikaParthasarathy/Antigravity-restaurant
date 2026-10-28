import { DishConfiguration } from './dish';

export interface SeatingZone {
  id: string;
  name: string;
  tagline: string;
  description: string;
  capacityMax: number;
  minimumSpendNotice?: string;
  ambience: string;
  image: string;
}

export type ReservationStatus = 'pending' | 'confirmed' | 'failed';

export interface ReservationDishPreference {
  dishId: string;
  dishName: string;
  configuration: DishConfiguration;
  calculatedPrice: number;
  servings: number;
}

export interface ReservationRequest {
  id: string;
  date: string;
  time: string;
  guestCount: number;
  seatingZoneId: string;
  occasion?: string;
  specialRequests?: string;
  contact: {
    fullName: string;
    email: string;
    phone?: string;
  };
  dishPreferences: ReservationDishPreference[];
  status: ReservationStatus;
  createdAt: string;
  estimatedTotal?: number;
}

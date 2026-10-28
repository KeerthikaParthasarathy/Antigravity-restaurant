import { ReservationRequest } from '@/types/reservation';

export interface SubmitReservationResponse {
  success: boolean;
  reservationId: string;
  status: 'pending' | 'confirmed' | 'failed';
  message: string;
  isDemoNotice: string;
  reservation?: ReservationRequest;
}

export async function submitReservationRequest(
  requestData: Omit<ReservationRequest, 'id' | 'createdAt' | 'status'>
): Promise<SubmitReservationResponse> {
  // Simulate network request to reservation engine / concierge webhook
  await new Promise((resolve) => setTimeout(resolve, 1400));

  // Generate unique request reference
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const dateYear = new Date().getFullYear();
  const id = `RF-${dateYear}-${randomSuffix}`;

  const completeRequest: ReservationRequest = {
    ...requestData,
    id,
    createdAt: new Date().toISOString(),
    status: 'pending', // Transparently marked as pending concierge review
  };

  // Store in localStorage if in browser environment for demo retrieval
  if (typeof window !== 'undefined') {
    try {
      const existing = JSON.parse(localStorage.getItem('royal_fire_reservations') || '[]');
      existing.unshift(completeRequest);
      localStorage.setItem('royal_fire_reservations', JSON.stringify(existing.slice(0, 10)));
    } catch {
      // ignore storage limitations
    }
  }

  return {
    success: true,
    reservationId: id,
    status: 'pending',
    message: 'Your royal dining request has been registered and is pending concierge table confirmation.',
    isDemoNotice: 'Demo Notice: This request has been saved locally for review. In live production, this connects to the restaurant table management system and sends an SMS/Email notification.',
    reservation: completeRequest,
  };
}

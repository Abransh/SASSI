// Event type definitions
export interface Event {
  id: string;
  title: string;
  description: string;
  content: string | null;
  location: string;
  startDate: string;
  endDate: string;
  imageUrl: string | null;
  maxAttendees: number | null;
  price: number | null;
  requiresPayment: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  published: boolean;
  _count?: {
    registrations: number;
  };
}

export interface EventImage {
  id: string;
  eventId: string;
  imageUrl: string;
  caption: string | null;
  createdAt: string;
}

export interface Registration {
  id: string;
  eventId: string;
  userId: string;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
  paymentStatus?: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED' | 'UNPAID';
  createdAt: string;
  updatedAt: string;
  expiresAt: string | null;
}
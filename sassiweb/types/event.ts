// Event type definitions
export type EventImage = {
    id: string;
    eventId: string;
    imageUrl: string;
    caption?: string | null;
    createdAt: Date;
  };
  
  export type EventRegistration = {
    id: string;
    status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
    paymentStatus?: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED' | 'UNPAID';
    paymentId?: string | null;
    user: {
      id: string;
      name: string | null;
      email: string;
    };
  };
  
  export type Event = {
    id: string;
    title: string;
    description: string;
    content?: string | null;
    location: string;
    startDate: Date;
    endDate: Date;
    imageUrl?: string | null;
    maxAttendees?: number | null;
    price?: number | null;
    requiresPayment: boolean;
    createdAt: Date;
    updatedAt: Date;
    createdBy: string;
    published: boolean;
    _count?: {
      registrations: number;
    };
    gallery?: EventImage[];
    registrations?: EventRegistration[];
  };
import { Event, EventImage } from '@/types/event';

// Helper to get the base URL for API calls
const getBaseUrl = () => {
  // Check if we're in a browser or server environment
  if (typeof window !== 'undefined') {
    // In the browser, use relative URLs
    return '';
  }
  // In server environment, construct the absolute URL
  const url = process.env.VERCEL_URL || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  return url.includes('http') ? url : `https://${url}`;
};

/**
 * Fetch all events, optionally filtering by published status and timing
 */
export async function getEvents(options?: {
  publishedOnly?: boolean;
  past?: boolean;
  upcoming?: boolean;
}): Promise<Event[]> {
  const params = new URLSearchParams();
  
  if (options?.publishedOnly) params.set('published', 'true');
  if (options?.past) params.set('past', 'true');
  if (options?.upcoming) params.set('upcoming', 'true');
  
  const queryString = params.toString() ? `?${params.toString()}` : '';
  const baseUrl = getBaseUrl();
  
  const response = await fetch(`${baseUrl}/api/events${queryString}`, {
    method: 'GET',
    cache: 'no-store',
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch events');
  }
  
  const events = await response.json();
  
  // Convert date strings to Date objects
  return events.map((event: any) => ({
    ...event,
    startDate: new Date(event.startDate),
    endDate: new Date(event.endDate),
    createdAt: new Date(event.createdAt),
    updatedAt: new Date(event.updatedAt),
  }));
}

/**
 * Fetch a single event by ID
 */
export async function getEvent(id: string): Promise<Event> {
  const baseUrl = getBaseUrl();
  
  const response = await fetch(`${baseUrl}/api/events/${id}`, {
    method: 'GET',
    cache: 'no-store',
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch event');
  }
  
  const event = await response.json();
  
  // Convert date strings to Date objects
  return {
    ...event,
    startDate: new Date(event.startDate),
    endDate: new Date(event.endDate),
    createdAt: new Date(event.createdAt),
    updatedAt: new Date(event.updatedAt),
    gallery: event.gallery?.map((img: any) => ({
      ...img,
      createdAt: new Date(img.createdAt),
    })),
  };
}

/**
 * Register current user for an event
 */
export async function registerForEvent(eventId: string): Promise<any> {
  const baseUrl = getBaseUrl();
  
  const response = await fetch(`${baseUrl}/api/events/${eventId}/register`, {
    method: 'POST',
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to register for event');
  }
  
  return response.json();
}

/**
 * Cancel registration for an event
 */
export async function cancelRegistration(eventId: string): Promise<void> {
  const baseUrl = getBaseUrl();
  
  const response = await fetch(`${baseUrl}/api/events/${eventId}/register`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to cancel registration');
  }
}

/**
 * Create a new event (admin only)
 */
export async function createEvent(eventData: Partial<Event>): Promise<Event> {
  const baseUrl = getBaseUrl();
  
  const response = await fetch(`${baseUrl}/api/events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(eventData),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create event');
  }
  
  return response.json();
}

/**
 * Update an existing event (admin only)
 */
export async function updateEvent(id: string, eventData: Partial<Event>): Promise<Event> {
  const baseUrl = getBaseUrl();
  
  const response = await fetch(`${baseUrl}/api/events/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(eventData),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to update event');
  }
  
  return response.json();
}

/**
 * Delete an event (admin only)
 */
export async function deleteEvent(id: string): Promise<void> {
  const baseUrl = getBaseUrl();
  
  const response = await fetch(`${baseUrl}/api/events/${id}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to delete event');
  }
}

/**
 * Add an image to event gallery (admin only)
 */
export async function addEventImage(
  eventId: string,
  imageUrl: string,
  caption?: string
): Promise<EventImage> {
  const baseUrl = getBaseUrl();
  
  const response = await fetch(`${baseUrl}/api/events/${eventId}/gallery`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ imageUrl, caption }),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to add image to gallery');
  }
  
  return response.json();
}
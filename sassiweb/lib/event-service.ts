import { Event, EventImage } from '@/types/event';

// // Helper to get the base URL for API calls
// const getBaseUrl = () => {
//   // Check if we're in a browser environment
//   if (typeof window !== 'undefined') {
//     // In the browser, use relative URLs
//     return '';
//   }
  
//   // In server environment, construct the absolute URL
//   // First check NEXTAUTH_URL which is usually set to the canonical domain
//   if (process.env.NEXTAUTH_URL) {
//     return process.env.NEXTAUTH_URL;
//   }
  
//   // Check for Vercel-specific environment variables
//   if (process.env.VERCEL_URL) {
//     return `https://${process.env.VERCEL_URL}`;
//   }
  
//   // Fallback to localhost for development
//   return 'http://localhost:3000';
// };

// In lib/event-service.ts
// lib/event-service.ts - Fixed version



const getBaseUrl = () => {
  // Check if we're in a browser environment
  if (typeof window !== 'undefined') {
    // In the browser, use relative URLs
    return '';
  }
  
  // In production, use the configured URL
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }
  
  // Check for Vercel-specific environment variables
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  
  // Fallback to the NEXTAUTH_URL if configured
  if (process.env.NEXTAUTH_URL) {
    return process.env.NEXTAUTH_URL;
  }
  
  // Last resort fallback
  return 'http://localhost:3000';
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
  
  // Use absolute URL for server-side, relative for client-side
  const url = typeof window === 'undefined' 
    ? `${baseUrl}/api/events${queryString}` 
    : `/api/events${queryString}`;

  try {
    console.log(`Fetching events from: ${url}`);
    
    const response = await fetch(url, { 
      method: 'GET',
      cache: 'no-store', // Ensure we get fresh data
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      const errorText = await response.text().catch(() => 'No error details available');
      console.error(`API error response: ${response.status} - ${errorText}`);
      throw new Error(`Failed to fetch events: ${response.status}`);
    }
    
    const events = await response.json();
    console.log(`Successfully fetched ${events.length} events`);
    
    // Convert date strings to Date objects, with error handling
    return events.map((event: any) => {
      try {
        return {
          ...event,
          startDate: event.startDate ? new Date(event.startDate) : new Date(),
          endDate: event.endDate ? new Date(event.endDate) : new Date(),
          createdAt: event.createdAt ? new Date(event.createdAt) : new Date(),
          updatedAt: event.updatedAt ? new Date(event.updatedAt) : new Date(),
        };
      } catch (error) {
        console.error(`Error parsing dates for event ${event.id}:`, error);
        // Return with default dates if parsing fails
        return {
          ...event,
          startDate: new Date(),
          endDate: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      }
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    // Return empty array instead of throwing error to prevent app crash
    return [];
  }
}

/**
 * Fetch a single event by ID
 */
export async function getEvent(id: string): Promise<Event | null> {
  const baseUrl = getBaseUrl();
  
  const url = typeof window === 'undefined' 
    ? `${baseUrl}/api/events/${id}` 
    : `/api/events/${id}`;
  
  try {
    const response = await fetch(url, { 
      method: 'GET',
      cache: 'no-store'
    });
    
    if (!response.ok) {
      console.error(`Failed to fetch event ${id}: ${response.status}`);
      return null;
    }
    
    const event = await response.json();
    
    try {
      return {
        ...event,
        startDate: event.startDate ? new Date(event.startDate) : new Date(),
        endDate: event.endDate ? new Date(event.endDate) : new Date(),
        createdAt: event.createdAt ? new Date(event.createdAt) : new Date(),
        updatedAt: event.updatedAt ? new Date(event.updatedAt) : new Date(),
        gallery: event.gallery?.map((img: any) => ({
          ...img,
          createdAt: img.createdAt ? new Date(img.createdAt) : new Date(),
        })) || [],
      };
    } catch (error) {
      console.error(`Error parsing event data for ${id}:`, error);
      return null;
    }
  } catch (error) {
    console.error(`Error fetching event ${id}:`, error);
    return null;
  }
}

/**
 * Register current user for an event
 */
export async function registerForEvent(eventId: string): Promise<any> {
  const response = await fetch(`/api/events/${eventId}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
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
  // FIXED: Changed method from GET to DELETE
  const response = await fetch(`/api/events/${eventId}/register`, {
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
  const response = await fetch('/api/events', {
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
  const response = await fetch(`/api/events/${id}`, {
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
  const response = await fetch(`/api/events/${id}`, {
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
  const response = await fetch(`/api/events/${eventId}/gallery`, {
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
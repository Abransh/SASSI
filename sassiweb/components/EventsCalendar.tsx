"use client";

import { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { Event } from '@/types/event';
import { getEvents } from '@/lib/event-service';
import Link from 'next/link';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Setup the localizer for react-big-calendar
const localizer = momentLocalizer(moment);

export default function EventsCalendar() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents({ publishedOnly: true });
        setEvents(data);
      } catch (err) {
        setError('Failed to load events. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Format events for the calendar
  const calendarEvents = events.map((event) => ({
    id: event.id,
    title: event.title,
    start: new Date(event.startDate),
    end: new Date(event.endDate),
    allDay: false, // Set to true for all-day events
    resource: event, // Store the original event data
  }));

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-md">
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="h-[600px]">
        <Calendar
          localizer={localizer}
          events={calendarEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '100%' }}
          views={['month', 'week', 'day', 'agenda']}
          onSelectEvent={(event) => {
            // Navigate to event details page
            window.location.href = `/events/${event.id}`;
          }}
          eventPropGetter={(event) => {
            return {
              className: 'bg-orange-600 border-orange-700',
              style: {
                backgroundColor: '#ff6700',
                borderColor: '#e65c00',
                color: 'white',
                borderRadius: '4px',
              },
            };
          }}
          components={{
            event: ({ event }) => (
              <div className="text-sm font-medium text-white truncate p-1">
                {event.title}
              </div>
            ),
          }}
        />
      </div>
    </div>
  );
}
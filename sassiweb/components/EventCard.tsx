"use client";

import { Event } from '@/types/event';
import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, MapPin, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

type EventCardProps = {
  event: Event;
  className?: string;
  featured?: boolean;
};

export default function EventCard({ event, className, featured = false }: EventCardProps) {
  const isUpcoming = new Date(event.startDate) > new Date();
  const isPast = new Date(event.endDate) < new Date();

  // Format dates
  const formattedDate = format(new Date(event.startDate), 'MMM d, yyyy');
  const formattedTime = format(new Date(event.startDate), 'h:mm a');

  return (
    <div
      className={cn(
        "bg-white rounded-xl overflow-hidden shadow-md transition-all hover:shadow-lg",
        featured ? "md:flex" : "",
        className
      )}
    >
      {/* Event Image */}
      <div className={cn(
        "relative overflow-hidden",
        featured ? "md:w-2/5 h-64 md:h-auto" : "h-52"
      )}>
        {event.imageUrl ? (
          <Image
            src={event.imageUrl}
            alt={event.title}
            layout="fill"
            objectFit="cover"
            className="transition-transform hover:scale-105 duration-500"
          />
        ) : (
          <div className={cn(
            "w-full h-full flex items-center justify-center bg-orange-100",
            featured ? "md:h-full" : "h-52"
          )}>
            <Calendar size={48} className="text-orange-400" />
          </div>
        )}
        
        {/* Status badge */}
        {isPast && (
          <div className="absolute top-3 right-3 bg-gray-800 text-white text-xs px-2 py-1 rounded-full">
            Past
          </div>
        )}
        {isUpcoming && (
          <div className="absolute top-3 right-3 bg-green-600 text-white text-xs px-2 py-1 rounded-full">
            Upcoming
          </div>
        )}
      </div>

      {/* Event Info */}
      <div className={cn(
        "p-6",
        featured ? "md:w-3/5" : ""
      )}>
        <h3 className="text-xl font-bold mb-2 text-gray-900">{event.title}</h3>
        
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <Calendar size={16} className="mr-1" />
          <span>{formattedDate} at {formattedTime}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600 mb-4">
          <MapPin size={16} className="mr-1" />
          <span>{event.location}</span>
        </div>
        
        <p className="text-gray-700 mb-4 line-clamp-3">{event.description}</p>
        
        <div className="flex justify-between items-center">
          {event._count && (
            <div className="flex items-center text-sm text-gray-600">
              <Users size={16} className="mr-1" />
              <span>
                {event._count.registrations} 
                {event.maxAttendees && ` / ${event.maxAttendees}`} attendees
              </span>
            </div>
          )}
          
          <Link 
            href={`/events/${event.id}`}
            className="inline-flex items-center px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium rounded-md transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
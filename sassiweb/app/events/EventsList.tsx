"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { Calendar, MapPin, Users } from "lucide-react";
import { Event } from "@/types/event";

interface EventsListProps {
  upcomingEvents: Event[];
  pastEvents: Event[];
}

export default function EventsList({ upcomingEvents, pastEvents }: EventsListProps) {
  const [visiblePastEvents, setVisiblePastEvents] = useState(5);
  
  const loadMorePastEvents = () => {
    setVisiblePastEvents(prev => Math.min(prev + 5, pastEvents.length));
  };
  
  return (
    <>
      {/* Upcoming Events Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6 border-b pb-2">Upcoming Events</h2>
        
        {upcomingEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 relative">
                  {event.imageUrl ? (
                    <Image
                      src={event.imageUrl}
                      alt={event.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      style={{ objectFit: "cover" }}
                    />
                  ) : (
                    <div className="w-full h-full bg-orange-100 flex items-center justify-center">
                      <Calendar size={36} className="text-orange-400" />
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                  
                  <div 
                    className="text-gray-600 mb-4 line-clamp-2 prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: event.description }}
                  />
                  
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <span className="mr-2">
                      <Calendar size={16} />
                    </span>
                    {format(new Date(event.startDate), "MMMM d, yyyy • h:mm a")}
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <span className="mr-2">
                      <MapPin size={16} />
                    </span>
                    {event.location}
                  </div>
                  
                  {event.maxAttendees && (
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <span className="mr-2">
                        <Users size={16} />
                      </span>
                      {event._count?.registrations || 0} / {event.maxAttendees} registered
                    </div>
                  )}
                  
                  <Link 
                    href={`/events/${event.id}`}
                    className="inline-block mt-2 text-orange-600 hover:text-orange-700 font-medium"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-gray-600">
              No upcoming events at the moment. Check back soon for new events!
            </p>
          </div>
        )}
      </div>
      
      {/* Past Events Section */}
      <div>
        <h2 className="text-2xl font-bold mb-6 border-b pb-2">Past Events</h2>
        
        {pastEvents.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {pastEvents.slice(0, visiblePastEvents).map((event) => (
              <div key={event.id} className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/4 mb-3 md:mb-0 md:mr-4">
                    <div className="h-32 md:h-full w-full relative rounded-md overflow-hidden">
                      {event.imageUrl ? (
                        <Image
                          src={event.imageUrl}
                          alt={event.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 25vw"
                          style={{ objectFit: "cover" }}
                        />
                      ) : (
                        <div className="w-full h-full bg-orange-100 flex items-center justify-center">
                          <Calendar size={24} className="text-orange-400" />
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="md:w-3/4">
                    <h3 className="text-lg font-bold mb-2">{event.title}</h3>
                    
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <span className="mr-2">
                        <Calendar size={14} />
                      </span>
                      {format(new Date(event.startDate), "MMMM d, yyyy")}
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <span className="mr-2">
                        <MapPin size={14} />
                      </span>
                      {event.location}
                    </div>
                    
                    <div 
                      className="text-gray-600 text-sm mb-3 line-clamp-2 prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: event.description }}
                    />
                    
                    <Link 
                      href={`/events/${event.id}`}
                      className="inline-block text-sm text-orange-600 hover:text-orange-700 font-medium"
                    >
                      View Event →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-gray-600">
              No past events to display.
            </p>
          </div>
        )}
        
        {pastEvents.length > visiblePastEvents && (
          <div className="text-center mt-6">
            <button 
              onClick={loadMorePastEvents}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md transition-colors"
            >
              Load More Past Events
            </button>
          </div>
        )}
      </div>
    </>
  );
} 
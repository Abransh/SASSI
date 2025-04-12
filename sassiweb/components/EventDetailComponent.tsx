"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { format, parseISO } from "date-fns";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Clock, Users, CreditCard } from "lucide-react";
import { Event } from "@/types/event";

type EventDetailProps = {
  event: Event;
  isAdmin?: boolean;
  registrationStatus?: {
    isRegistered: boolean;
    status: string | null;
  } | null;
};

export default function EventDetailComponent({ 
  event, 
  isAdmin = false,
  registrationStatus
}: EventDetailProps) {
  const router = useRouter();
  
  // Format event time treating the date as UTC to prevent timezone conversion
  const formatEventTime = (dateString: string) => {
    // Parse the date string
    const date = parseISO(dateString);
    
    // Format the time in 24-hour format, treating it as UTC
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    
    return `${hours}:${minutes}`;
  };
  
  // Format event date more nicely
  const formatEventDate = (dateString: string) => {
    const date = parseISO(dateString);
    return format(date, "EEEE, MMMM d, yyyy");
  };
  
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Event Image */}
      {event.imageUrl && (
        <div className="relative w-full h-64">
          <Image 
            src={event.imageUrl} 
            alt={event.title}
            fill
            style={{ objectFit: "cover" }}
            priority
            className="w-full"
          />
        </div>
      )}
      
      {/* Event Header */}
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{event.title}</h1>
          {isAdmin && (
            <Button
              onClick={() => router.push(`/admin/events/${event.id}/edit`)}
              size="sm"
            >
              Edit Event
            </Button>
          )}
        </div>
        
        {/* Event Metadata */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="flex items-center text-gray-700">
            <Calendar className="mr-2 h-5 w-5 text-gray-600" />
            <span>{formatEventDate(event.startDate)}</span>
          </div>
          
          <div className="flex items-center text-gray-700">
            <Clock className="mr-2 h-5 w-5 text-gray-600" />
            <span>{formatEventTime(event.startDate)} hrs</span>
            {event.endDate && (
              <> - {formatEventTime(event.endDate)} hrs</>
            )}
          </div>
          
          <div className="flex items-center text-gray-700">
            <MapPin className="mr-2 h-5 w-5 text-gray-600" />
            <span>{event.location}</span>
          </div>
          
          {event.maxAttendees && (
            <div className="flex items-center text-gray-700">
              <Users className="mr-2 h-5 w-5 text-gray-600" />
              <span>Maximum {event.maxAttendees} attendees</span>
            </div>
          )}
          
          {event.price && event.price > 0 && (
            <div className="flex items-center text-gray-700">
              <CreditCard className="mr-2 h-5 w-5 text-gray-600" />
              <span>€{event.price.toFixed(2)}</span>
            </div>
          )}
        </div>
        
        {/* Event Description */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">About this event</h2>
          <div 
            className="text-gray-700"
            dangerouslySetInnerHTML={{ __html: event.description }}
          />
        </div>
        
        {/* Event Full Description (if available) */}
        {event.content && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Details</h2>
            <div 
              className="text-gray-700 prose max-w-none"
              dangerouslySetInnerHTML={{ __html: event.content }}
            />
          </div>
        )}
        
        {/* Registration Status */}
        {registrationStatus && (
          <div className="mt-6 p-4 border rounded-md">
            {registrationStatus.isRegistered ? (
              <div className="text-green-600">
                <p className="font-semibold">You're registered for this event!</p>
                <p className="text-sm">Status: {registrationStatus.status}</p>
              </div>
            ) : (
              <p>You are not registered for this event.</p>
            )}
          </div>
        )}
        
        {/* Registration button would go here, depending on your app's flow */}
        <p className="text-xs text-gray-500">
          Upload an image for this event (max 5MB)
        </p>
        <div className="space-y-2">
          <label htmlFor="maxAttendees" className="text-sm font-medium flex items-center">
            <Users size={16} className="mr-2" />
            Maximum Attendees (Optional)
          </label>
        </div>
      </div>
    </div>
  );
}
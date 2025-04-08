"use client";

import Image from "next/image";
import Link from "next/link";
import { format, isSameDay } from "date-fns";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EventGallery from "@/components/EventGallery";
import EventRegistrationButton from "@/components/EventRegistrationButton";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

type EventDetailProps = {
  event: any; // We'll use any for now, but ideally this would match your Event type
};

export default function EventDetail({ event }: EventDetailProps) {
  const { data: session } = useSession();
  const [isRegistered, setIsRegistered] = useState(false);
  const [isFull, setIsFull] = useState(false);
  const [attendeeCount, setAttendeeCount] = useState(0);

  // Check registration status and event capacity
  useEffect(() => {
    const fetchData = async () => {
      // Always check registration status when the component mounts
      // or when the user returns from payment flow
      if (session?.user) {
        try {
          const response = await fetch(`/api/events/${event.id}/register/status`);
          const data = await response.json();
          setIsRegistered(data.isRegistered);
          
          // If there's a pending registration with time remaining, show a message
          if (data.status === "PENDING" && data.expiresIn) {
            toast.info(`Your registration is pending. Please complete payment within ${data.expiresIn} minutes.`);
          }
        } catch (err) {
          console.error("Error checking registration:", err);
        }
      }
      
      // Check event capacity - only count confirmed registrations
      if (event.maxAttendees) {
        try {
          const eventResponse = await fetch(`/api/events/${event.id}`);
          if (eventResponse.ok) {
            const eventData = await eventResponse.json();
            // Only count registrations with status CONFIRMED
            const confirmedCount = eventData.registrations?.filter(
              (reg: any) => reg.status === "CONFIRMED"
            ).length || 0;
            setAttendeeCount(confirmedCount);
            setIsFull(event.maxAttendees != null && confirmedCount >= event.maxAttendees);
          }
        } catch (err) {
          console.error("Error fetching event capacity:", err);
        }
      }
    };
    
    fetchData();

    // Check for payment status in URL (returning from Stripe)
    const searchParams = new URLSearchParams(window.location.search);
    const paymentStatus = searchParams.get('payment_status');
    
    if (paymentStatus === 'canceled') {
      toast.error("Payment was cancelled. Please try again if you still want to register.");
    } else if (paymentStatus === 'success') {
      toast.success("Registration successful! Payment completed.");
    }
    
    // Clean URL by removing payment_status parameter without full page reload
    if (paymentStatus) {
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete('payment_status');
      window.history.replaceState({}, '', newUrl);
    }
  }, [event, session]);

  // Format dates
  const formattedDate = format(new Date(event.startDate), "EEEE, MMMM d, yyyy");
  const formattedStartTime = format(new Date(event.startDate), "h:mm a");
  const formattedEndTime = format(new Date(event.endDate), "h:mm a");
  const isMultiDay = !isSameDay(new Date(event.startDate), new Date(event.endDate));
  const formattedEndDate = isMultiDay ? format(new Date(event.endDate), "EEEE, MMMM d, yyyy") : "";

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/events" className="text-indigo-600 hover:text-indigo-800">
            ← Back to Events
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
            
            <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
              {event.imageUrl && (
                <div className="relative w-full h-64">
                  <Image
                    src={event.imageUrl}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              
              <div className="p-6">
                <div className="mb-4">
                  <h2 className="text-xl font-semibold mb-2">About this event</h2>
                  <p className="text-gray-700 whitespace-pre-wrap">{event.description}</p>
                </div>
                
                {event.content && (
                  <div className="mb-4">
                    <h2 className="text-xl font-semibold mb-2">Details</h2>
                    <div className="text-gray-700 prose max-w-none" dangerouslySetInnerHTML={{ __html: event.content }} />
                  </div>
                )}

                {/* Registration Section */}
                <div className="mt-8">
                  <h2 className="text-xl font-semibold mb-4">Registration</h2>
                  {!session ? (
                    <div>
                      <p className="mb-4 text-gray-700">Please sign in to register for this event.</p>
                      <Link 
                        href={`/auth/signin?callbackUrl=/events/${event.id}`}
                        className="w-full block text-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded"
                      >
                        Sign In
                      </Link>
                    </div>
                  ) : (
                    <div>
                      <EventRegistrationButton 
                        eventId={event.id} 
                        isPaid={!!event.price && event.price > 0} 
                        isFull={isFull}
                        price={event.price || 0}
                      />
                      
                      {isRegistered && (
                        <p className="mt-4 text-sm text-gray-600">
                          You are registered for this event. You'll receive updates via email.
                        </p>
                      )}
                      
                      {!isRegistered && !isFull && (
                        <p className="mt-4 text-sm text-gray-600">
                          {event.price && event.price > 0 
                            ? 'Registration requires payment which can be made securely via credit card.' 
                            : 'Registration is free and only takes a moment.'}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Photo Gallery */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Event Photos</h2>
              <p className="text-gray-600 mb-4">The Google Drive link will be posted after the event.</p>
              <EventGallery eventId={event.id} />
            </div>
          </div>
          
          <div>
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Event Information</h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <Calendar className="w-5 h-5 mr-3 text-indigo-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Date</p>
                    <p className="text-gray-600">{formattedDate}</p>
                    {isMultiDay && <p className="text-gray-600">to {formattedEndDate}</p>}
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="w-5 h-5 mr-3 text-indigo-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Time</p>
                    <p className="text-gray-600">{formattedStartTime} - {formattedEndTime}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 mr-3 text-indigo-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Location</p>
                    <a 
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-800 hover:underline"
                    >
                      {event.location}
                    </a>
                  </div>
                </div>
                
                {event.maxAttendees && (
                  <div className="flex items-start">
                    <Users className="w-5 h-5 mr-3 text-indigo-600 mt-0.5" />
                    <div>
                      <p className="font-medium">Capacity</p>
                      <p className="text-gray-600">
                        {attendeeCount} / {event.maxAttendees} registered
                      </p>
                    </div>
                  </div>
                )}
                
                {event.price !== null && event.price > 0 && (
                  <div className="flex items-start">
                    <span className="text-xl mr-3 text-indigo-600">€</span>
                    <div>
                      <p className="font-medium">Registration Fee</p>
                      <p className="text-gray-600">€{event.price.toFixed(2)}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
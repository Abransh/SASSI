export const dynamic = 'force-dynamic';

import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { format, isSameDay } from "date-fns";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { getEvent } from "@/lib/event-service";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EventGallery from "@/components/EventGallery";
import EventRegistrationButton from "@/components/EventRegistrationButton";
import { authOptions } from "@/lib/auth";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";

interface EventPageProps {
  params: { id: string };
}

// Generate metadata for the page
export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { id } = params;
  const event = await getEvent(id);
  if (!event) {
    return {
      title: "Event Not Found - SASSI Milan",
    };
  }
  return {
    title: `${event.title} - SASSI Milan Events`,
    description: event.description,
  };
}

export default async function EventPage({ params }: EventPageProps) {
  const { id } = params;
  const session = await getServerSession(authOptions);
  
  const event = await getEvent(id);
  if (!event) {
    notFound();
  }
  
  // Check if user is registered
  let isRegistered = false;
  if (session) {
    try {
      const registration = await prisma.registration.findUnique({
        where: {
          eventId_userId: {
            eventId: id,
            userId: session.user.id as string,
          },
        },
      });
      
      // Only consider as registered if:
      // 1. Registration exists
      // 2. Status is not CANCELLED
      // 3. If status is PENDING, check it's not expired
      if (registration && registration.status !== "CANCELLED") {
        if (registration.status === "PENDING" && registration.expiresAt) {
          // If it's a pending registration, check if it's expired
          const now = new Date();
          const expiryDate = new Date(registration.expiresAt);
          isRegistered = now < expiryDate;
          
          // If expired, update the registration status in the database
          if (!isRegistered && now > expiryDate) {
            try {
              await prisma.registration.update({
                where: { id: registration.id },
                data: { status: "CANCELLED" }
              });
              console.log(`Expired registration ${registration.id} marked as cancelled`);
            } catch (updateError) {
              console.error("Error updating expired registration:", updateError);
            }
          }
        } else {
          // For CONFIRMED registrations
          isRegistered = true;
        }
      }
    } catch (error) {
      console.error("Error checking registration status:", error);
      // Continue with isRegistered = false
    }
  }
  
  // Check if event is full
  let attendeeCount = 0;
  let isFull = false;
  
  try {
    attendeeCount = await prisma.registration.count({
      where: {
        eventId: id,
        status: "CONFIRMED",
      },
    });
    
    isFull = event.maxAttendees != null && attendeeCount >= event.maxAttendees;
  } catch (error) {
    console.error("Error checking attendance count:", error);
    // Continue with default values
  }
  
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
              </div>
            </div>
            
            {/* Photo Gallery */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Event Photos</h2>
              <EventGallery eventId={id} />
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
                    <p className="text-gray-600">{event.location}</p>
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
                
                {event.price !== null && (
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
            
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Registration</h2>
              
              {!session ? (
                <div>
                  <p className="mb-4 text-gray-700">Please sign in to register for this event.</p>
                  <Link 
                    href={`/login?callbackUrl=/events/${id}`}
                    className="w-full block text-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded"
                  >
                    Sign In
                  </Link>
                </div>
              ) : (
                <div>
                  {isRegistered ? (
                    <p className="mb-4 text-green-700">You are registered for this event.</p>
                  ) : isFull ? (
                    <p className="mb-4 text-red-700">This event is at full capacity.</p>
                  ) : (
                    <p className="mb-4 text-gray-700">
                      {event.price ? 'Registration requires payment.' : 'Registration is free.'}
                    </p>
                  )}
                  
                  <EventRegistrationButton 
                    eventId={id} 
                    isRegistered={isRegistered} 
                    isPaid={!!event.price} 
                    isFull={isFull} 
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
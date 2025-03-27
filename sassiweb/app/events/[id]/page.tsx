export const dynamic = 'force-dynamic';

import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { getEvent } from "@/lib/event-service";
import Header from "@/components/Header";
import MobileMenu from "@/components/MobileMenu";
import Footer from "@/components/Footer";
import PhotoGallery from "@/components/PhotoGallery";
import EventRegistrationButton from "./EventRegistrationButton";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { redirect, notFound } from "next/navigation";
import { getServerSession } from "next-auth/next";



// Generate metadata for the page

export async function generateMetadata(props: any): Promise<Metadata> {
  try {
    const event = await getEvent(props.params.id);
    
    return {
      title: `${event.title} - SASSI Events`,
      description: event.description,
    };
  } catch (error) {
    return {
      title: "Event - Students' Association of Indians in Milan",
      description: "Event details for SASSI",
    };
  }
}

export default async function EventPage(props: any) {
  const { params, searchParams } = props;

  // Check authentication or perform other logic if needed
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/auth/signin");
  }

  // Fetch the event based on params.id
  let event;
  try {
    event = await getEvent(params.id);
  } catch (error) {
    notFound();
  }
  
  const isPastEvent = new Date(event.endDate) < new Date();
  const formattedStartDate = format(new Date(event.startDate), "EEEE, MMMM d, yyyy");
  const formattedStartTime = format(new Date(event.startDate), "h:mm a");
  const formattedEndTime = format(new Date(event.endDate), "h:mm a");
  
  // Check if it's a multi-day event
  const isMultiDay = !isSameDay(new Date(event.startDate), new Date(event.endDate));
  const formattedEndDate = isMultiDay ? format(new Date(event.endDate), "EEEE, MMMM d, yyyy") : "";
  
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <MobileMenu />

      {/* Event Details */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Event Header */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{event.title}</h1>
              
              <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
                <div className="flex items-center">
                  <Calendar size={16} className="mr-1" />
                  <span>{formattedStartDate}</span>
                  {isMultiDay && <span> - {formattedEndDate}</span>}
                </div>
                
                <div className="flex items-center">
                  <Clock size={16} className="mr-1" />
                  <span>{formattedStartTime} - {formattedEndTime}</span>
                </div>
                
                <div className="flex items-center">
                  <MapPin size={16} className="mr-1" />
                  <span>{event.location}</span>
                </div>
                
                {event._count && (
                  <div className="flex items-center">
                    <Users size={16} className="mr-1" />
                    <span>
                      {event._count.registrations} 
                      {event.maxAttendees ? ` / ${event.maxAttendees}` : ""} attending
                    </span>
                  </div>
                )}
              </div>
              
              {!isPastEvent && <EventRegistrationButton eventId={event.id} />}
              
              {isPastEvent && (
                <div className="inline-block px-4 py-2 bg-gray-200 text-gray-700 rounded-md">
                  This event has already taken place
                </div>
              )}
            </div>
            
            {/* Event Image */}
            <div className="mb-8 rounded-xl overflow-hidden shadow-md">
              {event.imageUrl ? (
                <div className="w-full h-[400px] relative">
                  <Image
                    src={event.imageUrl}
                    alt={event.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
              ) : (
                <div className="w-full h-[400px] bg-orange-100 flex items-center justify-center">
                  <Calendar size={64} className="text-orange-400" />
                </div>
              )}
            </div>
            
            {/* Event Description */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4">About This Event</h2>
              <p className="text-gray-700 mb-6 whitespace-pre-line">{event.description}</p>
              
              {event.content && (
                <div className="prose max-w-none">
                  {event.content}
                </div>
              )}
            </div>
            
            {/* Photo Gallery for Past Events */}
            {isPastEvent && event.gallery && event.gallery.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Event Gallery</h2>
                <PhotoGallery images={event.gallery} />
              </div>
            )}
            
            {/* Back Button */}
            <div className="mt-8">
              <Link 
                href="/events" 
                className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700"
              >
                ← Back to Events
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

// Helper to check if two dates are the same day
function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}
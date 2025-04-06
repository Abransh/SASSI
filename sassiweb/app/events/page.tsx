export const dynamic = 'force-dynamic';

import { Metadata } from "next";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { getEvents } from "@/lib/event-service";
import Header from "@/components/Header";
import MobileMenu from "@/components/MobileMenu";
import Footer from "@/components/Footer";
import { Calendar, MapPin, Users } from "lucide-react";
import EventsList from "./EventsList";

export const metadata: Metadata = {
  title: "Events | SASSI Milano",
  description: "Discover upcoming and past events organized by SASSI Milano for the Indian student community.",
};

export default async function EventsPage() {
  // Fetch upcoming events
  const upcomingEvents = await getEvents({ 
    publishedOnly: true,
    upcoming: true 
  });

  // Fetch past events
  const pastEvents = await getEvents({ 
    publishedOnly: true,
    past: true 
  });
  
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <MobileMenu />

      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">Events</h1>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Join our community gatherings, cultural celebrations, and networking opportunities throughout the year.
            </p>
            
            {/* Use client component to handle the events display and pagination */}
            <EventsList upcomingEvents={upcomingEvents} pastEvents={pastEvents} />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
import { Metadata } from "next";
import Link from "next/link";
import { getEvents } from "@/lib/event-service";
import Header from "@/components/Header";
import MobileMenu from "@/components/MobileMenu";
import Footer from "@/components/Footer";
import EventCard from "@/components/EventCard";
import EventsCalendar from "@/components/EventsCalendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "Events - Students' Association of Indians in Milan",
  description: "Discover upcoming events, cultural celebrations, workshops, and social gatherings organized by SASSI in Milan",
};

export default async function EventsPage() {
  // Fetch events on the server
  const upcomingEvents = await getEvents({ 
    publishedOnly: true,
    upcoming: true 
  });
  
  const pastEvents = await getEvents({ 
    publishedOnly: true,
    past: true 
  });

  // Get featured event (first upcoming or most recent past)
  const featuredEvent = upcomingEvents.length > 0 
    ? upcomingEvents[0] 
    : pastEvents.length > 0 
      ? pastEvents[0] 
      : null;

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <MobileMenu />

      {/* Hero/Banner Section */}
      <section className="pt-32 pb-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">SASSI Events</h1>
            <p className="text-lg md:text-xl mb-8 text-gray-300">
              Join us for cultural celebrations, networking opportunities, and community building.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          {/* Featured Event Section */}
          {featuredEvent && (
            <div className="mb-16">
              <h2 className="text-3xl font-bold mb-8 text-center">Featured Event</h2>
              <EventCard event={featuredEvent} featured={true} />
            </div>
          )}

          {/* Events Tabs */}
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
              <TabsTrigger value="past">Past Events</TabsTrigger>
              <TabsTrigger value="calendar">Calendar View</TabsTrigger>
            </TabsList>
            
            {/* Upcoming Events Tab */}
            <TabsContent value="upcoming" className="space-y-6">
              {upcomingEvents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {upcomingEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-600 mb-6">No upcoming events scheduled at the moment.</p>
                  <p className="text-gray-600">Check back soon or subscribe to our newsletter for updates!</p>
                </div>
              )}
            </TabsContent>
            
            {/* Past Events Tab */}
            <TabsContent value="past" className="space-y-6">
              {pastEvents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pastEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-600">No past events to display.</p>
                </div>
              )}
            </TabsContent>
            
            {/* Calendar Tab */}
            <TabsContent value="calendar">
              <div className="bg-white rounded-xl shadow p-6">
                <EventsCalendar />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </main>
  );
}
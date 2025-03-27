export const dynamic = 'force-dynamic';

import { Metadata } from "next";
import Link from "next/link";
import { getEvents } from "@/lib/event-service";
import Header from "@/components/Header";
import MobileMenu from "@/components/MobileMenu";
import Footer from "@/components/Footer";
import EventCard from "@/components/EventCard";
import EventsCalendar from "@/components/EventsCalendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Filter, Search } from "lucide-react";

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

  // Count of total events for displaying
  const upcomingCount = upcomingEvents.length;
  const pastCount = pastEvents.length;
  const totalCount = upcomingCount + pastCount;

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <MobileMenu />

      {/* Hero/Banner Section with gradient background */}
      <section className="pt-32 pb-16 bg-gradient-to-r from-orange-600 to-yellow-500 text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-300 rounded-full opacity-20 -translate-y-1/2 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-700 rounded-full opacity-20 translate-y-1/2 -translate-x-1/3"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center mb-4 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <Calendar className="mr-2 h-5 w-5" />
              <span className="text-sm font-medium">{totalCount} Events Available</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6">SASSI Events</h1>
            <p className="text-lg md:text-xl mb-8 text-white/90">
              Join us for cultural celebrations, networking opportunities, and community building.
            </p>
            
            {/* Search bar (decorative for now) */}
            <div className="relative max-w-lg mx-auto">
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg p-1">
                <div className="flex-grow flex items-center bg-white rounded-md px-4 py-2">
                  <Search className="h-5 w-5 text-gray-400 mr-2" />
                  <input 
                    type="text" 
                    placeholder="Search for events..." 
                    className="bg-transparent border-none outline-none w-full text-gray-800"
                  />
                </div>
                <button className="ml-2 bg-white text-orange-600 px-4 py-2 rounded-md font-medium flex items-center">
                  <Filter className="h-4 w-4 mr-1" />
                  Filter
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          {/* Featured Event Section */}
          {featuredEvent && (
            <div className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold">Featured Event</h2>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-orange-600" />
                  <span className="text-sm text-gray-600">Updated recently</span>
                </div>
              </div>
              <EventCard event={featuredEvent} featured={true} />
            </div>
          )}

          {/* Events Tabs */}
          <Tabs defaultValue="upcoming" className="w-full">
            <div className="relative mb-8">
              <TabsList className="grid w-full grid-cols-3 p-1 rounded-xl bg-gray-100">
                <TabsTrigger 
                  value="upcoming" 
                  className="rounded-lg py-3 data-[state=active]:bg-white data-[state=active]:text-orange-600 data-[state=active]:shadow-sm transition-all"
                >
                  Upcoming Events
                  {upcomingCount > 0 && (
                    <span className="ml-2 bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full text-xs">
                      {upcomingCount}
                    </span>
                  )}
                </TabsTrigger>
                <TabsTrigger 
                  value="past"
                  className="rounded-lg py-3 data-[state=active]:bg-white data-[state=active]:text-orange-600 data-[state=active]:shadow-sm transition-all"
                >
                  Past Events
                  {pastCount > 0 && (
                    <span className="ml-2 bg-gray-200 text-gray-800 px-2 py-0.5 rounded-full text-xs">
                      {pastCount}
                    </span>
                  )}
                </TabsTrigger>
                <TabsTrigger 
                  value="calendar"
                  className="rounded-lg py-3 data-[state=active]:bg-white data-[state=active]:text-orange-600 data-[state=active]:shadow-sm transition-all"
                >
                  Calendar View
                </TabsTrigger>
              </TabsList>
            </div>
            
            {/* Upcoming Events Tab */}
            <TabsContent value="upcoming" className="space-y-6 animate-in fade-in-50 duration-300">
              {upcomingEvents.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {upcomingEvents.map((event) => (
                      <EventCard key={event.id} event={event} />
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-16 bg-white rounded-lg border border-gray-100 shadow-sm">
                  <Calendar className="mx-auto h-16 w-16 text-gray-300 mb-4" />
                  <h3 className="text-xl font-bold text-gray-800 mb-2">No upcoming events</h3>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    We're currently planning new events. Check back soon or subscribe to our newsletter for updates!
                  </p>
                  <Link 
                    href="#newsletter" 
                    className="inline-flex items-center px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-md transition-colors"
                  >
                    Get Notified About New Events
                  </Link>
                </div>
              )}
            </TabsContent>
            
            {/* Past Events Tab */}
            <TabsContent value="past" className="space-y-6 animate-in fade-in-50 duration-300">
              {pastEvents.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pastEvents.map((event) => (
                      <EventCard key={event.id} event={event} />
                    ))}
                  </div>
                  
                  {pastEvents.length > 9 && (
                    <div className="flex justify-center mt-8">
                      <button className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors">
                        Load More Past Events
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-600">No past events to display.</p>
                </div>
              )}
            </TabsContent>
            
            {/* Calendar Tab */}
            <TabsContent value="calendar" className="animate-in fade-in-50 duration-300">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
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
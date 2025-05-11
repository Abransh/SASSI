import Link from "next/link";
import { getEvents } from "@/lib/event-service";
import { format } from "date-fns";
import Image from "next/image";
import { Calendar, MapPin, AlertCircle } from "lucide-react";

export default async function EventsSection() {
  try {
    // Fetch upcoming events
    const upcomingEvents = await getEvents({ 
      publishedOnly: true,
      upcoming: true 
    }) || [];

    // If no upcoming events, fetch past events
    let eventsToDisplay = upcomingEvents;
    if (upcomingEvents.length === 0) {
      const pastEvents = await getEvents({ 
        publishedOnly: true,
        past: true 
      }) || [];
      eventsToDisplay = pastEvents.slice(0, 3);
    } else {
      eventsToDisplay = upcomingEvents.slice(0, 3);
    }

    return (
      <section id="events" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Events</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join us for cultural celebrations, networking opportunities, and community building events throughout the year.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {eventsToDisplay.length > 0 ? (
              eventsToDisplay.map((event) => (
                <div key={event.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  {/* Event Image */}
                  <div className="h-48 relative">
                    {event.imageUrl ? (
                      <Image
                        src={event.imageUrl}
                        alt={event.title}
                        fill
                        className="object-cover"
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
                    
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <span className="mr-2">
                        <MapPin size={16} />
                      </span>
                      {event.location}
                    </div>
                    
                    <Link 
                      href={`/events/${event.id}`}
                      className="inline-block mt-2 text-orange-600 hover:text-orange-700 font-medium"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-10">
                <p className="text-gray-500">No upcoming events at the moment. Check back soon!</p>
              </div>
            )}
          </div>

          <div className="text-center">
            <Link
              href="/events"
              className="inline-flex items-center px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-md transition-colors"
            >
              View All Events
            </Link>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error("Error in EventsSection:", error);
    return (
      <section id="events" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Events</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join us for cultural celebrations, networking opportunities, and community building events throughout the year.
            </p>
          </div>
          
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 text-center">
            <AlertCircle className="mx-auto mb-4 text-orange-500" size={48} />
            <p className="text-orange-800 mb-2">We're having trouble loading events right now.</p>
            <p className="text-orange-700">Please check back later.</p>
          </div>
          
          <div className="text-center mt-8">
            <Link
              href="/events"
              className="inline-flex items-center px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-md transition-colors"
            >
              View All Events
            </Link>
          </div>
        </div>
      </section>
    );
  }
}
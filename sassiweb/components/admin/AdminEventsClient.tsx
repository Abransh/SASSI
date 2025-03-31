"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { CalendarPlus, Search, Loader2 } from "lucide-react";
import EventDeleteButton from "@/components/admin/EventDeleteButton";

// Define event type
type Event = {
  id: string;
  title: string;
  description: string;
  location: string;
  startDate: Date;
  endDate: Date;
  published: boolean;
  maxAttendees?: number | null;
  _count?: {
    registrations: number;
  };
};

type TabType = "upcoming" | "past" | "all";

export default function AdminEventsClient() {
  const [events, setEvents] = useState<Event[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [pastEvents, setPastEvents] = useState<Event[]>([]);
  const [activeTab, setActiveTab] = useState<TabType>("upcoming");
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/events");
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const fetchedEvents = await response.json();
        
        // Convert date strings to Date objects
        const eventsWithDateObjects = fetchedEvents.map((event: any) => ({
          ...event,
          startDate: new Date(event.startDate),
          endDate: new Date(event.endDate),
        }));

        setEvents(eventsWithDateObjects);
        
        // Filter upcoming events
        const now = new Date();
        const upcoming = eventsWithDateObjects.filter(
          (event: Event) => event.startDate > now
        ).sort((a: Event, b: Event) => a.startDate.getTime() - b.startDate.getTime());
        
        // Filter past events
        const past = eventsWithDateObjects.filter(
          (event: Event) => event.endDate < now
        ).sort((a: Event, b: Event) => b.startDate.getTime() - a.startDate.getTime());
        
        setUpcomingEvents(upcoming);
        setPastEvents(past);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Update filtered events when tab changes or search query changes
  useEffect(() => {
    let eventsToFilter: Event[] = [];
    
    if (activeTab === "upcoming") {
      eventsToFilter = upcomingEvents;
    } else if (activeTab === "past") {
      eventsToFilter = pastEvents;
    } else {
      eventsToFilter = events;
    }
    
    // Apply search filter if there's a query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const filtered = eventsToFilter.filter(event => 
        event.title.toLowerCase().includes(query) || 
        event.description.toLowerCase().includes(query) ||
        event.location.toLowerCase().includes(query)
      );
      setFilteredEvents(filtered);
    } else {
      setFilteredEvents(eventsToFilter);
    }
  }, [activeTab, searchQuery, events, upcomingEvents, pastEvents]);

  const handleTabClick = (tab: TabType) => {
    setActiveTab(tab);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-16">
        <Loader2 className="h-8 w-8 animate-spin text-orange-600" />
        <span className="ml-2">Loading events...</span>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Manage Events</h1>
          <p className="text-gray-600">
            Create, edit and manage all SASSI events
          </p>
        </div>
        
        <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={handleSearch}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent w-full"
            />
          </div>
          
          <Link 
            href="/admin/events/new"
            className="flex items-center justify-center px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-md"
          >
            <CalendarPlus size={18} className="mr-2" />
            Create Event
          </Link>
        </div>
      </div>
      
      {/* Event Tabs */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button 
              onClick={() => handleTabClick("upcoming")}
              className={`w-1/3 py-4 px-1 text-center border-b-2 font-medium transition-colors ${
                activeTab === "upcoming" 
                  ? "border-orange-500 text-orange-600" 
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Upcoming Events ({upcomingEvents.length})
            </button>
            <button 
              onClick={() => handleTabClick("past")}
              className={`w-1/3 py-4 px-1 text-center border-b-2 font-medium transition-colors ${
                activeTab === "past" 
                  ? "border-orange-500 text-orange-600" 
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Past Events ({pastEvents.length})
            </button>
            <button 
              onClick={() => handleTabClick("all")}
              className={`w-1/3 py-4 px-1 text-center border-b-2 font-medium transition-colors ${
                activeTab === "all" 
                  ? "border-orange-500 text-orange-600" 
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              All Events ({events.length})
            </button>
          </nav>
        </div>
        
        {/* Events Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Event
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Registrations
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event) => (
                  <tr key={event.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {event.title}
                          </div>
                          <div className="text-sm text-gray-500 line-clamp-1">
                            {event.description.substring(0, 60)}...
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {format(event.startDate, "MMM d, yyyy")}
                      </div>
                      <div className="text-sm text-gray-500">
                        {format(event.startDate, "h:mm a")} - 
                        {format(event.endDate, "h:mm a")}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {event.location}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {event._count?.registrations || 0}
                        {event.maxAttendees && ` / ${event.maxAttendees}`}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {event.published ? (
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Published
                        </span>
                      ) : (
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                          Draft
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                      <Link 
                        href={`/events/${event.id}`} 
                        className="text-blue-600 hover:text-blue-900"
                      >
                        View
                      </Link>
                      <Link 
                        href={`/admin/events/${event.id}`} 
                        className="text-orange-600 hover:text-orange-900"
                      >
                        Edit
                      </Link>
                      {/* Client Component for Delete Button */}
                      <EventDeleteButton 
                        eventId={event.id} 
                        eventTitle={event.title} 
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                    {searchQuery ? (
                      <>
                        No events found matching <strong>"{searchQuery}"</strong>.
                      </>
                    ) : (
                      <>
                        No {activeTab === "upcoming" ? "upcoming" : activeTab === "past" ? "past" : ""} events found.
                        {activeTab === "upcoming" && (
                          <Link 
                            href="/admin/events/new" 
                            className="text-orange-600 hover:text-orange-800 ml-1"
                          >
                            Create your first event
                          </Link>
                        )}
                      </>
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
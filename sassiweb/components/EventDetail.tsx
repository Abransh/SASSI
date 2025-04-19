"use client";

import Image from "next/image";
import Link from "next/link";
import { format, isSameDay, formatDistanceToNow, isAfter } from "date-fns";
import { Calendar, Clock, MapPin, Users, Share2, ArrowLeft, Plus, ExternalLink, CreditCard, Tag, Calendar as CalendarIcon } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EventGallery from "@/components/EventGallery";
import EventRegistrationButton from "@/components/EventRegistrationButton";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type EventDetailProps = {
  event: any; // We'll use any for now, but ideally this would match Event type
};

export default function EventDetail({ event }: EventDetailProps) {
  const { data: session } = useSession();
  const [isRegistered, setIsRegistered] = useState(false);
  const [isFull, setIsFull] = useState(false);
  const [attendeeCount, setAttendeeCount] = useState(0);
  const [activeTab, setActiveTab] = useState<'details' | 'location' | 'gallery'>('details');
  const [copied, setCopied] = useState(false);

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
      toast.success("Registration successful! Payment completed.", {
        duration: 5000,
        // Use the Sonner Toast component's style
      });
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
  const startDate = new Date(event.startDate);
  const endDate = new Date(event.endDate);
  
  // Format time in 12-hour format with AM/PM, using UTC hours and minutes
  const formattedStartTime = `${startDate.getUTCHours() % 12 || 12}:${startDate.getUTCMinutes().toString().padStart(2, '0')} ${startDate.getUTCHours() >= 12 ? 'PM' : 'AM'}`;
  
  const formattedEndTime = `${endDate.getUTCHours() % 12 || 12}:${endDate.getUTCMinutes().toString().padStart(2, '0')} ${endDate.getUTCHours() >= 12 ? 'PM' : 'AM'}`;
  
  const isMultiDay = !isSameDay(startDate, endDate);
  const formattedEndDate = isMultiDay ? format(new Date(event.endDate), "EEEE, MMMM d, yyyy") : "";

  // Check if event is in the future
  const isUpcoming = isAfter(startDate, new Date());
  
  // Get time remaining for upcoming events
  const timeRemaining = isUpcoming 
    ? formatDistanceToNow(startDate, { addSuffix: true }) 
    : "Event has ended";

  // Handle share functionality
  const handleShare = async () => {
    const url = window.location.href;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: event.title,
          text: event.description,
          url: url
        });
      } catch (err) {
        console.error("Error sharing:", err);
        copyToClipboard(url);
      }
    } else {
      copyToClipboard(url);
    }
  };
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    }).catch(err => {
      console.error("Failed to copy:", err);
      toast.error("Failed to copy link");
    });
  };

  // Handle Google Calendar integration
  const addToCalendar = () => {
    const startTimeISO = new Date(event.startDate).toISOString().replace(/-|:|\.\d+/g, '');
    const endTimeISO = new Date(event.endDate).toISOString().replace(/-|:|\.\d+/g, '');
    
    const location = encodeURIComponent(event.location);
    const title = encodeURIComponent(event.title);
    const details = encodeURIComponent(event.description);
    
    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startTimeISO}/${endTimeISO}&details=${details}&location=${location}&sprop=&sprop=name:`;
    
    window.open(calendarUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Back Link */}
        <div className="mb-6">
          <Link href="/events" className="inline-flex items-center text-orange-600 hover:text-orange-800 font-medium transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Events
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2">
            {/* Event Banner */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md mb-6">
              {/* Event Status Badge */}
              <div className="relative">
                {event.imageUrl ? (
                  <div className="relative w-full" style={{ aspectRatio: '4/5' }}>
                    <Image
                      src={event.imageUrl}
                      alt={event.title}
                      fill
                      className="object-cover"
                      priority
                      sizes="(max-width: 768px) 100vw, 66vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  </div>
                ) : (
                  <div className="h-72 w-full bg-gradient-to-r from-orange-400 to-orange-600 flex items-center justify-center">
                    <CalendarIcon size={64} className="text-white" />
                  </div>
                )}
                
                {/* Event Status */}
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    isUpcoming ? "bg-green-500 text-white" : "bg-gray-600 text-white"
                  }`}>
                    {isUpcoming ? "Upcoming" : "Past Event"}
                  </span>
                </div>
                
                {/* Price Tag if paid event */}
                {event.price && event.price > 0 && (
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-white text-orange-600 text-xs font-semibold flex items-center">
                      <CreditCard className="mr-1 h-3 w-3" />
                      €{event.price.toFixed(2)}
                    </span>
                  </div>
                )}
                
                {/* Event Title */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">{event.title}</h1>
                  <div className="flex flex-wrap items-center text-sm opacity-90 gap-x-4 gap-y-2">
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-4 w-4" />
                      {formattedDate}
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-1 h-4 w-4" />
                      {formattedStartTime}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Tabs Navigation */}
            <div className="mb-6 border-b border-gray-200">
              <div className="flex overflow-x-auto">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === 'details'
                      ? 'text-orange-600 border-b-2 border-orange-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Event Details
                </button>
                <button
                  onClick={() => setActiveTab('location')}
                  className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === 'location'
                      ? 'text-orange-600 border-b-2 border-orange-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Location
                </button>
                <button
                  onClick={() => setActiveTab('gallery')}
                  className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === 'gallery'
                      ? 'text-orange-600 border-b-2 border-orange-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Photos
                </button>
              </div>
            </div>
            
            {/* Tab Content */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
              <div className="p-6">
                {/* Details Tab */}
                <div className={activeTab === 'details' ? 'block' : 'hidden'}>
                  <div className="prose max-w-none">
                    <h2 className="text-2xl font-bold mb-4">About This Event</h2>
                    <div className="text-gray-700 mb-6" dangerouslySetInnerHTML={{ __html: event.description }} />
                    
                    {event.content && (
                      <>
                        <h3 className="text-xl font-semibold mb-2">Details</h3>
                        <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: event.content }} />
                      </>
                    )}
                  </div>
                </div>
                
                {/* Location Tab */}
                <div className={activeTab === 'location' ? 'block' : 'hidden'}>
                  <h2 className="text-2xl font-bold mb-4">Event Location</h2>
                  <div className="mb-4">
                    <p className="text-gray-700 font-medium">{event.location}</p>
                  </div>
                  
                  {/* Google Maps iframe */}
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-gray-200">
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      loading="lazy"
                      allowFullScreen
                      referrerPolicy="no-referrer-when-downgrade"
                      src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${encodeURIComponent(event.location)}&zoom=15`}
                    ></iframe>
                  </div>
                  
                  <div className="mt-4">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-orange-600 hover:text-orange-800 font-medium"
                    >
                      <ExternalLink className="mr-1 h-4 w-4" />
                      Open in Google Maps
                    </a>
                  </div>
                </div>
                
                {/* Gallery Tab */}
                <div className={activeTab === 'gallery' ? 'block' : 'hidden'}>
                  <h2 className="text-2xl font-bold mb-4">Event Photos</h2>
                  <EventGallery eventId={event.id} />
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Event Info & Registration */}
          <div className="lg:col-span-1">
            {/* Event Information Card */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6 sticky top-4">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4">Event Information</h2>
                
                {isUpcoming && (
                  <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-100">
                    <p className="text-green-800 font-medium">Happening {timeRemaining}</p>
                  </div>
                )}
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-start">
                    <Calendar className="w-5 h-5 mr-3 text-orange-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Date</p>
                      <p className="text-gray-600">{formattedDate}</p>
                      {isMultiDay && <p className="text-gray-600">to {formattedEndDate}</p>}
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="w-5 h-5 mr-3 text-orange-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Time</p>
                      <p className="text-gray-600">{formattedStartTime} - {formattedEndTime}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 mr-3 text-orange-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-gray-600 break-words">{event.location}</p>
                    </div>
                  </div>
                  
                  {event.maxAttendees && (
                    <div className="flex items-start">
                      <Users className="w-5 h-5 mr-3 text-orange-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Capacity</p>
                        <div className="flex items-center">
                          <p className="text-gray-600 mr-3">
                            {attendeeCount} / {event.maxAttendees} registered
                          </p>
                          {isFull && (
                            <span className="px-2 py-0.5 bg-red-100 text-red-800 text-xs rounded-full">
                              Full
                            </span>
                          )}
                        </div>
                        
                        {/* Capacity progress bar */}
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                          <div 
                            className="bg-orange-600 h-2 rounded-full" 
                            style={{ width: `${Math.min(100, (attendeeCount / event.maxAttendees) * 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {event.price !== null && (
                    <div className="flex items-start">
                      <CreditCard className="w-5 h-5 mr-3 text-orange-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Registration Fee</p>
                        <p className="text-gray-600">
                          {event.price > 0 
                            ? `€${event.price.toFixed(2)}` 
                            : "Free"
                          }
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Registration Section */}
                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-3">Register for this event</h3>
                  
                  {!session ? (
                    <Link 
                      href={`/auth/signin?callbackUrl=/events/${event.id}`}
                      className="w-full block text-center bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                    >
                      Sign In to Register
                    </Link>
                  ) : (
                    <div className="space-y-3">
                      <EventRegistrationButton 
                        eventId={event.id} 
                        isPaid={!!event.price && event.price > 0} 
                        isFull={isFull}
                        price={event.price || 0}
                      />
                      
                      {isRegistered && (
                        <p className="text-sm text-gray-600">
                          You are registered for this event. You'll receive updates via email.
                        </p>
                      )}
                    </div>
                  )}
                </div>
                
                {/* Action Buttons */}
                <div className="mt-6 flex flex-wrap gap-2">
                  <button
                    onClick={handleShare}
                    className="flex-1 flex items-center justify-center px-3 py-2 border border-gray-300 rounded-md text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
                  >
                    <Share2 className="mr-1.5 h-4 w-4" />
                    {copied ? "Copied!" : "Share"}
                  </button>
                  
                  <button
                    onClick={addToCalendar}
                    className="flex-1 flex items-center justify-center px-3 py-2 border border-gray-300 rounded-md text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
                  >
                    <Plus className="mr-1.5 h-4 w-4" />
                    Add to Calendar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
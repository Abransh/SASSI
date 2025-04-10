"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, Calendar, MapPin, Clock } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileMenu from '@/components/MobileMenu';
import { format } from 'date-fns';
import { Button } from "@/components/ui/button";
import { getEvent } from "@/lib/event-service";

interface EventDetails {
  id: string;
  title: string;
  startDate: string;
  location: string;
}

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const eventId = searchParams.get("eventId");
  const sessionId = searchParams.get("session_id");

  if (!eventId || !sessionId) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Invalid Confirmation</h1>
        <p className="text-gray-600 mb-6">The confirmation link is invalid or incomplete.</p>
        <Link href="/events">
          <Button>Browse Events</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="text-center">
      <div className="mb-8">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Registration Confirmed!</h1>
        <p className="text-gray-600">You're all set for the event.</p>
      </div>

      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Event Details</h2>
        <div className="space-y-4 text-left">
          <div className="flex items-start">
            <Calendar className="w-5 h-5 text-gray-500 mt-1 mr-3" />
            <div>
              <p className="font-medium">Date & Time</p>
              <p className="text-gray-600">
                {format(new Date(), "EEEE, MMMM d, yyyy")}
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <MapPin className="w-5 h-5 text-gray-500 mt-1 mr-3" />
            <div>
              <p className="font-medium">Location</p>
              <p className="text-gray-600">Event Location</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-x-4">
        <Link href="/dashboard">
          <Button variant="outline">View Dashboard</Button>
        </Link>
        <Link href="/events">
          <Button>Browse More Events</Button>
        </Link>
      </div>
    </div>
  );
}

export default function EventConfirmationPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <Suspense fallback={
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading confirmation...</p>
            </div>
          }>
            <ConfirmationContent />
          </Suspense>
        </div>
      </div>
    </main>
  );
} 
"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Calendar, MapPin, X, Loader2 } from "lucide-react";
import { cancelRegistration } from "@/lib/event-service";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from 'next/navigation';

type UpcomingEventsListProps = {
  registrations: any[]; // Event registrations with event data
};

export default function UpcomingEventsList({ registrations }: UpcomingEventsListProps) {
  const router = useRouter();
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  const handleCancelRegistration = async (eventId: string) => {
    if (!confirm("Are you sure you want to cancel your registration for this event?")) {
      return;
    }

    setCancellingId(eventId);

    try {
      await cancelRegistration(eventId);
      toast.success("Registration cancelled successfully");
      router.refresh(); // Refresh the page to update the list
    } catch (error) {
      console.error("Error cancelling registration:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to cancel registration"
      );
    } finally {
      setCancellingId(null);
    }
  };

  return (
    <div className="space-y-4">
      {registrations.map((registration) => (
        <div
          key={registration.id}
          className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold text-lg mb-1">
                {registration.event.title}
              </h3>
              <div className="text-sm text-gray-500 space-y-1">
                <div className="flex items-center">
                  <Calendar size={16} className="mr-2" />
                  <span>
                    {format(new Date(registration.event.startDate), "EEEE, MMMM d, yyyy")}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="inline-block w-4 mr-2"></span>
                  <span>
                    {format(new Date(registration.event.startDate), "h:mm a")} -{" "}
                    {format(new Date(registration.event.endDate), "h:mm a")}
                  </span>
                </div>
                <div className="flex items-center">
                  <MapPin size={16} className="mr-2" />
                  <span>{registration.event.location}</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 self-end sm:self-auto">
              <Link
                href={`/events/${registration.event.id}`}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded text-sm text-center"
              >
                View Details
              </Link>
              
              <Button
                variant="outline"
                className="border-red-500 text-red-500 hover:bg-red-50"
                onClick={() => handleCancelRegistration(registration.event.id)}
                disabled={cancellingId === registration.event.id}
              >
                {cancellingId === registration.event.id ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Cancelling...
                  </>
                ) : (
                  <>
                    <X className="mr-1 h-4 w-4" />
                    Cancel
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
// app/admin/events/[id]/registrations/page.tsx
import { redirect, notFound } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { getEvent } from "@/lib/event-service";
import Link from "next/link";
import EventRegistrationsList from "@/components/admin/EventRegistrationsList";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default async function EventRegistrationsPage({ params }: { params: { id: string } }) {
  // Check authentication
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    redirect("/auth/signin?callbackUrl=/admin/events/" + params.id + "/registrations");
  }

  // Fetch event details
  const event = await getEvent(params.id);
  if (!event) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Event Registrations</h1>
        <Link href={`/admin/events/${params.id}`}>
          <Button variant="outline" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Event
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-500 mb-1">Total Registrations</p>
          <p className="text-2xl font-bold text-gray-900">{event._count?.registrations || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-500 mb-1">Capacity</p>
          <p className="text-2xl font-bold text-gray-900">
            {event.maxAttendees ? `${event._count?.registrations || 0} / ${event.maxAttendees}` : "Unlimited"}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-500 mb-1">Price</p>
          <p className="text-2xl font-bold text-gray-900">
            {event.price ? `€${event.price.toFixed(2)}` : "Free"}
          </p>
        </div>
      </div>

      {/* Registrations List */}
      <EventRegistrationsList eventId={params.id} />
    </div>
  );
}
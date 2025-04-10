import { Metadata } from "next";
import { getEvent } from "@/lib/event-service";
import { notFound } from "next/navigation";
import EventDetail from "@/components/EventDetail";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  try {
    const resolvedParams = await params;
    const event = await getEvent(resolvedParams.id);
    
    if (!event) {
      return {
        title: "Event Not Found",
        description: "The requested event could not be found.",
      };
    }
    
    return {
      title: event.title,
      description: event.description,
      openGraph: {
        title: event.title,
        description: event.description,
        images: event.imageUrl ? [event.imageUrl] : undefined,
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Event",
      description: "Event details",
    };
  }
}

export default async function EventPage({ 
  params,
  searchParams 
}: PageProps) {
  try {
    const resolvedParams = await params;
    const resolvedSearchParams = await searchParams;
    const event = await getEvent(resolvedParams.id);
    const session = await getServerSession(authOptions);
    const paymentStatus = resolvedSearchParams.payment_status as string;

    if (!event) {
      notFound();
    }
    
    // If there's a user session, check for expired registrations
    if (session?.user?.id) {
      // Find any pending registration for this event by this user
      const pendingRegistration = await prisma.registration.findFirst({
        where: {
          eventId: resolvedParams.id,
          userId: session.user.id,
          status: "PENDING"
        }
      });
      
      // If there's a pending registration, check if it has expired
      if (pendingRegistration) {
        const now = new Date();
        if (pendingRegistration.expiresAt && pendingRegistration.expiresAt < now) {
          // Update it to cancelled and clear expiration
          await prisma.registration.update({
            where: { id: pendingRegistration.id },
            data: { 
              status: "CANCELLED",
              expiresAt: null,
              paymentStatus: "FAILED"
            }
          });
          
          console.log(`Registration ${pendingRegistration.id} marked as cancelled due to expiration`);
        }
      }
    }
    
    if (paymentStatus === 'canceled' && session?.user?.id) {
      // Mark the registration as cancelled if payment was canceled
      try {
        // Find the pending registration
        const pendingRegistration = await prisma.registration.findFirst({
          where: {
            eventId: resolvedParams.id,
            userId: session.user.id,
            status: "PENDING"
          }
        });

        if (pendingRegistration) {
          // Update it to cancelled and clear expiration
          await prisma.registration.update({
            where: { id: pendingRegistration.id },
            data: { 
              status: "CANCELLED",
              expiresAt: null,
              paymentStatus: "FAILED"
            }
          });
          
          console.log(`Registration ${pendingRegistration.id} marked as cancelled due to payment cancellation`);
        }
      } catch (error) {
        console.error("Error updating registration after payment cancellation:", error);
      }
    }

    return (
      <div className="container mx-auto px-4 py-8">
        {paymentStatus === 'canceled' && (
          <div className="mb-4 p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
            <p>Your payment was cancelled. You can try again if you'd like to register for this event.</p>
          </div>
        )}
        <EventDetail event={event} />
      </div>
    );
  } catch (error) {
    console.error("Error in EventPage:", error);
    notFound();
  }
}
import { Metadata } from "next";
import { getEvent } from "@/lib/event-service";
import { notFound } from "next/navigation";
import EventDetail from "@/components/EventDetail";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

type PageParams = {
  id: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  try {
    const resolvedParams = await params;
    const event = await getEvent(resolvedParams.id);

    if (!event) {
      return {
        title: "Event Not Found - SASSI Milan",
      };
    }

    return {
      title: `${event.title} - SASSI Milan Events`,
      description: event.description,
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Event - SASSI Milan",
    };
  }
}

export default async function EventPage({
  params,
  searchParams,
}: {
  params: Promise<PageParams>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  try {
    const resolvedParams = await params;
    const resolvedSearchParams = await searchParams;
    const event = await getEvent(resolvedParams.id);
    const session = await getServerSession(authOptions);

    if (!event) {
      notFound();
    }

    // Handle payment_status=canceled from Stripe
    const paymentStatus = resolvedSearchParams.payment_status;
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
              expiresAt: null, // Clear the expiration date
              paymentStatus: "FAILED" // Explicitly mark payment as failed
            }
          });
          
          console.log(`Registration ${pendingRegistration.id} marked as cancelled due to payment cancellation`);
        }
      } catch (error) {
        console.error("Error updating registration after payment cancellation:", error);
      }
      
      // Redirect to remove the query parameter
      redirect(`/events/${resolvedParams.id}`);
    }

    // Also handle success URL by explicitly confirming the status
    if (paymentStatus === 'success' && session?.user?.id) {
      try {
        // Find the pending registration (it might still be pending if webhook hasn't processed yet)
        const pendingRegistration = await prisma.registration.findFirst({
          where: {
            eventId: resolvedParams.id,
            userId: session.user.id,
            status: "PENDING"
          }
        });

        if (pendingRegistration) {
          // Update it to confirmed status
          await prisma.registration.update({
            where: { id: pendingRegistration.id },
            data: { 
              status: "CONFIRMED",
              expiresAt: null,
              paymentStatus: "PAID"
            }
          });
          
          console.log(`Registration ${pendingRegistration.id} confirmed after successful payment`);
        }
      } catch (error) {
        console.error("Error confirming registration after payment success:", error);
      }
      
      // Redirect to remove the query parameter
      redirect(`/events/${resolvedParams.id}`);
    }

    return <EventDetail event={event} />;
  } catch (error) {
    console.error("Error in EventPage:", error);
    notFound();
  }
}
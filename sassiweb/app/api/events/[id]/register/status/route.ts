// This route handles checking event registration status
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

// GET handler for checking registration status
export async function GET(req: any , { params }: any ) {
  try {
    const resolvedParams = await params;
    const eventId = params.id;
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return Response.json(
        { isRegistered: false, status: null, paymentStatus: null },
        { status: 200 }
      );
    }
    
    // Check if user has any registration for this event
    const registration = await prisma.registration.findUnique({
      where: {
        eventId_userId: {
          eventId: eventId,
          userId: session.user.id,
        },
      },
      include: {
        payment: true,
        event: {
          select: {
            title: true,
            startDate: true,
          }
        }
      }
    });
    
    // If no registration exists, they're not registered
    if (!registration) {
      return Response.json({ 
        isRegistered: false,
        status: null,
        paymentStatus: null
      });
    }
    
    // Check for PENDING registrations that might have expired
    if (registration.status === "PENDING") {
      const now = new Date();
      
      // If the registration has expired, mark as cancelled
      if (registration.expiresAt && registration.expiresAt < now) {
        // Update it to cancelled and clear expiration
        await prisma.registration.update({
          where: { id: registration.id },
          data: { 
            status: "CANCELLED",
            expiresAt: null,
            paymentStatus: "EXPIRED"
          }
        });
        
        // Also update payment status if it exists
        if (registration.payment) {
          await prisma.stripePayment.update({
            where: { id: registration.payment.id },
            data: { status: "EXPIRED" }
          });
        }
        
        console.log(`Registration ${registration.id} marked as cancelled due to expiration`);
        
        return Response.json({ 
          isRegistered: false,
          status: "CANCELLED",
          paymentStatus: "EXPIRED",
          expiryReason: "Payment time expired"
        });
      }
      
      // For still-valid pending registrations, return time remaining
      if (registration.expiresAt) {
        const timeRemaining = Math.max(0, registration.expiresAt.getTime() - now.getTime());
        const minutesRemaining = Math.floor(timeRemaining / (1000 * 60));
        
        return Response.json({ 
          isRegistered: true,
          status: "PENDING",
          paymentStatus: registration.paymentStatus,
          expiresIn: minutesRemaining,
          paymentId: registration.paymentId,
          eventTitle: registration.event.title,
          eventDate: registration.event.startDate
        });
      }
    }
    
    // For CONFIRMED registrations
    if (registration.status === "CONFIRMED") {
      return Response.json({ 
        isRegistered: true,
        status: "CONFIRMED",
        paymentStatus: registration.paymentStatus,
        eventTitle: registration.event.title,
        eventDate: registration.event.startDate
      });
    }
    
    // For all other cases (including CANCELLED)
    return Response.json({ 
      isRegistered: false,
      status: registration.status,
      paymentStatus: registration.paymentStatus
    });
  } catch (error) {
    console.error("Error checking registration status:", error);
    return Response.json(
      { error: "Failed to check registration status" },
      { status: 500 }
    );
  }
}
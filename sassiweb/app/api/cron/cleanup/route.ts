import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Remove Edge runtime configuration
// export const runtime = 'edge';
export const dynamic = 'force-dynamic';

// This function will be called by the cron job
export async function GET(request: NextRequest) {
  try {
    // Verify the cron secret
    const cronSecret = request.headers.get('x-cron-secret');
    if (cronSecret !== process.env.CRON_SECRET) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Find all pending registrations that have expired
    const expiredRegistrations = await prisma.registration.findMany({
      where: {
        status: 'PENDING',
        expiresAt: {
          lt: new Date(),
        },
      },
      include: {
        payment: true,
      },
    });

    // Update each expired registration
    for (const registration of expiredRegistrations) {
      await prisma.$transaction([
        // Update the registration status
        prisma.registration.update({
          where: { id: registration.id },
          data: {
            status: 'CANCELLED',
            paymentStatus: 'EXPIRED',
          },
        }),
        // Update the payment status if it exists
        ...(registration.paymentId ? [
          prisma.stripePayment.update({
            where: { id: registration.paymentId },
            data: { status: 'EXPIRED' },
          }),
        ] : []),
      ]);
    }

    return NextResponse.json({
      message: 'Cleanup completed successfully',
      expiredRegistrations: expiredRegistrations.length,
    });
  } catch (error) {
    console.error('Error in cleanup cron job:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 
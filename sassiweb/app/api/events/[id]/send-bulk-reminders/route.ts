// app/api/events/[id]/send-reminder/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { sendEventReminderEmail } from "@/lib/email";

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }>}
) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get event details
    const { id } = await context.params;
    const event = await prisma.event.findUnique({
      where: { id },
      include: {
        registrations: {
          where: { status: "CONFIRMED" },
          include: { user: true }
        }
      }
    });

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    // Send reminders to all confirmed registrations
    const emailPromises = event.registrations.map(registration =>
      sendEventReminderEmail(
        registration.user.email,
        registration.user.name || "SASSI Member",
        event.title,
        event.startDate,
        event.location
      )
    );
       

    await Promise.all(emailPromises);

    return NextResponse.json({ 
      message: `Reminders sent to ${event.registrations.length} participants` 
    });
  } catch (error) {
    console.error("Error sending reminders:", error);
    return NextResponse.json(
      { error: "Failed to send reminders" },
      { status: 500 }
    );
  }
}
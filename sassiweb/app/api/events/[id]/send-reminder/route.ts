// app/api/events/[id]/send-reminder/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { sendEventReminderEmail } from "@/lib/email";

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }>}
) {
  try {
    // Check if user is authenticated and is an admin
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    const { id } = await context.params;
    const eventId = id;
    const { userEmail, userName, eventTitle, eventDate, eventLocation } = await request.json();

    if (!userEmail || !eventTitle || !eventDate || !eventLocation) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    
    // Send reminder email
    await sendEventReminderEmail(
      userEmail,
      userName || "SASSI Member",
      eventTitle,
      new Date(eventDate),
      eventLocation
    );
    
    return NextResponse.json({ 
      success: true, 
      message: `Reminder email sent to ${userEmail}` 
    });
  } catch (error) {
    console.error("Error sending reminder email:", error);
    return NextResponse.json(
      { error: "Failed to send reminder email" },
      { status: 500 }
    );
  }
}
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { z } from "zod";

// Schema for event creation/update
const eventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  content: z.string().optional(),
  location: z.string().min(1, "Location is required"),
  startDate: z.string().min(1, "Start date is required"),
  startTime: z.string().min(1, "Start time is required"),
  endDate: z.string().optional(),
  endTime: z.string().optional(),
  imageUrl: z.string().optional().nullable(),
  maxAttendees: z.number().optional().nullable(),
  price: z.number().optional().nullable(),
  requiresPayment: z.boolean().default(false),
  published: z.boolean().default(false),
});

// GET /api/events - Get all events
export async function GET(request: NextRequest) {
  try {
    console.log("API: Fetching events");
    const { searchParams } = new URL(request.url);
    const publishedOnly = searchParams.get("published") === "true";
    const past = searchParams.get("past") === "true";
    const upcoming = searchParams.get("upcoming") === "true";
    
    console.log("Query parameters:", { publishedOnly, past, upcoming });
    
    const now = new Date();
    
    let whereCondition: any = {};
    
    if (publishedOnly) {
      whereCondition.published = true;
    }
    
    if (past) {
      whereCondition.endDate = {
        lt: now
      };
    }
    
    if (upcoming) {
      whereCondition.startDate = {
        gte: now
      };
    }
    
    console.log("Executing Prisma query with conditions:", JSON.stringify(whereCondition));
    
    try {
      const events = await prisma.event.findMany({
        where: whereCondition,
        orderBy: {
          startDate: upcoming ? 'asc' : 'desc'
        },
        include: {
          _count: {
            select: {
              registrations: true
            }
          }
        }
      });
      
      console.log(`Successfully fetched ${events.length} events`);
      return NextResponse.json(events);
    } catch (dbError) {
      console.error("Database query error:", dbError);
      return NextResponse.json(
        { error: "Database error: " + (dbError instanceof Error ? dbError.message : String(dbError)) },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { error: "Failed to fetch events", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

// POST /api/events - Create a new event
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    
    // Validate session has user ID
    if (!session.user.id) {
      console.error("Missing user ID in session:", session);
      return NextResponse.json(
        { error: "User ID missing in session" },
        { status: 400 }
      );
    }
    
    const json = await request.json();
    console.log("Received event data:", json);
    console.log("Image URL in received data:", json.imageUrl);
    
    try {
      const validatedData = eventSchema.parse(json);
      console.log("Validated event data:", validatedData);
      console.log("Image URL after validation:", validatedData.imageUrl);
      
      // Create the event data object without spreading to avoid type issues
      const eventData: any = {
        title: validatedData.title,
        description: validatedData.description,
        location: validatedData.location,
        startDate: validatedData.startDate,
        endDate: validatedData.endDate,
        published: validatedData.published,
        requiresPayment: validatedData.requiresPayment,
        createdBy: session.user.id,
        imageUrl: validatedData.imageUrl || null, // Always include imageUrl, even if null
      };
      
      console.log("Final event data being sent to database:", eventData);
      console.log("Image URL in final data:", eventData.imageUrl);
      
      // Add optional fields only if they exist
      if (validatedData.content) eventData.content = validatedData.content;
      if (validatedData.maxAttendees) eventData.maxAttendees = validatedData.maxAttendees;
      if (validatedData.price) eventData.price = validatedData.price;
      if (validatedData.endDate) eventData.endDate = validatedData.endDate;
      
      const event = await prisma.event.create({
        data: eventData
      });
      
      console.log("Successfully created event:", event);
      console.log("Image URL in created event:", event.imageUrl);
      return NextResponse.json(event, { status: 201 });
    } catch (validationError) {
      if (validationError instanceof z.ZodError) {
        console.error("Validation error:", validationError.errors);
        return NextResponse.json(
          { error: "Validation failed", details: validationError.errors },
          { status: 400 }
        );
      }
      throw validationError;
    }
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  }
}
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { authOptions } from "../auth/[...nextauth]/route";
import { z } from "zod";

// Schema for event creation/update
const eventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  content: z.string().optional(),
  location: z.string().min(1, "Location is required"),
  startDate: z.string().transform(str => new Date(str)),
  endDate: z.string().transform(str => new Date(str)),
  imageUrl: z.string().optional().nullable(),
  maxAttendees: z.number().optional().nullable(),
  published: z.boolean().default(false),
});

// GET /api/events - Get all events
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const publishedOnly = searchParams.get("published") === "true";
    const past = searchParams.get("past") === "true";
    const upcoming = searchParams.get("upcoming") === "true";
    
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
    
    return NextResponse.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
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
    
    const json = await request.json();
    const validatedData = eventSchema.parse(json);
    
    const event = await prisma.event.create({
      data: {
        ...validatedData,
        createdBy: session.user.id,
      }
    });
    
    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors },
        { status: 400 }
      );
    }
    
    console.error("Error creating event:", error);
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  }
}
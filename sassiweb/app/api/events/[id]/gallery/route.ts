import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { z } from "zod";

// Schema for gallery image addition
const galleryImageSchema = z.object({
  imageUrl: z.string().url("Valid image URL is required"),
  caption: z.string().optional()
});

// GET /api/events/[id]/gallery - Get event gallery
export async function GET(
  request: NextRequest,
  context: any  // Use 'any' to bypass TypeScript's type checking
  //{ params }: { params: { id: string } }
) {
  try {
    const id = context.params.id; // Access the ID via context.params.id
    const gallery = await prisma.eventImage.findMany({
      where: {
        eventId: id
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    return NextResponse.json(gallery);
  } catch (error) {
    console.error("Error fetching gallery:", error);
    return NextResponse.json(
      { error: "Failed to fetch gallery" },
      { status: 500 }
    );
  }
}

// POST /api/events/[id]/gallery - Add image to event gallery
export async function POST(
  request: NextRequest,
  context: any  // Use 'any' to bypass TypeScript's type checking
  //{ params }: { params: { id: string } }
) {
  try {
    const id = context.params.id; // Access the ID via context.params.id
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    
    // Verify event exists
    const event = await prisma.event.findUnique({
      where: {
        id: id
      }
    });
    
    if (!event) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      );
    }
    
    const json = await request.json();
    const validatedData = galleryImageSchema.parse(json);
    
    const image = await prisma.eventImage.create({
      data: {
        eventId: id,
        imageUrl: validatedData.imageUrl,
        caption: validatedData.caption
      }
    });
    
    return NextResponse.json(image, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors },
        { status: 400 }
      );
    }
    
    console.error("Error adding image to gallery:", error);
    return NextResponse.json(
      { error: "Failed to add image to gallery" },
      { status: 500 }
    );
  }
}
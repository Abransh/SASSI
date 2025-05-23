import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { z } from "zod";

// Schema for gallery image addition
const galleryImageSchema = z.object({
  imageUrl: z.string().url("Valid image URL is required"),
  caption: z.string().optional()
});

// GET /api/events/[id]/gallery - Get gallery images for an event
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
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
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
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

// DELETE /api/events/[id]/gallery - Delete gallery image
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const imageId = request.nextUrl.searchParams.get("imageId");
    const session = await getServerSession(authOptions);
    // ... existing code ...
  } catch (error) {
    // ... existing code ...
  }
}
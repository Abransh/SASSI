import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { z } from "zod";

// Resource schema for validation
const resourceUpdateSchema = z.object({
  title: z.string().min(1, "Title is required").optional(),
  description: z.string().min(1, "Description is required").optional(),
  fileUrl: z.string().url("Valid file URL is required").optional(),
  thumbnailUrl: z.string().url().optional().nullable(),
  categoryId: z.string().min(1, "Category is required").optional(),
  resourceType: z.enum(["DOCUMENT", "TEMPLATE", "GUIDE", "VIDEO", "LINK"]).optional(),
  featured: z.boolean().optional(),
});

// GET /api/resources/[id] - Get a single resource
export async function GET(
  request: NextRequest,
  context: any // Use 'any' to bypass TypeScript's type checking
) {
  try {
    const id = context.params.id; // Access the ID via context.params.id
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: "You must be logged in to access resources" },
        { status: 401 }
      );
    }
    
    const resource = await prisma.resource.findUnique({
      where: {
        id: id,
      },
      include: {
        category: {
          select: {
            name: true,
            slug: true,
          },
        },
      },
    });
    
    if (!resource) {
      return NextResponse.json(
        { error: "Resource not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(resource);
  } catch (error) {
    console.error("Error fetching resource:", error);
    return NextResponse.json(
      { error: "Failed to fetch resource" },
      { status: 500 }
    );
  }
}

// PATCH /api/resources/[id] - Update a resource
export async function PATCH(
  request: NextRequest,
  context: any // Use 'any' to bypass TypeScript's type checking
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
    
    // Parse and validate request body
    const body = await request.json();
    const validatedData = resourceUpdateSchema.parse(body);
    
    // Check if resource exists
    const existingResource = await prisma.resource.findUnique({
      where: {
        id: id,
      },
    });
    
    if (!existingResource) {
      return NextResponse.json(
        { error: "Resource not found" },
        { status: 404 }
      );
    }
    
    // Update the resource
    const updatedResource = await prisma.resource.update({
      where: {
        id: id,
      },
      data: validatedData,
    });
    
    return NextResponse.json(updatedResource);
  } catch (error) {
    console.error("Error updating resource:", error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: "Failed to update resource" },
      { status: 500 }
    );
  }
}

// DELETE /api/resources/[id] - Delete a resource
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    
    const { id } = await params;
    
    // Check if resource exists
    const resource = await prisma.resource.findUnique({
      where: {
        id,
      },
    });
    
    if (!resource) {
      return NextResponse.json(
        { error: "Resource not found" },
        { status: 404 }
      );
    }
    
    // Delete the resource
    await prisma.resource.delete({
      where: {
        id,
      },
    });
    
    return NextResponse.json(
      { message: "Resource deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting resource:", error);
    return NextResponse.json(
      { error: "Failed to delete resource" },
      { status: 500 }
    );
  }
}
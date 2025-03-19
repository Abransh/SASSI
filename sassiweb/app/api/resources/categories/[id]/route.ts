import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { authOptions } from "../../../auth/[...nextauth]/route";
import { z } from "zod";

// Validation schema for category updates
const categoryUpdateSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens")
    .optional(),
  description: z.string().optional().nullable(),
  imageUrl: z.string().url().optional().nullable(),
  order: z.number().optional(),
});

// GET /api/resources/categories/[id] - Get a single resource category
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: "You must be logged in to access resource categories" },
        { status: 401 }
      );
    }
    
    // Fetch the category
    const category = await prisma.resourceCategory.findUnique({
      where: {
        id: params.id,
      },
      include: {
        resources: true,
        _count: {
          select: {
            resources: true,
          },
        },
      },
    });
    
    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(category);
  } catch (error) {
    console.error("Error fetching resource category:", error);
    return NextResponse.json(
      { error: "Failed to fetch resource category" },
      { status: 500 }
    );
  }
}

// PATCH /api/resources/categories/[id] - Update a resource category
export async function PATCH(
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
    
    // Parse and validate request body
    const body = await request.json();
    const validatedData = categoryUpdateSchema.parse(body);
    
    // Check if category exists
    const existingCategory = await prisma.resourceCategory.findUnique({
      where: {
        id: params.id,
      },
    });
    
    if (!existingCategory) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }
    
    // If slug is being updated, check if new slug is already taken
    if (validatedData.slug && validatedData.slug !== existingCategory.slug) {
      const slugExists = await prisma.resourceCategory.findUnique({
        where: {
          slug: validatedData.slug,
        },
      });
      
      if (slugExists) {
        return NextResponse.json(
          { error: "A category with this slug already exists" },
          { status: 400 }
        );
      }
    }
    
    // Update the category
    const updatedCategory = await prisma.resourceCategory.update({
      where: {
        id: params.id,
      },
      data: validatedData,
    });
    
    return NextResponse.json(updatedCategory);
  } catch (error) {
    console.error("Error updating resource category:", error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: "Failed to update resource category" },
      { status: 500 }
    );
  }
}

// DELETE /api/resources/categories/[id] - Delete a resource category
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
    
    // Check if category exists
    const existingCategory = await prisma.resourceCategory.findUnique({
      where: {
        id: params.id,
      },
      include: {
        _count: {
          select: {
            resources: true,
          },
        },
      },
    });
    
    if (!existingCategory) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }
    
    // Check if category has resources
    if (existingCategory._count.resources > 0) {
      return NextResponse.json(
        {
          error:
            "This category contains resources. Delete or move the resources before deleting the category.",
        },
        { status: 400 }
      );
    }
    
    // Delete the category
    await prisma.resourceCategory.delete({
      where: {
        id: params.id,
      },
    });
    
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting resource category:", error);
    return NextResponse.json(
      { error: "Failed to delete resource category" },
      { status: 500 }
    );
  }
}
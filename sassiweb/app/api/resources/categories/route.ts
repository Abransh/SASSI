import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { z } from "zod";

// Validation schema for category creation
const categorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens"),
  description: z.string().optional(),
  imageUrl: z.string().url().optional().nullable(),
  order: z.number().optional(),
});

// GET /api/resources/categories - Get all resource categories
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: "You must be logged in to access resource categories" },
        { status: 401 }
      );
    }
    
    // Fetch categories
    const categories = await prisma.resourceCategory.findMany({
      orderBy: {
        order: "asc",
      },
      include: {
        _count: {
          select: {
            resources: true,
          },
        },
      },
    });
    
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error fetching resource categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch resource categories" },
      { status: 500 }
    );
  }
}

// POST /api/resources/categories - Create a new resource category
export async function POST(request: NextRequest) {
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
    const validatedData = categorySchema.parse(body);
    
    // Check if slug is already taken
    const existingCategory = await prisma.resourceCategory.findUnique({
      where: {
        slug: validatedData.slug,
      },
    });
    
    if (existingCategory) {
      return NextResponse.json(
        { error: "A category with this slug already exists" },
        { status: 400 }
      );
    }
    
    // Create the category
    const category = await prisma.resourceCategory.create({
      data: validatedData,
    });
    
    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error("Error creating resource category:", error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: "Failed to create resource category" },
      { status: 500 }
    );
  }
}
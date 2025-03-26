import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { z } from "zod";

// Validation schema for resource creation
const resourceSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  fileUrl: z.string().url("Valid file URL is required"),
  thumbnailUrl: z.string().url().optional().nullable(),
  categoryId: z.string().min(1, "Category is required"),
  resourceType: z.enum(["DOCUMENT", "TEMPLATE", "GUIDE", "VIDEO", "LINK"]),
  featured: z.boolean().optional().default(false),
});

// GET /api/resources - Get all resources
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: "You must be logged in to access resources" },
        { status: 401 }
      );
    }
    
    // Parse query parameters
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get("categoryId");
    const type = searchParams.get("type");
    const featured = searchParams.get("featured") === "true";
    
    // Build query
    const whereClause: any = {};
    
    if (categoryId) {
      whereClause.categoryId = categoryId;
    }
    
    if (type) {
      whereClause.resourceType = type;
    }
    
    if (featured) {
      whereClause.featured = true;
    }
    
    // Fetch resources
    const resources = await prisma.resource.findMany({
      where: whereClause,
      orderBy: {
        title: "asc",
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
    
    return NextResponse.json(resources);
  } catch (error) {
    console.error("Error fetching resources:", error);
    return NextResponse.json(
      { error: "Failed to fetch resources" },
      { status: 500 }
    );
  }
}

// POST /api/resources - Create a new resource
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
    const validatedData = resourceSchema.parse(body);
    
    // Create the resource
    const resource = await prisma.resource.create({
      data: validatedData,
    });
    
    return NextResponse.json(resource, { status: 201 });
  } catch (error) {
    console.error("Error creating resource:", error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: "Failed to create resource" },
      { status: 500 }
    );
  }
}
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// POST /api/resources/[id]/track - Track resource view or download
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: "You must be logged in to access resources" },
        { status: 401 }
      );
    }
    
    // Get request body
    const body = await request.json();
    const downloaded = !!body.downloaded;
    
    // Check if resource exists
    const resource = await prisma.resource.findUnique({
      where: {
        id: params.id,
      },
    });
    
    if (!resource) {
      return NextResponse.json(
        { error: "Resource not found" },
        { status: 404 }
      );
    }
    
    // Update resource view/download count
    await prisma.resource.update({
      where: {
        id: params.id,
      },
      data: {
        viewCount: { increment: 1 },
        ...(downloaded ? { downloadCount: { increment: 1 } } : {}),
      },
    });
    
    // Record the user's view
    await prisma.resourceView.upsert({
      where: {
        resourceId_userId: {
          resourceId: params.id,
          userId: session.user.id,
        },
      },
      update: {
        downloaded: downloaded || undefined,
      },
      create: {
        resourceId: params.id,
        userId: session.user.id,
        downloaded,
      },
    });
    
    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("Error tracking resource view:", error);
    return NextResponse.json(
      { error: "Failed to track resource view" },
      { status: 500 }
    );
  }
}
// app/api/resources/[id]/download/route.ts

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    
    // Check if user is authenticated
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: "You must be logged in to download resources" },
        { status: 401 }
      );
    }
    
    // Fetch the resource
    const resource = await prisma.resource.findUnique({
      where: {
        id: id,
      },
    });
    
    if (!resource) {
      return NextResponse.json(
        { error: "Resource not found" },
        { status: 404 }
      );
    }
    
    // Track the download
    await prisma.resource.update({
      where: {
        id: id,
      },
      data: {
        downloadCount: {
          increment: 1,
        },
      },
    });
    
    // Track the user's download
    await prisma.resourceView.upsert({
      where: {
        resourceId_userId: {
          resourceId: id,
          userId: session.user.id,
        },
      },
      update: {
        downloaded: true,
      },
      create: {
        resourceId: id,
        userId: session.user.id,
        downloaded: true,
      },
    });
    
    // Prepare the download URL
    let downloadUrl = resource.fileUrl;
    
    // For Cloudinary resources, add fl_attachment flag to force download
    if (downloadUrl.includes('cloudinary.com')) {
      const parts = downloadUrl.split('/upload/');
      if (parts.length === 2) {
        downloadUrl = `${parts[0]}/upload/fl_attachment/${parts[1]}`;
      }
    }
    
    // Redirect to the download URL
    return NextResponse.redirect(downloadUrl);
  } catch (error) {
    console.error("Error downloading resource:", error);
    return NextResponse.json(
      { error: "Failed to download resource" },
      { status: 500 }
    );
  }
}
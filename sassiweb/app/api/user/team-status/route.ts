import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

export async function GET(request: NextRequest) {
  try {
    // Check if user is authenticated
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }
    
    // Find the most recent team application for this user
    const teamApplication = await prisma.teamApplication.findFirst({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        department: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        reviewedAt: true,
      },
    });
    
    // Return the team application data
    return NextResponse.json({
      application: teamApplication,
    });
  } catch (error) {
    console.error("Error checking team application status:", error);
    
    return NextResponse.json(
      { error: "Failed to check team application status" },
      { status: 500 }
    );
  }
}
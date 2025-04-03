import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

type Status = "PENDING" | "APPROVED" | "REJECTED";

export async function PATCH(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    
    const { id } = await context.params;
    const body = await request.json();
    const { status, department } = body;
    
    // Validate inputs
    if (status && status !== "PENDING" && status !== "APPROVED" && status !== "REJECTED") {
      return NextResponse.json(
        { error: "Invalid status" },
        { status: 400 }
      );
    }
    
    if (department && typeof department !== "string") {
      return NextResponse.json(
        { error: "Invalid department" },
        { status: 400 }
      );
    }
    
    // Check if application exists
    const application = await prisma.teamApplication.findUnique({
      where: { id },
    });
    
    if (!application) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 }
      );
    }
    
    // Update application
    const updatedApplication = await prisma.teamApplication.update({
      where: { id },
      data: {
        ...(status && { status }),
        ...(department && { department }),
      },
    });
    
    return NextResponse.json(updatedApplication);
  } catch (error) {
    console.error("Error updating application:", error);
    return NextResponse.json(
      { error: "Failed to update application" },
      { status: 500 }
    );
  }
} 
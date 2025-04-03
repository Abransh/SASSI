import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

type ApplicationType = "TEAM" | "MEMBERSHIP";

// PATCH /api/admin/applications/[id] - Update application status
export async function PATCH(
  request: NextRequest,
  context: any
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    
    const id = context.params.id;
    const { status, type } = await request.json();
    
    // Validate status
    if (!["PENDING", "APPROVED", "REJECTED"].includes(status)) {
      return NextResponse.json(
        { error: "Invalid status" },
        { status: 400 }
      );
    }
    
    // Validate type
    if (!["TEAM", "MEMBERSHIP"].includes(type)) {
      return NextResponse.json(
        { error: "Invalid application type" },
        { status: 400 }
      );
    }
    
    let updatedApplication;
    
    if (type === "TEAM") {
      // Update team application
      updatedApplication = await prisma.teamApplication.update({
        where: { id },
        data: {
          status,
          reviewedBy: session.user.id,
          reviewedAt: new Date(),
        },
      });
    } else {
      // Update membership request
      updatedApplication = await prisma.membershipRequest.update({
        where: { id },
        data: {
          status,
          reviewedBy: session.user.id,
          reviewedAt: new Date(),
        },
      });
    }
    
    return NextResponse.json(updatedApplication);
  } catch (error) {
    console.error("Error updating application status:", error);
    return NextResponse.json(
      { error: "Failed to update application status" },
      { status: 500 }
    );
  }
} 
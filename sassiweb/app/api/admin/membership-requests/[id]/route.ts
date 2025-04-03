import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

type Status = "PENDING" | "APPROVED" | "REJECTED";

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
    
    const { id } = await context.params;
    const { status } = await request.json();
    
    // Validate status
    if (status !== "PENDING" && status !== "APPROVED" && status !== "REJECTED") {
      return NextResponse.json(
        { error: "Invalid status" },
        { status: 400 }
      );
    }
    
    // Check if request exists
    const membershipRequest = await prisma.membershipRequest.findUnique({
      where: { id },
    });
    
    if (!membershipRequest) {
      return NextResponse.json(
        { error: "Request not found" },
        { status: 404 }
      );
    }
    
    // Update request status
    const updatedRequest = await prisma.membershipRequest.update({
      where: { id },
      data: { status },
    });
    
    return NextResponse.json(updatedRequest);
  } catch (error) {
    console.error("Error updating request status:", error);
    return NextResponse.json(
      { error: "Failed to update request status" },
      { status: 500 }
    );
  }
} 
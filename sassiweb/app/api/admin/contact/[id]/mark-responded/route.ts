import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function POST(
  request: NextRequest,
  context: any
) {
  try {
    const id = context.params.id;
    
    // Check if user is authenticated and is an admin
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    
    // Find the contact submission
    const submission = await prisma.contactSubmission.findUnique({
      where: {
        id: id
      }
    });
    
    if (!submission) {
      return NextResponse.json(
        { error: "Contact submission not found" },
        { status: 404 }
      );
    }
    
    // Mark submission as responded
    const updatedSubmission = await prisma.contactSubmission.update({
      where: {
        id: id
      },
      data: {
        responded: true
      }
    });
    
    return NextResponse.json({
      message: "Contact submission marked as responded",
      submission: updatedSubmission
    });
  } catch (error) {
    console.error("Error marking submission as responded:", error);
    return NextResponse.json(
      { error: "Failed to mark submission as responded" },
      { status: 500 }
    );
  }
}
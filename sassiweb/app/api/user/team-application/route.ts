import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { z } from "zod";

// Schema for team application
const teamApplicationSchema = z.object({
  department: z.string().min(1, "Department is required"),
  motivation: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    // Check if user is authenticated
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: "You must be logged in to submit a team application" },
        { status: 401 }
      );
    }
    
    // Check if user's payment is verified
    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
        paymentVerified: true,
      },
    });
    
    if (!user || !user.paymentVerified) {
      return NextResponse.json(
        { error: "You must complete your membership payment before joining a team" },
        { status: 403 }
      );
    }
    
    // Parse and validate request body
    const body = await request.json();
    const validatedData = teamApplicationSchema.parse(body);
    
    // Check if user already has a pending application
    const existingApplication = await prisma.teamApplication.findFirst({
      where: {
        userId: session.user.id,
        status: "PENDING",
      },
    });
    
    if (existingApplication) {
      return NextResponse.json(
        { error: "You already have a pending team application" },
        { status: 400 }
      );
    }
    
    // Create the team application
    const application = await prisma.teamApplication.create({
      data: {
        department: validatedData.department,
        motivation: validatedData.motivation || "",
        userId: session.user.id,
      },
    });
    
    return NextResponse.json(
      {
        message: "Team application submitted successfully",
        id: application.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating team application:", error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: "Failed to process team application" },
      { status: 500 }
    );
  }
}
// app/api/admin/users/[id]/create-membership/route.ts

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { z } from "zod";
import { sendMembershipStatusEmail } from "@/lib/email";

// Schema for membership creation
const membershipCreateSchema = z.object({
  status: z.enum(["PENDING", "APPROVED", "REJECTED"]),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().optional(),
  email: z.string().email("Valid email is required"),
  university: z.string().optional(),
  notes: z.string().optional(),
});

export async function POST(
  request: NextRequest,
  context: any
) {
  try {
    const session = await getServerSession(authOptions);
    
    // Check if user is authenticated and is an admin
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    
    const userId = context.params.id;
    
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }
    
    // Parse and validate request body
    const body = await request.json();
    const validatedData = membershipCreateSchema.parse(body);
    
    // Check if user already has a pending or approved membership request
    const existingRequest = await prisma.membershipRequest.findFirst({
      where: {
        userId: userId,
        status: {
          in: ["PENDING", "APPROVED"],
        },
      },
    });
    
    if (existingRequest) {
      return NextResponse.json(
        { 
          error: "User already has a membership request",
          existingRequest
        },
        { status: 400 }
      );
    }
    
    // Create the membership request
    const membershipRequest = await prisma.membershipRequest.create({
      data: {
        firstName: validatedData.firstName,
        lastName: validatedData.lastName || "",
        email: validatedData.email,
        university: validatedData.university || user.university || "Not specified",
        status: validatedData.status,
        notes: validatedData.notes || "Created by administrator",
        userId: userId,
        reviewedBy: session.user.id,
        reviewedAt: new Date(),
      },
    });
    
    // If status is approved, also update the user's verification status
    if (validatedData.status === "APPROVED") {
      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          isVerified: true,
          paymentVerified: true,
        },
      });
    }
    
    // Send email notification only for APPROVED or REJECTED statuses
    if (validatedData.status === "APPROVED" || validatedData.status === "REJECTED") {
      try {
        await sendMembershipStatusEmail(
          validatedData.email,
          `${validatedData.firstName} ${validatedData.lastName || ""}`,
          validatedData.status,
          "This action was performed by an administrator."
        );
      } catch (emailError) {
        console.error("Failed to send status email:", emailError);
        // Continue with the response even if email fails
      }
    }
    
    return NextResponse.json({
      message: "Membership request created successfully",
      id: membershipRequest.id,
      status: membershipRequest.status,
    });
  } catch (error) {
    console.error("Error creating membership request:", error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: "Failed to create membership request" },
      { status: 500 }
    );
  }
}
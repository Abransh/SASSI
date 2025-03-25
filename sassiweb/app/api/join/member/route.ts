import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { hash } from "bcrypt";

// Schema for member registration
const memberRegistrationSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  isStudent: z.boolean(),
  university: z.string().min(1, "University selection is required"),
  codiceFiscale: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const validatedData = memberRegistrationSchema.parse(body);
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email: validatedData.email,
      },
    });
    
    if (existingUser) {
      return NextResponse.json(
        { error: "A user with this email already exists" },
        { status: 400 }
      );
    }
    
    // Check if there's already a pending request for this email
    const existingRequest = await prisma.membershipRequest.findFirst({
      where: {
        email: validatedData.email,
        status: "PENDING",
      },
    });
    
    if (existingRequest) {
      return NextResponse.json(
        { error: "You already have a pending membership request" },
        { status: 400 }
      );
    }
    
    // Create the membership request
    const membershipRequest = await prisma.membershipRequest.create({
      data: {
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        email: validatedData.email,
        isStudent: validatedData.isStudent,
        university: validatedData.university,
        codiceFiscale: validatedData.codiceFiscale,
        status: "PENDING",
      },
    });
    
    // Hash password
    const hashedPassword = await hash(validatedData.password, 10);
    
    // Create user with pending status (payment not verified)
    const user = await prisma.user.create({
      data: {
        name: `${validatedData.firstName} ${validatedData.lastName}`,
        email: validatedData.email,
        password: hashedPassword,
        university: validatedData.university,
        isVerified: false,
        paymentVerified: false,
        profile: {
          create: {},
        },
      },
    });
    
    // Update the membership request with the user ID
    await prisma.membershipRequest.update({
      where: {
        id: membershipRequest.id,
      },
      data: {
        userId: user.id,
      },
    });
    
    // Return success with the membershipRequest ID for tracking
    return NextResponse.json(
      {
        message: "Membership request submitted successfully",
        id: membershipRequest.id,
        redirectUrl: "https://revolut.me/harshnj",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating membership request:", error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: "Failed to process membership request" },
      { status: 500 }
    );
  }
}
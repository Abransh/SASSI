import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { z } from "zod";

// Validation schema for profile updates
const profileUpdateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  university: z.string().optional(),
  course: z.string().optional(),
  graduationYear: z.coerce.number().optional().nullable(),
  bio: z.string().optional(),
  phoneNumber: z.string().optional(),
  city: z.string().optional(),
  linkedinUrl: z.string().optional(),
  isProfilePublic: z.boolean().default(true),
  
  // Profile specific fields
  universityInIndia: z.string().optional(),
  degreeInIndia: z.string().optional(),
  yearOfArrival: z.coerce.number().optional().nullable(),
  residenceArea: z.string().optional(),
  interests: z.string().optional(),
  skills: z.string().optional(),
  showEmail: z.boolean().default(false),
  showPhone: z.boolean().default(false),
});

// PATCH /api/profile - Update user profile
export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: "You must be logged in to update your profile" },
        { status: 401 }
      );
    }
    
    const json = await request.json();
    const validatedData = profileUpdateSchema.parse(json);
    
    // Update user basic info
    const updatedUser = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        name: validatedData.name,
        university: validatedData.university,
        course: validatedData.course,
        graduationYear: validatedData.graduationYear,
        bio: validatedData.bio,
        phoneNumber: validatedData.phoneNumber,
        city: validatedData.city,
        linkedinUrl: validatedData.linkedinUrl,
        isProfilePublic: validatedData.isProfilePublic,
      },
    });
    
    // Update or create profile
    const profile = await prisma.profile.upsert({
      where: {
        userId: session.user.id,
      },
      create: {
        userId: session.user.id,
        universityInIndia: validatedData.universityInIndia,
        degreeInIndia: validatedData.degreeInIndia,
        yearOfArrival: validatedData.yearOfArrival,
        residenceArea: validatedData.residenceArea,
        interests: validatedData.interests,
        skills: validatedData.skills,
        showEmail: validatedData.showEmail,
        showPhone: validatedData.showPhone,
      },
      update: {
        universityInIndia: validatedData.universityInIndia,
        degreeInIndia: validatedData.degreeInIndia,
        yearOfArrival: validatedData.yearOfArrival,
        residenceArea: validatedData.residenceArea,
        interests: validatedData.interests,
        skills: validatedData.skills,
        showEmail: validatedData.showEmail,
        showPhone: validatedData.showPhone,
      },
    });
    
    return NextResponse.json({
      message: "Profile updated successfully",
      user: {
        ...updatedUser,
        profile,
      },
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}

// GET /api/profile - Get current user profile
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: "You must be logged in to view your profile" },
        { status: 401 }
      );
    }
    
    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      include: {
        profile: true,
      },
    });
    
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        university: user.university,
        course: user.course,
        graduationYear: user.graduationYear,
        bio: user.bio,
        phoneNumber: user.phoneNumber,
        city: user.city,
        linkedinUrl: user.linkedinUrl,
        isProfilePublic: user.isProfilePublic,
        profile: user.profile,
      },
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 }
    );
  }
}
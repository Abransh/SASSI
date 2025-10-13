import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { hash } from "bcrypt";
import { sendRecruitmentNotificationEmail, sendRecruitmentConfirmationEmail } from "@/lib/email";

const recruitSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(10, "Valid phone number is required"),
  university: z.string().min(1, "University selection is required"),
  interests: z.array(z.string()).min(1, "Select at least one area of interest"),
  message: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = recruitSchema.parse(body);

    const existingUser = await prisma.user.findUnique({
      where: {
        email: validatedData.email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "A user with this email already exists. Please sign in instead." },
        { status: 400 }
      );
    }

    const tempPassword = Math.random().toString(36).slice(-12);
    const hashedPassword = await hash(tempPassword, 10);

    const interestLabels: Record<string, string> = {
      events: "Events & Social Activities",
      support: "Student Support & Mentoring",
      "social-media": "Social Media & Content",
      tech: "Tech & Website",
      partnerships: "Partnerships & Sponsorship",
      other: "Other"
    };

    const interestsString = validatedData.interests
      .map(id => interestLabels[id] || id)
      .join(", ");

    const bioContent = validatedData.message
      ? `Interests: ${interestsString}\n\nMotivation: ${validatedData.message}`
      : `Interests: ${interestsString}`;

    const user = await prisma.user.create({
      data: {
        name: validatedData.fullName,
        email: validatedData.email,
        password: hashedPassword,
        phoneNumber: validatedData.phoneNumber,
        university: validatedData.university,
        bio: bioContent,
        isVerified: false,
        paymentVerified: false,
        role: "USER",
        profile: {
          create: {},
        },
      },
    });

    try {
      await sendRecruitmentNotificationEmail(
        validatedData.fullName,
        validatedData.email,
        validatedData.phoneNumber,
        validatedData.university,
        interestsString,
        validatedData.message || "No message provided"
      );

      await sendRecruitmentConfirmationEmail(
        validatedData.email,
        validatedData.fullName
      );
    } catch (emailError) {
      console.error("Error sending emails:", emailError);
    }

    return NextResponse.json(
      {
        message: "Application submitted successfully",
        userId: user.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating recruitment application:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0]?.message || "Validation error" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to process application. Please try again." },
      { status: 500 }
    );
  }
}

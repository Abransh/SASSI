import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sendRecruitmentNotificationEmail, sendRecruitmentConfirmationEmail } from "@/lib/email";

const recruitSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(10, "Valid phone number is required"),
  whatsappNumber: z.string().min(10, "Valid WhatsApp number is required"),
  university: z.string().min(1, "University selection is required"),
  interests: z.array(z.string()).min(1, "Select at least one area of interest"),
  message: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = recruitSchema.parse(body);

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
      console.error("Error sending recruitment emails:", emailError);
      return NextResponse.json(
        { error: "Failed to send application emails. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "Application submitted successfully",
      },
      { status: 200 }
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

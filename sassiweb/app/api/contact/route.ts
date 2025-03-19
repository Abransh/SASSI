import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { sendContactFormEmail } from "@/lib/email";

// Schema for contact form submission
const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters")
});

// POST /api/contact - Submit contact form
export async function POST(request: NextRequest) {
  try {
    const json = await request.json();
    const validatedData = contactFormSchema.parse(json);
    
    // Save contact submission to database
    await prisma.contactSubmission.create({
      data: validatedData
    });
    
    // Send email notification
    await sendContactFormEmail(
      validatedData.name,
      validatedData.email,
      validatedData.subject,
      validatedData.message
    );
    
    return NextResponse.json(
      { message: "Contact form submitted successfully" }, 
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors },
        { status: 400 }
      );
    }
    
    console.error("Error submitting contact form:", error);
    return NextResponse.json(
      { error: "Failed to submit contact form" },
      { status: 500 }
    );
  }
}
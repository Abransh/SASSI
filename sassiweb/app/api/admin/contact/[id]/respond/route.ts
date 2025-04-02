import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { z } from "zod";
import { Resend } from "resend";

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Validation schema for response
const responseSchema = z.object({
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
});

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
        id: id,
      },
    });
    
    if (!submission) {
      return NextResponse.json(
        { error: "Contact submission not found" },
        { status: 404 }
      );
    }
    
    // Parse request body
    const body = await request.json();
    const validatedData = responseSchema.parse(body);
    
    // Send email response
    const { data, error } = await resend.emails.send({
      from: "SASSI Contact <contact@sassimilan.com>",
      to: submission.email,
      subject: validatedData.subject,
      html: `
        <h1>Response from SASSI</h1>
        <p>Dear ${submission.name},</p>
        <p>Thank you for contacting SASSI. Here is our response to your inquiry:</p>
        <div style="padding: 20px; background-color: #f9f9f9; border-left: 4px solid #ff6b00; margin: 15px 0;">
          ${validatedData.message.replace(/\n/g, '<br>')}
        </div>
        <p>If you have any more questions, please don't hesitate to reach out.</p>
        <p>Best regards,<br>The SASSI Team</p>
      `,
    });
    
    if (error) {
      console.error("Error sending email:", error);
      throw new Error("Failed to send email");
    }
    
    // Mark the submission as responded
    await prisma.contactSubmission.update({
      where: {
        id: id,
      },
      data: {
        responded: true,
      },
    });
    
    return NextResponse.json({
      message: "Response sent successfully",
      emailId: data?.id,
    });
  } catch (error) {
    console.error("Error responding to contact:", error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: "Failed to send response" },
      { status: 500 }
    );
  }
}
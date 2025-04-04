import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";
import crypto from "crypto";
import { sendPasswordResetEmail } from "@/lib/email";

// Email validation schema
const emailSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const { email } = emailSchema.parse(body);

    // Find user by email
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    // For security reasons, don't reveal if the user exists or not
    // Just return a success message even if the user doesn't exist
    if (!user) {
      return NextResponse.json(
        { message: "If your email exists in our system, you will receive a password reset link." },
        { status: 200 }
      );
    }

    // Generate a reset token (32 bytes hex string)
    const resetToken = crypto.randomBytes(32).toString("hex");
    
    // Set expiration time (1 hour from now)
    const resetTokenExpiry = new Date();
    resetTokenExpiry.setHours(resetTokenExpiry.getHours() + 1);

    // Store the token and expiry in the database
    await prisma.passwordReset.upsert({
      where: { userId: user.id },
      update: {
        token: resetToken,
        expires: resetTokenExpiry,
      },
      create: {
        userId: user.id,
        token: resetToken,
        expires: resetTokenExpiry,
      },
    });

    // Generate reset URL
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || request.nextUrl.origin;
    const resetUrl = `${baseUrl}/auth/reset-password?token=${resetToken}`;

    // Send reset email
    await sendPasswordResetEmail(user.email, user.name || "SASSI Member", resetUrl);

    return NextResponse.json(
      { message: "If your email exists in our system, you will receive a password reset link." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Password reset request error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to process password reset request" },
      { status: 500 }
    );
  }
}
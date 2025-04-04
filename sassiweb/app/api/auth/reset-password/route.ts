import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { hash } from "bcrypt";
import { sendPasswordChangedEmail } from "@/lib/email";

// Reset password schema
const resetPasswordSchema = z.object({
  token: z.string().min(1, "Token is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const { token, password } = resetPasswordSchema.parse(body);

    // Find token in database
    const passwordReset = await prisma.passwordReset.findFirst({
      where: {
        token,
        expires: {
          gt: new Date(), // Token must not be expired
        },
      },
      include: {
        user: true,
      },
    });

    if (!passwordReset) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 400 }
      );
    }

    // Hash the new password
    const hashedPassword = await hash(password, 10);

    // Update user's password
    await prisma.user.update({
      where: {
        id: passwordReset.userId,
      },
      data: {
        password: hashedPassword,
      },
    });

    // Delete the reset token
    await prisma.passwordReset.delete({
      where: {
        id: passwordReset.id,
      },
    });

    // Send confirmation email
    await sendPasswordChangedEmail(
      passwordReset.user.email,
      passwordReset.user.name || "SASSI Member"
    );

    return NextResponse.json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Password reset error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to reset password" },
      { status: 500 }
    );
  }
}
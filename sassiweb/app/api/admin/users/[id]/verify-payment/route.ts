import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { sendPaymentConfirmationEmail } from "@/lib/email";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if user is authenticated and is an admin
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    
    // Find the user
    const user = await prisma.user.findUnique({
      where: {
        id: params.id,
      },
    });
    
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }
    
    // Check if payment is already verified
    if (user.paymentVerified) {
      return NextResponse.json(
        { message: "Payment is already verified" }
      );
    }
    
    // Update the user's payment verification status
    const updatedUser = await prisma.user.update({
      where: {
        id: params.id,
      },
      data: {
        paymentVerified: true,
        // Set membership expiry to 1 year from now
        membershipExpiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      },
    });
    
    // Find any pending membership requests for this user and approve them
    const membershipRequest = await prisma.membershipRequest.findFirst({
      where: {
        userId: params.id,
        status: "PENDING",
      },
    });
    
    if (membershipRequest) {
      await prisma.membershipRequest.update({
        where: {
          id: membershipRequest.id,
        },
        data: {
          status: "APPROVED",
          reviewedBy: session.user.id,
          reviewedAt: new Date(),
          notes: "Payment verified and membership approved automatically",
        },
      });
    }
    
    // Send payment confirmation email
    if (user.email) {
      try {
        await sendPaymentConfirmationEmail(
          user.email,
          user.name || "SASSI Member",
          new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // Expiry date
        );
      } catch (emailError) {
        console.error("Failed to send payment confirmation email:", emailError);
        // Continue with the response even if email fails
      }
    }
    
    return NextResponse.json({
      message: "Payment verified successfully",
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        name: updatedUser.name,
        paymentVerified: updatedUser.paymentVerified,
        membershipExpiryDate: updatedUser.membershipExpiryDate,
      },
    });
  } catch (error) {
    console.error("Error verifying payment:", error);
    
    return NextResponse.json(
      { error: "Failed to verify payment" },
      { status: 500 }
    );
  }
}
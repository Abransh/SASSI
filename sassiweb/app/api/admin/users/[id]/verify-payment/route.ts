import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { sendPaymentConfirmationEmail } from "@/lib/email";

export async function PATCH(
  request: NextRequest,
  context: any  // Change to 'any' to bypass type checking
) {
  try {
    const id = context.params.id;  // Access ID through context.params
    
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
        id: id,
      },
    });
    
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }
    
    // Toggle payment verification status
    const updatedUser = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        paymentVerified: !user.paymentVerified,
      },
    });
    
    // Send confirmation email if payment is verified
    if (updatedUser.paymentVerified) {
      const expiryDate = new Date();
      expiryDate.setFullYear(expiryDate.getFullYear() + 1); // Assuming 1 year membership

      await sendPaymentConfirmationEmail(
        updatedUser.email,
        updatedUser.name ?? "",
        expiryDate
      );
    }
    
    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error updating payment status:", error);
    return NextResponse.json(
      { error: "Failed to update payment status" },
      { status: 500 }
    );
  }
}

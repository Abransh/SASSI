import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

export async function GET(request: NextRequest) {
  try {
    // Check if user is authenticated
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }
    
    // Get user from database to check payment status
    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
        paymentVerified: true,
        membershipExpiryDate: true,
      },
    });
    
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }
    
    // Check if membership has expired
    const isExpired = user.membershipExpiryDate 
      ? new Date(user.membershipExpiryDate) < new Date() 
      : false;
    
    return NextResponse.json({
      paymentVerified: user.paymentVerified && !isExpired,
      membershipExpiryDate: user.membershipExpiryDate,
      isExpired,
    });
  } catch (error) {
    console.error("Error checking payment status:", error);
    
    return NextResponse.json(
      { error: "Failed to check payment status" },
      { status: 500 }
    );
  }
}
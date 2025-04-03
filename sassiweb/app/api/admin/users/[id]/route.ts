import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

type Role = "USER" | "ADMIN";

// PATCH /api/admin/users/[id] - Update user role
export async function PATCH(
  request: NextRequest,
  context: any
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    
    const { id } = await context.params;
    const { role } = await request.json();
    
    // Validate role
    if (role !== "USER" && role !== "ADMIN") {
      return NextResponse.json(
        { error: "Invalid role" },
        { status: 400 }
      );
    }
    
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id },
    });
    
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }
    
    // Check if trying to modify super admin
    if (user.isSuperAdmin) {
      return NextResponse.json(
        { error: "Cannot modify super admin role" },
        { status: 403 }
      );
    }
    
    // Update user role
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { role },
    });
    
    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error updating user role:", error);
    return NextResponse.json(
      { error: "Failed to update user role" },
      { status: 500 }
    );
  }
}
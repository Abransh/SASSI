// import { NextRequest, NextResponse } from "next/server";
// import { getServerSession } from "next-auth/next";
// import prisma from "@/lib/prisma";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import { z } from "zod";
// import { sendMembershipStatusEmail } from "@/lib/email";

// // Schema for status update
// const statusUpdateSchema = z.object({
//   status: z.enum(["APPROVED", "REJECTED"]),
//   notes: z.string().optional(),
// });

// export async function PATCH(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     // Check if user is authenticated and is an admin
//     const session = await getServerSession(authOptions);
    
//     if (!session || session.user.role !== "ADMIN") {
//       return NextResponse.json(
//         { error: "Unauthorized" },
//         { status: 401 }
//       );
//     }
    
//     // Parse and validate request body
//     const body = await request.json();
//     const validatedData = statusUpdateSchema.parse(body);
    
//     // Find the membership request
//     const membershipRequest = await prisma.membershipRequest.findUnique({
//       where: { id: params.id },
//     });
    
//     if (!membershipRequest) {
//       return NextResponse.json(
//         { error: "Membership request not found" },
//         { status: 404 }
//       );
//     }
    
//     // If the request is already in the target status, return early
//     if (membershipRequest.status === validatedData.status) {
//       return NextResponse.json(
//         { message: `Request is already ${validatedData.status.toLowerCase()}` }
//       );
//     }
    
//     // Update the membership request status
//     const updatedRequest = await prisma.membershipRequest.update({
//       where: {
//         id: params.id,
//       },
//       data: {
//         status: validatedData.status,
//         notes: validatedData.notes,
//         reviewedBy: session.user.id,
//         reviewedAt: new Date(),
//       },
//     });
    
//     // If the request is approved and has a user associated with it,
//     // update the user's verification status
//     if (validatedData.status === "APPROVED" && membershipRequest.userId) {
//       await prisma.user.update({
//         where: {
//           id: membershipRequest.userId,
//         },
//         data: {
//           paymentVerified: true,
//         },
//       });
//     }
    
//     // Send email notification
//     await sendMembershipStatusEmail(updatedRequest);
    
//     return NextResponse.json(updatedRequest);
//   } catch (error) {
//     console.error("Error updating membership request status:", error);
    
//     if (error instanceof z.ZodError) {
//       return NextResponse.json(
//         { error: error.errors },
//         { status: 400 }
//       );
//     }
    
//     return NextResponse.json(
//       { error: "Failed to update membership request status" },
//       { status: 500 }
//     );
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { z } from "zod";
import { sendMembershipStatusEmail } from "@/lib/email";

// Schema for status update
const statusUpdateSchema = z.object({
  status: z.enum(["APPROVED", "REJECTED"]),
  notes: z.string().optional(),
});

// Using simpler parameter structure without destructuring
export async function PATCH(
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
    
    // Parse and validate request body
    const body = await request.json();
    const validatedData = statusUpdateSchema.parse(body);
    
    // Find the membership request
    const membershipRequest = await prisma.membershipRequest.findUnique({
      where: { id },
    });
    
    if (!membershipRequest) {
      return NextResponse.json(
        { error: "Membership request not found" },
        { status: 404 }
      );
    }
    
    // If the request is already in the target status, return early
    if (membershipRequest.status === validatedData.status) {
      return NextResponse.json(
        { message: `Request is already ${validatedData.status.toLowerCase()}` }
      );
    }
    
    // Update the membership request status
    const updatedRequest = await prisma.membershipRequest.update({
      where: {
        id,
      },
      data: {
        status: validatedData.status,
        notes: validatedData.notes,
        reviewedBy: session.user.id,
        reviewedAt: new Date(),
      },
    });
    
    // If the request is approved and has a user associated with it,
    // update the user's verification status
    if (validatedData.status === "APPROVED" && membershipRequest.userId) {
      await prisma.user.update({
        where: {
          id: membershipRequest.userId,
        },
        data: {
          paymentVerified: true,
        },
      });
    }
    
    // Send email notification
    await sendMembershipStatusEmail(
      membershipRequest.userEmail,
      membershipRequest.userName,
      updatedRequest.status,
      updatedRequest.notes
    );
    
    return NextResponse.json(updatedRequest);
  } catch (error) {
    console.error("Error updating membership request status:", error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: "Failed to update membership request status" },
      { status: 500 }
    );
  }
}
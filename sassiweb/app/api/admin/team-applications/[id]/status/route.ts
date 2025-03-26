// import { NextRequest, NextResponse } from "next/server";
// import { getServerSession } from "next-auth/next";
// import prisma from "@/lib/prisma";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import { z } from "zod";
// import { sendTeamApplicationStatusEmail } from "@/lib/email";

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
    
//     // Find the team application
//     const teamApplication = await prisma.teamApplication.findUnique({
//       where: {
//         id: params.id,
//       },
//       include: {
//         user: true,
//       },
//     });
    
//     if (!teamApplication) {
//       return NextResponse.json(
//         { error: "Team application not found" },
//         { status: 404 }
//       );
//     }
    
//     // If the application is already in the target status, return early
//     if (teamApplication.status === validatedData.status) {
//       return NextResponse.json(
//         { message: `Application is already ${validatedData.status.toLowerCase()}` }
//       );
//     }
    
//     // Update the team application status
//     const updatedApplication = await prisma.teamApplication.update({
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
    
//     // Send email notification to the user
//     if (teamApplication.user?.email) {
//       try {
//         await sendTeamApplicationStatusEmail(
//           teamApplication.user.email,
//           teamApplication.user.name || "SASSI Member",
//           teamApplication.department,
//           validatedData.status,
//           validatedData.notes
//         );
//       } catch (emailError) {
//         console.error("Failed to send status email:", emailError);
//         // Continue with the response even if email fails
//       }
//     }
    
//     return NextResponse.json({
//       message: `Team application ${validatedData.status.toLowerCase()} successfully`,
//       application: updatedApplication,
//     });
//   } catch (error) {
//     console.error("Error updating team application status:", error);
    
//     if (error instanceof z.ZodError) {
//       return NextResponse.json(
//         { error: error.errors },
//         { status: 400 }
//       );
//     }
    
//     return NextResponse.json(
//       { error: "Failed to update team application status" },
//       { status: 500 }
//     );
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { z } from "zod";
import { sendTeamApplicationStatusEmail } from "@/lib/email";

// Schema for status update
const statusUpdateSchema = z.object({
  status: z.enum(["APPROVED", "REJECTED"]),
  notes: z.string().optional(),
});

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
    
    // Parse and validate request body
    const body = await request.json();
    const validatedData = statusUpdateSchema.parse(body);
    
    // Find the team application
    const teamApplication = await prisma.teamApplication.findUnique({
      where: { id },
      include: { user: true }
    });
    
    if (!teamApplication) {
      return NextResponse.json(
        { error: "Team application not found" },
        { status: 404 }
      );
    }
    
    // If the application is already in the target status, return early
    if (teamApplication.status === validatedData.status) {
      return NextResponse.json(
        { message: `Application is already ${validatedData.status.toLowerCase()}` }
      );
    }
    
    // Update the team application status
    const updatedApplication = await prisma.teamApplication.update({
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
    
    // Send email notification
    if (teamApplication.user) {
      await sendTeamApplicationStatusEmail(
        teamApplication.user.email,
        teamApplication.user.name,
        teamApplication.department,
        updatedApplication.status,
        updatedApplication.notes
      );
    }
    
    return NextResponse.json(updatedApplication);
  } catch (error) {
    console.error("Error updating team application status:", error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: "Failed to update team application status" },
      { status: 500 }
    );
  }
}
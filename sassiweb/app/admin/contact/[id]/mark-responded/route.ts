// import { NextRequest, NextResponse } from "next/server";
// import { getServerSession } from "next-auth/next";
// import prisma from "@/lib/prisma";
// import { authOptions } from "@/app/api/auth/[...nextauth]/options";

// interface RouteContext {
//   params: {
//     id: string;
//   }
// }

// export async function GET(
//   request: NextRequest,
//   { params }: RouteContext
// ) {
//   const session = await getServerSession(authOptions);
  
//   if (!session || session.user.role !== "ADMIN") {
//     return NextResponse.redirect(new URL("/auth/signin?callbackUrl=/admin/contact", request.url));
//   }
  
//   try {
//     await prisma.contactSubmission.update({
//       where: {
//         id: params.id
//       },
//       data: {
//         responded: true
//       }
//     });
//   } catch (error) {
//     console.error("Error marking submission as responded:", error);
//   }
  
//   return NextResponse.redirect(new URL("/admin/contact", request.url));
// }

// This is a minimal export to make the file a valid module
export async function GET() {
  return new Response("Route not implemented", { status: 501 });
}
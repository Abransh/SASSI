import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  context: any
) {
  const id = context.params.id;
  
  // Check if user is authenticated and is an admin
  const session = await getServerSession(authOptions);
  
  if (!session || session.user.role !== "ADMIN") {
    const url = new URL('/auth/signin', request.url);
    url.searchParams.set('callbackUrl', '/admin/contact');
    return NextResponse.redirect(url);
  }
  
  try {
    // Mark submission as responded
    await prisma.contactSubmission.update({
      where: {
        id: id
      },
      data: {
        responded: true
      }
    });
  } catch (error) {
    console.error("Error marking submission as responded:", error);
  }
  
  // Redirect back to the contact page
  return NextResponse.redirect(new URL('/admin/contact', request.url));
}
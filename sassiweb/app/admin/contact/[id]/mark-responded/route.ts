import { NextRequest } from "next/server";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  
  if (!session || session.user.role !== "ADMIN") {
    redirect("/auth/signin?callbackUrl=/admin/contact");
  }
  
  try {
    await prisma.contactSubmission.update({
      where: {
        id: params.id
      },
      data: {
        responded: true
      }
    });
  } catch (error) {
    console.error("Error marking submission as responded:", error);
  }
  
  redirect("/admin/contact");
}
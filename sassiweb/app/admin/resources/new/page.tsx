// app/admin/resources/new/page.tsx
export const dynamic = 'force-dynamic';

import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ResourceForm from "@/components/admin/ResourceForm";

export default async function NewResourcePage() {
  // Check if user is authenticated and is an admin
  const session = await getServerSession(authOptions);
  
  if (!session || session.user.role !== "ADMIN") {
    redirect("/auth/signin?callbackUrl=/admin/resources/new");
  }
  
  // Fetch categories for the form
  const categories = await prisma.resourceCategory.findMany({
    orderBy: {
      order: "asc",
    },
  });
  
  // If no categories exist, redirect to create one first
  if (categories.length === 0) {
    redirect("/admin/resources/categories?noCategoriesRedirect=true");
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/resources"
          className="inline-flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={16} className="mr-2" />
          <span>Back to Resources</span>
        </Link>
        <h1 className="text-2xl font-bold">Add New Resource</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <ResourceForm categories={categories} />
      </div>
    </div>
  );
}
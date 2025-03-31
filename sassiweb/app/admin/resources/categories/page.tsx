// app/admin/resources/categories/page.tsx
export const dynamic = 'force-dynamic';

import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import AdminCategoryList from "@/components/admin/AdminCategoryList";
import AdminCategoryForm from "@/components/admin/AdminCategoryForm";

export default async function AdminCategoriesPage() {
  // Check if user is authenticated and is an admin
  const session = await getServerSession(authOptions);
  
  if (!session || session.user.role !== "ADMIN") {
    redirect("/auth/signin?callbackUrl=/admin/resources/categories");
  }
  
  // Fetch all categories with resource counts
  const categories = await prisma.resourceCategory.findMany({
    include: {
      _count: {
        select: {
          resources: true,
        },
      },
    },
    orderBy: {
      order: "asc",
    },
  });
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link
            href="/admin/resources"
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={16} className="mr-2" />
            <span>Back to Resources</span>
          </Link>
          <h1 className="text-2xl font-bold ml-4">Resource Categories</h1>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* New Category Form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-bold mb-4">Add New Category</h2>
            <AdminCategoryForm />
          </div>
        </div>
        
        {/* Categories List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-b">
              <h2 className="text-lg font-bold">Manage Categories</h2>
              <p className="text-sm text-gray-500 mt-1">
                Categories help organize resources for easier discovery.
                Resources must belong to a category.
              </p>
            </div>
            
            <AdminCategoryList initialCategories={categories} />
          </div>
        </div>
      </div>
    </div>
  );
}
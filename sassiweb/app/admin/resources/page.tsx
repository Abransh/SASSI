// app/admin/resources/page.tsx
export const dynamic = 'force-dynamic';

import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { Plus, FolderPlus, FileText, UploadCloud } from "lucide-react";
import AdminResourceList from "@/components/admin/AdminResourceList";

export default async function AdminResourcesPage() {
  // Check if user is authenticated and is an admin
  const session = await getServerSession(authOptions);
  
  if (!session || session.user.role !== "ADMIN") {
    redirect("/auth/signin?callbackUrl=/admin/resources");
  }
  
  // Fetch resources count by type
  const resourceTypeCounts = await prisma.resource.groupBy({
    by: ["resourceType"],
    _count: {
      id: true,
    },
  });
  
  // Convert to a more usable format
  const resourceCounts = resourceTypeCounts.reduce(
    (acc, { resourceType, _count }) => {
      acc[resourceType] = _count.id;
      return acc;
    },
    {} as Record<string, number>
  );
  
  // Fetch category counts
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
  
  // Get total resource count
  const totalResources = await prisma.resource.count();
  
  // Get featured resource count
  const featuredResources = await prisma.resource.count({
    where: {
      featured: true,
    },
  });
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Resources Management</h1>
        <div className="flex gap-3">
          <Link
            href="/admin/resources/categories"
            className="flex items-center px-3 py-2 bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200 transition-colors"
          >
            <FolderPlus size={16} className="mr-2" />
            Manage Categories
          </Link>
          <Link
            href="/admin/resources/new"
            className="flex items-center px-3 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
          >
            <Plus size={16} className="mr-2" />
            Add Resource
          </Link>
        </div>
      </div>
      
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium">Total Resources</h3>
            <FileText className="text-blue-500" size={20} />
          </div>
          <p className="text-2xl font-bold">{totalResources}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium">Featured Resources</h3>
            <UploadCloud className="text-purple-500" size={20} />
          </div>
          <p className="text-2xl font-bold">{featuredResources}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium">Categories</h3>
            <FolderPlus className="text-green-500" size={20} />
          </div>
          <p className="text-2xl font-bold">{categories.length}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium">Resource Types</h3>
            <FileText className="text-orange-500" size={20} />
          </div>
          <p className="text-2xl font-bold">{Object.keys(resourceCounts).length}</p>
        </div>
      </div>
      
      {/* Client component for resources list with filters and actions */}
      <AdminResourceList />
    </div>
  );
}
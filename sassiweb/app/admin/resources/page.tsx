// app/admin/resources/page.tsx
export const dynamic = 'force-dynamic';

import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { format } from "date-fns";
import Header from "@/components/Header";
import MobileMenu from "@/components/MobileMenu";
import Footer from "@/components/Footer";
import { Plus, Search, FileText } from "lucide-react";
import ResourceDeleteButton from "@/components/admin/ResourceDeleteButton";

type ResourceWithRelations = {
  id: string;
  title: string;
  description: string;
  fileUrl: string;
  thumbnailUrl: string | null;
  categoryId: string;
  slug: string;
  featured: boolean;
  resourceType: "DOCUMENT" | "TEMPLATE" | "GUIDE" | "VIDEO" | "LINK";
  createdAt: Date;
  updatedAt: Date;
  viewCount: number;
  downloadCount: number;
  category: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    imageUrl: string | null;
    order: number;
    createdAt: Date;
    updatedAt: Date;
  };
  _count: {
    resourceViews: number;
  };
};

export default async function ResourcesPage() {
  // Check if user is authenticated and is an admin
  const session = await getServerSession(authOptions);
  
  if (!session || session.user.role !== "ADMIN") {
    redirect("/auth/signin?callbackUrl=/admin/resources");
  }
  
  // Fetch all resources with their categories
  const resources = await prisma.resource.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      category: true,
      _count: {
        select: {
          resourceViews: true,
        },
      },
    },
  });
  
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <MobileMenu />

      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Resources</h1>
              <p className="text-gray-600">
                Manage all resources for SASSI members
              </p>
            </div>
            
            <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search resources..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent w-full"
                />
              </div>
              
              <Link 
                href="/admin/resources/new"
                className="flex items-center justify-center px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-md"
              >
                <Plus size={18} className="mr-2" />
                Create Resource
              </Link>
              
              <Link 
                href="/admin/resources/categories"
                className="flex items-center justify-center px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-md"
              >
                Manage Categories
              </Link>
            </div>
          </div>
          
          {/* Resources Table */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Views
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {resources.length > 0 ? (
                    resources.map((resource: ResourceWithRelations) => (
                      <tr key={resource.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900">
                            {resource.title}
                          </div>
                          <div className="text-sm text-gray-500 line-clamp-1">
                            {resource.description}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {resource.category.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            {resource.resourceType}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {resource._count.resourceViews} views
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {format(new Date(resource.createdAt), "MMM d, yyyy")}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                          <Link 
                            href={`/resources/${resource.slug}`} 
                            className="text-blue-600 hover:text-blue-900"
                          >
                            View
                          </Link>
                          <Link 
                            href={`/admin/resources/${resource.id}`} 
                            className="text-orange-600 hover:text-orange-900"
                          >
                            Edit
                          </Link>
                          <ResourceDeleteButton 
                            resourceId={resource.id} 
                            resourceTitle={resource.title} 
                          />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                        No resources found. 
                        <Link 
                          href="/admin/resources/new" 
                          className="text-orange-600 hover:text-orange-800 ml-1"
                        >
                          Create your first resource
                        </Link>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Help Card */}
          <div className="bg-blue-50 rounded-lg p-6 mt-8 border border-blue-100">
            <div className="flex items-start">
              <div className="mr-4 text-blue-500">
                <FileText size={24} />
              </div>
              <div>
                <h3 className="font-bold mb-2">About Resources</h3>
                <p className="text-sm text-gray-700 mb-4">
                  Resources are helpful materials for your members. They can be documents, templates, guides, videos, or links to external websites.
                </p>
                <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
                  <li>Create resources in different categories to keep them organized</li>
                  <li>Use descriptive titles and descriptions to help members find what they need</li>
                  <li>Track resource popularity through view counts</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
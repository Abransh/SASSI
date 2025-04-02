// app/admin/resources/categories/page.tsx
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
import { Plus, ArrowLeft, FileText } from "lucide-react";

export default async function ResourceCategoriesPage() {
  // Check if user is authenticated and is an admin
  const session = await getServerSession(authOptions);
  
  if (!session || session.user.role !== "ADMIN") {
    redirect("/auth/signin?callbackUrl=/admin/resources/categories");
  }
  
  // Fetch resource categories with resource counts
  const categories = await prisma.resourceCategory.findMany({
    orderBy: {
      order: "asc",
    },
    include: {
      _count: {
        select: {
          resources: true,
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
          <div className="mb-6">
            <Link
              href="/admin/resources"
              className="inline-flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft size={16} className="mr-2" />
              <span>Back to Resources</span>
            </Link>
          </div>
          
          <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Resource Categories</h1>
              <p className="text-gray-600">
                Manage categories for organizing resources
              </p>
            </div>
            
            <div className="mt-4 md:mt-0">
              <div className="flex gap-3">
                <button 
                  className="flex items-center justify-center px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-md"
                >
                  <Plus size={18} className="mr-2" />
                  Add Category
                </button>
                
                <Link
                  href="/api/admin/init-categories"
                  target="_blank"
                  className="flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md"
                >
                  Initialize Default Categories
                </Link>
              </div>
            </div>
          </div>
          
          {/* Categories Table */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Slug
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Resources
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {categories.length > 0 ? (
                    categories.map((category) => (
                      <tr key={category.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">
                            {category.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {category.slug}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-500 line-clamp-1">
                            {category.description || "No description"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {category._count.resources} resources
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {category.order}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                          <button className="text-orange-600 hover:text-orange-900">
                            Edit
                          </button>
                          {category._count.resources === 0 && (
                            <button className="text-red-600 hover:text-red-900">
                              Delete
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                        No categories found.
                        <button className="text-orange-600 hover:text-orange-800 ml-1">
                          Create your first category
                        </button>
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
                <h3 className="font-bold mb-2">About Resource Categories</h3>
                <p className="text-sm text-gray-700 mb-4">
                  Categories help organize resources for your members. Each resource must belong to a category.
                  Resources can be documents, templates, guides, videos, or links to external websites.
                </p>
                <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
                  <li>Create descriptive categories to help members find resources easily</li>
                  <li>Use the order field to control how categories are displayed</li>
                  <li>You cannot delete categories that contain resources</li>
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
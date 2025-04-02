// app/admin/resources/new/page.tsx
export const dynamic = 'force-dynamic';

import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import Header from "@/components/Header";
import MobileMenu from "@/components/MobileMenu";
import Footer from "@/components/Footer";
import ResourceForm from "@/components/admin/ResourceForm";

export default async function CreateResourcePage() {
  // Check if user is authenticated and is an admin
  const session = await getServerSession(authOptions);
  
  if (!session || session.user.role !== "ADMIN") {
    redirect("/auth/signin?callbackUrl=/admin/resources/new");
  }
  
  // Fetch resource categories
  const categories = await prisma.resourceCategory.findMany({
    orderBy: {
      order: "asc",
    },
    select: {
      id: true,
      name: true,
      slug: true,
    },
  });
  
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <MobileMenu />

      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Add New Resource</h1>
              <p className="text-gray-600">
                Upload a file or add an external resource link to the SASSI resource library
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <ResourceForm categories={categories} />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
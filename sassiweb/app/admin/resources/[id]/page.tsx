// app/admin/resources/[id]/page.tsx
export const dynamic = 'force-dynamic';

import { redirect, notFound } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import Header from "@/components/Header";
import MobileMenu from "@/components/MobileMenu";
import Footer from "@/components/Footer";
import ResourceForm from "@/components/admin/ResourceForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditResourcePage({ params }: PageProps) {
  // Resolve the params promise
  const { id } = await params;
  
  // Check if user is authenticated and is an admin
  const session = await getServerSession(authOptions);
  
  if (!session || session.user.role !== "ADMIN") {
    redirect(`/auth/signin?callbackUrl=/admin/resources/${id}`);
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
  
  // Fetch the resource
  const resource = await prisma.resource.findUnique({
    where: {
      id,
    },
  });
  
  // If resource not found, return 404
  if (!resource) {
    notFound();
  }
  
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <MobileMenu />

      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Edit Resource</h1>
              <p className="text-gray-600">
                Update resource information or change the file
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <ResourceForm categories={categories} resource={resource} />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
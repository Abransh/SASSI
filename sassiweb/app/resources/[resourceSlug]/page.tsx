import { notFound } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import Header from "@/components/Header";
import MobileMenu from "@/components/MobileMenu";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ExternalLink, Download } from "lucide-react";

export default async function ResourcePage({
  params,
}: {
  params: Promise<{ resourceSlug: string }>;
}) {
  const { resourceSlug } = await params;
  
  // Check if user is authenticated
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return notFound();
  }

  // Verify user exists in database
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user) {
    return notFound();
  }
  
  // Fetch the resource
  const resource = await prisma.resource.findUnique({
    where: {
      slug: resourceSlug,
    },
    include: {
      category: {
        select: {
          name: true,
          slug: true,
        },
      },
    },
  });
  
  // If resource not found, return 404
  if (!resource) {
    return notFound();
  }
  
  // Track resource view
  try {
    await prisma.resourceView.upsert({
      where: {
        resourceId_userId: {
          resourceId: resource.id,
          userId: session.user.id,
        },
      },
      update: {
        viewedAt: new Date(),
      },
      create: {
        resourceId: resource.id,
        userId: session.user.id,
        viewedAt: new Date(),
      },
    });
  } catch (error) {
    console.error('Failed to track resource view:', error);
  }
  
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <MobileMenu />

      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="mb-6">
                <h1 className="text-3xl font-bold mb-2">{resource.title}</h1>
                <p className="text-gray-600">{resource.description}</p>
              </div>
              
              <div className="flex flex-col space-y-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">Category:</span>
                  <span className="text-sm font-medium">{resource.category.name}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">Type:</span>
                  <span className="text-sm font-medium">{resource.resourceType}</span>
                </div>
                
                <div className="pt-4">
                  <Button
                    asChild
                    className="w-full sm:w-auto"
                  >
                    <a
                      href={resource.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center space-x-2"
                    >
                      {resource.resourceType === "LINK" ? (
                        <>
                          <ExternalLink className="h-4 w-4" />
                          <span>Open Link</span>
                        </>
                      ) : (
                        <>
                          <Download className="h-4 w-4" />
                          <span>Download Resource</span>
                        </>
                      )}
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
} 
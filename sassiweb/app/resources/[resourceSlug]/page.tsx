import { notFound } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import Header from "@/components/Header";
import MobileMenu from "@/components/MobileMenu";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ExternalLink, Download } from "lucide-react";
import { getResourceTypeIcon, formatResourceUrl } from "@/lib/resource-utils";
import ResourceViewActions from "@/components/ResourceViewActions";


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
  
    // Format the resource URL for viewing
    const formattedUrl = formatResourceUrl(resource.fileUrl, resource.resourceType);
  
    // Track resource view (we'll do this client-side in the ResourceViewActions component)
    
    const ResourceIcon = getResourceTypeIcon(resource.resourceType);
    

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
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex items-center mb-6">
                  <div className="p-3 rounded-lg bg-blue-100 text-blue-600 mr-4">
                    <ResourceIcon size={24} />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold">{resource.title}</h1>
                    <p className="text-gray-500">{resource.category.name}</p>
                  </div>
                </div>
                
                <div className="mb-8">
                  <p className="text-gray-700">{resource.description}</p>
                </div>
                
                {/* Resource Preview/Download */}
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-4">Resource Actions</h2>
                  <ResourceViewActions 
                    resource={{
                      id: resource.id,
                      fileUrl: formattedUrl,
                      resourceType: resource.resourceType,
                      title: resource.title
                    }} 
                  />
                </div>
                
                {/* Stats */}
                <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between text-sm text-gray-500">
                  <div>
                    Views: {resource.viewCount}
                  </div>
                  <div>
                    Downloads: {resource.downloadCount}
                  </div>
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
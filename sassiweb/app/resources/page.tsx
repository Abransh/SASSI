import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import Header from "@/components/Header";
import MobileMenu from "@/components/MobileMenu";
import Footer from "@/components/Footer";
import ResourceCategoryCard from "@/components/ResourceCategoryCard";
import FeaturedResourceCard from "@/components/FeaturedResourceCard";

export default async function ResourcesPage() {
  // Check if user is logged in
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect("/auth/signin?callbackUrl=/resources");
  }
  
  // Fetch resource categories
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
  
  // Fetch featured resources
  const featuredResources = await prisma.resource.findMany({
    where: {
      featured: true,
    },
    take: 3,
    orderBy: {
      updatedAt: "desc",
    },
  });
  
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <MobileMenu />

      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12 text-center max-w-3xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">SASSI Resources Hub</h1>
              <p className="text-lg text-gray-600">
                Access guides, templates, and resources to help make your journey to Milan 
                seamless and your stay in Italy enriching.
              </p>
            </div>
            
            {/* Featured Resources */}
            {featuredResources.length > 0 && (
              <div className="mb-16">
                <h2 className="text-2xl font-bold mb-6">Featured Resources</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {featuredResources.map((resource) => (
                    <FeaturedResourceCard key={resource.id} resource={resource} />
                  ))}
                </div>
              </div>
            )}
            
            {/* Resource Categories */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {categories.map((category) => (
                  <ResourceCategoryCard key={category.id} category={category} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
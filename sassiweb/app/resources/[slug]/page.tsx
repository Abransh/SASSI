import { redirect, notFound } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import Header from "@/components/Header";
import MobileMenu from "@/components/MobileMenu";
import Footer from "@/components/Footer";
import ResourceCard from "@/components/ResourceCard";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

type Props = {
  params: { slug: string };
  searchParams: { type?: string };
};

export default async function ResourceCategoryPage({ params, searchParams }: Props) {
  // Check if user is logged in
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect(`/auth/signin?callbackUrl=/resources/${params.slug}`);
  }
  
  // Get the category
  const category = await prisma.resourceCategory.findUnique({
    where: {
      slug: params.slug,
    },
  });
  
  if (!category) {
    notFound();
  }
  
  // Get resources in this category
  const resources = await prisma.resource.findMany({
    where: {
      categoryId: category.id,
      ...(searchParams.type
        ? { resourceType: searchParams.type as any }
        : {}),
    },
    orderBy: {
      title: "asc",
    },
  });
  
  // Count resources by type
  const resourceTypeCounts = await prisma.resource.groupBy({
    by: ["resourceType"],
    where: {
      categoryId: category.id,
    },
    _count: {
      id: true,
    },
  });
  
  // Create a map of resource type counts
  const typeCountMap = resourceTypeCounts.reduce(
    (acc, { resourceType, _count }) => {
      acc[resourceType] = _count.id;
      return acc;
    },
    {} as Record<string, number>
  );
  
  // Get all possible resource types
  const resourceTypes = ["DOCUMENT", "TEMPLATE", "GUIDE", "VIDEO", "LINK"];
  
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <MobileMenu />

      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Back Button */}
            <Link
              href="/resources"
              className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
            >
              <ChevronLeft size={20} />
              <span>Back to Resources</span>
            </Link>
            
            {/* Category Header */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="flex items-start gap-6">
                {/* Category Image */}
                <div className="hidden md:block h-24 w-24 rounded-lg bg-gray-100 relative flex-shrink-0">
                  {category.imageUrl ? (
                    <Image
                      src={category.imageUrl}
                      alt={category.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-4xl text-gray-300">
                        {category.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
                
                <div>
                  <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
                  {category.description && (
                    <p className="text-gray-600 mb-4 max-w-3xl">
                      {category.description}
                    </p>
                  )}
                  
                  {/* Resource Type Filters */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    <Link
                      href={`/resources/${params.slug}`}
                      className={`px-3 py-1 text-sm rounded-full ${
                        !searchParams.type
                          ? "bg-orange-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      All ({resources.length})
                    </Link>
                    
                    {resourceTypes.map((type) => {
                      const count = typeCountMap[type] || 0;
                      if (count === 0) return null;
                      
                      return (
                        <Link
                          key={type}
                          href={`/resources/${params.slug}?type=${type}`}
                          className={`px-3 py-1 text-sm rounded-full ${
                            searchParams.type === type
                              ? "bg-orange-600 text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {type.charAt(0) + type.slice(1).toLowerCase()} ({count})
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Resources Grid */}
            {resources.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resources.map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>
            ) : (
              <div className="bg-white p-12 rounded-lg shadow text-center">
                <h3 className="text-xl font-semibold mb-2">No resources found</h3>
                <p className="text-gray-600 mb-6">
                  {searchParams.type
                    ? `No ${searchParams.type.toLowerCase()} resources are available in this category.`
                    : "This category doesn't have any resources yet."}
                </p>
                <Link
                  href="/resources"
                  className="inline-flex items-center px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-md transition-colors"
                >
                  Browse All Resources
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
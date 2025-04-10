// app/resources/before-arrival/page.tsx

import { Metadata } from "next";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { FileText, ArrowLeft } from "lucide-react";
import ResourceCard from "@/components/ResourceCard";

export const metadata: Metadata = {
  title: "Before Arrival Resources - Students' Association of Indians in Milan",
  description: "Everything you need to know before coming to Milan",
};

export default async function BeforeArrivalResources() {
  const session = await getServerSession(authOptions);
  
  // This check is a redundancy (middleware should handle it), but keeping for safety
  if (!session) {
    redirect("/auth/signin?callbackUrl=/resources/before-arrival");
  }
  
  // Try to fetch resource category ID for "before-arrival"
  const category = await prisma.resourceCategory.findUnique({
    where: {
      slug: "before-arrival",
    },
  });
  
  // Fetch resources for this category
  const resources = category ? await prisma.resource.findMany({
    where: {
      categoryId: category.id,
    },
    orderBy: {
      title: "asc",
    },
  }) : [];
  
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <Link
          href="/resources"
          className="inline-flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={16} className="mr-2" />
          <span>Back to Resources Hub</span>
        </Link>
      </div>
      
      <div className="mb-12">
        <h1 className="text-3xl font-bold mb-4">Before Arrival Resources</h1>
        <p className="text-lg text-gray-600">
          Everything you need to know before coming to Milan - visas, accommodation, and preparation tips.
        </p>
      </div>
      
      {/* Resources List */}
      {resources.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {resources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-8 text-center mb-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText size={24} className="text-gray-400" />
          </div>
          <h2 className="text-xl font-medium mb-2">No Resources Yet</h2>
          <p className="text-gray-600 mb-4">
            We're currently building our resource library. Check back soon for updates!
          </p>
        </div>
      )}
      
      {/* Common Questions */}
      <div className="bg-blue-50 rounded-lg p-8 border border-blue-100 mb-12">
        <h2 className="text-2xl font-bold mb-4">Common Questions Before Arrival</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-bold mb-2">What documents do I need for my visa application?</h3>
            <p className="text-gray-700">
              For student visas, you typically need acceptance letters from your university, proof of accommodation, proof of financial means, health insurance, and other supporting documents. Check our visa guide in the resources section.
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-2">How can I find accommodation in Milan?</h3>
            <p className="text-gray-700">
              We recommend starting your search early. Options include university dormitories, private rentals, and shared apartments. Our accommodation guide provides websites, contacts, and tips for finding housing.
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-2">What should I pack for Milan?</h3>
            <p className="text-gray-700">
              Milan has distinct seasons, so pack accordingly. Winter can be cold and rainy, while summers are hot and humid. Don't forget important documents, medications, and adapters for electronics.
            </p>
          </div>
        </div>
        <div className="mt-6">
          <Link
            href="/faqs"
            className="text-blue-600 hover:underline font-medium"
          >
            View Full FAQs →
          </Link>
        </div>
      </div>
      
      {/* Need Help */}
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <h2 className="text-xl font-bold mb-2">Need Personalized Help?</h2>
        <p className="text-gray-600 mb-4">
          Our team is here to support you. Reach out if you have specific questions or concerns.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
}
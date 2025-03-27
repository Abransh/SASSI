// app/resources/living-in-milan/page.tsx

import { Metadata } from "next";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { FileText, ArrowLeft } from "lucide-react";
import ResourceCard from "@/components/ResourceCard";

export const metadata: Metadata = {
  title: "Living in Milan Resources - Students' Association of Indians in Milan",
  description: "Resources for navigating daily life in Milan",
};

export default async function LivingInMilanResources() {
  const session = await getServerSession(authOptions);
  
  // This check is a redundancy (middleware should handle it), but keeping for safety
  if (!session) {
    redirect("/auth/signin?callbackUrl=/resources/living-in-milan");
  }
  
  // Try to fetch resource category ID for "living-in-milan"
  const category = await prisma.resourceCategory.findUnique({
    where: {
      slug: "living-in-milan",
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
        <h1 className="text-3xl font-bold mb-4">Living in Milan Resources</h1>
        <p className="text-lg text-gray-600">
          Resources to help you settle in and navigate daily life in Milan - from transportation to healthcare.
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
      <div className="bg-green-50 rounded-lg p-8 border border-green-100 mb-12">
        <h2 className="text-2xl font-bold mb-4">Common Questions About Living in Milan</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-bold mb-2">How do I get a Codice Fiscale?</h3>
            <p className="text-gray-700">
              The Codice Fiscale is an Italian tax code required for many services. You can obtain it at the Agenzia delle Entrate offices. Our guide provides step-by-step instructions and required documents.
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-2">How does public transportation work in Milan?</h3>
            <p className="text-gray-700">
              Milan has an extensive network of metros, trams, and buses. The ATM app is useful for navigation. Students can get discounted passes. Our transportation guide explains routes, tickets, and student discounts.
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-2">Where can I find Indian groceries in Milan?</h3>
            <p className="text-gray-700">
              Several Indian grocery stores can be found around Milan, particularly near Central Station and in Chinatown. Our food guide lists popular stores, their locations, and specialties.
            </p>
          </div>
        </div>
        <div className="mt-6">
          <Link
            href="/faqs"
            className="text-green-600 hover:underline font-medium"
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
          href="/contact-us"
          className="inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
}
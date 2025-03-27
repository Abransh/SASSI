// app/resources/after-graduation/page.tsx

import { Metadata } from "next";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { FileText, ArrowLeft } from "lucide-react";
import ResourceCard from "@/components/ResourceCard";

export const metadata: Metadata = {
  title: "After Graduation Resources - Students' Association of Indians in Milan",
  description: "Resources for your next steps after completing your studies",
};

export default async function AfterGraduationResources() {
  const session = await getServerSession(authOptions);
  
  // This check is a redundancy (middleware should handle it), but keeping for safety
  if (!session) {
    redirect("/auth/signin?callbackUrl=/resources/after-graduation");
  }
  
  // Try to fetch resource category ID for "after-graduation"
  const category = await prisma.resourceCategory.findUnique({
    where: {
      slug: "after-graduation",
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
        <h1 className="text-3xl font-bold mb-4">After Graduation Resources</h1>
        <p className="text-lg text-gray-600">
          Resources for your next steps after completing your studies - career opportunities, staying in Italy, and more.
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
      <div className="bg-purple-50 rounded-lg p-8 border border-purple-100 mb-12">
        <h2 className="text-2xl font-bold mb-4">Common Questions After Graduation</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-bold mb-2">Can I stay in Italy after graduation?</h3>
            <p className="text-gray-700">
              Yes, you can apply for a "permesso di soggiorno per attesa occupazione" (residence permit for job search) which allows you to stay in Italy for up to 12 months after graduation to look for employment.
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-2">What job opportunities are available in Italy for international graduates?</h3>
            <p className="text-gray-700">
              Many multinational companies and Italian businesses value international talent, especially in fields like engineering, design, IT, and business. Our career guide provides insights on job searching and networking in Italy.
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-2">How do I convert my student residence permit to a work permit?</h3>
            <p className="text-gray-700">
              Once you find employment, your employer will typically assist with the process. You'll need to apply for a "permesso di soggiorno per lavoro" (work residence permit) through the Questura with supporting documentation from your employer.
            </p>
          </div>
        </div>
        <div className="mt-6">
          <Link
            href="/faqs"
            className="text-purple-600 hover:underline font-medium"
          >
            View Full FAQs →
          </Link>
        </div>
      </div>
      
      {/* Career Support */}
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <h2 className="text-xl font-bold mb-2">Need Career Support?</h2>
        <p className="text-gray-600 mb-4">
          SASSI connects graduates with career opportunities and professional networks in Italy and beyond.
        </p>
        <Link
          href="/contact-us"
          className="inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
        >
          Get Career Advice
        </Link>
      </div>
    </div>
  );
}
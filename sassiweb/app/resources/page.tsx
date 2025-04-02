// app/resources/page.tsx - Main resources hub page

import { Metadata } from "next";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { FileText, BookOpen, GraduationCap } from "lucide-react";
import FeaturedResourceCard from "@/components/FeaturedResourceCard";

export const metadata: Metadata = {
  title: "Resources Hub - Students' Association of Indians in Milan",
  description: "Access exclusive resources for Indian students in Milan",
};

export default async function ResourcesHub() {
  const session = await getServerSession(authOptions);
  
  // This check is a redundancy (middleware should handle it), but keeping for safety
  if (!session) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold mb-4">Authentication Required</h1>
        <p className="mb-6">Please sign in to access resources.</p>
        <Link 
          href="/auth/signin?callbackUrl=/resources"
          className="inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
        >
          Sign In
        </Link>
      </div>
    );
  }
  
  // Fetch featured resources
  const featuredResources = await prisma.resource.findMany({
    where: {
      featured: true,
    },
    take: 3,
    orderBy: {
      createdAt: "desc",
    },
  });
  
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Resources Hub</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Access exclusive guides, templates, and resources to help you navigate life as an Indian student in Milan.
        </p>
      </div>
      
      {/* Resource Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <Link
          href="/resources/before-arrival"
          className="bg-white rounded-lg shadow-md p-8 text-center hover:shadow-lg transition-shadow"
        >
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText size={32} className="text-blue-600" />
          </div>
          <h2 className="text-xl font-bold mb-2">Before Arrival</h2>
          <p className="text-gray-600">
            Everything you need to know before coming to Milan - visas, accommodation, and preparation tips.
          </p>
        </Link>
        
        <Link
          href="/resources/living-in-milan"
          className="bg-white rounded-lg shadow-md p-8 text-center hover:shadow-lg transition-shadow"
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen size={32} className="text-green-600" />
          </div>
          <h2 className="text-xl font-bold mb-2">Living in Milan</h2>
          <p className="text-gray-600">
            Resources to help you settle in and navigate daily life in Milan - from transportation to healthcare.
          </p>
        </Link>
        
        <Link
          href="/resources/after-graduation"
          className="bg-white rounded-lg shadow-md p-8 text-center hover:shadow-lg transition-shadow"
        >
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <GraduationCap size={32} className="text-purple-600" />
          </div>
          <h2 className="text-xl font-bold mb-2">After Graduation</h2>
          <p className="text-gray-600">
            Resources for your next steps after completing your studies - career opportunities, staying in Italy, and more.
          </p>
        </Link>
      </div>
      
      {/* Featured Resources */}
      {featuredResources.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Featured Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredResources.map((resource) => (
              <FeaturedResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </div>
      )}
      
      {/* Recently Added */}
      <div className="bg-orange-50 rounded-lg p-8 border border-orange-100">
        <h2 className="text-2xl font-bold mb-4">Need Something Specific?</h2>
        <p className="text-gray-700 mb-4">
          Can't find what you're looking for? Have a suggestion for a resource that would be helpful? Let us know!
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
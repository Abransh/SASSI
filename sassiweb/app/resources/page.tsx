// app/resources/page.tsx - Main resources hub page

import { Metadata } from "next";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { FileText, BookOpen, GraduationCap, Home, Bus, UserCheck } from "lucide-react";
import FeaturedResourceCard from "@/components/FeaturedResourceCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata: Metadata = {
  title: "Resources Hub - Students' Association of Indians in Milan",
  description: "Access exclusive resources for Indian students in Milan",
};

const categories = [
  {
    title: "Before Coming to Milan",
    icon: Home,
    resources: [
      {
        title: "Accommodation Guide",
        description: "Comprehensive guide to finding accommodation in Milan, including tips on different neighborhoods, rental procedures, and important considerations.",
        slug: "accommodation",
        icon: Home,
        pdfPath: "/assests/FAQs Accomodation.pdf"
      }
    ]
  },
  {
    title: "Living in Milan",
    icon: UserCheck,
    resources: [
      {
        title: "Residenza and Carta d'Identità",
        description: "Step-by-step guide to obtaining your residence permit (Residenza) and Italian ID card (Carta d'Identità).",
        slug: "residenza-carta-identita",
        icon: UserCheck,
        pdfPath: "/assests/FAQ- Residenza and Carta d'identita.pdf"
      },
      {
        title: "Reduced ATM Mobility Pass",
        description: "Information about the reduced fare ATM public transport pass for students, including eligibility and application process.",
        slug: "reduced-atm-mobility-pass",
        icon: Bus,
        pdfPath: "/assests/ATM subscription reduced rate.pdf"
      },
      {
        title: "Dichiarazione Sostitutiva di Atto di Notorietà",
        description: "Template and instructions for the Declaration of Domicile (Dichiarazione Sostitutiva di Atto di Notorietà) required for residency.",
        slug: "dichiarazione-sostitutiva",
        icon: FileText,
        pdfPath: "/assests/Dichiarazione Sostitutiva di Atto di Notorietà – Elezione di Domicilio.pdf"
      }
    ]
  }
]

export default async function ResourcesPage() {
  const session = await getServerSession(authOptions);
  
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
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Resources Hub</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Access exclusive guides, templates, and resources to help you navigate life as an Indian student in Milan.
        </p>
      </div>
      
      {categories.map((category) => (
        <div key={category.title} className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <category.icon className="w-6 h-6 text-orange-500" />
            <h2 className="text-2xl font-semibold">{category.title}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.resources.map((resource) => (
              <Link key={resource.slug} href={`/resources/${resource.slug}`}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <resource.icon className="w-5 h-5 text-orange-500" />
                      <CardTitle>{resource.title}</CardTitle>
                    </div>
                    <CardDescription>{resource.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <FileText className="w-4 h-4" />
                      Click to view or download PDF
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      ))}
      
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
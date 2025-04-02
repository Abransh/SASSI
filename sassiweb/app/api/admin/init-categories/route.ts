// app/api/admin/init-categories/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    // Check if user is authenticated and is an admin
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    
    // Check if any categories exist
    const categoryCount = await prisma.resourceCategory.count();
    
    if (categoryCount === 0) {
      // Create default categories
      const categories = [
        {
          name: "Before Arrival",
          slug: "before-arrival",
          description: "Everything you need to know before coming to Milan - visas, accommodation, and preparation tips.",
          order: 1,
        },
        {
          name: "Living in Milan",
          slug: "living-in-milan",
          description: "Resources to help you settle in and navigate daily life in Milan - from transportation to healthcare.",
          order: 2,
        },
        {
          name: "After Graduation",
          slug: "after-graduation",
          description: "Resources for your next steps after completing your studies - career opportunities, staying in Italy, and more.",
          order: 3,
        },
      ];
      
      // Insert categories
      for (const category of categories) {
        await prisma.resourceCategory.upsert({
          where: { slug: category.slug },
          update: {}, // Do nothing if it exists
          create: category,
        });
      }
      
      return NextResponse.json({
        success: true,
        message: "Default resource categories created successfully!",
        categories: await prisma.resourceCategory.findMany(),
      });
    } else {
      return NextResponse.json({
        success: true,
        message: "Resource categories already exist",
        categories: await prisma.resourceCategory.findMany(),
      });
    }
  } catch (error) {
    console.error("Error creating resource categories:", error);
    return NextResponse.json(
      { 
        error: "Failed to create resource categories",
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
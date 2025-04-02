// Create Resource Categories
// Can be run directly in the API route or using a separate script

import prisma from "@/lib/prisma";

/**
 * Creates the default resource categories if they don't exist
 */
export async function createDefaultResourceCategories() {
  try {
    // Check if any categories exist
    const categoryCount = await prisma.resourceCategory.count();
    
    if (categoryCount === 0) {
      console.log("No resource categories found. Creating default categories...");
      
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
        console.log(`Created category: ${category.name}`);
      }
      
      console.log("Default resource categories created successfully!");
      return true;
    } else {
      console.log("Resource categories already exist. Skipping creation.");
      return false;
    }
  } catch (error) {
    console.error("Error creating resource categories:", error);
    throw error;
  }
}
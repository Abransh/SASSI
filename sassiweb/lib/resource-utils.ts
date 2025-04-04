import { FileText, FileCode, BookOpen, Video, Link as LinkIcon } from "lucide-react";

/**
 * Get the appropriate icon component for the resource type
 */
export function getResourceTypeIcon(resourceType: string) {
  switch (resourceType) {
    case "DOCUMENT":
      return FileText;
    case "TEMPLATE":
      return FileCode;
    case "GUIDE":
      return BookOpen;
    case "VIDEO":
      return Video;
    case "LINK":
      return LinkIcon;
    default:
      return FileText;
  }
}

/**
 * Get a color for the resource type
 */
export function getResourceTypeColor(resourceType: string): string {
  switch (resourceType) {
    case "DOCUMENT":
      return "blue";
    case "TEMPLATE":
      return "purple";
    case "GUIDE":
      return "orange";
    case "VIDEO":
      return "red";
    case "LINK":
      return "green";
    default:
      return "gray";
  }
}

/**
 * Get a friendly name for the resource type
 */
export function getResourceTypeName(resourceType: string): string {
  switch (resourceType) {
    case "DOCUMENT":
      return "Document";
    case "TEMPLATE":
      return "Template";
    case "GUIDE":
      return "Guide";
    case "VIDEO":
      return "Video";
    case "LINK":
      return "External Link";
    default:
      return resourceType;
  }
}

/**
 * Track a resource view
 */
// export async function trackResourceView(resourceId: string, downloaded: boolean = false): Promise<void> {
//   try {
//     await fetch(`/api/resources/${resourceId}/track`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ downloaded }),
//     });
//   } catch (error) {
//     console.error("Error tracking resource view:", error);
//   }
// }


// Add these functions to your resource-utils.ts file

/**
 * Format Cloudinary URL for optimal viewing based on resource type
 */
export function formatResourceUrl(url: string, resourceType: string): string {
  if (!url) return '';
  
  // If it's already a properly formatted URL, return it
  if (url.startsWith('http')) {
    // For Cloudinary URLs, make sure they're optimized for viewing
    if (url.includes('cloudinary.com') && resourceType !== 'LINK') {
      // If it's a PDF, ensure it's using the correct format for viewing
      if (url.toLowerCase().endsWith('.pdf') || url.includes('/pdf/')) {
        // Use fl_attachment for forced download or fl_document for viewing
        return url.replace('/upload/', '/upload/fl_document/');
      }
      
      // For other documents, use the raw access mode
      if (['DOCUMENT', 'TEMPLATE', 'GUIDE'].includes(resourceType)) {
        return url;
      }
    }
    return url;
  }
  
  // If it's not a proper URL, return empty
  return '';
}

/**
 * Format Cloudinary URL for direct download
 */
export function formatDownloadUrl(url: string, title: string): string {
  if (!url) return '';
  
  // If it's a Cloudinary URL, modify it for download
  if (url.includes('cloudinary.com')) {
    // Add attachment flag to force download
    const downloadUrl = url.replace('/upload/', '/upload/fl_attachment/');
    
    // Try to get a proper filename from the URL or use the title
    const filename = title || url.split('/').pop() || 'download';
    
    // Add attachment disposition to suggest filename
    return `${downloadUrl}`;
  }
  
  return url;
}

/**
 * Track a resource view or download
 */
export async function trackResourceView(resourceId: string, downloaded: boolean = false): Promise<void> {
  try {
    const response = await fetch(`/api/resources/${resourceId}/track`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ downloaded }),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to track resource ${downloaded ? 'download' : 'view'}`);
    }
  } catch (error) {
    console.error(`Error tracking resource ${downloaded ? 'download' : 'view'}:`, error);
    // We don't throw the error here to prevent blocking the user experience
  }
}
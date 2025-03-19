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
export async function trackResourceView(resourceId: string, downloaded: boolean = false): Promise<void> {
  try {
    await fetch(`/api/resources/${resourceId}/track`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ downloaded }),
    });
  } catch (error) {
    console.error("Error tracking resource view:", error);
  }
}
"use client";

import { useState } from "react";
import { Download, ExternalLink, Eye, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackResourceView } from "@/lib/resource-utils";
import { toast } from "sonner";

type ResourceViewActionsProps = {
  resource: {
    id: string;
    fileUrl: string;
    resourceType: string;
    title: string;
  };
};

export default function ResourceViewActions({ resource }: ResourceViewActionsProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isViewing, setIsViewing] = useState(false);
  
  const handleDownload = async () => {
    setIsDownloading(true);
    
    try {
      // Track resource download
      await trackResourceView(resource.id, true);
      
      // For direct download from Cloudinary
      if (resource.resourceType === "LINK") {
        // If it's a link, just open it in a new tab
        window.open(resource.fileUrl, "_blank");
      } else {
        // Use the download API endpoint which will handle tracking and redirect
        window.location.href = `/api/resources/${resource.id}/download`;
      }
      
      toast.success("Download started");
    } catch (error) {
      console.error("Error downloading resource:", error);
      toast.error("Failed to download resource. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };
  
  const handleView = async () => {
    setIsViewing(true);
    
    try {
      // Track resource view
      await trackResourceView(resource.id);
      
      // Direct file viewing based on resource type
      if (resource.resourceType === "LINK") {
        window.open(resource.fileUrl, "_blank");
      } else if (resource.fileUrl.toLowerCase().endsWith(".pdf")) {
        // For PDFs, use Google Docs Viewer as a fallback option
        const encodedUrl = encodeURIComponent(resource.fileUrl);
        window.open(`https://docs.google.com/viewer?url=${encodedUrl}&embedded=true`, "_blank");
      } else {
        // For other files, try to open directly
        window.open(resource.fileUrl, "_blank");
      }
      
      toast.success("Opening resource");
    } catch (error) {
      console.error("Error viewing resource:", error);
      toast.error("Failed to open resource. Please try downloading instead.");
    } finally {
      setIsViewing(false);
    }
  };
  
  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard");
  };
  
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <Button
        onClick={handleDownload}
        className="bg-orange-600 hover:bg-orange-700"
        disabled={isDownloading}
      >
        <Download className="mr-2 h-4 w-4" />
        {isDownloading ? "Downloading..." : "Download"}
      </Button>
      
      {resource.resourceType === "LINK" ? (
        <Button
          onClick={handleView}
          variant="outline"
          disabled={isViewing}
        >
          <ExternalLink className="mr-2 h-4 w-4" />
          {isViewing ? "Opening..." : "Visit Link"}
        </Button>
      ) : (
        <Button
          onClick={handleView}
          variant="outline"
          disabled={isViewing}
        >
          <Eye className="mr-2 h-4 w-4" />
          {isViewing ? "Opening..." : "View Document"}
        </Button>
      )}
      
      <Button
        onClick={handleCopyLink}
        variant="outline"
      >
        <Share2 className="mr-2 h-4 w-4" />
        Share
      </Button>
    </div>
  );
}
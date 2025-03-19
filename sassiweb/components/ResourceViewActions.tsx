"use client";

import { useState } from "react";
import { Download, ExternalLink, FileText, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackResourceView } from "@/lib/resource-utils";
import { toast } from "sonner";

type ResourceViewActionsProps = {
  resource: {
    id: string;
    fileUrl: string;
    resourceType: string;
  };
};

export default function ResourceViewActions({ resource }: ResourceViewActionsProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  
  const handleDownload = async () => {
    setIsDownloading(true);
    
    try {
      // Track resource download
      await trackResourceView(resource.id, true);
      
      // Trigger file download
      window.open(resource.fileUrl, "_blank");
      
      toast.success("Download started");
    } catch (error) {
      console.error("Error downloading resource:", error);
      toast.error("Failed to download resource");
    } finally {
      setIsDownloading(false);
    }
  };
  
  const handleView = async () => {
    try {
      // Track resource view
      await trackResourceView(resource.id);
      
      // Open file in new tab
      window.open(resource.fileUrl, "_blank");
    } catch (error) {
      console.error("Error viewing resource:", error);
      toast.error("Failed to open resource");
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
        >
          <ExternalLink className="mr-2 h-4 w-4" />
          Visit Link
        </Button>
      ) : (
        <Button
          onClick={handleView}
          variant="outline"
        >
          <FileText className="mr-2 h-4 w-4" />
          View Document
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
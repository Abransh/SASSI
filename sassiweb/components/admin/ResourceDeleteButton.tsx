"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Trash, Loader2 } from "lucide-react";

interface ResourceDeleteButtonProps {
  resourceId: string;
  resourceTitle: string;
}

export default function ResourceDeleteButton({ resourceId, resourceTitle }: ResourceDeleteButtonProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (e: React.MouseEvent) => {
    // Prevent event bubbling
    e.preventDefault();
    e.stopPropagation();
    
    // Ask for confirmation
    if (!confirm(`Are you sure you want to delete the resource "${resourceTitle}"?\nThis action cannot be undone.`)) {
      return;
    }
    
    setIsDeleting(true);
    
    try {
      const response = await fetch(`/api/resources/${resourceId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Failed to delete resource. Status: ${response.status}`);
      }
      
      toast.success("Resource deleted successfully");
      
      // Refresh the page to update the list
      router.refresh();
    } catch (error) {
      console.error("Error deleting resource:", error);
      toast.error(error instanceof Error ? error.message : "Failed to delete resource");
    } finally {
      setIsDeleting(false);
    }
  };

  if (isDeleting) {
    return (
      <span className="inline-flex items-center text-gray-400 cursor-not-allowed">
        <Loader2 className="mr-1 h-3 w-3 animate-spin" />
        Deleting...
      </span>
    );
  }

  return (
    <button
      onClick={handleDelete}
      className="text-red-600 hover:text-red-900 inline-flex items-center"
      disabled={isDeleting}
    >
      <Trash className="mr-1 h-3 w-3" />
      Delete
    </button>
  );
}
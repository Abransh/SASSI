"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Trash, Loader2 } from "lucide-react";

interface ResourceDeleteButtonProps {
  resourceId: string;
  resourceTitle: string;
  variant?: "button" | "link";
}

export default function ResourceDeleteButton({
  resourceId,
  resourceTitle,
  variant = "link",
}: ResourceDeleteButtonProps) {
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
      // Optionally redirect back to resources list
      router.push("/admin/resources");
    } catch (error) {
      console.error("Error deleting resource:", error);
      toast.error(error instanceof Error ? error.message : "Failed to delete resource");
    } finally {
      setIsDeleting(false);
    }
  };

  if (variant === "button") {
    return (
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="inline-flex items-center px-4 py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-50 transition-colors"
      >
        {isDeleting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Deleting...
          </>
        ) : (
          <>
            <Trash className="mr-2 h-4 w-4" />
            Delete Resource
          </>
        )}
      </button>
    );
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="text-red-600 hover:text-red-900"
    >
      {isDeleting ? (
        <span className="inline-flex items-center">
          <Loader2 className="mr-1 h-3 w-3 animate-spin" />
          Deleting...
        </span>
      ) : (
        "Delete"
      )}
    </button>
  );
}
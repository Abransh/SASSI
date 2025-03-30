// File: components/admin/EventDeleteButton.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface EventDeleteButtonProps {
  eventId: string;
  eventTitle: string;
}

export default function EventDeleteButton({ eventId, eventTitle }: EventDeleteButtonProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (e: React.MouseEvent) => {
    // Prevent event bubbling
    e.preventDefault();
    e.stopPropagation();
    
    // Ask for confirmation
    if (!confirm(`Are you sure you want to delete the event "${eventTitle}"?\nThis action cannot be undone.`)) {
      return;
    }
    
    setIsDeleting(true);
    
    try {
      const response = await fetch(`/api/events/${eventId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Failed to delete event. Status: ${response.status}`);
      }
      
      toast.success("Event deleted successfully");
      
      // Refresh the page to update the list
      router.refresh();
    } catch (error) {
      console.error("Error deleting event:", error);
      toast.error(error instanceof Error ? error.message : "Failed to delete event");
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
      Delete
    </button>
  );
}
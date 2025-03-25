"use client";

import { useState } from "react";
import { CheckCircle, XCircle, ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface TeamApplicationStatusActionsProps {
  applicationId: string;
  currentStatus: "PENDING" | "APPROVED" | "REJECTED";
}

export default function TeamApplicationStatusActions({
  applicationId,
  currentStatus,
}: TeamApplicationStatusActionsProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<string | null>(null);
  
  const handleUpdateStatus = async (status: "APPROVED" | "REJECTED") => {
    setIsLoading(status);
    
    try {
      const response = await fetch(`/api/admin/team-applications/${applicationId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to update status");
      }
      
      toast.success(`Team application ${status.toLowerCase()}`);
      router.refresh();
    } catch (error) {
      console.error(`Error updating status to ${status}:`, error);
      toast.error(error instanceof Error ? error.message : "Failed to update status");
    } finally {
      setIsLoading(null);
    }
  };
  
  const handleViewDetails = () => {
    // In a real implementation, this would navigate to a detailed view
    // For now, we'll just show a toast
    toast.info("Viewing details (not implemented)");
  };
  
  if (currentStatus === "PENDING") {
    return (
      <div className="flex space-x-2">
        <button
          onClick={() => handleUpdateStatus("APPROVED")}
          disabled={isLoading !== null}
          className="p-1.5 rounded bg-green-50 text-green-600 hover:bg-green-100"
          title="Approve"
        >
          {isLoading === "APPROVED" ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <CheckCircle size={16} />
          )}
        </button>
        <button
          onClick={() => handleUpdateStatus("REJECTED")}
          disabled={isLoading !== null}
          className="p-1.5 rounded bg-red-50 text-red-600 hover:bg-red-100"
          title="Reject"
        >
          {isLoading === "REJECTED" ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <XCircle size={16} />
          )}
        </button>
        <button
          onClick={handleViewDetails}
          disabled={isLoading !== null}
          className="p-1.5 rounded bg-gray-50 text-gray-600 hover:bg-gray-100"
          title="View Details"
        >
          <ArrowRight size={16} />
        </button>
      </div>
    );
  }
  
  // For APPROVED or REJECTED status, just show view details
  return (
    <div className="flex space-x-2">
      <button
        onClick={handleViewDetails}
        disabled={isLoading !== null}
        className="p-1.5 rounded bg-gray-50 text-gray-600 hover:bg-gray-100"
        title="View Details"
      >
        <ArrowRight size={16} />
      </button>
    </div>
  );
}
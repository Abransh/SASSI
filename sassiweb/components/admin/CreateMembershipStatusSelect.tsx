"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Loader2, Plus, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

type Status = "PENDING" | "APPROVED" | "REJECTED";

interface CreateMembershipStatusSelectProps {
  userId: string;
  userName: string | null;
  userEmail: string;
}

export default function CreateMembershipStatusSelect({
  userId,
  userName,
  userEmail,
}: CreateMembershipStatusSelectProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<Status | null>(null);
  const [requestId, setRequestId] = useState<string | null>(null);

  const handleCreateMembership = async (initialStatus: Status = "PENDING") => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/admin/users/${userId}/create-membership`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          status: initialStatus,
          firstName: userName?.split(" ")[0] || "Member",
          lastName: userName?.split(" ").slice(1).join(" ") || "",
          email: userEmail,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create membership");
      }

      const data = await response.json();
      setRequestId(data.id);
      setStatus(initialStatus);
      
      toast.success(`Membership ${initialStatus.toLowerCase()} created successfully`);
    } catch (error) {
      console.error("Error creating membership:", error);
      toast.error("Failed to create membership");
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (newStatus: Status) => {
    if (!requestId) return;
    
    try {
      setIsLoading(true);
      const response = await fetch(`/api/admin/membership-requests/${requestId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      setStatus(newStatus);
      toast.success(`Membership status updated to ${newStatus}`);
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update membership status");
    } finally {
      setIsLoading(false);
    }
  };

  if (status === null) {
    return (
      <div className="flex gap-2">
        <Button
          size="sm"
          variant="outline"
          className="text-green-600 border-green-200 bg-green-50 hover:bg-green-100"
          onClick={() => handleCreateMembership("APPROVED")}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 size={14} className="animate-spin mr-1" />
          ) : (
            <UserCheck size={14} className="mr-1" />
          )}
          <span className="text-xs">Approve</span>
        </Button>
        
        <Button
          size="sm"
          variant="outline"
          onClick={() => handleCreateMembership("PENDING")}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 size={14} className="animate-spin mr-1" />
          ) : (
            <Plus size={14} className="mr-1" />
          )}
          <span className="text-xs">Create</span>
        </Button>
      </div>
    );
  }

  return (
    <select
      value={status}
      onChange={(e) => handleStatusChange(e.target.value as Status)}
      disabled={isLoading}
      className={`rounded-md border px-2 py-1 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 ${
        status === "APPROVED"
          ? "bg-green-100 text-green-800 border-green-200"
          : status === "REJECTED"
          ? "bg-red-100 text-red-800 border-red-200"
          : "bg-yellow-100 text-yellow-800 border-yellow-200"
      }`}
    >
      <option value="PENDING">PENDING</option>
      <option value="APPROVED">APPROVED</option>
      <option value="REJECTED">REJECTED</option>
    </select>
  );
}
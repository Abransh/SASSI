"use client";

import { useState } from "react";
import { toast } from "sonner";

type Status = "PENDING" | "APPROVED" | "REJECTED";

interface MembershipStatusSelectProps {
  requestId: string;
  currentStatus: Status;
}

export default function MembershipStatusSelect({
  requestId,
  currentStatus,
}: MembershipStatusSelectProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<Status>(currentStatus);

  const handleStatusChange = async (newStatus: Status) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/admin/membership-requests/${requestId}`, {
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
      toast.success(`Membership request status updated to ${newStatus}`);
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update membership request status");
      setStatus(currentStatus); // Revert on error
    } finally {
      setIsLoading(false);
    }
  };

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
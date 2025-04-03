"use client";

import { useState } from "react";
import { toast } from "sonner";

type Status = "PENDING" | "APPROVED" | "REJECTED";

const DEPARTMENTS = {
  "student-support": { name: "Student Support", icon: "👋" },
  "events": { name: "Event Organizers", icon: "🎉" },
  "consulate": { name: "Consulate Liaison", icon: "🏛️" },
  "sponsorship": { name: "Sponsorship & External Liaison", icon: "🤝" },
  "social-media": { name: "Social Media & Content", icon: "🎨" },
  "tech": { name: "Tech Team", icon: "💻" },
};

interface TeamStatusSelectProps {
  applicationId: string;
  currentStatus: Status;
  department: string;
}

export default function TeamStatusSelect({
  applicationId,
  currentStatus,
  department,
}: TeamStatusSelectProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<Status>(currentStatus);
  const [teamDepartment, setTeamDepartment] = useState(department);

  const handleStatusChange = async (newStatus: Status) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/admin/team-applications/${applicationId}`, {
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
      toast.success(`Team application status updated to ${newStatus}`);
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update team application status");
      setStatus(currentStatus); // Revert on error
    } finally {
      setIsLoading(false);
    }
  };

  const handleDepartmentChange = async (newDepartment: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/admin/team-applications/${applicationId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ department: newDepartment }),
      });

      if (!response.ok) {
        throw new Error("Failed to update department");
      }

      setTeamDepartment(newDepartment);
      toast.success("Team department updated successfully");
    } catch (error) {
      console.error("Error updating department:", error);
      toast.error("Failed to update team department");
      setTeamDepartment(department); // Revert on error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center space-x-2">
        <select
          value={teamDepartment}
          onChange={(e) => handleDepartmentChange(e.target.value)}
          disabled={isLoading}
          className="rounded-md border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {Object.entries(DEPARTMENTS).map(([key, { name, icon }]) => (
            <option key={key} value={key}>
              {icon} {name}
            </option>
          ))}
        </select>
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
      </div>
    </div>
  );
} 
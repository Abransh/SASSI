"use client";

import { useState } from "react";
import { toast } from "sonner";

type Role = "USER" | "ADMIN";

interface UserRoleSelectProps {
  userId: string;
  currentRole: Role;
  email: string;
}

export default function UserRoleSelect({
  userId,
  currentRole,
  email,
}: UserRoleSelectProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState<Role>(currentRole);
  const isProtectedAdmin = email === "admin@sassimilan.com";

  const handleRoleChange = async (newRole: Role) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: newRole }),
      });

      if (!response.ok) {
        throw new Error("Failed to update role");
      }

      setRole(newRole);
      toast.success("User role updated successfully");
    } catch (error) {
      console.error("Error updating role:", error);
      toast.error("Failed to update user role");
      setRole(currentRole); // Revert on error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <select
      value={role}
      onChange={(e) => handleRoleChange(e.target.value as Role)}
      disabled={isLoading || isProtectedAdmin}
      className={`rounded-md border border-gray-300 px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
        isProtectedAdmin ? "bg-gray-100 cursor-not-allowed" : ""
      }`}
      title={isProtectedAdmin ? "This admin account cannot be modified" : ""}
    >
      <option value="USER">USER</option>
      <option value="ADMIN">ADMIN</option>
    </select>
  );
} 
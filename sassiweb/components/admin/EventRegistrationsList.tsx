// components/admin/EventRegistrationsList.tsx
"use client";

import { useState, useEffect } from "react";
import { format, isValid, parseISO } from "date-fns";
import { 
  Download, Search, ArrowUpDown, Mail, 
  CheckCircle, XCircle, Clock, Loader2, AlertTriangle,
  UserX, RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

type Registration = {
  id: string;
  status: "PENDING" | "CONFIRMED" | "CANCELLED";
  paymentStatus?: string;
  createdAt: string;
  name?: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
};

type EventRegistrationsListProps = {
  eventId: string;
};

export default function EventRegistrationsList({ eventId }: EventRegistrationsListProps) {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [filteredRegistrations, setFilteredRegistrations] = useState<Registration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"name" | "date" | "status">("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [eventTitle, setEventTitle] = useState("");

  // Safely format date with fallback for invalid dates
  const safeFormatDate = (dateString: string, formatString: string, fallback: string = "Invalid date") => {
    try {
      // First check if it's a valid ISO string
      const date = parseISO(dateString);
      if (isValid(date)) {
        return format(date, formatString);
      }
      
      // Try parsing as a regular date as backup
      const regularDate = new Date(dateString);
      if (isValid(regularDate)) {
        return format(regularDate, formatString);
      }
      
      return fallback;
    } catch (e) {
      console.error("Error formatting date:", e);
      return fallback;
    }
  };

  // Fetch registrations data
  const fetchRegistrations = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/events/${eventId}?includeRegistrations=true`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch event registrations");
      }
      
      const data = await response.json();
      setEventTitle(data.title);
      
      // Extract registrations and ensure all fields are properly formatted
      const fetchedRegistrations = (data.registrations || []).map((reg: any) => ({
        ...reg,
        // Ensure createdAt is properly formatted or use a default
        createdAt: reg.createdAt || new Date().toISOString()
      }));
      
      setRegistrations(fetchedRegistrations);
      
      // Apply initial sorting and filtering
      applyFiltersAndSort(fetchedRegistrations, searchTerm, statusFilter, sortBy, sortDirection);
    } catch (err) {
      console.error("Error fetching registrations:", err);
      setError("Failed to load registrations. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle all filtering and sorting
  const applyFiltersAndSort = (
    regs: Registration[],
    search: string,
    status: string,
    sort: "name" | "date" | "status",
    direction: "asc" | "desc"
  ) => {
    // First apply filters
    let filtered = regs;
    
    // Filter by search term
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(reg => 
        (reg.user?.name || "").toLowerCase().includes(searchLower) ||
        (reg.user?.email || "").toLowerCase().includes(searchLower)
      );
    }
    
    // Filter by status
    if (status !== "all") {
      filtered = filtered.filter(reg => reg.status === status.toUpperCase());
    }
    
    // Then sort
    const sorted = [...filtered].sort((a, b) => {
      if (sort === "name") {
        return direction === "asc"
          ? ((a.user?.name || "") || "").localeCompare((b.user?.name || "") || "")
          : ((b.user?.name || "") || "").localeCompare((a.user?.name || "") || "");
      } else if (sort === "date") {
        // Safely handle date sorting with validation
        const aDate = a.createdAt ? new Date(a.createdAt) : new Date(0);
        const bDate = b.createdAt ? new Date(b.createdAt) : new Date(0);
        
        // Check for invalid dates and use timestamp 0 as a fallback
        const aTime = isValid(aDate) ? aDate.getTime() : 0;
        const bTime = isValid(bDate) ? bDate.getTime() : 0;
        
        return direction === "asc" ? aTime - bTime : bTime - aTime;
      } else if (sort === "status") {
        // Custom sort order: CONFIRMED, PENDING, CANCELLED
        const statusOrder = { "CONFIRMED": 0, "PENDING": 1, "CANCELLED": 2 };
        const aValue = statusOrder[a.status as keyof typeof statusOrder] || 3; // Fallback for unknown status
        const bValue = statusOrder[b.status as keyof typeof statusOrder] || 3;
        return direction === "asc" ? aValue - bValue : bValue - aValue;
      }
      return 0;
    });
    
    setFilteredRegistrations(sorted);
  };

  // Handle sort toggle
  const toggleSort = (field: "name" | "date" | "status") => {
    if (sortBy === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortDirection("asc");
    }
  };

  // Effect for initial data load
  useEffect(() => {
    fetchRegistrations();
  }, [eventId]);

  // Effect for filtering and sorting when parameters change
  useEffect(() => {
    applyFiltersAndSort(registrations, searchTerm, statusFilter, sortBy, sortDirection);
  }, [registrations, searchTerm, statusFilter, sortBy, sortDirection]);

  // Handle exporting registrations to CSV
  const exportToCSV = () => {
    // Generate CSV content
    const headers = ["Name", "Email", "Registration Date", "Status", "Payment Status"];
    
    const rows = filteredRegistrations.map(reg => [
      reg.user?.name || "N/A",
      reg.user?.email || "N/A",
      reg.createdAt ? safeFormatDate(reg.createdAt, "yyyy-MM-dd HH:mm:ss", "N/A") : "N/A",
      reg.status || "N/A",
      reg.paymentStatus || "N/A"
    ]);
    
    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.join(","))
    ].join("\n");
    
    // Create and download the file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const filename = `${eventTitle.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_registrations_${format(new Date(), "yyyyMMdd")}.csv`;
    
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Registration list exported successfully");
  };
  
  // Render status badge based on registration status
  const renderStatusBadge = (status: string, paymentStatus?: string) => {
    switch (status) {
      case "CONFIRMED":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="mr-1 h-3 w-3" />
            Confirmed
          </span>
        );
      case "PENDING":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Clock className="mr-1 h-3 w-3" />
            Pending
            {paymentStatus && ` (${paymentStatus.charAt(0) + paymentStatus.slice(1).toLowerCase()})`}
          </span>
        );
      case "CANCELLED":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircle className="mr-1 h-3 w-3" />
            Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {status || "Unknown"}
          </span>
        );
    }
  };

  // Handle sending reminder email to registrant
  const sendReminder = async (email: string) => {
    // This would connect to your email sending API endpoint
    toast.success(`Reminder email sent to ${email}`);
  };
  
  // Render loading state
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-orange-600 mb-4" />
        <p className="text-gray-500">Loading registrations...</p>
      </div>
    );
  }
  
  // Render error state
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-6 flex flex-col items-center">
        <AlertTriangle className="h-10 w-10 text-red-500 mb-4" />
        <h3 className="text-lg font-medium text-red-800 mb-2">Failed to load registrations</h3>
        <p className="text-red-600 mb-4">{error}</p>
        <Button 
          variant="outline" 
          onClick={fetchRegistrations}
          className="flex items-center"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-medium">Registrations for "{eventTitle}"</h2>
        <p className="text-sm text-gray-500 mt-1">
          Total: {registrations.length} registrations ({filteredRegistrations.length} shown)
        </p>
      </div>
      
      {/* Filters and Actions */}
      <div className="p-4 border-b border-gray-200 bg-gray-50 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-3 items-center">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <Input
              type="text"
              placeholder="Search by name or email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 w-64 h-9"
            />
          </div>
          
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-9 border border-gray-300 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="all">All Statuses</option>
            <option value="confirmed">Confirmed Only</option>
            <option value="pending">Pending Only</option>
            <option value="cancelled">Cancelled Only</option>
          </select>
        </div>
        
        {/* Export Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={exportToCSV}
          disabled={filteredRegistrations.length === 0}
          className="flex items-center"
        >
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </div>
      
      {/* Registration Table */}
      {filteredRegistrations.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => toggleSort("name")}
                >
                  <div className="flex items-center">
                    Attendee
                    {sortBy === "name" && (
                      <ArrowUpDown 
                        size={14} 
                        className={`ml-1 ${sortDirection === "asc" ? "transform rotate-180" : ""}`}
                      />
                    )}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => toggleSort("date")}
                >
                  <div className="flex items-center">
                    Registration Date
                    {sortBy === "date" && (
                      <ArrowUpDown 
                        size={14} 
                        className={`ml-1 ${sortDirection === "asc" ? "transform rotate-180" : ""}`}
                      />
                    )}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => toggleSort("status")}
                >
                  <div className="flex items-center">
                    Status
                    {sortBy === "status" && (
                      <ArrowUpDown 
                        size={14} 
                        className={`ml-1 ${sortDirection === "asc" ? "transform rotate-180" : ""}`}
                      />
                    )}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRegistrations.map((registration) => (
                <tr key={registration.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <div className="text-sm font-medium text-gray-900">
                        {registration.user?.name || "No name provided"}
                      </div>
                      <div className="text-sm text-gray-500">
                        {registration.user?.email || "No email"}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {registration.createdAt ? safeFormatDate(
                      registration.createdAt, 
                      "MMM d, yyyy • h:mm a",
                      "Date unavailable"
                    ) : "Date unavailable"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {renderStatusBadge(registration.status, registration.paymentStatus)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => sendReminder(registration.user?.email || "")}
                      className="text-orange-600 hover:text-orange-900 mr-4"
                      disabled={!registration.user?.email}
                    >
                      <Mail size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
          <UserX className="h-10 w-10 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">No registrations found</h3>
          <p className="text-gray-500 mb-4">
            {searchTerm || statusFilter !== "all" 
              ? "Try adjusting your filters to see more results" 
              : "There are no registrations for this event yet"}
          </p>
          {(searchTerm || statusFilter !== "all") && (
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("all");
              }}
            >
              Clear Filters
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
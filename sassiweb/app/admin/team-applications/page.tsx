import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { format } from "date-fns";
import Header from "@/components/Header";
import MobileMenu from "@/components/MobileMenu";
import Footer from "@/components/Footer";
import Link from "next/link";
import { CheckCircle, XCircle, AlertCircle, ArrowUpDown, Search, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import TeamApplicationStatusActions from "@/components/admin/TeamApplicationStatusActions";

// Department icons and names for display
const DEPARTMENTS = {
  "student-support": { name: "Student Support", icon: "👋" },
  "events": { name: "Event Organizers", icon: "🎉" },
  "consulate": { name: "Consulate Liaison", icon: "🏛️" },
  "sponsorship": { name: "Sponsorship & External Liaison", icon: "🤝" },
  "social-media": { name: "Social Media & Content", icon: "🎨" },
  "tech": { name: "Tech Team", icon: "💻" },
};

export default async function TeamApplicationsPage({
  searchParams,
}: {
  searchParams: { 
    status?: "PENDING" | "APPROVED" | "REJECTED";
    department?: string;
    search?: string;
  };
}) {
  // Check if user is authenticated and is an admin
  const session = await getServerSession(authOptions);
  
  if (!session || session.user.role !== "ADMIN") {
    redirect("/auth/signin?callbackUrl=/admin/team-applications");
  }
  
  // Get query parameters
  const status = searchParams.status || "PENDING";
  const department = searchParams.department;
  const searchQuery = searchParams.search || "";
  
  // Fetch team applications based on filters
  const teamApplications = await prisma.teamApplication.findMany({
    where: {
      status: status as any,
      ...(department ? { department } : {}),
      user: searchQuery
        ? {
            OR: [
              { name: { contains: searchQuery, mode: "insensitive" } },
              { email: { contains: searchQuery, mode: "insensitive" } },
            ],
          }
        : undefined,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true,
    },
  });
  
  // Count applications by status
  const statusCounts = await prisma.$transaction([
    prisma.teamApplication.count({ where: { status: "PENDING" } }),
    prisma.teamApplication.count({ where: { status: "APPROVED" } }),
    prisma.teamApplication.count({ where: { status: "REJECTED" } }),
  ]);
  
  // Count applications by department
  const departmentCounts = await prisma.teamApplication.groupBy({
    by: ["department"],
    _count: {
      department: true,
    },
    where: {
      status,
    },
  });
  
  // Create a map of department counts
  const departmentCountMap = departmentCounts.reduce(
    (acc, { department, _count }) => {
      acc[department] = _count.department;
      return acc;
    },
    {} as Record<string, number>
  );
  
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <MobileMenu />

      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Team Applications</h1>
            <p className="text-gray-600">
              Review and manage team applications by department
            </p>
          </div>
          
          {/* Search and Filter */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-col space-y-4">
              {/* Status Filter */}
              <div className="flex flex-wrap gap-2 md:gap-4">
                <Link
                  href="/admin/team-applications?status=PENDING"
                  className={`px-4 py-2 rounded-md flex items-center ${
                    status === "PENDING"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <AlertCircle size={16} className="mr-2" />
                  Pending ({statusCounts[0]})
                </Link>
                
                <Link
                  href="/admin/team-applications?status=APPROVED"
                  className={`px-4 py-2 rounded-md flex items-center ${
                    status === "APPROVED"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <CheckCircle size={16} className="mr-2" />
                  Approved ({statusCounts[1]})
                </Link>
                
                <Link
                  href="/admin/team-applications?status=REJECTED"
                  className={`px-4 py-2 rounded-md flex items-center ${
                    status === "REJECTED"
                      ? "bg-red-100 text-red-800"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <XCircle size={16} className="mr-2" />
                  Rejected ({statusCounts[2]})
                </Link>
              </div>
              
              {/* Department Filter and Search */}
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <form action="/admin/team-applications" method="get" className="w-full">
                    {status !== "PENDING" && (
                      <input type="hidden" name="status" value={status} />
                    )}
                    {department && (
                      <input type="hidden" name="department" value={department} />
                    )}
                    <Input
                      type="text"
                      name="search"
                      placeholder="Search by name or email..."
                      defaultValue={searchQuery}
                      className="pl-10 w-full"
                    />
                  </form>
                </div>
              </div>
              
              {/* Department Pills */}
              <div className="flex flex-wrap gap-2">
                <Link
                  href={`/admin/team-applications?status=${status}`}
                  className={`px-3 py-1.5 rounded-full text-sm flex items-center ${
                    !department
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <Users size={14} className="mr-1.5" />
                  All Departments
                </Link>
                
                {Object.entries(DEPARTMENTS).map(([deptId, { name, icon }]) => (
                  <Link
                    key={deptId}
                    href={`/admin/team-applications?status=${status}&department=${deptId}`}
                    className={`px-3 py-1.5 rounded-full text-sm flex items-center ${
                      department === deptId
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    <span className="mr-1.5">{icon}</span>
                    {name} ({departmentCountMap[deptId] || 0})
                  </Link>
                ))}
              </div>
            </div>
          </div>
          
          {/* Applications Table */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 text-left">
                  <tr>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center space-x-1">
                        <span>Applicant</span>
                        <ArrowUpDown size={14} />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Department
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Motivation
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {teamApplications.length > 0 ? (
                    teamApplications.map((application) => {
                      const deptInfo = DEPARTMENTS[application.department as keyof typeof DEPARTMENTS] || 
                                       { name: application.department, icon: "📁" };
                      
                      return (
                        <tr key={application.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900">
                              {application.user?.name || "Unknown User"}
                            </div>
                            <div className="text-sm text-gray-500">
                              {application.user?.email || "No email"}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <span className="text-xl mr-2">{deptInfo.icon}</span>
                              <span className="text-sm text-gray-700">{deptInfo.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-500 max-w-xs truncate">
                              {application.motivation || "No motivation provided"}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {format(new Date(application.createdAt), "MMM d, yyyy")}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {/* Client component for actions */}
                            <TeamApplicationStatusActions 
                              applicationId={application.id} 
                              currentStatus={application.status as any}
                            />
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                        No {status.toLowerCase()} team applications found
                        {department && ` for ${DEPARTMENTS[department as keyof typeof DEPARTMENTS]?.name || department}`}
                        {searchQuery && ` matching "${searchQuery}"`}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { format } from "date-fns";
import Header from "@/components/Header";
import MobileMenu from "@/components/MobileMenu";
import Footer from "@/components/Footer";
import Link from "next/link";
import { CheckCircle, XCircle, AlertCircle, ArrowUpDown, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import MembershipStatusActions from "@/components/admin/MembershipStatusActions";

export default async function MembershipRequestsPage(props: any) {
  const { searchParams } = props;
  
  // Check if user is authenticated and is an admin
  const session = await getServerSession(authOptions);
  
  if (!session || session.user.role !== "ADMIN") {
    redirect("/auth/signin?callbackUrl=/admin/membership-requests");
  }
  
  // Get query parameters
  const status = searchParams.status || "PENDING";
  const searchQuery = searchParams.search || "";
  
  // Fetch membership requests based on filters
  const membershipRequests = await prisma.membershipRequest.findMany({
    where: {
      status: status as any,
      OR: searchQuery
        ? [
            { firstName: { contains: searchQuery, mode: "insensitive" } },
            { lastName: { contains: searchQuery, mode: "insensitive" } },
            { email: { contains: searchQuery, mode: "insensitive" } },
            { university: { contains: searchQuery, mode: "insensitive" } },
          ]
        : undefined,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true,
    },
  });
  
  // Count requests by status
  const statusCounts = await prisma.$transaction([
    prisma.membershipRequest.count({ where: { status: "PENDING" } }),
    prisma.membershipRequest.count({ where: { status: "APPROVED" } }),
    prisma.membershipRequest.count({ where: { status: "REJECTED" } }),
  ]);
  
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <MobileMenu />

      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Membership Requests</h1>
            <p className="text-gray-600">
              Review and manage membership applications
            </p>
          </div>
          
          {/* Search and Filter */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <form action="/admin/membership-requests" method="get" className="w-full">
                  {status !== "PENDING" && (
                    <input type="hidden" name="status" value={status} />
                  )}
                  <Input
                    type="text"
                    name="search"
                    placeholder="Search by name, email, or university..."
                    defaultValue={searchQuery}
                    className="pl-10 w-full"
                  />
                </form>
              </div>
              
              <div className="flex gap-2 md:gap-4">
                <Link
                  href="/admin/membership-requests?status=PENDING"
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
                  href="/admin/membership-requests?status=APPROVED"
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
                  href="/admin/membership-requests?status=REJECTED"
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
            </div>
          </div>
          
          {/* Requests Table */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 text-left">
                  <tr>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center space-x-1">
                        <span>Name</span>
                        <ArrowUpDown size={14} />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      University
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Payment
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {membershipRequests.length > 0 ? (
                    membershipRequests.map((request) => (
                      <tr key={request.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">
                            {request.firstName} {request.lastName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {request.isStudent ? "Student" : "Non-Student"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {request.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {request.university}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {format(new Date(request.createdAt), "MMM d, yyyy")}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {request.user?.paymentVerified ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Verified
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              Pending
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {/* Client component for actions */}
                          <MembershipStatusActions 
                            requestId={request.id} 
                            userId={request.userId || ""}
                            currentStatus={request.status as any}
                            paymentVerified={request.user?.paymentVerified || false}
                          />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                        No {status.toLowerCase()} membership requests found
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
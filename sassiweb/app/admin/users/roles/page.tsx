export const dynamic = 'force-dynamic';

import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import Header from "@/components/Header";
import MobileMenu from "@/components/MobileMenu";
import Footer from "@/components/Footer";
import TeamStatusSelect from "@/components/admin/TeamStatusSelect";
import MembershipStatusSelect from "@/components/admin/MembershipStatusSelect";
import CreateMembershipStatusSelect from "@/components/admin/CreateMembershipStatusSelect";

type UserWithTeams = {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  role: "USER" | "ADMIN";
  isSuperAdmin: boolean;
  createdAt: Date;
  isVerified: boolean;
  profile: {
    university: string | null;
    degreeInIndia: string | null;
    yearOfArrival: number | null;
  } | null;
  teamApplications: {
    id: string;
    department: string;
    status: "PENDING" | "APPROVED" | "REJECTED";
    createdAt: Date;
  }[];
  membershipRequests: {
    id: string;
    status: "PENDING" | "APPROVED" | "REJECTED";
    createdAt: Date;
  }[];
};

export default async function AdminUsersRolesPage() {
  const session = await getServerSession(authOptions);
  
  if (!session || session.user.role !== "ADMIN") {
    redirect("/");
  }
  
  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      profile: true,
      teamApplications: {
        select: {
          id: true,
          department: true,
          status: true,
          createdAt: true,
        },
      },
      membershipRequests: {
        select: {
          id: true,
          status: true,
          createdAt: true,
        },
      },
    },
  }) as UserWithTeams[];
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <MobileMenu />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Users & Teams Management</h1>
          <p className="mt-2 text-sm text-gray-600">
            View and manage user roles, team memberships, and application statuses
          </p>
        </div>
        
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Team
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Membership
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Details
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        {/* <image
                          className="h-10 w-10 rounded-full"
                          src={user.image || "/default-avatar.png"}
                          alt={user.name || "User"}
                        /> */}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user.name || "Unnamed User"}
                        </div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                        user.isSuperAdmin
                          ? "bg-purple-100 text-purple-800"
                          : user.role === "ADMIN"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {user.isSuperAdmin ? "SUPER ADMIN" : user.role}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {user.teamApplications.length > 0 ? (
                      <div className="space-y-2">
                        {user.teamApplications.map((app) => (
                          <TeamStatusSelect
                            key={app.id}
                            applicationId={app.id}
                            currentStatus={app.status}
                            department={app.department}
                          />
                        ))}
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">No team</span>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {user.membershipRequests.length > 0 ? (
                      <div className="space-y-2">
                        {user.membershipRequests.map((request) => (
                          <MembershipStatusSelect
                            key={request.id}
                            requestId={request.id}
                            currentStatus={request.status}
                          />
                        ))}
                      </div>
                    ) : (
                      <CreateMembershipStatusSelect 
                        userId={user.id}
                        userName={user.name}
                        userEmail={user.email}
                      />
                    )}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    <div>
                      <div>University: {user.profile?.university || "Not set"}</div>
                      <div>Degree: {user.profile?.degreeInIndia || "Not set"}</div>
                      <div>Year: {user.profile?.yearOfArrival || "Not set"}</div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
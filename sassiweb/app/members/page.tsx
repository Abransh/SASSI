import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import Header from "@/components/Header";
import MobileMenu from "@/components/MobileMenu";
import Footer from "@/components/Footer";
import MemberCard from "@/components/MemberCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default async function MembersPage({
  searchParams,
}: {
  searchParams: { query?: string; university?: string };
}) {
  // Check if user is logged in
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect("/auth/signin?callbackUrl=/members");
  }
  
  // Get search parameters
  const searchQuery = searchParams.query || "";
  const universityFilter = searchParams.university || "";
  
  // Fetch users with public profiles
  const users = await prisma.user.findMany({
    where: {
      isProfilePublic: true,
      ...(searchQuery
        ? {
            OR: [
              { name: { contains: searchQuery, mode: "insensitive" } },
              { university: { contains: searchQuery, mode: "insensitive" } },
              { course: { contains: searchQuery, mode: "insensitive" } },
            ],
          }
        : {}),
      ...(universityFilter ? { university: universityFilter } : {}),
    },
    include: {
      profile: true,
    },
    orderBy: {
      name: "asc",
    },
  });
  
  // Get list of unique universities for filtering
  const universities = await prisma.user.findMany({
    where: {
      isProfilePublic: true,
      university: {
        not: null,
      },
    },
    select: {
      university: true,
    },
    distinct: ["university"],
  });
  
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <MobileMenu />

      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-4">SASSI Member Directory</h1>
              <p className="text-gray-600 mb-6">
                Connect with other Indian students in Milan
              </p>
              
              {/* Search and Filter */}
              <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <form action="/members" method="get">
                    {universityFilter && (
                      <input
                        type="hidden"
                        name="university"
                        value={universityFilter}
                      />
                    )}
                    <Input
                      type="text"
                      name="query"
                      placeholder="Search by name, university, or course..."
                      defaultValue={searchQuery}
                      className="pl-10 pr-4 py-2 w-full"
                    />
                  </form>
                </div>
                
                <div className="md:w-64">
                  <form action="/members" method="get" id="universityForm">
                    {searchQuery && (
                      <input type="hidden" name="query" value={searchQuery} />
                    )}
                    <select
                      name="university"
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      defaultValue={universityFilter}
                      onChange={(e) => {
                        document.getElementById("universityForm")?.submit();
                      }}
                    >
                      <option value="">All Universities</option>
                      {universities.map((uni, index) => (
                        <option key={index} value={uni.university}>
                          {uni.university}
                        </option>
                      ))}
                    </select>
                  </form>
                </div>
              </div>
              
              {/* Results count */}
              <p className="text-sm text-gray-600">
                {users.length} {users.length === 1 ? "member" : "members"} found
                {searchQuery && ` matching "${searchQuery}"`}
                {universityFilter && ` at ${universityFilter}`}
              </p>
            </div>
            
            {/* Member Grid */}
            {users.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {users.map((user) => (
                  <MemberCard key={user.id} user={user} />
                ))}
              </div>
            ) : (
              <div className="bg-white p-10 rounded-lg shadow text-center">
                <h3 className="text-xl font-semibold mb-2">No members found</h3>
                <p className="text-gray-600">
                  Try adjusting your search or filters
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
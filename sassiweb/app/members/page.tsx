import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/options";
import prisma from "@/lib/prisma";
import Header from "@/components/Header";
import MobileMenu from "@/components/MobileMenu";
import Footer from "@/components/Footer";
import Link from "next/link";
import { User, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import UniversityFilter from "@/components/UniversityFilter";
export const dynamic = 'force-dynamic';

export default async function MembersPage(props: any) {
  const { searchParams } = props;

  try {
    // Check if user is logged in
    const session = await getServerSession(authOptions);
    
    if (!session) {
      redirect("/auth/signin?callbackUrl=/members");
    }
    
    // Get search parameters
    const searchQuery = searchParams.query || "";
    const universityFilter = searchParams.university || "";
    
    
    // Fetch users with public profiles and apply filters
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
    const processedUniversities = universities.map(u => ({
      university: u.university ?? ""
    }));
    
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
                    {/* Client component for interactive select */}
                    <UniversityFilter 
                      universities={processedUniversities}  
                      currentValue={universityFilter}
                      searchQuery={searchQuery}
                    />
                  </div>
                </div>
                
                {/* Results count */}
                <p className="text-sm text-gray-600">
                  {users.length} {users.length === 1 ? "member" : "members"} found
                  {searchQuery && ` matching "${searchQuery}"`}
                  {universityFilter && ` at ${universityFilter}`}
                </p>
              </div>
              
              {/* Simplified Member Grid (not using MemberCard component yet) */}
              {users.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {users.map((user) => (
                    <div key={user.id} className="bg-white rounded-lg shadow-md p-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                          <User size={24} className="text-gray-500" />
                        </div>
                        <div>
                          <h3 className="font-bold">{user.name || "Unnamed User"}</h3>
                          <p className="text-sm text-gray-600">{user.university || "No university listed"}</p>
                          {user.course && (
                            <p className="text-xs text-gray-500">{user.course}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <Link 
                          href={`/members/${user.id}`}
                          className="text-blue-600 hover:underline text-sm"
                        >
                          View Profile
                        </Link>
                      </div>
                    </div>
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
  } catch (error) {
    console.error("Error in MembersPage:", error);
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="p-6 bg-white rounded shadow-lg max-w-lg">
          <h1 className="text-xl font-bold mb-4">Error Loading Members</h1>
          <p className="text-red-500">{(error as Error).message}</p>
          <div className="mt-6">
            <a href="/" className="text-blue-600 hover:underline">Return to Homepage</a>
          </div>
        </div>
      </main>
    );
  }
}
// app/cricket/admin/page.tsx
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { getMatch, getMatches } from "@/lib/cricket/api";
import Header from "@/components/Header";
import MobileMenu from "@/components/MobileMenu";
import Footer from "@/components/Footer";
import MatchControl from "@/components/cricket/admin/MatchControl";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function CricketAdminPage({ 
  searchParams 
}: { 
  searchParams: { [key: string]: string | string[] | undefined } 
}) {
  // Check authentication
  const session = await getServerSession(authOptions);
  
  if (!session || session.user.role !== "ADMIN") {
    redirect("/auth/signin?callbackUrl=/cricket/admin");
  }
  
  // Get query parameters
  const matchId = searchParams.matchId as string | undefined;
  
  // Fetch match data if ID is provided
  let activeMatch: any = null;
  if (matchId) {
    activeMatch = await getMatch(matchId);
  }
  
  // Fetch all matches for selection
  const matchesData = await getMatches();
  const allMatches = [
    ...matchesData.liveMatches,
    ...matchesData.upcomingMatches,
    ...matchesData.recentMatches.filter(m => m.status !== "COMPLETED"),
  ];
  
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <MobileMenu />

      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Cricket Admin Dashboard</h1>
              <p className="text-gray-600">
                Manage cricket matches, teams, and players
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Sidebar */}
              <div className="lg:col-span-1 space-y-6">
                {/* Match Selection */}
                <Card>
                  <CardHeader>
                    <CardTitle>Select Match</CardTitle>
                    <CardDescription>
                      Choose a match to manage or create a new one
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 gap-2">
                        {allMatches.length > 0 ? (
                          allMatches.map(match => (
                            <Link 
                              key={match.id}
                              href={`/cricket/admin?matchId=${match.id}`}
                              className={`p-3 rounded-md border ${
                                matchId === match.id 
                                  ? 'bg-orange-50 border-orange-200' 
                                  : 'bg-white hover:bg-gray-50'
                              }`}
                            >
                              <div className="font-medium">{match.title}</div>
                              <div className="text-sm text-gray-600">
                                {match.teamA.name} vs {match.teamB.name}
                              </div>
                              <div className="mt-1">
                                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                                  match.status === 'LIVE' 
                                    ? 'bg-green-100 text-green-800' 
                                    : match.status === 'UPCOMING'
                                      ? 'bg-yellow-100 text-yellow-800'
                                      : 'bg-blue-100 text-blue-800'
                                }`}>
                                  {match.status}
                                </span>
                              </div>
                            </Link>
                          ))
                        ) : (
                          <div className="text-center py-4 text-gray-500">
                            No matches available
                          </div>
                        )}
                      </div>
                      
                      <Link href="/cricket/admin/matches/new">
                        <Button className="w-full">Create New Match</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Admin Navigation */}
                <Card>
                  <CardHeader>
                    <CardTitle>Admin Tools</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Link href="/cricket/admin/teams">
                        <Button variant="outline" className="w-full justify-start">
                          Manage Teams
                        </Button>
                      </Link>
                      <Link href="/cricket/admin/players">
                        <Button variant="outline" className="w-full justify-start">
                          Manage Players
                        </Button>
                      </Link>
                      <Link href="/cricket">
                        <Button variant="outline" className="w-full justify-start">
                          View Cricket Dashboard
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Main Content */}
              <div className="lg:col-span-2">
                {activeMatch ? (
                  <MatchControl match={activeMatch} />
                ) : (
                  <Card>
                    <CardHeader>
                      <CardTitle>Cricket Management</CardTitle>
                      <CardDescription>
                        Select a match from the sidebar or create a new one to start
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="bg-orange-50 border border-orange-200 rounded-md p-6 text-center">
                        <h3 className="text-lg font-medium text-orange-800 mb-2">No Match Selected</h3>
                        <p className="text-orange-700 mb-4">
                          Please select a match from the sidebar to begin scoring or match management.
                        </p>
                        <Link href="/cricket/admin/matches/new">
                          <Button>Create New Match</Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
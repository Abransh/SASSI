// app/cricket/matches/[id]/page.tsx
import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { Metadata } from "next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { format } from "date-fns";
import { getMatch } from "@/lib/cricket/api";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Scoreboard from "@/components/cricket/Scoreboard";
import ScorecardTable from "@/components/cricket/ScorecardTable";
import BallByBallFeed from "@/components/cricket/BallByBallFeed";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const match = await getMatch(params.id);
    
    return {
      title: `${match.teamA.name} vs ${match.teamB.name} | SASSI Cricket`,
      description: `Live cricket match between ${match.teamA.name} and ${match.teamB.name} at ${match.venue}`,
    };
  } catch (error) {
    return {
      title: "Cricket Match | SASSI Milano",
      description: "Cricket match details",
    };
  }
}

export default async function MatchDetailsPage({ params }: Props) {
  try {
    const match = await getMatch(params.id);
    
    // Check if admin and show admin mode if true
    const session = await getServerSession(authOptions);
    const isAdmin = session?.user?.role === "ADMIN";
    
    const hasInnings = match.innings && match.innings.length > 0;
    
    return (
      <main className="min-h-screen bg-gray-50">
        <Header />

        <section className="pt-32 pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              {/* Match Header */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
                <div className="p-6">
                  <h1 className="text-2xl md:text-3xl font-bold mb-2">
                    {match.teamA.name} vs {match.teamB.name}
                  </h1>
                  
                  <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-4">
                    <span>{format(new Date(match.matchDate), "EEEE, MMMM d, yyyy")}</span>
                    <span>•</span>
                    <span>{match.venue}</span>
                    <span>•</span>
                    <span className="font-medium text-orange-600">{match.status}</span>
                  </div>
                  
                  {/* Current score summary */}
                  <Scoreboard match={match} />
                  
                  {/* Admin Actions */}
                  {isAdmin && (
                    <div className="mt-4 border-t pt-4">
                      <a
                        href={`/cricket/admin?matchId=${match.id}`}
                        className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-md"
                      >
                        {match.status === "LIVE" ? "Continue Scoring" : "Start Match"}
                      </a>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Match Content */}
              <Tabs defaultValue="scorecard" className="bg-white rounded-lg shadow-md overflow-hidden">
                <TabsList className="p-0 bg-gray-100 border-b">
                  <TabsTrigger value="scorecard" className="py-3 px-6">
                    Scorecard
                  </TabsTrigger>
                  <TabsTrigger value="ball-by-ball" className="py-3 px-6">
                    Ball by Ball
                  </TabsTrigger>
                  <TabsTrigger value="teams" className="py-3 px-6">
                    Teams
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="scorecard" className="p-6">
                  {hasInnings ? (
                    match.innings.map((innings: any) => (
                      <div key={innings.id} className="mb-8">
                        <h3 className="text-xl font-bold mb-4">
                          {innings.battingTeam.name} Innings
                        </h3>
                        <ScorecardTable innings={innings} />
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-600">Match has not started yet</p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="ball-by-ball" className="p-6">
                  <BallByBallFeed matchId={match.id} />
                </TabsContent>
                
                <TabsContent value="teams" className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Team A */}
                    <div>
                      <h3 className="text-xl font-bold mb-4 flex items-center">
                        {match.teamA.logoUrl && (
                          <Image 
                            src={match.teamA.logoUrl} 
                            alt={match.teamA.name} 
                            width={36} 
                            height={36} 
                            className="rounded-full mr-3"
                          />
                        )}
                        {match.teamA.name}
                      </h3>
                      
                      <ul className="space-y-2">
                        {match.teamA.players?.map((player: any) => (
                          <li key={player.id} className="p-3 bg-gray-50 rounded-md hover:bg-gray-100">
                            <a href={`/cricket/players/${player.id}`} className="flex items-center">
                              {player.profileImageUrl ? (
                                <Image 
                                  src={player.profileImageUrl} 
                                  alt={player.name} 
                                  width={32} 
                                  height={32} 
                                  className="rounded-full mr-3"
                                />
                              ) : (
                                <div className="w-8 h-8 bg-gray-200 rounded-full mr-3 flex items-center justify-center text-xs">
                                  {player.name.charAt(0)}
                                </div>
                              )}
                              <div>
                                <p className="font-medium">{player.name}</p>
                                <p className="text-xs text-gray-600">{player.role}</p>
                              </div>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Team B */}
                    <div>
                      <h3 className="text-xl font-bold mb-4 flex items-center">
                        {match.teamB.logoUrl && (
                          <Image 
                            src={match.teamB.logoUrl} 
                            alt={match.teamB.name} 
                            width={36} 
                            height={36} 
                            className="rounded-full mr-3"
                          />
                        )}
                        {match.teamB.name}
                      </h3>
                      
                      <ul className="space-y-2">
                        {match.teamB.players?.map((player: any) => (
                          <li key={player.id} className="p-3 bg-gray-50 rounded-md hover:bg-gray-100">
                            <a href={`/cricket/players/${player.id}`} className="flex items-center">
                              {player.profileImageUrl ? (
                                <Image 
                                  src={player.profileImageUrl} 
                                  alt={player.name} 
                                  width={32} 
                                  height={32} 
                                  className="rounded-full mr-3"
                                />
                              ) : (
                                <div className="w-8 h-8 bg-gray-200 rounded-full mr-3 flex items-center justify-center text-xs">
                                  {player.name.charAt(0)}
                                </div>
                              )}
                              <div>
                                <p className="font-medium">{player.name}</p>
                                <p className="text-xs text-gray-600">{player.role}</p>
                              </div>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    );
  } catch (error) {
    console.error("Error in MatchDetailsPage:", error);
    notFound();
  }
}
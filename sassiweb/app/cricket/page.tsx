// app/cricket/page.tsx
import { Metadata } from "next";
import Link from "next/link";
import { getMatches } from "@/lib/cricket/api";
import MatchCard from "@/components/cricket/MatchCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Cricket Dashboard | SASSI Milano",
  description: "Live cricket matches and events by SASSI Milano",
};

export default async function CricketPage() {
  const { liveMatches, upcomingMatches, recentMatches } = await getMatches();
  
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8 text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">SASSI Cricket</h1>
              <p className="text-gray-600">
                Follow live matches, explore stats, and stay updated with cricket events hosted by SASSI Milano
              </p>
            </div>
            
            {/* Live Matches Section */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4 border-b pb-2">Live Matches</h2>
              
              {liveMatches.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {liveMatches.map((match : any) => (
                    <MatchCard key={match.id} match={match} isLive={true} />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                  <p className="text-gray-600">No matches are live right now</p>
                </div>
              )}
            </div>
            
            {/* Upcoming Matches Section */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4 border-b pb-2">Upcoming Matches</h2>
              
              {upcomingMatches.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {upcomingMatches.map((match: any) => (
                    <MatchCard key={match.id} match={match} />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                  <p className="text-gray-600">No upcoming matches scheduled</p>
                </div>
              )}
            </div>
            
            {/* Recent Matches Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 border-b pb-2">Recent Matches</h2>
              
              {recentMatches.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recentMatches.map((match: any ) => (
                    <MatchCard key={match.id} match={match} isCompleted={true} />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                  <p className="text-gray-600">No recent matches available</p>
                </div>
              )}
            </div>
            
            {/* Links */}
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Link 
                href="/cricket/leaderboard"
                className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-md transition-colors"
              >
                View Leaderboard
              </Link>
              <Link 
                href="/events"
                className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-md transition-colors"
              >
                All SASSI Events
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
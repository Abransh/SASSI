// app/cricket/leaderboard/page.tsx
import { Metadata } from "next";
import LeaderboardTable from "@/components/cricket/LeaderboardTable";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileMenu from "@/components/MobileMenu";

export const metadata: Metadata = {
  title: "Cricket Leaderboard | SASSI Milano",
  description: "View batting and bowling statistics for SASSI cricket matches",
};

export default async function LeaderboardPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <MobileMenu />

      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8 text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Cricket Leaderboard</h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Track player performance statistics across all SASSI cricket matches
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden p-6">
              <LeaderboardTable />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
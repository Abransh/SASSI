// app/cricket/admin/matches/new/page.tsx
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { getTeams } from "@/lib/cricket/api";
import Header from "@/components/Header";
import MobileMenu from "@/components/MobileMenu";
import Footer from "@/components/Footer";
import NewMatchForm from "@/components/cricket/admin/NewMatchForm";

export default async function NewMatchPage() {
  // Check authentication
  const session = await getServerSession(authOptions);
  
  if (!session || session.user.role !== "ADMIN") {
    redirect("/auth/signin?callbackUrl=/cricket/admin/matches/new");
  }
  
  // Fetch teams for dropdown
  const teams = await getTeams();
  
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <MobileMenu />

      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Create New Cricket Match</h1>
              <p className="text-gray-600">
                Set up a new cricket match with teams and details
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <NewMatchForm teams={teams} />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import EventForm from "@/components/EventForm";
import Header from "@/components/Header";
import MobileMenu from "@/components/MobileMenu";
import Footer from "@/components/Footer";

export default async function CreateEventPage() {
  // Check if user is authenticated and is an admin
  const session = await getServerSession(authOptions);
  
  if (!session || session.user.role !== "ADMIN") {
    redirect("/auth/signin?callbackUrl=/admin/events/new");
  }
  
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <MobileMenu />

      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Create New Event</h1>
              <p className="text-gray-600">
                Add a new event to the SASSI calendar
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <EventForm />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
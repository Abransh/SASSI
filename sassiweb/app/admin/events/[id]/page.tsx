import { redirect, notFound } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { getEvent } from "@/lib/event-service";
import EventForm from "@/components/EventForm";
import Header from "@/components/Header";
import MobileMenu from "@/components/MobileMenu";
import Footer from "@/components/Footer";

// Use `any` type to bypass the type checking temporarily
export default async function EditEventPage(props: any) {
  const { params } = props;

  // Check if user is authenticated and is an admin
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    redirect("/auth/signin?callbackUrl=/admin/events/" + params.id);
  }

  // Fetch event data
  let event;
  try {
    event = await getEvent(params.id);
  } catch {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <MobileMenu />

      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Edit Event</h1>
              <p className="text-gray-600">
                Update the event details
              </p>
            </div>
            {/* Pass isEdit={true} to signal this is an edit operation */}
            <EventForm event={event ?? undefined} isEdit={true} />
          </div>
          
        </div>
        
      </section>
      

      <Footer />
    </main>
  );
}
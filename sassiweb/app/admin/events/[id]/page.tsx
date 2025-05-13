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
        {/* Registrations Link Button */}
        {event && (
          <a
            href={`/admin/events/${event.id}/registrations`}
            className="inline-block mt-6"
          >
            <button
              type="button"
              className="bg-orange-600 hover:bg-orange-700 text-white flex items-center px-4 py-2 rounded"
            >
              {/* Users icon SVG */}
              <svg
                className="mr-2 h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 20h5v-2a4 4 0 0 0-3-3.87M9 20H4v-2a4 4 0 0 1 3-3.87m10-5.13a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM6 7a4 4 0 1 0 8 0 4 4 0 0 0-8 0Z"
                />
              </svg>
              View Registrations ({event._count?.registrations || 0})
            </button>
          </a>
        )}
      </section>

      <Footer />
    </main>
  );
}
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import Link from "next/link";
import { getEvents } from "@/lib/event-service";
import prisma from "@/lib/prisma";
import { format } from "date-fns";
import Header from "@/components/Header";
import MobileMenu from "@/components/MobileMenu";
import Footer from "@/components/Footer";

export default async function AdminDashboard() {
  // Check if user is authenticated and is an admin
  const session = await getServerSession(authOptions);
  
  if (!session || session.user.role !== "ADMIN") {
    redirect("/auth/signin?callbackUrl=/admin/dashboard");
  }
  
  // Fetch all events (both published and unpublished)
  const events = await getEvents();
  
  // Fetch contact form submissions
  const contactSubmissions = await prisma.contactSubmission.findMany({
    orderBy: {
      createdAt: "desc"
    },
    take: 10
  });
  
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <MobileMenu />

      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Welcome back, {session.user.name || session.user.email}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">Quick Stats</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-orange-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Total Events</p>
                  <p className="text-2xl font-bold">{events.length}</p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Published Events</p>
                  <p className="text-2xl font-bold">
                    {events.filter(event => event.published).length}
                  </p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Upcoming Events</p>
                  <p className="text-2xl font-bold">
                    {events.filter(event => new Date(event.startDate) > new Date()).length}
                  </p>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">New Messages</p>
                  <p className="text-2xl font-bold">
                    {contactSubmissions.filter(submission => !submission.responded).length}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <Link 
                  href="/admin/events/new" 
                  className="block w-full p-3 bg-orange-600 hover:bg-orange-700 text-white text-center rounded-md"
                >
                  Create New Event
                </Link>
                
                <Link 
                  href="/admin/events" 
                  className="block w-full p-3 bg-gray-800 hover:bg-gray-900 text-white text-center rounded-md"
                >
                  Manage Events
                </Link>
                
                <Link 
                  href="/admin/contact" 
                  className="block w-full p-3 bg-blue-600 hover:bg-blue-700 text-white text-center rounded-md"
                >
                  View Contact Submissions
                </Link>
              </div>
            </div>
          </div>
          
          {/* Recent Events Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
            <div className="p-4 bg-gray-50 border-b">
              <h2 className="text-xl font-bold">Recent Events</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Title</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Date</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Location</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {events.slice(0, 5).map((event) => (
                    <tr key={event.id}>
                      <td className="px-4 py-3 text-sm text-gray-900">{event.title}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {format(new Date(event.startDate), "MMM d, yyyy")}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{event.location}</td>
                      <td className="px-4 py-3 text-sm">
                        {event.published ? (
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                            Published
                          </span>
                        ) : (
                          <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                            Draft
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm text-right">
                        <Link 
                          href={`/admin/events/${event.id}`}
                          className="text-orange-600 hover:text-orange-800"
                        >
                          Edit
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {events.length > 5 && (
              <div className="p-4 border-t">
                <Link 
                  href="/admin/events" 
                  className="text-orange-600 hover:text-orange-800"
                >
                  View all events →
                </Link>
              </div>
            )}
          </div>
          
          {/* Recent Messages */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 bg-gray-50 border-b">
              <h2 className="text-xl font-bold">Recent Contact Submissions</h2>
            </div>
            
            <div className="divide-y divide-gray-200">
              {contactSubmissions.slice(0, 3).map((submission) => (
                <div key={submission.id} className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium">{submission.name}</h3>
                      <p className="text-sm text-gray-600">{submission.email}</p>
                    </div>
                    <span className="text-xs text-gray-500">
                      {format(new Date(submission.createdAt), "MMM d, yyyy")}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-gray-700 mb-1">{submission.subject}</p>
                  <p className="text-sm text-gray-600 line-clamp-2">{submission.message}</p>
                </div>
              ))}
            </div>
            
            {contactSubmissions.length > 3 && (
              <div className="p-4 border-t">
                <Link 
                  href="/admin/contact" 
                  className="text-orange-600 hover:text-orange-800"
                >
                  View all messages →
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
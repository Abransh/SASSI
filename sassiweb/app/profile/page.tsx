export const dynamic = 'force-dynamic';

import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/options";
import prisma from "@/lib/prisma";
import Header from "@/components/Header";
import MobileMenu from "@/components/MobileMenu";
import Footer from "@/components/Footer";
import ProfileForm from "@/components/ProfileForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UpcomingEventsList from "@/components/UpcomingEventsList";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect("/auth/signin?callbackUrl=/profile");
  }
  
  // Get user data including profile and event registrations
  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    include: {
      profile: true,
      registrations: {
        where: {
          status: "CONFIRMED",
        },
        include: {
          event: true,
        },
        orderBy: {
          event: {
            startDate: "asc",
          },
        },
      },
    },
  });
  
  if (!user) {
    redirect("/auth/signin");
  }
  
  // Separate upcoming and past events
  const now = new Date();
  const upcomingRegistrations = user.registrations.filter(
    (reg) => new Date(reg.event.startDate) >= now
  );
  const pastRegistrations = user.registrations.filter(
    (reg) => new Date(reg.event.startDate) < now
  );
  
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <MobileMenu />

      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Your Profile</h1>
              <p className="text-gray-600">
                Manage your account information and view your event registrations
              </p>
            </div>
            
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="profile">Profile Information</TabsTrigger>
                <TabsTrigger value="events">Your Events</TabsTrigger>
                <TabsTrigger value="settings">Account Settings</TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile" className="space-y-4">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <ProfileForm initialData={user} />
                </div>
              </TabsContent>
              
              <TabsContent value="events" className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-bold mb-4">Upcoming Events</h2>
                  {upcomingRegistrations.length > 0 ? (
                    <UpcomingEventsList registrations={upcomingRegistrations} />
                  ) : (
                    <p className="text-gray-500">
                      You don't have any upcoming events. Browse our{" "}
                      <a
                        href="/events"
                        className="text-orange-600 hover:text-orange-800"
                      >
                        events page
                      </a>{" "}
                      to register for events.
                    </p>
                  )}
                </div>
                
                {pastRegistrations.length > 0 && (
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold mb-4">Past Events</h2>
                    <div className="space-y-4">
                      {pastRegistrations.map((registration) => (
                        <div
                          key={registration.id}
                          className="flex items-center justify-between border-b pb-4"
                        >
                          <div>
                            <h3 className="font-semibold">{registration.event.title}</h3>
                            <p className="text-sm text-gray-500">
                              {new Date(registration.event.startDate).toLocaleDateString()} at{" "}
                              {new Date(registration.event.startDate).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>
                          <a
                            href={`/events/${registration.event.id}`}
                            className="text-sm text-orange-600 hover:text-orange-800"
                          >
                            View Details
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="settings" className="space-y-4">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-bold mb-4">Account Settings</h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Email Address</h3>
                      <p className="text-gray-700 mb-2">{user.email}</p>
                      <button
                        className="text-sm text-orange-600 hover:text-orange-800"
                        disabled
                      >
                        Change Email (Coming Soon)
                      </button>
                    </div>
                    
                    <div className="border-t pt-6">
                      <h3 className="text-lg font-medium mb-2">Password</h3>
                      <button
                        className="text-sm text-orange-600 hover:text-orange-800"
                        disabled
                      >
                        Change Password (Coming Soon)
                      </button>
                    </div>
                    
                    <div className="border-t pt-6">
                      <h3 className="text-lg font-medium mb-2 text-red-600">Danger Zone</h3>
                      <button
                        className="text-sm text-red-600 hover:text-red-800"
                        disabled
                      >
                        Delete Account (Coming Soon)
                      </button>
                    </div>
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
}
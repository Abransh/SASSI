"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Header from "@/components/Header";
import MobileMenu from "@/components/MobileMenu";
import Footer from "@/components/Footer";
import { Loader2, CalendarDays, Circle, UserCheck, AlertTriangle, CreditCard, Clock, CheckCircle2, Users } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

interface UserMembershipStatus {
  paymentVerified: boolean;
  membershipExpiryDate: string | null;
  isExpired: boolean;
}

interface TeamApplicationStatus {
  department: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
}

export default function UserDashboard() {
  const router = useRouter();
  const { data: session, status } = useSession();
  
  const [membershipStatus, setMembershipStatus] = useState<UserMembershipStatus | null>(null);
  const [teamApplication, setTeamApplication] = useState<TeamApplicationStatus | null>(null);
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Check if user is authenticated
    if (status === "unauthenticated") {
      router.push("/auth/signin?callbackUrl=/dashboard");
    } else if (status === "authenticated") {
      fetchUserData();
    }
  }, [status, router]);
  
  const fetchUserData = async () => {
    setIsLoading(true);
    
    try {
      // Fetch membership status
      const membershipResponse = await fetch('/api/user/payment-status');
      if (membershipResponse.ok) {
        const membershipData = await membershipResponse.json();
        setMembershipStatus(membershipData);
      }
      
      // Fetch team application status
      const teamResponse = await fetch('/api/user/team-status');
      if (teamResponse.ok) {
        const teamData = await teamResponse.json();
        if (teamData.application) {
          setTeamApplication(teamData.application);
        }
      }
      
      // Fetch upcoming events
      const eventsResponse = await fetch('/api/user/events');
      if (eventsResponse.ok) {
        const eventsData = await eventsResponse.json();
        setUpcomingEvents(eventsData.upcoming || []);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Format department name
  const formatDepartment = (departmentId: string) => {
    return departmentId
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  
  // If loading session or data
  if (status === "loading" || isLoading) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Header />
        <MobileMenu />
        
        <div className="pt-32 pb-20 flex justify-center items-center">
          <div className="flex flex-col items-center">
            <Loader2 className="h-8 w-8 animate-spin text-orange-600" />
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
        
        <Footer />
      </main>
    );
  }
  
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <MobileMenu />
      
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Your Dashboard</h1>
            <p className="text-gray-600">
              Welcome back, {session?.user?.name || "Member"}
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Membership Status Card */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-bold">Membership Status</h2>
                </div>
                
                <div className="p-6">
                  {membershipStatus ? (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        {membershipStatus.paymentVerified ? (
                          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                            <UserCheck size={24} className="text-green-600" />
                          </div>
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                            <AlertTriangle size={24} className="text-yellow-600" />
                          </div>
                        )}
                        
                        <div>
                          <h3 className="font-medium text-lg">
                            {membershipStatus.paymentVerified
                              ? "Active Member"
                              : "Membership Pending"}
                          </h3>
                          <p className="text-gray-600 text-sm">
                            {membershipStatus.paymentVerified
                              ? membershipStatus.membershipExpiryDate
                                ? `Valid until ${format(new Date(membershipStatus.membershipExpiryDate), 'MMMM d, yyyy')}`
                                : "Active membership"
                              : "Payment verification pending"}
                          </p>
                        </div>
                      </div>
                      
                      {!membershipStatus.paymentVerified && (
                        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                          <h4 className="font-medium mb-2 flex items-center">
                            <CreditCard size={18} className="mr-2 text-yellow-600" />
                            Complete Your Payment
                          </h4>
                          <p className="text-sm text-gray-700 mb-3">
                            Your membership payment is still pending. Please complete the payment to access all member benefits.
                          </p>
                          <Link 
                            href="https://revolut.me/harshnj"
                            className="inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 text-sm"
                          >
                            Pay Membership Fee (€5)
                          </Link>
                        </div>
                      )}
                      
                      {membershipStatus.paymentVerified && membershipStatus.isExpired && (
                        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                          <h4 className="font-medium mb-2 flex items-center">
                            <Clock size={18} className="mr-2 text-yellow-600" />
                            Membership Expired
                          </h4>
                          <p className="text-sm text-gray-700 mb-3">
                            Your membership has expired. Please renew to continue accessing all member benefits.
                          </p>
                          <Link 
                            href="https://revolut.me/harshnj"
                            className="inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 text-sm"
                          >
                            Renew Membership (€5)
                          </Link>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-500">Unable to load membership status.</p>
                  )}
                </div>
              </div>
              
              {/* Upcoming Events Card */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-bold">Your Upcoming Events</h2>
                </div>
                
                <div className="p-6">
                  {upcomingEvents && upcomingEvents.length > 0 ? (
                    <div className="divide-y">
                      {upcomingEvents.map((event, index) => (
                        <div key={index} className="py-4 first:pt-0 last:pb-0">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
                              <CalendarDays size={24} className="text-orange-600" />
                            </div>
                            
                            <div className="flex-1">
                              <h3 className="font-medium">{event.title}</h3>
                              <p className="text-sm text-gray-600">
                                {event.startDate && !isNaN(new Date(event.startDate).getTime()) 
                                  ? `${format(new Date(event.startDate), 'MMMM d, yyyy')} at ${format(new Date(event.startDate), 'h:mm a')}`
                                  : "Date not available"}
                              </p>
                              <p className="text-sm text-gray-500 mt-1">{event.location}</p>
                            </div>
                            
                            <Link 
                              href={`/events/${event.id}`}
                              className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-md"
                            >
                              View
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <CalendarDays size={40} className="mx-auto text-gray-300 mb-3" />
                      <p className="text-gray-500 mb-4">You haven't registered for any upcoming events yet.</p>
                      <Link 
                        href="/events"
                        className="inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 text-sm"
                      >
                        Browse Events
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-6">
              {/* Team Application Status */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-bold">Team Status</h2>
                </div>
                
                <div className="p-6">
                  {teamApplication ? (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        {teamApplication.status === "APPROVED" ? (
                          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                            <CheckCircle2 size={20} className="text-green-600" />
                          </div>
                        ) : teamApplication.status === "REJECTED" ? (
                          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                            <Circle size={20} className="text-red-600" />
                          </div>
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                            <Clock size={20} className="text-yellow-600" />
                          </div>
                        )}
                        
                        <div>
                          <p className="text-sm text-gray-600">
                            Team Application
                          </p>
                          <h3 className="font-medium">
                            {formatDepartment(teamApplication.department)}
                          </h3>
                        </div>
                      </div>
                      
                      <div className={`rounded-md p-3 text-sm ${
                        teamApplication.status === "APPROVED" 
                          ? "bg-green-50 text-green-800" 
                          : teamApplication.status === "REJECTED"
                          ? "bg-red-50 text-red-800"
                          : "bg-yellow-50 text-yellow-800"
                      }`}>
                        {teamApplication.status === "APPROVED" 
                          ? "Congratulations! Your application has been approved." 
                          : teamApplication.status === "REJECTED"
                          ? "Your application was not approved at this time."
                          : "Your application is currently under review."}
                      </div>
                      
                      <div className="text-xs text-gray-500">
                        Applied on {format(new Date(teamApplication.createdAt), 'MMMM d, yyyy')}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <Users size={40} className="mx-auto text-gray-300 mb-3" />
                      <p className="text-gray-500 mb-4">You haven't applied to join a team yet.</p>
                      <Link 
                        href="/join/team"
                        className="inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 text-sm"
                      >
                        Join a Team
                      </Link>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Quick Links */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-bold">Quick Links</h2>
                </div>
                
                <div className="p-4">
                  <div className="grid grid-cols-1 gap-3">
                    <Link 
                      href="/profile"
                      className="flex items-center p-3 hover:bg-gray-50 rounded-md"
                    >
                      <div className="mr-3 h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <UserCheck size={18} className="text-blue-600" />
                      </div>
                      <span>Edit Profile</span>
                    </Link>
                    
                    <Link 
                      href="/resources"
                      className="flex items-center p-3 hover:bg-gray-50 rounded-md"
                    >
                      <div className="mr-3 h-8 w-8 bg-orange-100 rounded-full flex items-center justify-center">
                        <CreditCard size={18} className="text-orange-600" />
                      </div>
                      <span>Member Resources</span>
                    </Link>
                    
                    <Link 
                      href="/events"
                      className="flex items-center p-3 hover:bg-gray-50 rounded-md"
                    >
                      <div className="mr-3 h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                        <CalendarDays size={18} className="text-green-600" />
                      </div>
                      <span>Event Calendar</span>
                    </Link>
                    
                    <Link 
                      href="/members"
                      className="flex items-center p-3 hover:bg-gray-50 rounded-md"
                    >
                      <div className="mr-3 h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <Users size={18} className="text-purple-600" />
                      </div>
                      <span>Member Directory</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
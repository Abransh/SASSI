import prisma from "@/lib/prisma";
import { format } from "date-fns";
import Link from "next/link";
import { getEvents } from "@/lib/event-service";
import { UserPlus, Users, Bell, Calendar, FileText, MessageCircle, ArrowRight, AlertTriangle } from "lucide-react";

export default async function AdminDashboard() {
  // Fetch events
  const events = await getEvents();
  
  // Fetch contact submissions (unresponded)
  const contactSubmissions = await prisma.contactSubmission.findMany({
    where: {
      responded: false,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });
  
  // Fetch membership requests
  const pendingMembershipRequests = await prisma.membershipRequest.count({
    where: {
      status: "PENDING",
    },
  });
  
  // Fetch team applications
  const pendingTeamApplications = await prisma.teamApplication.count({
    where: {
      status: "PENDING",
    },
  });
  
  // Get user statistics
  const userStats = await prisma.$transaction([
    prisma.user.count(),
    prisma.user.count({
      where: {
        paymentVerified: true,
      },
    }),
    prisma.user.count({
      where: {
        membershipExpiryDate: {
          lt: new Date(),
        },
      },
    }),
  ]);
  
  // Count upcoming events
  const now = new Date();
  const upcomingEvents = events.filter(event => new Date(event.startDate) > now).length;
  
  // Get total resources
  const resourcesCount = await prisma.resource.count();
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      {/* Alert for pending requests */}
      {(pendingMembershipRequests > 0 || pendingTeamApplications > 0) && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                You have pending requests that need attention:
                {pendingMembershipRequests > 0 && (
                  <span className="font-medium ml-1">{pendingMembershipRequests} membership {pendingMembershipRequests === 1 ? 'request' : 'requests'}</span>
                )}
                {pendingMembershipRequests > 0 && pendingTeamApplications > 0 && (
                  <span> and </span>
                )}
                {pendingTeamApplications > 0 && (
                  <span className="font-medium">{pendingTeamApplications} team {pendingTeamApplications === 1 ? 'application' : 'applications'}</span>
                )}
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-start">
            <div className="p-3 rounded-full bg-orange-100 text-orange-600 mr-4">
              <UserPlus className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Members</p>
              <div className="flex items-baseline">
                <p className="text-2xl font-bold">{userStats[0]}</p>
                <p className="text-sm text-gray-600 ml-2">
                  ({userStats[1]} verified)
                </p>
              </div>
              {userStats[2] > 0 && (
                <p className="text-xs text-red-500 mt-1">
                  {userStats[2]} expired memberships
                </p>
              )}
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-start">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
              <Calendar className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Events</p>
              <div className="flex items-baseline">
                <p className="text-2xl font-bold">{events.length}</p>
                <p className="text-sm text-gray-600 ml-2">
                  ({upcomingEvents} upcoming)
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-start">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Resources</p>
              <div className="flex items-baseline">
                <p className="text-2xl font-bold">{resourcesCount}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-start">
            <div className="p-3 rounded-full bg-red-100 text-red-600 mr-4">
              <Bell className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Notifications</p>
              <div className="flex items-baseline">
                <p className="text-2xl font-bold">{contactSubmissions.length}</p>
                <p className="text-sm text-gray-600 ml-2">
                  unread messages
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Requests that need attention */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Pending Membership Requests */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white flex justify-between items-center">
            <h2 className="font-bold text-lg">Pending Membership Requests</h2>
            <span className="bg-white text-orange-600 text-sm font-bold px-2 py-1 rounded-full">
              {pendingMembershipRequests}
            </span>
          </div>
          
          <div className="p-5">
            {pendingMembershipRequests > 0 ? (
              <p className="text-gray-600 mb-4">
                You have {pendingMembershipRequests} membership {pendingMembershipRequests === 1 ? 'request' : 'requests'} waiting for your review.
              </p>
            ) : (
              <p className="text-gray-600 mb-4">
                No pending membership requests at this time.
              </p>
            )}
            
            <Link
              href="/admin/membership-requests"
              className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-800 rounded-md hover:bg-orange-200 transition-colors text-sm"
            >
              View All Requests
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
        
        {/* Pending Team Applications */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white flex justify-between items-center">
            <h2 className="font-bold text-lg">Pending Team Applications</h2>
            <span className="bg-white text-blue-600 text-sm font-bold px-2 py-1 rounded-full">
              {pendingTeamApplications}
            </span>
          </div>
          
          <div className="p-5">
            {pendingTeamApplications > 0 ? (
              <p className="text-gray-600 mb-4">
                You have {pendingTeamApplications} team {pendingTeamApplications === 1 ? 'application' : 'applications'} waiting for your review.
              </p>
            ) : (
              <p className="text-gray-600 mb-4">
                No pending team applications at this time.
              </p>
            )}
            
            <Link
              href="/admin/team-applications"
              className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200 transition-colors text-sm"
            >
              View All Applications
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Contact Submissions */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
            <h2 className="font-bold text-lg">Recent Messages</h2>
            <Link
              href="/admin/contact"
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              View All
            </Link>
          </div>
          
          <div className="divide-y">
            {contactSubmissions.length > 0 ? (
              contactSubmissions.map((submission) => (
                <div key={submission.id} className="p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-medium">{submission.subject}</h3>
                    <span className="text-xs text-gray-500">
                      {format(new Date(submission.createdAt), "MMM d, yyyy")}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">
                    From: {submission.name} ({submission.email})
                  </p>
                  <p className="text-sm text-gray-800 line-clamp-1">
                    {submission.message}
                  </p>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-gray-500">
                <MessageCircle className="h-10 w-10 mx-auto opacity-25 mb-2" />
                <p>No pending messages</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Upcoming Events */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
            <h2 className="font-bold text-lg">Upcoming Events</h2>
            <Link
              href="/admin/events"
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              View All
            </Link>
          </div>
          
          <div className="divide-y">
            {events
              .filter(event => new Date(event.startDate) > now)
              .slice(0, 5)
              .map((event) => (
                <div key={event.id} className="p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-medium">{event.title}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      event.published 
                        ? "bg-green-100 text-green-800" 
                        : "bg-gray-100 text-gray-800"
                    }`}>
                      {event.published ? "Published" : "Draft"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">
                    {format(new Date(event.startDate), "MMMM d, yyyy 'at' h:mm a")}
                  </p>
                  <p className="text-sm text-gray-600">
                    {event.location}
                  </p>
                </div>
              ))}
              
            {events.filter(event => new Date(event.startDate) > now).length === 0 && (
              <div className="p-6 text-center text-gray-500">
                <Calendar className="h-10 w-10 mx-auto opacity-25 mb-2" />
                <p>No upcoming events</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
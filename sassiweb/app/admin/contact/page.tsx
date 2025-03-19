import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { format } from "date-fns";
import Header from "@/components/Header";
import MobileMenu from "@/components/MobileMenu";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Mail, Check, MailOpen } from "lucide-react";

export default async function ContactSubmissionsPage() {
  // Check if user is authenticated and is an admin
  const session = await getServerSession(authOptions);
  
  if (!session || session.user.role !== "ADMIN") {
    redirect("/auth/signin?callbackUrl=/admin/contact");
  }
  
  // Fetch contact submissions
  const contactSubmissions = await prisma.contactSubmission.findMany({
    orderBy: {
      createdAt: "desc"
    }
  });
  
  // Group submissions by status
  const pendingSubmissions = contactSubmissions.filter(
    (submission) => !submission.responded
  );
  
  const respondedSubmissions = contactSubmissions.filter(
    (submission) => submission.responded
  );
  
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <MobileMenu />

      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Contact Form Submissions</h1>
            <p className="text-gray-600">
              Manage and respond to messages from the contact form
            </p>
          </div>
          
          {/* Submission Tabs */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                <button className="w-1/2 py-4 px-1 text-center border-b-2 border-orange-500 font-medium text-orange-600">
                  Pending ({pendingSubmissions.length})
                </button>
                <button className="w-1/2 py-4 px-1 text-center border-b-2 border-transparent font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                  Responded ({respondedSubmissions.length})
                </button>
              </nav>
            </div>
            
            {/* Submissions List */}
            <div className="divide-y divide-gray-200">
              {pendingSubmissions.length > 0 ? (
                pendingSubmissions.map((submission) => (
                  <div key={submission.id} className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {submission.subject}
                        </h3>
                        <div className="mt-1 flex items-center">
                          <span className="text-sm font-medium text-gray-700 mr-2">
                            {submission.name}
                          </span>
                          <span className="text-sm text-gray-500">
                            &lt;{submission.email}&gt;
                          </span>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">
                        {format(new Date(submission.createdAt), "MMM d, yyyy 'at' h:mm a")}
                      </span>
                    </div>
                    
                    <div className="mt-2 text-sm text-gray-700 whitespace-pre-line mb-4">
                      {submission.message}
                    </div>
                    
                    <div className="mt-4 flex gap-4">
                      <a
                        href={`mailto:${submission.email}?subject=Re: ${submission.subject}`}
                        className="inline-flex items-center px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium rounded-md"
                      >
                        <Mail className="mr-2 h-4 w-4" />
                        Reply via Email
                      </a>
                      
                      <Link
                        href={`/admin/contact/${submission.id}/mark-responded`}
                        className="inline-flex items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-medium rounded-md"
                      >
                        <Check className="mr-2 h-4 w-4" />
                        Mark as Responded
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-20 text-center">
                  <MailOpen className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-lg font-medium text-gray-900">No Pending Messages</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    You have responded to all messages. Check back later for new submissions.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import Header from "@/components/Header";
import MobileMenu from "@/components/MobileMenu";
import Footer from "@/components/Footer";
import ContactSubmissionList from "@/components/admin/ContactSubmissionList";

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

// Convert `createdAt` to a string for compatibility
const formattedSubmissions = contactSubmissions.map((submission) => ({
  ...submission,
  createdAt: submission.createdAt.toISOString(), // Convert Date to string
}));
  
  // Group submissions by status
const pendingSubmissions = formattedSubmissions.filter(
  (submission) => !submission.responded
);

const respondedSubmissions = formattedSubmissions.filter(
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
            <ContactSubmissionList submissions={pendingSubmissions} />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
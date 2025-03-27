"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import { Mail, Check, X, MailOpen } from "lucide-react";
import ContactResponseForm from "@/components/admin/ContactResponseForm";

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  responded: boolean;
}

interface ContactSubmissionListProps {
  submissions: ContactSubmission[];
}

export default function ContactSubmissionList({ submissions }: ContactSubmissionListProps) {
  const router = useRouter();
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);
  
  const handleShowResponseForm = (submission: ContactSubmission) => {
    setSelectedSubmission(submission);
  };
  
  const handleResponseSent = () => {
    setSelectedSubmission(null);
    router.refresh(); // Refresh the page to update the list
  };
  
  return (
    <>
      <div className="divide-y divide-gray-200">
        {submissions.length > 0 ? (
          submissions.map((submission) => (
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
                <button
                  onClick={() => handleShowResponseForm(submission)}
                  className="inline-flex items-center px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium rounded-md"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Respond via Website
                </button>
                
                <a
                  href={`mailto:${submission.email}?subject=Re: ${submission.subject}`}
                  className="inline-flex items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-medium rounded-md"
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
      
      {/* Response Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl mx-4">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Respond to Contact</h2>
                <button
                  onClick={() => setSelectedSubmission(null)}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <ContactResponseForm
                submissionId={selectedSubmission.id}
                recipientName={selectedSubmission.name}
                recipientEmail={selectedSubmission.email}
                originalSubject={selectedSubmission.subject}
                originalMessage={selectedSubmission.message}
                onResponseSent={handleResponseSent}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
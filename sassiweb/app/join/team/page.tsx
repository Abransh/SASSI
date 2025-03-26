"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Loader2, CheckCircle, User, ShieldAlert } from "lucide-react";
import Link from "next/link";
import Header from "@/components/Header";
import MobileMenu from "@/components/MobileMenu";
import Footer from "@/components/Footer";
import { toast } from "sonner";

// Team departments
const DEPARTMENTS = [
  {
    id: "student-support",
    title: "Student Support",
    description: "Help new arrivals navigate life in Milan, answer queries, and provide guidance on practical matters.",
    icon: "👋"
  },
  {
    id: "events",
    title: "Event Organizers",
    description: "Plan, coordinate, and execute cultural and social events, celebrations, and gatherings for the community.",
    icon: "🎉"
  },
  {
    id: "consulate",
    title: "Consulate Liaison",
    description: "Coordinate with the Indian Consulate for official matters, document verifications, and community services.",
    icon: "🏛️"
  },
  {
    id: "sponsorship",
    title: "Sponsorship & External Liaison",
    description: "Build relationships with sponsors, partner organizations, and represent SASSI in external meetings.",
    icon: "🤝"
  },
  {
    id: "social-media",
    title: "Social Media, Design & Content Creation",
    description: "Create engaging content, manage social media accounts, and design promotional materials.",
    icon: "🎨"
  },
  {
    id: "tech",
    title: "Tech Team",
    description: "Maintain the website, develop new features, and provide technical support for digital initiatives.",
    icon: "💻"
  }
];

export default function TeamRegistrationPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [motivation, setMotivation] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [paymentVerified, setPaymentVerified] = useState(false);
  
  useEffect(() => {
    // Check if user is authenticated once the session loads
    if (status === "unauthenticated") {
      toast.info("Please register or sign in to join the team");
      router.push("/join/member");
    } else if (status === "authenticated" && session) {
      // Check if user's payment is verified
      checkPaymentStatus();
    }
  }, [status, router, session]);
  
  const checkPaymentStatus = async () => {
    try {
      const response = await fetch('/api/user/payment-status');
      if (response.ok) {
        const data = await response.json();
        setPaymentVerified(data.paymentVerified);
      }
    } catch (error) {
      console.error("Error checking payment status:", error);
    }
  };
  
  const handleDepartmentSelect = (departmentId: string) => {
    setSelectedDepartment(departmentId);
    setIsConfirming(true);
  };
  
  const handleConfirm = async () => {
    if (!selectedDepartment) return;
    
    setIsSubmitting(true);
    
    try {
      // Send team application to the API
      const response = await fetch("/api/join/team", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          department: selectedDepartment,
          motivation: motivation
        }),
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to submit application");
      }
      
      // Show success screen
      setIsSuccess(true);
      
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error(error instanceof Error ? error.message : "Failed to submit your application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleChangeSelection = () => {
    setIsConfirming(false);
  };
  
  const handleMotivationChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMotivation(e.target.value);
  };
  
  // If loading session
  if (status === "loading") {
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
  
  // Show the success screen
  if (isSuccess) {
    const selectedDept = DEPARTMENTS.find(dept => dept.id === selectedDepartment);
    
    return (
      <main className="min-h-screen bg-gray-50">
        <Header />
        <MobileMenu />
        
        <div className="pt-32 pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-8 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} className="text-green-600" />
                  </div>
                  
                  <h1 className="text-2xl font-bold mb-4">Application Submitted!</h1>
                  
                  <p className="text-gray-600 mb-6">
                    Thank you for your interest in joining the SASSI team as part of the 
                    <span className="font-medium"> {selectedDept?.title}</span> department.
                  </p>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
                    <h3 className="font-medium text-blue-800 mb-2">What happens next?</h3>
                    <ol className="list-decimal pl-5 text-sm text-gray-700 space-y-1">
                      <li>A confirmation email has been sent to your registered email address.</li>
                      <li>A team coordinator will review your application.</li>
                      <li>You&apos;ll be contacted within the next 3-5 days for further steps.</li>
                      <li>You may be invited to a brief orientation call to discuss your role.</li>
                    </ol>
                  </div>
                  
                  <div className="flex justify-center space-x-4">
                    <Link 
                      href="/"
                      className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                    >
                      Return to Home
                    </Link>
                    
                    <Link 
                      href="/profile"
                      className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
                    >
                      Go to My Profile
                    </Link>
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
  
  // Show payment required message if not verified
  if (session && !paymentVerified) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Header />
        <MobileMenu />
        
        <div className="pt-32 pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-8 text-center">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShieldAlert size={32} className="text-yellow-600" />
                  </div>
                  
                  <h1 className="text-2xl font-bold mb-4">Complete Your Membership First</h1>
                  
                  <p className="text-gray-600 mb-6">
                    To join the SASSI team, you need to complete your membership payment first.
                  </p>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
                    <h3 className="font-medium text-blue-800 mb-2">Next Steps:</h3>
                    <ol className="list-decimal pl-5 text-sm text-gray-700 space-y-1">
                      <li>Complete your membership payment (€5.00 annual fee).</li>
                      <li>Wait for your payment to be verified by our administrators.</li>
                      <li>Return to this page to submit your team application.</li>
                    </ol>
                  </div>
                  
                  <Link 
                    href="https://revolut.me/harshnj"
                    className="px-6 py-3 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors inline-block"
                  >
                    Complete Payment
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <Footer />
      </main>
    );
  }
  
  // Show confirmation screen
  if (isConfirming && selectedDepartment) {
    const selectedDept = DEPARTMENTS.find(dept => dept.id === selectedDepartment);
    
    return (
      <main className="min-h-screen bg-gray-50">
        <Header />
        <MobileMenu />
        
        <div className="pt-32 pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 border-b">
                  <h1 className="text-2xl font-bold mb-1">Confirm Your Selection</h1>
                  <p className="text-gray-600">
                    Please review your team department selection before submitting.
                  </p>
                </div>
                
                <div className="p-6">
                  <div className="bg-orange-50 p-4 rounded-lg border border-orange-200 mb-6">
                    <h2 className="text-lg font-bold flex items-center">
                      <span className="text-2xl mr-2">{selectedDept?.icon}</span>
                      {selectedDept?.title}
                    </h2>
                    <p className="text-gray-700 mt-2">{selectedDept?.description}</p>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="motivation" className="block text-sm font-medium mb-2">
                      Why would you like to join this team? (Optional)
                    </label>
                    <textarea
                      id="motivation"
                      value={motivation}
                      onChange={handleMotivationChange}
                      className="w-full p-3 border border-gray-300 rounded-md"
                      placeholder="Share your motivation, skills, and what you hope to contribute to the team..."
                      rows={4}
                    ></textarea>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h3 className="font-medium text-blue-800 mb-2">What to expect:</h3>
                    <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                      <li>You&apos;ll be added to the department&apos;s communication channels.</li>
                      <li>A team coordinator will reach out to discuss your role.</li>
                      <li>Time commitment is flexible, typically 2-4 hours per week.</li>
                      <li>You&apos;ll receive training and support from experienced team members.</li>
                    </ul>
                  </div>
                  
                  <div className="flex justify-between mt-8">
                    <button
                      type="button"
                      onClick={handleChangeSelection}
                      className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                      disabled={isSubmitting}
                    >
                      Change Selection
                    </button>
                    
                    <button
                      type="button"
                      onClick={handleConfirm}
                      className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors flex items-center"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        "Confirm & Submit"
                      )}
                    </button>
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
  
  // Show department selection screen
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <MobileMenu />
      
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b">
                <h1 className="text-2xl font-bold mb-1">Join the SASSI Team</h1>
                <p className="text-gray-600">
                  Select the department you&apos;d like to contribute to. Each plays a vital role in our community.
                </p>
              </div>
              
              <div className="p-6">
                {session ? (
                  <>
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200 mb-6 flex items-center">
                      <User className="text-green-600 mr-3 h-5 w-5" />
                      <p className="text-green-800">
                        Signed in as <span className="font-medium">{session.user.email}</span>
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      {DEPARTMENTS.map((dept) => (
                        <div
                          key={dept.id}
                          className="border rounded-lg p-4 cursor-pointer hover:border-orange-500 hover:shadow-md transition-all"
                          onClick={() => handleDepartmentSelect(dept.id)}
                        >
                          <h3 className="text-lg font-bold flex items-center">
                            <span className="text-2xl mr-2">{dept.icon}</span>
                            {dept.title}
                          </h3>
                          <p className="text-gray-600 mt-2 text-sm">{dept.description}</p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded-md">
                      <p>
                        <strong>Note:</strong> By joining the team, you&apos;re committing to actively participate in SASSI activities. The time commitment is flexible, but we appreciate your dedication to our community's mission.
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <ShieldAlert size={32} className="text-yellow-600" />
                    </div>
                    
                    <h2 className="text-xl font-bold mb-2">Member Registration Required</h2>
                    <p className="text-gray-600 mb-6 max-w-md mx-auto">
                      To join the SASSI team, you need to be a registered member first. Please complete your membership registration.
                    </p>
                    
                    <Link
                      href="/join/member"
                      className="px-6 py-3 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors inline-block"
                    >
                      Register as a Member
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
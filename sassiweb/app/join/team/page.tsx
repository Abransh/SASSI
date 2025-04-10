"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Loader2, CheckCircle, User, ShieldAlert, CreditCard } from "lucide-react";
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
  const [hasExclusiveMembership, setHasExclusiveMembership] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  
  useEffect(() => {
    if (status === "unauthenticated") {
      toast.info("Please register or sign in to join the team");
      router.push("/auth/signup");
    } else if (status === "authenticated" && session) {
      checkExclusiveMembership();
    }
  }, [status, router, session]);
  
  const checkExclusiveMembership = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/user/payment-status');
      if (response.ok) {
        const data = await response.json();
        setHasExclusiveMembership(data.paymentVerified);
        if (!data.paymentVerified) {
          toast.info("You need to be an exclusive member to join the team");
          router.push("/join/exclusive-member");
        }
      }
    } catch (error) {
      console.error("Error checking membership status:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDepartmentSelect = (departmentId: string) => {
    setSelectedDepartment(departmentId);
    setIsConfirming(true);
  };
  
  const handleConfirm = async () => {
    if (!selectedDepartment || !session) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/user/team-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          department: selectedDepartment,
          motivation: motivation.trim(),
        }),
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to submit application');
      }
      
      const data = await response.json();
      
      // Check if payment is required
      if (data.paymentRequired && data.checkoutUrl) {
        // Redirect to Stripe checkout
        window.location.href = data.checkoutUrl;
        return;
      }
      
      // For users who already paid
      setIsSuccess(true);
      setIsConfirming(false);
    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to submit application');
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

  const handleInitiatePayment = async () => {
    if (!session) return;
    
    setIsPaymentProcessing(true);
    
    try {
      // We'll use a temporary department to create the application
      // which will be updated after payment is confirmed
      const response = await fetch('/api/user/team-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          department: "pending-payment", // Temporary value
          motivation: "",
        }),
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to initiate payment');
      }
      
      const data = await response.json();
      
      // Redirect to Stripe checkout
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
        return;
      }
      
      // If payment was already verified, refresh the page to show department selection
      if (!data.paymentRequired) {
        setHasExclusiveMembership(true);
        toast.success("Your payment has been verified");
      }
    } catch (error) {
      console.error('Error initiating payment:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to initiate payment');
    } finally {
      setIsPaymentProcessing(false);
    }
  };
  
  // If loading session
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
  
  // Show payment required screen if not verified
  if (!hasExclusiveMembership && session) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Header />
        <MobileMenu />
        
        <div className="pt-32 pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 border-b">
                  <h1 className="text-2xl font-bold mb-1">Join the SASSI Team</h1>
                  <p className="text-gray-600">
                    Complete your membership payment to proceed with team application
                  </p>
                </div>
                
                <div className="p-6">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-6">
                    <h3 className="font-medium text-blue-800 flex items-center">
                      <CreditCard className="mr-2 h-5 w-5" />
                      Membership Fee Required
                    </h3>
                    <p className="text-gray-700 mt-2">
                      A one-time membership fee of <span className="font-medium">€5.00</span> is required to join the SASSI team. This helps us cover operational costs and ensures commitment from our team members.
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
                    <h3 className="font-medium text-gray-800 mb-2">Benefits of membership:</h3>
                    <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                      <li>Contribute to the Indian student community in Milan</li>
                      <li>Develop leadership and organizational skills</li>
                      <li>Network with peers and professionals</li>
                      <li>Gain valuable experience for your resume</li>
                      <li>Priority access to SASSI events and resources</li>
                    </ul>
                  </div>
                  
                  <div className="flex justify-between mt-8">
                    <Link
                      href="/"
                      className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </Link>
                    
                    <button
                      type="button"
                      onClick={handleInitiatePayment}
                      className="px-6 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors flex items-center"
                      disabled={isPaymentProcessing}
                    >
                      {isPaymentProcessing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          Pay €5.00 & Continue
                        </>
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
  
  // Show department selection screen (only if payment is verified)
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <MobileMenu />
      
      <div className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Join the SASSI Team
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Be part of our mission to support and empower Indian students in Milan
            </p>
            
            {/* Benefits Section */}
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Team Member Benefits
                </h2>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 inline-block">
                  <p className="text-red-600 font-semibold">
                    Early Access Membership Fee: <span className="text-2xl">€5.00</span> (First 50 members only!)
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg border border-orange-200 hover:shadow-lg transition-shadow">
                  <div className="text-4xl mb-4 bg-white rounded-full w-16 h-16 flex items-center justify-center shadow-sm">
                    🎟️
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">Pre-access to Events</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Get early access to register for all open events before they're available to the general public.
                  </p>
                </div>
                
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg border border-orange-200 hover:shadow-lg transition-shadow">
                  <div className="text-4xl mb-4 bg-white rounded-full w-16 h-16 flex items-center justify-center shadow-sm">
                    🔒
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">Exclusive Events</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Access to special member-only events, workshops, and networking opportunities.
                  </p>
                </div>
                
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg border border-orange-200 hover:shadow-lg transition-shadow">
                  <div className="text-4xl mb-4 bg-white rounded-full w-16 h-16 flex items-center justify-center shadow-sm">
                    🤝
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">Team Membership</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Join our dedicated team and contribute to building a stronger Indian student community in Milan.
                  </p>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <div className="inline-flex items-center bg-orange-50 px-4 py-2 rounded-full">
                  <span className="text-orange-600 font-medium">Limited Time Offer</span>
                  <span className="ml-2 text-orange-500">•</span>
                  <span className="ml-2 text-orange-600">First 50 members only</span>
                </div>
              </div>
            </div>
            
            {/* Membership Fee Section */}
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Membership Fee
              </h2>
              <p className="text-gray-600 mb-4">
                A one-time membership fee of €5.00 is required to join the SASSI team. This helps us cover operational costs and ensures commitment from our team members.
              </p>
              <p className="text-red-500 font-semibold mb-4">
                Early membership price for the first 50 members!
              </p>
              <div className="flex items-center justify-center space-x-4">
                <div className="text-4xl font-bold text-orange-600">€5.00</div>
                <div className="text-gray-500 line-through">€10.00</div>
              </div>
            </div>
            
            {/* Department Selection */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Choose Your Department
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {DEPARTMENTS.map((dept) => (
                  <button
                    key={dept.id}
                    onClick={() => handleDepartmentSelect(dept.id)}
                    className={`p-6 rounded-lg border-2 transition-all ${
                      selectedDepartment === dept.id
                        ? "border-orange-500 bg-orange-50"
                        : "border-gray-200 hover:border-orange-300"
                    }`}
                  >
                    <div className="text-3xl mb-4">{dept.icon}</div>
                    <h3 className="text-lg font-semibold mb-2">{dept.title}</h3>
                    <p className="text-gray-600">{dept.description}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
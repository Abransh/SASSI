"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Loader2, CheckCircle, CreditCard } from "lucide-react";
import Link from "next/link";
import Header from "@/components/Header";
import MobileMenu from "@/components/MobileMenu";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import { getStripeClient } from "@/lib/stripe";
import { loadStripe } from "@stripe/stripe-js";

export default function ExclusiveMemberPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [paymentVerified, setPaymentVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  const [membershipCode, setMembershipCode] = useState<string | null>(null);
  
  useEffect(() => {
    if (status === "unauthenticated") {
      toast.info("Please register or sign in to become an exclusive member");
      router.push("/auth/signup");
    } else if (status === "authenticated" && session) {
      checkPaymentStatus();
    }
  }, [status, router, session]);
  
  const checkPaymentStatus = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/user/payment-status');
      if (response.ok) {
        const data = await response.json();
        setPaymentVerified(data.paymentVerified);
        if (data.paymentVerified && data.membershipCode) {
          setMembershipCode(data.membershipCode);
          setIsSuccess(true);
        }
      }
    } catch (error) {
      console.error("Error checking payment status:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handlePayment = async () => {
    try {
      setIsLoading(true);
      
      // Get the base URL for the current environment
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
      
      const response = await fetch('/api/payments/create-exclusive-membership', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          successUrl: `${baseUrl}/join/exclusive-member?success=true`,
          cancelUrl: `${baseUrl}/join/exclusive-member?canceled=true`,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment session');
      }

      const { sessionId } = await response.json();
      
      // Redirect to Stripe Checkout using client-side Stripe
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
      if (!stripe) {
        throw new Error('Stripe failed to initialize');
      }
      
      const { error } = await stripe.redirectToCheckout({ sessionId });
      
      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error creating exclusive membership:', error);
      toast.error('Failed to create payment session. Please try again.');
    } finally {
      setIsLoading(false);
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
  
  // Show the success screen with membership code
  if (isSuccess && membershipCode) {
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
                  
                  <h1 className="text-2xl font-bold mb-4">Welcome to SASSI Exclusive Membership!</h1>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                    <h3 className="font-medium text-blue-800 mb-2">Your Membership Code</h3>
                    <div className="text-3xl font-bold text-gray-900 tracking-wider">
                      {membershipCode}
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      Please keep this code safe. You'll need it to access exclusive benefits.
                    </p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
                    <Link 
                      href="/dashboard"
                      className="px-6 py-3 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
                    >
                      Go to Dashboard
                    </Link>
                    
                    <Link 
                      href="/join/team"
                      className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Join as Team Member
                    </Link>
                    
                    <Link 
                      href="/events"
                      className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                    >
                      View Events
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
  if (!paymentVerified && session) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Header />
        <MobileMenu />
        
        <div className="pt-32 pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 border-b">
                  <h1 className="text-2xl font-bold mb-1">Become an Exclusive Member</h1>
                  <p className="text-gray-600">
                    Join SASSI as an exclusive member to access premium benefits
                  </p>
                </div>
                
                <div className="p-6">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-6">
                    <h3 className="font-medium text-blue-800 flex items-center">
                      <CreditCard className="mr-2 h-5 w-5" />
                      Membership Fee Required
                    </h3>
                    <p className="text-gray-700 mt-2">
                      A one-time membership fee of <span className="font-medium">€5.00</span> is required to become an exclusive member. This helps us cover operational costs and ensures commitment from our members.
                    </p>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <div className="text-center mb-6">
                      <h2 className="text-2xl font-bold text-gray-900 mb-3">
                        Exclusive Member Benefits
                      </h2>
                      <div className="bg-red-50 border border-red-200 rounded-lg p-3 inline-block">
                        <p className="text-red-600 font-semibold">
                          Early Access Membership Fee: <span className="text-xl">€5.00</span> (First 50 members only!)
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
                      onClick={handlePayment}
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
  
  return null;
} 
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useSession } from 'next-auth/react';
import { Loader2, Calendar, X } from 'lucide-react';

interface EventRegistrationButtonProps {
  eventId: string;
  isPaid?: boolean;
  isFull?: boolean;
  price?: number;
}

export default function EventRegistrationButton({
  eventId,
  isPaid = false,
  isFull = false,
  price = 0,
}: EventRegistrationButtonProps) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isCheckingStatus, setIsCheckingStatus] = useState(true);
  const [registrationStatus, setRegistrationStatus] = useState<string | null>(null);

  // Check registration status when component mounts or when returning from Stripe
  useEffect(() => {
    async function checkRegistrationStatus() {
      if (!session?.user) {
        setIsCheckingStatus(false);
        return;
      }
      
      setIsCheckingStatus(true);
      
      try {
        const response = await fetch(`/api/events/${eventId}/register/status`);
        const data = await response.json();
        
        setIsRegistered(data.isRegistered);
        setRegistrationStatus(data.status);
        
        // Check URL parameters for payment status
        const searchParams = new URLSearchParams(window.location.search);
        const paymentStatus = searchParams.get('payment_status');
        
        if (paymentStatus === 'success' && !data.isRegistered) {
          // This can happen if webhook hasn't processed yet
          toast.success("Registration successful! Payment completed.");
          setIsRegistered(true);
        } else if (paymentStatus === 'canceled') {
          // Even if system already marked it canceled, show message
          toast.error("Payment was cancelled. You are not registered for this event.");
          setIsRegistered(false);
        }
      } catch (error) {
        console.error("Error checking registration status:", error);
      } finally {
        setIsCheckingStatus(false);
      }
    }

    checkRegistrationStatus();
    
    // Set up an interval to periodically check status (useful for pending registrations)
    const intervalId = setInterval(checkRegistrationStatus, 15000);
    
    return () => clearInterval(intervalId);
  }, [eventId, session]);

  const handleRegister = async () => {
    // Check if user is logged in
    if (status !== 'authenticated') {
      router.push(`/auth/signin?callbackUrl=/events/${eventId}`);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`/api/events/${eventId}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          successUrl: `${window.location.origin}/events/${eventId}?payment_status=success`,
          cancelUrl: `${window.location.origin}/events/${eventId}?payment_status=canceled`,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to register for event');
      }

      const data = await response.json();

      // If there's a checkout URL, redirect to it
      if (data.requiresPayment && data.checkoutUrl) {
        console.log("Redirecting to payment:", data.checkoutUrl);
        window.location.href = data.checkoutUrl;
        return;
      }

      // Otherwise, show success message for free events
      toast.success('Successfully registered for event!');
      setIsRegistered(true);
      router.refresh();
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to register for event');
    } finally {
      setIsLoading(false);
    }
  };

  const cancelRegistration = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/events/${eventId}/register`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        toast.error(data.error || "Failed to cancel registration");
        return;
      }
      
      toast.success("Registration cancelled");
      setIsRegistered(false);
      router.refresh();
    } catch (error) {
      console.error("Error cancelling registration:", error);
      toast.error("Failed to cancel registration");
    } finally {
      setIsLoading(false);
    }
  };

  if (isCheckingStatus || status === "loading") {
    return (
      <Button disabled className="w-full md:w-auto">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Checking status...
      </Button>
    );
  }

  if (isFull && !isRegistered) {
    return (
      <Button variant="outline" disabled className="w-full md:w-auto">
        Event Full
      </Button>
    );
  }

  if (isRegistered) {
    // Show pending status if applicable
    if (registrationStatus === "PENDING") {
      return (
        <div className="flex flex-col gap-2">
          <Button 
            variant="outline" 
            disabled
            className="w-full md:w-auto bg-yellow-50 text-yellow-800 border-yellow-300"
          >
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Registration Pending
          </Button>
          <Button
            variant="outline"
            onClick={async () => {
              try {
                // First, get the registration details to check if we have a payment ID
                const statusResponse = await fetch(`/api/events/${eventId}/register/status`);
                const statusData = await statusResponse.json();
                
                if (statusData.paymentId) {
                  // If we have a payment ID, get the checkout URL from the payment record
                  const paymentResponse = await fetch(`/api/payments/${statusData.paymentId}`);
                  if (!paymentResponse.ok) {
                    throw new Error('Failed to get payment details');
                  }
                  
                  const paymentData = await paymentResponse.json();
                  if (paymentData.checkoutUrl) {
                    window.location.href = paymentData.checkoutUrl;
                    return;
                  }
                }
                
                // If no payment ID or checkout URL found, create a new registration
                const response = await fetch(`/api/events/${eventId}/register`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    successUrl: `${window.location.origin}/events/${eventId}?payment_status=success`,
                    cancelUrl: `${window.location.origin}/events/${eventId}?payment_status=canceled`,
                  }),
                });

                if (!response.ok) {
                  const errorData = await response.json();
                  throw new Error(errorData.error || 'Failed to get payment link');
                }

                const data = await response.json();
                if (data.checkoutUrl) {
                  window.location.href = data.checkoutUrl;
                } else {
                  throw new Error('No checkout URL available');
                }
              } catch (error) {
                console.error('Error getting payment link:', error);
                toast.error(error instanceof Error ? error.message : 'Failed to get payment link');
              }
            }}
            className="w-full md:w-auto text-sm"
          >
            Complete Payment
          </Button>
        </div>
      );
    }
    
    // Otherwise show cancel button for confirmed registrations
    return (
      <Button 
        variant="outline" 
        onClick={cancelRegistration}
        disabled={isLoading}
        className="w-full md:w-auto"
      >
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <X className="mr-2 h-4 w-4" />
        )}
        Cancel Registration
      </Button>
    );
  }

  // Standard registration button
  return (
    <Button 
      onClick={handleRegister}
      disabled={isLoading}
      className="w-full md:w-auto bg-orange-600 hover:bg-orange-700"
    >
      {isLoading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Calendar className="mr-2 h-4 w-4" />
      )}
      {isPaid ? `Register - €${price.toFixed(2)}` : 'Register Free'}
    </Button>
  );
}
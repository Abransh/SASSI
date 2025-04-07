"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSession } from 'next-auth/react';
import { Loader2 } from 'lucide-react';

interface EventRegistrationButtonProps {
  eventId: string;
  isRegistered?: boolean;
  isPending?: boolean;
  isFull?: boolean;
  price?: number;
}

export default function EventRegistrationButton({
  eventId,
  isRegistered = false,
  isPending = false,
  isFull = false,
  price = 0,
}: EventRegistrationButtonProps) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [statusChecked, setStatusChecked] = useState(false);
  // Track registration status internally to allow for overrides
  const [isRegisteredInternal, setIsRegisteredInternal] = useState(isRegistered);
  
  // Check registration status when component mounts or when returning from Stripe
  useEffect(() => {
    // Update internal state when prop changes
    setIsRegisteredInternal(isRegistered);
    
    const searchParams = new URLSearchParams(window.location.search);
    const paymentStatus = searchParams.get('payment_status');
    
    if (paymentStatus && !statusChecked) {
      if (paymentStatus === 'success') {
        toast.success("Registration successful! Payment completed.");
        setStatusChecked(true);
        // Force refresh registration status
        checkRegistrationStatus();
      } else if (paymentStatus === 'canceled') {
        toast.error("Payment was cancelled. You can try registering again.");
        setStatusChecked(true);
        setIsRegisteredInternal(false);
        // Force refresh registration status
        checkRegistrationStatus();
      }
    }
  }, [isRegistered, statusChecked]);

  // Function to check registration status directly from API
  const checkRegistrationStatus = async () => {
    try {
      const response = await fetch(`/api/events/${eventId}/register/status`);
      if (response.ok) {
        const data = await response.json();
        setIsRegisteredInternal(data.isRegistered);
        
        // If the registration state doesn't match what we're showing, refresh the page
        if (data.isRegistered !== isRegistered) {
          router.refresh();
        }
      }
    } catch (error) {
      console.error("Error checking registration status:", error);
    }
  };

  const handleRegistration = async () => {
    // Check if user is logged in
    if (status !== 'authenticated') {
      router.push(`/login?callbackUrl=/events/${eventId}`);
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
          successUrl: `${window.location.origin}/events/${eventId}?registration=success`,
          cancelUrl: `${window.location.origin}/events/${eventId}?registration=cancelled`,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to register for event');
      }

      // If there's a checkout URL, redirect to it
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
        return;
      }

      // Otherwise, show success message
      toast.success('Successfully registered for event!');
      setIsRegisteredInternal(true);
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
      setIsRegisteredInternal(false);
      router.refresh();
    } catch (error) {
      console.error("Error cancelling registration:", error);
      toast.error("Failed to cancel registration");
    } finally {
      setIsLoading(false);
    }
  };

  if (isRegisteredInternal) {
    return (
      <Button 
        onClick={cancelRegistration} 
        variant="destructive"
        disabled={isLoading}
        className="w-full md:w-auto"
      >
        {isLoading ? "Processing..." : "Cancel Registration"}
      </Button>
    );
  }

  if (isPending) {
    return (
      <Button variant="outline" disabled className="w-full sm:w-auto">
        Registration Pending
      </Button>
    );
  }

  if (isFull) {
    return (
      <Button variant="outline" disabled className="w-full sm:w-auto">
        Event Full
      </Button>
    );
  }

  return (
    <Button
      onClick={handleRegistration}
      disabled={isLoading}
      className="w-full sm:w-auto"
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {price > 0 ? 'Processing...' : 'Registering...'}
        </>
      ) : (
        <>{price > 0 ? `Register - €${price.toFixed(2)}` : 'Register for Free'}</>
      )}
    </Button>
  );
} 
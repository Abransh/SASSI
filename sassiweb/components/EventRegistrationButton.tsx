"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface EventRegistrationButtonProps {
  eventId: string;
  isRegistered: boolean;
  isPaid: boolean;
  isFull: boolean;
}

export default function EventRegistrationButton({
  eventId,
  isRegistered: initialIsRegistered,
  isPaid,
  isFull,
}: EventRegistrationButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [statusChecked, setStatusChecked] = useState(false);
  // Track registration status internally to allow for overrides
  const [isRegistered, setIsRegistered] = useState(initialIsRegistered);
  
  // Check registration status when component mounts or when returning from Stripe
  useEffect(() => {
    // Update internal state when prop changes
    setIsRegistered(initialIsRegistered);
    
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
        setIsRegistered(false);
        // Force refresh registration status
        checkRegistrationStatus();
      }
    }
  }, [initialIsRegistered, statusChecked]);

  // Function to check registration status directly from API
  const checkRegistrationStatus = async () => {
    try {
      const response = await fetch(`/api/events/${eventId}/register/status`);
      if (response.ok) {
        const data = await response.json();
        setIsRegistered(data.isRegistered);
        
        // If the registration state doesn't match what we're showing, refresh the page
        if (data.isRegistered !== initialIsRegistered) {
          router.refresh();
        }
      }
    } catch (error) {
      console.error("Error checking registration status:", error);
    }
  };

  const registerForEvent = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/events/${eventId}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      
      if (!response.ok) {
        toast.error(data.error || "Failed to register for event");
        // If the error is about an existing PENDING registration, refresh the UI to show correct state
        if (data.error && data.error.includes("already registered")) {
          checkRegistrationStatus();
        }
        return;
      }
      
      // If we received a URL, redirect to Stripe checkout
      if (data.url) {
        console.log("Redirecting to Stripe:", data.url);
        window.location.href = data.url;
        return;
      }
      
      // For free events that don't need payment
      toast.success("Registration successful!");
      setIsRegistered(true);
      router.refresh();
    } catch (error) {
      console.error("Error registering for event:", error);
      toast.error("Failed to register for event");
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

  if (isRegistered) {
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

  return (
    <Button
      onClick={registerForEvent}
      disabled={isFull || isLoading}
      className="w-full md:w-auto"
    >
      {isLoading ? "Processing..." : isFull ? "Event Full" : isPaid ? "Register (Paid)" : "Register (Free)"}
    </Button>
  );
} 
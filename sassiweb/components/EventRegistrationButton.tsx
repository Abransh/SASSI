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
  isRegistered,
  isPaid,
  isFull,
}: EventRegistrationButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [statusChecked, setStatusChecked] = useState(false);
  
  // Check registration status when navigating back from Stripe
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const paymentStatus = searchParams.get('payment_status');
    
    if (paymentStatus && !statusChecked) {
      if (paymentStatus === 'success') {
        toast.success("Registration successful! Payment completed.");
        setStatusChecked(true);
        router.refresh();
      } else if (paymentStatus === 'canceled') {
        toast.info("Payment was cancelled. Your registration is pending.");
        setStatusChecked(true);
        router.refresh();
      }
    }
  }, [router, statusChecked]);

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
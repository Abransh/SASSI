"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import { registerForEvent, cancelRegistration } from '@/lib/event-service';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Loader2, Calendar, X } from 'lucide-react';

type EventRegistrationButtonProps = {
  eventId: string;
};

export default function EventRegistrationButton({ eventId }: EventRegistrationButtonProps) {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    if (!session) {
      // Redirect to sign in if not authenticated
      signIn(undefined, { callbackUrl: `/events/${eventId}` });
      return;
    }

    setIsLoading(true);

    try {
      const response = await registerForEvent(eventId);
      
      // Check if payment is required
      if (response.requiresPayment && response.checkoutUrl) {
        // Redirect to Stripe checkout
        window.location.href = response.checkoutUrl;
        return;
      }
      
      // For free events
      setIsRegistered(true);
      toast.success("You've successfully registered for this event!");
      router.refresh(); // Refresh the page to update attendance count
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to register for event");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelRegistration = async () => {
    if (!session) return;

    setIsLoading(true);

    try {
      await cancelRegistration(eventId);
      setIsRegistered(false);
      toast.success("Your registration has been cancelled");
      router.refresh(); // Refresh the page to update attendance count
    } catch (error) {
      console.error("Cancellation error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to cancel registration");
    } finally {
      setIsLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <Button disabled className="w-full md:w-auto">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Loading...
      </Button>
    );
  }

  return isRegistered ? (
    <Button 
      variant="outline" 
      onClick={handleCancelRegistration}
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
  ) : (
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
      Register Now
    </Button>
  );
}
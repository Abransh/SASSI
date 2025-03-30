"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface MarkContactRespondedButtonProps {
  submissionId: string;
}

export default function MarkContactRespondedButton({ submissionId }: MarkContactRespondedButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleMarkResponded = async () => {
    setIsLoading(true);
    
    try {
      const response = await fetch(`/api/admin/contact/${submissionId}/mark-responded`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to mark as responded');
      }
      
      toast.success('Contact marked as responded');
      router.refresh();
    } catch (error) {
      console.error('Error marking as responded:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to mark as responded');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      variant="outline" 
      size="sm"
      onClick={handleMarkResponded}
      disabled={isLoading}
      className="text-green-600 border-green-200 hover:bg-green-50"
    >
      {isLoading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Check className="mr-2 h-4 w-4" />
      )}
      Mark as Responded
    </Button>
  );
}
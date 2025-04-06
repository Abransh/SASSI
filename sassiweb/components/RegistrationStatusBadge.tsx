import { useState, useEffect } from 'react';
import { Check, Clock, AlertCircle, Loader2 } from 'lucide-react';

type RegistrationStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED';
type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED' | 'UNPAID';

interface RegistrationStatusBadgeProps {
  status: RegistrationStatus;
  paymentStatus: PaymentStatus;
  expiresAt?: string | null;
}

export default function RegistrationStatusBadge({ 
  status, 
  paymentStatus, 
  expiresAt 
}: RegistrationStatusBadgeProps) {
  const [timeLeft, setTimeLeft] = useState<string | null>(null);
  const [isExpired, setIsExpired] = useState(false);
  
  useEffect(() => {
    // Calculate time remaining for pending registrations
    if (status === 'PENDING' && expiresAt) {
      const updateTimeLeft = () => {
        const now = new Date();
        const expiry = new Date(expiresAt);
        
        // Check if already expired
        if (now > expiry) {
          setIsExpired(true);
          setTimeLeft(null);
          return;
        }
        
        // Calculate remaining time
        const diffMs = expiry.getTime() - now.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffSecs = Math.floor((diffMs % 60000) / 1000);
        
        setTimeLeft(`${diffMins}:${diffSecs.toString().padStart(2, '0')}`);
      };
      
      // Update immediately and then every second
      updateTimeLeft();
      const interval = setInterval(updateTimeLeft, 1000);
      
      return () => clearInterval(interval);
    }
  }, [status, expiresAt]);
  
  // If expired but status still shows pending, display as expired
  if (isExpired && status === 'PENDING') {
    return (
      <div className="flex items-center space-x-1">
        <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800 flex items-center">
          <AlertCircle size={12} className="mr-1" />
          Registration Expired
        </span>
        <span className="text-xs text-gray-600">
          (Payment not completed in time)
        </span>
      </div>
    );
  }
  
  // For confirmed registrations
  if (status === 'CONFIRMED') {
    return (
      <div className="flex items-center space-x-1">
        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 flex items-center">
          <Check size={12} className="mr-1" />
          Confirmed
        </span>
      </div>
    );
  }
  
  // For cancelled registrations
  if (status === 'CANCELLED') {
    return (
      <div className="flex items-center space-x-1">
        <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800 flex items-center">
          <AlertCircle size={12} className="mr-1" />
          Cancelled
        </span>
      </div>
    );
  }
  
  // For pending registrations
  if (status === 'PENDING') {
    return (
      <div className="flex items-center space-x-1">
        <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800 flex items-center">
          <Clock size={12} className="mr-1" />
          Pending
        </span>
        {timeLeft && (
          <span className="text-xs text-gray-600">
            ({timeLeft} remaining)
          </span>
        )}
        {!timeLeft && !isExpired && paymentStatus === 'PENDING' && (
          <span className="text-xs text-gray-600 flex items-center">
            <Loader2 size={10} className="mr-1 animate-spin" />
            Payment processing
          </span>
        )}
      </div>
    );
  }
  
  // Fallback
  return null;
} 
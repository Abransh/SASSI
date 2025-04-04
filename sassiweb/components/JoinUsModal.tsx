"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { X, UserPlus, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface JoinUsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function JoinUsModal({ isOpen, onClose }: JoinUsModalProps) {
  const router = useRouter();
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile when component mounts and on window resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const handleMemberClick = () => {
    router.push("/auth/signup");
    onClose();
  };

  const handleTeamClick = () => {
    router.push("/join/team");
    onClose();
  };

  if (!isOpen) return null;

  // Calculate styles based on mobile/desktop
  const modalStyle = {
    position: 'fixed',
    top: isMobile ? '20%' : '50%',
    left: '50%',
    transform: isMobile ? 'translate(-50%, 0)' : 'translate(-50%, -50%)',
    maxWidth: '90%',
    width: '768px',
    zIndex: 100
  } as React.CSSProperties;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50"
            onClick={onClose}
          />
          
          {/* Modal */}
          <div style={modalStyle}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", bounce: 0.3 }}
              className="bg-white rounded-xl shadow-2xl w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
                aria-label="Close"
              >
                <X size={24} />
              </button>
              
              <div className="p-6 md:p-8 text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">Join SASSI</h2>
                <p className="text-gray-600 max-w-xl mx-auto mb-6 md:mb-8 text-sm md:text-base">
                  Choose how you&apos;d like to be part of our community. Join as a member to access resources and events, or apply to join our team to help make a difference.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-3xl mx-auto">
                  {/* Join as Member Option */}
                  <motion.div
                    className={`relative rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                      hoveredOption === "member" ? "border-orange-500 shadow-lg" : "border-gray-200"
                    }`}
                    onMouseEnter={() => setHoveredOption("member")}
                    onMouseLeave={() => setHoveredOption(null)}
                    onClick={handleMemberClick}
                    whileHover={{ y: -5 }}
                  >
                    <div className="p-4 md:p-6 flex flex-col items-center">
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-orange-100 rounded-full flex items-center justify-center mb-3 md:mb-4">
                        <UserPlus size={24} className="text-orange-600" />
                      </div>
                      <h3 className="text-lg md:text-xl font-bold mb-2">Join as Member</h3>
                      <p className="text-gray-600 text-xs md:text-sm text-center">
                        Register as an official member to access exclusive resources, receive support, and 
                        participate in all our events.
                      </p>
                      <div className={`mt-3 md:mt-4 py-2 px-3 md:px-4 rounded-md text-white transition-colors text-sm ${
                        hoveredOption === "member" ? "bg-orange-600" : "bg-gray-500"
                      }`}>
                        Become a Member
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Join the Team Option */}
                  <motion.div
                    className={`relative rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                      hoveredOption === "team" ? "border-blue-500 shadow-lg" : "border-gray-200"
                    }`}
                    onMouseEnter={() => setHoveredOption("team")}
                    onMouseLeave={() => setHoveredOption(null)}
                    onClick={handleTeamClick}
                    whileHover={{ y: -5 }}
                  >
                    <div className="p-4 md:p-6 flex flex-col items-center">
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-100 rounded-full flex items-center justify-center mb-3 md:mb-4">
                        <Users size={24} className="text-blue-600" />
                      </div>
                      <h3 className="text-lg md:text-xl font-bold mb-2">Join the Team</h3>
                      <p className="text-gray-600 text-xs md:text-sm text-center">
                        Become an active part of our organizing team, help shape our initiatives,
                        and make a difference in the community.
                      </p>
                      <div className={`mt-3 md:mt-4 py-2 px-3 md:px-4 rounded-md text-white transition-colors text-sm ${
                        hoveredOption === "team" ? "bg-blue-600" : "bg-gray-500"
                      }`}>
                        Apply to Join Team
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
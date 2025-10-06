"use client";

import { useState } from "react";
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

  const handleMemberClick = () => {
    router.push("/auth/signup");
    onClose();
  };

  const handleTeamClick = () => {
    router.push("/join/exclusive-member");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            {/* Modal */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", bounce: 0.3 }}
              className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors z-10 bg-white/80 backdrop-blur-sm"
                aria-label="Close"
              >
                <X size={20} className="text-gray-700" />
              </button>

              <div className="p-6 sm:p-8 lg:p-10 text-center">
                <div className="mb-6">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                    Join SASSI
                  </h2>
                  <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base lg:text-lg leading-relaxed">
                    Choose how you&apos;d like to be part of our community. Join as a member to access resources and events, or apply to join our team to help make a difference.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
                  {/* Join as Member Option */}
                  <motion.div
                    className={`group relative rounded-2xl overflow-hidden border-2 transition-all duration-300 cursor-pointer ${
                      hoveredOption === "member"
                        ? "border-orange-500 shadow-xl scale-105"
                        : "border-gray-200 hover:border-orange-300 hover:shadow-lg"
                    }`}
                    onMouseEnter={() => setHoveredOption("member")}
                    onMouseLeave={() => setHoveredOption(null)}
                    onClick={handleMemberClick}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="p-6 sm:p-8 flex flex-col items-center text-center">
                      <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-4 transition-all duration-300 ${
                        hoveredOption === "member" ? "bg-orange-500 scale-110" : "bg-orange-100"
                      }`}>
                        <UserPlus
                          size={28}
                          className={`transition-colors duration-300 ${
                            hoveredOption === "member" ? "text-white" : "text-orange-600"
                          }`}
                        />
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold mb-3 text-gray-900">
                        Join as Member
                      </h3>
                      <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                        Register as an official member to access exclusive resources, receive support, and
                        participate in all our events.
                      </p>
                      <div className={`py-3 px-6 rounded-lg text-white transition-all duration-300 text-sm sm:text-base font-medium ${
                        hoveredOption === "member"
                          ? "bg-orange-600 shadow-lg transform scale-105"
                          : "bg-gray-500 group-hover:bg-orange-500"
                      }`}>
                        Become a Member
                      </div>
                    </div>
                  </motion.div>

                  {/* Join the Team Option */}
                  <motion.div
                    className={`group relative rounded-2xl overflow-hidden border-2 transition-all duration-300 cursor-pointer ${
                      hoveredOption === "team"
                        ? "border-blue-500 shadow-xl scale-105"
                        : "border-gray-200 hover:border-blue-300 hover:shadow-lg"
                    }`}
                    onMouseEnter={() => setHoveredOption("team")}
                    onMouseLeave={() => setHoveredOption(null)}
                    onClick={handleTeamClick}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="p-6 sm:p-8 flex flex-col items-center text-center">
                      <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-4 transition-all duration-300 ${
                        hoveredOption === "team" ? "bg-blue-500 scale-110" : "bg-blue-100"
                      }`}>
                        <Users
                          size={28}
                          className={`transition-colors duration-300 ${
                            hoveredOption === "team" ? "text-white" : "text-blue-600"
                          }`}
                        />
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold mb-3 text-gray-900">
                        Join the Team
                      </h3>
                      <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                        Become an active part of our organizing team, help shape our initiatives,
                        and make a difference in the community.
                      </p>
                      <div className={`py-3 px-6 rounded-lg text-white transition-all duration-300 text-sm sm:text-base font-medium ${
                        hoveredOption === "team"
                          ? "bg-blue-600 shadow-lg transform scale-105"
                          : "bg-gray-500 group-hover:bg-blue-500"
                      }`}>
                        Apply to Join Team
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
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
              className="bg-white rounded-xl shadow-2xl w-full max-w-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
                aria-label="Close"
              >
                <X size={20} className="text-gray-700" />
              </button>

              <div className="p-6 sm:p-8 text-center">
                <div className="mb-6">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                    Join SASSI
                  </h2>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Choose how you&apos;d like to be part of our community.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {/* Join as Member Option */}
                  <motion.div
                    className={`group relative rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                      hoveredOption === "member"
                        ? "border-orange-500 shadow-lg"
                        : "border-gray-200 hover:border-orange-300"
                    }`}
                    onMouseEnter={() => setHoveredOption("member")}
                    onMouseLeave={() => setHoveredOption(null)}
                    onClick={handleMemberClick}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="p-4 sm:p-6 flex flex-col items-center text-center">
                      <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center mb-3 transition-all duration-300 ${
                        hoveredOption === "member" ? "bg-orange-500" : "bg-orange-100"
                      }`}>
                        <UserPlus
                          size={20}
                          className={`transition-colors duration-300 ${
                            hoveredOption === "member" ? "text-white" : "text-orange-600"
                          }`}
                        />
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-900">
                        Join as Member
                      </h3>
                      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-4">
                        Access exclusive resources, receive support, and participate in events.
                      </p>
                      <div className={`py-2 px-4 rounded-lg text-white transition-all duration-300 text-sm font-medium ${
                        hoveredOption === "member"
                          ? "bg-orange-600"
                          : "bg-gray-500 group-hover:bg-orange-500"
                      }`}>
                        Become a Member
                      </div>
                    </div>
                  </motion.div>

                  {/* Join the Team Option */}
                  <motion.div
                    className={`group relative rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                      hoveredOption === "team"
                        ? "border-blue-500 shadow-lg"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                    onMouseEnter={() => setHoveredOption("team")}
                    onMouseLeave={() => setHoveredOption(null)}
                    onClick={handleTeamClick}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="p-4 sm:p-6 flex flex-col items-center text-center">
                      <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center mb-3 transition-all duration-300 ${
                        hoveredOption === "team" ? "bg-blue-500" : "bg-blue-100"
                      }`}>
                        <Users
                          size={20}
                          className={`transition-colors duration-300 ${
                            hoveredOption === "team" ? "text-white" : "text-blue-600"
                          }`}
                        />
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-900">
                        Join the Team
                      </h3>
                      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-4">
                        Help shape our initiatives and make a difference in the community.
                      </p>
                      <div className={`py-2 px-4 rounded-lg text-white transition-all duration-300 text-sm font-medium ${
                        hoveredOption === "team"
                          ? "bg-blue-600"
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
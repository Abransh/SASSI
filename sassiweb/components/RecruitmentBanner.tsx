"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Users, ArrowRight, Sparkles, X } from "lucide-react";
import { useState } from "react";

export default function RecruitmentBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative bg-gradient-to-r from-orange-600 via-orange-500 to-yellow-500 text-white overflow-hidden"
    >
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>

      <div className="container mx-auto px-4 py-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1">
            <motion.div
              animate={{ rotate: [0, 10, -10, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2, repeatDelay: 3 }}
              className="hidden sm:block"
            >
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-yellow-200" />
              </div>
            </motion.div>

            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                <motion.span
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold uppercase tracking-wide"
                >
                  Now Open
                </motion.span>
                <span className="text-sm font-medium">Limited Spots Available</span>
              </div>

              <h3 className="text-xl md:text-2xl font-bold mb-1 flex items-center justify-center md:justify-start gap-2">
                <Users className="h-6 w-6" />
                SASSI Recruitment 2025
              </h3>

              <p className="text-white/90 text-sm md:text-base">
                Join our team and help build the Indian student community in Milan
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/join/recruit">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-white text-orange-600 rounded-lg font-bold shadow-lg hover:shadow-xl transition-all flex items-center gap-2 group"
              >
                <span>Apply Now</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </motion.div>
              </motion.button>
            </Link>

            <button
              onClick={() => setIsVisible(false)}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
              aria-label="Close banner"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-orange-300 to-yellow-400"></div>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 20, ease: "linear" }}
        className="absolute bottom-0 left-0 h-1 bg-yellow-300 origin-left"
        style={{ width: "100%" }}
      />
    </motion.div>
  );
}

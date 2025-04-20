"use client"; 

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown, Instagram } from "lucide-react";
import JoinButton from "./JoinButton";

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  
  // Track scroll position for parallax effect
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    setIsLoaded(true);
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animation variants
  const textContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.3,
      },
    },
  };

  const textItem = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    },
  };

  const parallaxStyle = {
    transform: `translateY(${scrollY * 0.4}px)`
  };

  return (
    <section 
      id="home" 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background with parallax effect */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          style={parallaxStyle}
          className="h-full w-full"
        >
          <Image
            src="/assests/banner.png"
            alt="Hero Banner"
            fill
            priority
            className="object-cover"
          />
        </motion.div>
      </div>

      {/* Content container */}
      <div className="container mx-auto px-6 relative z-10 py-16">
        <motion.div 
          variants={textContainer}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Main headline with letter animation */}
          <motion.div variants={textItem} className="overflow-hidden mb-4">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-black leading-tight">
              Students' Association of{" "}
              <motion.span 
                className="text-orange-600 relative inline-block"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                Indians
                <motion.span 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="absolute -bottom-2 left-0 right-0 h-1.5 bg-yellow-400"
                ></motion.span>
              </motion.span>
            </h1>
          </motion.div>
          
          {/* Subheadline */}
          <motion.div variants={textItem} className="overflow-hidden mb-6">
            <p className="text-xl md:text-2xl font-medium text-black">
              A community by the students, for the students.
            </p>
          </motion.div>
          
          {/* Description */}
          <motion.div variants={textItem} className="overflow-hidden mb-8">
            <p className="max-w-2xl mx-auto text-lg text-gray-800">
              Bringing Indian students in Italy together, celebrating our culture, supporting each other, and making every step of this journey feel like home.
            </p>
          </motion.div>
          
          {/* Animated decorative line */}
          <motion.div variants={textItem} className="relative h-8 max-w-sm mx-auto mb-8 flex items-center justify-center">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="h-0.5 bg-gray-200 absolute"
            />
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.2, duration: 0.4, type: "spring" }}
              className="w-3 h-3 bg-orange-500 rounded-full absolute left-0 z-10"
            />
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.4, duration: 0.4, type: "spring" }}
              className="w-3 h-3 bg-yellow-400 rounded-full absolute right-0 z-10"
            />
          </motion.div>
          
          {/* CTA buttons */}
          <motion.div variants={textItem} className="flex flex-wrap justify-center gap-4 mt-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <JoinButton className="text-base py-3 px-8 shadow-lg shadow-yellow-300/20" />
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Link
                href="https://instagram.com/sassi.milan/"
                target="_blank"
                className="inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm text-black border-2 border-black rounded-md font-medium transition-all hover:bg-black hover:text-yellow-400 gap-2 shadow-lg shadow-black/5"
              >
                <Instagram size={18} />
                <span>Follow Us</span>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Floating animated elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 0.6, x: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute top-1/4 -left-10 w-24 h-24 bg-orange-400 rounded-full blur-2xl opacity-20"
        />
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 0.6, x: 0 }}
          transition={{ delay: 1.3, duration: 1 }}
          className="absolute top-1/3 right-10 w-32 h-32 bg-yellow-300 rounded-full blur-2xl opacity-20"
        />
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 0.5, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-orange-300 rounded-full blur-2xl opacity-10"
        />
      </div>
      
      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
      >
        <motion.span 
          className="text-sm text-gray-600 mb-2"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          Scroll to explore
        </motion.span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ArrowDown size={20} className="text-gray-600" />
        </motion.div>
      </motion.div>
    </section>
  );
}

// import React, { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import Image from 'next/image';
// import Link from 'next/link';
// import JoinButton from './JoinButton';
// import { Instagram } from 'lucide-react';

// export default function EnhancedHeroSection() {
//   const [isLoaded, setIsLoaded] = useState(false);
  
//   useEffect(() => {
//     setIsLoaded(true);
//   }, []);
  
//   return (
//     <section className="relative min-h-screen flex items-center justify-center overflow-hidden" id="home">
//       {/* Background with overlay gradient */}
//       <div className="absolute inset-0 z-0">
//         <Image
//           src="/assests/banner.png"
//           alt="SASSI Community"
//           layout="fill"
//           objectFit="cover"
//           className="brightness-75"
//           priority
//         />
//         <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 z-10"></div>
//       </div>
      
//       <div className="container mx-auto px-6 relative z-20 pt-16">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={isLoaded ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.8, delay: 0.2 }}
//           className="text-center max-w-5xl mx-auto"
//         >
//           <motion.div
//             initial={{ scale: 0.9, opacity: 0 }}
//             animate={isLoaded ? { scale: 1, opacity: 1 } : {}}
//             transition={{ duration: 0.5, delay: 0.3 }}
//             className="inline-block mb-6"
//           >
//             <Image
//               src="/assests/SASSI.png"
//               alt="SASSI Logo"
//               width={220}
//               height={100}
//               className="mx-auto"
//             />
//           </motion.div>
          
//           <motion.h1 
//             initial={{ opacity: 0, y: 30 }}
//             animate={isLoaded ? { opacity: 1, y: 0 } : {}}
//             transition={{ duration: 0.7, delay: 0.5 }}
//             className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
//           >
//             Students' Association of <span className="text-orange-500">Indians</span> in Milan
//           </motion.h1>
          
//           <motion.p 
//             initial={{ opacity: 0 }}
//             animate={isLoaded ? { opacity: 1 } : {}}
//             transition={{ duration: 0.7, delay: 0.7 }}
//             className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto"
//           >
//             A community by the students, for the students — making your journey in Milan feel like home.
//           </motion.p>
          
//           <motion.div 
//             initial={{ opacity: 0, y: 20 }}
//             animate={isLoaded ? { opacity: 1, y: 0 } : {}}
//             transition={{ duration: 0.6, delay: 0.9 }}
//             className="flex flex-wrap justify-center gap-4 mt-8"
//           >
//             <JoinButton className="px-8 py-4 text-lg font-semibold" />
            
//             <Link
//               href="https://www.instagram.com/sassi.milan/"
//               target="_blank"
//               className="flex items-center px-8 py-4 bg-white text-black hover:bg-gray-100 border-2 border-white hover:border-orange-400 rounded-md font-semibold transition-all"
//             >
//               <Instagram size={20} className="mr-2" />
//               Follow Us
//             </Link>
//           </motion.div>
          
//           {/* Scroll down indicator */}
//           <motion.div 
//             initial={{ opacity: 0 }}
//             animate={isLoaded ? { opacity: 0.8 } : {}}
//             transition={{ duration: 0.6, delay: 1.2 }}
//             className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
//           >
//             <div className="flex flex-col items-center">
//               <span className="text-white text-sm mb-2">Scroll to explore</span>
//               <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center p-1">
//                 <motion.div 
//                   animate={{ y: [0, 12, 0] }}
//                   transition={{ repeat: Infinity, duration: 1.5 }}
//                   className="w-1.5 h-1.5 bg-white rounded-full"
//                 />
//               </div>
//             </div>
//           </motion.div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }
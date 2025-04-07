"use client"; 
import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import JoinButton from "../components/JoinButton"

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (section) {
      section.style.opacity = "0"
      section.style.transform = "translateY(-50px)"

      setTimeout(() => {
        section.style.transition = "opacity 1s ease, transform 1s ease"
        section.style.opacity = "1"
        section.style.transform = "translateY(0)"
      }, 100)
    }

    const handleScroll = () => {
      if(backgroundRef.current)
      {
        const scrollPosition = window.scrollY
        backgroundRef.current.style.transform = `translateY(${scrollPosition * 0.4}px)`
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center py-20 px-4" ref={sectionRef}>
      {/* Background image - will be added later */}
      <div className="absolute inset-0 bg-gray-900/50 z-0">
        {/* Replace with actual background image later */}
        <div className="absolute inset-0 bg-white "></div>
        <Image
          src="/assests/banner.png"
          alt="Hero Banner"
          width={1920}
          height={1080}
          priority
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container mx-auto text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold text-black mb-4">Students&apos; Association of Indians</h1>
        <p className="text-xl md:text-2xl text-black/90 mb-6">A community by the students, for the students.</p>
        <p className="max-w-3xl mx-auto text-lg text-black/80">
          Bringing Indian students in Italy together, celebrating our culture, supporting each other, and making every
          step of this journey feel like home
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <Link
            href="https://instagram.com"
            target="_blank"
            className="px-6 py-3 bg-white text-black border-2 border-black rounded-md font-medium transition-all hover:text-yellow-400 hover:border-yellow-400"
          >
            Our Instagram
          </Link>
          <JoinButton />
        </div>
      </div>
    </section>
  )
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
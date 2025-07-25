"use client";


// // BirthdayInvitation.tsx
// // To make this work:
// // 1. Ensure you have a React/Next.js project.
// // 2. Install and configure Tailwind CSS.
// // 3. For the font, add this to your main CSS file: @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
// //    Then, add 'Inter' to your tailwind.config.js file.

// import React, { useState } from 'react';

// // A simple icon component for the itinerary
// const ItineraryIcon = ({ children }: { children: React.ReactNode }) => (
//   <div className="flex-shrink-0 w-8 h-8 rounded-full bg-neutral-800 inline-flex items-center justify-center text-neutral-400 mr-4">
//     {children}
//   </div>
// );

// export default function BirthdayInvitation() {
//   const [showSurprise, setShowSurprise] = useState(false);

//   return (
//     <div className="bg-black text-neutral-200 font-sans min-h-screen flex flex-col items-center justify-center p-4 selection:bg-fuchsia-500 selection:text-white">
//       <div className="w-full max-w-md mx-auto bg-neutral-900/50 border border-neutral-800 rounded-2xl p-8 space-y-10 shadow-2xl shadow-fuchsia-900/20">

//         {/* --- Header --- */}
//         <header className="text-center">
//           <h1 className="text-5xl md:text-6xl font-black tracking-tighter bg-gradient-to-r from-neutral-200 to-neutral-500 text-transparent bg-clip-text">
//             Chapter [Your Age]
//           </h1>
//           <p className="mt-2 text-lg text-neutral-400">An evening of questionable decisions.</p>
//         </header>

//         {/* --- Itinerary --- */}
//         <section>
//           <h2 className="text-sm uppercase font-bold tracking-widest text-fuchsia-400 mb-4">The Plan</h2>
//           <div className="space-y-4">
//             <div className="flex items-center">
//               <ItineraryIcon>📍</ItineraryIcon>
//               <div>
//                 <p className="font-bold text-white">6:00 PM: Golden Hour</p>
//                 <p className="text-neutral-400 text-sm">Aperitivo vibes at Arco della Pace.</p>
//               </div>
//             </div>
//             <div className="flex items-center">
//               <ItineraryIcon>🍶</ItineraryIcon>
//               <div>
//                 <p className="font-bold text-white">Next: Soju Stop</p>
//                 <p className="text-neutral-400 text-sm">A quick mission in Chinatown.</p>
//               </div>
//             </div>
//             <div className="flex items-center">
//               <ItineraryIcon>🍔</ItineraryIcon>
//               <div>
//                 <p className="font-bold text-white">Later: The Main Event</p>
//                 <p className="text-neutral-400 text-sm">Dinner & good times at McGollfa.</p>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* --- Why You Should Come --- */}
//         <section>
//           <h2 className="text-sm uppercase font-bold tracking-widest text-fuchsia-400 mb-4">Why Come?</h2>
//           <ul className="list-none space-y-2 text-neutral-300">
//             <li>› Because my jokes are objectively funny.</li>
//             <li>› You'll get to see me age in real-time. A true spectacle.</li>
//             <li>› Peer pressure, but in a fun, celebratory way.</li>
//             <li>› Because I am, in fact, pretty cool.</li>
//           </ul>
//         </section>

//         {/* --- The Surprise --- */}
//         <section className="text-center pt-4">
//           <button
//             onClick={() => setShowSurprise(!showSurprise)}
//             className="font-bold text-sm bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-full px-5 py-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:ring-offset-2 focus:ring-offset-black"
//           >
//             {showSurprise ? 'Okay, you got me' : 'A quick secret...'}
//           </button>

//           {showSurprise && (
//             <div className="mt-4 text-center transition-opacity duration-700 ease-in-out">
//               <p className="text-neutral-400">
//                 Alright, the real reason is that it would genuinely mean a lot to have you there.
//                 <br />
//                 Thanks for being a part of my life.
//               </p>
//             </div>
//           )}
//         </section>

//       </div>
//        <footer className="text-center mt-8 text-xs text-neutral-600">
//             <p>RSVP not required, just show up.</p>
//       </footer>
//     </div>
//   );
// }

// BirthdayInvitation.tsx
// To make this work:
// 1. Run: npm install framer-motion
// 2. Add the recommended font to your project's main CSS file.

import React, { useState } from 'react';
import { motion } from 'framer-motion';

// A simple icon component for the itinerary
const ItineraryIcon = ({ children }: { children: React.ReactNode }) => (
  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-neutral-800 inline-flex items-center justify-center text-neutral-400 mr-4">
    {children}
  </div>
);

export default function BirthdayInvitation() {
  const [showSurprise, setShowSurprise] = useState(false);

  // Animation variant for a staggered fade-in effect
  const sectionVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2, // This creates the stagger effect
        duration: 0.5,
      },
    }),
  };

  return (
    <div className="bg-black text-neutral-200 font-sans min-h-screen flex flex-col items-center justify-center p-4 selection:bg-fuchsia-500 selection:text-white">
      <div className="w-full max-w-md mx-auto bg-neutral-900/50 border border-neutral-800 rounded-2xl p-8 space-y-10 shadow-2xl shadow-fuchsia-900/20">

        {/* --- Header --- */}
        <motion.header
          className="text-center"
          custom={0}
          initial="hidden"
          animate="visible"
          variants={sectionVariant}
        >
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter bg-gradient-to-r from-neutral-200 to-neutral-500 text-transparent bg-clip-text">
            Chapter [Your Age]
          </h1>
          <p className="mt-2 text-lg text-neutral-400">An evening of questionable decisions.</p>
        </motion.header>

        {/* --- Itinerary --- */}
        <motion.section
          custom={1}
          initial="hidden"
          animate="visible"
          variants={sectionVariant}
        >
          <h2 className="text-sm uppercase font-bold tracking-widest text-fuchsia-400 mb-4">The Plan</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <ItineraryIcon>📍</ItineraryIcon>
              <div>
                <p className="font-bold text-white">6:00 PM: Golden Hour</p>
                <a href="https://www.google.com/maps/search/?api=1&query=Arco+della+Pace+Milan" target="_blank" rel="noopener noreferrer" className="text-neutral-400 text-sm hover:text-fuchsia-400 transition-colors">
                  Arco della Pace
                </a>
              </div>
            </div>
            <div className="flex items-center">
              <ItineraryIcon>🍶</ItineraryIcon>
              <div>
                <p className="font-bold text-white">Next: Soju Stop</p>
                <a href="https://www.google.com/maps/search/?api=1&query=Chinatown+Milan" target="_blank" rel="noopener noreferrer" className="text-neutral-400 text-sm hover:text-fuchsia-400 transition-colors">
                  Chinatown Mission
                </a>
              </div>
            </div>
            <div className="flex items-center">
              <ItineraryIcon>🍔</ItineraryIcon>
              <div>
                <p className="font-bold text-white">Later: The Main Event</p>
                <a href="https://www.google.com/maps/search/?api=1&query=McGollfa+Milan" target="_blank" rel="noopener noreferrer" className="text-neutral-400 text-sm hover:text-fuchsia-400 transition-colors">
                  Dinner at McGollfa
                </a>
              </div>
            </div>
          </div>
        </motion.section>

        {/* --- Why You Should Come --- */}
        <motion.section
          custom={2}
          initial="hidden"
          animate="visible"
          variants={sectionVariant}
        >
          <h2 className="text-sm uppercase font-bold tracking-widest text-fuchsia-400 mb-4">Why Come?</h2>
          <ul className="list-none space-y-2 text-neutral-300">
            <li>› Because my jokes are objectively funny.</li>
            <li>› You'll get to see me age in real-time. A true spectacle.</li>
            <li>› Peer pressure, but in a fun, celebratory way.</li>
            <li>› Because I am, in fact, pretty cool.</li>
          </ul>
        </motion.section>

        {/* --- The Surprise --- */}
        <motion.section
          className="text-center pt-4"
          custom={3}
          initial="hidden"
          animate="visible"
          variants={sectionVariant}
        >
          <button
            onClick={() => setShowSurprise(!showSurprise)}
            className="font-bold text-sm bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-full px-5 py-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:ring-offset-2 focus:ring-offset-black"
          >
            {showSurprise ? 'Okay, you got me' : 'A quick secret...'}
          </button>

          {showSurprise && (
            <div className="mt-4 text-center transition-opacity duration-700 ease-in-out">
              <p className="text-neutral-400">
                Alright, the real reason is that it would genuinely mean a lot to have you there.
                <br />
                Thanks for being a part of my life.
              </p>
            </div>
          )}
        </motion.section>

      </div>
       <footer className="text-center mt-8 text-xs text-neutral-600">
            <p>RSVP not required, just show up.</p>
      </footer>
    </div>
  );
}


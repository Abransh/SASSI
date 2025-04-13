"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Github, Mail, ArrowRight, Code, Database, Server, Crown, Sparkles, Moon, Sun, Zap, Music, Instagram } from 'lucide-react';
import Link from 'next/link';
import confetti from 'canvas-confetti';

export default function FinallyYouHere() {
const [displayedText, setDisplayedText] = useState("");
const [currentTextIndex, setCurrentTextIndex] = useState(0);
const [isTypingComplete, setIsTypingComplete] = useState(false);
const [showStacks, setShowStacks] = useState(false);
const [activeTheme, setActiveTheme] = useState<'light' | 'dark' | 'neon'>('light');
const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
const [showEasterEgg, setShowEasterEgg] = useState(false);
const [clickCount, setClickCount] = useState(0);
const [terminalClickCount, setTerminalClickCount] = useState(0);
const typingSpeed = 30; // milliseconds per character

const textToType = [
"Glad you are here! 🎉",
"This is the coolest page of this website.",
"Hi, I am Abransh, and I hope you like the website.",
"Even if you don't... I don't care. ",
"Here is the GitHub if you'd like to clone.",
"No but seriously...",
"If you have any suggestions, DM me anywhere or mail at tech@sassimilan.com.",
"If you think you can do better, think again. 🤔",
"Well, that's enough for today.",
"I hope this website is useful for you.",
"If you have a good idea about a new feature, do let me know!"
];

// Tech stacks
const frontendStack = [
"React",
"Next.js 15",
"Tailwind CSS",
"TypeScript",
"Lucide Icons",
];

const backendStack = [
"Next.js API Routes",
"Prisma ORM",
"PostgreSQL Database",
"NextAuth.js for Authentication",
];

const servicesStack = [
"Stripe for Payments",
"Resend for Email Notifications",
"Cloudinary for Image Storage",
"Vercel for Deployment",
];

const containerRef = useRef<HTMLDivElement>(null);
const terminalRef = useRef<HTMLDivElement>(null);

// Typewriter effect
useEffect(() => {
if (currentTextIndex >= textToType.length) {
setIsTypingComplete(true);
setTimeout(() => {
setShowStacks(true);
triggerConfetti();
}, 500);
return;
}

const currentText = textToType[currentTextIndex];
let charIndex = 0;

const typingInterval = setInterval(() => {
if (charIndex <= currentText.length) {
setDisplayedText(currentText.substring(0, charIndex));
charIndex++;
} else {
clearInterval(typingInterval);
setTimeout(() => {
  setCurrentTextIndex(prev => prev + 1);
  setDisplayedText("");
}, 800); // Pause before moving to next text
}
}, typingSpeed);

return () => clearInterval(typingInterval);
}, [currentTextIndex]);

// Terminal auto-scroll effect
useEffect(() => {
if (terminalRef.current) {
terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
}
}, [displayedText, currentTextIndex]);

// Mouse tracking for cursor effect
useEffect(() => {
const handleMouseMove = (e: MouseEvent) => {
setMousePosition({ x: e.clientX, y: e.clientY });
};

window.addEventListener('mousemove', handleMouseMove);
return () => {
window.removeEventListener('mousemove', handleMouseMove);
};
}, []);

// Easter egg handler
const handleTitleClick = () => {
// Increment the counter first
const newCount = clickCount + 1;
setClickCount(newCount);

// Check after incrementing
if (newCount === 5) {
setShowEasterEgg(true);
triggerConfetti();
setTimeout(() => setShowEasterEgg(false), 5000);
setClickCount(0);
}
};

// Theme toggle function
const cycleTheme = () => {
if (activeTheme === 'light') setActiveTheme('dark');
else if (activeTheme === 'dark') setActiveTheme('neon');
else setActiveTheme('light');
};

// Confetti effect
const triggerConfetti = () => {
const duration = 2 * 1000;
const animationEnd = Date.now() + duration;
const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

const randomInRange = (min: number, max: number) => {
return Math.random() * (max - min) + min;
};

const interval = setInterval(() => {
const timeLeft = animationEnd - Date.now();

if (timeLeft <= 0) {
return clearInterval(interval);
}

const particleCount = 50 * (timeLeft / duration);

confetti({
...defaults,
particleCount,
origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
});
confetti({
...defaults,
particleCount,
origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
});
}, 250);
};

// Terminal command handler
const handleTerminalClick = () => {
if (isTypingComplete) {
// Increment the counter first
const newCount = terminalClickCount + 1;
setTerminalClickCount(newCount);

const commands = ["help", "about", "contact", "github", "skills", "projects", "clear"];
const randomCommand = commands[Math.floor(Math.random() * commands.length)];

const commandElement = document.createElement("div");
commandElement.innerHTML = `<span class="text-yellow-400">> ${randomCommand}</span>`;

const responseElement = document.createElement("div");
responseElement.innerHTML = `<span class="text-green-400">Executing ${randomCommand}...</span>`;

if (terminalRef.current) {
terminalRef.current.appendChild(commandElement);
terminalRef.current.appendChild(responseElement);
terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
}

// Check if we've reached 5 terminal clicks
if (newCount === 5) {
setShowEasterEgg(true);
triggerConfetti();
setTimeout(() => setShowEasterEgg(false), 5000);
setTerminalClickCount(0); // Reset after checking
}
}
};

// Tech stack component with enhanced interactions
const TechStack = ({ title, icon, items, color }: { title: string; icon: React.ReactNode; items: string[], color: string }) => (
<motion.div 
initial={{ opacity: 0, y: 20 }} 
animate={{ opacity: 1, y: 0 }} 
transition={{ duration: 0.5, delay: 0.2 }}
whileHover={{ 
scale: 1.03, 
boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
}}
className={`p-5 rounded-lg border ${color} shadow-md backdrop-blur-sm relative z-20`}
>
<motion.div 
className="flex items-center gap-2 mb-3 font-bold text-xl"
whileHover={{ scale: 1.05 }}
>
{icon}
<h3>{title}</h3>
</motion.div>
<ul className="space-y-2">
{items.map((item, index) => (
  <motion.li
    key={index}
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3, delay: 0.1 * index }}
    whileHover={{ 
      x: 5, 
      color: 
        title === "Frontend" ? "#3b82f6" : 
        title === "Backend" ? "#8b5cf6" : 
        "#10b981" 
    }}
    className="flex items-center gap-2 cursor-pointer"
  >
    <ArrowRight size={14} className={
      title === "Frontend" ? "text-blue-500" : 
      title === "Backend" ? "text-purple-500" : 
      "text-green-500"
    } />
    {item}
  </motion.li>
))}
</ul>
</motion.div>
);

// Dynamic theme classes
const themeClasses = {
light: {
background: "bg-gradient-to-br from-white to-gray-100",
text: "text-gray-800",
terminal: "bg-gray-900 text-green-400 border border-gray-700"
},
dark: {
background: "bg-gradient-to-br from-gray-900 to-gray-800",
text: "text-gray-200",
terminal: "bg-black text-green-400 border border-gray-600"
},
neon: {
background: "bg-black",
text: "text-white",
terminal: "bg-purple-900/80 text-pink-300 border border-pink-500"
}
};

return (
<div className={`min-h-screen ${themeClasses[activeTheme].background} transition-colors duration-500 py-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center relative overflow-x-hidden`}>
{/* Animated background elements */}
<div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
{activeTheme === 'neon' && (
  <>
    <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-purple-600/20 to-transparent"></div>
    <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-pink-600/20 to-transparent"></div>
    <motion.div 
      className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl"
      animate={{ 
        x: [0, 100, 0], 
        y: [0, 50, 0],
        opacity: [0.5, 0.3, 0.5] 
      }}
      transition={{ 
        repeat: Infinity, 
        duration: 15, 
        ease: "easeInOut" 
      }}
    />
    <motion.div 
      className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-pink-500/10 blur-3xl"
      animate={{ 
        x: [0, -80, 0], 
        y: [0, 40, 0],
        opacity: [0.5, 0.3, 0.5] 
      }}
      transition={{ 
        repeat: Infinity, 
        duration: 12, 
        ease: "easeInOut" 
      }}
    />
  </>
)}
</div>

  {/* Theme toggle button with hint text */}
<div className="absolute top-4 right-4 z-50">
<motion.button
  whileHover={{ rotate: 180, scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
  onClick={cycleTheme}
  className="p-2 rounded-full bg-opacity-90 shadow-md relative"
  style={{
    background: activeTheme === 'light' ? '#1e293b' : 
              activeTheme === 'dark' ? '#e5e7eb' : 
              'linear-gradient(135deg, #f0abfc, #818cf8)'
  }}
>
  {activeTheme === 'light' ? (
    <Moon size={20} className="text-white" />
  ) : activeTheme === 'dark' ? (
    <Sun size={20} className="text-gray-800" />
  ) : (
    <Sparkles size={20} className="text-white" />
  )}
</motion.button>
<motion.div 
  initial={{ opacity: 0, y: 5 }}
  animate={{ 
    opacity: [0, 1, 1, 0],
    y: [5, 0, 0, -5]
  }}
  transition={{ 
    repeat: Infinity,
    duration: 3,
    repeatDelay: 0.5
  }}
  className={`absolute -bottom-8 -right-4 px-2 py-1 rounded-md ${
    activeTheme === 'light' 
      ? 'bg-gray-100 text-gray-800 border border-gray-200' : 
    activeTheme === 'dark' 
      ? 'bg-gray-700 text-gray-200 border border-gray-600' : 
    'bg-purple-900/50 text-pink-300 border border-pink-500/30'
  } shadow-lg text-xs font-medium whitespace-nowrap`}
>
  Try clicking here!
  <motion.div
    className="absolute -top-2 -right-2 w-6 h-6"
    animate={{
      scale: [1, 1.5, 1],
    }}
    transition={{
      repeat: Infinity,
      duration: 1.5,
      repeatDelay: 1
    }}
  >
    ✨
  </motion.div>
</motion.div>
</div>

{/* Cursor effect */}
{activeTheme === 'neon' && (
<motion.div 
  className="fixed w-10 h-10 rounded-full pointer-events-none mix-blend-screen z-10 opacity-75"
  style={{
    background: 'radial-gradient(circle, rgba(236,72,153,0.8) 0%, rgba(236,72,153,0) 70%)',
    left: mousePosition.x - 20,
    top: mousePosition.y - 20,
  }}
  animate={{
    scale: [1, 1.2, 1],
  }}
  transition={{
    duration: 0.5,
    ease: "easeInOut",
  }}
/>
)}

{/* Easter egg */}
<AnimatePresence>
{showEasterEgg && (
  <motion.div
    initial={{ y: -100, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    exit={{ y: 100, opacity: 0 }}
    className="fixed top-20 inset-x-0 z-50 flex justify-center"
  >
    <div className="bg-gradient-to-r from-orange-400 to-pink-500 text-white px-6 py-3 rounded-full shadow-lg">
      <div className="flex items-center gap-2">
        <Crown className="text-yellow-300" />
        <span>You found the Easter egg! You're awesome! 🎮</span>
      </div>
    </div>
  </motion.div>
)}
</AnimatePresence>

{/* Main Content */}
<motion.div
initial={{ scale: 0 }}
animate={{ scale: 1, rotateZ: [0, 2, 0, -2, 0] }}
transition={{ duration: 0.8, rotateZ: { repeat: 5, duration: 0.2 } }}
className="mb-8 text-center cursor-pointer"
onClick={handleTitleClick}
whileHover={{ scale: 1.05 }}
>
<motion.div
  whileHover={{ 
    textShadow: activeTheme === 'neon' 
      ? "0 0 8px #ec4899, 0 0 12px #ec4899" 
      : "0 0 8px rgba(0, 0, 0, 0.3)"
  }}
>
  <h1 className={`text-5xl md:text-6xl font-extrabold ${
    activeTheme === 'neon' 
      ? "text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500" 
      : activeTheme === 'dark'
        ? "text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-400"
        : "text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-pink-600"
  } mb-4`}>
    Finally, You're Here!
  </h1>
</motion.div>
<p className={`${themeClasses[activeTheme].text} text-xl`}>
  The <span className="italic">secret</span> developer page
</p>
{clickCount > 0 && clickCount < 5 && (
  <motion.span 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="text-xs text-orange-500 block mt-1"
  >
    {5 - clickCount} more clicks for a surprise...
  </motion.span>
)}
</motion.div>

{/* Terminal-like container for typewriter text */}
<motion.div 
ref={terminalRef}
className={`w-full max-w-2xl h-72 overflow-y-auto mb-8 ${themeClasses[activeTheme].terminal} rounded-lg p-4 font-mono text-sm md:text-base shadow-xl relative z-20`}
style={{ scrollBehavior: 'smooth' }}
initial={{ y: 50, opacity: 0 }}
animate={{ y: 0, opacity: 1 }}
transition={{ delay: 0.3 }}
whileHover={{ 
  boxShadow: activeTheme === 'neon' 
    ? "0 0 15px rgba(236, 72, 153, 0.5)" 
    : "0 10px 25px -5px rgba(0, 0, 0, 0.2)"
}}
onClick={handleTerminalClick}
>
<div className="absolute top-0 left-0 right-0 bg-gray-800 px-4 py-1 flex items-center gap-2 bg-opacity-90">
  <div className="w-3 h-3 rounded-full bg-red-500"></div>
  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
  <div className="w-3 h-3 rounded-full bg-green-500"></div>
  <div className="text-xs text-gray-400 ml-2">abransh-terminal</div>
</div>

<div ref={containerRef} className="mt-6">
  {textToType.slice(0, currentTextIndex).map((text, index) => (
    <div key={index} className="mb-3">
      <span className={activeTheme === 'neon' ? "text-pink-400" : "text-blue-400"}>{'>'}</span> {text}
    </div>
  ))}
  {currentTextIndex < textToType.length && (
    <div className="flex items-start">
      <span className={activeTheme === 'neon' ? "text-pink-400" : "text-blue-400"}>{'>'}</span> 
      <span className="ml-1">{displayedText}</span>
      <span className="animate-pulse ml-0.5">|</span>
    </div>
  )}
  {isTypingComplete && (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className={activeTheme === 'neon' ? "text-pink-300 mt-4" : "text-yellow-400 mt-4"}
    >
      {"> "}<span className="animate-pulse">Process completed ✓</span>
      <p className="text-xs text-gray-500 mt-2">Click anywhere in the terminal to interact...</p>
      {terminalClickCount > 0 && terminalClickCount < 5 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs text-orange-500 mt-1"
        >
          {5 - terminalClickCount} more clicks for another surprise...
        </motion.div>
      )}
    </motion.div>
  )}
</div>
</motion.div>

{/* Tech Stack Section with enhanced animations */}
<AnimatePresence>
{showStacks && (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="w-full max-w-4xl mb-12"
  >
    <motion.h2 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`text-3xl font-bold text-center mb-8 ${themeClasses[activeTheme].text}`}
      whileHover={{ 
        scale: 1.05,
        textShadow: activeTheme === 'neon' 
          ? "0 0 8px rgba(236, 72, 153, 0.8)" 
          : "0 0 5px rgba(0, 0, 0, 0.2)" 
      }}
    >
      <Zap className="inline-block mr-2 text-yellow-500" size={28} />
      Built with These Technologies
    </motion.h2>
    
    <div className="grid md:grid-cols-3 gap-6 relative z-30 pointer-events-auto">
      <TechStack 
        title="Frontend" 
        icon={<Code size={24} className={activeTheme === 'neon' ? "text-blue-400" : "text-blue-500"} />} 
        items={frontendStack} 
        color={
          activeTheme === 'neon' 
            ? "border-blue-500/30 bg-blue-900/20" 
            : activeTheme === 'dark'
              ? "border-blue-800 bg-blue-900/40"
              : "border-blue-200 bg-blue-50"
        }
      />
      <TechStack 
        title="Backend" 
        icon={<Server size={24} className={activeTheme === 'neon' ? "text-purple-400" : "text-purple-500"} />} 
        items={backendStack} 
        color={
          activeTheme === 'neon' 
            ? "border-purple-500/30 bg-purple-900/20" 
            : activeTheme === 'dark'
              ? "border-purple-800 bg-purple-900/40"
              : "border-purple-200 bg-purple-50"
        }
      />
      <TechStack 
        title="Services" 
        icon={<Database size={24} className={activeTheme === 'neon' ? "text-green-400" : "text-green-500"} />} 
        items={servicesStack} 
        color={
          activeTheme === 'neon' 
            ? "border-green-500/30 bg-green-900/20" 
            : activeTheme === 'dark'
              ? "border-green-800 bg-green-900/40"
              : "border-green-200 bg-green-50"
        }
      />
    </div>
    
    {/* Social Media Buttons */}
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5 }}
      className="mt-12 flex flex-wrap justify-center items-center gap-4 pointer-events-auto"
    >
      <motion.button
        whileHover={{ scale: 1.1, y: -5 }}
        whileTap={{ scale: 0.95 }}
        onClick={triggerConfetti}
        className={`px-5 py-3 rounded-full flex items-center gap-2 shadow-lg ${
          activeTheme === 'neon'
            ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white" 
            : activeTheme === 'dark'
              ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white"
              : "bg-gradient-to-r from-orange-500 to-pink-500 text-white"
        }`}
      >
        <Sparkles size={18} />
        <span>Make it Rain!</span>
      </motion.button>
      
      <Link 
        href="https://www.instagram.com/_.abransh._/" 
        target="_blank"
      >
        <motion.button
          whileHover={{ scale: 1.1, rotate: 5, y: -5 }}
          whileTap={{ scale: 0.95 }}
          className={`px-5 py-3 rounded-full flex items-center gap-2 shadow-lg ${
            activeTheme === 'neon'
              ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white" 
              : activeTheme === 'dark'
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                : "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
          }`}
        >
          <Instagram size={18} />
          <span>Instagram</span>
        </motion.button>
      </Link>
      
      <Link
        href="https://open.spotify.com/playlist/3SM43Ed5GKNeFLWLtbrHZK?si=8e4a4395b25f41a1"
        target="_blank"
      >
        <motion.button
          whileHover={{ scale: 1.1, rotate: -5, y: -5 }}
          whileTap={{ scale: 0.95 }}
          className={`px-5 py-3 rounded-full flex items-center gap-2 shadow-lg ${
            activeTheme === 'neon'
              ? "bg-gradient-to-r from-green-500 to-teal-500 text-white" 
              : activeTheme === 'dark'
                ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                : "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
          }`}
        >
          <Music size={18} />
          <span>Coding Playlist</span>
        </motion.button>
      </Link>
    </motion.div>
  </motion.div>
)}
</AnimatePresence>

{/* Footer Links with enhanced animations */}
<motion.div 
initial={{ opacity: 0 }}
animate={{ opacity: 1, transition: { delay: 0.8 } }}
className="mt-auto flex flex-col items-center"
>
{/* Go back to home page button */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 1 }}
  className="mb-8"
>
  <Link href="/">
    <motion.button
      whileHover={{ scale: 1.05, y: -3 }}
      whileTap={{ scale: 0.95 }}
      className={`px-6 py-3 rounded-full shadow-lg flex items-center gap-2 font-medium ${
        activeTheme === 'neon'
          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
          : activeTheme === 'dark'
            ? "bg-gradient-to-r from-orange-600 to-pink-600 text-white"
            : "bg-gradient-to-r from-orange-600 to-pink-600 text-white"
      }`}
    >
      <motion.svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="20" 
        height="20" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        animate={{ x: [-2, 0, -2] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <path d="M19 12H5M12 19l-7-7 7-7"/>
      </motion.svg>
      Go Back to Home Page
    </motion.button>
  </Link>
</motion.div>

<div className="flex space-x-4 mb-4">
  {/* GitHub */}
    <motion.div
      whileHover={{ y: -5, rotate: -5 }}
      whileTap={{ scale: 0.9 }}
    >
      <Link 
        href="https://github.com/Abransh" 
        target="_blank"
        className={`p-3 rounded-full shadow-lg flex items-center justify-center ${
          activeTheme === 'neon'
            ? "bg-gray-800 text-pink-400 hover:bg-gray-700 hover:text-pink-300" 
            : "bg-gray-800 text-white hover:bg-gray-700"
        } transition-all duration-300`}
      >
        <Github size={20} />
      </Link>
    </motion.div>

  {/* Email */}
  <motion.div
    whileHover={{ y: -5, rotate: -5 }}
    whileTap={{ scale: 0.9 }}
  >
    <Link 
      href="mailto:tech@sassimilan.com" 
      className={`p-3 rounded-full shadow-lg flex items-center justify-center ${
        activeTheme === 'neon'
          ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600" 
          : "bg-orange-600 text-white hover:bg-orange-500"
      } transition-all duration-300`}
    >
      <Mail size={20} />
    </Link>
  </motion.div>

  {/* Home */}
  <motion.div
    whileHover={{ y: -5, scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
  >
    <Link 
      href="/" 
      className={`p-3 rounded-full shadow-lg flex items-center justify-center ${
        activeTheme === 'neon'
          ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600" 
          : "bg-pink-600 text-white hover:bg-pink-500"
      } transition-all duration-300`}
    >
      <Heart size={20} />
    </Link>
  </motion.div>
</div>

<motion.p 
  className={`text-sm ${
    activeTheme === 'neon'
      ? "text-pink-300" 
      : activeTheme === 'dark'
        ? "text-gray-400"
        : "text-gray-500"
  }`}
  initial={{ opacity: 0, y: 20 }}
  animate={{ 
    opacity: 1, 
    y: 0,
    scale: [1, 1.05, 1],
    transition: { 
      y: { delay: 1 },
      scale: { 
        repeat: Infinity, 
        repeatType: "reverse", 
        duration: 2,
        delay: 1 
      }
    }
  }}
>
  Made with ❤️ and lots of ☕
</motion.p>
</motion.div>
</div>
);
}
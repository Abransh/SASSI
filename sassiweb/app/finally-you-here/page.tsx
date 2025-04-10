"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Mail } from "lucide-react";
import Link from "next/link";

const TypewriterText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!isTyping) {
      setIsTyping(true);
      const timeout = setTimeout(() => {
        if (currentIndex < text.length) {
          setDisplayText((prev) => prev + text[currentIndex]);
          setCurrentIndex((prev) => prev + 1);
        } else {
          setIsTyping(false);
        }
      }, 50);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, isTyping]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className="text-lg md:text-xl text-gray-800 font-mono"
    >
      {displayText}
      {currentIndex < text.length && <span className="animate-blink">|</span>}
    </motion.div>
  );
};

const FloatingEmoji = ({ emoji }: { emoji: string }) => (
  <motion.div
    initial={{ y: 0, x: Math.random() * 100 - 50 }}
    animate={{ 
      y: [0, -100, 0],
      x: [0, Math.random() * 50 - 25, 0],
      rotate: [0, Math.random() * 360, 0]
    }}
    transition={{ 
      duration: 3,
      repeat: Infinity,
      repeatType: "reverse"
    }}
    className="text-4xl absolute"
  >
    {emoji}
  </motion.div>
);

const TechStackItem = ({ category, items }: { category: string; items: string[] }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="mb-8"
  >
    <h3 className="text-2xl font-bold text-orange-600 mb-4">{category}:</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {items.map((item, index) => (
        <motion.div
          key={item}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.05, rotate: Math.random() * 10 - 5 }}
          className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-orange-200 hover:border-orange-400 transition-colors"
        >
          {item}
        </motion.div>
      ))}
    </div>
  </motion.div>
);

export default function FinallyYouHere() {
  const emojis = ["🎉", "✨", "🌟", "🎊", "🎈", "🎨", "💻", "🚀"];

  const texts = [
    "glad you are here, the only cool page of this website,",
    "Hi, I am Abransh, and I hope you like the website, even if you dont i dont care.",
    "here is the github if you would like to clone:",
    "No but seriously If you have any suggestions dm me anywhere or mail at tech@sassimilan.com.",
    "if you think you can do better, think again.",
    "Well, thats enough for today, I hope this website be useful for you unlike your exisitence.",
  ];

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

  // Calculate total delay for each text based on previous text length
  const getDelayForText = (index: number) => {
    let totalDelay = 0;
    for (let i = 0; i < index; i++) {
      totalDelay += texts[i].length * 50 + 1000; // 50ms per character + 1s pause
    }
    return totalDelay;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 p-8 relative overflow-hidden">
      {/* Floating Emojis */}
      {emojis.map((emoji, index) => (
        <FloatingEmoji key={index} emoji={emoji} />
      ))}

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-bold text-orange-600 mb-4"
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            Finally, You're Here!
          </motion.h1>
          <p className="text-xl text-gray-600">The secret developer page</p>
        </motion.div>

        <div className="space-y-8 mb-12">
          {texts.map((text, index) => (
            <TypewriterText 
              key={index} 
              text={text} 
              delay={getDelayForText(index)} 
            />
          ))}
        </div>

        <div className="flex justify-center space-x-4 mb-12">
          <motion.a
            href="https://github.com/Abransh/SASSI"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
            className="p-4 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
          >
            <Github className="w-6 h-6 text-gray-800" />
          </motion.a>
          <motion.a
            href="mailto:tech@sassimilan.com"
            whileHover={{ scale: 1.1, rotate: -10 }}
            whileTap={{ scale: 0.9 }}
            className="p-4 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
          >
            <Mail className="w-6 h-6 text-gray-800" />
          </motion.a>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: texts.length * 2 }}
          className="bg-white/30 backdrop-blur-sm p-8 rounded-xl border border-orange-200"
        >
          <h2 className="text-3xl font-bold text-orange-600 mb-8 text-center">
            Tech Stack
          </h2>
          <TechStackItem category="Frontend" items={frontendStack} />
          <TechStackItem category="Backend" items={backendStack} />
          <TechStackItem category="Third-party Services" items={servicesStack} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: texts.length * 2 + 1 }}
          className="text-center mt-12"
        >
          <Link
            href="/"
            className="text-orange-600 hover:text-orange-700 transition-colors inline-flex items-center"
          >
            <motion.span
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              ←
            </motion.span>
            <span className="ml-2">Back to the main site</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
} 
"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Calendar } from 'lucide-react';

interface CursorPoint {
  x: number;
  y: number;
  id: number;
}

interface MatrixDrop {
  id: number;
  x: number;
  y: number;
  char: string;
  speed: number;
}

interface ParticleExplosion {
  id: number;
  x: number;
  y: number;
}

const Invitation3 = () => {
  const [typewriterText, setTypewriterText] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorTrail, setCursorTrail] = useState<CursorPoint[]>([]);
  const [showSecret, setShowSecret] = useState(false);
  const [achievementUnlocked, setAchievementUnlocked] = useState('');
  const [glitchMode, setGlitchMode] = useState(false);
  const [particleExplosions, setParticleExplosions] = useState<ParticleExplosion[]>([]);
  const [selectedTimeline, setSelectedTimeline] = useState<number | null>(null);
  const [matrixRain, setMatrixRain] = useState<MatrixDrop[]>([]);
  const [visitCount, setVisitCount] = useState(0);
  
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  
  const fullText = "You're Invited";
  const subtitleRef = useRef(null);
  const reasonsRef = useRef(null);
  const containerRef = useRef(null);

  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
  const [konamiSequence, setKonamiSequence] = useState<string[]>([]);

  // Enhanced typewriter effect with glitch
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setTypewriterText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 150);

    return () => clearInterval(timer);
  }, []);

  // Mouse tracking for magnetic effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      
      // Create cursor trail
      setCursorTrail(prev => [...prev.slice(-8), { x: e.clientX, y: e.clientY, id: Date.now() }]);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      setKonamiSequence(prev => {
        const newSequence = [...prev, e.code].slice(-konamiCode.length);
        if (newSequence.join('') === konamiCode.join('')) {
          triggerKonamiEffect();
          return [];
        }
        return newSequence;
      });

      // Spacebar glitch effect
      if (e.code === 'Space') {
        setGlitchMode(true);
        setTimeout(() => setGlitchMode(false), 500);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [cursorX, cursorY, konamiCode]);

  // Visit counter
  useEffect(() => {
    const count = localStorage.getItem('invitationVisits') || '0';
    const newCount = parseInt(count) + 1;
    setVisitCount(newCount);
    localStorage.setItem('invitationVisits', newCount.toString());
  }, []);

  // Matrix rain effect
  useEffect(() => {
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const createRainDrop = () => ({
      id: Math.random(),
      x: Math.random() * window.innerWidth,
      y: -20,
      char: chars[Math.floor(Math.random() * chars.length)],
      speed: Math.random() * 3 + 1
    });

    setMatrixRain(Array.from({ length: 20 }, createRainDrop));

    const interval = setInterval(() => {
      setMatrixRain(prev => prev.map(drop => ({
        ...drop,
        y: drop.y + drop.speed,
        char: Math.random() > 0.95 ? chars[Math.floor(Math.random() * chars.length)] : drop.char
      })).filter(drop => drop.y < window.innerHeight).concat(
        Math.random() > 0.95 ? [createRainDrop()] : []
      ));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const triggerKonamiEffect = () => {
    setShowSecret(true);
    setAchievementUnlocked('Secret Master');
    // Create massive confetti explosion
    for (let i = 0; i < 50; i++) {
      setTimeout(() => {
        setParticleExplosions(prev => [...prev, {
          id: Date.now() + i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
        }]);
      }, i * 50);
    }
    setTimeout(() => setShowSecret(false), 5000);
  };

  const handleParticleClick = () => {
    setParticleExplosions(prev => [...prev, {
      id: Date.now(),
      x: mousePosition.x,
      y: mousePosition.y,
    }]);
    setAchievementUnlocked('Particle Hunter');
    setTimeout(() => setAchievementUnlocked(''), 3000);
  };

  const timelineItems = [
    {
      time: "6:00 PM",
      location: "Arco della Pace",
      description: "Where legends gather",
      emoji: "🏛️",
      details: "random guys's arch, perfect for pre-game vibes",
      funFact: "Good steps to sit on!"
    },
    {
      time: "Evening",
      location: "Soju in Chinatown(got some plans hopefully its works)",
      description: "Where things get interesting",
      emoji: "🥢",
      details: "Some downtown basement with questionable lighting",
      funFact: "Soju pairs perfectly with good friends and bad decisions"
    },
    {
      time: "Late Night",
      location: "Magolfa/some place we will see",
      description: "Where memories are made",
      emoji: "🍽️",
      details: "The grand finale dinner experience",
      funFact: "The only place where calories don't count on birthdays"
    }
  ];

  const reasons = [
    {
      title: "Because I'm Cool",
      subtitle: "Obviously",
      description: "This is scientifically proven*",
      footnote: "*By me, just now"
    },
    {
      title: "Unlimited 'that's what she said' jokes",
      subtitle: "IT'S ME",
      description: "Professional level humor guaranteed",
      footnote: "*Terms and conditions apply"
    },
    {
      title: "Exclusive Vibes",
      subtitle: "Very exclusive",
      description: "Like, really exclusive",
      footnote: "*You're literally invited"
    },
    {
      title: "FOMO Prevention",
      subtitle: "Medical necessity",
      description: "Doctor's orders",
      footnote: "*Self-diagnosed"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative" ref={containerRef}>
      {/* Custom Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-amber-400 rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      />

      {/* Cursor Trail */}
      {cursorTrail.map((point, index) => (
        <motion.div
          key={point.id}
          className="fixed w-2 h-2 bg-amber-400 rounded-full pointer-events-none z-40"
          style={{
            left: point.x - 4,
            top: point.y - 4,
          }}
          initial={{ opacity: 0.8, scale: 1 }}
          animate={{ opacity: 0, scale: 0 }}
          transition={{ duration: 1 }}
        />
      ))}

      {/* Matrix Rain Effect */}
      {matrixRain.map(drop => (
        <motion.div
          key={drop.id}
          className="fixed text-amber-400 opacity-10 text-xs font-mono pointer-events-none z-10"
          style={{
            left: drop.x,
            top: drop.y,
          }}
        >
          {drop.char}
        </motion.div>
      ))}

      {/* Enhanced floating particles */}
      {/* <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-amber-400 rounded-full opacity-30 cursor-pointer pointer-events-auto"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: mousePosition.x ? (mousePosition.x - window.innerWidth / 2) * 0.01 : 0,
              y: [0, -50, 0],
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
            onClick={handleParticleClick}
            whileHover={{ scale: 1.5, opacity: 1 }}
          />
        ))}
      </div> */}

      {/* Particle Explosions */}
      {particleExplosions.map(explosion => (
        <div key={explosion.id} className="fixed pointer-events-none z-30" style={{ left: explosion.x, top: explosion.y }}>
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-amber-400 rounded-full"
              initial={{ x: 0, y: 0, opacity: 1 }}
              animate={{
                x: Math.cos(i * 30 * Math.PI / 180) * 100,
                y: Math.sin(i * 30 * Math.PI / 180) * 100,
                opacity: 0,
              }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          ))}
        </div>
      ))}

      {/* Achievement Notification */}
      {achievementUnlocked && (
        <motion.div
          className="fixed top-10 right-10 bg-amber-400 text-black px-6 py-3 rounded-lg font-bold z-40"
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
        >
          🏆 {achievementUnlocked}
        </motion.div>
      )}

      {/* Secret Message */}
      {showSecret && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="text-center"
            initial={{ scale: 0.5, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", damping: 10 }}
          >
            <h2 className="text-6xl mb-4">🎉 KONAMI CODE ACTIVATED! 🎉</h2>
            <p className="text-2xl text-amber-400">You are officially the coolest person ever!</p>
          </motion.div>
        </motion.div>
      )}

      {/* Visit Counter */}
      <motion.div
        className="fixed bottom-4 right-4 text-xs text-gray-600 z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
      >
        {visitCount} cool people have seen this
      </motion.div>

      <div className="container mx-auto px-6 py-16 max-w-4xl relative z-20">
        {/* Hero Section */}
        <section className="text-center mb-32">
          <motion.h1 
            className={`text-6xl md:text-8xl font-thin tracking-widest mb-8 ${glitchMode ? 'animate-pulse' : ''}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            style={{
              filter: glitchMode ? 'hue-rotate(90deg) contrast(200%)' : 'none',
              textShadow: glitchMode ? '2px 2px 0px #ff0000, -2px -2px 0px #00ff00' : 'none',
            }}
          >
            {typewriterText}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
              className="inline-block w-1 h-16 md:h-20 bg-white ml-2"
            />
          </motion.h1>
          
          <motion.div
            ref={subtitleRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.8 }}
            className="space-y-4"
          >
            <p className="text-xl md:text-2xl font-light tracking-wide text-gray-300">
              To a birthday celebration
            </p>
            <p className="text-sm tracking-widest text-amber-400 uppercase">
              Because why not?
            </p>
          </motion.div>
        </section>

        {/* Interactive Timeline Section */}
        <section className="mb-32">
          <motion.h2 
            className="text-3xl font-light text-center mb-16 tracking-wide"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            The Journey
          </motion.h2>
          
          <div className="space-y-12">
            {timelineItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className={`flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`max-w-md ${index % 2 === 0 ? 'text-left' : 'text-right'}`}>
                  <motion.div 
                    className="border border-gray-800 p-8 hover:border-amber-400 transition-all duration-300 group cursor-pointer relative overflow-hidden"
                    onClick={() => setSelectedTimeline(selectedTimeline === index ? null : index)}
                    whileHover={{ 
                      scale: 1.02,
                      x: mousePosition.x ? (mousePosition.x - window.innerWidth / 2) * 0.005 : 0 
                    }}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <motion.span 
                        className="text-2xl"
                        animate={{ rotate: selectedTimeline === index ? 360 : 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        {item.emoji}
                      </motion.span>
                      <div>
                        <h3 className="text-xl font-light">{item.location}</h3>
                        <p className="text-amber-400 text-sm tracking-wide">{item.time}</p>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
                      {item.description}
                    </p>
                    
                    {/* Expandable Details */}
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ 
                        height: selectedTimeline === index ? 'auto' : 0,
                        opacity: selectedTimeline === index ? 1 : 0 
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 pt-4 border-t border-gray-700">
                        <p className="text-gray-300 text-sm mb-2">{item.details}</p>
                        <p className="text-amber-400 text-xs italic">{item.funFact}</p>
                      </div>
                    </motion.div>
                    
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-amber-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                    />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Enhanced Why You Should Come Section */}
        <section className="mb-32">
          <motion.h2 
            className="text-3xl font-light text-center mb-16 tracking-wide"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Why You Should Come?
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {reasons.map((reason, index) => (
              <motion.div
                key={index}
                ref={reasonsRef}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group cursor-pointer"
                whileHover={{ 
                  scale: 1.03,
                  x: mousePosition.x ? (mousePosition.x - window.innerWidth / 2) * 0.003 : 0 
                }}
              >
                <div className="border border-gray-800 p-8 h-full hover:border-amber-400 transition-all duration-300 hover:bg-gray-950 relative overflow-hidden">
                  <h3 className="text-xl font-light mb-2 group-hover:text-amber-400 transition-colors">
                    {reason.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 tracking-wide">
                    {reason.subtitle}
                  </p>
                  <p className="text-gray-300 text-sm mb-6">
                    {reason.description}
                  </p>
                  <p className="text-xs text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {reason.footnote}
                  </p>
                  
                  {/* Magnetic hover effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-amber-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Event Details */}
        <section className="mb-32">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center border border-gray-800 p-12 hover:border-amber-400 transition-colors duration-500"
            whileHover={{ 
              scale: 1.02,
              x: mousePosition.x ? (mousePosition.x - window.innerWidth / 2) * 0.005 : 0 
            }}
          >
            <div className="flex justify-center items-center gap-8 mb-8">
              <Calendar className="w-6 h-6 text-amber-400" />
              <p className="text-lg font-light tracking-wide">27th July 6:30PM</p>
            </div>
            <p className="text-gray-400 text-sm tracking-widest">
              Because timing is everything
            </p>
          </motion.div>
        </section>

        {/* Enhanced RSVP Section */}
        <section className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-light mb-8 tracking-wide">
              Your Presence is Requested
            </h2>
            
            <motion.button
              className="border border-amber-400 px-12 py-4 tracking-widest uppercase text-sm hover:bg-amber-400 hover:text-black transition-all duration-300 relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{ 
                scale: [1, 1.02, 1],
                boxShadow: ['0 0 0 rgba(251, 191, 36, 0)', '0 0 20px rgba(251, 191, 36, 0.3)', '0 0 0 rgba(251, 191, 36, 0)']
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              I'll Be There
            </motion.button>
            
            <p className="text-gray-500 text-xs mt-8 tracking-wide">
              click the above button (it doesnt work ahahah).
            </p>
          </motion.div>
        </section>

        {/* Hidden Easter Egg Instructions */}
        <motion.div
          className="text-center mt-16 opacity-20 hover:opacity-100 transition-opacity duration-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ delay: 10 }}
        >
          <p className="text-xs text-gray-600">
            Psst... try the Konami code ↑↑↓↓←→←→BA or click the floating particles 🎮
          </p>
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-32 text-center"
        >
          <p className="text-xs text-gray-700 tracking-widest">
            WITH LOVE & MINIMAL EFFORT
          </p>
        </motion.footer>
      </div>
    </div>
  );
};

export default Invitation3;